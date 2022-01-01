Add Redux-Saga in your React TypeScript Project

In this article, I will guide you how to implement it to personal project so what is redux-saga?


```sh
npm install redux @reduxjs/toolkit redux-saga react-redux redux-injectors redux-logger 
yarn add redux @reduxjs/toolkit redux-saga react-redux redux-injectors redux-logger 
```

#### There are several reasons why you must not mutate state in Redux:

1. It causes bugs, such as the UI not updating properly to show the latest values
2. It makes it harder to understand why and how the state has been updated
3. It makes it harder to write tests
4. It breaks the ability to use "time-travel debugging" correctly
5. It goes against the intended spirit and usage patterns for Redux

> That's why Redux Toolkit's createSlice function lets you write immutable updates an easier way!
> createSlice uses a library called `Immer` inside. Immer uses a special JS tool called a `Proxy` to wrap the data you provide, and lets you write code that "mutates" that wrapped data. But, Immer tracks all the changes you've tried to make, and then uses that list of changes to return a safely immutably updated value, as if you'd written all the immutable update logic by hand.

`So, instead of this:`
```js
function reducer1(state, action) {
  return {
    ...state,
    newValue: {}
  }
}
```
`You can write code that looks like this:`
```js
function reducer1(state, action) {
  state.newValue = {}
}

function reducer2(state, action) {
  const { id, title, content } = action.payload
  const existingPost = state.find(post => post.id === id)
  if (existingPost) {
    existingPost.title = title
    existingPost.content = content
  }
}
```

> You can only write "mutating" logic in Redux Toolkit's `createSlice` and `createReducer` because they `use Immer inside!` If you write mutating logic in reducers without Immer, it will mutate the state and cause bugs!
Learn more : https://redux.js.org/usage/structuring-reducers/immutable-update-patterns


Question 
```scss
We've seen that our components can use the useSelector and useDispatch hooks to talk to the Redux store. But, since we didn't import the store, how do those hooks know what Redux store to talk to?
```

Answer is:
> React components that call useSelector or useDispatch will be talking to the Redux store we gave to the <Provider>.

```js
<Provider store={store}>
  <App />
</Provider>
```

> the component will re-render any time the value returned from useSelector changes to a new reference select the smallest possible amount of data they need from the store, which will help ensure that it only renders when it actually needs to.


Question : Can Redux store an class instance?
> Redux actions and state should only contain plain JS values like objects, arrays, and primitives. Don't put class instances, functions, or other non-serializable values into Redux!.

Question : How to recieve action defined outside of our slice
> The `extraReducers` option should be a function that receives a parameter called builder. The builder object provides methods that let us define additional case reducers that will run in response to actions defined outside of the slice. We'll use builder.addCase(actionCreator, reducer) to handle each of the actions dispatched


