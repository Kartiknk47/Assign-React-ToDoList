import React from "react";

// export const initialState = [];

const taskReducers = (state, action) => {
  switch ((action.type)) {
    case "addTask":
      const newTask = {
        id:Date.now(),
        taskName: action.payload.taskName,
        taskDescription: action.payload.taskDescription,
      };
      // state.push(newTask)
      return [...state, newTask];
    case "deleteTask":
        // state.pop();
      return state.filter(task=>task.id !== action.payload);
    case "editTask":
      return state;
    case 'toggleComplete':
        return state;
    default:
      return state;
  }
};

export default taskReducers;
