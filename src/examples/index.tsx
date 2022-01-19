import React from "react";
import ReactDOM from "react-dom";
import { ContactFormExample } from "./contact-form";
import { LoginFormExample } from "./login-form";

const App = () => {
  return (
    <>
      <ContactFormExample />
      <LoginFormExample />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
