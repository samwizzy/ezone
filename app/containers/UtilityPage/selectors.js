import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the utility state domain
 */

const selectUtilityPageDomain = state => state.utilityPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UtilityPage
 */

const makeSelectUtilityPage = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.loading,
  );

const makeSelectData = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.data,
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

const makeSelectFolders = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.folders,
  );

const makeSelectNestedFolders = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.nestedFolders,
  );  

const makeSelectFolder = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.folder,
  );

const makeSelectFiles = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.files,
  );

const makeSelectFile = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.file,
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

const makeSelectFilePreviewDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.filePreviewDialog,
  );

const makeSelectFileUploadDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.fileUploadDialog,
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

const makeSelectShareFileDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.shareFileDialog,
  );

const makeSelectNewFileDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.fileDialog,
  );

const makeSelectNewFolderDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.folderDialog,
  );

const makeSelectNewTaskDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.taskDialog,
  );

const makeSelectPreviewTaskDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.previewTaskDialog,
  );

const makeSelectBranchDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.branchDialog,
  );

const makeSelectDepartmentDialog = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.departmentDialog,
  );

const makeSelectAllEmployees = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.getAllEmployees,
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

const makeSelectPrevIds = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.prevIds,
  );

export default makeSelectUtilityPage;
export {
  selectUtilityPageDomain,
  makeSelectLoading,
  makeSelectData,
  makeSelectTask,
  makeSelectTasks,
  makeSelectTaskComments,
  makeSelectFile,
  makeSelectFiles,
  makeSelectFolders,
  makeSelectNestedFolders,
  makeSelectFolder,
  makeSelectEmployees,
  makeSelectUser,
  makeSelectFileUploadDialog,
  makeSelectFilePreviewDialog,
  makeSelectNewTaskDialog,
  makeSelectPreviewTaskDialog,
  makeSelectShareFileDialog,
  makeSelectAssignTaskDialog,
  makeSelectError,
  makeSelectNewFolderDialog,
  makeSelectNewFileDialog,
  makeSelectBranchDialog,
  makeSelectDepartmentDialog,
  makeSelectAllEmployees,
  makeSelectAllUsersChat,
  makeSelectGetUserChatData,
  makeSelectGetAllUserChatData,
  makeSelectGetPostMsg,
  makeSelectPostMsg,
  makeSelectPrevIds,
};
