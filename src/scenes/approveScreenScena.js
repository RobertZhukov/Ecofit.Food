const { Scenes, session } = require("telegraf");
const { playerAnswers } = require("../store/answers");
const { exit } = require("../store/questions");
const ikb = require("../store/inlineKeyboardButtons");
const { mainMenuPlayer, mainMenuAdmin } = require("../store/menu");
const { approvePayment } = require("../controllers/main.controller");
const kb = require("../store/keyboardButtons");
const { ECOFIT_31, ECOFIT_365 } = require("../constants/enum");
const { loveSticker } = require("../constants/stickers");
const { getCallbackQueryParams, getMessageParams } = require("../helper");

const approveScreenScena = () => {
  const screen = new Scenes.BaseScene("approveScreen");
  screen.use(session());

  screen.action(/.+/, async (ctx) => {
    const { answerCallBack, chatId, messageId } = getCallbackQueryParams(ctx);

    switch (answerCallBack) {
      case ikb.exit.callback_data:
        await ctx.reply(
          "Вы вышли из раздела подтверждения оплаты.",
          mainMenuAdmin
        );
        await ctx.scene.leave();
        break;
    }
  });

  screen.on("message", async (ctx) => {
    const { text } = getMessageParams(ctx);
    const currentUserId = Number(text);

    if (currentUserId && currentUserId > 0) {
      await approvePayment(ctx, currentUserId, ctx.scene.state.tarif);
      await ctx.telegram.sendSticker(currentUserId, loveSticker);
      await ctx.telegram.sendMessage(
        currentUserId,
        playerAnswers.approvedStatus,
        mainMenuPlayer
      );
      return ctx.scene.leave();
    }

    switch (text) {
      case kb.tarifForAdmin.EcoFit31.text:
        ctx.scene.state = { tarif: ECOFIT_31 };
        await ctx.reply("⚠️ Введите номер пользователя ⬇");
        ctx.scene.reenter();
        break;
      case kb.tarifForAdmin.EcoFit365.text:
        ctx.scene.state = { tarif: ECOFIT_365 };
        await ctx.reply("⚠️ Введите номер пользователя ⬇");
        ctx.scene.reenter();
        break;
      case kb.back:
        await ctx.reply(
          "Вы вышли из раздела подтверждения оплаты.",
          mainMenuAdmin
        );
        return ctx.scene.leave();
      default:
        await ctx.reply("Введите корректный chatId ❗️", exit);
        ctx.scene.reenter();
    }
  });
  return screen;
};

module.exports = { approveScreenScena };
