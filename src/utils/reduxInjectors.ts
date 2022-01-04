import {useInjectReducer as useReducer, useInjectSaga as useSaga} from 'redux-injectors';
import {InjectReducerParams, InjectSagaParams, RootStateKeyType} from './types/injectorTypings';

export const useInjectReducer = <Key extends RootStateKeyType>(params: InjectReducerParams<Key>): void => {
  useReducer(params);
};

export function useInjectSaga(params: InjectSagaParams): void {
  useSaga(params);
}
