import {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from 'appUtils/providers/AuthProvider';

export const LoginRedirectRoute = ({children}: {children: ReactElement}) => {
  const {user} = useAuth();
  console.log(user);
  if (!user) {
    // user is not authenticated
    return <Navigate to='/login' />;
  }
  return children;
};
