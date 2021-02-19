// import { useContext, useEffect } from "react";
import '../css/navBar.css';
import { NavLink } from "react-router-dom";
import {signUp} from "./auth/AWS";
import { Auth } from 'aws-amplify';

const NavBar = (props:any) => {

  let user=props.user;
  function reg(){
    signUp("Benjamin", "password", "b@sixbynine.com");
  }
  function login(){
    try {
      Auth.signIn("Benjamin", "password")
      .then(()=>props.checkUser());
    }
    catch (error) {
        console.log('error signing in', error);
    }
    
  }
  async function logout(){
    try {
        await Auth.signOut();
        props.checkUser();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
  return (
    <nav className="pure-g nav">
      
      <NavLink to="/test">
        <span  className="pure-u-1-3">Secret Page</span>
      </NavLink>
      {!user || !user.username ? 
      (
        <>
          <span className="pure-u-1-3" onClick={login}>Login (AWS)</span>
          <span className="pure-u-1-3" onClick={reg}>Register (AWS)</span>
        </>
      ) : 
      (
        <span className="pure-u-1-3" onClick={logout}>Logout (AWS)</span>
      )}
    </nav>
  );
};

export default NavBar;
