/*
 *
 * Roles reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  employees: [],
  modules: [],
  roles: [],
  role: null,
  rights: [],
  right: null,
  roleRights: [],
  roleRight: null,
  roleRightState: {
    type: 'new'
  },
  roleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  rightDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  roleDetailsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const roleRightsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_ROLE_DIALOG: {
        return {
          ...state,
          roleDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          }
        };
      }
      case Constants.CLOSE_NEW_ROLE_DIALOG: {
        return {
          ...state,
          roleDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_ROLE_DIALOG: {
        return {
          ...state,
          roleDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_ROLE_DIALOG: {
        return {
          ...state,
          roleDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_RIGHT_DIALOG: {
        return {
          ...state,
          rightDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          }
        };
      }
      case Constants.CLOSE_NEW_RIGHT_DIALOG: {
        return {
          ...state,
          rightDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_RIGHT_DIALOG: {
        return {
          ...state,
          rightDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_RIGHT_DIALOG: {
        return {
          ...state,
          rightDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_ROLE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_ROLE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ROLE_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_ROLE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_ROLE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_ROLE_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.CREATE_RIGHT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_RIGHT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_RIGHT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_RIGHT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_RIGHT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_RIGHT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.CREATE_ROLE_RIGHT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_ROLE_RIGHT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ROLE_RIGHT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_ROLE_RIGHT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_ROLE_RIGHT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_ROLE_RIGHT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
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
          employees: action.payload,
        };
      }
      case Constants.GET_EMPLOYEES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_MODULES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_MODULES_SUCCESS: {
        return {
          ...state,
          loading: false,
          modules: action.payload,
        };
      }
      case Constants.GET_MODULES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_ROLES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ROLES_SUCCESS: {
        return {
          ...state,
          loading: false,
          roles: action.payload,
        };
      }
      case Constants.GET_ROLES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_ROLE_BY_ID: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ROLE_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          role: action.payload,
        };
      }
      case Constants.GET_ROLE_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_RIGHTS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_RIGHTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          rights: action.payload,
        };
      }
      case Constants.GET_RIGHTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_RIGHT_BY_ID: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_RIGHT_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          role: action.payload,
        };
      }
      case Constants.GET_RIGHT_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_ROLE_RIGHTS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ROLE_RIGHTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          roleRights: action.payload,
        };
      }
      case Constants.GET_ROLE_RIGHTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_ROLE_RIGHT_BY_ID: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ROLE_RIGHT_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          roleRight: action.payload,
        };
      }
      case Constants.GET_ROLE_RIGHT_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_RIGHTS_BY_ROLE_ID: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_RIGHTS_BY_ROLE_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          right: action.payload,
        };
      }
      case Constants.GET_RIGHTS_BY_ROLE_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default roleRightsReducer;
