import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settings state domain
 */

const selectSettingsDomain = state => state.settings || initialState;

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

const makeSelectGetPayrollSetupData = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.payrollSetupData,
  );

const makeSelectGetTaxSettingsData = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.taxSettings,
  );

const makeSelectGetPayRunSettingsData = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.payRunSettings,
  );

export default makeSelectSettings;

export {
  selectSettingsDomain,
  makeSelectLoading,
  makeSelectGetPayrollSetupData,
  makeSelectGetTaxSettingsData,
  makeSelectGetPayRunSettingsData,
};
