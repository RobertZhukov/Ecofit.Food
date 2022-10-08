const kb = require("./keyboardButtons");

module.exports = {
  about: [
    [kb.mainNewUser.about.callback_data],
    [kb.mainNewUser.reviews, kb.mainNewUser.tarif],
    [kb.mainNewUser.order],
  ],
  mainNewUser: [
    [kb.mainNewUser.about],
    [kb.mainNewUser.reviews, kb.mainNewUser.tarif],
    [kb.mainNewUser.order],
  ],
  mainPlayer: [
    [kb.mainPlayer.getProgramm],
    [kb.mainPlayer.bonus, kb.mainPlayer.support],
  ],
  mainAdmin: [[kb.mainAdmin.confirmPayment]],
  tarif: [
    [kb.tarif.tarif_31, kb.tarif.tarif_365],
    [kb.tarif.order, kb.back],
  ],
  tarifForAdmin: [
    [kb.tarifForAdmin.EcoFit31, kb.tarifForAdmin.EcoFit365],
    [kb.back],
  ],
  order: [[kb.order.payment], [kb.order.screen], [kb.order.tarif, kb.back]],
};
