import "./App.css";
import Routes from "./Routes";
import reducer from "./context/reducer";
import React, { useReducer } from "react";
import { UserContext } from "./context/UserContext";

const initialState = {
  conversation: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Routes></Routes>
    </UserContext.Provider>
  );
}

export default App;
