import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getPartyGroupSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetPartyGroup}?orgId=${
    currentUser.organisation.orgId
    }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(Actions.getPartyGroupSuccessAction(response));
  } catch (err) {
    yield put(Actions.getPartyGroupErrorAction(err));
  }
}

export function* createNewPartyGroupSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  // const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const createNewPartyGroupParams = yield select(
    Selectors.createNewPartyGroupData(),
  );

  // console.log(accessToken, 'accessToken');
  // console.log(currentUser, 'currentUser');
  const { name, description } = createNewPartyGroupParams;
  const newData = {
    name,
    description,
    // organisation: { orgId: currentUser.organisation.orgId }, // TODO: user object clear from store
  };

  const requestURL = `${Endpoints.CreateNewPartyGroup}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });

    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(
      Actions.createNewPartyGroupSuccessAction(response),
    );
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.closeNewPartyGroupDialog());
    yield put(AppActions.openSnackBar({ message: 'Party Group Created Successfully', status: 'success' }));
  } catch (err) {
    yield put(Actions.createNewPartyError(err));
    // yield put(AppActions.openSnackBar({message: `${err} Failed To Create Party Group`, status: 'error'}));
  }
}

export function* updatePartyGroupSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const updatePartyGroupParams = yield select(
    Selectors.makeSelectUpdatePartyGroupData(),
  );

  const requestURL = `${Endpoints.UpdatePartyGroup}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updatePartyGroupParams),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });

    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(Actions.updatePartyGroupSuccessAction(response));
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.closeEditPartyGroupDialog());
  } catch (err) {
    console.log(err, 'errrrrrrr');
    yield put(Actions.updatePartyGroupErrorAction(err));
  }
}

export function* getAllUsers() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllUsersApi}/${
    currentUser.organisation.orgId
    }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    if (response.status === 400 || response.status === 500) {
      throw response.error
    }

    yield put(Actions.getAllUsersSuccess(response));
  } catch (err) {
    yield put(Actions.getAllUsersError(err));
  }
}

export function* getAllTags() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const requestURL = `${Endpoints.GetAllTagsApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    if (response.status === 400 || response.status === 500) {
      throw response.error
    }

    yield put(Actions.getAllTagsSuccess(response));
  } catch (err) {
    yield put(Actions.getAllTagsError(err));
  }
}

export function* createNewParty() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const createNewPartyData = yield select(
    Selectors.makeSelectCreateNewPartyData(),
  );

  const requestURL = `${Endpoints.CreateNewPartyApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewPartyData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    if (response.status === 400 || response.status === 500) {
      throw response.error
    }

    yield put(Actions.createNewPartySuccess(response));
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.closeNewPartyDialog());
    yield put(AppActions.openSnackBar({ message: 'Party Created Successfully', status: 'success' }));
  } catch (err) {
    yield put(Actions.createNewPartyError(err));
    yield put(AppActions.openSnackBar({ message: `${err} Party Failed`, status: 'error' }));
  }
}

export function* getPartyById() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const partyId = yield select(Selectors.makeSelectPartyId());

  const requestURL = `${Endpoints.GetPartyByIdApi}/${partyId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    if (response.status === 400 || response.status === 500) {
      throw response.error
    }

    console.log(response, "getPartyByIdResponse")

    yield put(Actions.getPartyByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getPartyByIdError(err));
  }
}

export function* updatePartySaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const updatePartyParams = yield select(Selectors.makeSelectUpdatePartyData());
  const requestURL = `${Endpoints.UpdatePartyApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updatePartyParams),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });
    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(Actions.getPartyGroupAction());
    yield put(Actions.closeEditPartyDialog());
    yield put(AppActions.openSnackBar({ message: 'Party Updated Successfully', status: 'success' }));
  } catch (err) {
    console.log(err, 'errrrrrrr');
    yield put(Actions.updatePartyError(err));
  }
}

export function* createNewParties() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const createNewPartiesData = yield select(
    Selectors.makeSelectCreateNewPartiesData(),
  );

  const requestURL = `${Endpoints.CreateNewPartiesApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewPartiesData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(Actions.getPartyById(createNewPartiesData.partyId));
    yield put(Actions.closeNewPartiesDialog());
    yield put(AppActions.openSnackBar({ message: 'Party Created Successfully', status: 'success' }));
  } catch (err) {
    yield put(Actions.createNewPartiesError(err));
    // yield put(AppActions.openSnackBar({message: `${err}`, status: 'error'}));
  }
}

export function* updatePartiesSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const updatePartiesParams = yield select(
    Selectors.makeSelectUpdatePartiesData(),
  );

  const requestURL = `${Endpoints.UpdatePartiesApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updatePartiesParams),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });

    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(Actions.getPartyById(updatePartiesParams.partyId));
    yield put(Actions.closeEditPartiesDialog());
  } catch (err) {
    console.log(err, 'errrrrrrr');
    yield put(Actions.updatePartiesError(err));
  }
}

