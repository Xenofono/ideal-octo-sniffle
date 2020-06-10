import React, { useState } from "react";
import "../styles/App.css";

import TodoList from "./TodoList";
import Login from "./Login";

const App = () => {
  const alreadyLoggedIn = sessionStorage.getItem("login") === "yes";
  const [login, setLogin] = useState(alreadyLoggedIn);

  const changeLoginState = () => {
    if(login){
      const confirmLogout = confirm("Är du säker du vill logga ut?")
      if (confirmLogout) {
        sessionStorage.removeItem("login");
        setLogin(!login)
      }
    }
    else{
      setLogin(!login);

    }
    
  };

  const toShow = login ? (
    <TodoList changeLogin={changeLoginState} />
  ) : (
    <Login changeLogin={changeLoginState} />
  );

  return <div className="App">{toShow}</div>;
};

export default App;
