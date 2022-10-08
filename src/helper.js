<<<<<<< HEAD
const {
  minWeight,
  maxWeight,
  minHeight,
  maxHeight,
  minAge,
  maxAge,
  activityRu,
} = require("./constants/constants");

module.exports = {
  getChatId(msg) {
    return msg.chat.id;
  },
  getChatIdInMessage(msg) {
    return msg.message.chat.id;
  },
  checkValidAge(age) {
    return age >= minAge && age <= maxAge;
  },
  checkValidWeight(weight) {
    return weight >= minWeight && weight <= maxWeight;
  },
  checkValidHeight(height) {
    return height >= minHeight && height <= maxHeight;
  },
  formulaCaloryToMen({ weight, height, age }) {
    return 9.99 * weight + 6.25 * height - 4.92 * age + 5;
  },
  formulaCaloryToWomen({ weight, height, age }) {
    return 9.99 * weight + 6.25 * height - 4.92 * age - 161;
  },
  isAllValuesExist(valuesArray) {
    let res = true;
    for (let i = 0; i < valuesArray.length; i++) {
      if (!valuesArray[i]) {
        res = false;
        break;
      }
    }
    return res;
  },
  getDeclensionsAge(age) {
    let count = age % 100;
    if (count >= 5 && count <= 20) {
      return "лет";
    } else {
      count = count % 10;
      if (count === 1) {
        return "год";
      } else if (count >= 2 && count <= 4) {
        return "года";
      } else {
        return "лет";
      }
    }
  },
  getMediaGroupPhoto(path) {
    return {
      media: { source: `./src${path}` },
      type: "photo",
    };
  },
  getCallbackQueryParams(ctx) {
    return {
      answerCallBack: ctx.callbackQuery.data,
      chatId: ctx.callbackQuery.from.id,
      messageId: ctx.callbackQuery.message.message_id,
    };
  },
  getMessageParams(ctx) {
    return {
      text: ctx.message.text,
      chatId: ctx.message.chat.id,
      firstName: ctx.message.chat.first_name,
      username: ctx.message.chat.username,
      messageId: ctx.message.message_id,
      sticker: ctx.message.sticker,
    };
  },
};
=======
module.exports = {
  getChatId(msg) {
    return msg.chat.id
  },
  getChatIdInMessage(msg) {
    return msg.message.chat.id
  }
}
>>>>>>> a973f3bb8bcbf8543145d17c1cf42e5463eba09c
