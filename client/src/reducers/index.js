import { combineReducers } from 'redux';
import authReducer from './authReducer';
import selectPageReducer from './selectPageReducer';
import moneyPageReducer from './moneyPageReducer';

export default combineReducers({
  auth: authReducer,
  select: selectPageReducer,
  money: moneyPageReducer
});
