require("dotenv").config();
const CronJob = require("cron").CronJob;
const db = require("../../configs/db/mongo/index");
const {getPlayerMatches} = require("../../configs/dota/dota.api");
const {publishMessage} = require("../../configs/pubsub");
const {ENTITY_CONST} = require("../../consts/entities.const");
const {DOTA2_TOPIC_NAME} = require("../../consts/pubsub.const");
const game_accountsEntity = require("../../entities/game_accounts.entity");
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
      console.log(accountMatches);

      // publish to queue
      await publishMessage(DOTA2_TOPIC_NAME, accountMatches, {
        ingame: gameAccount.ingame,
        user: JSON.stringify(gameAccount.user),
        game: JSON.stringify(gameAccount.game),
      });
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
});

job.start();
