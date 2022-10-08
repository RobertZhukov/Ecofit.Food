const { ECOFIT_31, ECOFIT_365 } = require("../constants/enum");

const timeCounter = (tarifName) => {
  const period = new Date(Date.now())
  
  if (tarifName === ECOFIT_31) {
    return period.setMonth(period.getMonth() + 1);
  } 
  if (tarifName === ECOFIT_365) {
    return period.setFullYear(period.getFullYear() + 1);
  } 
}

module.exports = { timeCounter }