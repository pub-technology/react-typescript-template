// https://github.com/reduxjs/react-redux/issues/1252#issuecomment-488160930
// https://react-redux.js.org/api/hooks#recipe-useactions
import {DependencyList, useMemo} from 'react';

import {bindActionCreators, ActionCreatorsMapObject} from 'redux';
import {useDispatch} from 'react-redux';

export function useActions<A extends ActionCreatorsMapObject<never>, D extends never[]>(
  actions: A,
  deps: D | DependencyList | undefined,
) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [dispatch, ...deps] : deps,
  );
}

export default useActions;
