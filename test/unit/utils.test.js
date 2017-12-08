import test from 'ava';

import { arrayFindAsync } from '../../src/utils';

test('Should find an array element and wrap it in a promise', async t => {
  const array = [1, 2, 3];
  const fn = elt => elt === 3;
  const elt = await arrayFindAsync(array, fn);
  t.is(elt, 3);
});

test('Should reject when trying to find a non-existing array element',
  async t => {
    const array = [1, 2, 3];
    const fn = elt => elt === 4;
    const err = await t.throws(arrayFindAsync(array, fn));
    t.is(typeof err, 'object');
    t.is(err.message, 'Element not found');
  });
