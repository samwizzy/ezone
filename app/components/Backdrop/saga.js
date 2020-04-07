import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as Actions from './actions';
import * as Constants from './constants';


export function* openBackdrop() {
  try{
    yield put(Actions.openBackdrop());
  }catch(err){

  }
  
}

export function* closeBackdrop() {
  try{
    yield put(Actions.closeBackdrop());
  }catch(err){

  }
}

// Individual exports for testing
export default function* backdropSaga() {
  yield takeLatest(Constants.OPEN_BACKDROP, openBackdrop);
  yield takeLatest(Constants.CLOSE_BACKDROP, closeBackdrop);
}
