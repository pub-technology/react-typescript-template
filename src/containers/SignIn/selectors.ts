import get from 'lodash/fp/get';
import {createSelector} from '@reduxjs/toolkit';

import {sliceKey, initialState} from './slice';
import {RootState} from 'types/rootState';
import {CurrentUserStoreType} from './types';

export const signInState = (state: RootState): CurrentUserStoreType => {
  return state[sliceKey] || initialState;
};
export const selectSignInStatus = createSelector(signInState, (state) => get('status')(state));
