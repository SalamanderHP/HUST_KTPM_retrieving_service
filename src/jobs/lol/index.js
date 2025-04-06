const {
  getLolMatchDetails,
  getLolUserMatches,
  getLolAccountInfo,
} = require("../../configs/lol/lol.api");
/**
 * --------------------- ENV ----------------------
 */
require("dotenv").config();
/**
 *  ----------------------- DB CONFIG -----------------------------
 */
const db = require("../../configs/db/mongo/index");
db.connect();

const CronJob = require("cron").CronJob;

const job = new CronJob("*/30 * * * * *", async function () {
  console.log("lol service loaded");
});

job.start();
