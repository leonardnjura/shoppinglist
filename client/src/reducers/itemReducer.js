import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
  items: [
    { id: uuid(), name: 'Bread' },
    { id: uuid(), name: 'Milk' },
    { id: uuid(), name: 'Samosa' },
    { id: uuid(), name: 'Whiskey' }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload) // payload has item id :)
      };
      case ADD_ITEM:
        return{
          ...state,
          items: [action.payload, ...state.items]
        }

    default:
      return state;
  }
}
