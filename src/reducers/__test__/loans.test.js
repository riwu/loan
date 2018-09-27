import reducer from '../loans';
import * as types from '../../actions/types';
import loanStatus from '../../util/loanStatus';

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({});
});

test('should handle REQUEST_LOAN', () => {
  const payload = {
    amount: 100,
    duration: { number: 1, unit: 'month' },
    time: new Date().toISOString(),
  };
  const nextState = {
    1: { ...payload, status: loanStatus.PENDING },
  };
  expect(
    reducer(
      {},
      {
        type: types.REQUEST_LOAN,
        id: 1,
        payload,
      },
    ),
  ).toEqual(nextState);

  const newPayload = {
    amount: 50,
    duration: { number: 2, unit: 'week' },
    time: new Date().toISOString(),
  };
  expect(
    reducer(nextState, {
      type: types.REQUEST_LOAN,
      id: 2,
      payload: newPayload,
    }),
  ).toEqual({
    ...nextState,
    2: { ...newPayload, status: loanStatus.PENDING },
  });
});

test('should handle LOAN_APPROVED', () => {
  const oldState = {
    1: {
      amount: 100,
      duration: { number: 1, unit: 'month' },
      time: new Date().toISOString(),
      status: loanStatus.PENDING,
    },
    2: {
      amount: 50,
      duration: { number: 2, unit: 'week' },
      time: new Date().toISOString(),
      status: loanStatus.PENDING,
    },
  };
  expect(
    reducer(oldState, {
      type: types.LOAN_APPROVED,
      id: 2,
    }),
  ).toEqual({ ...oldState, 2: { ...oldState[2], status: loanStatus.APPROVED } });
});
