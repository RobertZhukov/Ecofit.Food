// Статусы
const NEW_USER = "NEW_USER";
const PLAYER = "PLAYER";
const ADMIN = "ADMIN";

// Тарифы
const ECOFIT_31 = "ECOFIT_31";
const ECOFIT_365 = "ECOFIT_365";

// Пол
const MAN = "MAN";
const WOMAN = "WOMAN";

// Активность
const PASSIVE = "PASSIVE";
const INACTIVE = "INACTIVE";
const ACTIVE = "ACTIVE";
const OVERACTIVE = "OVERACTIVE";

const auth = {
  status: {
    NEW_USER,
    PLAYER,
    ADMIN,
  },
  defaultStatus: NEW_USER,
};
const tarif = {
  ECOFIT_31,
  ECOFIT_365,
};

const gender = {
  MAN,
  WOMAN,
};
const activity = {
  PASSIVE,
  INACTIVE,
  ACTIVE,
  OVERACTIVE,
};

module.exports = {
  auth,
  tarif,
  gender,
  activity,
  NEW_USER,
  PLAYER,
  ADMIN,
  ECOFIT_31,
  ECOFIT_365,
  MAN,
  WOMAN,
  PASSIVE,
  INACTIVE,
  ACTIVE,
  OVERACTIVE,
};
