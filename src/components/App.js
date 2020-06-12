import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

import "../styles/App.css";

import TodoList from "./TodoList";
import Login from "./Login";
import NewUser from "./NewUser";

const App = () => {
  const [username, setUsername] = useState(sessionStorage.getItem("user"));

  const changeLoginState = () => {
    if (username) {
      setUsername(null);
    } else {
      setUsername(sessionStorage.getItem("user"));
    }
  };

  return (
    <div className="App">
      {username ? <Redirect to="/todos"></Redirect> : "/"}

      <Route
        path="/"
        exact
        component={() => (
          <Login changeLogin={changeLoginState}></Login>
        )}></Route>
      <Route
        path="/todos"
        exact
        component={() => (
          <TodoList
            changeLogin={changeLoginState}
            username={username}></TodoList>
        )}
      />

      <Route path="/new-user" component={NewUser}></Route>
    </div>
  );
};

export default App;
