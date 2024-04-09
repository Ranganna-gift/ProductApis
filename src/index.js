import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import App from "./c";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
//import GridComponent from "./GridComponet";
//import ProductForm from "./ProductForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//<GridComponent />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
