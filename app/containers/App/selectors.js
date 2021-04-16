/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectLogged = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isLogged,
  );

const selectUserInfo = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userInfo,
  );

export { selectGlobal, makeSelectLocation, selectLogged, selectUserInfo };
