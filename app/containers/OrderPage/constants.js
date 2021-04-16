/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

const prefix = 'app_OrderPage';

export const GET_LIST_ORDER_REQUEST = `${prefix}/GET_LIST_ORDER_REQUEST`;
export const GET_LIST_ORDER_SUCCESS = `${prefix}/GET_LIST_ORDER_SUCCESS`;
export const GET_LIST_ORDER_FAILURE = `${prefix}/GET_LIST_ORDER_FAILURE`;
export const SET_PAGE_ORDER_LOADING = `${prefix}/SET_PAGE_ORDER_LOADING`;

export const GET_ORDER_ATTRIBUTE_REQUEST = `${prefix}/GET_ORDER_ATTRIBUTE_REQUEST`;
export const GET_ORDER_ATTRIBUTE_SUCCESS = `${prefix}/GET_ORDER_ATTRIBUTE_SUCCESS`;
export const GET_ORDER_ATTRIBUTE_FAILURE = `${prefix}/GET_ORDER_ATTRIBUTE_FAILURE`;
export const SET_ORDER_ATTRIBUTE_LOADING = `${prefix}/SET_ORDER_ATTRIBUTE_LOADING`;

export const ADD_ORDER_REQUEST = `${prefix}/ADD_ORDER_REQUEST`;
export const ADD_ORDER_SUCCESS = `${prefix}/ADD_ORDER_SUCCESS`;
export const ADD_ORDER_FAILURE = `${prefix}/ADD_ORDER_FAILURE`;

export const GET_ORDER_BY_ID_REQUEST = `${prefix}/GET_ORDER_BY_ID_REQUEST`;
export const GET_ORDER_BY_ID_SUCCESS = `${prefix}/GET_ORDER_BY_ID_SUCCESS`;
export const GET_ORDER_BY_ID_FAILURE = `${prefix}/GET_ORDER_BY_ID_FAILURE`;
export const SET_EDIT_ORDER_LOADING = `${prefix}/SET_EDIT_ORDER_LOADING`;

export const EDIT_ORDER_REQUEST = `${prefix}/EDIT_ORDER_REQUEST`;
export const EDIT_ORDER_SUCCESS = `${prefix}/EDIT_ORDER_SUCCESS`;
export const EDIT_ORDER_FAILURE = `${prefix}/EDIT_ORDER_FAILURE`;
export const STATUS_UPDATE_ORDER_SUCCESS = `${prefix}/STATUS_UPDATE_ORDER_SUCCESS`;

export const DELETE_ORDER_REQUEST = `${prefix}/DELETE_ORDER_REQUEST`;
export const DELETE_ORDER_SUCCESS = `${prefix}/DELETE_ORDER_SUCCESS`;
export const DELETE_ORDER_FAILURE = `${prefix}/DELETE_ORDER_FAILURE`;
