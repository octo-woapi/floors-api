import test from 'ava';
import path from 'path';

import createModel from './model';

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
  const file = path.join(__dirname, '..', 'floors.json');
  const model = createModel();
  await model.importData(file);
  t.is(typeof model.data, 'object');
});
