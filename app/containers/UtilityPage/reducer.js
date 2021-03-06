/*
 *
 * UtilityPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  postFcmToken: false,
  postMsg: false,
  getPostMsg: false,
  getAllUserChatData: false,
  getUserChatData: [],
  getAllUsersChat: [],
  getAllEmployees: [],
  loading: false,
  error: { success: '', message: '' },
  fileDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  folderDialog: {
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
  filePreviewDialog: {
    open: false,
    data: {}
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
    data: null
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
  user: null,
  tasks: [],
  task: null,
  taskComments: [],
  folders: [],
  nestedFolders: [],
  folder: null,
  files: [],
  file: null,
  prevIds: [],
};

/* eslint-disable default-case, no-param-reassign */
const utilityPageReducer = (state = initialState, action) =>
  produce(state, draft => {
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
      case Constants.ADD_PREV_ID: {
        return {
          ...state,
          prevIds: [...state.prevIds, action.payload],
        };
      }
      case Constants.REMOVE_PREV_ID: {
        return {
          ...state,
          prevIds: state.prevIds.slice(0, -1),
        };
      }
      case Constants.GET_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          users: action.payload,
        };
      }
      case Constants.GET_USER_BY_UUID_SUCCESS: {
        return {
          ...state,
          user: action.payload
        };
      }
      case Constants.CREATE_UTILITY_TASKS: {
        return {
          ...state,
          task: action.payload,
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
          task: action.payload,
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
          task: action.payload,
          loading: false
        };
      }
      case Constants.GET_UTILITY_TASK_ERROR: {
        return {
          ...state,
          error: { ...state.error, success: false, message: action.payload },
          loading: false
        };
      }
      case Constants.GET_UTILITY_TASKS: {
        return {
          ...state,
          tasks: action.payload,
          loading: true
        };
      }
      case Constants.GET_UTILITY_TASKS_SUCCESS: {
        return {
          ...state,
          tasks: action.payload,
          loading: false
        };
      }
      case Constants.GET_FOLDERS_AND_DOC: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.GET_FOLDERS_AND_DOC_SUCCESS: {
        return {
          ...state,
          folders: action.payload,
          loading: false
        };
      }
      case Constants.GET_NESTED_FOLDERS_AND_DOC: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.GET_NESTED_FOLDERS_AND_DOC_SUCCESS: {
        return {
          ...state,
          nestedFolders: action.payload,
          loading: false
        };
      }
      case Constants.GET_FOLDER_BY_ID: {
        return {
          ...state,
          folder: action.payload,
          loading: false
        };
      }
      case Constants.GET_UTILITY_TASKS_BY_STATUS_SUCCESS: {
        return {
          ...state,
          tasks: action.payload,
          loading: false
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
      case Constants.GET_UTILITY_FILE_SUCCESS: {
        return {
          ...state,
          file: action.payload
        };
      }
      case Constants.FAVORITE_FILE_BY_DOC_ID_SUCCESS: {
        return {
          ...state,
          error: { success: '', message: action.payload }
        };
      }
      case Constants.SHARE_DOCUMENT_SUCCESS: {
        return {
          ...state,
          error: { success: '', message: action.payload }
        };
      }
      case Constants.DELETE_DOCUMENT: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.DELETE_DOCUMENT_SUCCESS: {
        return {
          ...state,
          error: { success: '', message: action.payload },
          loading: false
        };
      }
      case Constants.GET_SHARED_DOCS_BY_UUID: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.GET_SHARED_DOCS_BY_UUID_SUCCESS: {
        return {
          ...state,
          loading: false,
          folders: action.payload,
        };
      }
      case Constants.GET_TRASHED_DOCS_BY_UUID_SUCCESS: {
        return {
          ...state,
          folders: action.payload,
        };
      }
      case Constants.GET_FAVORITE_DOCS_BY_UUID_SUCCESS: {
        return {
          ...state,
          folders: action.payload,
        };
      }
      case Constants.GET_UTILITY_FILES: {
        return {
          ...state,
          files: action.payload,
          loading: true
        };
      }
      case Constants.GET_UTILITY_FILES_SUCCESS: {
        return {
          ...state,
          files: action.payload,
          loading: false
        };
      }
      case Constants.GET_UTILITY_FILES_ERROR: {
        return {
          ...state,
          error: action.payload,
          loading: false
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
        const file = state.files.find(file => file.id == action.payload)
        return {
          ...state,
          shareFileDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: file,
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
      case Constants.OPEN_PREVIEW_FILE_DIALOG: {
        return {
          ...state,
          filePreviewDialog: {
            open: true,
            data: action.payload
          }
        };
      }
      case Constants.CLOSE_PREVIEW_FILE_DIALOG: {
        return {
          ...state,
          filePreviewDialog: {
            open: false,
            data: {}
          }
        };
      }
      case Constants.OPEN_NEW_FOLDER_DIALOG: {
        return {
          ...state,
          folderDialog: { type: 'new', props: { open: true }, data: action.payload },
        };
      }
      case Constants.CLOSE_NEW_FOLDER_DIALOG: {
        return {
          ...state,
          folderDialog: { type: 'new', props: { open: false }, data: action.payload },
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
        console.log(action.payload, 'action.payload');
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
      case Constants.GET_USER_CHAT_DATA: {
        // console.log(action.payload, 'getUserChatData');
        return {
          ...state,
          loading: true,
          error: false,
          getUserChatData: action.payload,
        };
      }
      case Constants.GET_USER_CHAT_DATA_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllUserChatData: action.payload,
        };
      }
      case Constants.GET_USER_CHAT_DATA_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.POST_MSG: {
        // console.log(action.payload, 'reducer data');
        return {
          ...state,
          loading: true,
          error: false,
          postMsg: action.payload,
        };
      }
      case Constants.POST_MSG_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getPostMsg: action.payload,
        };
      }
      case Constants.POST_MSG_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.RESET_POST_MSG: {
        return {
          getPostMsg: false,
        };
      }
      case Constants.POST_FCM_TOKEN: {
        console.log(action.payload, 'action.payload');
        return {
          ...state,
          loading: true,
          error: false,
          postFcmToken: action.payload,
        };
      }
      case Constants.POST_FCM_TOKEN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getPostMsg: action.payload,
        };
      }
      case Constants.POST_FCM_TOKEN_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default utilityPageReducer;
