// External imports
const bunyan = require('bunyan');
const Koa = require('koa');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const httpLogger = require('koa-logger');
const responseTime = require('koa-response-time');
const Router = require('koa-router');
const validator = require('koa-context-validator');
const path = require('path');

// Internal imports
const createController = require('./controller');
const middlewares = require('./middlewares');
const createRepository = require('./repository');

// Initialization
const file = path.join(__dirname, '..', 'assets', 'floors.json');
const repository = createRepository(file);
const controller = createController(repository);
const logger = bunyan.createLogger();
const { object, number } = validator;
const validate = validator.default;

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
  params: object().keys({
    id: number().integer().min(0).max(6).required(), // eslint-disable-line
  }),
}), controller.getFloor);

// Register routes into the app
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
app.listen(3000, () => {
  logger.info('Listening on port 3000.');
});
