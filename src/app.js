// External imports
const Joi = require('joi');
const Koa = require('koa');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const httpLogger = require('koa-logger');
const responseTime = require('koa-response-time');
const Router = require('koa-router');
const validate = require('koa2-validation');
const path = require('path');

// Internal imports
const createController = require('./controller');
const middlewares = require('./middlewares');
const createRepository = require('./repository');

module.exports = () => {
  // Initialization
  const file = path.join(__dirname, '..', 'assets', 'floors.json');
  const repository = createRepository(file);
  const controller = createController(repository);

  // Create API
  const app = new Koa();
  const router = new Router({
    prefix: '/v1',
  });

  // Register development middlewares
  if (process.env.NODE_ENV !== 'production') {
    app.use(httpLogger());
  }

  // Register common middlewares
  app.use(responseTime());
  app.use(helmet());
  app.use(cors());

  // Error handler
  app.use(middlewares.error());

  // Home route
  router.get('/', (ctx) => {
    ctx.status = 200;
    ctx.body = {
      name: 'OCTO floors API',
      message: 'Welcome!',
      version: 1,
    };
  });

  // API routes
  router.get('/floors', controller.listFloors);

  router.get('/floors/:id', validate({
    params: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
  }), controller.getFloor);

  router.get('/floors/:id/areas', validate({
    params: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
  }), controller.listFloorAreas);

  router.get('/floors/:floorId/areas/:areaId', validate({
    params: Joi.object().keys({
      floorId: Joi.number().integer().required(),
      areaId: Joi.number().integer().required(),
    }),
  }), controller.getFloorArea);

  // Register routes into the app
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
};
