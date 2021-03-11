import { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AWSContext from "../../context/auth/AWSContext";
// import { Auth } from 'aws-amplify';
// import AuthContext from "../../context/auth/authContext";
interface PrivateRouteProps {
  // tslint:disable-next-line:no-any
  component: any,
  user:any,
  path:string
}

const PrivateRoute = (props:PrivateRouteProps) => {
  
  const awsContext = useContext(AWSContext); 
  console.log("props");
  console.log(props.user);

  useEffect(()=>{
    if(!awsContext.user) 
      {
        console.log("NOTHING");
        awsContext.checkUser();
    }
    else{      
      console.log("Something");
      console.log(awsContext.user);
    }  
  }, []);

  const { component: Component, user, ...rest } = props;
  
  console.log("aws");
  console.log(user);
  // const { isAuthenticated, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
          !user.username ? (
          <Redirect to="/register" {...props}/>
        ) : (
          <Component {...props} user={user}/>
        )
      }
    />
    // <h1>
    //   {user.username?("HELLO!"):("GOODBYE")}
    // </h1>
  );
};

export default PrivateRoute;
