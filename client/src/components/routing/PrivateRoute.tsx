import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
// import { Auth } from 'aws-amplify';
// import AuthContext from "../../context/auth/authContext";
interface PrivateRouteProps {
  // tslint:disable-next-line:no-any
  component: any,
  user:any,
  path:string
}

const PrivateRoute = (props:PrivateRouteProps) => {
  
  console.log(props.user);
  // useEffect(()=>{
  //   if(!user && !props.user) 
  //     console.log("NOTHING");
  //   else{      
  //     console.log(props.user);
  //   }  
  // }, [])
  // const authContext = useContext(AuthContext);
  const { component: Component, user, ...rest } = props;
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
