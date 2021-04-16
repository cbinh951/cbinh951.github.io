/*
 * App Actions
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
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
} from './constants';

export const getInfoUserRequest = () => ({
  type: GET_USER_INFO_REQUEST,
});

export const getInfoUserSuccess = info => ({
  type: GET_USER_INFO_SUCCESS,
  info,
});

export const getInfoUserFailure = error => ({
  type: GET_USER_INFO_FAILURE,
  error,
});
