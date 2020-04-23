import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settings state domain
 */

const selectSettingsDomain = state => state.settings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Settings
 */

const makeSelectSettings = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSettingsDomain,
    subState => subState.loading,
  );

  const makeSelectAccountingSetupPostData = () =>
  createSelector(
    selectSettingsDomain,
    subState => subState.accountSetupPostData,
);
  
export default makeSelectSettings;

export { 
  selectSettingsDomain, 
  makeSelectLoading,
  makeSelectAccountingSetupPostData,
};
