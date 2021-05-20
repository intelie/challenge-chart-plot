import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Context } from "./context";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./login.scss";

function Login() {
  const { userInput, passwordInput, setUserInput, setPasswordInput } =
    useContext(Context);

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [dataFilled, setDataFilled] = useState(false);
  // const [formSubmit, setFormSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!dataFilled) {
    // setUserInput(userInput, user);
    setPasswordInput({ passwordInput: password });

    console.log(user);
    console.log(userInput);
    console.log(password);
    console.log(passwordInput);
    setDataFilled(true);
    // }
  };

  useEffect(() => {}, [
    dataFilled,
    setUserInput,
    setPasswordInput,
    password,
    user,
  ]);

  return (
    <>
      <main className="form-signin">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Sign in
          </button>
        </form>
      </main>
    </>
  );
}

export default Login;
