const { newUserAnswers, playerAnswers } = require("../store/answers");
const kb = require("../store/keyboardButtons");
const ikb = require("../store/inlineKeyboardButtons");
const { choiseGender, confirmBodyParams } = require("../store/questions");
const User = require("../models/user.model");
const { MAN } = require("../constants/enum");
const { activityRate } = require("../constants/constants");
const {
  formulaCaloryToMen,
  formulaCaloryToWomen,
  isAllValuesExist,
} = require("../helper");
const { answerToUnknownMessage } = require("./main.controller");
const { pensiveSticker } = require("../constants/stickers");

const playerController = async ({ ctx, chatId, text, mainMenu }) => {
  switch (text) {
    case "/menu":
      await ctx.reply("Меню открыто 👇", mainMenu);
      break;
    case "/programm":
      await ctx.reply(playerAnswers.getProgramm, mainMenu);
      break;
    case kb.mainPlayer.support.text:
      await ctx.reply(playerAnswers.help, mainMenu);
      break;
    case kb.mainPlayer.getProgramm.text:
      getProgramm({ ctx, mainMenu });
      break;
    case kb.mainPlayer.bonus.text:
      await ctx.reply(playerAnswers.bonus, mainMenu);
      break;
    case kb.back:
      await ctx.reply("Главное меню открыто ⬇", mainMenu);
      break;
    default:
      await ctx.telegram.sendSticker(chatId, pensiveSticker);
      await ctx.reply(newUserAnswers.default, mainMenu);
  }
};

const playerInlineKeyboardController = async ({
  ctx,
  answerCallBack,
  mainMenu,
  chatId,
}) => {
  switch (answerCallBack) {
    case ikb.getProgramm.callback_data:
      getProgramm({ ctx, mainMenu });
      break;
    default:
      answerToUnknownMessage({ ctx, chatId });
  }
};

async function getProgramm({ ctx }) {
  await ctx.reply("Выберите Ваш пол нажав на кнопку", choiseGender);

  // ctx.session.lastMsg = ctx.message.message_id;
  // console.log("ctx.session.lastMsg", ctx.session.lastMsg);
  await ctx.scene.enter("choiseGender");
}

const calculateKBZUCount = (bodyParams) => {
  const { gender, age, weight, height, activity } = bodyParams;

  if (!isAllValuesExist([gender, age, weight, height, activity])) {
    return console.log("Не хватает параметров для подсчета");
  }

  const caloryWithoutAcRate =
    gender === MAN
      ? formulaCaloryToMen({ weight, height, age })
      : formulaCaloryToWomen({ weight, height, age });
  const currentActivityRate = activityRate[activity];
  const caloryWithActivityRate = caloryWithoutAcRate * currentActivityRate;
  const totalCalory = caloryWithActivityRate * 0.9;

  return totalCalory;
};

const definePlanByCalory = async ({ ctx, caloryCount }) => {
  if (caloryCount <= 1300) {
    return ctx.replyWithDocument({ source: "./src/documents/2100-C.pdf" });
  }
  if (caloryCount > 1300 && caloryCount < 1500) {
    return ctx.replyWithDocument({ source: "./src/documents/2100-C.pdf" });
  }
  if (caloryCount >= 1500 && caloryCount <= 1700) {
    return ctx.replyWithDocument({ source: "./src/documents/2100-C.pdf" });
  }
  if (caloryCount > 1700 && caloryCount < 1900) {
    return ctx.replyWithDocument({ source: "./src/documents/2100-C.pdf" });
  }
  if (caloryCount >= 1900) {
    return ctx.replyWithDocument({ source: "./src/documents/2100-C.pdf" });
  }

  ctx.reply(
    "🧐 Ошибка при рассчете программы питания под Ваши параметры. Напишите нам в @ecofit_admin, мы решим этот вопрос в ближайшие 10 мин."
  );
};

const getMealPlan = async ({ ctx, chatId }) => {
  const { bodyParams } = await User.findOne({ chatId }).lean();
  const caloryCount = calculateKBZUCount(bodyParams);

  await User.updateOne(
    { chatId },
    { $set: { caloryCount: Math.round(caloryCount) } }
  );

  await ctx.reply(
    playerAnswers.saveUserAllBodyParams(bodyParams),
    confirmBodyParams
  );
  await ctx.scene.enter("confirmBodyParamsScena");
};

const updateFieldToBodyParams = async ({ chatId, field, textMessage }) => {
  const user = await User.findOne({ chatId }).lean();
  await User.updateOne(
    { chatId },
    {
      $set: {
        bodyParams: {
          ...user.bodyParams,
          ...field,
        },
      },
    }
  )
    .exec()
    .then(() => console.log(`${textMessage} сохранен ✅`))
    .catch(() => console.log(`${textMessage} сохранен ❌`));
};

const setPlayerAge = async ({ chatId, age }) => {
  await updateFieldToBodyParams({
    chatId,
    field: { age: Number(age) },
    textMessage: "Возраст",
  });
};

const setPlayerWeight = async ({ chatId, weight }) => {
  await updateFieldToBodyParams({
    chatId,
    field: { weight: Number(weight) },
    textMessage: "Вес",
  });
};

const setPlayerHeight = async ({ chatId, height }) => {
  await updateFieldToBodyParams({
    chatId,
    field: { height: Number(height) },
    textMessage: "Рост",
  });
};

const setPlayerGender = async ({ chatId, gender }) => {
  await updateFieldToBodyParams({
    chatId,
    field: { gender },
    textMessage: "Пол",
  });
};

const setPlayerActivity = async ({ chatId, activity }) => {
  await updateFieldToBodyParams({
    chatId,
    field: { activity },
    textMessage: "Активность",
  });
};

const getUserData = async (chatId) => {
  return User.findOne({ chatId }).lean();
};

module.exports = {
  playerController,
  playerInlineKeyboardController,
  setPlayerAge,
  setPlayerWeight,
  setPlayerHeight,
  setPlayerGender,
  setPlayerActivity,
  getMealPlan,
  definePlanByCalory,
  getUserData,
};
