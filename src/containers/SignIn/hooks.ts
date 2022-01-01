import {useState, useCallback, ChangeEvent, useEffect} from 'react';

import {useSelector} from 'react-redux';

import {useActions} from 'hooks/useActions';
import {signIn} from './slice';
import {selectSignInStatus} from './selectors';

//To verify did user sign in or not ?
const useSignInHooks = () => {
  const {signInAction} = useActions(
    {
      signInAction: signIn,
    },
    [signIn],
  );
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

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

  const onUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }, []);

  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  const onSubmitHandler = useCallback(() => {
    console.log({username, password});
    signInAction({username, password});
  }, [signInAction, username, password]);

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
