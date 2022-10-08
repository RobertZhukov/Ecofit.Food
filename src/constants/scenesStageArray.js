const { approveScreenScena } = require("../scenes/approveScreenScena");
const { choiseGenderScena } = require("../scenes/choiseGender");
const { confirmScreenScena } = require("../scenes/confirmScreenScena");
const { getAgeScena } = require("../scenes/getAgeScena");
const { getHeightScena } = require("../scenes/getHeightScena");
const { getWeightScena } = require("../scenes/getWeightScena");
const { choiseActivityScena } = require("../scenes/choiseActivity");
const { confirmBodyParamsScena } = require("../scenes/confirmBodyParamsScena");

const scenesStageArray = [
  confirmScreenScena(),
  approveScreenScena(),
  choiseGenderScena(),
  getAgeScena(),
  getWeightScena(),
  getHeightScena(),
  choiseActivityScena(),
  confirmBodyParamsScena(),
];

module.exports = { scenesStageArray };
