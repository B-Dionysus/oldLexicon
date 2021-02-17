import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
interface PrivateRouteProps {
  // tslint:disable-next-line:no-any
  component: any,
  path:string
}
const PrivateRoute = (props:PrivateRouteProps) => {
  
  const authContext = useContext(AuthContext);
  const { component: Component, ...rest } = props;
  const { isAuthenticated, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/register" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
