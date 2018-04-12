import test from 'ava';
import request from 'supertest';

import createApp from '../../src/app';

test.beforeEach('Create context', (t) => {
  t.context = {
    app: createApp().callback(),
  };
});

test('GET /floors -> 200 OK', async (t) => {
  const { app } = t.context;
  const res = await request(app)
    .get('/v1/floors');
  t.is(res.status, 200);
  const floors = res.body;
  t.true(floors.length > 0);
});

test('GET /floors/:id -> 200 OK', async (t) => {
  const { app } = t.context;
  const res = await request(app)
    .get('/v1/floors/2');
  t.is(res.status, 200);
  const floor = res.body;
  t.is(floor.id, 2);
  t.true(floor.areas.length > 0);
});

test('GET /floors/:id -> 400 Bad request', async (t) => {
  const { app } = t.context;
  const res = await request(app)
    .get('/v1/floors/badid');
  t.is(res.status, 400);
});

test('GET /floors/:id -> 404 Not found', async (t) => {
  const { app } = t.context;
  const res = await request(app)
    .get('/v1/floors/50');
  t.is(res.status, 404);
});
