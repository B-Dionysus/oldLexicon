import '../css/Landing.css';
import { useState, useContext, useEffect } from "react";

import AWSContext from "../context/auth/AWSContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
const Landing = (props) => {  
  const awsContext = useContext(AWSContext); 
  const {user} = awsContext;
  
  return (
    <>
      <NavBar />
      <div className="main">
          {!user.username ? (
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
        <div className="cloud cloud1" /> 
        <div className="cloud cloud2" /> 
    </>
  );
};

export default Landing;
