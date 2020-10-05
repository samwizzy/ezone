import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from '../../utils/request';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

function errorHandler(promise) {
  return promise
}

export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesByOrgIdApi}?orgId=${user && user.organisation.orgId}`; // ?start=0&limit=10

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, "emplyees response");

    yield put(Actions.getEmployeesSuccess(response));
  } catch (err) {
    if (err.message) {
      // yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      if (error.status === 500 || error.status === 400) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
      }
    }
    // yield put(Actions.getEmployeesError(err));
  }
}

export function* getBranchEmployees(id) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetBranchEmployeesApi}/${id}/${user && user.organisation.id}`;
  console.log(accessToken, "accessToken get employees")

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, "emplyees response");

    yield put(Actions.getEmployeesSuccess(response));
  } catch (err) {
    if (err.message) {
      // yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      if (error.status === 500 || error.status === 400) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
      }
    }
  }
}

export function* getDeptEmployees(id) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDeptEmployeesApi}/${id}/${user && user.organisation.id}`;
  console.log(accessToken, "accessToken get dept employees")

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, "get dept employees response");

    yield put(Actions.getEmployeesSuccess(response));
  } catch (err) {
    if (err.message) {
      // yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      if (error.status === 500 || error.status === 400) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
      }
    }
  }
}

export function* getEmployeeByUUID({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUserByUUIDApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'userResponse');

    yield put(Actions.getEmployeeSuccess(response));
  } catch (err) {
    console.log(err, "err ger employee uuid")
    // yield put(Actions.getEmployeeError(err.message));
  }
}

export function* createEmployee({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEmployee}`;
  payload.orgId = user && user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response create employee")

    yield put(AppActions.openSnackBar({ message: "Employee created", status: 'success' }));
    yield put({ type: Constants.GET_EMPLOYEES });
    yield put({ type: Constants.CLOSE_NEW_EMPLOYEE_DIALOG });
  } catch (err) {
    if (err.message) {
      // yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
      yield put(Actions.createEmployeeError(err.message));
    } else {
      const error = yield call(errorHandler, err.response.json())
      console.log(error, "create employees error")
      if (error.status === 400 || error.status === 500) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'warning' }));
        yield put(Actions.createEmployeeError(error.message));
      }
    }
  }
}

export function* updateEmployee({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateUserProfileApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response update employee")
    yield put(Actions.updateEmployeeSuccess(response));
    yield put(Actions.closeEditEmployeeDialog());
    yield put(Actions.getEmployee(payload.uuId));

    if (response.success === true) {
      yield put(AppActions.openSnackBar({ message: response.message, status: 'success' }));
    } else {
      yield put(AppActions.openSnackBar({ message: response.message, status: 'warning' }));
    }
  } catch (err) {
    if (err.message) {
      // yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      if (error.status === 500 || error.status === 400) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
        yield put(Actions.updateEmployeeError(error.message));
      }
    }
  }
}

export function* createRole({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateRole}`;
  payload.orgId = user && user.organisation.orgId;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });


    yield put(AppActions.openSnackBar({ message: "Role created", status: 'success' }));
    yield put({ type: Constants.GET_ROLES });
    yield put({ type: Constants.CLOSE_NEW_ROLE_DIALOG });
  } catch (err) {
    console.log(err, "err message")
  }
}

export function* getDepartments() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepartmentsByOrgIdApi}?orgId=${user && user.organisation.id}&tagId=5`;

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
    console.log(err.message, "err message")
  }
}

export function* getDepartmentsByOrgIdApi() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepartmentsByOrgIdApi}?orgId=${user && user.organisation.id}&tagId=5`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'DEPARTMENT RESPONSE BY ORGID');
    yield put(Actions.getDepartmentsByOrgIdApiSuccess(response));
  } catch (err) {
    if (err.message) {
      // yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      if (error.status === 500 || error.status === 400) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
      }
    }
  }
}
export function* getPartyGroups() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetPartyGroups}?orgId=${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'PARTYGROUPS RESPONSE');
    yield put(Actions.getPartyGroupsSuccess(response));
  } catch (err) {
    console.log(err.message, "Party groups error message")
  }
}

export function* getBranches() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetBranches}?orgId=${user && user.organisation.id}&tagId=1`;

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
    console.log(err.message, "PartyTags error message")
  }
}

