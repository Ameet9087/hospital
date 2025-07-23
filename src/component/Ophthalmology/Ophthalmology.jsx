import React from "react";
import { Route, Routes } from "react-router-dom";
import Inpatient from "./Inpatient";
import OutPatient from "./OutPatient";
import OphthaNavbar from "./OphthaNavbar";

const Ophthalmology = () => {
  return (
  <div>
    <OphthaNavbar/>
   <Routes>
    <Route path="/ortho-inpatient" element={<Inpatient/>}/>
    <Route path="/ortho-outpatient" element={<OutPatient/>}/>
   </Routes>
  </div>
  )
};

export default Ophthalmology;
