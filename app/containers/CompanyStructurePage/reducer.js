/*
 *
 * OrgPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  createNewPartyData: false,
  createNewPartyGroupData: false,
  partyGroupData: false,
  loading: false,
  error: false,
  selectedPartyGroupData: false,
  getAllUsersData: false,
  partyDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null
  },
  subPartyDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null
  },
  roleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null
  },
  party: [
    {id: 1, name: 'Region', description: 'Testing out', head: 'Afeez', assistant: 'Sammy'}
  ],
};

/* eslint-disable default-case, no-param-reassign */
const companyStructurePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_PARTY_DIALOG: {
        return {
          ...state,
          partyDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null
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
      case Constants.OPEN_NEW_SUB_PARTY_DIALOG: {
        return {
          ...state,
          subPartyDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_SUB_PARTY_DIALOG: {
        return {
          ...state,
          subPartyDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_ROLE_DIALOG: {
        return {
          ...state,
          roleDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
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
      case Constants.GET_PARTY_GROUP: {
        console.log('trigger actions from reducer');
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_PARTY_GROUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          partyGroupData: action.payload,
        };
      }
      case Constants.GET_PARTY_GROUP_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_SELECTED_PARTY_GROUP: {
        return {
          ...state,
          selectedPartyGroupData: action.payload,

        };
      }
      case Constants.CREATE_NEW_PARTY_GROUP: {
        return {
          ...state,
          createNewPartyGroupData: action.payload,
        };
      }
      case Constants.CREATE_NEW_PARTY_GROUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          // success: action.payload,
        };
      }
      case Constants.CREATE_NEW_PARTY_GROUP_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
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
          getAllUsersData: action.payload,
        };
      }
      case Constants.GET_ALL_USERS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.CREATE_NEW_PARTY: {
        return {
          ...state,
          loading: true,
          error: false,
          createNewPartyData: action.payload,
        };
      }
      case Constants.CREATE_NEW_PARTY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          // getAllUsersData: action.payload,
        };
      }
      case Constants.CREATE_NEW_PARTY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default companyStructurePageReducer;