import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_REQUEST_SUCCESS,
  AUTHENTICATION_REQUEST_FAILURE,
} from './constants';

export const getAuthenticationRequest = params => ({
  type: AUTHENTICATION_REQUEST,
  params,
});

export const setAuthenticationSuccess = info => ({
  type: AUTHENTICATION_REQUEST_SUCCESS,
  info,
});

export const setAuthenticationFailure = params => ({
  type: AUTHENTICATION_REQUEST_FAILURE,
  params,
});
