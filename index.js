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

require("http")
  .createServer()
  .listen(process.env.PORT || 5000)
  .on("request", function (req, res) {
    res.end("");
  });
const bot = new Telegraf(process.env.BOT_TOKEN, { polling: true });
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
  }
});

bot.launch();

module.exports = bot;
