import { REQUEST_LOAN, LOAN_APPROVED } from '../actions/types';
import loanStatus from '../util/loanStatus';

const loans = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LOAN:
      return {
        ...state,
        [action.id]: { ...action.payload, status: loanStatus.PENDING },
      };
    case LOAN_APPROVED:
      return {
        ...state,
        [action.id]: { ...state[action.id], status: loanStatus.APPROVED },
      };
    default:
      return state;
  }
};

export default loans;
