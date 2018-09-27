import * as types from './types';
import * as api from './api';

export const requestLoan = payload => dispatch => api.requestLoan(payload).then(id => dispatch({
  type: types.REQUEST_LOAN,
  id,
  payload,
}));
