import React, { useState } from "react";
import "../styles/Login.css";
import { login } from "../FirebaseLogin";

export default function Login(props) {
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const onClick = async (e) => {
    e.preventDefault();
    if (!nameInput || !passwordInput) {
      alert("Fyll i nått först kanske");
      return;
    }

    const userInfo = {
      username: nameInput,
      password: passwordInput,
    };
    const validLogin = await login(userInfo);
    if (validLogin) {
      sessionStorage.setItem("login", "yes");
      props.changeLogin();
    } else {
      alert(
        `Felaktigt användarnamn eller lösenord angivet för användare ${userInfo.username}`
      );
    }
  };

  return (
    <div>
      <form className="LoginForm">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Användarnamn"></input>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Lösenord"></input>
        <input type="submit" value="Logga in" onClick={onClick}></input>
      </form>
    </div>
  );
}
