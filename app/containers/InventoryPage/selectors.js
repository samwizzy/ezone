import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventoryPage state domain
 */

const selectInventoryPageDomain = state => state.inventoryPage || initialState;

const makeSelectInventoryPage = () =>
  createSelector(
    selectInventoryPageDomain,
    substate => substate,
  );

export default makeSelectInventoryPage;
export { selectInventoryPageDomain };
