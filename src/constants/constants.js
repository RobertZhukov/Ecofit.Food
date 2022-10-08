const adminChatId = 1957793597;

const minWeight = 20;
const maxWeight = 300;

const minHeight = 100;
const maxHeight = 250;

const minAge = 14;
const maxAge = 100;

const activityRate = {
  PASSIVE: 1.2,
  INACTIVE: 1.4,
  ACTIVE: 1.5,
  OVERACTIVE: 1.6,
};

const activityRu = {
  PASSIVE: "Пассивный",
  INACTIVE: "Малоактивный",
  ACTIVE: "Активный",
  OVERACTIVE: "Очень активный",
};
const genderRu = {
  MAN: "Мужской",
  WOMAN: "Женский",
};

module.exports = {
  adminChatId,
  minWeight,
  maxWeight,
  minHeight,
  maxHeight,
  minAge,
  maxAge,
  activityRate,
  activityRu,
  genderRu,
};
