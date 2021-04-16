/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuthen = state => state.authenticationPage || initialState;

const selectUserInfo = () =>
  createSelector(
    selectAuthen,
    authenState => authenState.infoUser,
  );

const selectLogged = () =>
  createSelector(
    selectAuthen,
    authenState => authenState.isLogged,
  );

export { selectUserInfo, selectLogged, selectAuthen };
