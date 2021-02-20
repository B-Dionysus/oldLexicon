import { useContext } from "react";
import '../css/navBar.css';
import { NavLink } from "react-router-dom";
import {signUp} from "./auth/AWS";
import { Auth } from 'aws-amplify';
import AWSContext from "../context/auth/AWSContext";

const NavBar = () => {

  const awsContext = useContext(AWSContext); 
  let user=awsContext.user;
  
  async function logout(){
    try {
        await Auth.signOut();
        awsContext.checkUser();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
  return (
    <nav className="pure-g nav">
      
      <NavLink to="/">
        <span  className="pure-u-1-3">Home Page</span>
      </NavLink>
      
      <NavLink to="/test">
        <span  className="pure-u-1-3">Secret Page</span>
      </NavLink>
      {!user || !user.username ? 
      (
        <>
          <span className="pure-u-1-3">
            <NavLink to="login">
              Login
            </NavLink>  
          </span>
          
          <NavLink to="register">
              Register
          </NavLink>  
        </>
      ) : 
      (
        <span className="pure-u-1-3" onClick={logout}>Logout (AWS)</span>
      )}
    </nav>
  );
};

export default NavBar;
