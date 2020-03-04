/*
 *
 * UtilityPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';
export const initialState = {
  getAllUsersChat: [],
  getAllEmployees: [],
  loading: false,
  error: false,
  data: [
    {
      id: 1,
      name: 'Samuel',
      format: 'PDF',
      size: '12mb',
      modified_by: 'Christian',
      date_uploaded: '3rd, Jul 2019',
    },
  ],
  data1: [
    {
      id: 1,
      name: 'Invoicing',
      description: 'Lorem ipsum flora iregi',
      assignedTo: 'Christian, Tina..',
      dateAssigned: '3rd, Jul 19',
      dueDate: '3rd, Jul 2019',
      status: 'expired',
    },
  ],
  fileDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  fileUploadDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  shareFileDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  taskDialog: {
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
  branchDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  departmentDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  users: [],
  tasks: [],
  task: {},
  files: [],
  file: {},
  error: { success: '', message: '' },
};

/* eslint-disable default-case, no-param-reassign */
const utilityPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_FILE_UPLOAD_DIALOG: {
        return {
          ...state,
          fileUploadDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.GET_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          users: action.payload,
        };
      }
      case Constants.CREATE_UTILITY_TASKS: {
        return {
          ...state,
          task: action.payload,
        };
      }
      case Constants.GET_UTILITY_TASK_SUCCESS: {
        return {
          ...state,
          task: action.payload,
        };
      }
      case Constants.GET_UTILITY_TASKS_SUCCESS: {
        return {
          ...state,
          tasks: action.payload,
        };
      }
      case Constants.CREATE_UTILITY_TASKS_SUCCESS: {
        return {
          ...state,
          task: action.payload,
        };
      }
      case Constants.GET_UTILITY_TASKS_ERROR: {
        return {
          ...state,
          error: action.payload,
        };
      }
      case Constants.CREATE_UTILITY_FILES: {
        return {
          ...state,
          task: action.payload,
        };
      }
      case Constants.CREATE_UTILITY_FILES_SUCCESS: {
        return {
          ...state,
          file: action.payload,
        };
      }
      case Constants.GET_UTILITY_FILES_SUCCESS: {
        return {
          ...state,
          files: action.payload,
        };
      }
      case Constants.GET_UTILITY_FILES_ERROR: {
        return {
          ...state,
          error: action.payload,
        };
      }
      case Constants.CLOSE_FILE_UPLOAD_DIALOG: {
        return {
          ...state,
          fileUploadDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }
      case Constants.OPEN_SHARE_FILE_DIALOG: {
        return {
          ...state,
          shareFileDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_SHARE_FILE_DIALOG: {
        return {
          ...state,
          shareFileDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
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
      case Constants.OPEN_NEW_FILE_DIALOG: {
        return {
          ...state,
          fileDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_FILE_DIALOG: {
        return {
          ...state,
          fileDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_BRANCH_DIALOG: {
        return {
          ...state,
          branchDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_BRANCH_DIALOG: {
        return {
          ...state,
          branchDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_BRANCH_DIALOG: {
        return {
          ...state,
          branchDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_BRANCH_DIALOG: {
        return {
          ...state,
          branchDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_DEPARTMENT_DIALOG: {
        return {
          ...state,
          departmentDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_DEPARTMENT_DIALOG: {
        return {
          ...state,
          departmentDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_DEPARTMENT_DIALOG: {
        return {
          ...state,
          departmentDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_DEPARTMENT_DIALOG: {
        return {
          ...state,
          departmentDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.GET_ALL_USERS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_USERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllEmployees: action.payload,
        };
      }
      case Constants.GET_ALL_USERS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ALL_USERS_CHAT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_USERS_CHAT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllUsersChat: action.payload,
        };
      }
      case Constants.GET_ALL_USERS_CHAT_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default utilityPageReducer;
