const generateLolMatchData = (matchNumber = 5) => {
  let arr = [];
  for (let index = 0; index < matchNumber; index++) {
    let data = generateRandomLolMatch();
    arr.push(data);
  }
  return arr;
};

const generateRandomLolMatch = () => {
  return {
    match_id: Math.floor(10000000000 + Math.random() * 90000000000),
    player_slot: Math.floor(Math.random() * 256),
    radiant_win: Math.random() < 0.5,
    duration: Math.floor(Math.random() * 3600) + 1500,
    game_mode: Math.floor(Math.random() * 10),
    lobby_type: Math.floor(Math.random() * 4),
    hero_id: Math.floor(Math.random() * 120),
    start_time:
      Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 1000000),
    version: Math.floor(Math.random() * 100),
    kills: Math.floor(Math.random() * 20),
    deaths: Math.floor(Math.random() * 20),
    assists: Math.floor(Math.random() * 30),
    average_rank: Math.floor(Math.random() * 100),
    leaver_status: Math.floor(Math.random() * 3),
    party_size: Math.floor(Math.random() * 5) + 1,
    hero_variant: Math.floor(Math.random() * 3),
  };
};

module.exports = {
  generateLolMatchData,
};
