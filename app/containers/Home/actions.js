/*
 *
 * Home Dashboard actions
 *
 */

import * as Constants from './constants';

export function closeNewFileDialog() {
  return {
    type: Constants.CLOSE_NEW_FILE_DIALOG,
  };
}
