import {signIn} from './slice';

export interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
}

export interface CurrentUserStoreType {
  status: null | string;
  data: null | UserInfo;
}

export interface SignInParamType {
  username: string;
  password: string;
}

export type SignInActionPayloadType = ReturnType<typeof signIn> & {
  payload: SignInParamType;
};
