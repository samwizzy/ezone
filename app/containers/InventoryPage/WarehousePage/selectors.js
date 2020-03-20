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

const makeSelectGetAllEmployees = () =>
  createSelector(
    selectWarehousePageDomain,
    subState => subState.getAllEmployees,
  );

const makeSelectGetAllWarehouses = () =>
  createSelector(
    selectWarehousePageDomain,
    subState => subState.getAllWarehouses,
  );

const makeSelectWarehouseDetails = () =>
  createSelector(
    selectWarehousePageDomain,
    subState => subState.warehouseDetails,
  );

export default makeSelectWarehousePage;
export {
  selectWarehousePageDomain,
  makeSelectError,
  makeSelectLoading,
  makeSelectWarehouseDialog,
  makeSelectGetAllEmployees,
  makeSelectGetAllWarehouses,
  makeSelectWarehouseDetails,
};
