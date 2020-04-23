import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the banking state domain
 */

const selectBudgetingDomain = state => state.budgeting || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Banking
 */

const makeSelectBudgeting = () =>
  createSelector(
    selectBudgetingDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectBudgetingDomain,
    subState => subState.loading,
  );

const makeSelectBudgetingDialog = () =>
  createSelector(
    selectBudgetingDomain,
    substate => substate.budgetDialog,
  );

const makeSelectBudgetingPostData = () =>
  createSelector(
    selectBudgetingDomain,
    substate => substate.budgetingPostData,
  );

const makeSelectBudgetingData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.budgetData,
  );

export default makeSelectBudgeting;

export { 
  selectBudgetingDomain, 
  makeSelectLoading,
  makeSelectBudgetingDialog,
  makeSelectBudgetingPostData,
  makeSelectBudgetingData,
};
