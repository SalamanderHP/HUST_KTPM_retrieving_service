const {ENTITY_CONST} = require("../../consts/entities.const");

const USER_MOCK_DATA = [
  {
    username: "johndoe01",
    status: ENTITY_CONST.USER_STATUS.ACTIVE,
    created_at: new Date("2024-12-01T10:00:00Z"),
    updated_at: new Date("2025-04-01T10:00:00Z"),
  },
  {
    username: "janedoe02",
    status: ENTITY_CONST.USER_STATUS.PENDING,
    created_at: new Date("2024-12-05T14:22:00Z"),
    updated_at: new Date("2025-03-15T09:10:00Z"),
  },
  {
    username: "mikesmith03",
    status: ENTITY_CONST.USER_STATUS.ACTIVE,
    created_at: new Date("2025-01-10T08:30:00Z"),
    updated_at: new Date("2025-04-02T08:45:00Z"),
  },
  {
    username: "sarahjones04",
    status: ENTITY_CONST.USER_STATUS.ACTIVE,
    created_at: new Date("2024-11-21T18:10:00Z"),
    updated_at: new Date("2025-03-30T12:00:00Z"),
  },
  {
    username: "alexbrown05",
    status: ENTITY_CONST.USER_STATUS.ACTIVE,
    created_at: new Date("2025-02-11T07:15:00Z"),
    updated_at: new Date("2025-04-01T07:45:00Z"),
  },
  {
    username: "lisawhite06",
    status: ENTITY_CONST.USER_STATUS.DEACTIVE,
    created_at: new Date("2025-01-01T12:00:00Z"),
    updated_at: new Date("2025-02-15T13:30:00Z"),
  },
  {
    username: "chrisevans07",
    status: ENTITY_CONST.USER_STATUS.ACTIVE,
    created_at: new Date("2025-03-10T09:25:00Z"),
    updated_at: new Date("2025-04-05T11:00:00Z"),
  },
  {
    username: "emmastone08",
    status: ENTITY_CONST.USER_STATUS.ACTIVE,
    created_at: new Date("2024-10-05T16:45:00Z"),
    updated_at: new Date("2025-01-20T08:20:00Z"),
  },
  {
    username: "daniellee09",
    status: ENTITY_CONST.USER_STATUS.ACTIVE,
    created_at: new Date("2025-03-25T20:00:00Z"),
    updated_at: new Date("2025-04-04T22:30:00Z"),
  },
  {
    username: "oliviapark10",
    status: ENTITY_CONST.USER_STATUS.ACTIVE,
    created_at: new Date("2025-02-14T11:45:00Z"),
    updated_at: new Date("2025-03-01T13:10:00Z"),
  },
];

const GAME_MOCK_DATA = [
  {
    name: "dota2",
    display_name: "Dota 2",
    description:
      "A competitive MOBA game developed by Valve, featuring strategic team-based combat and unique heroes.",
    type: ENTITY_CONST.GAMES.TYPE.MOBA,
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-04-01T12:00:00Z"),
  },
  {
    name: "leagueoflegends",
    display_name: "League of Legends",
    description:
      "A fast-paced MOBA developed by Riot Games where teams of champions battle it out in strategic arenas.",
    type: ENTITY_CONST.GAMES.TYPE.MOBA,
    createdAt: new Date("2025-01-05T11:30:00Z"),
    updatedAt: new Date("2025-04-01T12:30:00Z"),
  },
];

const DOTA2_USER_DATA = [
  {ingame: "SR.skem", ingame_id: "100594231"},
  {ingame: "@SaintsMike", ingame_id: "215308703"},
  {ingame: "XG.Paparazi灬", ingame_id: "137193239"},
  {ingame: "MARIONETTE SPELLS", ingame_id: "905263867"},
  {ingame: "kiss of death", ingame_id: "341923347"},
  {ingame: "PARIVISION.Satanic", ingame_id: "1044002267"},
  {ingame: "Aurora.23", ingame_id: "375507918"},
];

module.exports = {
  USER_MOCK_DATA,
  GAME_MOCK_DATA,
  DOTA2_USER_DATA,
};