export function* createEmployeeType({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEmployeeType}`;

  console.log(payload, "payload for creating employee types")
  payload.orgId = user && user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createEmployeeTypeSuccess(response));
    yield put(Actions.closeNewEmployeeTypeDialog())
    yield put({ type: Constants.GET_EMPLOYEETYPES })
  } catch (err) {
    // yield put(Actions.createEmployeeTypeError(err));
    console.log(err, "err message")
  }
}

export function* createEnrollmentType({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEmployeeType}`;

  console.log(payload, "payload for creating employee types")
  payload.orgId = user && user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createEnrollmentTypeSuccess(response));
    yield put(Actions.closeNewEmployeeTypeDialog())
    yield put({ type: Constants.GET_ENROLLMENTTYPES })
  } catch (err) {
    // yield put(Actions.createEmployeeTypeError(err));
    console.log(err, "err message")
  }
}

export function* createLocation({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEmployeeType}`;

  console.log(payload, "payload for creating employee types")
  payload.orgId = user && user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createLocationSuccess(response));
    yield put(Actions.closeNewEmployeeTypeDialog())
    yield put({ type: Constants.GET_LOCATIONS })
  } catch (err) {
    // yield put(Actions.createEmployeeTypeError(err));
    console.log(err, "err message")
  }
}

export function* createSourceOfHire({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEmployeeType}`;
  payload.orgId = user && user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createSourceOfHireSuccess(response));
    yield put(Actions.closeNewEmployeeTypeDialog())
    yield put({ type: Constants.GET_SOURCE_OF_HIRE })
  } catch (err) {
    // yield put(Actions.createEmployeeTypeError(err));
    console.log(err.message, "err message")
  }
}

export function* createPayRate({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEmployeeType}`;
  payload.orgId = user && user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createPayRateSuccess(response));
    yield put(Actions.closeNewEmployeeTypeDialog())
    yield put({ type: Constants.GET_PAY_RATES })
  } catch (err) {
    // yield put(Actions.createEmployeeTypeError(err));
    console.log(err.message, "err message")
  }
}

export function* createPayType({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEmployeeType}`;
  payload.orgId = user && user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createPayTypeSuccess(response));
    yield put(Actions.closeNewEmployeeTypeDialog())
    yield put({ type: Constants.GET_PAY_TYPES })
  } catch (err) {
    // yield put(Actions.createEmployeeTypeError(err));
    console.log(err.message, "err message")
  }
}

export function* getEmployeeTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user && user.organisation.orgId}&type=EMPLOYEETYPE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEmployeeTypesSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* getSourcesOfHire() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user && user.organisation.orgId}&type=SOURCEOFHIRE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getSourceOfHireSuccess(response));
  } catch (err) {
    // yield put(Actions.getSourceOfHireError(err));
    console.log(err.message, "err message")
  }
}

export function* getPayRates() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user && user.organisation.orgId}&type=PAYRATE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPayRatesSuccess(response));
  } catch (err) {
    // yield put(Actions.getPayRatesError(err));
    console.log(err.message, "err message")
  }
}

export function* getPayTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user && user.organisation.orgId}&type=PAYTYPE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPayTypesSuccess(response));
  } catch (err) {
    // yield put(Actions.getPayTypesError(err));
    console.log(err.message, "err message")
  }
}

export function* createWorkExperience({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateWorkExperienceApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "create work experience")
    yield put(Actions.createWorkExperienceSuccess(response));
    yield put(Actions.getEmployees());
    yield put(Actions.getEmployee(user.uuId));
    yield put({ type: Constants.CLOSE_WORK_EXPERIENCE_DIALOG });
  } catch (err) {
    // yield put(Actions.getPayTypesError(err));
    console.log(err.message, "err message")
  }
}

