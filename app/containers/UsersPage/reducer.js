import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  updateUserProfileData: false,
  getAllEmployees: [],
  createNewEmployeeData: false,
  loading: false,
  error: false,
  branches: [],
  departments: [],
  positions: [],
  employeeTypes: [],
  sourcesOfHire: [],
  payRates: [],
  payTypes: [],
  employeeDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  signatureDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  updateUserProfileDialog: {
    type: 'edit',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const usersPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_ALL_EMPLOYEES: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllEmployees: action.payload,
        };
      }
      case Constants.GET_ALL_EMPLOYEES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_BRANCHES_SUCCESS: {
        return {
          ...state,
          branches: action.payload,
        };
      }
      case Constants.GET_POSITIONS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_POSITIONS_SUCCESS: {
        return {
          ...state,
          positions: action.payload,
          loading: false,
        };
      }
      case Constants.GET_POSITIONS_ERROR: {
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      }
      case Constants.GET_DEPARTMENTS_SUCCESS: {
        return {
          ...state,
          departments: action.payload,
        };
      }
      case Constants.GET_EMPLOYEETYPES_SUCCESS: {
        return {
          ...state,
          employeeTypes: action.payload
        };
      }
      case Constants.GET_SOURCE_OF_HIRE_SUCCESS: {
        return {
          ...state,
          sourcesOfHire: action.payload
        };
      }
      case Constants.GET_PAY_RATES_SUCCESS: {
        return {
          ...state,
          payRates: action.payload
        };
      }
      case Constants.GET_PAY_TYPES_SUCCESS: {
        return {
          ...state,
          payTypes: action.payload
        };
      }
      case Constants.OPEN_NEW_EMPLOYEE_DIALOG: {
        return {
          ...state,
          employeeDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_EMPLOYEE_DIALOG: {
        return {
          ...state,
          employeeDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }
      case Constants.OPEN_EDIT_EMPLOYEE_DIALOG: {
        return {
          ...state,
          employeeDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_EMPLOYEE_DIALOG: {
        return {
          ...state,
          employeeDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }
      case Constants.OPEN_VIEW_EMPLOYEE_DIALOG: {
        return {
          ...state,
          employeeDialog: {
            type: 'view',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_VIEW_EMPLOYEE_DIALOG: {
        return {
          ...state,
          employeeDialog: {
            type: 'view',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CREATE_NEW_EMPLOYEE: {
        return {
          ...state,
          loading: true,
          error: false,
          createNewEmployeeData: action.payload,
        };
      }
      case Constants.CREATE_NEW_EMPLOYEE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_EMPLOYEE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.OPEN_SIGNATURE_DIALOG: {
        return {
          ...state,
          signatureDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_SIGNATURE_DIALOG: {
        return {
          ...state,
          signatureDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_USER_PROFILE_DIALOG: {
        return {
          ...state,
          updateUserProfileDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_USER_PROFILE_DIALOG: {
        return {
          ...state,
          updateUserProfileDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.UPDATE_USER_PROFILE: {
        return {
          ...state,
          loading: true,
          error: false,
          updateUserProfileData: action.payload,
        };
      }
      case Constants.UPDATE_USER_PROFILE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_USER_PROFILE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default usersPageReducer;
