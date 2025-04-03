import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListTask from "./components/ListTask";
import AddTask from "./components/AddTask";


const initialState = []

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListTask/>}></Route>
          <Route path="/add" element={<AddTask initialState={initialState}/>}></Route>
        </Routes>
      </BrowserRouter> */}

      <AddTask initialState={initialState}/>
    </>
  );
}

export default App;
