import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

console.log(window.__INITIAL_STATE__);

ReactDOM.hydrateRoot(
  document.getElementById("app"),
  <BrowserRouter>
    <App users={window.__INITIAL_STATE__.users} />
  </BrowserRouter>
);
