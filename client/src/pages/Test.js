import { Fragment, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
const Test = (props) => {
  // const authContext = useContext(AuthContext);

  console.log(props);
  // const { user } = authContext;
  useEffect(() => {
    // authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar user={props.user}/>
      <div className="">
        Hello!
      </div>
    </> 
  );
};

export default Test;
