import React from "react";
import ReactDOM from "react-dom";
import { ContactFormExample } from "./contact-form";
import { LoginFormExample } from "./login-form";
import { NativeFormExample } from "./native-form";

const App = () => {
  return (
    <>
      <ContactFormExample />
      <ContactFormExample />
      <LoginFormExample />
      <NativeFormExample />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