export function* createNewPosition() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const createNewPositionData = yield select(
    Selectors.makeSelectCreateNewPositionData(),
  );

  const requestURL = `${Endpoints.CreateNewPositionApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewPositionData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPartyById(createNewPositionData.party_id));
    yield put(Actions.closeNewPositionDialog());
    yield put(AppActions.openSnackBar({ message: 'Position Created Successfully', status: 'success' }));
  } catch (err) {
    yield put(Actions.createNewPositionError(err));
    // yield put(AppActions.openSnackBar({message: `${err}`, status: 'error'}));
  }
}

export function* updatePositionSaga({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const updatePositionParams = yield select(
    Selectors.makeSelectUpdatePositionData(),
  );
  const getPartyById = yield select(
    Selectors.makeSelectGetPartyById(),
  );

  const requestURL = `${Endpoints.UpdatePositionApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });
    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(Actions.updatePositionSuccess(response));
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.getPartyById(getPartyById.id));
    yield put(Actions.closeEditPositionDialog());
  } catch (err) {
    console.log(err, 'errrrrrrr');
    yield put(Actions.updatePositionError(err));
  }
}

export function* getAllPosition() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const createNewPositionData = yield select(
    Selectors.makeSelectCreateNewPositionData(),
  );

  const requestURL = `${Endpoints.GetAllPositionsApi}/${
    currentUser.organisation.orgId
    }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllPositionsSuccess(response));
    yield put(AppActions.openSnackBar({ message: 'Position Created Successfully', status: 'success' }));
  } catch (err) {
    yield put(Actions.getAllPositionsError(err));
    // yield put(AppActions.openSnackBar({message: `${err}`, status: 'error'}));
  }
}

export function* AddEmployeeToPosition() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const AddEmployeeToPositionData = yield select(
    Selectors.makeSelectAddEmployeeToPositionData(),
  );

  const requestURL = `${Endpoints.AddNewEmployeeToPositionApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(AddEmployeeToPositionData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.addEmployeeToPositionSuccess(response));
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.closeAddEmployeeToPositionDialog());
    yield put(AppActions.openSnackBar({ message: 'Employee Add Successfully', status: 'success' }));
  } catch (err) {
    yield put(Actions.addEmployeeToPositionError(err));
    // yield put(AppActions.openSnackBar({ message: `${err}`, status: 'error' }));
  }
}

/** *****************************************************************
 * Organization constants
 ******************************************************************* */

// Organization Info Saga
export function* companyDetail() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  console.log(accessToken, "accessToken accessToken accessToken")

  const requestURL = `${Endpoints.CompanyInfoUrl}/${
    currentUser && currentUser.organisation.orgId
    }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response getting organization info")

    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(Actions.getCompanyInfoSuccess(response));
  } catch (err) {
    yield put(Actions.getCompanyInfoError(err.error));
    console.log(err.message, "getting comany info")
  }
}

export function* updateCompanyDetail() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const updateCompanyInfoData = yield select(
    Selectors.makeSelectUpdateCompanyInfoData(),
  );
  const requestURL = `${Endpoints.UpdateCompanyInfoUrl}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateCompanyInfoData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    if (response.status === 400 || response.status === 500) {
      throw response
    }

    yield put(Actions.getCompanyInfo());
    yield put(Actions.updateCompanyInfoSuccess(response));
    yield put(Actions.closeEditCompanyDialog());
    yield put(AppActions.openSnackBar({ message: 'Company Profile Update Successfully', status: 'success' }));
  } catch (err) {
    yield put(Actions.updateCompanyInfoError(err));
    yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
  }
}

// Individual exports for testing
export default function* companyStructureSaga() {
  yield takeLatest(Constants.GET_PARTY_BY_ID, getPartyById);
  yield takeLatest(Constants.GET_ALL_TAGS, getAllTags);
  yield takeLatest(Constants.UPDATE_POSITION, updatePositionSaga);
  yield takeLatest(Constants.UPDATE_PARTIES, updatePartiesSaga);
  yield takeLatest(Constants.UPDATE_PARTY, updatePartySaga);
  yield takeLatest(Constants.UPDATE_PARTY_GROUP, updatePartyGroupSaga);
  yield takeLatest(Constants.GET_PARTY_GROUP, getPartyGroupSaga);
  yield takeLatest(Constants.GET_ALL_USERS, getAllUsers);
  yield takeLatest(Constants.CREATE_NEW_PARTY_GROUP, createNewPartyGroupSaga);
  yield takeLatest(Constants.CREATE_NEW_PARTY, createNewParty);
  yield takeLatest(Constants.CREATE_NEW_PARTIES, createNewParties);
  yield takeLatest(Constants.CREATE_NEW_POSITION, createNewPosition);
  yield takeLatest(Constants.GET_POSITIONS, getAllPosition);
  yield takeLatest(Constants.ADD_EMPLOYEE_TO_POSITION, AddEmployeeToPosition);

  /** *****************************************************************
   * Organization constants
   ******************************************************************* */
  yield takeLatest(Constants.GET_COMPANY_INFO, companyDetail);
  yield takeLatest(Constants.UPDATE_COMPANY_INFO, updateCompanyDetail);
}
