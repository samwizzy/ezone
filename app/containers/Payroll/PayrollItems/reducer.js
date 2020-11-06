import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  payrollSetupData: null,
  allowances: [],
  allowanceData: null,
  benefits: [],
  benefitData: null,
  earnings: [],
  earningData: null,
  deductions: [],
  deductionData: null,
  allowanceDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  benefitDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  earningDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  deductionDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const payrollReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
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
          payrollSetupData: action.payload
        };
      }
      case Constants.GET_PAYROLL_SETUP_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // ALLOWANCE
      case Constants.OPEN_NEW_ALLOWANCE_DIALOG: {
        return {
          ...state,
          allowanceDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_ALLOWANCE_DIALOG: {
        return {
          ...state,
          allowanceDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit allowance dialog
      case Constants.OPEN_EDIT_ALLOWANCE_DIALOG: {
        return {
          ...state,
          allowanceDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_ALLOWANCE_DIALOG: {
        return {
          ...state,
          allowanceDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to create allowance
      case Constants.CREATE_ALLOWANCE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_ALLOWANCE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ALLOWANCE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get list of allowances
      case Constants.GET_ALLOWANCES: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALLOWANCES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          allowances: action.payload,
        };
      }
      case Constants.GET_ALLOWANCES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get allowance by id
      case Constants.GET_ALLOWANCE_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALLOWANCE_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          allowanceData: action.payload,
        };
      }
      case Constants.GET_ALLOWANCE_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // BENEFIT
      case Constants.OPEN_NEW_BENEFIT_DIALOG: {
        return {
          ...state,
          benefitDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_BENEFIT_DIALOG: {
        return {
          ...state,
          benefitDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit benefit dialog
      case Constants.OPEN_EDIT_BENEFIT_DIALOG: {
        return {
          ...state,
          benefitDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_BENEFIT_DIALOG: {
        return {
          ...state,
          benefitDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to create benefit
      case Constants.CREATE_BENEFIT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_BENEFIT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_BENEFIT_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get list of benefits
      case Constants.GET_BENEFITS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_BENEFITS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          benefits: action.payload,
        };
      }
      case Constants.GET_BENEFITS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get benefit by id
      case Constants.GET_BENEFIT_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_BENEFIT_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          benefitData: action.payload,
        };
      }
      case Constants.GET_BENEFIT_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // EARNING
      case Constants.OPEN_NEW_EARNING_DIALOG: {
        return {
          ...state,
          earningDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_EARNING_DIALOG: {
        return {
          ...state,
          earningDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit earning dialog
      case Constants.OPEN_EDIT_EARNING_DIALOG: {
        return {
          ...state,
          earningDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_EARNING_DIALOG: {
        return {
          ...state,
          earningDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to create earning
      case Constants.CREATE_EARNING: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_EARNING_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_EARNING_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get list of earnings
      case Constants.GET_EARNINGS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_EARNINGS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          earnings: action.payload,
        };
      }
      case Constants.GET_EARNINGS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get earning by id
      case Constants.GET_EARNING_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_EARNING_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          earningData: action.payload,
        };
      }
      case Constants.GET_EARNING_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // DEDUCTION
      case Constants.OPEN_NEW_DEDUCTION_DIALOG: {
        return {
          ...state,
          deductionDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_DEDUCTION_DIALOG: {
        return {
          ...state,
          deductionDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit deduction dialog
      case Constants.OPEN_EDIT_DEDUCTION_DIALOG: {
        return {
          ...state,
          deductionDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_DEDUCTION_DIALOG: {
        return {
          ...state,
          deductionDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to create deduction
      case Constants.CREATE_DEDUCTION: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_DEDUCTION_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_DEDUCTION_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get list of deductions
      case Constants.GET_DEDUCTIONS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_DEDUCTIONS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          deductions: action.payload,
        };
      }
      case Constants.GET_DEDUCTIONS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get deduction by id
      case Constants.GET_DEDUCTION_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_DEDUCTION_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          earningData: action.payload,
        };
      }
      case Constants.GET_DEDUCTION_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default payrollReducer;
