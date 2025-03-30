const {OPEN_DOTA_KEY, STEAM_POWER_DOTA_KEY} = require("../../consts/api.const");
const {get, InstanceType} = require("./api.lib");

// https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=535A126E7157974063C0EBE436E335D8&match_id=6776276593
const getMatchDetails = async (platform = "steam", matchId) => {
  try {
    let result = await get(
      `IDOTA2Match_570/GetMatchDetails/v1/?key=${STEAM_POWER_DOTA_KEY}&match_id=${matchId}`
    );

    return result;
  } catch (error) {
    throw error;
  }
};

// https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=535A126E7157974063C0EBE436E335D8&steamids=76561199232138145
const getPlayerDetails = async (platform = "steam", steamId) => {
  try {
    let result = await get(
      `ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_POWER_DOTA_KEY}&steamids=${steamId}`
    );
    try {
      console.log(
        "['x-ratelimit-reset']",
        result?.headers["x-ratelimit-reset"]
      );
    } catch (error) {
      console.log(error, `update ApiKey failed`);
    }
    return result;
  } catch (error) {
    // console.log(error)
    return error?.response;
  }
};

// https://api.opendota.com/api/players/1271872417
const getPlayerRanksInfo = async (platform = "steam", accountId, seasonId) => {
  try {
    if (!accountId) {
      return null;
    }

    let url = OPEN_DOTA_KEY
      ? `players/${accountId}?api_key=${OPEN_DOTA_KEY}`
      : `players/${accountId}`;
    let result = await get(url, true, InstanceType.OPEN_DOTA);
    return result;
  } catch (error) {
    return error?.response;
  }
};

// https://api.opendota.com/api/players/1271872417
const getPlayerDetailOpenDota = async (accountId) => {
  try {
    if (!accountId) {
      return null;
    }

    let url = OPEN_DOTA_KEY
      ? `players/${accountId}?api_key=${OPEN_DOTA_KEY}`
      : `players/${accountId}`;
    let result = await get(url, false, InstanceType.OPEN_DOTA);
    return result;
  } catch (error) {
    throw error;
  }
};

// https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?key=535A126E7157974063C0EBE436E335D8&account_id=126846118
const getPlayerMatches = async (accountId) => {
  try {
    let key = await getKey();
    let result = await get(
      `IDOTA2Match_570/GetMatchHistory/v1/?key=${key}&account_id=${accountId}`
    );

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMatchDetails,
  getPlayerDetails,
  getPlayerRanksInfo,
  getPlayerMatches,
  getPlayerDetailOpenDota,
};
