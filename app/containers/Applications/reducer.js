import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  modules: [],
  modulesByAccessOffers: [],
  paymentGateways: [],
  regModsDetails: null,
  paymentVerified: null,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const modulesReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_MODULES: {
        return {
          ...state,
        };
      }
      case Constants.GET_MODULES_SUCCESS: {
        return {
          ...state,
          modules: action.payload,
        };
      }
      case Constants.GET_MODULES_ERROR: {
        return {
          ...state,
          error: action.payload,
        };
      }
      case Constants.GET_MODULES_BY_ACCESS_OFFERS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_MODULES_BY_ACCESS_OFFERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          modulesByAccessOffers: action.payload,
        };
      }
      case Constants.GET_MODULES_BY_ACCESS_OFFERS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.REGISTER_MODULES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.REGISTER_MODULES_SUCCESS: {
        return {
          ...state,
          loading: false,
          regModsDetails: action.payload,
        };
      }
      case Constants.REGISTER_MODULES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_PAYMENT_GATEWAYS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_PAYMENT_GATEWAYS_SUCCESS: {
        return {
          ...state,
          loading: false,
          paymentGateways: action.payload,
        };
      }
      case Constants.GET_PAYMENT_GATEWAYS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.VERIFY_PAYMENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.VERIFY_PAYMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          paymentVerified: action.payload,
        };
      }
      case Constants.VERIFY_PAYMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default modulesReducer;
