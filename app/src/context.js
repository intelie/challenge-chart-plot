import { createContext } from "react";

export const Context = createContext({
  user: "chart",
  password: "1234",
  userInput: "",
  passwordInput: "",
  setUserInput: (prevState, user) => {
    return [...prevState, { userInput: user }];
  },
  setPasswordInput: () => {},
});
