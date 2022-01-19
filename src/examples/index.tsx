import React from "react";
import ReactDOM from "react-dom";
import { ContactFormExample } from "./contact-form";

const App = () => {
  return <ContactFormExample />;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
