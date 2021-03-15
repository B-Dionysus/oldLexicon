import './css/App.css';

// AWS Auth components
import Amplify, {Auth} from 'aws-amplify';

import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Auth context states
import AWSContext from "./context/auth/AWSContext";

import AlertState from "./context/alert/AlertState";
import PrivateRoute from "./components/routing/PrivateRoute";
// // auth components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Confirm from "./components/auth/Confirm";
import Alert from "./utils/Alerts";

// Pages
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import Test from "./pages/Test";
import awsconfig from './aws-exports'; 
Amplify.configure(awsconfig);


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
      setUser({"status":"NONE"});
    });
    console.log(user);
  }

  return (
    <div className="App">
      <header className="App-header">
        <AWSContext.Provider value={{user:user, checkUser:checkUser}}>
          <AlertState>
              <Router>
                <Alert />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/confirm" component={Confirm} />
                <Route exact path="/login" component={Login} />            
                <PrivateRoute path="/admin" user={user} component={Admin}/>        
                <PrivateRoute path="/test" user={user} component={Test}/>        
              </Router>
          </AlertState>
        </AWSContext.Provider>
      </header>
    </div>
  );
}

export default App;
