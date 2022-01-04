/**
 * Combine all reducers in this file and export the combined reducers.
 */
import {Reducer, CombinedState, combineReducers, EmptyObject} from '@reduxjs/toolkit';
import {InjectedReducersType} from 'utils/types/injectorTypings';
import {RootState} from 'types/rootState';

type DefaultState = (state: RootState) => RootState;
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(
  injectedReducers: InjectedReducersType = {},
): Reducer<CombinedState<RootState | EmptyObject>> | DefaultState {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state: RootState) => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
