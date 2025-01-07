import { Route, Redirect } from 'react-router-dom';

/* export const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Route {...rest} render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
    );
}; */

export const PrivateRoute = props => {
  const user = null;

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
};