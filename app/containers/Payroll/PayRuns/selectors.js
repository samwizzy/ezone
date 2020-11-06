import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the banking state domain
 */

const selectBankingDomain = state => state.banking || initialState;

const makeSelectBanking = () =>
  createSelector(
    selectBankingDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectBankingDomain,
    subState => subState.loading,
  );

const makeSelectBankAccountDialog = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.bankAccountDialog,
  );

const makeSelectBankAccountConfirmDialog = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.bankAccountConfirmDialog,
  );

const makeSelectAccountTypes = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.accountTypes,
  );

const makeSelectBankAccountData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.bankAccounts,
  );

const makeSelectBankAccountByIdData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.bankAccount,
  );

const makeSelectBankTransferByOrgIdData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.bankTransferByOrgIdData,
  );

const makeSelectTransactionTransferDialog = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.transactionTransferDialog,
  );

const makeSelectTransferByAccountIdData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.transferByAccountIdData,
  );

const makeSelectAccountingPeriods = () =>
  createSelector(
    selectBankingDomain,
    subState => subState.accountingPeriods,
  );

const makeSelectCurrencies = () =>
  createSelector(
    selectBankingDomain,
    subState => subState.currencies,
  );

export default makeSelectBanking;

export {
  selectBankingDomain,
  makeSelectLoading,
  makeSelectBankAccountDialog,
  makeSelectBankAccountConfirmDialog,
  makeSelectAccountingPeriods,
  makeSelectCurrencies,
  makeSelectAccountTypes,
  makeSelectBankAccountData,
  makeSelectBankAccountByIdData,
  makeSelectBankTransferByOrgIdData,
  makeSelectTransactionTransferDialog,
  makeSelectTransferByAccountIdData,
};
