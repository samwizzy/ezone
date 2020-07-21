/*
 *
 * UtilityPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';
export const initialState = {
  loading: false,
  users: [],
  user: null,
  tasks: [],
  task: null,
  taskComments: [],
  error: { success: '', message: '' },
  taskDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  assignTaskDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  confirmTaskDeleteDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  previewTaskDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const utilityPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
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
          users: action.payload,
        };
      }
      case Constants.GET_EMPLOYEES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_USER_BY_UUID: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_USER_BY_UUID_SUCCESS: {
        return {
          ...state,
          loading: false,
          user: action.payload
        };
      }
      case Constants.GET_USER_BY_UUID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
      case Constants.CREATE_UTILITY_TASKS: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.CREATE_UTILITY_TASKS_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.CREATE_UTILITY_TASKS_ERROR: {
        return {
          ...state,
          loading: false,
          error: { ...state.error, success: false, message: action.payload },
        };
      }
      case Constants.UPDATE_UTILITY_TASK: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.UPDATE_UTILITY_TASK_SUCCESS: {
        return {
          ...state,
          loading: false
        };
      }
      case Constants.GET_UTILITY_TASK: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.GET_UTILITY_TASK_SUCCESS: {
        return {
          ...state,
          loading: false,
          task: action.payload,
        };
      }
      case Constants.GET_UTILITY_TASK_ERROR: {
        return {
          ...state,
          loading: false,
          error: { ...state.error, success: false, message: action.payload },
        };
      }
      case Constants.GET_UTILITY_TASKS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_UTILITY_TASKS_SUCCESS: {
        return {
          ...state,
          loading: false,
          tasks: action.payload,
        };
      }
      case Constants.GET_UTILITY_TASKS_BY_STATUS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_UTILITY_TASKS_BY_STATUS_SUCCESS: {
        return {
          ...state,
          loading: false,
          tasks: action.payload,
        };
      }
      case Constants.GET_TASK_COMMENTS_SUCCESS: {
        return {
          ...state,
          taskComments: action.payload,
        };
      }
      case Constants.GET_UTILITY_TASKS_ERROR: {
        return {
          ...state,
          error: { ...state.error, success: false, message: action.payload },
          loading: false
        };
      }
      case Constants.OPEN_EDIT_TASK_DIALOG: {
        return {
          ...state,
          taskDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.OPEN_NEW_TASK_DIALOG: {
        return {
          ...state,
          taskDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_TASK_DIALOG: {
        return {
          ...state,
          taskDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_CONFIRM_TASK_DELETE_DIALOG: {
        return {
          ...state,
          confirmTaskDeleteDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_CONFIRM_TASK_DELETE_DIALOG: {
        return {
          ...state,
          confirmTaskDeleteDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_ASSIGN_TO_DIALOG: {
        return {
          ...state,
          assignTaskDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_ASSIGN_TO_DIALOG: {
        return {
          ...state,
          assignTaskDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_TASK_PREVIEW_DIALOG: {
        return {
          ...state,
          previewTaskDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_TASK_PREVIEW_DIALOG: {
        return {
          ...state,
          previewTaskDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
    }
  });

export default utilityPageReducer;
