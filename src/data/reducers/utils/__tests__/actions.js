import { basisAction, simpleAction, payloadAction } from '../actions';

test('create simple action', () => {
  const createAction = simpleAction('COUNTER_INCREMENT');

  expect(createAction()).toEqual({ type: 'COUNTER_INCREMENT' });
  expect(createAction()).not.toEqual({ type: 'COUNTER_INCREMENT', payload: 1 });
});

test('create payload action', () => {
  const createAction = payloadAction('COUNTER_INCREMENT_BY');
  expect(createAction(1)).toEqual({ type: 'COUNTER_INCREMENT_BY', payload: 1 });
});

test('create basis action', () => {
  const createAction = basisAction(
    () => 5,
    () => ({
      pages: 2,
    }),
    'FETCH_ITEM'
  );
  expect(createAction()).toEqual({
    type: 'FETCH_ITEM',
    payload: 5,
    meta: { pages: 2 },
  });
});
