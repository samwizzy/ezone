/*
 * HRReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import * as Constants from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  employees: [],
  employee: {},
  empDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  deptDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  branchDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  roleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  attdDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  payrollDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const hrReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Constants.GET_EMPLOYEES_SUCCESS:
        console.log(state, "employees in reducer")
        return {
          ...state,
          employees: action.payload
        };
        break;
      case Constants.GET_EMPLOYEE_SUCCESS:
        return {
          ...state,
          employee: action.payload
        };
        break;
      case Constants.GET_EMPLOYEE_SUCCESS:
        return {
          ...state,
          employee: action.payload
        };
        break;
      case Constants.OPEN_NEW_EMPLOYEE_DIALOG:
        return {
          ...state,
          empDialog: {...state.empDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_EMPLOYEE_DIALOG:
        return {
          ...state,
          empDialog: {...state.empDialog, props: { open: false }},
        };
        break;
      case Constants.OPEN_NEW_DEPARTMENT_DIALOG:
        return {
          ...state,
          deptDialog: {...state.deptDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_DEPARTMENT_DIALOG:
        return {
          ...state,
          deptDialog: {...state.deptDialog, props: { open: false }},
        };
        break;
      case Constants.OPEN_NEW_BRANCH_DIALOG:
        console.log('we opening the dialog in reducer')

        return {
          ...state,
          branchDialog: {...state.branchDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_BRANCH_DIALOG:
        return {
          ...state,
          branchDialog: {...state.branchDialog, props: { open: false }},
        };
        break;
      case Constants.OPEN_NEW_ROLE_DIALOG:
        return {
          ...state,
          roleDialog: {...state.roleDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_ROLE_DIALOG:
        return {
          ...state,
          roleDialog: {...state.roleDialog, props: { open: false }},
        };
        break;
      case Constants.OPEN_NEW_ATTENDANCE_DIALOG:
        return {
          ...state,
          attdDialog: {...state.attdDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_ATTENDANCE_DIALOG:
        return {
          ...state,
          attdDialog: {...state.attdDialog, props: { open: false }},
        };
        break;
      case Constants.OPEN_NEW_PAYROLL_DIALOG:
        return {
          ...state,
          payrollDialog: {...state.payrollDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_PAYROLL_DIALOG:
        return {
          ...state,
          payrollDialog: {...state.payrollDialog, props: { open: false }},
        };
        break;
    }
  });

export default hrReducer;
