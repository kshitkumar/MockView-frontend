import { useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import UserProfileTabsComponent from './components/UserProfile/UserProfileComponent';
import ProfileSelection from './components/ProfileSelection/ProfileSelection';
import { User } from './models/User';
import SetAvailabilityComponent from './components/Interviewer/SetAvailabilityComponent';
import BookInterview from './components/BookInterview/BookInterview';
import MyInterviewComponent from './components/MyInterview/MyInterviewComponent';


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
    window.sessionStorage.removeItem("user");
    
    history.replace("/home");
  }

  return (
    <div>
      <Header isLoggedIn = {isLoggedIn} user = {user} onLogout = {handleLogout}/>
      <Switch>
        <Route path = "/login" component = {() => <Home onLogin = {handleLogin}/>} />
        <Route path = "/select-profile" component = {ProfileSelection} />
        <Route path = "/set-availability"> <SetAvailabilityComponent history={history} /></Route>
        <Route path = '/user-profile' > <UserProfileTabsComponent history={history}
                               isLoggedIn = {isLoggedIn} user = {user}/></Route> 
         <Route path = "/book-interview" component = {BookInterview} />    
         <Route path ="/my-interviews"    component ={MyInterviewComponent}     />         
       
        <Redirect from = "" to = "/login" />
      </Switch>
    </div>
  );
}

export default App;
