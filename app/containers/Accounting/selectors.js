import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAccountingDomain = state => state.accounting || initialState;

const makeSelectAccounting = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAccountingDomain,
    subState => subState.loading,
  );

const makeSelectGetAccountingSetupData = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.accountingSetupData,
  );

const makeSelectChartOfAccounts = () =>
  createSelector(
    selectAccountingDomain,
    subState => subState.chartOfAccounts,
  );


export default makeSelectAccounting;

export {
  selectAccountingDomain,
  makeSelectLoading,
  makeSelectGetAccountingSetupData,
  makeSelectChartOfAccounts,
};
