<<<<<<< HEAD
const { Telegraf, session, Scenes } = require("telegraf");
require("dotenv").config();
const { getChatId, getMessageParams } = require("./src/helper");
const User = require("./src/models/user.model");
const { mongooseConnect } = require("./src/utils/mongooseConnect");
const {
  defineMenu,
  defineStatus,
  startBot,
  getUserStatuses,
  ifGetSticker,
  startNW,
} = require("./src/controllers/main.controller");
const { PLAYER, NEW_USER, ADMIN } = require("./src/constants/enum");
const { trottling } = require("./src/utils/trottling");
const {
  newUserController,
  newUserInlineKeyboardController,
} = require("./src/controllers/newUser.controller");
const {
  adminController,
  adminInlineKeyboardController,
} = require("./src/controllers/admin.controller");
const {
  playerController,
  playerInlineKeyboardController,
} = require("./src/controllers/player.controller");
const { scenesStageArray } = require("./src/constants/scenesStageArray");

const stage = new Scenes.Stage(scenesStageArray);

// require('http').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){ res.end('') })
// const bot = new TelegramBot(process.env.TOKEN_MINIMELTS_BOT, { polling: true });
const bot = new Telegraf(process.env.BOT_TOKET);
bot.use(session());
bot.use(stage.middleware());

mongooseConnect();

// Обработка команд inlineKeyboard
bot.action(/.+/, async (ctx) => {
  // Проверка от спама
  if (trottling(ctx)) return;

  const chatId = ctx.update.callback_query.from.id;
  const answerCallBack = ctx.update.callback_query.data;
  const mainMenu = await defineMenu(chatId, User);
  const { isNewUser, isPlayer, isAdmin } = await getUserStatuses(chatId);

  if (isNewUser) {
    newUserInlineKeyboardController({ ctx, answerCallBack, mainMenu, chatId });
  }
  if (isPlayer) {
    playerInlineKeyboardController({ ctx, answerCallBack, mainMenu, chatId });
  }
  if (isAdmin) {
    adminInlineKeyboardController({ ctx, answerCallBack, mainMenu, chatId });
  }
  return;
});

bot.on("message", async (ctx) => {
  // Проверка от спама
  if (trottling(ctx)) return;

  const { text, chatId, sticker } = getMessageParams(ctx);
  const mainMenu = await defineMenu(chatId, User);
  const { isNewUser, isPlayer, isAdmin, userStatus } = await getUserStatuses(
    chatId
  );

  //Старт для неопределенной команды, если пользователь был удален
  if (!userStatus) return startNW(ctx);

  if (text === "/start") {
    return startBot({ ctx, isNewUser, isPlayer, isAdmin, userStatus });
  }

  // Обработка получения стикеров
  if (sticker) return await ifGetSticker(ctx, chatId);

  if (isNewUser) {
    newUserController({ ctx, chatId, text, mainMenu });
  }
  if (isPlayer) {
    playerController({ ctx, chatId, text, mainMenu });
  }
  if (isAdmin) {
    adminController({ ctx, text });
=======
const TelegramBot = require('node-telegram-bot-api');
const { menu } = require('./src/store/menu');
const kb = require('./src/store/keyboardButtons');
const {
  start,
  sendAdvantages,
  sendEquipment,
  sendConditions,
  sendBrand,
  sendContacts,
  sendOrder,
  sendIceCreamType,
  sendMakeProcess,
} = require('./src/store/commands');
const { getChatId, getChatIdInMessage } = require('./src/helper');
require('http').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
  res.end('')
})

const bot = new TelegramBot(process.env.TOKEN_MINIMELTS_BOT, { polling: true });

bot.on('callback_query', async (msg) => {
  const chatId = getChatIdInMessage(msg);

  switch (msg.data) {
    case kb.info.advantages.callback_data:
      await sendAdvantages(msg, bot, chatId)
      break
    case kb.info.makeProcess.callback_data: 
      await sendMakeProcess(msg, bot, chatId)
      break
    default:
      await bot.sendMessage(chatId, 'Не понял вопроса?!');
>>>>>>> a973f3bb8bcbf8543145d17c1cf42e5463eba09c
  }
});

<<<<<<< HEAD
bot.launch();
=======
bot.on('message', async (msg) => {
  const chatId = getChatId(msg);

  switch (msg.text) {
    case '/start': 
      start(msg, bot)
      break
    case '/openMenu': 
      bot.sendMessage(chatId, 'Меню открыто 👇', menu);
      break
    case kb.main.brand: 
      await sendBrand(msg, bot, chatId)
      break
    case kb.main.equipment:
      await sendEquipment(msg, bot, chatId)
      break
    case kb.main.contacts: 
      await sendContacts(msg, bot, chatId)
      break
    case kb.main.conditions: 
      await sendConditions(msg, bot, chatId)
      break
    case kb.main.order: 
      await sendOrder(msg, bot, chatId)
      break
    case kb.main.iceCreamType: 
      await sendIceCreamType(msg, bot, chatId)
      break
    default: 
      bot.sendMessage(chatId, 'Вы ввели непонятную мне команду!)');
  }
});
>>>>>>> a973f3bb8bcbf8543145d17c1cf42e5463eba09c

module.exports = bot;
