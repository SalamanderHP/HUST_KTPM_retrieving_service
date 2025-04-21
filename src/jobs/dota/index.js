require("dotenv").config();
const CronJob = require("cron").CronJob;
const db = require("../../configs/db/mongo/index");
const {getPlayerMatches} = require("../../configs/dota/dota.api");
const {publishMessage} = require("../../configs/pubsub");
const {ENTITY_CONST} = require("../../consts/entities.const");
const {DOTA2_TOPIC_NAME} = require("../../consts/pubsub.const");
const GameAccounts = require("../../entities/game_accounts.entity");
const Game = require("../../entities/games.entity");
const Match = require("../../entities/matches.entity");
const ObjectId = require("mongodb").ObjectId;
db.connect();

const getDota2GameAccounts = async (game) => {
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

const getDota2Game = async () => {
  let data = await Game.findOne({name: ENTITY_CONST.GAMES.NAME.DOTA2});
  return data;
};

const job = new CronJob("*/30 * * * * *", async function () {
  console.log("DOTA2 scan start!!!");
  try {
    let dota2Game = await getDota2Game();
    let activeGameAccounts = await getDota2GameAccounts(dota2Game);
    if (!activeGameAccounts) return;

    for (let index = 0; index < activeGameAccounts.length; index++) {
      const gameAccount = activeGameAccounts[index];
      let accountMatches = await getPlayerMatches(gameAccount.ingame_id);
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
          DOTA2_TOPIC_NAME,
          {
            match_info: match,
            ingame: gameAccount.ingame,
            game_account: gameAccount,
          },
          {
            from: "dota2 retriever",
          }
        );
      }
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
});

job.start();