Question : When the `useSelector` will be run?
> useSelector will re-run every time an action is dispatched, and that it forces the component to re-render if we return a new reference value. useSelector and mapState rely on === reference equality checks of the return values to determine if the component needs to re-render. If a selector always returns new references, it will force the component to re-render even if the derived data is effectively the same as last time. This is especially common with array operations like map() and filter(), which return new array references.
E.g you have a selector below
```js
const posts = useSelector(state => {
  const allPosts = selectAllPosts(state)
  return allPosts.filter(post => post.user === userId)
})

And in your app, you have a dispatch action like xyz action and this action don't have any related to this useSelector.
However the useSelector still triggered 
```
> We're calling filter() inside of our useSelector hook, so that we only return the list of posts that belong to this user. Unfortunately, `this means that useSelector always returns a new array reference, and so our component will re-render after every action even if the posts data hasn't changed!`.

> `Reselect` is a library for creating memoized selector functions, and was specifically designed to be used with Redux. It has a createSelector function that generates memoized selectors that will only recalculate results when the inputs change. Redux Toolkit exports the createSelector function, so we already have it available.

More detail : https://redux.js.org/usage/deriving-data-selectors

Question : Can we pass parameter to the selector?
> Yes https://redux.js.org/usage/deriving-data-selectors#createselector-behavior
Another in case you use `react-redux`
> It's common to want to pass additional arguments to a selector function. However, useSelector always calls the provided selector function with one argument - the Redux root state.
https://redux.js.org/usage/deriving-data-selectors#calling-selectors-with-parameters
> 

Question : How to create an Unique Selector Instances
> here are many cases where a selector function needs to be reused across multiple components. If the components will all be calling the selector with different arguments, it will break memoization - the selector never sees the same arguments multiple times in a row, and thus can never return a cached value.
The standard approach here is to create a unique instance of a memoized selector in the component, and then use that with useSelector. That allows each component to consistently pass the same arguments to its own selector instance, and that selector can correctly memoize the results.
For function components, this is normally done with useMemo or useCallback:
More Detail : https://redux.js.org/usage/deriving-data-selectors#creating-unique-selector-instances


Question : What happen when a `createSelector` function used in multiple places?
> `createSelector` only has a default `cache size of 1`, and this is per each unique instance of a selector. This creates problems when a single selector function needs to get reused in multiple places with differing inputs.
More detail: https://redux.js.org/usage/deriving-data-selectors#selector-factories

Question : what is middleware in redux
> Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

Question : Redux expects that all state updates are done immutably
`Immutability` "Mutable" means "changeable". If something is "immutable", it can never be changed.
> JavaScript objects and arrays are all mutable by default. If I create an object, I can change the contents of its fields. If I create an array, I can change the contents as well

> This is called mutating the object or array. It's the same object or array reference in memory, but now the contents inside the object have changed.
In order to update values immutably, your code must make copies of existing objects/arrays, and then modify the copies.


Rule : 
>  we recommend prefixing selector function names with the word select combined with a description of the value being selected.


How to use Selectors more Effectively
https://redux.js.org/usage/deriving-data-selectors#using-selectors-effectively

1. Define Selectors Alongside Reducers : https://redux.js.org/usage/deriving-data-selectors#define-selectors-alongside-reducers
2. Balance Selector Usage
 - don't make every single selector memoized!
 - Memoization is only needed if you are truly deriving results, and if the derived results would likely create new references every time
 - A selector function that does a direct lookup and return of a value should be a plain function, not memoized.

```js
// ❌ DO NOT memoize: will always return a consistent reference
const selectTodos = state => state.todos
const selectNestedValue = state => state.some.deeply.nested.field
const selectTodoById = (state, todoId) => state.todos[todoId]

// ❌ DO NOT memoize: deriving data, but will return a consistent result
const selectItemsTotal = state => {
  return state.items.reduce((result, item) => {
    return result + item.total
  }, 0)
}
const selectAllCompleted = state => state.todos.every(todo => todo.completed)

