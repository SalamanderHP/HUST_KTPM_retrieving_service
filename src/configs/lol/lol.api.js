const { get } = require('./api.lib');

// https://vn2.api.riotgames.com/lol/match/v5/matches/by-puuid/VN2_809074725/ids?start=0&count=20&api_key=
const getLolMatchDetails = async (matchId) => {
  try {
    if (!matchId) {
      return null;
    }

    let url = `/lol/match/v5/matches/by-puuid/${matchId}/ids?start=0&count=20&api_key=${process.env.LOL_API_KEY}`;
    let result = await get(url);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getLolMatchDetails,
};
