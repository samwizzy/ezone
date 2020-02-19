/*
 *
 * UtilityPage reducer
 *
 */
import produce from 'immer';
import {
  CREATE_UTILITY_TASKS,
  GET_UTILITY_TASKS,
  CREATE_UTILITY_TASKS_SUCCESS,
  GET_UTILITY_TASKS_ERROR,
  GET_UTILITY_FILES,
  CREATE_UTILITY_FILES,
  CREATE_UTILITY_FILES_SUCCESS,
  GET_UTILITY_FILES_ERROR,
  OPEN_FILE_UPLOAD_DIALOG,
  CLOSE_FILE_UPLOAD_DIALOG,
  OPEN_SHARE_FILE_DIALOG,
  CLOSE_SHARE_FILE_DIALOG,
  OPEN_NEW_TASK_DIALOG,
  CLOSE_NEW_TASK_DIALOG,
  OPEN_NEW_FILE_DIALOG,
  CLOSE_NEW_FILE_DIALOG,
  OPEN_TASK_PREVIEW_DIALOG,
  CLOSE_TASK_PREVIEW_DIALOG,
  OPEN_NEW_BRANCH_DIALOG,
  CLOSE_NEW_BRANCH_DIALOG,
  OPEN_EDIT_BRANCH_DIALOG,
  CLOSE_EDIT_BRANCH_DIALOG,
  OPEN_NEW_DEPARTMENT_DIALOG,
  CLOSE_NEW_DEPARTMENT_DIALOG,
  OPEN_EDIT_DEPARTMENT_DIALOG,
  CLOSE_EDIT_DEPARTMENT_DIALOG,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: [{id: 1, name: 'Samuel', format: 'PDF', size: '12mb', modified_by: 'Christian', date_uploaded: '3rd, Jul 2019'}],
  data1: [{id: 1, name: 'Invoicing', description: 'Lorem ipsum flora iregi', assignedTo: 'Christian, Tina..', dateAssigned: '3rd, Jul 19', dueDate: '3rd, Jul 2019', status: 'expired'}],
  fileDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null
  },
  fileUploadDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null
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
    data: null
  },
  tasks: [],
  task: {},
  files: [],
  file: {},
  error: { success: "", message: "" }
};

/* eslint-disable default-case, no-param-reassign */
const utilityPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case OPEN_FILE_UPLOAD_DIALOG: {
        return {
          ...state,
          fileUploadDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload
          },
        };
      }
      case CREATE_UTILITY_TASKS: {
        return {
          ...state,
          task: action.payload
        };
      }
      case GET_UTILITY_TASKS: {
        return {
          ...state,
          tasks: action.payload
        };
      }
      case CREATE_UTILITY_TASKS_SUCCESS: {
        return {
          ...state,
          task: action.payload
        };
      }
      case GET_UTILITY_TASKS_ERROR: {
        return {
          ...state,
          error: action.payload
        };
      }
      case CREATE_UTILITY_FILES: {
        return {
          ...state,
          task: action.payload
        };
      }
      case CREATE_UTILITY_FILES_SUCCESS: {
        return {
          ...state,
          file: action.payload
        };
      }
      case GET_UTILITY_FILES: {
        return {
          ...state,
          files: action.payload
        };
      }
      case GET_UTILITY_FILES_ERROR: {
        return {
          ...state,
          error: action.payload
        };
      }
      case CLOSE_FILE_UPLOAD_DIALOG: {
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
      case OPEN_SHARE_FILE_DIALOG: {
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
      case CLOSE_SHARE_FILE_DIALOG: {
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
      case OPEN_NEW_TASK_DIALOG: {
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
      case CLOSE_NEW_TASK_DIALOG: {
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
      case OPEN_TASK_PREVIEW_DIALOG: {
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
      case CLOSE_TASK_PREVIEW_DIALOG: {
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
      case OPEN_NEW_FILE_DIALOG: {
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
      case CLOSE_NEW_FILE_DIALOG: {
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
      case OPEN_NEW_BRANCH_DIALOG: {
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
      case CLOSE_NEW_BRANCH_DIALOG: {
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
      case OPEN_EDIT_BRANCH_DIALOG: {
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
      case CLOSE_EDIT_BRANCH_DIALOG: {
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
      case OPEN_NEW_DEPARTMENT_DIALOG: {
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
      case CLOSE_NEW_DEPARTMENT_DIALOG: {
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
      case OPEN_EDIT_DEPARTMENT_DIALOG: {
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
      case CLOSE_EDIT_DEPARTMENT_DIALOG: {
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
    }
  });

export default utilityPageReducer;
