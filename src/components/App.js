import React, { useState } from "react";
import {Route, Redirect} from 'react-router-dom'

import "../styles/App.css";

import TodoList from "./TodoList";
import Login from "./Login";
import NewUser from './NewUser'


const App = () => {
  const alreadyLoggedIn = sessionStorage.getItem("login") === "yes";
  const [login, setLogin] = useState(alreadyLoggedIn);
  const [username, setUsername] = useState("");

  const changeLoginState = (name) => {

      setLogin((oldState) => {
        setUsername(name);
        return !oldState;
      });
    
  };

  //TODO registrera ny användare
  const toShow = login ? (
    <TodoList changeLogin={changeLoginState} username={username} />
  ) : (
    <Login changeLogin={changeLoginState} />
  );

  return <div className="App">
    <Route path="/" exact component={() => <Login changeLogin={changeLoginState} ></Login>}>
      {login ? <Redirect to="/todos"></Redirect>: null}
    </Route>
    <Route path="/todos" exact component={() => <TodoList changeLogin={changeLoginState} username={username}></TodoList>}/>
    <Route path="/new-user" component={NewUser}></Route>
    
    </div>;
};

export default App;
