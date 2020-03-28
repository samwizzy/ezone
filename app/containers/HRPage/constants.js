/*
 * HRConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_EMPLOYEES         = 'boilerplate/HRPage/GET EMPLOYEES';
export const GET_EMPLOYEES_SUCCESS = 'boilerplate/HRPage/GET EMPLOYEES SUCCESS';
export const GET_EMPLOYEE          = 'boilerplate/HRPage/GET EMPLOYEE';
export const GET_EMPLOYEE_SUCCESS  = 'boilerplate/HRPage/GET EMPLOYEE SUCCESS';

export const OPEN_NEW_EMPLOYEE_DIALOG   = 'boilerplate/HRPage/OPEN NEW EMPLOYEE DIALOG';
export const CLOSE_NEW_EMPLOYEE_DIALOG  = 'boilerplate/HRPage/CLOSE NEW EMPLOYEE DIALOG';
export const OPEN_EDIT_EMPLOYEE_DIALOG  = 'boilerplate/HRPage/OPEN EDIT EMPLOYEE DIALOG';
export const CLOSE_EDIT_EMPLOYEE_DIALOG = 'boilerplate/HRPage/CLOSE EDIT EMPLOYEE DIALOG';

export const OPEN_NEW_DEPARTMENT_DIALOG   = 'boilerplate/HRPage/OPEN NEW DEPARTMENT DIALOG';
export const CLOSE_NEW_DEPARTMENT_DIALOG  = 'boilerplate/HRPage/CLOSE NEW DEPARTMENT DIALOG';
export const OPEN_EDIT_DEPARTMENT_DIALOG  = 'boilerplate/HRPage/OPEN EDIT DEPARTMENT DIALOG';
export const CLOSE_EDIT_DEPARTMENT_DIALOG = 'boilerplate/HRPage/CLOSE EDIT DEPARTMENT DIALOG';

export const OPEN_NEW_BRANCH_DIALOG   = 'boilerplate/HRPage/OPEN NEW BRANCH DIALOG';
export const CLOSE_NEW_BRANCH_DIALOG  = 'boilerplate/HRPage/CLOSE NEW BRANCH DIALOG';
export const OPEN_EDIT_BRANCH_DIALOG  = 'boilerplate/HRPage/OPEN EDIT BRANCH DIALOG';
export const CLOSE_EDIT_BRANCH_DIALOG = 'boilerplate/HRPage/CLOSE EDIT BRANCH DIALOG';

export const OPEN_NEW_ROLE_DIALOG   = 'boilerplate/HRPage/OPEN NEW ROLE DIALOG';
export const CLOSE_NEW_ROLE_DIALOG  = 'boilerplate/HRPage/CLOSE NEW ROLE DIALOG';
export const OPEN_EDIT_ROLE_DIALOG  = 'boilerplate/HRPage/OPEN EDIT ROLE DIALOG';
export const CLOSE_EDIT_ROLE_DIALOG = 'boilerplate/HRPage/CLOSE EDIT ROLE DIALOG';

export const OPEN_NEW_ATTENDANCE_DIALOG   = 'boilerplate/HRPage/OPEN NEW ATTENDANCE DIALOG';
export const CLOSE_NEW_ATTENDANCE_DIALOG  = 'boilerplate/HRPage/CLOSE NEW ATTENDANCE DIALOG';
export const OPEN_EDIT_ATTENDANCE_DIALOG  = 'boilerplate/HRPage/OPEN EDIT ATTENDANCE DIALOG';
export const CLOSE_EDIT_ATTENDANCE_DIALOG = 'boilerplate/HRPage/CLOSE EDIT ATTENDANCE DIALOG';

export const OPEN_NEW_PAYROLL_DIALOG   = 'boilerplate/HRPage/OPEN NEW PAYROLL DIALOG';
export const CLOSE_NEW_PAYROLL_DIALOG  = 'boilerplate/HRPage/CLOSE NEW PAYROLL DIALOG';
export const OPEN_EDIT_PAYROLL_DIALOG  = 'boilerplate/HRPage/OPEN EDIT PAYROLL DIALOG';
export const CLOSE_EDIT_PAYROLL_DIALOG = 'boilerplate/HRPage/CLOSE EDIT PAYROLL DIALOG';

export const CREATE_RECRUITMENT = 'boilerplate/HRPage/CREATE RECRUITMENT DIALOG';
export const EDIT_RECRUITMENT   = 'boilerplate/HRPage/EDIT RECRUITMENT DIALOG';
export const DELETE_RECRUITMENT = 'boilerplate/HRPage/DELETE RECRUITMENT DIALOG';


