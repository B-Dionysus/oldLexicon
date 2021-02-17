import React, { useContext, useState, useEffect, Fragment } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import S3 from "../../utils/S3";
import UserImage from "../UserImage";
// import Nav from "../layout/Nav";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const [userPic, setUserPic] = useState("https://capestylemag.com/wp-content/uploads/2017/11/missing.jpg");
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const userDirectory="testImage";
  useEffect(() => {
    if (isAuthenticated) { 
      props.history.push("/");
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

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
      register({ playerName, email, password, charName, userPic});
    }
  };

  return (
    <Fragment>
      <div className="pure-g">
        <div className="pure-u-1-4"></div>
        <form>
        <div className="pure-u-1-4">
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
        <div className="pure-u-1-4">
          <label htmlFor="photoupload">Character Image (optional)</label>
          <input id="photoupload"  name="photoupload" onChange={uploadFile} type="file" accept="image/*" />
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
        
        <div className="pure-u-1-4"></div>
        <div className="pure-g">
          <input type="submit" value="Register" className="btn" />
        </div>
      </form>      
    </div> 
    <div>
      <UserImage image={userPic}/> 
    </div>
    </Fragment>
  );
};

export default Register;
