/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_EMPLOYEES = 'boilerplate/HRPage/GET EMPLOYEES';
export const GET_EMPLOYEES_SUCCESS = 'boilerplate/HRPage/GET EMPLOYEES SUCCESS';
export const GET_EMPLOYEE = 'boilerplate/HRPage/GET EMPLOYEE';
export const GET_EMPLOYEE_SUCCESS = 'boilerplate/HRPage/GET EMPLOYEE SUCCESS';

export const OPEN_EDIT_EMPLOYEE_DIALOG = 'boilerplate/HRPage/OPEN EDIT EMPLOYEE DIALOG';
export const CLOSE_EDIT_EMPLOYEE_DIALOG = 'boilerplate/HRPage/CLOSE EDIT EMPLOYEE DIALOG';
