import {Routes, Route} from 'react-router-dom';
import HomePageView from 'views/homePage/HomePage.view';
import LoginView from 'views/login/Login.view';

import './App.scss';
import {LoginRedirectRoute} from './views/login/LoginRedirectRoute';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <LoginRedirectRoute>
            <HomePageView />
          </LoginRedirectRoute>
        }
      />
      <Route path='/login' element={<LoginView />} />
    </Routes>
  );
}

export default App;
