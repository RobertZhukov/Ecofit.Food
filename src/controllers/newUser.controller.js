const { newUserAnswers } = require("../store/answers");
const kb = require("../store/keyboardButtons");
const ikb = require("../store/inlineKeyboardButtons");
const { orderMenu, tarifMenu } = require("../store/menu");
const { aboutQuestions } = require("../store/questions");
const { answerToUnknownMessage, reviews } = require("./main.controller");
const { getMediaGroupPhoto } = require("../helper");

const newUserController = async ({ ctx, chatId, text, mainMenu }) => {
  switch (text) {
    case "/EcoFit31":
      await ctx.reply(newUserAnswers.order, orderMenu);
      break;
    case "/EcoFit365":
      await ctx.reply(newUserAnswers.order, orderMenu);
      break;
    case "/chet":
      await ctx.reply(newUserAnswers.payment, orderMenu);
      break;
    case "/menu":
      await ctx.reply("Меню открыто 👇", mainMenu);
      break;
    case kb.mainNewUser.tarif.text:
      await ctx.reply(
        "Выберите программу, чтобы узнать о ней подробнее ⬇",
        tarifMenu
      );
      break;
    case kb.mainNewUser.order.text:
      await ctx.reply(newUserAnswers.order, orderMenu);
      break;
    case kb.mainNewUser.about.text:
      await ctx.reply(newUserAnswers.about, aboutQuestions);
      break;
    case kb.mainNewUser.reviews.text:
      reviews(ctx);
      break;
    case kb.tarif.tarif_31.text:
      await ctx.reply(newUserAnswers.tarif_31, tarifMenu);
      break;
    case kb.tarif.tarif_365.text:
      await ctx.reply(newUserAnswers.tarif_365, tarifMenu);
      break;
    case kb.tarif.order.text:
      await ctx.reply(newUserAnswers.order, orderMenu);
      break;
    case kb.order.payment.text:
      await ctx.reply(newUserAnswers.payment, orderMenu);
      break;
    case kb.order.screen.text:
      await ctx.reply("Пришлите мне скриншот (фото чека оплаты) 📸");
      await ctx.scene.enter("screen");
      break;
    case kb.back:
      await ctx.reply("Главное меню открыто ⬇", mainMenu);
      break;
    default:
      answerToUnknownMessage({ ctx, chatId });
  }
};

const newUserInlineKeyboardController = async ({
  ctx,
  answerCallBack,
  mainMenu,
  chatId,
}) => {
  switch (answerCallBack) {
    case ikb.more.callback_data:
      await ctx.reply(newUserAnswers.about, aboutQuestions);
      break;
    case ikb.about.aboutPlan.callback_data:
      await ctx.reply(newUserAnswers.aboutPlan, mainMenu);
      break;
    case ikb.about.aboutSupport.callback_data:
      await ctx.reply(newUserAnswers.aboutSupport, mainMenu);
      break;
    case ikb.moreReviews.callback_data:
      moreReviews(ctx)
      break;
    default:
      answerToUnknownMessage({ ctx, chatId });
  }
};

const moreReviews = async (ctx) => {
  await ctx.replyWithMediaGroup([
    getMediaGroupPhoto("/img/reviews/review_0_1.jpg"),
    getMediaGroupPhoto("/img/reviews/review_0_2.jpg"),
    // getMediaGroupPhoto("/img/reviews/review_0_3.jpg"),
  ]);
  await ctx.replyWithMediaGroup([
    getMediaGroupPhoto("/img/reviews/review_1_1.jpg"),
    getMediaGroupPhoto("/img/reviews/review_1_2.jpg"),
    // getMediaGroupPhoto("/img/reviews/review_1_3.jpg"),
  ]);
  await ctx.replyWithMediaGroup([
    getMediaGroupPhoto("/img/reviews/review_4_1.jpg"),
    getMediaGroupPhoto("/img/reviews/review_4_2.jpg"),
    // getMediaGroupPhoto("/img/reviews/review_4_3.jpg"),
  ]);
  await ctx.replyWithMediaGroup([
    getMediaGroupPhoto("/img/reviews/review_5_1.jpg"),
  ]);
  await ctx.replyWithMediaGroup([
    getMediaGroupPhoto("/img/reviews/review_6_1.jpg"),
  ]);
  await ctx.replyWithMediaGroup([
    getMediaGroupPhoto("/img/reviews/review_7_1.jpg"),
    getMediaGroupPhoto("/img/reviews/review_7_2.jpg"),
    // getMediaGroupPhoto("/img/reviews/review_7_3.jpg"),
  ]);
  return;
};

module.exports = { newUserController, newUserInlineKeyboardController };
