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
  GET_LIST_USER_SUCCESS,
  SET_PAGE_USER_LOADING,
  ADD_USER_SUCCESS,
  GET_USER_BY_ID_SUCCESS,
  SET_EDIT_USER_LOADING,
  EDIT_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  GET_LIST_USER_FAILURE,
} from './constants';

// The initial state of the App
export const initialState = {
  users: [],
  editUser: {},
  loading: false,
  loadingEditUser: false,
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_USER_SUCCESS:
        draft.users = action.users;
        break;
      case GET_LIST_USER_FAILURE:
        draft.errors = action.error;
        break;
      case SET_PAGE_USER_LOADING:
        draft.loading = action.status;
        break;
      case ADD_USER_SUCCESS:
        draft.users.unshift(action.users);
        break;
      case SET_EDIT_USER_LOADING:
        draft.loadingEditUser = action.status;
        break;
      case GET_USER_BY_ID_SUCCESS:
        draft.editUser = action.user;
        break;
      case EDIT_USER_SUCCESS:
        {
          const { user } = action;
          const foundIndex = draft.users.findIndex(x => x.id === user.id);
          draft.users[foundIndex] = user;
        }
        break;
      case DELETE_USER_SUCCESS:
        {
          const { id } = action;
          const listUser = draft.users.filter(item => item.id !== id);
          draft.users = listUser;
        }
        break;
    }
  });

export default homeReducer;
