import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./NewSidebar/Layout";


function App() {
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
