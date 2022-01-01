import {configureStore, Middleware} from '@reduxjs/toolkit';
import {createInjectorsEnhancer, forceReducerReload} from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {createReducer} from 'store/reducers';

export const configureAppStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const {run: runSaga} = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware] as Middleware[];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const initStore = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(
          // correctly typed middlewares can just be used
          ...middlewares,
        )
        // prepend and concat calls can be chained
        .concat(logger),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  // https://stackoverflow.com/questions/55263085/property-hot-does-not-exist-on-type-nodemodule-ts2339
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return initStore;
};

export const store = configureAppStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
