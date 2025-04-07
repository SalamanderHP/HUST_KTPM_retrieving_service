const GameAccount = require("../entities/game_accounts.entity");
const Game = require("../entities/games.entity");
const User = require("../entities/users.entity");
const {
  USER_MOCK_DATA,
  GAME_MOCK_DATA,
  DOTA2_USER_DATA,
} = require("./data/seed");

const mockUserData = async () => {
  for (let index = 0; index < USER_MOCK_DATA.length; index++) {
    const item = USER_MOCK_DATA[index];
    let user = await User.findOne({username: item.username});
    if (user) continue;

    await User.create([item]);
  }

  console.log("User data created");
};

const mockGameData = async () => {
  for (let index = 0; index < GAME_MOCK_DATA.length; index++) {
    const item = GAME_MOCK_DATA[index];
    let game = await Game.findOne({name: item.name});
    if (game) continue;

    await Game.create([item]);
  }

  console.log("Game data created");
};

const seedDotaGameAccountData = async () => {
  let users = await User.find({}).limit(10);
  let dota = await Game.findOne({name: "dota2"});
  for (let index = 0; index < DOTA2_USER_DATA.length; index++) {
    const data = DOTA2_USER_DATA[index];
    const user = users[index];
    let existingGameAccount = await GameAccount.findOne({
      game: dota._id,
      user: user._id,
    });
    if (existingGameAccount) continue;

    let gameAccountData = {
      ingame: data.ingame,
      ingame_id: data.ingame_id,
      user: user,
      game: dota,
    };
    await GameAccount.create(gameAccountData);
  }
  console.log("Game account created");
};

module.exports = {
  mockUserData,
  mockGameData,
  seedDotaGameAccountData,
};
