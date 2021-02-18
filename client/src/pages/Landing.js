import '../css/Landing.css';
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import {getUser, signUp, signIn, signOut, confirmSignUp} from "../components/auth/AWS";
const Landing = () => {
  const [user,setUser]= useState({connected:false});
  useEffect(()=>{    
    checkUser();
  }, []);
  
  function checkUser(){
    getUser() 
    .then((res)=>{
      setUser(res);
      console.log(user);
      console.log(res);
    })
    .catch(err=>{
      console.log("ERR "+err);
      let unconnected={connected:false};
      setUser(unconnected);
    });
    console.log(user.connected);
  }
  return (
    <>
      <NavBar user={user} checkUser={checkUser}/>
      <div className="main">
          {user.connected===false ? (
            <Link to="login">
              <button>Login</button>
            </Link>  
          ) : (
            <Link to="/test">
            <button>
              Hello and welcome, {user.username} !</button>
            </Link>
          )}
        </div>
    </>
  );
};

export default Landing;
