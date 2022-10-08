const kb = require("../store/keyboardButtons");
const { tarifForAdmin, mainMenuAdmin } = require("../store/menu");

const adminController = async ({ ctx, text }) => {
  switch (text) {
    case "/menu":
      await ctx.reply("Меню открыто 👇", mainMenuAdmin);
      break;
    case kb.mainAdmin.confirmPayment.text:
      await ctx.reply("⚠️ Выберите тариф ⬇", tarifForAdmin);
      await ctx.scene.enter("approveScreen");
      break;
    default:
      await ctx.reply("Нераспознанная команда ❓", mainMenuAdmin);
  }
};

const adminInlineKeyboardController = async ({
  ctx,
  answerCallBack,
  mainMenu,
  chatId,
}) => {
  consoe.log("adminInlineKeyboardController НЕ ЗАПРОГРАММИРОВАН!");
  // switch (answerCallBack) {
  //   case ikb.getProgramm.callback_data:
  //     await ctx.reply(playerAnswers.getProgramm, mainMenu);
  //     // await ctx.replyWithDocument({ source: "./src/documents/3.pdf" })
  //     break;
  // }
};

module.exports = { adminController, adminInlineKeyboardController };
