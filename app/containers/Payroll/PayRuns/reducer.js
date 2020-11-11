import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  payrunDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  payrunConfirmDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  Payruns: [],
  Payrun: null,
};

/* eslint-disable default-case, no-param-reassign */
const payrunReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Open dialog for adding new payrun
      case Constants.OPEN_NEW_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      case Constants.OPEN_EDIT_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      case Constants.OPEN_DELETE_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunConfirmDialog: {
            type: 'delete',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_DELETE_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunConfirmDialog: {
            type: 'delete',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      case Constants.OPEN_ACTIVATE_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunDialog: {
            type: 'activate',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_ACTIVATE_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunDialog: {
            type: 'activate',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      case Constants.OPEN_DEACTIVATE_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunDialog: {
            type: 'deactivate',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_DEACTIVATE_PAYRUN_DIALOG: {
        return {
          ...state,
          payrunDialog: {
            type: 'deactivate',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }
      // Case to create new payrun
      case Constants.CREATE_PAYRUN: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_PAYRUN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_PAYRUN_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get all payruns
      case Constants.GET_PAYRUNS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_PAYRUNS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          Payruns: action.payload,
        };
      }
      case Constants.GET_PAYRUNS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get payrun by id
      case Constants.GET_PAYRUN_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_PAYRUN_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          Payrun: action.payload,
        };
      }
      case Constants.GET_PAYRUN_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to update/edit payrun
      case Constants.UPDATE_PAYRUN: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.UPDATE_PAYRUN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_PAYRUN_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to delete payrun
      case Constants.DELETE_PAYRUN: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.DELETE_PAYRUN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DELETE_PAYRUN_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default payrunReducer;
