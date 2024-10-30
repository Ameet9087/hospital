import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Dashboard/components/Layout";
import Disprensary from "./component/DispensaryPage/disprensaryRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dispensary/*" element={<Disprensary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
