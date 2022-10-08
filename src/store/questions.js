const inlineKeyboard = require('./inlineKeyboard');

const aboutQuestions = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.about,
  },
};

const moreReviews = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.moreReviews,
  },
};

const confirmPayment = {
  reply_markup: {
    inline_keyboard: inlineKeyboard.confirmPayment,
  },
};

const moreQuestions = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.more,
  },
};

const getProgrammQuestions = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.getProgramm,
  },
};

const tarif = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.tarif,
  },
};

const exit = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.exit,
  },
};

const choiseGender = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.gender,
  },
};


const choiseActivity = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.activity,
  },
};

const confirmBodyParams = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: inlineKeyboard.confirmBodyParams,
  },
};

module.exports = { 
  aboutQuestions, 
  confirmPayment,
  moreQuestions,
  getProgrammQuestions,
  choiseGender,
  choiseActivity,
  exit,
  tarif,
  confirmBodyParams,
  moreReviews,
}
