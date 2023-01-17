import {createContext, FC, PropsWithChildren, useContext, useMemo} from 'react';
import {User} from 'models';
import {useMounting} from 'hooks/useMounting';
import {useLocalStorage} from 'hooks/useLocalStorage';
import {useNavigate} from 'react-router-dom';

export const AuthContext = createContext<{
  user: any;
  login: any;
  logout: any;
}>({
  user: null,
  login: null,
  logout: null,
});

type AuthProviderProps = PropsWithChildren<{
  isLoading: boolean;
}>;

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
  const [userLocalStorage, setLocalStorageUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: User) => {
    setLocalStorageUser(JSON.stringify(data));
    navigate('/home');
  };

  // call this function to sign out logged-in user
  const logout = () => {
    setLocalStorageUser(null);
    navigate('/login', {replace: true});
  };

  const value = useMemo(
    () => ({
      user: userLocalStorage,
      login,
      logout,
    }),
    [userLocalStorage],
  );

  useMounting(() => {
    console.log('Auth provider mounting...');
  });
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
