import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the emailConfig state domain
 */

const selectEmailTemplateDomain = state => state.emailTemplate || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmailConfig
 */

const makeSelectEmailTemplates = () =>
  createSelector(
    selectEmailTemplateDomain,
    substate => substate,
  );

const makeSelectTemplates = () =>
  createSelector(
    selectEmailTemplateDomain,
    substate => substate.templates,
  );

const makeSelectLoading = () =>
  createSelector(
    selectEmailTemplateDomain,
    subState => subState.loading,
);

export default makeSelectEmailTemplates;
export { 
  selectEmailTemplateDomain,
  makeSelectTemplates,
  makeSelectLoading,
};

