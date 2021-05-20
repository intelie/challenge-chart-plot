import React from "react";
import ReactDOM from "react-dom";
import { Context } from "./context";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={Context}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
