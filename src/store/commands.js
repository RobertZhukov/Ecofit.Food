// const kb = require('./keyboardButtons');
const { dataBase } = require('./dataBase');
const { dataBot } = require('./dataBot');
const { getChatId, getChatIdInMessage } = require('../helper');
const { startQuestions } = require('./startQuestions');
const { questions } = require('./questions');
const fs = require('fs');
const { menu } = require('./menu');

const repeatInfo = async (msg, bot, chatId) => {
  setTimeout(async() => {
    await bot.sendMessage(chatId, 'Что ещё Вас интересует? 🧐', startQuestions);
    await bot.sendMessage(chatId, 'Открыть меню 👉 /openMenu');
  }, 2000)
  return
}

const start = async (msg, bot) => {
  const chatId = getChatId(msg);
  const firstName = msg.chat.first_name;
  const newUser = {
    chatId,
    name: firstName,
  };

  const res = dataBase.users.filter(el => el.chatId === chatId);
  if (res.length === 0) dataBase.users.push(newUser);

  await bot.sendSticker(chatId, 'CAACAgIAAxkBAAEClIlg7-GOFeMBATLKNlUUkGU9W0kQegACRA0AAnRUOEq2IqcoVVzpESAE');
  await bot.sendMessage(chatId, `${msg.from.first_name}, ${dataBot.mes.welcomeMessage}`, menu);
  await repeatInfo(msg, bot, chatId)
  return
}

const sendAdvantages = async (msg, bot, chatId) => {
  await bot.sendMessage(chatId, questions.advantages, { parse_mode: 'Markdown' });
  await bot.sendPhoto(chatId, fs.readFileSync('./src/img/advantages.jpg'))
  await repeatInfo(msg, bot, chatId)
  return
}

const sendConditions = async (msg, bot, chatId) => {
  await bot.sendMessage(chatId, questions.conditions, { parse_mode: 'Markdown' });
  await repeatInfo(msg, bot, chatId)
  return
}

const sendBrand = async (msg, bot, chatId) => {
  await bot.sendPhoto(chatId, fs.readFileSync('./src/img/girlsWithBook.jpg'))
  await bot.sendMessage(chatId, questions.brand_1, { parse_mode: 'Markdown' });
  setTimeout(async() => {
    await bot.sendPhoto(chatId, fs.readFileSync('./src/img/worldMap.jpg'))
    await bot.sendMessage(chatId, questions.brand_2, { parse_mode: 'Markdown' });
    await bot.sendVideo(chatId, 'https://minimelts.com.ua/assets/video/movie-1.mp4');
    await repeatInfo(msg, bot, chatId)
  }, 3000)
  return
}

const sendContacts = async (msg, bot, chatId) => {
  await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq79hBvOdmaIkBknLh1xL3FMTNcTBUgAC9w0AApys-ErJAAFSBXG0bpggBA')
  await bot.sendMessage(chatId, questions.contacts, { parse_mode: 'Markdown' });
  await repeatInfo(msg, bot, chatId)
  return
}

const sendOrder = async (msg, bot, chatId) => {
  await bot.sendSticker(chatId, 'CAACAgIAAxkBAAEClIlg7-GOFeMBATLKNlUUkGU9W0kQegACRA0AAnRUOEq2IqcoVVzpESAE');
  await bot.sendMessage(chatId, questions.order, { parse_mode: 'Markdown' });
  await repeatInfo(msg, bot, chatId)
  return
}

