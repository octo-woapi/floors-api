import test from 'ava';
import path from 'path';

import createRepository from '../../src/repository';

const file = path.join(__dirname, '..', '..', 'assets', 'floors.json');
const repository = createRepository(file);

test('findFloors - should find floors', async (t) => {
  const floors = await repository.findFloors();
  t.true(Array.isArray(floors));
  t.true(floors.length > 0);
});

test('findFloor - should find one floor', async (t) => {
  const floor = await repository.findFloorById(2);
  t.is(typeof floor, 'object');
  t.is(floor.id, 2);
  t.true(floor.areas.length > 0);
});

test('findFloorAreas - should find a floor\'s areas', async (t) => {
  const areas = await repository.findFloorAreas(2);
  t.true(Array.isArray(areas));
  t.true(areas.length > 0);
});

test('findFloorAreaById - should find a floor\'s specific area by id', async (t) => {
  const area = await repository.findFloorAreaById(2, 1);
  t.is(typeof area, 'object');
  t.is(typeof area.name, 'string');
  t.is(typeof area.capacity, 'number');
  t.is(area.id, 1);
});
