import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../../App/selectors';
// import * as AppActions from '../../App/actions';
// import * as Selectors from './selectors';
import request from '../../../../utils/request';
// import swal from 'sweetalert';
import * as Endpoints from '../../../../components/Endpoints';
import * as Actions from './actions';
// import * as Constants from './constants';

export function* getAllAccountTypeSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetGeneralJournalApi}`;

  try {
    const generalJournalResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getGeneralJournalAction(generalJournalResponse));
  } catch (err) {
    console.log('Something went wrong at fetch reports saga');
    yield put(Actions.getGeneralJournalErrorAction(err));
  }
}
