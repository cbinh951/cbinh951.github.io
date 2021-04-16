/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_USER_INFO_REQUEST } from 'containers/App/constants';
import { getInfoUserSuccess } from 'containers/App/actions';

// import request from 'utils/request';

import { apiGet } from 'services';

export function* getUserInfo() {
  // const requestURL = `https://be.origami-model-management.apps.projectlumina.com/api/v1/user`;

  try {
    // Call our request helper (see 'utils/request')
    // const data = yield call(request, requestURL, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    // });
    const { data } = yield call(apiGet, {
      path: 'user',
    });
    yield put(getInfoUserSuccess(data));
  } catch (err) {
    console.log('error', err);
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(GET_USER_INFO_REQUEST, getUserInfo);
}
