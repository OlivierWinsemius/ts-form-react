import React from "react";
import ReactDOM from "react-dom/client";
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

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
