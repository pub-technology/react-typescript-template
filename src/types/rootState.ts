// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
// [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
// eslint-disable-next-line @typescript-eslint/no-empty-interface
import {CurrentUserStoreType} from 'containers/SignIn/types';

export interface RootState {
  currentUser: CurrentUserStoreType;
}
