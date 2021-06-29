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

  const[role,setRole]=useState("User");

  let history = useHistory();

  const handleLogin = (user : User) => {
    setUser(user);
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("role");    
    history.push("/login");
  }

  const updateRole=(role:string)=>{
    setRole(role);
  }

  return (
    <div>
      <Header isLoggedIn = {isLoggedIn} user = {user} onLogout = {handleLogout}  
      role={role} updateRole = {updateRole}/>
      <Switch>
        <Route path = "/login" component = {() => <Home onLogin = {handleLogin}/>} />
        <Route path = "/select-profile" > <ProfileSelection updateRole={updateRole} isLoggedIn={isLoggedIn}/> </Route>
        <Route path = "/set-availability"> <SetAvailabilityComponent history={history} /></Route>
        <Route path = '/user-profile' > <UserProfileTabsComponent history={history}
                               isLoggedIn = {isLoggedIn} user = {user}/></Route> 
         <Route path = "/book-interview" ><BookInterview isLoggedIn={isLoggedIn}/> </Route>   
         <Route path ="/my-interviews"    component ={MyInterviewComponent}     />         
       
        <Redirect from = "" to = "/login" />
      </Switch>
    </div>
  );
}

export default App;
