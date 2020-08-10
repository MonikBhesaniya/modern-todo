import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SignUp from "./SignUp";
import Login from "./Login";

const Auth = ({ isSignUp }) => {
  return <Fragment>{isSignUp ? <SignUp /> : <Login />}</Fragment>;
};

Auth.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
};

export default Auth;
