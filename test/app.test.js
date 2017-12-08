import test from 'ava';

import createApp from './app';

test('Should create and return an app', async t => {
  const app = createApp();
  t.not(app, null);
  t.not(app, 'undefined');
});
