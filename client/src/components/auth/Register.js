

import React, { useContext, useState, useEffect, Fragment } from "react";
import NavBar from "../NavBar";
import AlertContext from "../../context/alert/alertContext";
import AWSContext from "../../context/auth/AWSContext";
import S3 from "../../utils/S3";
import UserImage from "../UserImage";
import "../../css/register.css"
const Register = (props) => {
  const alertContext = useContext(AlertContext); 
  const awsContext = useContext(AWSContext); 
  const [userPic, setUserPic] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");
  const { setAlert } = alertContext;
  const { user:awsUser } = awsContext;
  const userDirectory="testImage";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { playerName, email, password, password2, charName } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const uploadFile=(e)=>{
    // check to make sure there is now a file to upload
    // and then:
    S3.addPhoto(userDirectory) 
    .then((res)=>{
      console.log(res);
      setUserPic(res.Location);
    })
    .catch((err)=>{
      // User did not select a photo (perhaps that chose "Cancel" in the file manager)
      return false;    
    })
    // Please don't forget to add tests!
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (playerName === "" || charName === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      // register({ playerName, email, password, charName, userPic});
    }
  };

  return (
    <>
      <NavBar />
      <div className="reg-main">
        <form>
        <div className="reg-form user-form">
          <label htmlFor="playerName">Player Name</label>
          <input
          type="text"
          name="playerName"
          value={playerName}
          onChange={onChange}
          required
          placeholder="John Smith"
          />
          <label htmlFor="email">Email</label>
          <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          placeholder="Smith@john.com"
          />
          <label htmlFor="password">Password</label>
          <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
          minLength="6"
          placeholder="Password"                
          autoComplete="on" 
          />
          <label htmlFor="password2">Confrim Password</label>
          <input
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
          required
          minLength="6"
          placeholder="Confirm Password"
          autoComplete="on" 
          />
        </div>
        <div className="reg-form char-form">
          <label htmlFor="photoupload">Character Image (optional)</label>
          <input id="photoupload"  name="photoupload" onChange={uploadFile} type="file" accept="image/*" />
          <UserImage image={userPic}/> 
          <label htmlFor="charName">Player Name</label>
          <input
          type="text"
          name="charName"
          value={charName}
          onChange={onChange}
          required
          placeholder="Dr. Prextron Deviatree"
          />
        </div>        
        <div className="">
          <input type="submit" value="Register" className="btn" />
        </div>
      </form>      
    </div> 
    <div>
      <div className="cloud cloud2"/> 
    </div>
    </>
  );
};

export default Register;
