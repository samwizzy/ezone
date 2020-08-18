import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the quizzes state domain
 */

const selectLmsQuizzesDomain = state => state.lmsQuizzes || initialState;

const makeSelectLmsQuizzes = () =>
  createSelector(
    selectLmsQuizzesDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLmsQuizzesDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectLmsQuizzesDomain,
    subState => subState.error,
  );

const makeSelectQuizDialog = () =>
  createSelector(
    selectLmsQuizzesDomain,
    subState => subState.quizDialog,
  );

const makeSelectGetQuizzes = () =>
  createSelector(
    selectLmsQuizzesDomain,
    subState => subState.quizzes,
  );

export default makeSelectLmsQuizzes;
export {
  selectLmsQuizzesDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectGetQuizzes,
  makeSelectQuizDialog,
};
