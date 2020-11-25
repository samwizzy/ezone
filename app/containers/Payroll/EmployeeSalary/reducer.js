import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  employeeSalaryDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  confirmDeleteDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  employeeSalaries: [],
  employeeSalary: null,
};

/* eslint-disable default-case, no-param-reassign */
const employeeSalaryReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Open dialog for adding new account to chart of account
      case Constants.OPEN_NEW_EMPLOYEE_SALARY_DIALOG: {
        return {
          ...state,
          employeeSalaryDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_EMPLOYEE_SALARY_DIALOG: {
        return {
          ...state,
          employeeSalaryDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit dialog for account
      case Constants.OPEN_EDIT_EMPLOYEE_SALARY_DIALOG: {
        return {
          ...state,
          employeeSalaryDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_EMPLOYEE_SALARY_DIALOG: {
        return {
          ...state,
          employeeSalaryDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Confirm delete dialog
      case Constants.OPEN_DELETE_EMPLOYEE_SALARY_DIALOG: {
        return {
          ...state,
          confirmDeleteDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_DELETE_EMPLOYEE_SALARY_DIALOG: {
        return {
          ...state,
          confirmDeleteDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Case to create employee salary
      case Constants.CREATE_EMPLOYEE_SALARY: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_EMPLOYEE_SALARY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_EMPLOYEE_SALARY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get all employee salaries
      case Constants.GET_EMPLOYEE_SALARIES: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_EMPLOYEE_SALARIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          employeeSalaries: action.payload,
        };
      }
      case Constants.GET_EMPLOYEE_SALARIES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get employee salary by id
      case Constants.GET_EMPLOYEE_SALARY_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_EMPLOYEE_SALARY_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          employeeSalary: action.payload,
        };
      }
      case Constants.GET_EMPLOYEE_SALARY_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to delete a chart of account
      case Constants.DELETE_EMPLOYEE_SALARY: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.DELETE_EMPLOYEE_SALARY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DELETE_EMPLOYEE_SALARY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to update a employee salary
      case Constants.UPDATE_EMPLOYEE_SALARY: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.UPDATE_EMPLOYEE_SALARY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_EMPLOYEE_SALARY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default employeeSalaryReducer;
