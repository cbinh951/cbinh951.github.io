/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { AUTHENTICATION_REQUEST_SUCCESS } from './constants';

// The initial state of the App
export const initialState = {
  infoUser: {},
  isLogged: false,
};

/* eslint-disable default-case, no-param-reassign */
const authenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTHENTICATION_REQUEST_SUCCESS:
        draft.infoUser = action.info;
        draft.isLogged = true;
        break;
    }
  });

export default authenReducer;
