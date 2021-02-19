import './css/App.css';
import { Auth } from 'aws-amplify';
import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Auth context states
// Many thanks to Owen Roth for demoing this code (and all the rest of the auth code here) for me in bootcamp!
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
// import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
// // auth components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./utils/Alerts";

// Pages
import Landing from "./pages/Landing";
import Test from "./pages/Test";

// AWS Auth components
import Amplify from 'aws-amplify';
// import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'; 
Amplify.configure(awsconfig);

// Put login token in local storage
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

function App() {

  const [user,setUser]= useState({});
  useEffect(()=>{    
    checkUser();
  }, []);
  
  function checkUser(){
    Auth.currentAuthenticatedUser()
    .then((res)=>{
      setUser(res);
    })
    .catch(err=>{
      console.log("ERR "+err);
      setUser({});
    });
    console.log(user);
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <AuthState>
          <AlertState>
              <Router>
              <Alert />
                  <Route exact path="/" render={(props)=>(<Landing {...props} user={user} checkUser={checkUser}/>)} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />            
                  <PrivateRoute path="/test" user={user} component={Test}/>        
              </Router>
          </AlertState>
        </AuthState>
      </header>
    </div>
  );
}

export default App;
