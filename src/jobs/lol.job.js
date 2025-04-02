const {
  getLolMatchDetails,
  getLolUserMatches,
  getLolAccountInfo,
} = require("../configs/lol/lol.api");

const CronJob = require("cron").CronJob;

const job = new CronJob("*/30 * * * * *", async function () {
  console.log("lol service loaded");
});

job.start();
