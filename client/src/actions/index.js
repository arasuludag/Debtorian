import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_SELECT_PAGE } from './types';
import { FETCH_MONEY_PAGE } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSelectPage = () => async dispatch => {
  const res = await axios.get('/api/select_page_info');

  dispatch({ type: FETCH_SELECT_PAGE, payload: res.data });
};

export const fetchMoneyPage = () => async dispatch => {
  const res = await axios.get('/api/money_page_info');

  dispatch({ type: FETCH_MONEY_PAGE, payload: res.data });
};
