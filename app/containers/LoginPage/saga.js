import { call, put, takeLatest, delay } from 'redux-saga/effects';
import request from 'utils/request';
import { apiPost } from 'services';

import { getInfoUserSuccess } from 'containers/App/actions';

import { setAuthenticationSuccess } from './actions';

import { AUTHENTICATION_REQUEST } from './constants';

const requestURL =
  'https://be.origami-model-management.apps.projectlumina.com/api/v1';

export function* authentication({ params }) {
  // console.log('params', params);
  const { params: data, type } = params;
  try {
    // yield put(setPageOrderLoading(true));
    let info;
    if (type === 'login') {
      info = yield call(request, `${requestURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      localStorage.setItem('token', info.accessToken);
      localStorage.setItem('refreshToken', info.refreshToken);
      // yield put(setAuthenticationSuccess(info.user));
      yield put(getInfoUserSuccess(info.user));
    } else {
      info = yield call(apiPost, {
        path: 'sign_up',
        body: JSON.stringify(data),
        isAuth: false,
      });
      yield put(setAuthenticationSuccess(info));
    }
  } catch (err) {
    // yield put(getListOrderFailure(err));
    console.log('error', err);
  } finally {
    yield delay(1000);
  }
}

export default function* githubData() {
  yield takeLatest(AUTHENTICATION_REQUEST, authentication);
}
