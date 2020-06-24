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
  error: null,
  employees: [],
  branchEmployees: [],
  deptEmployees: [],
  employee: null,
  employeeTypes: [],
  sourcesOfHire: [],
  payRates: [],
  payTypes: [],
  workExperiences: [],
  enrollmentTypes: [],
  locations: [],
  departments: [],
  department: null,
  roles: [],
  role: null,
  branches: [],
  branch: {},
  attendances: [],
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
  workExperienceDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  educationBackgroundDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  applicantDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  employeeTypeDialog: {
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
      case Constants.GET_ANNOUNCEMENTS_SUCCESS:
        return {
          ...state,
          announcements: action.payload
        };
        break;
      case Constants.GET_PARTYGROUPS_SUCCESS:
        return {
          ...state,
          partyGroups: action.payload
        };
        break;
      case Constants.GET_PARTY_TAGS_SUCCESS:
        return {
          ...state,
          party_tags: action.payload
        };
        break;
      case Constants.CREATE_EMPLOYEE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_EMPLOYEE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_EMPLOYEE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.UPDATE_EMPLOYEE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_EMPLOYEE_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.UPDATE_EMPLOYEE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
      case Constants.CREATE_ANNOUNCEMENT: {
        return {
          ...state,
          loading: true,
          error: false,
          createAnnouncement: action.payload,
        };
      }
      case Constants.CREATE_ANNOUNCEMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getCreateAnnouncement: action.payload,
        };
      }
      case Constants.CREATE_BRANCH: {
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
      case Constants.GET_ATTENDANCES: {
        return {
          ...state,
          loading: true
        }
      };
      case Constants.GET_ATTENDANCES_SUCCESS: {
        return {
          ...state,
          loading: false,
          attendances: action.payload
        }
      };
      case Constants.CREATE_DEPARTMENT: {
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
      case Constants.GET_SOURCE_OF_HIRE_SUCCESS:
        return {
          ...state,
          sourcesOfHire: action.payload
        };
        break;
      case Constants.GET_PAY_RATES_SUCCESS:
        return {
          ...state,
          payRates: action.payload
        };
        break;
      case Constants.GET_PAY_TYPES_SUCCESS:
        return {
          ...state,
          payTypes: action.payload
        };
        break;
      case Constants.GET_WORK_EXPERIENCES_SUCCESS:
        return {
          ...state,
          workExperiences: action.payload
        };
        break;
      case Constants.GET_ENROLLMENTTYPES_SUCCESS:
        return {
          ...state,
          enrollmentTypes: action.payload
        };
        break;

      case Constants.CREATE_EMPLOYEE_TYPE:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.CREATE_EMPLOYEE_TYPE_SUCCESS:
        return {
          ...state,
          loading: false
        };
        break;
      case Constants.CREATE_ENROLLMENT_TYPE:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.CREATE_ENROLLMENT_TYPE_SUCCESS:
        return {
          ...state,
          loading: false
        };
        break;
      case Constants.CREATE_LOCATION:
        return {
          ...state,
          loading: true
        };
        break;
      case Constants.CREATE_LOCATION_SUCCESS:
        return {
          ...state,
          loading: false
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
      case Constants.GET_JOBOPENINGDETAILS_SUCCESS:
        return {
          ...state,
          jobOpeningDetails: action.payload
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
      case Constants.GET_EMPLOYEES:
        return {
          ...state,
          loading: true,
        };
        break;
      case Constants.GET_EMPLOYEES_SUCCESS:
        return {
          ...state,
          loading: false,
          employees: action.payload
        };
        break;
      case Constants.GET_BRANCH_EMPLOYEES:
        return {
          ...state,
          loading: true,
        };
        break;
      case Constants.GET_BRANCH_EMPLOYEES_SUCCESS:
        return {
          ...state,
          loading: false,
          branchEmployees: action.payload
        };
        break;
      case Constants.GET_DEPT_EMPLOYEES:
        return {
          ...state,
          loading: true,
        };
        break;
      case Constants.GET_DEPT_EMPLOYEES_SUCCESS:
        return {
          ...state,
          loading: false,
          deptEmployees: action.payload
        };
        break;
      case Constants.GET_EMPLOYEE:
        console.log("you just hit the getEmployee reducer")
        return {
          ...state,
          loading: true,
        };
        break;
      case Constants.GET_EMPLOYEE_SUCCESS:
        console.log(action.payload, "you just hit the getEmployee success")
        return {
          ...state,
          loading: false,
          employee: action.payload
        };
        break;
      case Constants.OPEN_NEW_EMPLOYEE_DIALOG:
        return {
          ...state,
          empDialog: { ...state.empDialog, props: { open: true }, type: 'new' },
        };
        break;
      case Constants.OPEN_EDIT_EMPLOYEE_DIALOG:
        return {
          ...state,
          empDialog: { props: { open: true }, type: 'edit', data: action.payload },
        };
        break;
      case Constants.CLOSE_EDIT_EMPLOYEE_DIALOG:
        return {
          ...state,
          empDialog: { ...state.empDialog, props: { open: false }, type: 'new', data: null },
        };
        break;
      case Constants.CLOSE_NEW_EMPLOYEE_DIALOG:
        return {
          ...state,
          empDialog: { ...state.empDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_DEPARTMENT_DIALOG:
        return {
          ...state,
          deptDialog: { ...state.deptDialog, props: { open: true } },
        };
        break;
      case Constants.CLOSE_NEW_DEPARTMENT_DIALOG:
        return {
          ...state,
          deptDialog: { ...state.deptDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_BRANCH_DIALOG:
        return {
          ...state,
          branchDialog: { ...state.branchDialog, props: { open: true } },
        };
        break;
      case Constants.CLOSE_NEW_BRANCH_DIALOG:
        return {
          ...state,
          branchDialog: { ...state.branchDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_ROLE_DIALOG:
        return {
          ...state,
          roleDialog: { ...state.roleDialog, props: { open: true } },
        };
        break;
      case Constants.CLOSE_NEW_ROLE_DIALOG:
        return {
          ...state,
          roleDialog: { ...state.roleDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_PAYROLL_DIALOG:
        return {
          ...state,
          payrollDialog: { ...state.payrollDialog, props: { open: true } },
        };
        break;
      case Constants.CLOSE_NEW_PAYROLL_DIALOG:
        return {
          ...state,
          payrollDialog: { ...state.payrollDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_ANNOUNCEMENT_DIALOG:
        return {
          ...state,
          announcementDialog: { ...state.announcementDialog, props: { open: true } },
        };
        break;
      case Constants.CLOSE_NEW_ANNOUNCEMENT_DIALOG:
        return {
          ...state,
          announcementDialog: { ...state.announcementDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_ANNOUNCEMENT_VIEW_DIALOG:
        return {
          ...state,
          announcementViewDialog: { ...state.announcementViewDialog, props: { open: true }, data: action.payload },
        };
        break;
      case Constants.CLOSE_ANNOUNCEMENT_VIEW_DIALOG:
        return {
          ...state,
          announcementViewDialog: { ...state.announcementViewDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_WORK_EXPERIENCE_DIALOG:
        return {
          ...state,
          workExperienceDialog: { ...state.workExperienceDialog, props: { open: true }, data: action.payload },
        };
        break;
      case Constants.CLOSE_WORK_EXPERIENCE_DIALOG:
        return {
          ...state,
          workExperienceDialog: { ...state.workExperienceDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_EDUCATION_BACKGROUND_DIALOG:
        return {
          ...state,
          educationBackgroundDialog: { ...state.educationBackgroundDialog, props: { open: true }, data: action.payload },
        };
        break;
      case Constants.CLOSE_EDUCATION_BACKGROUND_DIALOG:
        return {
          ...state,
          educationBackgroundDialog: { ...state.educationBackgroundDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_APPLICANT_DIALOG:
        return {
          ...state,
          applicantDialog: { ...state.applicantDialog, props: { open: true }, data: action.payload },
        };
        break;
      case Constants.CLOSE_NEW_APPLICANT_DIALOG:
        return {
          ...state,
          applicantDialog: { ...state.applicantDialog, props: { open: false } },
        };
        break;
      case Constants.OPEN_NEW_EMPLOYEE_TYPE_DIALOG:
        return {
          ...state,
          employeeTypeDialog: { ...state.employeeTypeDialog, props: { open: true }, type: action.payload },
        };
        break;
      case Constants.CLOSE_NEW_EMPLOYEE_TYPE_DIALOG:
        return {
          ...state,
          employeeTypeDialog: { ...state.employeeTypeDialog, props: { open: false } },
        };
        break;
    }
  });

export default hrReducer;