// ✅ SHOULD memoize: returns new references when called
const selectTodoDescriptions = state => state.todos.map(todo => todo.text)
```

3. Reshape State as Needed for Components : https://redux.js.org/usage/deriving-data-selectors#reshape-state-as-needed-for-components
> A Redux state often has data in a "raw" form, because the state should be kept minimal, and many components may need to present the same data differently. You can use selectors to not only extract state, but to reshape it as needed for this specific component's needs
4. Globalize Selectors if Needed : https://redux.js.org/usage/deriving-data-selectors#globalize-selectors-if-needed
   https://redux.js.org/usage/deriving-data-selectors#globalize-selectors-if-needed

   
### Step 1: Add the necessary packages to your app:

npm install @reduxjs/toolkit react-redux redux-saga redux-injectors redux-logger
npm install @types/react-redux -D

1. `@reduxjs/toolkit` :Already includes several of the packages we're using, like redux, reselect, and immer, and re-exports those APIs.
Just one in multiple packages need to set up redux project.

#### Useful APIs : 
- `createSlice` API that will help us simplify our Redux reducer logic and actions
   - will automatically generate action creators
   - allows us to safely "mutate" our state! lets you write immutable updates an easier way!
   - >Important Note : You can only write "mutating" logic in Redux Toolkit's `createSlice` and `createReducer` because they use Immer inside! If you write mutating logic in reducers without Immer, it will mutate the state and cause bugs!

- `createSlice` also accepts an `extraReducers` option, where we can have the same slice reducer listen for other action types
- `createEntityAdapter` : API that has prebuilt reducers for typical data update operations with normalized state and also generates some memoized selectors for reading values from the store.- addOne / addMany: add new items to the state 
  - upsertOne / upsertMany: add new items or update existing ones
  - updateOne / updateMany: update existing items by supplying partial values
  - removeOne / removeMany: remove items based on IDs
  - setAll: replace all existing items
- `createEntityAdapter.getSelectors` adapter function will generate selectors like selectAll, which returns an array of all items, and selectById, which returns one item
- `createSelector` : creating memoized selector functions
```js
createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.push(action.payload)
    },
  }
})
```
2. `react-redux` : package that lets your React components interact with a Redux store by reading pieces of state and dispatching actions to update the store.
3. `redux-saga` : HaiThai
4. `redux-injectors`: https://www.npmjs.com/package/redux-injectors
> Dynamically load redux reducers and redux-saga sagas as needed, instead of loading them all upfront. This has some nice benefits, such as avoiding having to manage a big global list of reducers and sagas. It also allows more effective use of code-splitting.


https://miro.medium.com/max/630/1*QERgzuzphdQz4e0fNs1CFQ.gif

> Redux-Saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

> Sagas are “they are like daemon tasks that run in the background and choose their own logic of progression” — Yassine Elouafi creator of redux-saga.

Before you go to understand what is Redux-saga, the word you must know is [Generator ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

- A `generator` is a function that can stop midway and then continue from where it stopped. In short, a generator appears to be a function, but it behaves like an iterator.
  `Iterators` are an implementation of `Iterable objects` such as maps, arrays and strings which enables us to iterate over them using `next()`. They have a wide variety of use cases across Generators, Observables and Spread operators.

#### Articles on Generators
https://redux-saga.js.org/docs/ExternalResources/#articles-on-generators
#### Declare a effect
`Effects`: Invoke some asynchronous function, dispatch an action to the store, etc.
> To create Effects, you use the functions provided by the library in the redux-saga/effects package.
Sagas can yield Effects in multiple forms. The easiest way is to yield a Promise.
>
E.g
- Effect -> call the function fetch with `./products` as argument
- The redux-saga middleware takes care of executing the function call and resuming the generator with the resolved response.
```js
import { call } from 'redux-saga/effects'

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // ...
}
```
call also supports invoking object methods, you can provide a context to the invoked functions using the following form:
```js
yield call([obj, obj.method], arg1, arg2, ...) // as if we did obj.method(arg1, arg2 ...)
apply is an alias for the method invocation form
```

```js
yield apply(obj, obj.method, [arg1, arg2, ...])
call and apply are well suited for functions that return Promise results. Another function cps can be used to handle Node style functions (e.g. fn(...args, callback) where callback is of the form (error, result) => ()). cps stands for Continuation Passing Style.
```

#### Dispatching actions to the store
> The library provides, for this purpose, another function `put` which creates the dispatch Effect.

```js
import { call, put } from 'redux-saga/effects'
// ...

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // create and yield a dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}
```
List common effects

1. Handle concurrency
- `take` : It'll suspend the Generator until a matching `action is dispatched` and catch it and execute your logic
- `call`: Suspends the Generator until a Promise resolves
>  call is a blocking Effect the Generator can't perform/handle anything else until the call terminates
- `takeEvery`: Allows multiple `saga tasks` to be forked concurrently.
  > takeEvery('*') (with the wildcard * pattern), we can catch all dispatched actions regardless of their types.
- `takeLatest`: Doesn't allow multiple Saga tasks to be fired concurrently. As soon as it gets a new dispatched action, it cancels any previously-forked task (if still running). takeLatest can be useful to handle AJAX requests where we want to only have the response to the latest request.
- `fork` : is used to create attached fork tasks that execute in the background and `fork` effects are non blocking
- `all` : execute parallel Effects, executing tasks in parallel The parent will terminate after all launched tasks terminate
  > Note : `all` & `fork` for attached forks, a Saga aborts as soon as main body of instructions throws an error An uncaught error was raised by one of its attached forks
- `cancel`: cancel a previously `forked task`.
- `cancelled`: Force to cancel in a special way
- `race`: triggering a race between multiple Effects.
  Rules :
- You can't catch errors from forked tasks (E.g fork task failed the try/catch block can catch that error) A failure in an attached fork will cause the forking parent to abort (Just like there is no way to catch an error inside a parallel Effect, only from outside by blocking on the parallel Effect).

Advanced Options:
1. `Pull model`: write our flow in the same place instead of handling the same action repeatedly.
2. `Non-blocking calls`: `fork` is non-blocking effect it means when it called, it will be return immediately and go to the next action.
3. `Note` Wait for specific actions in the store using the take Effect. We can make asynchronous calls using the call Effect. Finally, we can dispatch actions to the store using the put Effect.


### Step 2: sets up our redux for first action
#### 1. Create configureAppStore at the `src/store/configureStore.ts`
```js
...
export const store = configureAppStore();
....
```
#### 2. register the store with Provider at the top App `src/index.tsx`
```js
import {Provider} from 'react-redux';
...
    <Provider store={store}>
      <App />
    </Provider>
