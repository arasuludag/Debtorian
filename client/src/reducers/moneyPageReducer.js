import { FETCH_MONEY_PAGE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_MONEY_PAGE:
    return action.payload || false;
    default:
    return state;
  }
}
