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
  announcements: [],
  applicants: [],
  jobOpenings: [],
  jobOpeningDetails: null,
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
  confirmAnnouncementDialog: {
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
      case Constants.GET_DEPARTMENTS_SUCCESS: {
        return {
          ...state,
          departments: action.payload
        };
      }
      case Constants.GET_DEPARTMENTS_BY_ORGID_API_SUCCESS: {
        return {
          ...state,
          departments: action.payload
        };
      }
      case Constants.GET_BRANCHES_SUCCESS: {
        return {
          ...state,
          branches: action.payload
        };
      }
      case Constants.GET_ANNOUNCEMENTS: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.GET_ANNOUNCEMENTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          announcements: action.payload
        };
      }
      case Constants.GET_ANNOUNCEMENTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
      case Constants.GET_PARTYGROUPS_SUCCESS: {
        return {
          ...state,
          partyGroups: action.payload
        };
      }
      case Constants.GET_PARTY_TAGS_SUCCESS: {
        return {
          ...state,
          party_tags: action.payload
        };
      }
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
        };
      }
      case Constants.CREATE_ANNOUNCEMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ANNOUNCEMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }

      case Constants.EDIT_ANNOUNCEMENT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.EDIT_ANNOUNCEMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.EDIT_ANNOUNCEMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }

      case Constants.DELETE_ANNOUNCEMENT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.DELETE_ANNOUNCEMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DELETE_ANNOUNCEMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: false,
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
      case Constants.GET_APPLICANTS: {
        return {
          ...state,
          loading: true
        }
      };
      case Constants.GET_APPLICANTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          applicants: action.payload
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
      case Constants.GET_WORK_EXPERIENCES_SUCCESS: {
        return {
          ...state,
          workExperiences: action.payload
        };
      }
      case Constants.GET_ENROLLMENTTYPES_SUCCESS: {
        return {
          ...state,
          enrollmentTypes: action.payload
        };
      }

      case Constants.CREATE_EMPLOYEE_TYPE: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.CREATE_EMPLOYEE_TYPE_SUCCESS: {
        return {
          ...state,
          loading: false
        };
      }
      case Constants.CREATE_ENROLLMENT_TYPE: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.CREATE_ENROLLMENT_TYPE_SUCCESS: {
        return {
          ...state,
          loading: false
        };
      }
      case Constants.CREATE_LOCATION: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.CREATE_LOCATION_SUCCESS: {
        return {
          ...state,
          loading: false
        };
      }
      case Constants.GET_LOCATIONS_SUCCESS: {
        return {
          ...state,
          locations: action.payload
        };
      }
      case Constants.GET_JOBOPENINGS_SUCCESS: {
        return {
          ...state,
          jobOpenings: action.payload
        };
      }
      case Constants.GET_JOBOPENINGDETAILS_SUCCESS: {
        return {
          ...state,
          jobOpeningDetails: action.payload
        };
      }
      case Constants.GET_ROLES_SUCCESS: {
        return {
          ...state,
          roles: action.payload
        };
      }

      case Constants.GET_ROLES_SUCCESS: {
        return {
          ...state,
          roles: action.payload
        };
      }
      case Constants.GET_EMPLOYEES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          employees: action.payload
        };
      }
      case Constants.GET_EMPLOYEES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
      case Constants.GET_BRANCH_EMPLOYEES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_BRANCH_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          branchEmployees: action.payload
        };
      }
      case Constants.GET_DEPT_EMPLOYEES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_DEPT_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          deptEmployees: action.payload
        };
      }
      case Constants.GET_EMPLOYEE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_EMPLOYEE_SUCCESS: {
        return {
          ...state,
          loading: false,
          employee: action.payload
        };
      }
      case Constants.GET_EMPLOYEE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
      case Constants.OPEN_NEW_EMPLOYEE_DIALOG: {
        return {
          ...state,
          empDialog: {
            props: { open: true },
            type: 'new',
            data: null
          },
        };
      }
      case Constants.OPEN_EDIT_EMPLOYEE_DIALOG: {
        return {
          ...state,
          empDialog: {
            props: { open: true },
            type: 'edit',
            data: action.payload
          },
        };
      }
      case Constants.CLOSE_EDIT_EMPLOYEE_DIALOG: {
        return {
          ...state,
          empDialog: {
            props: { open: false },
            type: 'edit',
            data: null
          },
        };
      }
      case Constants.CLOSE_NEW_EMPLOYEE_DIALOG: {
        return {
          ...state,
          empDialog: {
            ...state.empDialog,
            props: { open: false }
          },
        };
      }
      case Constants.OPEN_NEW_DEPARTMENT_DIALOG: {
        return {
          ...state,
          deptDialog: {
            props: { open: true },
            type: 'new',
            data: null
          },
        };
      }
      case Constants.CLOSE_NEW_DEPARTMENT_DIALOG: {
        return {
          ...state,
          deptDialog: {
            props: { open: false },
            type: 'new',
            data: null
          },
        };
      }
      case Constants.OPEN_NEW_BRANCH_DIALOG: {
        return {
          ...state,
          branchDialog: {
            type: 'new',
            props: { open: true },
            data: null
          },
        };
      }
      case Constants.CLOSE_NEW_BRANCH_DIALOG: {
        return {
          ...state,
          branchDialog: {
            type: 'new',
            props: { open: false },
            data: null
          },
        };
      }
      case Constants.OPEN_NEW_ROLE_DIALOG: {
        return {
          ...state,
          roleDialog: {
            type: 'new',
            props: { open: true },
            data: null
          },
        };
      }
      case Constants.CLOSE_NEW_ROLE_DIALOG: {
        return {
          ...state,
          roleDialog: {
            type: 'new',
            props: { open: false },
            data: null
          },
        };
      }
      case Constants.OPEN_NEW_PAYROLL_DIALOG: {
        return {
          ...state,
          payrollDialog: {
            type: 'new',
            props: { open: true },
            data: null
          },
        };
      }
      case Constants.CLOSE_NEW_PAYROLL_DIALOG: {
        return {
          ...state,
          payrollDialog: {
            type: 'new',
            props: { open: false },
            data: null
          },
        };
      }
      case Constants.OPEN_NEW_ANNOUNCEMENT_DIALOG: {
        return {
          ...state,
          announcementDialog: {
            props: { open: true },
            type: 'new',
            data: null
          },
        };
      }
      case Constants.CLOSE_NEW_ANNOUNCEMENT_DIALOG: {
        return {
          ...state,
          announcementDialog: {
            props: { open: false },
            type: 'new',
            data: null
          },
        };
      }
      case Constants.OPEN_EDIT_ANNOUNCEMENT_DIALOG: {
        return {
          ...state,
          announcementDialog: {
            type: 'edit',
            props: { open: true },
            data: action.payload
          },
        };
      }
      case Constants.CLOSE_EDIT_ANNOUNCEMENT_DIALOG: {
        return {
          ...state,
          announcementDialog: {
            type: 'edit',
            props: { open: false },
            data: null
          },
        };
      }
      case Constants.OPEN_CONFIRM_ANNOUNCEMENT_DIALOG: {
        return {
          ...state,
          confirmAnnouncementDialog: {
            type: 'new',
            props: { open: true },
            data: action.payload
          },
        };
      }
      case Constants.CLOSE_CONFIRM_ANNOUNCEMENT_DIALOG: {
        return {
          ...state,
          confirmAnnouncementDialog: {
            type: 'new',
            props: { open: false },
            data: null
          },
        };
      }
      case Constants.OPEN_ANNOUNCEMENT_VIEW_DIALOG: {
        return {
          ...state,
          announcementViewDialog: {
            type: 'new',
            props: { open: true },
            data: action.payload
          },
        };
      }
      case Constants.CLOSE_ANNOUNCEMENT_VIEW_DIALOG: {
        return {
          ...state,
          announcementViewDialog: {
            type: 'new',
            props: { open: false },
            data: null
          },
        };
      }
      case Constants.OPEN_WORK_EXPERIENCE_DIALOG: {
        return {
          ...state,
          workExperienceDialog: {
            ...state.workExperienceDialog,
            props: { open: true },
            data: action.payload
          },
        };
      }
      case Constants.CLOSE_WORK_EXPERIENCE_DIALOG: {
        return {
          ...state,
          workExperienceDialog: { ...state.workExperienceDialog, props: { open: false } },
        };
      }
      case Constants.OPEN_EDUCATION_BACKGROUND_DIALOG: {
        return {
          ...state,
          educationBackgroundDialog: { ...state.educationBackgroundDialog, props: { open: true }, data: action.payload },
        };
      }
      case Constants.CLOSE_EDUCATION_BACKGROUND_DIALOG: {
        return {
          ...state,
          educationBackgroundDialog: { ...state.educationBackgroundDialog, props: { open: false } },
        };
      }
      case Constants.OPEN_NEW_APPLICANT_DIALOG: {
        return {
          ...state,
          applicantDialog: { ...state.applicantDialog, props: { open: true }, data: action.payload },
        };
      }
      case Constants.CLOSE_NEW_APPLICANT_DIALOG: {
        return {
          ...state,
          applicantDialog: { ...state.applicantDialog, props: { open: false } },
        };
      }
      case Constants.OPEN_NEW_EMPLOYEE_TYPE_DIALOG: {
        return {
          ...state,
          employeeTypeDialog: { ...state.employeeTypeDialog, props: { open: true }, type: action.payload },
        };
      }
      case Constants.CLOSE_NEW_EMPLOYEE_TYPE_DIALOG: {
        return {
          ...state,
          employeeTypeDialog: { ...state.employeeTypeDialog, props: { open: false } },
        };
      }
    }
  });

export default hrReducer;
