import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  salaryAdvanceDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  salaryAdvanceConfirmDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  salaryAdvances: [],
  salaryAdvance: null,
};

/* eslint-disable default-case, no-param-reassign */
const salaryAdvanceReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Open dialog for adding new salary advance
      case Constants.OPEN_NEW_SALARY_ADVANCE_DIALOG: {
        return {
          ...state,
          salaryAdvanceDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_SALARY_ADVANCE_DIALOG: {
        return {
          ...state,
          salaryAdvanceDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      case Constants.OPEN_EDIT_SALARY_ADVANCE_DIALOG: {
        return {
          ...state,
          salaryAdvanceDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_SALARY_ADVANCE_DIALOG: {
        return {
          ...state,
          salaryAdvanceDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      case Constants.OPEN_DELETE_SALARY_ADVANCE_DIALOG: {
        return {
          ...state,
          salaryAdvanceConfirmDialog: {
            type: 'delete',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_DELETE_SALARY_ADVANCE_DIALOG: {
        return {
          ...state,
          salaryAdvanceConfirmDialog: {
            type: 'delete',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to create new salary advance
      case Constants.CREATE_SALARY_ADVANCE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_SALARY_ADVANCE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_SALARY_ADVANCE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get all salary advances
      case Constants.GET_SALARY_ADVANCES: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_SALARY_ADVANCES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          salaryAdvances: action.payload,
        };
      }
      case Constants.GET_SALARY_ADVANCES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get salary advance by id
      case Constants.GET_SALARY_ADVANCE_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_SALARY_ADVANCE_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          salaryAdvance: action.payload,
        };
      }
      case Constants.GET_SALARY_ADVANCE_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to update/edit salary advance
      case Constants.UPDATE_SALARY_ADVANCE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.UPDATE_SALARY_ADVANCE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_SALARY_ADVANCE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to delete salary advance
      case Constants.DELETE_SALARY_ADVANCE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.DELETE_SALARY_ADVANCE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DELETE_SALARY_ADVANCE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default salaryAdvanceReducer;
