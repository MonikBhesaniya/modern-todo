import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TaskList from "./TaskList";
import DropBox from "./DropBox";
import Alert from "../layout/Alert";
import { connect } from "react-redux";
import { getTasks } from "../../actions/task";
import { loadUser } from "../../actions/auth";

const Dashboard = ({ getTasks, loadUser }) => {
  const [mode, setMode] = useState({
    open: "",
    create: true,
    id: "",
    current: "work",
  });

  useEffect(() => {
    loadUser();
    getTasks();
  }, [getTasks, loadUser]);

  const onClick = (e) => {
    document.querySelector(".current").classList.remove("current");
    e.target.classList.add("current");
    let catagory = e.target.innerText.toLowerCase();
    setMode({ ...mode, current: catagory });
    document.querySelector(".burger").click();
  };

  const toggleSidebar = (e) => {
    e.target.classList.toggle("cross");
    document.querySelector(".sidebar").classList.toggle("open");
    document.querySelector(".task-board").classList.toggle("disabled");
  };

  return (
    <Fragment>
      <DropBox mode={mode} setMode={setMode} />
      <div className="container">
        <main id="dashboard">
          <div className="sidebar">
            <ul>
              <li onClick={(e) => onClick(e)} className="current">
                Work
              </li>
              <li onClick={(e) => onClick(e)}>Personal</li>
              <li onClick={(e) => onClick(e)}>Daily</li>
              <li onClick={(e) => onClick(e)}>Miscellaneous</li>
            </ul>
          </div>
          <div className="task-board">
            <Alert />
            <div className="burger" onClick={(e) => toggleSidebar(e)}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
            <div className="create-new">
              <input
                type="button"
                onClick={() =>
                  setMode({ ...mode, create: true, open: "box-open" })
                }
                value="Create"
                id="create"
              />
            </div>
            <TaskList mode={mode} setMode={setMode} />
          </div>
        </main>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getTasks: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

export default connect(null, { getTasks, loadUser })(Dashboard);
