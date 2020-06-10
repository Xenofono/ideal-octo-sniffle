import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";

let app = document.getElementById("app");

console.log("HEJ");

app ? ReactDOM.render(<App></App>, app) : false;
