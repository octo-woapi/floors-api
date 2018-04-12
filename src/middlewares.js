const error = () =>
  async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || err.code || err.statusCode || 500;
      ctx.body = err;
    }
  };

module.exports = {
  error,
};
