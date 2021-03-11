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
    <nav className="nav">
      
      <NavLink to="/">
        <span  className="">Home Page</span>
      </NavLink>
      
      <NavLink to="/test">
        <span  className="">Secret Page</span>
      </NavLink>
      {!user || !user.username ? 
      (
        <>
          <span className="">
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
        <>
          <NavLink to="admin">Admin</NavLink>  
          <span className="navButton" onClick={logout}>Logout (AWS)</span>
        </>
      )}
    </nav>
  );
};

export default NavBar;
