import test from 'ava';
import sinon from 'sinon';

import createController from '../../src/controller';

const floors = [
  {
    id: 2,
    areas: [
      {
        id: 1,
        name: 'Salle Tim Berners-Lee',
        capacity: 10,
      },
      {
        id: 2,
        name: 'Salle Vint Cerf',
        capacity: 4,
      },
      {
        id: 3,
        name: 'Open space Opéra',
        surface: 272,
        capacity: 50,
      },
    ],
  },
];

const repository = {
  findFloors: sinon.stub().resolves(floors),
  findFloorById: sinon.stub(),
};
repository.findFloorById.withArgs(2).resolves(floors[0]);
const controller = createController(repository);

test('listFloors - should list floors and return 200 OK', async (t) => {
  const ctx = {};
  await controller.listFloors(ctx);
  t.is(ctx.status, 200);
  t.true(Array.isArray(ctx.body));
  t.true(ctx.body.length > 0);
});

test('getFloor - should get a floor by ID and return 200 OK', async (t) => {
  const ctx = {
    params: {
      id: 2,
    },
  };
  await controller.getFloor(ctx);
  t.is(ctx.status, 200);
  t.is(ctx.body.id, 2);
  t.is(ctx.body.areas.length, 3);
});

test('getFloor - should throw a NotFound error if the floor was not found', async (t) => {
  const ctx = {
    params: {
      id: 42,
    },
    throw() {
      const err = new Error('Not found');
      err.status = 404;
      err.expose = true;
      throw err;
    },
  };
  const promise = controller.getFloor(ctx);
  const err = await t.throws(promise);
  t.is(typeof err, 'object');
  t.is(err.status, 404);
});

test.todo('listAreas - should list a floor\'s areas and return 200 OK');

test.todo('getArea - should get a floor\'s area and return 200 OK');
