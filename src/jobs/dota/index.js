const CronJob = require("cron").CronJob;
/**
 * --------------------- ENV ----------------------
 */
require("dotenv").config();
/**
 * --------------------- INIT ----------------------
 */
const {
  DOTA2_TOPIC_NAME,
  PUBSUB_PROJECT_ID,
} = require("../../consts/pubsub.const");
/**
 *  ----------------------- DB CONFIG -----------------------------
 */
const db = require("../../configs/db/mongo/index");
db.connect();
/**
 * --------------------- PUBSUB ----------------------
 */
const {PubSub} = require("@google-cloud/pubsub");
const pubSubClient = new PubSub({
  projectId: PUBSUB_PROJECT_ID,
  keyFilename: `./keys/${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
});

const data = JSON.stringify({foo: "bar"});

const job = new CronJob("*/30 * * * * *", async function () {
  console.log("DOTA2 scan start!!!");
  const dataBuffer = Buffer.from(data);

  const customAttributes = {
    origin: "nodejs-sample",
    username: "gcp",
  };

  const topic = pubSubClient.topic(DOTA2_TOPIC_NAME);

  try {
    const messageId = await topic.publishMessage({
      data: dataBuffer,
      attributes: customAttributes,
    });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.log(error);
  }
});

job.start();
