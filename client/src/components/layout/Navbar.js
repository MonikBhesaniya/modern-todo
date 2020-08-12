import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({
  logout,
  auth: {
    isAuthenticated,
    loading,
    user: { name, avatar },
  },
}) => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="">
          <i className="fa fa-tasks"></i> ToDo
        </Link>
      </h1>
      {isAuthenticated && !loading && (
        <div className="user">
          <Link to="" className="logout" onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </Link>
          <Link className="hide-sm" to={"/me"}>
            <img src={avatar} alt="img" id="avatar" />
            <span>{name}</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
