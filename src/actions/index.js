import { notification, message } from 'antd';
import * as types from './types';
import * as api from './api';

export const requestLoan = payload => dispatch => api.requestLoan(payload).then(({ id, time }) => {
  setTimeout(() => {
    // for mocking only; should be triggered by server through web sockets
    dispatch({
      type: types.LOAN_APPROVED,
      id,
    });
    notification.success({
      message: `Your loan of $${payload.amount} has been approved`,
      duration: 0,
    });
  }, 5000);
  message.success(`Successfully requested a loan of $${payload.amount}`);
  return dispatch({
    type: types.REQUEST_LOAN,
    id,
    payload: { ...payload, time },
  });
});
