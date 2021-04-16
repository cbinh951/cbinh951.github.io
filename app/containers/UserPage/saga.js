/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, delay } from 'redux-saga/effects';
import request from 'utils/request';
import { apiPost } from 'services';

import {
  getListUserSuccess,
  getListUserFailure,
  setPageUserLoading,
  addUserSuccess,
  setEditUserLoading,
  getUserByIdFailure,
  getUserByIdSuccess,
  editUserSuccess,
  deleteUserSuccess,
} from './actions';

import {
  GET_LIST_USER_REQUEST,
  ADD_USER_REQUEST,
  GET_USER_BY_ID_REQUEST,
  EDIT_USER_REQUEST,
  DELETE_USER_REQUEST,
} from './constants';

const requestURL =
  'https://be.origami-model-management.apps.projectlumina.com/api/v1/admin/user';

export function* getListUser() {
  try {
    yield put(setPageUserLoading(true));

    const { users } = yield call(request, requestURL);
    yield put(getListUserSuccess(users));
  } catch (err) {
    yield put(getListUserFailure(err));
  } finally {
    yield delay(1000);
    yield put(setPageUserLoading(false));
  }
}

export function* addUser({ params }) {
  try {
    // yield put(setPageUserLoading(true));

    const users = yield call(apiPost, {
      path: 'admin/user',
      body: params,
    });
    yield put(addUserSuccess(users));
  } catch (err) {
    yield put(getListUserFailure(err));
  } finally {
    yield delay(1000);
    // yield put(setPageUserLoading(false));
  }
}

export function* editUser({ id }) {
  try {
    yield put(setEditUserLoading(true));

    const user = yield call(request, `${requestURL}/${id}`);
    yield put(getUserByIdSuccess(user));
  } catch (err) {
    yield put(getUserByIdFailure(err));
  } finally {
    yield delay(500);
    yield put(setEditUserLoading(false));
  }
}

export function* updateUser({ params }) {
  const { id, values } = params;
  try {
    // yield put(setEditUserLoading(true));

    const users = yield call(request, `${requestURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    yield put(editUserSuccess(users));
  } catch (err) {
    yield put(getListUserFailure(err));
  } finally {
    yield delay(1000);
    // yield put(setPageUserLoading(false));
  }
}

export function* deleteUser({ id }) {
  try {
    // yield put(setEditUserLoading(true));

    yield call(request, `${requestURL}/${id}`, {
      method: 'DELETE',
    });
    yield put(deleteUserSuccess(id));
  } catch (err) {
    yield put(getListUserFailure(err));
  } finally {
    yield delay(1000);
    // yield put(setPageUserLoading(false));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(GET_LIST_USER_REQUEST, getListUser);
  yield takeLatest(ADD_USER_REQUEST, addUser);
  yield takeLatest(GET_USER_BY_ID_REQUEST, editUser);
  yield takeLatest(EDIT_USER_REQUEST, updateUser);
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}
