import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { connect } from "react-redux";

const TaskList = ({ task: { tasks, loading }, setMode, mode }) => {
  const thisTasks = tasks.filter((task) => task.catagory === mode.current);

  return (
    <div className="task-list">
      <h1 className="heading">
        {mode.current.charAt(0).toUpperCase() + mode.current.slice(1)}
      </h1>
      <div className="tasks">
        {thisTasks.length !== 0 && !loading ? (
          thisTasks.map((task) => (
            <Task key={task._id} task={task} mode={mode} setMode={setMode} />
          ))
        ) : (
          <div className="no-task">
            <h1>
              You have <span>No Tasks</span> in this catagory
            </h1>
            <p>click on create to create a new task</p>
          </div>
        )}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  task: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps)(TaskList);
