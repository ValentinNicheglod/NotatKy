import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import Login from './Components/Login';
import ResetPassword from './Components/ResetPassword';
import SignUp from './Components/SignUp';
import Inicio from './Components/Inicio';
import DownloadApp from './Components/DownloadApp';
import SettingsProfile from './Containers/SettingsProfile';
import SettingsCollections from './Containers/SettingsCollections';
import Home from './Containers/Home';
import NotFound from './Components/NotFound';

function App() {
  const darkMode = useSelector((state) => state.users.darkMode);
  const users = useSelector((state) => state.users);
  const body = document.getElementsByTagName('body')[0];
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  useEffect(() => {
    body.setAttribute('id', darkMode ? 'dark' : 'light');
  }, [darkMode, body]);

  useEffect(() => {
    return () => {
      console.log('eiii');
    };
  }, []);

  // eslint-disable-next-line func-names
  window.addEventListener('beforeunload', function (event) {
    console.log(event);
  });

  // window.BeforeUnloadEvent()
  const event = () => {
    console.log('golosa');
  };

  return (
    <div className="App full-height" BeforeUnloadEvent={event}>
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/download" component={DownloadApp} />
        <Route exact path="/edit profile" component={SettingsProfile} />
        <Route
          exact
          path="/collections tags/:type?"
          component={SettingsCollections}
        />
        <Route exact path="/home" component={Home} />
        <Route exact path="/trash" component={Home} />
        <Route exact path="/archive" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
