import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const SignUp = ({ isAuthenticated, setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form className="form" onSubmit={(e) => onSubmit(e)} action="#">
      <div className="form-input">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          minLength="8"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          minLength="8"
          value={password2}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Sign Up" />
    </form>
  );
};

SignUp.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps, { setAlert, register })(SignUp);
