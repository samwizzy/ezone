import produce from 'immer';
import * as Constants from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: {},
  employees: [],
  departments: [],
  branches: [],
  roles: [],
  attendances: [],
  attendance: null,
  shifts: [],
  employeeShifts: [],
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
  announcementViewDialog: {
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
      case Constants.GET_ATTENDANCES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      };

      case Constants.GET_EMPLOYEES: {
        return {
          ...state,
          loading: true
        }
      };
      case Constants.GET_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          employees: action.payload
        }
      };

      case Constants.GET_USERS_BY_SHIFT: {
        return {
          ...state,
          loading: true
        }
      };
      case Constants.GET_USERS_BY_SHIFT_SUCCESS: {
        return {
          ...state,
          loading: false,
          employeeShifts: action.payload
        }
      };

      case Constants.GET_DEPARTMENTS: {
        return {
          ...state,
          loading: true
        }
      };
      case Constants.GET_DEPARTMENTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          departments: action.payload
        }
      };

      case Constants.GET_BRANCHES: {
        return {
          ...state,
          loading: true
        }
      };
      case Constants.GET_BRANCHES_SUCCESS: {
        return {
          ...state,
          loading: false,
          branches: action.payload
        }
      };

      case Constants.GET_ROLES: {
        return {
          ...state,
          loading: true
        }
      };
      case Constants.GET_ROLES_SUCCESS: {
        return {
          ...state,
          loading: false,
          roles: action.payload
        }
      };

      case Constants.GET_ATTENDANCE_BY_ID: {
        return {
          ...state,
          loading: true
        }
      };
      case Constants.GET_ATTENDANCE_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          attendance: action.payload
        }
      };
      case Constants.GET_ATTENDANCE_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
        }
      };
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
      case Constants.CREATE_ATTENDANCE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }

      case Constants.ASSIGN_SHIFT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.ASSIGN_SHIFT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.GET_DAYS_SUCCESS: {
        return {
          ...state,
          days: action.payload
        }
      };
      case Constants.GET_SHIFTS_SUCCESS: {
        return {
          ...state,
          shifts: action.payload
        }
      };
      case Constants.CREATE_SHIFT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_SHIFT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.OPEN_NEW_ATTENDANCE_DIALOG: {
        return {
          ...state,
          attdDialog: { ...state.attdDialog, props: { open: true } },
        }
      };
      case Constants.CLOSE_NEW_ATTENDANCE_DIALOG: {
        return {
          ...state,
          attdDialog: { ...state.attdDialog, props: { open: false } },
        }
      };
      case Constants.OPEN_NEW_SHIFT_DIALOG: {
        return {
          ...state,
          shiftDialog: { ...state.shiftDialog, props: { open: true } },
        }
      };
      case Constants.CLOSE_NEW_SHIFT_DIALOG: {
        return {
          ...state,
          shiftDialog: { ...state.shiftDialog, props: { open: false } },
        }
      };
      case Constants.OPEN_NEW_EMPLOYEE_SHIFT_DIALOG: {
        return {
          ...state,
          employeeShiftDialog: { ...state.employeeShiftDialog, props: { open: true } },
        }
      };
      case Constants.CLOSE_NEW_EMPLOYEE_SHIFT_DIALOG: {
        return {
          ...state,
          employeeShiftDialog: { ...state.employeeShiftDialog, props: { open: false } },
        }
      };
    }
  });

export default attdReducer;
