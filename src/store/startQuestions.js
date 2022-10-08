const keyboard = require('./keyboard');

const startQuestions = {
  parse_mode: 'Markdown',
  reply_markup: {
    inline_keyboard: keyboard.info
  },
};

module.exports = { startQuestions }