import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  payrollSetupData: null,
  payRunSettings: null,
  taxSettings: null,
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Case to create payroll setup
      case Constants.CREATE_PAYROLL_SETUP: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_PAYROLL_SETUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_PAYROLL_SETUP_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get payroll setup
      case Constants.GET_PAYROLL_SETUP: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_PAYROLL_SETUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          payrollSetupData: action.payload,
        };
      }
      case Constants.GET_PAYROLL_SETUP_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default settingsReducer;
