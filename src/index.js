import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

let app = document.getElementById("app");

app
  ? ReactDOM.render(
      <BrowserRouter>
        <App></App>
      </BrowserRouter>,
      app
    )
  : false;
