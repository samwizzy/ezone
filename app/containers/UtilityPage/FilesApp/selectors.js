/**
 * Direct selector to the utility state domain
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUtilityPageDomain = state => state.utilityFiles || initialState;

const makeSelectUtilityFiles = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.loading,
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

const makeSelectPrevIds = () =>
  createSelector(
    selectUtilityPageDomain,
    subState => subState.prevIds,
  );

export default makeSelectUtilityFiles;
export {
  selectUtilityPageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployees,
  makeSelectFiles,
  makeSelectFile,
  makeSelectFolders,
  makeSelectFolder,
  makeSelectNestedFolders,
  makeSelectUser,
  makeSelectFileUploadDialog,
  makeSelectFilePreviewDialog,
  makeSelectShareFileDialog,
  makeSelectNewFolderDialog,
  makeSelectNewFileDialog,
  makeSelectPrevIds,
};
