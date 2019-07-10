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

// DETERMINE USER
// fired when App component mounts
// check token in localstorage & load determine whoami [GET api/auth/user]
export const loadUser = () => (dispatch, getState) => {
  // user loading..
  dispatch({ type: USER_LOADING }); // will set isLoading in auth reducer to true

  // whoami na?
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

// SIGNUP USER
export const registerUser = ({ name, email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data // user obj + token
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// LOGOUT
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// SETUP HEADERS WITH TOKEN
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

// SETUP HEADERS WITHOUT TOKEN
export const tokenlessConfig = () => {
  // headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  return config;
};
