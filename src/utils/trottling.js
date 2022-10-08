const { commonAnswers } = require("../store/answers");

const trottling = (ctx) => {
  ctx.session = ctx.session ?? {
    lastTime: 0,
    counter: 0,
  };

  const interval = parseInt(+new Date() / 1000) - ctx.session.lastTime;
  ctx.session.lastTime = parseInt(+new Date() / 1000);

  if (interval <= 1) {
    ctx.session.counter === 0 && ctx.reply(commonAnswers.spam);
    ctx.session.counter++;
    return true;
  } else {
    ctx.session.counter = 0;
    return false;
  }
};

module.exports = { trottling };
