const CronJob = require('cron').CronJob;

const job = new CronJob('*/30 * * * * *', async function () {
  console.log("dota2 service loaded");
});

job.start();
