/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAttendance = state => state.attendance || initialState;

const makeSelectAttendancePage = () =>
  createSelector(
    selectAttendance,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAttendance,
    subState => subState.loading,
  );
const makeSelectAttendance = () =>
  createSelector(
    selectAttendance,
    subState => subState.attendance,
  );

const makeSelectAttendanceDialog = () =>
  createSelector(
    selectAttendance,
    subState => subState.attdDialog,
  );

const makeSelectDays = () =>
  createSelector(
    selectAttendance,
    subState => subState.days,
  );
const makeSelectShifts = () =>
  createSelector(
    selectAttendance,
    subState => subState.shifts,
  );
const makeSelectEmployeeShifts = () =>
  createSelector(
    selectAttendance,
    subState => subState.employeeShifts,
  );

const makeSelectShiftDialog = () =>
  createSelector(
    selectAttendance,
    subState => subState.shiftDialog,
  );
const makeSelectEmployeeShiftDialog = () =>
  createSelector(
    selectAttendance,
    subState => subState.employeeShiftDialog,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectAttendance,
    subState => subState.employees,
  );
const makeSelectDepartments = () =>
  createSelector(
    selectAttendance,
    subState => subState.departments,
  );
const makeSelectBranches = () =>
  createSelector(
    selectAttendance,
    subState => subState.branches,
  );
const makeSelectRoles = () =>
  createSelector(
    selectAttendance,
    subState => subState.roles,
  );

export default makeSelectAttendancePage;
export {
  selectAttendance,
  makeSelectEmployees,
  makeSelectDepartments,
  makeSelectBranches,
  makeSelectRoles,
  makeSelectLoading,
  makeSelectAttendance,
  makeSelectAttendanceDialog,
  makeSelectShiftDialog,
  makeSelectEmployeeShiftDialog,
  makeSelectDays,
  makeSelectShifts,
  makeSelectEmployeeShifts,
};
