import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../../actions/task";

const Task = ({
  task,
  task: { title, isCompleted, _id },
  mode,
  setMode,
  deleteTask,
  updateTask,
}) => {
  const editClick = (id) => {
    setMode({ ...mode, open: "box-open", create: false, id: id.toString() });
  };

  const deleteClick = (id) => {
    deleteTask(id.toString());
  };

  const onChange = (e) => {
    updateTask(task, e.target.checked);
  };

  return (
    <div className="task">
      <div className="task-content">
        <input
          type="checkbox"
          defaultChecked={isCompleted}
          onChange={(e) => onChange(e)}
        />
        <p>{title}</p>
      </div>
      <div className="buttons">
        <input
          type="button"
          value="Edit"
          onClick={() => editClick(_id)}
          id="edit"
        />
        <input
          type="button"
          value="Delete"
          onClick={() => deleteClick(_id)}
          id="delete"
        />
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteTask, updateTask })(Task);
