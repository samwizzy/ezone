/**
 * Direct selector to the utility state domain
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUtilityPageDomain = state => state.utilityChats || initialState;

const makeSelectUtilityChats = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.error,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.employees,
  );

const makeSelectEmployee = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.employee,
  );

const makeSelectAllUsersChat = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.getAllUsersChat,
  );

const makeSelectGetUserChatData = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.getUserChatData,
  );

const makeSelectGetAllUserChatData = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.getAllUserChatData,
  );

const makeSelectPostMsg = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.postMsg,
  );

const makeSelectGetPostMsg = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.getPostMsg,
  );

const makeSelectPostFcmToken = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.postFcmToken,
  );

export default makeSelectUtilityChats;
export {
  selectUtilityPageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployees,
  makeSelectEmployee,
  makeSelectPostFcmToken,
  makeSelectAllUsersChat,
  makeSelectGetUserChatData,
  makeSelectGetAllUserChatData,
  makeSelectGetPostMsg,
  makeSelectPostMsg,
};
