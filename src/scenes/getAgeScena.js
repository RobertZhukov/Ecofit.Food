const { Scenes } = require("telegraf");
const { exit } = require("../store/questions");
const { defineMenu } = require("../controllers/main.controller");
const { setPlayerAge } = require("../controllers/player.controller");
const { checkValidAge, getCallbackQueryParams, getMessageParams } = require("../helper");
const ikb = require("../store/inlineKeyboardButtons");
const { mainMenuPlayer } = require("../store/menu");

const getAgeScena = () => {
  const screen = new Scenes.BaseScene("getAge");

  screen.action(/.+/, async (ctx) => {
    const { answerCallBack, chatId, messageId } = getCallbackQueryParams(ctx);

    switch (answerCallBack) {
      case ikb.exit.callback_data:
        await ctx.reply(
          "Вы вышли из раздела получения программы.",
          mainMenuPlayer
        );
        await ctx.scene.leave();
        return;
    }

    await ctx.reply("Укажите Ваш возраст(лет) / Пример: 23", null);
    await ctx.scene.reenter();
  });

  screen.on("message", async (ctx) => {
    const { chatId, text } = getMessageParams(ctx);
    const mainMenu = await defineMenu(chatId);
    const age = Number(text);
    const isIntegerNumber = Number.isInteger(age);

    if (!isIntegerNumber) {
      ctx.reply("❓ Введите целое число (лет). Пример возраста: 25", exit);
      ctx.scene.reenter();
      ctx.scene.leave();
    }

    if (!checkValidAge(age)) {
      ctx.reply("🧐 Введите настоящий возраст от 14 до 99", exit);
      ctx.scene.reenter();
      ctx.scene.leave();
    }

    await setPlayerAge({ chatId, age });

    await ctx.deleteMessage(ctx.session.lastMsg);
    await ctx.scene.enter("getWeight");
    return ctx.scene.leave();
  });
  return screen;
};

module.exports = { getAgeScena };
