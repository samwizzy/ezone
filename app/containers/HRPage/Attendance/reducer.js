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
    }
  });

export default attdReducer;
