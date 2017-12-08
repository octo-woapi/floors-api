import test from 'ava';
import path from 'path';

import createModel from '../../src/model';

let model;
let file;

test.before('Import data', async () => {
  file = path.join(__dirname, '..', '..', 'assets', 'floors.json');
  model = createModel();
  await model.importData(file);
});

test('Should create a model', async t => {
  const model = createModel();
  t.is(typeof model, 'object');
  t.is(typeof model.importData, 'function');
  t.is(typeof model.floors, 'function');
  t.is(typeof model.floor, 'function');
  t.is(typeof model.areas, 'function');
  t.is(typeof model.area, 'function');
});

test('Should import the file content', async t => {
  const localModel = createModel(file);
  const promise = localModel.importData(file);
  await t.notThrows(promise);
});

test('Should return floors', async t => {
  const floors = await model.floors();
  t.true(Array.isArray(floors));
  t.true(floors.length > 0);
  floors.forEach(async floor => {
    t.is(typeof floor, 'object');
    t.is(typeof floor.id, 'number');
    t.true(Array.isArray(floor.areas));
  });
});

test('Should return a single floor', async t => {
  const id = 0;
  const floor = await model.floor(id);
  t.is(typeof floor, 'object');
  t.is(floor.id, 0);
  t.deepEqual(floor.areas, []);
});

test('Should fail to find a non-existing floor', async t => {
  const id = -42;
  const promise = model.floor(id);
  const error = await t.throws(promise);
  t.is(error.message, 'Element not found');
});

test('Should return a floor\'s areas ', async t => {
  const id = 2;
  const areas = await model.areas(id);
  t.true(Array.isArray(areas));
  t.true(areas.length > 0);
});

test('Should fail to find areas of a non-existing floor', async t => {
  const id = -42;
  const promise = model.areas(id);
  const error = await t.throws(promise);
  t.is(error.message, 'Element not found');
});

test.todo('Should return a single floor\'s area');

test.todo('Should fail to find a floor\'s area');
