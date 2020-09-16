import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the utility state domain
 */

const selectUtilityPageDomain = state => state.utilityTask || initialState;

const makeSelectUtilityTask = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.loading,
  );

const makeSelectTasks = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.tasks,
  );

const makeSelectTaskComments = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.taskComments,
  );

const makeSelectTask = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.task,
  );


const makeSelectEmployees = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.users,
  );

const makeSelectUser = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.user,
  );

const makeSelectAssignTaskDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.assignTaskDialog,
  );

const makeSelectError = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.error,
  );

const makeSelectNewTaskDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.taskDialog,
  );

const makeSelectConfirmTaskDeleteDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.confirmTaskDeleteDialog,
  );

const makeSelectPreviewTaskDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.previewTaskDialog,
  );


export default makeSelectUtilityTask;
export {
  selectUtilityPageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployees,
  makeSelectTasks,
  makeSelectTask,
  makeSelectTaskComments,
  makeSelectUser,
  makeSelectNewTaskDialog,
  makeSelectConfirmTaskDeleteDialog,
  makeSelectPreviewTaskDialog,
  makeSelectAssignTaskDialog,
};
