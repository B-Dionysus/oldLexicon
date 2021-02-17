import React, { Fragment, useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { Link } from "react-router-dom";
const Landing = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
<div className="">
  Hello!
</div>
  );
};

export default Landing;
