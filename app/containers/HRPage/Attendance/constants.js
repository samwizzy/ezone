/*
 * HR Attendance Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_ATTENDANCES        = 'boilerplate/HRPage/GET ATTENDANCES';
export const GET_ATTENDANCES_SUCCESS = 'boilerplate/HRPage/GET ATTENDANCES SUCCESS';

export const GET_EMPLOYEES         = 'boilerplate/HRPage/GET EMPLOYEES';
export const GET_EMPLOYEES_SUCCESS = 'boilerplate/HRPage/GET EMPLOYEES SUCCESS';

export const GET_DAYS        = 'boilerplate/HRPage/GET DAYS';
export const GET_DAYS_SUCCESS = 'boilerplate/HRPage/GET DAYS SUCCESS';

export const GET_ATTENDANCE        = 'boilerplate/HRPage/GET ATTENDANCE';
export const GET_ATTENDANCE_SUCCESS = 'boilerplate/HRPage/GET ATTENDANCE SUCCESS';
export const CREATE_ATTENDANCE = 'boilerplate/HRPage/CREATE ATTENDANCE';
export const CREATE_ATTENDANCE_SUCCESS = 'boilerplate/HRPage/CREATE ATTENDANCE SUCCESS';

export const OPEN_NEW_ATTENDANCE_DIALOG   = 'boilerplate/HRPage/OPEN NEW ATTENDANCE DIALOG';
export const CLOSE_NEW_ATTENDANCE_DIALOG  = 'boilerplate/HRPage/CLOSE NEW ATTENDANCE DIALOG';
export const OPEN_EDIT_ATTENDANCE_DIALOG  = 'boilerplate/HRPage/OPEN EDIT ATTENDANCE DIALOG';
export const CLOSE_EDIT_ATTENDANCE_DIALOG = 'boilerplate/HRPage/CLOSE EDIT ATTENDANCE DIALOG';

export const OPEN_NEW_SHIFT_DIALOG   = 'boilerplate/HRPage/OPEN NEW SHIFT DIALOG';
export const CLOSE_NEW_SHIFT_DIALOG  = 'boilerplate/HRPage/CLOSE NEW SHIFT DIALOG';

export const OPEN_NEW_EMPLOYEE_SHIFT_DIALOG   = 'boilerplate/HRPage/OPEN NEW EMPLOYEE SHIFT DIALOG';
export const CLOSE_NEW_EMPLOYEE_SHIFT_DIALOG  = 'boilerplate/HRPage/CLOSE NEW EMPLOYEE SHIFT DIALOG';

export const OPEN_EDIT_SHIFT_DIALOG  = 'boilerplate/HRPage/OPEN EDIT SHIFT DIALOG';
export const CLOSE_EDIT_SHIFT_DIALOG = 'boilerplate/HRPage/CLOSE EDIT SHIFT DIALOG';
export const CREATE_SHIFT        = 'boilerplate/HRPage/CREATE SHIFT';
export const CREATE_SHIFT_SUCCESS = 'boilerplate/HRPage/CREATE SHIFT SUCCESS';

export const GET_SHIFTS        = 'boilerplate/HRPage/GET SHIFTS';
export const GET_SHIFTS_SUCCESS = 'boilerplate/HRPage/GET SHIFTS SUCCESS';
