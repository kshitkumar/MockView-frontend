import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import ProfileSelection from './components/ProfileSelection/ProfileSelection';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path = "/home" component = {Home} />
        <Route path = "/select-profile" component = {ProfileSelection} />
        <Redirect from = "" to = "/home" />
      </Switch>
    </div>
  );
}

export default App;
