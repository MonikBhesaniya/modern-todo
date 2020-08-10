import React, { Fragment, useState } from "react";
import Auth from "../auth/Auth";
import Alert from "./Alert";

function Home() {
  const [isSignUp, toggleIsSignUp] = useState(true);

  const toggle = (e) => {
    document.querySelector(".focus").classList.remove("focus");
    e.target.classList.add("focus");
    if (e.target.innerText === "Login") {
      toggleIsSignUp(false);
    } else {
      toggleIsSignUp(true);
    }
  };

  return (
    <div className="container">
      <Alert />
      <div id="landing">
        <div className="landing-inner">
          <h1 className="large">TO DOs</h1>
          <p className="small">Manage Your Daily Tasks Here</p>
        </div>
        <div className="validation">
          <ul>
            <li className="focus" onClick={(e) => toggle(e)}>
              Sign Up
            </li>
            <li onClick={(e) => toggle(e)}>Login</li>
          </ul>
          <Auth isSignUp={isSignUp} />
        </div>
      </div>
    </div>
  );
}

export default Home;
