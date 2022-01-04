import {ReactElement} from 'react';
import {useInjectReducer, useInjectSaga} from 'utils/reduxInjectors';

import './styles/index.scss';
import reducer, {sliceKey} from './slice';
import useSignInHooks from './hooks';
import saga from './saga';

const SignIn = (): ReactElement => {
  useInjectReducer({
    key: sliceKey,
    reducer,
  });
  useInjectSaga({
    key: sliceKey,
    saga,
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
