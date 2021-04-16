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
  GET_LIST_USER_REQUEST,
  GET_LIST_USER_SUCCESS,
  GET_LIST_USER_FAILURE,
  SET_PAGE_USER_LOADING,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  SET_EDIT_USER_LOADING,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export const getListUserRequest = () => ({
  type: GET_LIST_USER_REQUEST,
});

export const getListUserSuccess = users => ({
  type: GET_LIST_USER_SUCCESS,
  users,
});

export const getListUserFailure = errors => ({
  type: GET_LIST_USER_FAILURE,
  errors,
});

export const setPageUserLoading = status => ({
  type: SET_PAGE_USER_LOADING,
  status,
});

export const addUserRequest = params => ({
  type: ADD_USER_REQUEST,
  params,
});

export const addUserSuccess = users => ({
  type: ADD_USER_SUCCESS,
  users,
});

export const addUserFailure = errors => ({
  type: ADD_USER_FAILURE,
  errors,
});

export const setEditUserLoading = status => ({
  type: SET_EDIT_USER_LOADING,
  status,
});

export const getUserByIdRequest = id => ({
  type: GET_USER_BY_ID_REQUEST,
  id,
});

export const getUserByIdSuccess = user => ({
  type: GET_USER_BY_ID_SUCCESS,
  user,
});

export const getUserByIdFailure = errors => ({
  type: GET_USER_BY_ID_FAILURE,
  errors,
});

export const editUserRequest = params => ({
  type: EDIT_USER_REQUEST,
  params,
});

export const editUserSuccess = user => ({
  type: EDIT_USER_SUCCESS,
  user,
});

export const editUserFailure = errors => ({
  type: EDIT_USER_FAILURE,
  errors,
});

export const deleteUserRequest = id => ({
  type: DELETE_USER_REQUEST,
  id,
});

export const deleteUserSuccess = id => ({
  type: DELETE_USER_SUCCESS,
  id,
});

export const deleteUserFailure = errors => ({
  type: DELETE_USER_FAILURE,
  errors,
});
