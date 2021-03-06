import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Pages} from "../../const.js";

const PrivateRoute = (props) => {
  const {render, path, exact, progressAuth, authorizationStatus} = props;
  const isAuth = authorizationStatus !== AuthorizationStatus.NO_AUTH;
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps)=> {
        if (isAuth && progressAuth) {
          return render(routeProps);
        } else if (!progressAuth) {
          return ``;
        } else if (progressAuth && !isAuth) {
          return <Redirect to={`${Pages.LOGIN}`} />;
        }
        return ``;
      }}/>
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  progressAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
  progressAuth: state.USER.authorizationInProgress
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
