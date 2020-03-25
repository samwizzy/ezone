import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itemPage state domain
 */

const selectItemPageDomain = state => state.itemPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ItemPage
 */

const makeSelectItemPage = () =>
  createSelector(
    selectItemPageDomain,
    substate => substate,
  );

export default makeSelectItemPage;
export { selectItemPageDomain };
