import React from 'react';

import { Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'
import './index.css'

import SettingsApp from './Containers/SettingsApp';
import Login from './Components/Login';
import ResetPassword from './Components/ResetPassword';
import SignUp from './Components/SignUp';
import Inicio from './Components/Inicio';
import DownloadApp from './Components/DownloadApp';
import SettingsProfile from './Containers/SettingsProfile';
import SettingsCollections from './Containers/SettingsCollections';
import Home from './Containers/Home';

//import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App full-height">
      <Switch>
        <Route exact path="/" component={Inicio}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/reset-password" component={ResetPassword}/>
        <Route exact path="/sign-up" component={SignUp}/>
        <Route exact path="/download" component={DownloadApp}/>
        <Route exact path="/edit profile" component={SettingsProfile}/>
        <Route exact path="/settings app" component={SettingsApp}/>
        <Route exact path="/collections tags" component={SettingsCollections}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/trash" component={Home}/>
        <Route exact path="/archive" component={Home}/>
      </Switch>
    </div>
  );
};

export default App;
