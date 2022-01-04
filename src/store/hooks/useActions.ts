// https://github.com/reduxjs/react-redux/issues/1252#issuecomment-488160930
// https://react-redux.js.org/api/hooks#recipe-useactions
import {DependencyList, useMemo} from 'react';

import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {ActionCreatorsMapObject} from '@reduxjs/toolkit';

const useActions = <T>(actions: ActionCreatorsMapObject, deps: DependencyList | undefined): T => {
  const dispatch = useDispatch();
  return useMemo<T>(
    (): T => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch)) as unknown as T;
      }
      return bindActionCreators(actions, dispatch) as unknown as T;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [dispatch, ...deps] : deps,
  );
};

export default useActions;
