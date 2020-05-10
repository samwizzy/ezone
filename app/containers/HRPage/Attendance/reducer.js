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
  departments: [],
  department: {},
  roles: [],
  role: {},
  branches: [],
  branch: {},
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
  announcementDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  announcementViewDialog: {
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
      case Constants.GET_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          departments: action.payload
        };
        break;
      case Constants.GET_DEPARTMENTS_BY_ORGID_API_SUCCESS:
        return {
          ...state,
          departments: action.payload
        };
      break;
      case Constants.GET_BRANCHES_SUCCESS:
        return {
          ...state,
          branches: action.payload
        };
      break;
      case Constants.GET_PARTY_TAGS_SUCCESS:
        return {
          ...state,
          party_tags: action.payload
        };
      break;
      
      case Constants.CREATE_EMPLOYEE: {
        // console.log(action.payload, 'reducer data');
        return {
          ...state,
          loading: true,
          error: false,
          createEmployee: action.payload,
        };
      }
      case Constants.CREATE_EMPLOYEE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getCreateEmployee: action.payload,
        };
      }
      case Constants.CREATE_BRANCH: {
        // console.log(action.payload, 'reducer data');
        return {
          ...state,
          loading: true,
          error: false,
          createBranch: action.payload,
        };
      }
      case Constants.CREATE_BRANCH_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getCreateBranch: action.payload,
        };
      }
      case Constants.CREATE_JOBOPENING: {
        // console.log(action.payload, 'reducer data');
        return {
          ...state,
          loading: true,
          error: false,
          createJobOpening: action.payload,
        };
      }
      case Constants.CREATE_JOBOPENING_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getCreateJobOpening: action.payload,
        };
      }
      case Constants.CREATE_DEPARTMENT: {
        // console.log(action.payload, 'reducer data');
        return {
          ...state,
          loading: true,
          error: false,
          createDepartment: action.payload,
        };
      }
      case Constants.CREATE_DEPARTMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getCreateDepartment: action.payload,
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
      case Constants.OPEN_NEW_ANNOUNCEMENT_DIALOG:
        return {
          ...state,
          announcementDialog: {...state.announcementDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_NEW_ANNOUNCEMENT_DIALOG:
        return {
          ...state,
          announcementDialog: {...state.announcementDialog, props: { open: false }},
        };
        break;
      case Constants.OPEN_ANNOUNCEMENT_VIEW_DIALOG:
        return {
          ...state,
          announcementViewDialog: {...state.announcementViewDialog, props: { open: true }},
        };
        break;
      case Constants.CLOSE_ANNOUNCEMENT_VIEW_DIALOG:
        return {
          ...state,
          announcementViewDialog: {...state.announcementViewDialog, props: { open: false }},
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

export default hrReducer;
