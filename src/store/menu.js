const keyboard = require('./keyboard');

<<<<<<< HEAD
const mainMenuNewUser = {
  parse_mode: 'Markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.mainNewUser
  },
};

const mainMenuPlayer = {
  parse_mode: 'Markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.mainPlayer
  },
};

const mainMenuAdmin = {
  parse_mode: 'Markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.mainAdmin
  },
};

const tarifMenu = {
  parse_mode: 'Markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.tarif
  },
};

const tarifForAdmin = {
  parse_mode: 'Markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.tarifForAdmin
  },
};

const orderMenu = {
  parse_mode: 'Markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: keyboard.order
  },
};

module.exports = { 
  mainMenuNewUser, 
  mainMenuPlayer, 
  mainMenuAdmin,
  tarifMenu, 
  tarifForAdmin, 
  orderMenu 
}
=======
const menu = {
  parse_mode: 'Markdown',
  reply_markup: {
    keyboard: keyboard.main
  },
};

module.exports = { menu }
>>>>>>> a973f3bb8bcbf8543145d17c1cf42e5463eba09c
