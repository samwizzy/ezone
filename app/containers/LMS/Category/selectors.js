import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the LMS categories state domain
 */

const selectLMSDomain = state => state.lmsCategories || initialState;

const makeSelectLMSCategory = () =>
  createSelector(
    selectLMSDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLMSDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectLMSDomain,
    subState => subState.error,
  );

const makeSelectCategoryDialog = () =>
  createSelector(
    selectLMSDomain,
    subState => subState.categoryDialog,
  );

const makeSelectCourseCategories = () =>
  createSelector(
    selectLMSDomain,
    subState => subState.categories,
  );

export default makeSelectLMSCategory;
export {
  selectLMSDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectCategoryDialog,
  makeSelectCourseCategories
};
