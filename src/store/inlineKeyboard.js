const ikb = require("./inlineKeyboardButtons");

module.exports = {
  about: [[ikb.about.aboutPlan], [ikb.about.aboutSupport]],
  moreReviews: [[ikb.moreReviews]],
  confirmPayment: [[ikb.confirmPayment.true]],
  more: [[ikb.more]],
  getProgramm: [[ikb.getProgramm]],
  exit: [[ikb.exit]],
  gender: [[ikb.gender.man, ikb.gender.woman]],
  activity: [
    [ikb.activity.passive, ikb.activity.inactive],
    [ikb.activity.active, ikb.activity.veryActive],
  ],
  tarif: [[ikb.tarif.EcoFit31, ikb.tarif.EcoFit365]],
  confirmBodyParams: [
    [ikb.confirmBodyParams.confirm, ikb.confirmBodyParams.edit],
  ],
};
