import React, { createContext, useReducer } from "react";

export const initialState = [] 

const taskReducers = (state, action)=> {
    switch (action.type) {
        case "addTask":
            return [...state, action.payload]
        case "editTask":
            return state.map((task)=>
            task.id === action.payload.id ? action.payload : task);
        case "deleteTask":
            return state.filter((task)=> task.id !== action.payload)
        case "toggleComplete":
            return state.map((task)=>
            task.id === action.payload ? {...task, completed: !task.completed} : task)
            
    
        default:
            return state;
    }
}

export const TaskContext = createContext();

export const TaskProvider = ({children}) =>{
    const [state, dispatch] = useReducer(taskReducers, initialState)

return(
    <TaskContext.Provider value={{state, dispatch}}>
        {children}
    </TaskContext.Provider>
)
}