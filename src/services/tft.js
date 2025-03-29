const CronJob = require('cron').CronJob;

const job = new CronJob('*/30 * * * * *', async function () {
  console.log("tft service loaded");
});

job.start();
