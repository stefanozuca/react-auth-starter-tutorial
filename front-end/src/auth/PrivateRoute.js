import { Route, Redirect } from 'react-router-dom';
import { useUser } from './useUser';

/* export const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Route {...rest} render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
    );
}; */

export const PrivateRoute = props => {
  const user = useUser();

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};