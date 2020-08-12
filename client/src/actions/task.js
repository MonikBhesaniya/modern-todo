import axios from "axios";
import {
  TASK_CREATED,
  GET_TASKS,
  TASK_EDITED,
  TASK_DELETED,
  TASK_ERROR,
} from "./types";
import { setAlert } from "./alert";

// get all tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/task");

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create a new task
export const createTask = (title, catagory) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ title, catagory });

  try {
    const res = await axios.post("/api/task", body, config);
    dispatch({
      type: TASK_CREATED,
      payload: res.data,
    });
    dispatch(setAlert("Task Created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update task
export const updateTask = (task, isCompleted) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { title, catagory, _id } = task;

  const body = JSON.stringify({ title, catagory, isCompleted });

  try {
    const res = await axios.put(`/api/task/${_id}`, body, config);
    dispatch({
      type: TASK_EDITED,
      payload: res.data,
    });
    dispatch(setAlert("Task Edited", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete a task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/task/${id}`);

    dispatch({
      type: TASK_DELETED,
      payload: id,
    });
    dispatch(setAlert("Task removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
