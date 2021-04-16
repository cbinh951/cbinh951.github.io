/**
 * Gets the repositories of the ORDER from Github
 */

import { call, put, takeLatest, delay, all } from 'redux-saga/effects';
import request from 'utils/request';
import { apiGet } from 'services';

import {
  getListOrderSuccess,
  getListOrderFailure,
  setPageOrderLoading,
  // addOrderSuccess,
  setEditOrderLoading,
  getOrderByIdFailure,
  getOrderByIdSuccess,
  editOrderSuccess,
  deleteOrderSuccess,
  getOrderAttributeSuccess,
  setOrderAttributeLoading,
  setStatusUpdateOrderSuccess,
} from './actions';

import {
  GET_LIST_ORDER_REQUEST,
  ADD_ORDER_REQUEST,
  GET_ORDER_BY_ID_REQUEST,
  EDIT_ORDER_REQUEST,
  DELETE_ORDER_REQUEST,
  GET_ORDER_ATTRIBUTE_REQUEST,
} from './constants';

const requestURL =
  'https://be.origami-model-management.apps.projectlumina.com/api/v1';

const requestURLAttr =
  'https://be.origami-model-management.apps.projectlumina.com/api/v1/order';

export function* getListOrder() {
  try {
    yield put(setPageOrderLoading(true));

    // const { orders } = yield call(request, `${requestURL}/order`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   },
    // });

    const {
      data: { orders },
    } = yield call(apiGet, {
      path: 'order',
    });
    yield put(getListOrderSuccess(orders));
  } catch (err) {
    yield put(getListOrderFailure(err));
  } finally {
    yield delay(1000);
    yield put(setStatusUpdateOrderSuccess(false));
    yield put(setPageOrderLoading(false));
  }
}

export function* getOrderAttribute() {
  try {
    yield put(setOrderAttributeLoading(true));

    const data = yield call(request, `${requestURLAttr}/attribute`);
    yield put(getOrderAttributeSuccess(data));
  } catch (err) {
    yield put(getListOrderFailure(err));
  } finally {
    yield delay(1000);
    yield put(setOrderAttributeLoading(false));
  }
}

export function* addOrder({ params }) {
  try {
    // yield put(setPageORDERLoading(true));

    yield call(request, `${requestURL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(params),
    });
    // yield put(addOrderSuccess(order));
    yield getListOrder();
  } catch (err) {
    yield put(getListOrderFailure(err));
  } finally {
    yield delay(1000);
    // yield put(setPageOrderLoading(false));
  }
}

export function* editOrder(id) {
  try {
    yield put(setEditOrderLoading(true));

    const order = yield call(request, `${requestURL}/order/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    yield put(getOrderByIdSuccess(order));
  } catch (err) {
    yield put(getOrderByIdFailure(err));
  } finally {
    yield delay(500);
    yield put(setEditOrderLoading(false));
  }
}

export function* getOrderById({ id }) {
  yield all([call(getOrderAttribute), call(editOrder, id)]);
}

export function* updateOrder({ params }) {
  const { id, values } = params;
  try {
    const order = yield call(request, `${requestURL}/order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(values),
    });
    yield put(editOrderSuccess(order));
    yield put(setStatusUpdateOrderSuccess(true));
  } catch (err) {
    yield put(getListOrderFailure(err));
  } finally {
    // yield delay(1000);
    // yield put(setStatusUpdateOrderSuccess(true));
  }
}

export function* deleteOrder({ id }) {
  try {
    // yield put(setEditORDERLoading(true));

    yield call(request, `${requestURL}/${id}`, {
      method: 'DELETE',
    });
    yield put(deleteOrderSuccess(id));
  } catch (err) {
    yield put(getListOrderFailure(err));
  } finally {
    yield delay(1000);
    // yield put(setPageORDERLoading(false));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(GET_LIST_ORDER_REQUEST, getListOrder);
  yield takeLatest(GET_ORDER_ATTRIBUTE_REQUEST, getOrderAttribute);
  yield takeLatest(ADD_ORDER_REQUEST, addOrder);
  yield takeLatest(GET_ORDER_BY_ID_REQUEST, getOrderById);
  yield takeLatest(EDIT_ORDER_REQUEST, updateOrder);
  yield takeLatest(DELETE_ORDER_REQUEST, deleteOrder);
}
