import {createReducer} from '../reducers';
import {Reducer} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';

describe('reducer', () => {
  it('should inject reducers', () => {
    const dummyReducer = (s = {}, a = {}) => 'dummyResult' + s && 'dummyResult' + a && 'dummyResult';
    const reducer = createReducer({test: dummyReducer} as never) as Reducer<{test: string}>;
    const state = reducer({} as never, '' as unknown as AnyAction);
    expect(state.test as string).toBe('dummyResult');
  });

  it('should return identity reducers when empty', () => {
    const reducer = createReducer() as Reducer<{a: string}>;
    const state = {a: 1};
    const newState = reducer(state as unknown as {a: string}, '' as unknown as AnyAction);
    expect(newState).toBe(state);
  });
});
