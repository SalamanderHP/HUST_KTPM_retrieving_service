require("dotenv").config();
const CronJob = require("cron").CronJob;
const db = require("../../configs/db/mongo/index");
const {getLolUserMatches} = require("../../configs/lol/lol.api");
const {publishMessage} = require("../../configs/pubsub");
const {ENTITY_CONST} = require("../../consts/entities.const");
const {LOL_TOPIC_NAME} = require("../../consts/pubsub.const");
const GameAccounts = require("../../entities/game_accounts.entity");
const Game = require("../../entities/games.entity");
const Match = require("../../entities/matches.entity");
const ObjectId = require("mongodb").ObjectId;
db.connect();

const getLolGameAccounts = async (game) => {
  let data = await GameAccounts.aggregate([
    {
      $match: {
        game: new ObjectId(game?._id),
        status: ENTITY_CONST.ACCOUNT_STATUS.ACTIVE,
      },
    },
    {
      $lookup: {
        from: "games",
        localField: "game",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: "game",
      },
    },
    {
      $unwind: {
        path: "$game",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
            },
          },
        ],
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return data;
};

const getLolGame = async () => {
  let data = await Game.findOne({
    name: ENTITY_CONST.GAMES.NAME.LEAGUE_OF_LEGENDS,
  });
  return data;
};

const job = new CronJob("*/30 * * * * *", async function () {
  console.log("LOL scan start!!!");
  try {
    let lolGame = await getLolGame();
    let activeGameAccounts = await getLolGameAccounts(lolGame);
    if (!activeGameAccounts) return;

    for (let index = 0; index < activeGameAccounts.length; index++) {
      const gameAccount = activeGameAccounts[index];
      let accountMatches = await getLolUserMatches(gameAccount.ingame_id);
      if (!accountMatches) continue;

      for (let i = 0; i < accountMatches.length; i++) {
        const match = accountMatches[i];
        let existingMatch = await Match.findOne({
          match_id: match.match_id,
          game_account: gameAccount._id,
          game: gameAccount.game._id,
        });
        if (existingMatch) continue;

        // publish to queue
        await publishMessage(
          LOL_TOPIC_NAME,
          {
            match_info: match,
            ingame: gameAccount.ingame,
            game_account: gameAccount,
          },
          {
            from: "lol retriever",
          }
        );
      }
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
});

job.start();
