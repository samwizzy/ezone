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
  newEmployeeDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  }
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
          newEmployeeDialog: {...state.newEmployeeDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_EMPLOYEE_DIALOG:
        return {
          ...state,
          newEmployeeDialog: {...state.newEmployeeDialog, props: { open:false }},
        };
        break;
    }
  });

export default hrReducer;
