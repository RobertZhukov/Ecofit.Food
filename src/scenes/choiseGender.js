const { Scenes } = require("telegraf");
const ikb = require("../store/inlineKeyboardButtons");
const { gender } = require("../constants/enum");
const { setPlayerGender } = require("../controllers/player.controller");
const { getCallbackQueryParams } = require("../helper");

const choiseGenderScena = () => {
  const screen = new Scenes.BaseScene("choiseGender");

  screen.action(/.+/, async (ctx) => {
    const { answerCallBack, chatId, messageId } = getCallbackQueryParams(ctx);

    switch (answerCallBack) {
      case ikb.gender.man.callback_data:
        await setPlayerGender({ chatId, gender: gender.MAN });
        ctx.deleteMessage(messageId);
        break;
      case ikb.gender.woman.callback_data:
        await setPlayerGender({ chatId, gender: gender.WOMAN });
        ctx.deleteMessage(messageId);
        break;
    }

    const message = await ctx.reply("Укажите Ваш возраст(лет) / Пример: 23");
    ctx.session.lastMsg = message.message_id;
    await ctx.scene.enter("getAge");
    await ctx.scene.leave();
  });

  screen.on("message", async (ctx) => {
    await ctx.reply("Выберите Ваш пол нажав на кнопку");
    ctx.scene.reenter();
  });
  return screen;
};

module.exports = { choiseGenderScena };
