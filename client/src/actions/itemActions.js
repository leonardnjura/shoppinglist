import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './types';

export const getItems = () => {
  return {
    type: GET_ITEMS // Update reducer switch. Accessed in respective reducer as action.type :)
  };
};

export const deleteItem = id => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
};

export const addItem = item => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};