...
```

#### 3. Create a first container (SignIn container)

Folder structure for a container as below.
E.g ( SignIn container )
src/containers
```scss
├── src (Folder)
├── conatiners (Folder)
│   ├── SignIn (Folder)
│   ├──├── styles (Folder)
│   ├──├──├──index.ts
│   ├──├── index.tsx
│   ├──├── constant.ts
│   ├──├── hooks.ts
│   ├──├── saga.ts
│   ├──├── selectors.ts
│   ├──├── slice.ts
│   ├──├── types.ts
│   └── TaskManagement
```

#### Workflow for create a containers and slice and api fetching as below:
1. Init your component & styling for default view `index.tsx` & `index.scss`

Simple with a login page (username & password) and a login button.
```jsx
import './styles/index.scss';

const SignIn = () => {
  return (
    <div className='SignIn'>
      <input name='username' type='text' placeholder='username' />
      <input name='password' type='password' placeholder='password' />
      <button name='submit' value='SignIn'>
        Login
      </button>
    </div>
  );
};

export default SignIn;

```   

2. Create your `slice` match to your UI & Business

`createSlice` takes an object with three main options fields:
- **_name_**: a string that will be used as the prefix for generated action types
- **_initialState_**: the initial state of the reducer
- **_reducers_**: an object where the keys are strings, and the values are "case reducer" functions that will handle specific actions
   

```ts
import {createSlice} from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';

export const initialState = {
  data: null,
  status: null,
};
export const sliceKey = 'currentUser';
const signInSlice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    signIn(state) {
      state.status = 'pending'
    },
    setUserInfo(state, {payload: {data}}) {
      state.status = 'success';
      state.data = data;
    },
  },
});

export const {signIn, setUserInfo} = signInSlice.actions;
export default signInSlice.reducer;
```

There's several things to see in this example:

- We write case reducer functions inside the reducers object, and give them readable names
- `createSlice` will automatically generate action creators that correspond to each case reducer function we provide
- `createSlice` automatically returns the existing state in the default case
- `createSlice` allows us to safely "mutate" our state!

The generated action creators will be available as `slice.actions.signIn`, and we typically destructure and export those individually like we did with the action creators we wrote earlier. The complete reducer function is available as `slice.reducer`, and we typically export default `slice.reducer`, again the same as before.
> By default, the action creator accepts one argument, which it puts into the action object as action.payload.
```js
export const {signIn, setUserInfo} = signInSlice.actions;

console.log(signIn({usename, password}))
{type: 'currentUser/signIn', payload: { username, password }}
```
Because default the redux toolkit behind the scenes execute Immutable update with immer in the `createSlice`
so this code below is safety
```js
✅ This "mutating" code is okay inside of createSlice!
signIn(state) {
  state.status = 'pending'
}
```

3. Inject our `reducer` created at `step 2` to our component

```jsx
import {useInjectReducer} from 'utils/reduxInjectors';
import reducer, {sliceKey} from './slice';

const SignIn = () => {
  useInjectReducer({
    key: sliceKey,
    reducer,
  });
  ...
};
export default SignIn;

