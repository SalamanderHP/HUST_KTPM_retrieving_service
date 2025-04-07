/**
 * --------------------- ENV ----------------------
 */
require("dotenv").config();
/**
 *  ----------------------- DB CONFIG -----------------------------
 */
const db = require("../configs/db/mongo/index");

const {
  mockUserData,
  mockGameData,
  seedDotaGameAccountData,
} = require("../utils/generate_seed_data.util");

const seedingUsersAndGames = () => {
  mockUserData();
  mockGameData();
};

const seed = async () => {
  await db.connect();
  seedingUsersAndGames();
  seedDotaGameAccountData();
};

seed();
