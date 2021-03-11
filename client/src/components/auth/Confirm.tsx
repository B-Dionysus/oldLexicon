import React, { useContext, useState, useEffect, Fragment } from "react";
import NavBar from "../NavBar";
import Book from "../Book";
import AlertContext from "../../context/alert/alertContext";
import AWSContext from "../../context/auth/AWSContext";
import S3 from "../../utils/S3";
import UserImage from "../UserImage";
import "../../css/confirm.css"
import { Auth } from 'aws-amplify';
const Confirm = () => {
  const alertContext = useContext(AlertContext); 
  const awsContext = useContext(AWSContext); 
  const { setAlert } = alertContext;
  const { user:awsUser } = awsContext;
  console.log(awsUser);
  function onSubmit(e:any){
    e.preventDefault();
    let username:string=(document.getElementById("username") as HTMLInputElement).value;
    Auth.resendSignUp(username)
    .then(()=>{
        
      setAlert("Email resent", "success");
    })
    .catch((err)=>{
      setAlert(err.message, "danger");
    })
  }
 
  return (
    <>
      <NavBar />
      <div className="confirm-main">
        <div className="pad" />
        <div className="box">
          <p>You should haver received an email from benjaminDionysus@benjaminDionys.us with a link to confirm your email. </p>
          <p>Please click that link. Alternatively, click here to send the email again:</p>
          <form onSubmit={onSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" required />
            <input type="submit" />
          </form>
        </div>
        <div className="pad" />
      </div> 
      <div className="cloud cloud2"/>       
    </>
  );
};

export default Confirm;
