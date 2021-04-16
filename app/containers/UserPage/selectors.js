/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state => state.userPage || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectUser,
    userState => userState.username,
  );

const selectListUser = () =>
  createSelector(
    selectUser,
    userState => userState.users,
  );

const selectPageLoading = () =>
  createSelector(
    selectUser,
    userState => userState.loading,
  );

const selectUserById = () =>
  createSelector(
    selectUser,
    userState => userState.editUser,
  );

const selectEditUserLoading = () =>
  createSelector(
    selectUser,
    userState => userState.loadingEditUser,
  );

export {
  selectUser,
  makeSelectUsername,
  selectListUser,
  selectPageLoading,
  selectUserById,
  selectEditUserLoading,
};
