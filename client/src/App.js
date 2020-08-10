import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import { loadUser } from "./actions/auth";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
