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
const makeSelectLeaveRequest = () =>
  createSelector(
    selectLeaveMgt,
    subState => subState.leaveRequest,
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

export default makeSelectLeaveMgtPage;
export { 
  selectLeaveMgt,
  makeSelectLoading,
  makeSelectLeaveRequest,
  makeSelectLeaveRequestDialog,
  makeSelectLeaveTypeDialog,
  makeSelectHolidayDialog,
};