export function* createEducationBackground({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateEducationApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "create education background")
    yield put(Actions.createEducationBackgroundSuccess(response));
    yield put(Actions.getEmployees());
    yield put(Actions.getEmployee(user.uuId));
    yield put({ type: Constants.CLOSE_EDUCATION_BACKGROUND_DIALOG });
  } catch (err) {
    // yield put(Actions.getPayTypesError(err));
    console.log(err.message, "err message")
  }
}

export function* getWorkExperiences() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user && user.organisation.orgId}&type=PAYTYPE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getWorkExperiencesSuccess(response));
  } catch (err) {
    // yield put(Actions.getPayTypesError(err));
    console.log(err.message, "err message")
  }
}

export function* getEnrollmentTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEnrollmentTypes}?orgId=${user && user.organisation.orgId}&type=ENROLLMENTTYPE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEnrollmentTypesSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}
export function* getLocations() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetLocations}?orgId=${user && user.organisation.orgId}&type=LOCATION`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getLocationsSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* getJobApplications({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJobApplications}/${user && user.organisation.orgId}`;

  console.log(payload, "payload create application")

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "get create application")

    yield put(Actions.getApplicantsSuccess(response));
  } catch (err) {
    if (err.message) {
      console.log(err.message, "err message")
    } else {
      const error = yield call(errorHandler, err.response.json())
      console.log(error, "create job application error")
    }
  }
}

export function* createJobApplication({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateJobApplication}`;
  payload.orgId = user && user.organisation.orgId

  console.log(payload, "payload create application")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response create application")

    yield put(Actions.createApplicantSuccess(response));
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(err.message, "err message")
    if (err.message) {

    } else {
      console.log(error, "create job application error")
    }
  }
}

export function* getJobOpenings() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJobOpenings}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getJobOpeningsSuccess(response));
  } catch (err) {
    console.log(err.message, "err message")
  }
}

export function* getJobOpeningDetails({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJobOpeningDetails}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getJobOpeningDetailsSuccess(response));
  } catch (err) {
    console.log(err.message, "err message job opening details")
  }
}
export function* getRoles() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRoles}?orgId=${user && user.organisation.orgId}&type=ROLE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getRolesSuccess(response));
  } catch (err) {
    console.log(err.message, "err message")
  }
}

export function* getAnnouncements() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAnnouncements}/${user && user.organisation.orgId}?start=1&limit=5`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "get announcements response")

    yield put(Actions.getAnnouncementsSuccess(response));
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(err.message, "Announcements err message")
    console.log(error, "Announcements error message")
  }
}

export function* getAttendances() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAttendances}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, "Attendances response")
    yield put(Actions.getAttendancesSuccess(response));
  } catch (err) {
    console.log(err, "attd error")
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
    console.log(response, "response createDepartment")

    yield put(Actions.createDepartmentSuccess(response))
    yield put(AppActions.openSnackBar({ message: "Department created", status: 'success' }));
    yield put({ type: Constants.CLOSE_NEW_DEPARTMENT_DIALOG });
    yield put({ type: Constants.GET_DEPARTMENTS_BY_ORGID_API });
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message createDepartment")
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

    yield put(AppActions.openSnackBar({ message: `${response.name} Branch created`, status: 'success' }));
    yield put(Actions.createBranchSuccess(response));
    yield put({ type: Constants.CLOSE_NEW_BRANCH_DIALOG });
    yield put({ type: Constants.GET_BRANCHES });
  } catch (err) {
    console.log(err.message, "err message")
  }
}

