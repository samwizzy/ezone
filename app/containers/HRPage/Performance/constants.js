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
export const GET_EMPLOYEES = 'boilerplate/HRPage/GET EMPLOYEES';
export const GET_EMPLOYEES_SUCCESS = 'boilerplate/HRPage/GET EMPLOYEES SUCCESS';
export const GET_DEPARTMENTS = 'boilerplate/HRPage/GET DEPARTMENTS';
export const GET_DEPARTMENTS_SUCCESS = 'boilerplate/HRPage/GET DEPARTMENTS SUCCESS';
export const GET_BRANCHES = 'boilerplate/HRPage/GET BRANCHES';
export const GET_BRANCHES_SUCCESS = 'boilerplate/HRPage/GET BRANCHES SUCCESS';
export const GET_ROLES = 'boilerplate/HRPage/GET ROLES';
export const GET_ROLES_SUCCESS = 'boilerplate/HRPage/GET ROLES SUCCESS';

export const GET_GOALS = 'boilerplate/HRPage/GET GOALS';
export const GET_GOALS_SUCCESS = 'boilerplate/HRPage/GET GOALS SUCCESS';
export const GET_GOALS_BY_ID = 'boilerplate/HRPage/GET GOALS BY ID';
export const GET_GOALS_BY_ID_SUCCESS = 'boilerplate/HRPage/GET GOALS BY ID SUCCESS';
export const CREATE_GOALS = 'boilerplate/HRPage/CREATE GOALS';
export const CREATE_GOALS_SUCCESS = 'boilerplate/HRPage/CREATE GOALS SUCCESS';
export const COMMENT_GOALS = 'boilerplate/HRPage/COMMENT GOALS';
export const COMMENT_GOALS_SUCCESS = 'boilerplate/HRPage/COMMENT GOALS SUCCESS';
export const COMMENT_GOALS_ERROR = 'boilerplate/HRPage/COMMENT GOALS ERROR';

export const GET_RECOGNITIONS = 'boilerplate/HRPage/GET RECOGNITIONS';
export const GET_RECOGNITIONS_SUCCESS = 'boilerplate/HRPage/GET RECOGNITIONS SUCCESS';
export const GET_RECOGNITION_BY_ID = 'boilerplate/HRPage/GET RECOGNITION BY ID';
export const GET_RECOGNITION_BY_ID_SUCCESS = 'boilerplate/HRPage/GET RECOGNITION BY ID SUCCESS';
export const CREATE_RECOGNITION = 'boilerplate/HRPage/CREATE RECOGNITION';
export const CREATE_RECOGNITION_SUCCESS = 'boilerplate/HRPage/CREATE RECOGNITION SUCCESS';
export const COMMENT_RECOGNITION = 'boilerplate/HRPage/COMMENT RECOGNITION';
export const COMMENT_RECOGNITION_SUCCESS = 'boilerplate/HRPage/COMMENT RECOGNITION SUCCESS';
export const COMMENT_RECOGNITION_ERROR = 'boilerplate/HRPage/COMMENT RECOGNITION ERROR';

export const GET_REVIEWS = 'boilerplate/HRPage/GET REVIEWS';
export const GET_REVIEWS_SUCCESS = 'boilerplate/HRPage/GET REVIEWS SUCCESS';
export const GET_REVIEWS_ERROR = 'boilerplate/HRPage/GET REVIEWS ERROR';
export const GET_REVIEW_BY_ID = 'boilerplate/HRPage/GET REVIEW BY ID';
export const GET_REVIEW_BY_ID_SUCCESS = 'boilerplate/HRPage/GET REVIEWS BY ID SUCCESS';
export const GET_REVIEW_BY_ID_ERROR = 'boilerplate/HRPage/GET REVIEWS BY ID ERROR';
export const CREATE_REVIEW = 'boilerplate/HRPage/CREATE REVIEW';
export const CREATE_REVIEW_SUCCESS = 'boilerplate/HRPage/CREATE REVIEW SUCCESS';
export const CREATE_REVIEW_ERROR = 'boilerplate/HRPage/CREATE REVIEW ERROR';

export const OPEN_NEW_GOALS_DIALOG = 'boilerplate/HRPage/OPEN NEW GOALS DIALOG';
export const CLOSE_NEW_GOALS_DIALOG = 'boilerplate/HRPage/CLOSE NEW GOALS DIALOG';
export const OPEN_EDIT_GOALS_DIALOG = 'boilerplate/HRPage/OPEN EDIT GOALS DIALOG';
export const CLOSE_EDIT_GOALS_DIALOG = 'boilerplate/HRPage/CLOSE EDIT GOALS DIALOG';

export const OPEN_NEW_RECOGNITION_DIALOG = 'boilerplate/HRPage/OPEN NEW RECOGNITION DIALOG';
export const CLOSE_NEW_RECOGNITION_DIALOG = 'boilerplate/HRPage/CLOSE NEW RECOGNITION DIALOG';
export const OPEN_EDIT_RECOGNITION_DIALOG = 'boilerplate/HRPage/OPEN EDIT RECOGNITION DIALOG';
export const CLOSE_EDIT_RECOGNITION_DIALOG = 'boilerplate/HRPage/CLOSE EDIT RECOGNITION DIALOG';

export const OPEN_NEW_FEEDBACK_DIALOG = 'boilerplate/HRPage/OPEN NEW FEEDBACK DIALOG';
export const CLOSE_NEW_FEEDBACK_DIALOG = 'boilerplate/HRPage/CLOSE NEW FEEDBACK DIALOG';
export const OPEN_EDIT_FEEDBACK_DIALOG = 'boilerplate/HRPage/OPEN EDIT FEEDBACK DIALOG';
export const CLOSE_EDIT_FEEDBACK_DIALOG = 'boilerplate/HRPage/CLOSE EDIT FEEDBACK DIALOG';

export const OPEN_NEW_REVIEW_DIALOG = 'boilerplate/HRPage/OPEN NEW REVIEW DIALOG';
export const CLOSE_NEW_REVIEW_DIALOG = 'boilerplate/HRPage/CLOSE NEW REVIEW DIALOG';
export const OPEN_EDIT_REVIEW_DIALOG = 'boilerplate/HRPage/OPEN EDIT REVIEW DIALOG';
export const CLOSE_EDIT_REVIEW_DIALOG = 'boilerplate/HRPage/CLOSE EDIT REVIEW DIALOG';
