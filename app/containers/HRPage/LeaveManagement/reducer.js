/*
 * HRReducer Leave Management
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
  departments: [],
  branches: [],
  roles: [],
  leaveRequests: [],
  leaveTypes: [],
  leaveRequestDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  leaveTypeDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  holidayDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const leaveMgtReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Constants.GET_EMPLOYEES:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.GET_EMPLOYEES_SUCCESS:
        return {
          ...state,
          loading: false,
          employees: action.payload
        };
        break;
      case Constants.GET_DEPARTMENTS:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.GET_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          departments: action.payload
        };
        break;
      case Constants.GET_BRANCHES:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.GET_BRANCHES_SUCCESS:
        return {
          ...state,
          loading: false,
          branches: action.payload
        };
        break;
      case Constants.GET_ROLES:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.GET_ROLES_SUCCESS:
        return {
          ...state,
          loading: false,
          roles: action.payload
        };
        break;
      case Constants.GET_LEAVE_REQUEST:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.GET_LEAVE_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          leaveRequests: action.payload
        };
        break;
      case Constants.CREATE_LEAVE_REQUEST: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_LEAVE_REQUEST_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.GET_LEAVE_TYPES:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.GET_LEAVE_TYPES_SUCCESS:
        return {
          ...state,
          loading: false,
          leaveTypes: action.payload
        };
        break;
      case Constants.CREATE_LEAVE_TYPE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_LEAVE_TYPE_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.OPEN_NEW_LEAVE_REQUEST_DIALOG:
        return {
          ...state,
          leaveRequestDialog: { ...state.leaveRequestDialog, props: { open: true } },
        };
        break;
      case Constants.CLOSE_NEW_LEAVE_REQUEST_DIALOG:
        return {
          ...state,
          leaveRequestDialog: { ...state.leaveRequestDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_LEAVE_TYPE_DIALOG:
        return {
          ...state,
          leaveTypeDialog: { ...state.leaveTypeDialog, props: { open: true } },
        };
        break;
      case Constants.CLOSE_NEW_LEAVE_TYPE_DIALOG:
        return {
          ...state,
          leaveTypeDialog: { ...state.leaveTypeDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_HOLIDAY_DIALOG:
        return {
          ...state,
          holidayDialog: { ...state.holidayDialog, props: { open: true } },
        };
        break;
      case Constants.CLOSE_NEW_HOLIDAY_DIALOG:
        return {
          ...state,
          holidayDialog: { ...state.holidayDialog, props: { open: false } },
        };
        break;
    }
  });

export default leaveMgtReducer;
