import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Link,NavLink, Route  } from 'react-router-dom' ;
import UserProfileTabsComponent from './components/userprofile/userprofiletabscomponent';


function App() {
  return (   
    <BrowserRouter>
      <Route path = '/lele' component = {UserProfileTabsComponent}/>
    </BrowserRouter>
  );
}

export default App;
