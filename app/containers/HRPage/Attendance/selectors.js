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
const makeSelectCreateShift = () =>
  createSelector(
    selectAttendance,
    subState => subState.createShift,
  );
const makeSelectCreateShiftSuccess = () =>
  createSelector(
    selectAttendance,
    subState => subState.getCreateShift,
  );

const makeSelectAssignShift = () =>
  createSelector(
    selectAttendance,
    subState => subState.assignShift,
  );
const makeSelectAssignShiftSuccess = () =>
  createSelector(
    selectAttendance,
    subState => subState.getAssignShift,
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

export default makeSelectAttendancePage;
export { 
  selectAttendance,
  makeSelectLoading,
  makeSelectAttendance,
  makeSelectAttendanceDialog,
  makeSelectShiftDialog,
  makeSelectEmployeeShiftDialog,
  makeSelectDays,
  makeSelectShifts,
  makeSelectCreateShift,
  makeSelectCreateShiftSuccess,
  makeSelectEmployees,
  makeSelectAssignShift,
  makeSelectAssignShiftSuccess,
};
