import React, { useState } from "react";
import "../styles/App.css";

import TodoList from "./TodoList";
import Login from "./Login";

const App = () => {
  const alreadyLoggedIn = sessionStorage.getItem("login") === "yes";
  const [login, setLogin] = useState(alreadyLoggedIn);
  const [username, setUsername] = useState('')

  const changeLoginState = (name) => {
    if(login){
      const confirmLogout = confirm("Är du säker du vill logga ut?")
      if (confirmLogout) {
        sessionStorage.removeItem("login");
        setLogin(!login)
      }
    }
    else{
      console.log(name)
      setLogin(oldState => {
        setUsername(name)
        return !oldState
      });

    }
    
  };


  const toShow = login ? (
    <TodoList changeLogin={changeLoginState} username={username}/>
  ) : (
    <Login changeLogin={changeLoginState}  />
  );

  return <div className="App">{toShow}</div>;
};

export default App;
