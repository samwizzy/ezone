import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the banking state domain
 */

const selectBudgetingDomain = state => state.budgeting || initialState;

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

const makeSelectBudgetsData = () =>
  createSelector(
    selectBudgetingDomain,
    substate => substate.budgets,
  );

const makeSelectGetAllAccountingPeriodData = () =>
  createSelector(
    selectBudgetingDomain,
    substate => substate.accountingPeriodData,
  );

export default makeSelectBudgeting;

export {
  selectBudgetingDomain,
  makeSelectLoading,
  makeSelectBudgetingDialog,
  makeSelectBudgetsData,
  makeSelectGetAllAccountingPeriodData
};
