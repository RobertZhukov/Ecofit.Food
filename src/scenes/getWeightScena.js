const { Scenes, session } = require("telegraf");
const { exit } = require("../store/questions");
const { setPlayerWeight } = require("../controllers/player.controller");
const { checkValidWeight } = require("../helper");

const getWeightScena = () => {
  const screen = new Scenes.BaseScene("getWeight");

  screen.on("message", async (ctx) => {
    const { chatId, text } = getMessageParams(ctx);
    const weight = Number(text);
    const isIntegerNumber = Number.isInteger(weight);

    if (!isIntegerNumber) {
      ctx.reply("❓ Введите корректный вес (кг). Пример веса: 75", exit);
      ctx.scene.reenter();
      return ctx.scene.leave();
    }

    if (!checkValidWeight(weight)) {
      ctx.reply("🧐 Введите настоящий вес от 20 до 299", exit);
      ctx.scene.reenter();
      return ctx.scene.leave();
    }

    await setPlayerWeight({ chatId, weight });
    await ctx.reply("Введите Ваш рост(см) / Пример: 175", null);
    await ctx.scene.enter("getHeight");
    return ctx.scene.leave();
  });
  return screen;
};

module.exports = { getWeightScena };
