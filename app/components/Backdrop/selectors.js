import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the backdrop state domain
 */

const selectBackdropDomain = state => state.backdrop || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Backdrop
 */

const makeSelectBackdrop = () => 
  createSelector(
    selectBackdropDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectBackdropDomain,
    subState => subState.loading,
);

export default makeSelectBackdrop;
export { 
  selectBackdropDomain,
  makeSelectLoading,
};

