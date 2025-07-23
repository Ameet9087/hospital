// src/components/Layout.js
import React from "react";
import Navigation from "./Navigation";
import "../Nursing/Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