export function* createAnnouncement({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAnnouncement}`;
  payload.orgId = user && user.organisation.orgId

  console.log(payload, "create announcement")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "Announcement creation response")

    yield put(AppActions.openSnackBar({ message: "Announcement created", status: 'success' }));
    yield put({ type: Constants.CLOSE_NEW_ANNOUNCEMENT_DIALOG });
    yield put({ type: Constants.GET_ANNOUNCEMENTS });
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(err.message, "err message")
    console.log(error, "error create announcement")
  }
}

export function* commentAnnouncement({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AnnouncementComment}`;

  console.log(payload, "comment announcement")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "Announcement commented response")

    yield put(AppActions.openSnackBar({ message: "Announcement commented successfully", status: 'success' }));
    yield put({ type: Constants.CLOSE_NEW_ANNOUNCEMENT_DIALOG });
    yield put({ type: Constants.GET_ANNOUNCEMENTS });
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(err.message, "err message")
    console.log(error, "error comment announcement")
  }
}

export function* createJobOpening({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateJobOpening}`;

  payload.orgId = user && user.organisation.orgId

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
    yield put(push('/hr/recruitment'));

    yield put(AppActions.openSnackBar({ message: "Job opening created", status: 'success' }));
    yield put({ type: Constants.GET_JOBOPENINGS });
  } catch (err) {
    console.log(err.response.json(), "create job opening error")
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
  yield takeLatest(Constants.GET_PARTYGROUPS, getPartyGroups);
  yield takeLatest(Constants.GET_EMPLOYEETYPES, getEmployeeTypes);
  yield takeLatest(Constants.GET_SOURCE_OF_HIRE, getSourcesOfHire);
  yield takeLatest(Constants.GET_PAY_RATES, getPayRates);
  yield takeLatest(Constants.GET_PAY_TYPES, getPayTypes);
  yield takeLatest(Constants.GET_WORK_EXPERIENCES, getWorkExperiences);
  yield takeLatest(Constants.CREATE_EMPLOYEE_TYPE, createEmployeeType);
  yield takeLatest(Constants.CREATE_ENROLLMENT_TYPE, createEnrollmentType);
  yield takeLatest(Constants.CREATE_SOURCE_OF_HIRE, createSourceOfHire);
  yield takeLatest(Constants.CREATE_PAY_RATE, createPayRate);
  yield takeLatest(Constants.CREATE_PAY_TYPE, createPayType);
  yield takeLatest(Constants.CREATE_WORK_EXPERIENCE, createWorkExperience);
  yield takeLatest(Constants.CREATE_EDUCATION_BACKGROUND, createEducationBackground);
  yield takeLatest(Constants.GET_ENROLLMENTTYPES, getEnrollmentTypes);
  yield takeLatest(Constants.GET_LOCATIONS, getLocations);
  yield takeLatest(Constants.CREATE_LOCATION, createLocation);
  yield takeLatest(Constants.CREATE_APPLICANT, createJobApplication);
  yield takeLatest(Constants.GET_JOBOPENINGS, getJobOpenings);
  yield takeLatest(Constants.GET_APPLICANTS, getJobApplications);
  yield takeLatest(Constants.GET_JOBOPENINGDETAILS, getJobOpeningDetails);
  yield takeLatest(Constants.GET_ATTENDANCES, getAttendances);
  yield takeLatest(Constants.GET_ROLES, getRoles);
  yield takeLatest(Constants.GET_ANNOUNCEMENTS, getAnnouncements);
  yield takeLatest(Constants.CREATE_EMPLOYEE, createEmployee);
  yield takeLatest(Constants.UPDATE_EMPLOYEE, updateEmployee);
  yield takeLatest(Constants.GET_BRANCHES, getBranches);
  yield takeLatest(Constants.CREATE_BRANCH, createBranch);
  yield takeLatest(Constants.CREATE_ROLE, createRole);
  yield takeLatest(Constants.GET_PARTY_TAGS, getPartyTags);
  yield takeLatest(Constants.CREATE_JOBOPENING, createJobOpening);
  yield takeLatest(Constants.CREATE_ANNOUNCEMENT, createAnnouncement);
}
