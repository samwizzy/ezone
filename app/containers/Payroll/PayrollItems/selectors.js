import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the payroll items state domain
 */

const selectPayrollDomain = state => state.payrollItems || initialState;

const makeSelectPayrollItems = () =>
  createSelector(
    selectPayrollDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.loading,
  );

const makeSelectGetPayrollSetupData = () =>
  createSelector(
    selectPayrollDomain,
    substate => substate.payrollSetupData,
  );

const makeSelectAllowanceDialog = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.allowanceDialog,
  );

const makeSelectAllowances = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.allowances,
  );

const makeSelectAllowanceData = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.allowanceData,
  );

const makeSelectBenefitDialog = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.benefitDialog,
  );

const makeSelectBenefits = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.benefits,
  );

const makeSelectBenefitData = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.benefitData,
  );

const makeSelectEarningDialog = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.earningDialog,
  );

const makeSelectEarnings = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.earnings,
  );

const makeSelectEarningData = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.earningData,
  );

const makeSelectDeductionDialog = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.deductionDialog,
  );

const makeSelectDeductions = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.deductions,
  );

const makeSelectDeductionData = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.deductionData,
  );

export default makeSelectPayrollItems;

export {
  selectPayrollDomain,
  makeSelectLoading,
  makeSelectGetPayrollSetupData,
  makeSelectAllowanceDialog,
  makeSelectAllowances,
  makeSelectAllowanceData,
  makeSelectBenefitDialog,
  makeSelectBenefits,
  makeSelectBenefitData,
  makeSelectEarningDialog,
  makeSelectEarnings,
  makeSelectEarningData,
  makeSelectDeductionDialog,
  makeSelectDeductions,
  makeSelectDeductionData,
};
