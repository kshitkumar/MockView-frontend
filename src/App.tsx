import { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import UserProfileTabsComponent from './components/UserProfile/UserProfileComponent';
import ProfileSelection from './components/ProfileSelection/ProfileSelection';
import { User } from './models/User';
import SetAvailabilityComponent from './components/Interviewer/SetAvailabilityComponent';


function App() {

  const initialState = {
    id : 0,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender:"",
    emailId: "",
    password: "",
    phoneNumber:"",
    profileComplete:false
  };

  const[user, setUser] = useState<User>(initialState);

  const[isLoggedIn, setIsLoggedIn] = useState(false);

  let history = useHistory();

  const handleLogin = (user : User) => {
    setUser(user);
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    history.replace("/home");
  }

  return (
    <div>
      <Header isLoggedIn = {isLoggedIn} user = {user} onLogout = {handleLogout}/>
      <Switch>
        <Route path = "/home" component = {() => <Home onLogin = {handleLogin}/>} />
        <Route path = "/select-profile" component = {ProfileSelection} />
        <Route path = "/set-availability"> <SetAvailabilityComponent isLoggedIn = {isLoggedIn} user = {user}  /></Route>
        <Route path = '/user-profile' > <UserProfileTabsComponent history={history}
                               isLoggedIn = {isLoggedIn} user = {user}/></Route> 
       
        <Redirect from = "" to = "/home" />
      </Switch>
    </div>
  );
}

export default App;
