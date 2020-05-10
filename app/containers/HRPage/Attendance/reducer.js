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
  attendance: [],
  attdDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  shiftDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  employeeShiftDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const attdReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Constants.GET_ATTENDANCE:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.GET_ATTENDANCE_SUCCESS:
        return {
          ...state,
          loading: false,
          attendance: action.payload
        };
        break;
      case Constants.CREATE_ATTENDANCE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_ATTENDANCE_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.GET_EMPLOYEETYPES_SUCCESS:
        return {
          ...state,
          employeeTypes: action.payload
        };
      break;
      case Constants.GET_ENROLLMENTTYPES_SUCCESS:
        return {
          ...state,
          enrollmentTypes: action.payload
        };
      break;
      case Constants.GET_LOCATIONS_SUCCESS:
        return {
          ...state,
          locations: action.payload
        };
      break;
      case Constants.GET_JOBOPENINGS_SUCCESS:
        return {
          ...state,
          jobOpenings: action.payload
        };
      break;
      case Constants.GET_ROLES_SUCCESS:
        return {
          ...state,
          roles: action.payload
        };
      break;
      
      case Constants.GET_ROLES_SUCCESS:
        return {
          ...state,
          roles: action.payload
        };
        break;
      case Constants.GET_EMPLOYEES_SUCCESS:
        return {
          ...state,
          employees: action.payload
        };
        break;
        case Constants.GET_DAYS_SUCCESS:
        return {
          ...state,
          days: action.payload
        };
        break;
        case Constants.GET_SHIFTS_SUCCESS:
        return {
          ...state,
          shifts: action.payload
        };
        break;
        case Constants.CREATE_SHIFT_SUCCESS: {
          return {
            ...state,
            loading: false,
            error: false,
            getCreateShift: action.payload,
          };
        }
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
      case Constants.OPEN_NEW_SHIFT_DIALOG:
        return {
          ...state,
          shiftDialog: {...state.shiftDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_SHIFT_DIALOG:
        return {
          ...state,
          shiftDialog: {...state.shiftDialog, props: { open: false }},
        };
        break;
      case Constants.OPEN_NEW_EMPLOYEE_SHIFT_DIALOG:
        return {
          ...state,
          employeeShiftDialog: {...state.employeeShiftDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_EMPLOYEE_SHIFT_DIALOG:
        return {
          ...state,
          employeeShiftDialog: {...state.employeeShiftDialog, props: { open: false }},
        };
        break;
        case Constants.GET_ATTENDANCES_SUCCESS:
        return {
          ...state,
          attendances: action.payload
        };
        break;
    }
  });

export default attdReducer;
