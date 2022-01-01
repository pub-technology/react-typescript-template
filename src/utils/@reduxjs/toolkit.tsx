import {RootStateKeyType} from 'utils/types/injectorTypings';
import {createSlice as createSliceOriginal, SliceCaseReducers, CreateSliceOptions} from '@reduxjs/toolkit';

/* Wrap createSlice with stricter Name options */
export const createSlice = <State, CaseReducers extends SliceCaseReducers<State>, Name extends RootStateKeyType>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
  return createSliceOriginal(options);
};
