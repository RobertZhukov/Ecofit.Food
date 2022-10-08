const { Scenes } = require("telegraf");
const { adminChatId } = require("../constants/constants");
const { newUserAnswers } = require("../store/answers");
const { exit } = require("../store/questions");
const ikb = require("../store/inlineKeyboardButtons");
const { orderMenu, mainMenuNewUser } = require("../store/menu");
const kb = require("../store/keyboardButtons");
const { answerToUnknownMessage } = require("../controllers/main.controller");
const { getCallbackQueryParams, getMessageParams } = require("../helper");

const confirmScreenScena = () => {
  const screen = new Scenes.BaseScene("screen");

  screen.action(/.+/, async (ctx) => {
    const { answerCallBack, chatId, messageId } = getCallbackQueryParams(ctx);

    switch (answerCallBack) {
      case ikb.exit.callback_data:
        await ctx.reply(newUserAnswers.exitScreen, orderMenu);
        await ctx.scene.leave();
        break;
    }
  });

  screen.on("message", async (ctx) => {
    const { username, chatId, firstName, text } = getMessageParams(ctx);

    switch (text) {
      case kb.back:
        await ctx.reply(newUserAnswers.exitScreen, mainMenuNewUser);
        await ctx.scene.leave();
        return;
    }

    if (text) {
      await ctx.reply("Это не фото. Пришлите, пожалуйста, фото оплаты. ", exit);
      ctx.scene.reenter();
    } else {
      await ctx.reply(newUserAnswers.afterGetSreen);
      await ctx.forwardMessage(adminChatId, chatId);
      await ctx.telegram.sendMessage(
        adminChatId,
        newUserAnswers.confirmPayment(firstName, username)
      );
      await ctx.telegram.sendMessage(adminChatId, chatId);
      await ctx.scene.leave();
    }
  });
  return screen;
};

module.exports = { confirmScreenScena };
