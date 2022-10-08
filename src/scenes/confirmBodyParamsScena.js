const { Scenes } = require("telegraf");
const { playerAnswers } = require("../store/answers");
const ikb = require("../store/inlineKeyboardButtons");
const { defineMenu } = require("../controllers/main.controller");
const {
  getUserData,
  definePlanByCalory,
} = require("../controllers/player.controller");
const { choiseGender } = require("../store/questions");
const { getCallbackQueryParams } = require("../helper");

const confirmBodyParamsScena = () => {
  const screen = new Scenes.BaseScene("confirmBodyParamsScena");

  screen.action(/.+/, async (ctx) => {
    const { answerCallBack, chatId, messageId } = getCallbackQueryParams(ctx);
    const mainMenu = await defineMenu(chatId);
    const userData = await getUserData(chatId);
    const caloryCount = userData.caloryCount;

    switch (answerCallBack) {
      case ikb.confirmBodyParams.confirm.callback_data:
        await ctx.reply(playerAnswers.successSaveUserAllBodyParams, mainMenu);
        await definePlanByCalory({ ctx, caloryCount });
        break;
      case ikb.confirmBodyParams.edit.callback_data:
        await ctx.reply("Выберите Ваш пол нажав на кнопку", choiseGender);
        await ctx.scene.enter("choiseGender");
        break;
    }
    await ctx.scene.leave();
  });

  screen.on("message", async (ctx) => {
    await ctx.reply("Подтвердите введённые данные или отредактируйте их...");
    ctx.scene.reenter();
  });
  return screen;
};

module.exports = { confirmBodyParamsScena };
