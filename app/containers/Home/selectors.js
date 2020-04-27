import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.home || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by home
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomeDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.loading,
  );

export default makeSelectHomePage;
export {
  selectHomeDomain,
  makeSelectLoading,
};
