import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { newAccount } from "../FireBaseLogin";
const NewUser = (props) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setpasswordConfirmInput] = useState("");
  const history = useHistory();

  const validate = async (e) => {
    e.preventDefault();
    if (passwordInput !== passwordConfirmInput) {
      alert("Lösenorden stämmer ej");
      return;
    } else {
      const newUser = { username: usernameInput, password: passwordInput };
      const registrationComplete = await newAccount(newUser);
      if(registrationComplete){
          history.push("/");
      }
    }
  };

  return (
    <div>
      <form className="LoginForm">
        <input
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Användarnamn"></input>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Lösenord"></input>
        <input
          type="password"
          value={passwordConfirmInput}
          onChange={(e) => setpasswordConfirmInput(e.target.value)}
          placeholder="Bekräfta lösenord"></input>
        <input type="submit" value="Registrera" onClick={validate}></input>
      </form>
    </div>
  );
};

export default NewUser;
