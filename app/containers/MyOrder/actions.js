/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  GET_LIST_ORDER_REQUEST,
  GET_LIST_ORDER_SUCCESS,
  GET_LIST_ORDER_FAILURE,
  SET_PAGE_ORDER_LOADING,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  SET_EDIT_ORDER_LOADING,
  EDIT_ORDER_REQUEST,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  GET_ORDER_ATTRIBUTE_REQUEST,
  GET_ORDER_ATTRIBUTE_SUCCESS,
  GET_ORDER_ATTRIBUTE_FAILURE,
  SET_ORDER_ATTRIBUTE_LOADING,
  STATUS_UPDATE_ORDER_SUCCESS,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} ORDERname The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_ORDERNAME
 */
export const getListOrderRequest = () => ({
  type: GET_LIST_ORDER_REQUEST,
});

export const getListOrderSuccess = orders => ({
  type: GET_LIST_ORDER_SUCCESS,
  orders,
});

export const getListOrderFailure = errors => ({
  type: GET_LIST_ORDER_FAILURE,
  errors,
});

export const setPageOrderLoading = status => ({
  type: SET_PAGE_ORDER_LOADING,
  status,
});

export const addOrderRequest = params => ({
  type: ADD_ORDER_REQUEST,
  params,
});

export const addOrderSuccess = order => ({
  type: ADD_ORDER_SUCCESS,
  order,
});

export const addOrderFailure = errors => ({
  type: ADD_ORDER_FAILURE,
  errors,
});

export const setEditOrderLoading = status => ({
  type: SET_EDIT_ORDER_LOADING,
  status,
});

export const getOrderByIdRequest = id => ({
  type: GET_ORDER_BY_ID_REQUEST,
  id,
});

export const getOrderByIdSuccess = order => ({
  type: GET_ORDER_BY_ID_SUCCESS,
  order,
});

export const getOrderByIdFailure = errors => ({
  type: GET_ORDER_BY_ID_FAILURE,
  errors,
});

export const editOrderRequest = params => ({
  type: EDIT_ORDER_REQUEST,
  params,
});

export const editOrderSuccess = order => ({
  type: EDIT_ORDER_SUCCESS,
  order,
});

export const editOrderFailure = errors => ({
  type: EDIT_ORDER_FAILURE,
  errors,
});

export const deleteOrderRequest = id => ({
  type: DELETE_ORDER_REQUEST,
  id,
});

export const deleteOrderSuccess = id => ({
  type: DELETE_ORDER_SUCCESS,
  id,
});

export const deleteOrderFailure = errors => ({
  type: DELETE_ORDER_FAILURE,
  errors,
});

export const getOrderAttributeRequest = () => ({
  type: GET_ORDER_ATTRIBUTE_REQUEST,
});

export const getOrderAttributeSuccess = attribute => ({
  type: GET_ORDER_ATTRIBUTE_SUCCESS,
  attribute,
});

export const getOrderAttributeFailure = errors => ({
  type: GET_ORDER_ATTRIBUTE_FAILURE,
  errors,
});

export const setOrderAttributeLoading = status => ({
  type: SET_ORDER_ATTRIBUTE_LOADING,
  status,
});

export const setStatusUpdateOrderSuccess = status => ({
  type: STATUS_UPDATE_ORDER_SUCCESS,
  status,
});
