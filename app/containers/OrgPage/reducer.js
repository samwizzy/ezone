/*
 *
 * OrgPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  colorDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  companyDialog: {
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
  partyDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const orgPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_EDIT_COLOR_DIALOG: {
        return {
          ...state,
          colorDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_COLOR_DIALOG: {
        return {
          ...state,
          colorDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_COMPANY_DIALOG: {
        return {
          ...state,
          companyDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_COMPANY_DIALOG: {
        return {
          ...state,
          companyDialog: {
            type: 'edit',
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
      case Constants.OPEN_NEW_PARTY_DIALOG: {
        return {
          ...state,
          partyDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_PARTY_DIALOG: {
        return {
          ...state,
          partyDialog: {
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

export default orgPageReducer;
