const { PLAYER, NEW_USER, ADMIN } = require("../constants/enum");
const {
  mainMenuPlayer,
  mainMenuNewUser,
  mainMenuAdmin,
} = require("../store/menu");
const { timeCounter } = require("../utils/timeCounter");
const User = require("../models/user.model");
const {
  getChatId,
  getMediaGroupPhoto,
  getMessageParams,
} = require("../helper");
const { playerAnswers, newUserAnswers } = require("../store/answers");
const {
  getProgrammQuestions,
  moreQuestions,
  moreReviews,
} = require("../store/questions");
const {
  confusionSticker,
  loveSticker,
  welcomeSticker,
  pensiveSticker,
} = require("../constants/stickers");

const getUserStatuses = async (chatId) => {
  const userStatus = await defineStatus(chatId);
  const isNewUser = userStatus === NEW_USER || !userStatus;
  const isPlayer = userStatus === PLAYER;
  const isAdmin = userStatus === ADMIN;
  return { isNewUser, isPlayer, isAdmin, userStatus };
};

const createNewUser = async (chatId, firstName) => {
  const newUser = {
    chatId,
    name: firstName,
  };
  const users = await User.findOne({ chatId }).lean();

  if (!users || users.length === 0) {
    await new User(newUser)
      .save()
      .then(() => console.log("Новый пользователь создан"))
      .catch((err) => console.log("ERROR:", err));
  } else {
    await User.updateOne({ chatId: chatId }, { $set: { updateAt: Date.now() } })
      .exec()
      .then(() => console.log("Дата обновлена"))
      .catch(() => console.log("Дата Не обновлена"));
  }
};

const startNW = async (ctx) => {
  const { chatId, firstName } = getMessageParams(ctx);

  await createNewUser(chatId, firstName);

  const mainMenu = await defineMenu(chatId);

  await ctx.telegram.sendSticker(chatId, welcomeSticker, mainMenu);
  setTimeout(() => {
    ctx.telegram.sendMessage(
      chatId,
      `${firstName}, ${newUserAnswers.welcomeMessage}`,
      moreQuestions
    );
  }, 1200);
  return;
};

const startPlayer = async (ctx) => {
  const { chatId, firstName } = getMessageParams(ctx);

  await createNewUser(chatId, firstName);

  const mainMenu = await defineMenu(chatId);

  await ctx.telegram.sendSticker(chatId, loveSticker, mainMenu);
  await ctx.telegram.sendMessage(
    chatId,
    `${firstName}, ${playerAnswers.welcome}`,
    getProgrammQuestions
  );
  return;
};

const startBot = async ({ ctx, isNewUser, isPlayer, isAdmin }) => {
  //Старт для NEW_USER или статус неопределен
  if (isNewUser) return startNW(ctx);
  //Старт для PLAYER
  if (isPlayer) return startPlayer(ctx);
  //Старт для ADMIN
  if (isAdmin) return await ctx.reply("Привет админ 😎", mainMenuAdmin);
};

const reviews = async (ctx) => {
  await ctx.replyWithMediaGroup([
    getMediaGroupPhoto("/img/reviews/review_2_1.jpg"),
    getMediaGroupPhoto("/img/reviews/review_2_2.jpg"),
    // getMediaGroupPhoto("/img/reviews/review_2_3.jpg"),
  ]);
  await ctx.replyWithMediaGroup([
    getMediaGroupPhoto("/img/reviews/review_3_1.jpg"),
    getMediaGroupPhoto("/img/reviews/review_3_2.jpg"),
  ]);
  await ctx.reply("Желаете посмотреть больше результатов?", moreReviews);
  return;
};

const ifGetSticker = async (ctx, chatId) => {
  await ctx.telegram.sendSticker(chatId, confusionSticker);
  await ctx.reply("Я не понимаю стикеры!)");
};

const approvePayment = async (ctx, userChatId, tarif) => {
  const tarifEnd = timeCounter(tarif);
  await User.updateOne(
    { chatId: userChatId },
    {
      $set: {
        status: PLAYER,
        tarif: {
          tarifName: tarif,
          tarifStart: Date.now(),
          tarifEnd,
        },
      },
    }
  )
    .exec()
    .then(() => ctx.reply("Пользователь одобрен ✅"))
    .catch(() => ctx.reply("Пользователь не найден ❌"));
};

const defineMenu = async (chatId) => {
  const user = await User.findOne({ chatId }).lean();
  return user?.status === PLAYER ? mainMenuPlayer : mainMenuNewUser;
};

const defineStatus = async (chatId) => {
  const user = await User.findOne({ chatId }).lean();
  return user?.status || false;
};

const answerToUnknownMessage = async ({ ctx, chatId }) => {
  const mainMenu = await defineMenu(chatId, User);

  await ctx.telegram.sendSticker(chatId, pensiveSticker);
  await ctx.reply(newUserAnswers.default, mainMenu);
};

module.exports = {
  createNewUser,
  defineMenu,
  defineStatus,
  approvePayment,
  answerToUnknownMessage,
  startBot,
  getUserStatuses,
  reviews,
  ifGetSticker,
  startPlayer,
  startNW,
};
