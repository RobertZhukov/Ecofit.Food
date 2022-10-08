const { Scenes } = require("telegraf");
const ikb = require("../store/inlineKeyboardButtons");
const { defineMenu } = require("../controllers/main.controller");
const { activity } = require("../constants/enum");
const {
  setPlayerActivity,
  getMealPlan,
} = require("../controllers/player.controller");
const { getCallbackQueryParams } = require("../helper");

const choiseActivityScena = () => {
  const screen = new Scenes.BaseScene("choiseActivity");

  screen.action(/.+/, async (ctx) => {
    const { answerCallBack, chatId, messageId } = getCallbackQueryParams(ctx);
    const mainMenu = await defineMenu(chatId);

    switch (answerCallBack) {
      case ikb.activity.passive.callback_data:
        await setPlayerActivity({ chatId, activity: activity.PASSIVE });
        break;
      case ikb.activity.inactive.callback_data:
        await setPlayerActivity({ chatId, activity: activity.INACTIVE });
        break;
      case ikb.activity.active.callback_data:
        await setPlayerActivity({ chatId, activity: activity.ACTIVE });
        break;
      case ikb.activity.veryActive.callback_data:
        await setPlayerActivity({ chatId, activity: activity.OVERACTIVE });
        break;
    }

    await getMealPlan({ ctx, chatId });
    await ctx.scene.leave();
  });

  screen.on("message", async (ctx) => {
    await ctx.reply("Выберите тип активности, нажав на кнопку");
    ctx.scene.reenter();
  });
  return screen;
};

module.exports = { choiseActivityScena };
