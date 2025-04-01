const axios = require("axios");
const { LOL_ROUTING } = require('../../consts/api.const');

const lolInstance = axios.create({
  baseURL: LOL_ROUTING.host,
  timeout: 30000,
});

const get = async (
  url,
) => {
  return await lolInstance.get(url);
};

module.exports = {
  lolInstance,
  get
};
