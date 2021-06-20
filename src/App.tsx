import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import UserProfileTabsComponent from './components/userprofile/userprofiletabscomponent';
import ProfileSelection from './components/ProfileSelection/ProfileSelection';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path = "/home" component = {Home} />
        <Route path = "/select-profile" component = {ProfileSelection} />y
        <Route path = '/user-profile' component = {UserProfileTabsComponent}/>
        <Redirect from = "" to = "/home" />
      </Switch>
    </div>
  );
}

export default App;
