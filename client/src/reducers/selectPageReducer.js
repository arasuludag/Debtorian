import { FETCH_SELECT_PAGE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_SELECT_PAGE:
    return action.payload || false;
    default:
    return state;
  }
}
