/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';


/**
 * Github repos request/response handler
 */
export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesApi}`;

  console.log(user, "currentUser")

  try {
    const employeesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEmployeesSuccess(employeesResponse));
  } catch (err) {
    // yield put(Actions.getEmployeesError(err));
  }
}
export function* getEmployeeByUUID({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUserByUUIDApi}/${payload}`;

  try {
    const userResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(userResponse, 'userResponse');

    yield put(Actions.getEmployeeSuccess(userResponse));
  } catch (err) {
    // yield put(Actions.getEmployeeError(err.message));
  }
}

export function* createEmployee({ type, payload }) {
  console.log(payload);
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEmployee}`;
  payload.orgId = user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    alert("Employee created");
    yield put({type: Constants.GET_EMPLOYEES});
    yield put({type: Constants.CLOSE_NEW_EMPLOYEE_DIALOG});
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    alert("A server error occured");
    console.log(err, "err message")
  }
}

export function* createRole({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateRole}`;
  payload.orgId = user.organisation.orgId;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    alert("Role created");
    yield put({type: Constants.GET_ROLES});
    yield put({type: Constants.CLOSE_NEW_ROLE_DIALOG});
  } catch (err) {
     alert("A server error occured");
    console.log(err, "err message")
  }
}

export function* getDepartments({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.DepartmentsApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'DEPARTMENT RESPONSE');
    yield put(Actions.getDepartmentsSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* getDepartmentsByOrgIdApi() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  console.log(accessToken);
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepartmentsByOrgIdApi}?orgId=${user.organisation.id}&tagId=5`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'DEPARTMENT RESPONSE');
    yield put(Actions.getDepartmentsByOrgIdApiSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "dept error message")
  }
}

export function* getDepartment(id) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepartment}?orgId=${user.organisation.id}&tagId=5`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'DEPARTMENT RESPONSE');
    yield put(Actions.getDepartmentsByOrgIdApiSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "dept error message")
  }
}

export function* getBranches() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetBranches}?orgId=${user.organisation.id}&tagId=1`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'Branch RESPONSE');
    yield put(Actions.getBranchesSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "Branch error message")
  }
}

export function* getPartyTags() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetPartyTags}`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'PartyTags RESPONSE');
    yield put(Actions.getPartyTagsSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "PartyTags error message")
  }
}

export function* getEmployeeTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  console.log(accessToken);
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user.organisation.orgId}&type=EMPLOYEETYPE`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'EmployeeTypes RESPONSE');
    yield put(Actions.getEmployeeTypesSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}
export function* getEnrollmentTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  console.log(accessToken);
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEnrollmentTypes}?orgId=${user.organisation.orgId}&type=ENROLLMENTTYPE`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'EnrollmentTypes RESPONSE');
    yield put(Actions.getEnrollmentTypesSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}
export function* getLocations() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  console.log(accessToken);
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetLocations}?orgId=${user.organisation.orgId}&type=LOCATION`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'Locations RESPONSE');
    yield put(Actions.getLocationsSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* getJobOpenings() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJobOpenings}/${user.organisation.orgId}`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'Job openings RESPONSE');
    yield put(Actions.getJobOpeningsSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}
export function* getRoles() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  console.log('ROLES-SAGA');
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRoles}?orgId=${user.organisation.orgId}&type=ROLE`;
  
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'ROLES RESPONSE');
    yield put(Actions.getRolesSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* createDepartment({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateDepartment}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'DEPARTMENT RESPONSE');
    alert("Department created");
    yield put({type: Constants.CLOSE_NEW_DEPARTMENT_DIALOG});
    yield put({type: Constants.GET_DEPARTMENTS_BY_ORGID_API});
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* createBranch({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateBranch}`;
  

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'Branch RESPONSE');
    alert("Branch created");
    yield put({type: Constants.CLOSE_NEW_BRANCH_DIALOG});
    yield put({type: Constants.GET_BRANCHES});
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* createJobOpening({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateJobOpening}`;
  
  
  var str_array = payload.steps.split(',');
  var arr = [];
  var obj = new Object;
    for(var i = 0; i < str_array.length; i++) {
      console.log(i, "i");
      obj['title'] = str_array[i];
      arr.push(obj);
    }
    delete payload.steps;
    payload.hiringSteps = arr;
    console.log(payload, "Entire job payload");
    //setForm({...form, ['hiringSteps']: obj });

    
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'JOB OPENING RESPONSE');
    alert("Job opening created");
    //yield put({type: Constants.CLOSE_NEW_BRANCH_DIALOG});
    yield put({type: Constants.GET_JOBOPENINGS});
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
  
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* HRRootSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_EMPLOYEE, getEmployeeByUUID);
  yield takeLatest(Constants.GET_DEPARTMENTS, getDepartments);
  yield takeLatest(Constants.CREATE_DEPARTMENT, createDepartment);
  yield takeLatest(Constants.GET_DEPARTMENTS_BY_ORGID_API, getDepartmentsByOrgIdApi);
  yield takeLatest(Constants.GET_EMPLOYEETYPES, getEmployeeTypes);
  yield takeLatest(Constants.GET_ENROLLMENTTYPES, getEnrollmentTypes);
  yield takeLatest(Constants.GET_LOCATIONS, getLocations);
  yield takeLatest(Constants.GET_JOBOPENINGS, getJobOpenings);
  yield takeLatest(Constants.GET_ROLES, getRoles);
  yield takeLatest(Constants.CREATE_EMPLOYEE, createEmployee);
  yield takeLatest(Constants.GET_BRANCHES, getBranches);
  yield takeLatest(Constants.CREATE_BRANCH, createBranch);
  yield takeLatest(Constants.CREATE_ROLE, createRole);
  yield takeLatest(Constants.GET_PARTY_TAGS, getPartyTags);
  yield takeLatest(Constants.CREATE_JOBOPENING, createJobOpening);
}