const sendIceCreamType = async (msg, bot, chatId) => {
  await bot.sendMessage(chatId, questions.iceCreamType_1, { parse_mode: 'Markdown' });
  await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq5xhBuo5xY3Gr-vSi45dmGGMCJUitAAC0g8AAsJo8UpQXrP-rJ4OZyAE');
  setTimeout(async() => {
    await bot.sendMessage(chatId, questions.iceCreamType_2, { parse_mode: 'Markdown' });
    await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq55hBusBpMTjLJUY-cqkfjqUq7k3PQACTxMAAt0Z8UqZzQNAlMG2gyAE');
    await bot.sendMessage(chatId, questions.iceCreamType_3, { parse_mode: 'Markdown' });
    await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq6BhBuuQMC-4LXSpygNlxz1SrYct0gACEw8AAruf-EocKYojaZpyKSAE');
    await bot.sendMessage(chatId, questions.iceCreamType_4, { parse_mode: 'Markdown' });
    await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq6JhBuv0Fppwt4QOVv1CJEbZ0JsqFgAC_A0AAqXI8UrQYz8a3181MiAE');
    await bot.sendMessage(chatId, questions.iceCreamType_5, { parse_mode: 'Markdown' });
    await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq6ZhBuxUL1P0xD_0OuIDhGWBtzsNAQACoAsAAj5Y-UrNi1d65FxiKCAE');
    await bot.sendMessage(chatId, questions.iceCreamType_6, { parse_mode: 'Markdown' });
    await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq7VhBuywHYQqohc05uRcqUx1nXtsJwACxAwAAltt-UqJP1pbFpQynyAE');
    await bot.sendMessage(chatId, questions.iceCreamType_7, { parse_mode: 'Markdown' });
    await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq7dhBuzvIo1zkcFnORfSCtCxCHKHiwACaQ8AAuKe8Epobp_CxVlNrSAE');
    await bot.sendMessage(chatId, questions.iceCreamType_8, { parse_mode: 'Markdown' });
    await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq7lhBu1LiX4NjjxRVbjiqOpM15-sAAOCDgACKufwSl-Uy8wl_K3qIAQ');
    await bot.sendMessage(chatId, questions.iceCreamType_9, { parse_mode: 'Markdown' });
    await bot.sendSticker(chatId, 'CAACAgIAAxkBAAECq71hBu2z_U5Z7n6YO3uIuTUOQm9y1AACuwsAAkip-ErSFfJ5ygk15SAE');
    await bot.sendMessage(chatId, questions.iceCreamType_10, { parse_mode: 'Markdown' });
    await repeatInfo(msg, bot, chatId)
  }, 3000)
  return
}

const sendMakeProcess = async (msg, bot, chatId) => {
  await bot.sendPhoto(chatId, fs.readFileSync('./src/img/makeProcess.jpg'))
  await bot.sendMessage(chatId, questions.makeProcess, { parse_mode: 'Markdown' });
  await repeatInfo(msg, bot, chatId)
  return
}

const sendEquipment = async (msg, bot, chatId) => {
  await bot.sendMessage(chatId, questions.equipment, { parse_mode: 'Markdown' });
      
      setTimeout(async() => {
        await bot.sendPhoto(chatId, fs.readFileSync('./src/img/typeKiosk.jpg'))
        await bot.sendMessage(chatId, questions.equipment_1, { parse_mode: 'Markdown' });
      }, 2000)
      setTimeout(async() => {
        await bot.sendPhoto(chatId, fs.readFileSync('./src/img/typeVending.jpg'))
        await bot.sendMessage(chatId, questions.equipment_2, { parse_mode: 'Markdown' });

        await bot.sendPhoto(chatId, fs.readFileSync('./src/img/typeMiniCompactRetail.jpg'))
        await bot.sendMessage(chatId, questions.equipment_3, { parse_mode: 'Markdown' });

        await bot.sendPhoto(chatId, fs.readFileSync('./src/img/typeMiniCompact.jpg'))
        await bot.sendMessage(chatId, questions.equipment_4, { parse_mode: 'Markdown' });

        await bot.sendPhoto(chatId, fs.readFileSync('./src/img/typeMiniGlass.jpg'))
        await bot.sendMessage(chatId, questions.equipment_5, { parse_mode: 'Markdown' });

        await bot.sendPhoto(chatId, fs.readFileSync('./src/img/typeCompact.jpg'))
        await bot.sendMessage(chatId, questions.equipment_6, { parse_mode: 'Markdown' });
        
        await repeatInfo(msg, bot, chatId)
      }, 4000)
  return
}

  module.exports = {
    start,
    repeatInfo,
    sendAdvantages,
    sendEquipment,
    sendConditions,
    sendBrand,
    sendContacts,
    sendOrder,
    sendIceCreamType,
    sendMakeProcess,
  }