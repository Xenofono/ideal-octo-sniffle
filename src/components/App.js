import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

import "../styles/App.css";

import TodoList from "./TodoList";
import Login from "./Login";
import NewUser from "./NewUser";

export const UserContext = React.createContext();


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
      <UserContext.Provider value={username}>
        <h1 className="title">Super Todo-manager 3000</h1>
        {username ? <Redirect to="/todos"></Redirect> : null}

        <Route
          path="/"
          exact
          component={() => <Login changeLogin={changeLoginState}></Login>}
        ></Route>
        <Route
          path="/todos"
          exact
          component={() => (
            <TodoList
              changeLogin={changeLoginState}
              username={username}
            ></TodoList>
          )}
        />

        <Route path="/new-user" component={NewUser}></Route>
      </UserContext.Provider>
    </div>
  );
};

export default App;
