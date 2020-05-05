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
export const CREATE_EMPLOYEE = 'boilerplate/HRPage/CREATE EMPLOYEE';
export const CREATE_EMPLOYEE_SUCCESS = 'boilerplate/HRPage/CREATE EMPLOYEE SUCCESS';

export const GET_EMPLOYEETYPES         = 'boilerplate/HRPage/GET EMPLOYEETYPES';
export const GET_EMPLOYEETYPES_SUCCESS = 'boilerplate/HRPage/GET EMPLOYEETYPES SUCCESS';

export const GET_ENROLLMENTTYPES         = 'boilerplate/HRPage/GET ENROLLMENTTYPES';
export const GET_ENROLLMENTTYPES_SUCCESS = 'boilerplate/HRPage/GET ENROLLMENTTYPES SUCCESS';

export const GET_LOCATIONS         = 'boilerplate/HRPage/GET LOCATIONS';
export const GET_LOCATIONS_SUCCESS = 'boilerplate/HRPage/GET LOCATIONS SUCCESS';

export const GET_JOBOPENINGS         = 'boilerplate/HRPage/GET JOBOPENINGS';
export const GET_JOBOPENINGS_SUCCESS = 'boilerplate/HRPage/GET JOBOPENINGS SUCCESS';

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

export const GET_RECRUITMENTS = 'boilerplate/HRPage/GET RECRUITMENTS';
export const GET_RECRUITMENTS_SUCCESS = 'boilerplate/HRPage/GET RECRUITMENTS_SUCCESS';
export const GET_RECRUITMENT = 'boilerplate/HRPage/GET RECRUITMENT';
export const CREATE_RECRUITMENT = 'boilerplate/HRPage/CREATE RECRUITMENT';
export const EDIT_RECRUITMENT   = 'boilerplate/HRPage/EDIT RECRUITMENT';
export const DELETE_RECRUITMENT = 'boilerplate/HRPage/DELETE RECRUITMENT';

export const GET_DEPARTMENTS = 'boilerplate/HRPage/GET DEPARTMENTS';
export const GET_DEPARTMENTS_SUCCESS = 'boilerplate/HRPage/GET DEPARTMENTS SUCCESS';

export const GET_DEPARTMENTS_BY_ORGID_API = 'boilerplate/HRPage/GET DEPARTMENTS BY ORGID API';
export const GET_DEPARTMENTS_BY_ORGID_API_SUCCESS = 'boilerplate/HRPage/GET DEPARTMENTS BY ORGID API SUCCESS';

export const GET_DEPARTMENT = 'boilerplate/HRPage/GET DEPARTMENT';
export const GET_DEPARTMENT_SUCCESS = 'boilerplate/HRPage/GET DEPARTMENT SUCCESS';
export const CREATE_DEPARTMENT = 'boilerplate/HRPage/CREATE DEPARTMENT';
export const CREATE_DEPARTMENT_SUCCESS = 'boilerplate/HRPage/CREATE DEPARTMENT SUCCESS';
export const EDIT_DEPARTMENT = 'boilerplate/HRPage/EDIT DEPARTMENT';
export const EDIT_DEPARTMENT_SUCCESS = 'boilerplate/HRPage/EDIT DEPARTMENT SUCCESS';

export const GET_ROLES = 'boilerplate/HRPage/GET ROLES';
export const GET_ROLES_SUCCESS = 'boilerplate/HRPage/GET ROLES SUCCESS';
export const GET_ROLE = 'boilerplate/HRPage/GET ROLE';
export const CREATE_ROLE = 'boilerplate/HRPage/CREATE ROLE';
export const CREATE_ROLE_SUCCESS = 'boilerplate/HRPage/CREATE ROLE SUCCESS';
export const EDIT_ROLE = 'boilerplate/HRPage/EDIT ROLE';
export const EDIT_ROLE_SUCCESS = 'boilerplate/HRPage/EDIT ROLE SUCCESS';


export const CREATE_JOBOPENING = 'boilerplate/HRPage/CREATE JOBOPENING';
export const CREATE_JOBOPENING_SUCCESS = 'boilerplate/HRPage/CREATE OPENING SUCCESS';

export const GET_PARTY_TAGS = 'boilerplate/HRPage/GET PARTY TAGS';
export const GET_PARTY_TAGS_SUCCESS = 'boilerplate/HRPage/GET PARTY TAGS SUCCESS';

export const GET_BRANCHES = 'boilerplate/HRPage/GET BRANCHES';
export const GET_BRANCHES_SUCCESS = 'boilerplate/HRPage/GET BRANCHES SUCCESS';
export const GET_BRANCH = 'boilerplate/HRPage/GET BRANCH';
export const CREATE_BRANCH = 'boilerplate/HRPage/CREATE BRANCH';
export const CREATE_BRANCH_SUCCESS = 'boilerplate/HRPage/CREATE BRANCH SUCCESS';
export const EDIT_BRANCH = 'boilerplate/HRPage/EDIT BRANCH';
export const EDIT_BRANCH_SUCCESS = 'boilerplate/HRPage/EDIT BRANCH SUCCESS';

export const GET_ANNOUNCEMENTS = 'boilerplate/HRPage/GET ANNOUNCEMENTS';
export const GET_ANNOUNCEMENTS_SUCCESS = 'boilerplate/HRPage/GET ANNOUNCEMENTS SUCCESS';
export const GET_ANNOUNCEMENT = 'boilerplate/HRPage/GET ANNOUNCEMENT';
export const CREATE_ANNOUNCEMENT = 'boilerplate/HRPage/CREATE ANNOUNCEMENT';
export const CREATE_ANNOUNCEMENT_SUCCESS = 'boilerplate/HRPage/CREATE ANNOUNCEMENT SUCCESS';
export const EDIT_ANNOUNCEMENT = 'boilerplate/HRPage/EDIT ANNOUNCEMENT';
export const EDIT_ANNOUNCEMENT_SUCCESS = 'boilerplate/HRPage/EDIT ANNOUNCEMENT SUCCESS';

export const GET_PAYROLLS = 'boilerplate/HRPage/GET PAYROLLS';
export const GET_PAYROLLS_SUCCESS = 'boilerplate/HRPage/GET PAYROLLS SUCCESS';
export const GET_PAYROLL = 'boilerplate/HRPage/GET PAYROLL';
export const CREATE_PAYROLL = 'boilerplate/HRPage/CREATE PAYROLL';
export const CREATE_PAYROLL_SUCCESS = 'boilerplate/HRPage/CREATE PAYROLL SUCCESS';
export const EDIT_PAYROLL = 'boilerplate/HRPage/EDIT PAYROLL';
export const EDIT_PAYROLL_SUCCESS = 'boilerplate/HRPage/EDIT PAYROLL SUCCESS';



