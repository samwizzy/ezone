import * as Constants from './constants';

export function getModules() {
  return {
    type: Constants.GET_MODULES,
  };
}
export function getModulesSuccess(payload) {
  return {
    type: Constants.GET_MODULES_SUCCESS,
    payload,
  };
}
export function getModulesError(payload) {
  return {
    type: Constants.GET_MODULES_ERROR,
    payload,
  };
}

export function getModulesByAccessOffers() {
  return {
    type: Constants.GET_MODULES_BY_ACCESS_OFFERS,
  };
}
export function getModulesByAccessOffersSuccess(payload) {
  return {
    type: Constants.GET_MODULES_BY_ACCESS_OFFERS_SUCCESS,
    payload,
  };
}
export function getModulesByAccessOffersError(payload) {
  return {
    type: Constants.GET_MODULES_BY_ACCESS_OFFERS_ERROR,
    payload,
  };
}

export function registerModules(payload) {
  return {
    type: Constants.REGISTER_MODULES,
    payload
  };
}
export function registerModulesSuccess(payload) {
  return {
    type: Constants.REGISTER_MODULES_SUCCESS,
    payload,
  };
}
export function registerModulesError(payload) {
  return {
    type: Constants.REGISTER_MODULES_ERROR,
    payload,
  };
}

export function getPaystackGateways(payload) {
  return {
    type: Constants.GET_PAYMENT_GATEWAYS,
    payload
  };
}
export function getPaystackGatewaysSuccess(payload) {
  return {
    type: Constants.GET_PAYMENT_GATEWAYS_SUCCESS,
    payload,
  };
}
export function getPaystackGatewaysError(payload) {
  return {
    type: Constants.GET_PAYMENT_GATEWAYS_ERROR,
    payload,
  };
}

export function verifyPayment(payload) {
  return {
    type: Constants.VERIFY_PAYMENT,
    payload
  };
}
export function verifyPaymentSuccess(payload) {
  return {
    type: Constants.VERIFY_PAYMENT_SUCCESS,
    payload,
  };
}
export function verifyPaymentError(payload) {
  return {
    type: Constants.VERIFY_PAYMENT_ERROR,
    payload,
  };
}
