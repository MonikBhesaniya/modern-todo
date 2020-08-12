import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({ auth: { loading, user } }) => {
  return (
    !loading && (
      <div className="container">
        <main id="profile">
          <Link id="back-btn" to={"/dashboard"}>
            <span>
              <i className="fas fa-chevron-circle-left"></i> Back
            </span>
          </Link>
          <div>
            <div>
              <img className="avatar" src={user.avatar} alt="..." />
            </div>
            <table className="data">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{user.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    )
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
