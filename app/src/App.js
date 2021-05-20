import { Fragment, useCallback, useEffect, useState, useContext } from "react";
import { Context } from "./context";
import Chart from "./Chart";
// import Login from "./Login";

function App() {
  const { user, password, userInput, passwordInput } = useContext(Context);

  return (
    <>
      {/* <Context.Consumer>
        {user == userInput && password == passwordInput ? <Login /> : <Login />}
      </Context.Consumer> */}
      <Chart />
    </>
  );
}

export default App;
