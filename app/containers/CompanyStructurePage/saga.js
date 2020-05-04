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
    const userPartyGroupResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(userPartyGroupResponse, 'userPartyGroupResponse');

    yield put(Actions.getPartyGroupSuccessAction(userPartyGroupResponse));
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
    const createPartyGroupResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });

    yield put(
      Actions.createNewPartyGroupSuccessAction(createPartyGroupResponse),
    );
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.closeNewPartyGroupDialog());
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: 'Party Group Created Successfully',
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    yield put(Actions.createNewPartyError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err} Failed To Create Party Group`,
    //     status: 'error',
    //   }),
    // );
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
    const createPartyGroupResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updatePartyGroupParams),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });

    yield put(Actions.updatePartyGroupSuccessAction(createPartyGroupResponse));
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
    const getAllUsersResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllUsersSuccess(getAllUsersResponse));
  } catch (err) {
    yield put(Actions.getAllUsersError(err));
  }
}

export function* getAllTags() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const requestURL = `${Endpoints.GetAllTagsApi}`;

  try {
    const getAllTagsResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllTagsSuccess(getAllTagsResponse));
  } catch (err) {
    yield put(Actions.getAllTagsError(err));
  }
}

export function* createNewParty() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const createNewPartyData = yield select(
    Selectors.makeSelectCreateNewPartyData(),
  );

  console.log(createNewPartyData, 'createNewPartyData');
  const requestURL = `${Endpoints.CreateNewPartyApi}`;

  try {
    const createNewPartyResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewPartyData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewPartySuccess(createNewPartyResponse));
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.closeNewPartyDialog());
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: 'Party Created Successfully',
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    yield put(Actions.createNewPartyError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err} Party Failed`,
    //     status: 'error',
    //   }),
    // );
  }
}

export function* getPartyById() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const partyId = yield select(Selectors.makeSelectPartyId());

  const requestURL = `${Endpoints.GetPartyByIdApi}/${partyId}`;

  try {
    const getPartyByIdResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getPartyByIdResponse, 'getPartyByIdResponse');

    yield put(Actions.getPartyByIdSuccess(getPartyByIdResponse));
  } catch (err) {
    yield put(Actions.getPartyByIdError(err));
  }
}

export function* updatePartySaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const updatePartyParams = yield select(Selectors.makeSelectUpdatePartyData());
  const requestURL = `${Endpoints.UpdatePartyApi}`;

  try {
    const createPartyResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updatePartyParams),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });

    console.log(createPartyResponse, 'createPartyResponse');
    console.log(updatePartyParams, 'updatePartyParams');
    // yield put(Actions.updatePartyGroupSuccessAction(createPartyResponse));
    // yield put(Actions.getPartyGroupAction());
    yield put(Actions.getPartyById(createPartyResponse.id));
    yield put(Actions.closeEditPartyDialog());
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

  console.log(createNewPartiesData, 'createNewPartiesData');
  const requestURL = `${Endpoints.CreateNewPartiesApi}`;

  try {
    const createNewPartiesResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewPartiesData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(createNewPartiesResponse, 'createNewPartiesResponse');
    // yield put(Actions.createNewPartiesSuccess(createNewPartiesResponse));
    // yield put(Actions.getPartyGroupAction());
    yield put(Actions.getPartyById(createNewPartiesData.partyId));
    yield put(Actions.closeNewPartiesDialog());
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: 'Party Created Successfully',
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    yield put(Actions.createNewPartiesError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err}`,
    //     status: 'error',
    //   }),
    // );
  }
}

export function* updatePartiesSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const updatePartiesParams = yield select(
    Selectors.makeSelectUpdatePartiesData(),
  );

  const requestURL = `${Endpoints.UpdatePartiesApi}`;

  try {
    const createPartyGroupResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updatePartiesParams),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });

    yield put(Actions.updatePartiesSuccess(createPartyGroupResponse));
    yield put(Actions.getPartyGroupAction());
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
    const createNewPositionResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewPositionData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPartyById(createNewPositionData.party_id));
    yield put(Actions.closeNewPositionDialog());
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: 'Position Created Successfully',
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    yield put(Actions.createNewPositionError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err}`,
    //     status: 'error',
    //   }),
    // );
  }
}

export function* updatePositionSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const updatePositionParams = yield select(
    Selectors.makeSelectUpdatePositionData(),
  );

  const requestURL = `${Endpoints.UpdatePositionApi}`;

  try {
    const createPartyGroupResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updatePositionParams),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/Json',
      }),
    });

    yield put(Actions.updatePositionSuccess(createPartyGroupResponse));
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.getPartyById(updatePositionParams.id));
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
    const getPositionsResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllPositionsSuccess(getPositionsResponse));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: 'Position Created Successfully',
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    yield put(Actions.getAllPositionsError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err}`,
    //     status: 'error',
    //   }),
    // );
  }
}

export function* AddEmployeeToPosition() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const AddEmployeeToPositionData = yield select(
    Selectors.makeSelectAddEmployeeToPositionData(),
  );

  const requestURL = `${Endpoints.AddNewEmployeeToPositionApi}`;

  try {
    const AddEmployeeToPositionResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(AddEmployeeToPositionData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(
      Actions.addEmployeeToPositionSuccess(AddEmployeeToPositionResponse),
    );
    yield put(Actions.getPartyGroupAction());
    yield put(Actions.closeAddEmployeeToPositionDialog());
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: 'Employee Add Successfully',
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    yield put(Actions.addEmployeeToPositionError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err}`,
    //     status: 'error',
    //   }),
    // );
  }
}

/** *****************************************************************
 * Organization constants
 ******************************************************************* */

// Organization Info Saga
export function* companyDetail() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.CompanyInfoUrl}/${
    currentUser.organisation.orgId
  }`;

  try {
    const companyDetailResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getCompanyInfoSuccess(companyDetailResponse));
  } catch (err) {
    yield put(Actions.getCompanyInfoError(err));
  }
}

export function* updateCompanyDetail() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const updateCompanyInfoData = yield select(
    Selectors.makeSelectUpdateCompanyInfoData(),
  );
  const requestURL = `${Endpoints.UpdateCompanyInfoUrl}`;

  try {
    const companyDetailResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateCompanyInfoData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getCompanyInfo());
    yield put(Actions.updateCompanyInfoSuccess(companyDetailResponse));
    yield put(Actions.closeEditCompanyDialog());
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: 'Company Profile Update Successfully',
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    yield put(Actions.updateCompanyInfoError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: err.message,
    //     status: 'error',
    //   }),
    // );
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
