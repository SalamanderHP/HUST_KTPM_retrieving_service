const Game = require("../entities/games.entity");
const User = require("../entities/users.entity");
const {USER_MOCK_DATA, GAME_MOCK_DATA} = require("./data/seed");

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

const mockGameAccountData = () => {};

module.exports = {
  mockUserData,
  mockGameData,
  mockGameAccountData,
};
