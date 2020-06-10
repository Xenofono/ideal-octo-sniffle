import React, {useState} from "react";
import "../styles/App.css";

import TodoList from "./TodoList";
import Login from "./Login";

const App = () => {

    const alreadyLoggedIn = sessionStorage.getItem("login") === "yes"
    const [login, setLogin] = useState(alreadyLoggedIn)

    const changeLoginState = () => {
        setLogin(!login)
    }


    const toShow = login ? <TodoList/> : <Login changeLogin={changeLoginState}/>

  return (
    <div className="App">
      {toShow}
    </div>
  );
};

export default App;