```

If you take a look at the `Store` you can see the `global state structure` added new key `currentUser`
```ts
{
  currentUser: {
    data: null,
    status: null,
  }
}
```

4. create a UI workflow below the `hooks.ts` file

The UI workflow simple : The user fill username/password field and press the login button and hooks will return about
the `states` & `handlers` needed.

Create the `hooks.ts` file 
```jsx
import {useState, useCallback, ChangeEvent} from 'react';

//To verify did user sign in or not ?
const useSignInHooks = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const onSubmitHandler = useCallback(() => {
    console.log({username, password});
  }, [username, password]);

  return {
    states: {
      username,
      password,
    },
    handlers: {
      onSubmitHandler,
      onUsernameChange,
      onPasswordChange,
    },
  };
};

export default useSignInHooks;

```

5. Go back to component `index.tsx` and inject the `hooks` update the UI

```ts
import {useInjectReducer} from 'utils/reduxInjectors';

import './styles/index.scss';
import reducer, {sliceKey} from './slice';
import useSignInHooks from './hooks';

const SignIn = () => {
  useInjectReducer({
    key: sliceKey,
    reducer,
  });

  const {states, handlers} = useSignInHooks();
  const {username, password} = states;
  const {onSubmitHandler, onUsernameChange, onPasswordChange} = handlers;

  return (
    <div className='SignIn'>
      <input type='text' placeholder='username' value={username} onChange={onUsernameChange} />
      <input type='password' placeholder='password' value={password} onChange={onPasswordChange} />
      <button name='submit' value='SignIn' onClick={onSubmitHandler}>
        Login
      </button>
    </div>
  );
};

export default SignIn;

```

6. Trigger an action to the `store` when user click on `login` button.

When the user fill username & password and click the login button.
We will trigger an action to the redux store

We will go back the `hooks` file and update this follow.

```ts
import {useActions} from 'hooks/useActions';
import {signIn} from './slice';
...
const useSignInHooks = () => {
...
  const {signInAction} = useActions(
    {
      signInAction: signIn,
    },
    [signIn],
  );

  const onSubmitHandler = useCallback(() => {
    console.log({username, password});
    signInAction({username, password});
  }, [signInAction, username, password]);
...
}
```

In the code above you can see `useActions` hook, it just a wrapper of `useDispatch` from `'react-redux'` lib and memo it,
We'll talk more detail about this section later. 
Now you can see in the `onSubmitHandler` we will dispatch an action `signInAction` to the redux `store`

If you try to click on the `login` button you can see the log info in the console log (F12) or Redux Dev Tool 
```js
hooks.ts:26 

redux-logger.js: action currentUser/signIn @ 11:37:33.821
redux-logger.js: `prev state` 
-- Object
----| currentUser: { data: null; status: null }

redux-logger.js:  action = payload: { username: 'haithai', password: 'Adasdasd' } type: "currentUser/signIn"
redux-logger.js:  `next state`
-- Object
----| currentUser: { data: null; status: 'pending' }
```

7. Create a `saga` workflow to handle async `login action` currentUser/signIn

Create `saga.ts` file at the root of folder `SignIn` container.

```ts
import {SagaIterator} from 'redux-saga';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';

import {setUserInfo, signIn} from './slice';
import {UserInfo, SignInActionPayloadType, SignInParamType} from './types';

export default function* sagaWorker() {
  yield all([fork(signInWatcher)]);
}

export function* signInWatcher(): SagaIterator {
  yield takeLatest(signIn.type, executeSignInHandler);
}

export function* executeSignInHandler({payload}: SignInActionPayloadType): SagaIterator {
  const {username, password} = payload;
  const response: UserInfo = yield call(signInFetcher, {username, password});
  yield put(
    setUserInfo({
      data: response,
    }),
  );
}

export const signInFetcher = async (params: SignInParamType): Promise<UserInfo> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({...params, firstName: 'Hai', lastName: 'Thai'} as UserInfo);
    }, 5000);
  });
};

