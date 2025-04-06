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
} = require("../utils/generate_seed_data.util");

const seedingUsersAndGames = () => {
  mockUserData();
  mockGameData();
};

db.connect();
seedingUsersAndGames();
