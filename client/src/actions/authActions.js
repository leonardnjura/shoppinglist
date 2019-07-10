import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

// check token & load user/whoami [GET api/auth/user]
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING }); // will set isLoading in auth reducer to true

  // fecth user,
  // [if 401, 404, etc catch block is fired, try edit path and inspect console or redux tool]
  axios
    .get('api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data // user obj + token
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status)); // see import for obj body
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// setup headers & token
// import in any file needing this, :)
export const tokenConfig = getState => {
  // get token from localstorage
  const token = getState().auth.token; // will get value of token in auth reducer

  // headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // token?, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
