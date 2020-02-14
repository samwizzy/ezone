/*
 *
 * EmployeePage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  createNewEmployeeData: false,
  loading: false,
  error: false,
  employeeDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const employeePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
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
          // getAllUsersData: action.payload,
        };
      }
      case Constants.CREATE_NEW_EMPLOYEE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default employeePageReducer;
