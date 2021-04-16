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

const prefix = 'app_UserPage';

export const GET_LIST_USER_REQUEST = `${prefix}/GET_LIST_USER_REQUEST`;
export const GET_LIST_USER_SUCCESS = `${prefix}/GET_LIST_USER_SUCCESS`;
export const GET_LIST_USER_FAILURE = `${prefix}/GET_LIST_USER_FAILURE`;
export const SET_PAGE_USER_LOADING = `${prefix}/SET_PAGE_USER_LOADING`;

export const ADD_USER_REQUEST = `${prefix}/ADD_USER_REQUEST`;
export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`;
export const ADD_USER_FAILURE = `${prefix}/ADD_USER_FAILURE`;

export const GET_USER_BY_ID_REQUEST = `${prefix}/GET_USER_BY_ID_REQUEST`;
export const GET_USER_BY_ID_SUCCESS = `${prefix}/GET_USER_BY_ID_SUCCESS`;
export const GET_USER_BY_ID_FAILURE = `${prefix}/GET_USER_BY_ID_FAILURE`;
export const SET_EDIT_USER_LOADING = `${prefix}/SET_EDIT_USER_LOADING`;

export const EDIT_USER_REQUEST = `${prefix}/EDIT_USER_REQUEST`;
export const EDIT_USER_SUCCESS = `${prefix}/EDIT_USER_SUCCESS`;
export const EDIT_USER_FAILURE = `${prefix}/EDIT_USER_FAILURE`;

export const DELETE_USER_REQUEST = `${prefix}/DELETE_USER_REQUEST`;
export const DELETE_USER_SUCCESS = `${prefix}/DELETE_USER_SUCCESS`;
export const DELETE_USER_FAILURE = `${prefix}/DELETE_USER_FAILURE`;