```

We will have 2 important functions are `sagaWorker`, `***Watcher` this worker & watcher will be registered to `store`
Where we apply middleware saga run behind the scenes the store, It will listen for `dispatch action` from `store`
In case the `dispatch action` `match` to our watcher and the `****watcher` will be run.

Workflow as below : 

- 1 -> UI dispatch `signIn` action 
- 2 -> redux `store` (saga middleware) 
- 3 -> `sagaWorker` capture the `signIn` action
- 4 -> execute trigger the `signInWatcher` 
- 5 -> `executeSignInHandler` run and call the API to get `userInfo` 
- 6 -> put`setUserInfo` it means `dispatch action` to the store
- 7 -> `store` pass the payload to reducer and update `app State`

8. Inject the `saga` worker to the redux store

Back to the component and register the `saga` created at step 7
```js
import {useInjectReducer, useInjectSaga} from 'utils/reduxInjectors';
...
const SignIn = () => {
...
  useInjectSaga({
    key: sliceKey,
    saga,
  });
...
}
```
`useInjectSaga` the helper hook will register the saga worker to the redux store.

Now, try to click fill the username & password and press the `login` button you will see 
the data workflow in the console log (F12) or Redux dev tools
```js
action currentUser/signIn @ 17:05:08.186
-- prev state : { currentUser: {data: null, status: null} }
-- action : { type : 'currentUser/signIn', payload: {username: 'haithai', password: 'password'} }
-- next state : { currentUser: {data: null, status: 'pending'} } 

action currentUser/setUserInfo @ 17:05:13.200
-- prev state : { currentUser: {data: null, status: 'pending'} }
-- action : { type : 'currentUser/setUserInfo', @@redux-saga/SAGA_ACTION: true, payload: { data: {username: 'haithai', password: 'password', lastName: 'Thai', firstName: 'Hai'} } }
-- next state : { currentUser: {data: {username: 'haithai', password: 'ajshdads', firstName: 'Hai', lastName: 'Thai'} status: "success"} }

```

At the log you can see we have delay 5 seconds between 2 actions when the API return a fake data
We dispatch `setUserInfo` action to the store -> and the state will be updated via reducer

```js
setUserInfo(state, {payload: {data}}) {
  state.status = 'success';
  state.data = data;
},
```
An important thing we need know the `different` between `action dispatch via store` & `action dispatch via saga` that a flag in the `action`
`@@redux-saga/SAGA_ACTION: true`

9. Create a `selector` get data from store after login success.

Now, overall workflow is done, the last step our component get `status` info from `store` and show a message notify to user that
login was successful

create a `selectors` to get status login status from `store`

```js
import get from 'lodash/fp/get';
import {createSelector} from 'reselect';

import {sliceKey, initialState} from './slice';
import {RootState} from 'types/rootState';
import {CurrentUserStoreType} from './types';

export const signInState = (state: RootState): CurrentUserStoreType => {
  return state[sliceKey] || initialState;
};
export const selectSignInStatus = createSelector(signInState, (state) => get('status')(state));
export const selectIsAuthenticated = createSelector(selectSignInStatus, (status) => {
  return status === 'success';
});
```

the first `selectSignInStatus` get the status of the login workflow and the second selector `selectIsAuthenticated` notify
the user was login successfully.

in the `hooks` of component we will inject these `selectors` to our components.

```js
import {useSelector} from 'react-redux';
import {selectIsAuthenticated, selectSignInStatus} from './selectors';
...

const useSignInHooks = () => {
  const signInStatus = useSelector(selectSignInStatus);
  useEffect(() => {
    switch (signInStatus) {
      case 'pending':
        console.log('The saga is running ... waiting for reponse from API');
        break;
      case 'success':
        console.log('Login was run successfully !!!!');
        break;
      default:
        console.log('init');
    }
  }, [signInStatus]);
}
```

In our component we get the `sign in status` via `useSelector` function
when the `sign in status` change status to `pending` or `success` the `useEffect` will be run

In the log the you can see the workflow as below
```js
action currentUser/signIn @ 17:51:31.596

The saga is running ... waiting for reponse from API

action currentUser/setUserInfo @ 17:51:36.614

Login was run successfully !!!!
```

Now, I think you got ideal how to implement a new feature and using redux saga in our application
:)
