import { useState, useContext, useEffect, Fragment } from "react";
import NavBar from "../NavBar";
import Book from "../Book";
// import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
// import styled from "styled-components";
// import Nav from "../layout/Nav";

const Login = (props:any) => {
  let submitting:boolean=false; // We want to avoid submitted user information while waiting for a response from AWS
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then(()=>{
      // Unlikely that we would ever be here--if the user is logged in, how did they get to Login.tsx?
      props.history.push("/");
    })
    .catch(()=>{
      // No need to do anything with this error, because we are expecting it--this is the login page, after all!
    })
    // eslint-disable-next-line
  }, []);

  interface userEntry{
    connected:boolean;
    username:string;
    password:string;
  }

  const [userEntry, setUser] = useState({username:"", password:"", connected:false});

  const { username, password } = userEntry;

  const onChange = (e:any) => setUser({ ...userEntry, [e.target.name]: e.target.value });

  const onSubmit = (e:any) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } 
    if(submitting){
        // is submitting is true, then the user has hit submit once already.
        // don't do anything--we don't want to flood the system with login calls.
    }else {
      submitting=true;
      // Turn on loading image
      (document.getElementsByClassName("frame") as HTMLCollectionOf<HTMLElement>)[0].style.display="block";

      Auth.signIn(username, password)
      .then((res)=>{ 
        console.log(res);
        submitting=false;
      // Turn off loading image
      (document.getElementsByClassName("frame") as HTMLCollectionOf<HTMLElement>)[0].style.display="hidden";
        window.location.href = '/'; 
      })
      .catch(err=>{        
        (document.getElementsByClassName("frame") as HTMLCollectionOf<HTMLElement>)[0].style.display="hidden";
        if(err.code==="UserNotConfirmedException"){
          window.location.href = '/confirm';         
        }
        else {
        console.log(err);
        setAlert(err.message, "danger");
        }
      })
    }
  };

  return (
    <Fragment>
        <Book display={submitting} />
        <NavBar />
        <div className="form-container main">
          <h1>
            Account <span>Login</span>
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="username"></label>
              <input
                type="username"
                name="username"
                value={username}
                onChange={onChange}
                required
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                autoComplete="off"
                value={password}
                onChange={onChange}
                required
                placeholder="Password"
              />
            </div>
            <input type="submit" value="Login" className="btn" />
          </form>
          
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
    </Fragment>
  );
};
export default Login;
