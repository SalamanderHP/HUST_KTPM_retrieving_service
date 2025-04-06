const CronJob = require("cron").CronJob;
/**
 * --------------------- ENV ----------------------
 */
require("dotenv").config();
/**
 *  ----------------------- DB CONFIG -----------------------------
 */
const db = require("../../configs/db/mongo/index");
db.connect();

const job = new CronJob("*/30 * * * * *", async function () {
  console.log("dota2 service loaded");
});

job.start();
