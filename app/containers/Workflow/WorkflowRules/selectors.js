import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the workflow rule state domain
 */

const selectWorkflowRulesDomain = state => state.workflowRules || initialState;

const makeSelectWorkflowRules = () =>
  createSelector(
    selectWorkflowRulesDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectWorkflowRulesDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectWorkflowRulesDomain,
    subState => subState.error,
  );

const makeSelectStepDialog = () =>
  createSelector(
    selectWorkflowRulesDomain,
    subState => subState.stepDialog,
  );

const makeSelectAllWorkflowRules = () =>
  createSelector(
    selectWorkflowRulesDomain,
    subState => subState.workflowRules,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectWorkflowRulesDomain,
    subState => subState.employees,
  );

export default makeSelectWorkflowRules;
export {
  selectWorkflowRulesDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectStepDialog,
  makeSelectAllWorkflowRules,
  makeSelectEmployees,
};
