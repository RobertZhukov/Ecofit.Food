const { Scenes } = require("telegraf");
const { exit, choiseActivity } = require("../store/questions");
const { setPlayerHeight } = require("../controllers/player.controller");
const { checkValidHeight } = require("../helper");

const getHeightScena = () => {
  const screen = new Scenes.BaseScene("getHeight");

  screen.on("message", async (ctx) => {
    const { chatId, text } = getMessageParams(ctx);
    const height = Number(text);
    const isIntegerNumber = Number.isInteger(height);

    if (!isIntegerNumber) {
      ctx.reply("❓ Введите корректный рост (кг). Пример роста: 75", exit);
      ctx.scene.reenter();
      return ctx.scene.leave();
    }

    if (!checkValidHeight(height)) {
      ctx.reply("🧐 Введите настоящий рост от 100 до 250 см", exit);
      ctx.scene.reenter();
      return ctx.scene.leave();
    }

    await setPlayerHeight({ chatId, height });
    await ctx.reply("Выберите тип активности, нажав на кнопку", choiseActivity);
    await ctx.scene.enter("choiseActivity");
    return ctx.scene.leave();
  });
  return screen;
};

module.exports = { getHeightScena };
