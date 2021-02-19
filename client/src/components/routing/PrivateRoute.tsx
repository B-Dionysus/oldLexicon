// import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// import AuthContext from "../../context/auth/authContext";
interface PrivateRouteProps {
  // tslint:disable-next-line:no-any
  component: any,
  user:any,
  path:string
}

const PrivateRoute = (props:PrivateRouteProps) => {
  
  console.log(props.user);
  // const authContext = useContext(AuthContext);
  const { component: Component, user, ...rest } = props;
  // const { isAuthenticated, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
          !user.username ? (
          <Redirect to="/register" />
        ) : (
          <Component {...props} user={user}/>
        )
      }
    />
  );
};

export default PrivateRoute;
