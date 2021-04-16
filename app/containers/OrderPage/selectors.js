/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectOrder = state => state.orderPage || initialState;

const selectListOrder = () =>
  createSelector(
    selectOrder,
    orderState => orderState.orders,
  );

const selectPageLoading = () =>
  createSelector(
    selectOrder,
    orderState => orderState.loading,
  );

const selectOrderAttributeLoading = () =>
  createSelector(
    selectOrder,
    orderState => orderState.loadingAttribute,
  );

const selectListAttribute = () =>
  createSelector(
    selectOrder,
    orderState => orderState.attribute,
  );

const selectOrderById = () =>
  createSelector(
    selectOrder,
    orderState => orderState.editOrder,
  );

const selectEditOrderLoading = () =>
  createSelector(
    selectOrder,
    orderState => orderState.loadingEditOrder,
  );

const selectStatusUpdateOrder = () =>
  createSelector(
    selectOrder,
    orderState => orderState.statusUpdateOrder,
  );

export {
  selectOrder,
  selectListOrder,
  selectPageLoading,
  selectOrderById,
  selectEditOrderLoading,
  selectOrderAttributeLoading,
  selectListAttribute,
  selectStatusUpdateOrder,
};
