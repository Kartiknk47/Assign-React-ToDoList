import React, { useReducer, useState } from "react";
import taskReducers from "../reducers/taskReducers";
import "./AddTask.css";

const AddTask = ({ initialState }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [state, dispatch] = useReducer(taskReducers, initialState);

  const HandleDelete = (id) => {
    dispatch({ type: "deleteTask", payload: id });
  };

  const HandleToggle = (id) => {
    dispatch({ type: "toggleComplete", payload: id });
  };

  const HandleEdit = (task) => {
    setEditId(task.id);
    setEditName(task.taskName);
    setEditDescription(task.taskDescription);
  };

  const HandleSaveEdit = () => {
    if (!editName || !editDescription) {
      alert("Please enter task details before saving.");
      return;
    }

    dispatch({
      type: "editTask",
      payload: {
        id: editId,
        taskName: editName,
        taskDescription: editDescription,
      },
    });

    setEditId(null);
    setEditName("");
    setEditDescription("");
  };

  return (
    <>
      <div className="container shadow mt-5 p-4">
        <h1 className="text-center">📝 To-Do Application</h1>

        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">
            Task Name
          </label>
          <input
            type="text"
            className="form-control"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="taskDiscri" className="form-label">
            Task Description
          </label>
          <input
            type="text"
            className="form-control"
            id="taskDiscri"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={() => {
            if (!taskName || !taskDescription) {
              alert("Please enter both task name and description.");
              return;
            }
            dispatch({
              type: "addTask",
              payload: {
                id: Date.now(),
                taskName,
                taskDescription,
                completed: false,
              },
            });
            setTaskName("");
            setTaskDescription("");
          }}
        >
          Add Task
        </button>
      </div>

      <div className="container mt-5">
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.map((task, index) => (
              <tr key={task.id}>
                <th>{index + 1}</th>
                <td style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {editId === task.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    task.taskName
                  )}
                </td>
                <td>
                  {editId === task.id ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    task.taskDescription
                  )}
                </td>
                <td>
                  {editId === task.id ? (
                    <>
                      <button className="btn btn-success me-2" onClick={HandleSaveEdit}>
                        Save
                      </button>
                      <button className="btn btn-secondary" onClick={() => setEditId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary me-2" onClick={() => HandleToggle(task.id)}>
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                      <button className="btn btn-warning me-2" onClick={() => HandleEdit(task)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => HandleDelete(task.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddTask;
