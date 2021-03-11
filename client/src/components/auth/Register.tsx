

import React, { useContext, useState, useEffect, Fragment } from "react";
import NavBar from "../NavBar";
import Book from "../Book";
import AlertContext from "../../context/alert/alertContext";
import AWSContext from "../../context/auth/AWSContext";
import S3 from "../../utils/S3";
import UserImage from "../UserImage";
import "../../css/register.css"
import { Auth } from 'aws-amplify';
const Register = () => {
  const alertContext = useContext(AlertContext); 
  const awsContext = useContext(AWSContext); 
  const [characterImage, setUserPic] = useState("https://lexicon-image-storage.s3.amazonaws.com/testImage/optional.jpg");
  const { setAlert } = alertContext;
  const { user:awsUser } = awsContext;
  const userDirectory="testImage";

  const [user, setUser] = useState({
    playerName: "",
    email: "",
    password: "",
    password2: "",
    characterName:""
  });

  const { playerName, email, password, password2, characterName } = user;
  let submitting:boolean=false;
  const onChange = (e:any) => setUser({ ...user, [e.target.name]: e.target.value });

  const uploadFile=(e:any)=>{
    e.preventDefault();
    // check to make sure there is now a file to upload
    // and then:
    S3.addPhoto(userDirectory) 
    .then((res:any)=>{
      console.log(res);
      setUserPic(res.Location);
    })
    .catch(()=>{
      // User did not select a photo (perhaps that chose "Cancel" in the file manager)
      return false;    
    })
  }

  const onSubmit = (e:any) => {
    e.preventDefault();
    if (playerName === "" || characterName === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      if(submitting){        
        // is submitting is true, then the user has hit submit once already.
        // don't do anything--we don't want to flood the system with login calls.
      }
      else{
        submitting=true;
        console.log("submitting!");
        // Turn on loading image
        (document.getElementsByClassName("frame") as HTMLCollectionOf<HTMLElement>)[0].style.display="block";
        let username=playerName;
        Auth.signUp({
          username,
          password,
          attributes: {email, "custom:characterImage":characterImage, "custom:characterName":characterName}
        })
        .then((res)=>{      
          console.log(res);
          submitting=false;
          // Turn off loading image
          (document.getElementsByClassName("frame") as HTMLCollectionOf<HTMLElement>)[0].style.display="hidden";
          window.location.href = '/confirm';         
        })
        .catch((err)=>{        
          // Turn off loading image
          (document.getElementsByClassName("frame") as HTMLCollectionOf<HTMLElement>)[0].style.display="hidden";  
          console.log(err);
        });
      }
    }
  };
  let minPasswordLength = 6;
  return (
    <>
      <NavBar />
      <Book display={submitting} />
      <div className="reg-main">
        <form onSubmit={onSubmit}>
        <div className="reg-form user-form">
          <label htmlFor="playerName">Player Name</label>
          <input
          type="text"
          name="playerName"
          value={playerName}
          onChange={onChange}
          required
          placeholder="Jane Smith"
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
          minLength={minPasswordLength} 
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
          minLength={minPasswordLength}
          placeholder="Confirm Password"
          autoComplete="on" 
          />
        </div>
        <div className="reg-form char-form">
          <label htmlFor="photoupload">Character Image (optional)</label>
          <input id="photoupload"  name="photoupload" onChange={uploadFile} type="file" accept="image/*" />
          <UserImage image={characterImage}/> 
          <label htmlFor="characterName">Character Name</label>
          <input
          type="text"
          name="characterName"
          value={characterName}
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
