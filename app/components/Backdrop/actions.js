/*
 *
 * Backdrop actions
 *
 */

import * as Constants from './constants';

export function openBackdrop() {
  return {
    type: Constants.OPEN_BACKDROP,
  };
}

export function closeBackdrop() {
  return {
    type: Constants.CLOSE_BACKDROP,
  };
}
