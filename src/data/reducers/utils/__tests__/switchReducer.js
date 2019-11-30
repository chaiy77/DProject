import switchReducer from '../switchReducer';

test('operate with action and initialState', () => {
  // Test with counter reducer.
  const counterReducer = switchReducer(
    [
      [
        'COUNTER_INCREMENT',
        state => ({ ...state, counter: state.counter + 1 }),
      ],
      [
        'COUNTER_DECREMENT',
        state => ({ ...state, counter: state.counter - 1 }),
      ],
      ['COUNTER_RESET', state => ({ ...state, counter: 0 })],
      [
        'COUNTER_INCREMENT_BY',
        (state, action) => ({
          ...state,
          counter: state.counter + action.payload,
        }),
      ],
    ],
    { counter: 0 }
  );
  expect(counterReducer(undefined, {})).toEqual({ counter: 0 });
  expect(counterReducer({ counter: 0 }, { type: 'COUNTER_INCREMENT' })).toEqual(
    {
      counter: 1,
    }
  );
  expect(counterReducer({ counter: 5 }, { type: 'COUNTER_DECREMENT' })).toEqual(
    {
      counter: 4,
    }
  );
  expect(
    counterReducer({ counter: 4 }, { type: 'COUNTER_INCREMENT_BY', payload: 5 })
  ).toEqual({ counter: 9 });
  expect(counterReducer({ counter: 4 }, { type: 'COUNTER_RESET' })).toEqual({
    counter: 0,
  });
});
