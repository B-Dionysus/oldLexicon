import '../css/Landing.css';
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
// import {getUser, signUp, signIn, signOut, confirmSignUp} from "../components/auth/AWS";
const Landing = (props) => {
  
  useEffect(()=>{
    console.log(props.user);
  },[props])
  return (
    <>
      <NavBar user={props.user} checkUser={props.checkUser}/>
      <div className="main">
          {!props.user.username ? (
            <Link to="login">
              <button>Login</button>
            </Link>  
          ) : (
            <Link to="/test">
            <button>
              Hello and welcome, {props.user.username} !</button>
            </Link>
          )}
        </div>
    </>
  );
};

export default Landing;
