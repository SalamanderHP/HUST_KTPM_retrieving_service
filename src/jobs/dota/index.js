require("dotenv").config();
const CronJob = require("cron").CronJob;
const db = require("../../configs/db/mongo/index");
const {getPlayerMatches} = require("../../configs/dota/dota.api");
const {publishMessage} = require("../../configs/pubsub");
const {ENTITY_CONST} = require("../../consts/entities.const");
const {DOTA2_TOPIC_NAME} = require("../../consts/pubsub.const");
const game_accountsEntity = require("../../entities/game_accounts.entity");
const matchesEntity = require("../../entities/matches.entity");
db.connect();

const getDota2GameAccounts = async () => {
  let data = await game_accountsEntity.aggregate([
    {
      $match: {
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

const job = new CronJob("*/10 * * * * *", async function () {
  console.log("DOTA2 scan start!!!");
  try {
    let activeGameAccounts = await getDota2GameAccounts();
    if (!activeGameAccounts) return;

    for (let index = 0; index < activeGameAccounts.length; index++) {
      const gameAccount = activeGameAccounts[index];
      let accountMatches = await getPlayerMatches(gameAccount.ingame_id);
      if (!accountMatches) continue;

      for (let i = 0; i < accountMatches.length; i++) {
        const match = accountMatches[i];
        let existingMatch = await matchesEntity.findOne({
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
            game_account: gameAccount._id,
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
