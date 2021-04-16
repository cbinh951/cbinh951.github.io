/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  GET_LIST_ORDER_SUCCESS,
  SET_PAGE_ORDER_LOADING,
  ADD_ORDER_SUCCESS,
  GET_ORDER_BY_ID_SUCCESS,
  SET_EDIT_ORDER_LOADING,
  EDIT_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS,
  GET_ORDER_ATTRIBUTE_SUCCESS,
  SET_ORDER_ATTRIBUTE_LOADING,
  STATUS_UPDATE_ORDER_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  orders: [],
  isAddSuccess: false,
  attribute: {},
  loadingAttribute: false,
  editOrder: {},
  statusUpdateOrder: false,
  loading: false,
  loadingEditOrder: false,
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ORDER_SUCCESS:
        draft.orders = action.orders;
        break;
      case GET_ORDER_ATTRIBUTE_SUCCESS:
        draft.attribute = action.attribute;
        break;
      case SET_PAGE_ORDER_LOADING:
        draft.loading = action.status;
        break;
      case SET_ORDER_ATTRIBUTE_LOADING:
        draft.loadingAttribute = action.status;
        break;
      case ADD_ORDER_SUCCESS:
        draft.orders.unshift(action.order);
        break;
      case SET_EDIT_ORDER_LOADING:
        draft.loadingEditOrder = action.status;
        break;
      case GET_ORDER_BY_ID_SUCCESS:
        draft.editOrder = action.order;
        break;
      case EDIT_ORDER_SUCCESS:
        {
          const { order } = action;
          const foundIndex = draft.orders.findIndex(x => x.id === order.id);
          draft.orders[foundIndex] = order;
        }
        break;
      case DELETE_ORDER_SUCCESS:
        {
          const { id } = action;
          const listOrder = draft.orders.filter(item => item.id !== id);
          draft.orders = listOrder;
        }
        break;
      case STATUS_UPDATE_ORDER_SUCCESS:
        draft.statusUpdateOrder = action.status;
    }
  });

export default homeReducer;
