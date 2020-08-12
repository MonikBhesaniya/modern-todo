import {
  TASK_CREATED,
  GET_TASKS,
  TASK_DELETED,
  TASK_EDITED,
  TASK_ERROR,
} from "../actions/types";

const initialState = {
  tasks: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TASK_CREATED:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        loading: false,
      };

    case GET_TASKS:
      return { ...state, tasks: payload, loading: false };

    case TASK_EDITED:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
        loading: false,
      };

    case TASK_DELETED:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id.toString() !== payload),
        loading: false,
      };

    case TASK_ERROR:
      return { ...state, errors: payload, loading: false };

    default:
      return state;
  }
}
