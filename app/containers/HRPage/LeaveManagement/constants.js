/*
 * HR Leave Management Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_LEAVE_REQUEST        = 'boilerplate/HRPage/GET LEAVE_REQUEST';
export const GET_LEAVE_REQUEST_SUCCESS = 'boilerplate/HRPage/GET LEAVE_REQUEST SUCCESS';
export const GET_LEAVE_REQUEST_BY_ID        = 'boilerplate/HRPage/GET LEAVE_REQUEST BY ID';
export const GET_LEAVE_REQUEST_BY_ID_SUCCESS = 'boilerplate/HRPage/GET LEAVE_REQUEST BY ID SUCCESS';
export const CREATE_LEAVE_REQUEST = 'boilerplate/HRPage/CREATE LEAVE_REQUEST';
export const CREATE_LEAVE_REQUEST_SUCCESS = 'boilerplate/HRPage/CREATE LEAVE_REQUEST SUCCESS';

export const OPEN_NEW_LEAVE_REQUEST_DIALOG   = 'boilerplate/HRPage/OPEN NEW LEAVE_REQUEST DIALOG';
export const CLOSE_NEW_LEAVE_REQUEST_DIALOG  = 'boilerplate/HRPage/CLOSE NEW LEAVE_REQUEST DIALOG';
export const OPEN_EDIT_LEAVE_REQUEST_DIALOG  = 'boilerplate/HRPage/OPEN EDIT LEAVE_REQUEST DIALOG';
export const CLOSE_EDIT_LEAVE_REQUEST_DIALOG = 'boilerplate/HRPage/CLOSE EDIT LEAVE_REQUEST DIALOG';

export const OPEN_NEW_LEAVE_TYPE_DIALOG   = 'boilerplate/HRPage/OPEN NEW LEAVE_TYPE DIALOG';
export const CLOSE_NEW_LEAVE_TYPE_DIALOG  = 'boilerplate/HRPage/CLOSE NEW LEAVE_TYPE DIALOG';
export const OPEN_EDIT_LEAVE_TYPE_DIALOG  = 'boilerplate/HRPage/OPEN EDIT LEAVE_TYPE DIALOG';
export const CLOSE_EDIT_LEAVE_TYPE_DIALOG = 'boilerplate/HRPage/CLOSE EDIT LEAVE_TYPE DIALOG';

export const OPEN_NEW_HOLIDAY_DIALOG   = 'boilerplate/HRPage/OPEN NEW HOLIDAY DIALOG';
export const CLOSE_NEW_HOLIDAY_DIALOG  = 'boilerplate/HRPage/CLOSE NEW HOLIDAY DIALOG';
export const OPEN_EDIT_HOLIDAY_DIALOG  = 'boilerplate/HRPage/OPEN EDIT HOLIDAY DIALOG';
export const CLOSE_EDIT_HOLIDAY_DIALOG = 'boilerplate/HRPage/CLOSE EDIT HOLIDAY DIALOG';
