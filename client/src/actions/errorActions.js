import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErros = () => {
  return {
    type: CLEAR_ERRORS
  };
};
