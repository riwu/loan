import { REQUEST_LOAN } from '../actions/types';

const loans = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LOAN:
      return {
        ...state,
        [action.id]: action.payload,
      };
    default:
      return state;
  }
};

export default loans;
