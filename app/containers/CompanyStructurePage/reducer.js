/*
 *
 * OrgPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  updatePartiesData: {},
  allTags: [],
  updatePositionData: {},
  updatePartyData: {},
  allEmployees: false,
  addEmployeeToPositionData: false,
  allPositions: false,
  getPartyById: false,
  selectedParty: false,
  selectedPosition: false,
  createNewPartyData: false,
  createNewPartiesData: false,
  createNewPositionData: false,
  createNewPartyGroupData: false,
  updatePartyGroupData: false,
  partyGroupData: false,
  loading: false,
  error: false,
  selectedPartyGroupData: false,
  getAllUsersData: [],
  newPartyGroupDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  newPartyDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  newPartiesDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  roleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  addEmployeeToPositionDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  // Organization initial state
  companyInfo: null,
  updateCompanyInfoData: null,
  message: null,
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
  positionDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const companyStructurePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_PARTY_GROUP_DIALOG: {
        return {
          ...state,
          newPartyGroupDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_PARTY_GROUP_DIALOG: {
        return {
          ...state,
          newPartyGroupDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_PARTY_GROUP_DIALOG: {
        return {
          ...state,
          newPartyGroupDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_PARTY_GROUP_DIALOG: {
        return {
          ...state,
          newPartyGroupDialog: {
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
          newPartyDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_PARTY_DIALOG: {
        return {
          ...state,
          newPartyDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_PARTY_DIALOG: {
        return {
          ...state,
          newPartyDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_PARTY_DIALOG: {
        return {
          ...state,
          newPartyDialog: {
            type: 'edit',
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
      case Constants.GET_SELECTED_POSITION: {
        return {
          ...state,
          selectedPosition: action.payload,
        };
      }
      case Constants.GET_SELECTED_PARTY: {
        return {
          ...state,
          selectedParty: action.payload,
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
          loading: true,
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
      case Constants.UPDATE_PARTY_GROUP: {
        return {
          ...state,
          loading: true,
          updatePartyGroupData: action.payload,
        };
      }
      case Constants.UPDATE_PARTY_GROUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          // success: action.payload,
        };
      }
      case Constants.UPDATE_PARTY_GROUP_ERROR: {
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
        };
      }
      case Constants.CREATE_NEW_PARTY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_PARTY_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
          partyId: action.payload,
        };
      }
      case Constants.GET_PARTY_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getPartyById: action.payload,
        };
      }
      case Constants.GET_PARTY_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.UPDATE_PARTY: {
        return {
          ...state,
          loading: true,
          error: false,
          updatePartyData: action.payload,
        };
      }
      case Constants.UPDATE_PARTY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_PARTY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.SELECTED_PARTY: {
        return {
          ...state,
          loading: false,
          selectedPartyGroupData: action.payload,
        };
      }
      case Constants.OPEN_NEW_PARTIES_DIALOG: {
        return {
          ...state,
          newPartiesDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_PARTIES_DIALOG: {
        return {
          ...state,
          newPartiesDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_PARTIES_DIALOG: {
        return {
          ...state,
          newPartiesDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_PARTIES_DIALOG: {
        return {
          ...state,
          newPartiesDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_NEW_PARTIES: {
        return {
          ...state,
          loading: true,
          error: false,
          createNewPartiesData: action.payload,
        };
      }
      case Constants.CREATE_NEW_PARTIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_PARTIES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.UPDATE_PARTIES: {
        return {
          ...state,
          loading: true,
          error: false,
          updatePartiesData: action.payload,
        };
      }
      case Constants.UPDATE_PARTIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_PARTIES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.OPEN_NEW_POSITION_DIALOG: {
        return {
          ...state,
          positionDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_POSITION_DIALOG: {
        return {
          ...state,
          positionDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_POSITION_DIALOG: {
        return {
          ...state,
          positionDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_POSITION_DIALOG: {
        return {
          ...state,
          positionDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_NEW_POSITION: {
        return {
          ...state,
          loading: true,
          error: false,
          createNewPositionData: action.payload,
        };
      }
      case Constants.CREATE_NEW_POSITION_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_POSITION_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.UPDATE_POSITION: {
        return {
          ...state,
          loading: true,
          error: false,
          updatePositionData: action.payload,
        };
      }
      case Constants.UPDATE_POSITION_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_POSITION_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_POSITIONS: {
        return {
          ...state,
          loading: true,
          error: false,
          allPositions: action.payload,
        };
      }
      case Constants.GET_POSITIONS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.GET_POSITIONS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      case Constants.OPEN_ADD_EMPLOYEE_TO_POSITION_DIALOG: {
        return {
          ...state,
          addEmployeeToPositionDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_ADD_EMPLOYEE_TO_POSITION_DIALOG: {
        return {
          ...state,
          addEmployeeToPositionDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      case Constants.ADD_EMPLOYEE_TO_POSITION: {
        return {
          ...state,
          loading: true,
          error: false,
          addEmployeeToPositionData: action.payload,
        };
      }
      case Constants.ADD_EMPLOYEE_TO_POSITION_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.ADD_EMPLOYEE_TO_POSITION_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ALL_TAGS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_TAGS_SUCCESS: {
        return {
          ...state,
          loading: false,
          allTags: action.payload,
        };
      }
      case Constants.GET_ALL_TAGS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      /** *****************************************************************
       * Organization constants
       ******************************************************************* */

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
      case Constants.GET_COMPANY_INFO: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_COMPANY_INFO_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          companyInfo: action.payload,
        };
      }
      case Constants.GET_COMPANY_INFO_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.UPDATE_COMPANY_INFO: {
        return {
          ...state,
          loading: true,
          error: false,
          updateCompanyInfoData: action.payload,
        };
      }
      case Constants.UPDATE_COMPANY_INFO_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          message: action.payload,
        };
      }
      case Constants.UPDATE_COMPANY_INFO_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default companyStructurePageReducer;
