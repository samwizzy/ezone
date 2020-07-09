/*
 *
 * Companies reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  employees: [],
  getAllCompanies: [],
  companyDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const crmCompaniesReducer = (state = initialState, action) =>
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
          employees: action.payload,
        };
      }
      case Constants.GET_EMPLOYEES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
        };
      }
      case Constants.OPEN_NEW_COMPANY_DIALOG: {
        return {
          ...state,
          companyDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
          companyDetailsDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_COMPANY_DIALOG: {
        return {
          ...state,
          companyDialog: {
            type: 'new',
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
      case Constants.OPEN_COMPANY_DETAILS_DIALOG: {
        return {
          ...state,
          companyDetailsDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_COMPANY_DETAILS_DIALOG: {
        return {
          ...state,
          companyDetailsDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_NEW_COMPANY: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_NEW_COMPANY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_COMPANY_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_COMPANY: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_COMPANY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_COMPANY_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_ALL_COMPANIES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ALL_COMPANIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          getAllCompanies: action.payload,
        };
      }
      case Constants.GET_ALL_COMPANIES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default crmCompaniesReducer;
