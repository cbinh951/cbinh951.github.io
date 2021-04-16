/* eslint-disable import/named */
// import { STORAGE_KEYS } from 'appConstants';
import axios from 'axios';
// import moment from 'moment-timezone';
// import settings from 'settings';
import history from 'utils/history';
import { message } from 'antd';

// const { BASE_URL } = settings;
const BASE_URL =
  'https://be.origami-model-management.apps.projectlumina.com/api/v1/';

// constants
const defOpts = { 'Content-Type': 'application/json; charset=utf-8' };

const formDataContentType = { 'Content-Type': 'multipart/form-data' };

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'token',
};

export const setStorage = ({ key, val }) =>
  window.localStorage.setItem(key, val);

export const getStorage = key => window.localStorage.getItem(key) || '';

export const removeStorage = key => {
  window.localStorage.removeItem(key);
};

axios.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    switch (error.response.status) {
      case 403:
        history.push('/403');
        break;
      case 404:
        history.push('/404');
        break;
      case 401: {
        // const { pathname, search } = window.location;
        // setStorage({
        //   key: STORAGE_KEYS.CURRENT_PATH,
        //   val: `${pathname}${search}`,
        // });
        // // Case token expired: Redirect to https://idsvc.petronas.com
        // window.location.replace(settings.REDIRECT_TO_AUTHENTICATION);
        localStorage.clear();
        break;
      }
      case 422:
        message.error(error.response.data.error_message);
        break;
      default:
        break;
    }

    return Promise.reject(error);
  },
);

export const setHeader = (isAuth, contentType = defOpts) => {
  const token = getStorage(STORAGE_KEYS.ACCESS_TOKEN);
  const access = getStorage('selectedAccess');
  let tmpOpts = {};

  if (isAuth) {
    tmpOpts = {
      Authorization: `Bearer ${token}`,
      'Custom-Page': window.location.href,
      'Custom-Role': access && JSON.parse(access).userRole,
    };
  }

  return {
    ...contentType,
    // 'X-Timezone-Offset': moment.tz.guess(),
    ...tmpOpts,
  };
};

export const apiGet = params => {
  const { path, body = {}, isAuth = true, responseType } = params;
  const url = BASE_URL + path;

  const response = axios({
    method: 'get',
    headers: setHeader(isAuth),
    params: body,
    responseType,
    url,
  });

  return response;
};

export const apiPut = params => {
  const { path, body = {}, isAuth = true } = params;
  const url = BASE_URL + path;

  const response = axios({
    method: 'put',
    headers: setHeader(isAuth),
    data: body,
    url,
  });

  return response;
};

export const apiPost = params => {
  const { path, body = {}, isAuth = true } = params;
  const url = BASE_URL + path;

  const response = axios({
    method: 'post',
    headers: setHeader(isAuth),
    data: body,
    url,
  });

  return response;
};
export const apiPatch = params => {
  const { path, body = {}, isAuth = true } = params;
  const url = BASE_URL + path;

  const response = axios({
    method: 'patch',
    headers: setHeader(isAuth),
    data: body,
    url,
  });

  return response;
};

export const apiDel = params => {
  const { path, isAuth = true } = params;
  const response = axios({
    method: 'delete',
    headers: setHeader(isAuth),
    url: BASE_URL + path,
  });

  return response;
};

export const apiFormData = params => {
  const { path, body = {}, isAuth = true } = params;
  const url = BASE_URL + path;
  const response = axios({
    method: 'post',
    headers: setHeader(isAuth, formDataContentType),
    data: body,
    url,
  });

  return response;
};

export const apiPutFormData = params => {
  const { path, body = {}, isAuth = true } = params;
  const url = BASE_URL + path;
  const response = axios({
    method: 'put',
    headers: setHeader(isAuth, formDataContentType),
    data: body,
    url,
  });

  return response;
};

export const download = params => {
  const { url } = params;

  return axios({
    method: 'get',
    responseType: 'blob',
    url,
  });
};
