import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { Link } from "react-router-dom";
import {getUser, signUp, signIn, signOut, confirmSignUp} from "../components/auth/AWS";
const Landing = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  function reg(){
    signUp("Benjamin", "password", "b@sixbynine.com");
  }
  function login(){
    signIn("Benjamin", "password")
  }
  function confirm(){
    confirmSignUp("Benjamin", "140034")
  }
  function get(){
    getUser().then(res=>{
      console.log(res);
    })
  }
  return (
    <navBar>
      
      <button onClick={reg}>Register (AWS)</button>
      <button onClick={login}>Login (AWS)</button>
      <button onClick={signOut}>Logout (AWS)</button>
      <button onClick={confirm}>Confirm (AWS)</button>
      <button onClick={get}>Get User(AWS)</button>
                {!user ? (
            <Link to="login">
              <button>Login</button>
            </Link>  
          ) : (
            <Link to="/test">
            <button>
              Hello and welcome!</button>
            </Link>
          )}
    </NavBar>
  );
};

export default Landing;
