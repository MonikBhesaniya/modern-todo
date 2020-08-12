import React, { useState } from "react";
import PropTypes from "prop-types";
import { createTask, updateTask, getTasks } from "../../actions/task";
import { connect } from "react-redux";

const DropBox = ({ mode, setMode, createTask, updateTask, tasks }) => {
  const { create, id, current, open } = mode;

  const [formdata, setFormData] = useState({
    title: "",
    catagory: "",
    defaultCatagory: "",
    editMode: true,
  });
  const { title, catagory, defaultCatagory, editMode } = formdata;

  const target = tasks.filter((task) => task._id === id);

  if (create && defaultCatagory !== current) {
    setFormData({ ...formdata, catagory: current, defaultCatagory: current });
  }

  if (!create && editMode) {
    setFormData({
      ...formdata,
      catagory: target[0].catagory,
      editMode: !editMode,
      title: target[0].title,
    });
  }

  const onChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (create) {
      createTask(title, catagory);
    } else {
      updateTask({ title, catagory, _id: id }, target[0].isCompleted);
    }
    closeBox();
  };

  const closeBox = () => {
    setFormData({ ...formdata, title: "", editMode: true });
    setMode({ ...mode, create: true, open: "" });
  };

  return (
    <div className={`drop-box ${open}`}>
      <div>
        <h2>{create ? "Create a task" : "Edit the task"}</h2>
        <form action="#" onSubmit={(e) => onSubmit(e)} className="create-task">
          <input
            type="text"
            placeholder="Enter the task (e.g. workout)"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
          <select
            name="catagory"
            id="catagory"
            value={catagory}
            onChange={(e) => onChange(e)}
            required
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="daily">Daily</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          <input type="submit" value={create ? "Create" : "Edit"} />
          <input type="reset" value="Cancel" onClick={() => closeBox()} />
        </form>
      </div>
    </div>
  );
};

DropBox.propTypes = {
  mode: PropTypes.object.isRequired,
  setMode: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
});

export default connect(mapStateToProps, { createTask, updateTask })(DropBox);
