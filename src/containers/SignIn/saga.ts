import {SagaIterator} from 'redux-saga';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';

import {setUserInfo, signIn} from './slice';
import {UserInfo, SignInActionPayloadType, SignInParamType} from './types';

export default function* sagaWorker() {
  yield all([fork(signInWatcher)]);
}

export function* signInWatcher(): SagaIterator {
  yield takeLatest(signIn.type, executeSignInHandler);
}

export function* executeSignInHandler({payload}: SignInActionPayloadType): SagaIterator {
  const {username, password} = payload;
  const response: UserInfo = yield call(signInFetcher, {username, password});
  yield put(
    setUserInfo({
      data: response,
    }),
  );
}

export const signInFetcher = async (params: SignInParamType): Promise<UserInfo> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({...params, firstName: 'Hai', lastName: 'Thai'} as UserInfo);
    }, 5000);
  });
};
