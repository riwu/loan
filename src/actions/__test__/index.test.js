import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../index';
import * as types from '../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('requestLoan dispatches REQUEST_LOAN action', () => {
  const resolve = Promise.resolve.bind(Promise);
  const response = { id: 1, time: new Date().toISOString() };
  Promise.resolve = jest.fn(() => resolve(response));
  const payload = { amount: 100, duration: { number: 1, unit: 'month' } };
  const expectedActions = [
    { type: types.REQUEST_LOAN, id: response.id, payload: { ...payload, time: response.time } },
  ];
  const store = mockStore({ loans: {} });

  return store
    .dispatch(actions.requestLoan(payload))
    .then(() => expect(store.getActions()).toEqual(expectedActions));
});
