import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the banking state domain
 */

const selectBankingDomain = state => state.banking || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Banking
 */

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

const makeSelectAccountTypeData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.accountTypeData,
  );

const makeSelectNewBankPostData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.newBankPostData,
  );

const makeSelectBankAccountData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.bankAccountData,
  );

const makeSelectBankTransferByOrgIdData= () =>
  createSelector(
    selectBankingDomain,
    substate => substate.bankTransferByOrgIdData,
  );

const makeSelectTransactionTransferDialog = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.transactionTransferDialog,
  );

const makeSelectBankTransferPostData = () =>
  createSelector(
    selectBankingDomain,
    substate => substate.bankTransferPostData,
  );
  
export default makeSelectBanking;

export { 
  selectBankingDomain, 
  makeSelectLoading,
  makeSelectBankAccountDialog,
  makeSelectAccountTypeData,
  makeSelectNewBankPostData,
  makeSelectBankAccountData,
  makeSelectBankTransferByOrgIdData,
  makeSelectTransactionTransferDialog,
  makeSelectBankTransferPostData
};
