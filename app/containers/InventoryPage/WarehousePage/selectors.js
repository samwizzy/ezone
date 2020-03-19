import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the warehousePage state domain
 */

const selectWarehousePageDomain = state => state.warehousePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WarehousePage
 */

const makeSelectWarehousePage = () =>
  createSelector(
    selectWarehousePageDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectWarehousePageDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectWarehousePageDomain,
    subState => subState.error,
  );

const makeSelectWarehouseDialog = () =>
  createSelector(
    selectWarehousePageDomain,
    subState => subState.warehouseDialog,
  );

export default makeSelectWarehousePage;
export {
  selectWarehousePageDomain,
  makeSelectError,
  makeSelectLoading,
  makeSelectWarehouseDialog,
};
