/*
 *
 * UtilityPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: { success: '', message: '' },
  users: [],
  user: null,
  folders: [],
  nestedFolders: [],
  folder: null,
  files: [],
  file: null,
  prevIds: [],
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
            data: null,
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
      case Constants.GET_EMPLOYEES_ERROR: {
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
    }
  });

export default utilityPageReducer;
