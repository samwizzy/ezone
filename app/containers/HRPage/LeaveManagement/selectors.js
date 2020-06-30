/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLeaveMgt = state => state.leaveMgt || initialState;

const makeSelectLeaveMgtPage = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.loading,
  );
const makeSelectLeaveRequests = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.leaveRequests,
  );
const makeSelectLeaveTypes = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.leaveTypes,
  );
const makeSelectLeaveRequestDialog = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.leaveRequestDialog,
  );
const makeSelectLeaveTypeDialog = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.leaveTypeDialog,
  );
const makeSelectHolidayDialog = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.holidayDialog,
  );
const makeSelectEmployees = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.employees,
  );
const makeSelectDepartments = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.departments,
  );
const makeSelectBranches = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.branches,
  );
const makeSelectRoles = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.roles,
  );

export default makeSelectLeaveMgtPage;
export {
  selectLeaveMgt,
  makeSelectLoading,
  makeSelectLeaveRequests,
  makeSelectLeaveTypes,
  makeSelectLeaveRequestDialog,
  makeSelectLeaveTypeDialog,
  makeSelectHolidayDialog,
  makeSelectEmployees,
  makeSelectDepartments,
  makeSelectBranches,
  makeSelectRoles,
};
