import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import UserProfileTabsComponent from './components/UserProfile/UserProfileComponent';
import ProfileSelection from './components/ProfileSelection/ProfileSelection';
import { Stack,VStack} from "@chakra-ui/react";

function App() {
  return (
    <VStack>
      <Header />
      <Switch>
        <Route path = "/home" component = {Home} />
        <Route path = "/select-profile" component = {ProfileSelection} />y
        <Route path = '/user-profile' component = {UserProfileTabsComponent}/>
        <Redirect from = "" to = "/home" />
      </Switch>
    </VStack>
  );
}

export default App;
