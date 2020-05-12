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

export default makeSelectAttendancePage;
export { 
  selectAttendance,
  makeSelectLoading,
  makeSelectAttendance,
  makeSelectAttendanceDialog,
  makeSelectShiftDialog,
  makeSelectEmployeeShiftDialog,
};
