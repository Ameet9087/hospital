// neha-ADT-adtmain-19/09/24
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./header";
import Home from "./homepage";
import SearchPatient from "./searchpatient";
import DischargedPatient from "./dischargedpatient";
import ExchangeBed from "./exchangebed";
import CancelReservation from "./canclereservation";
//import SearchPatient from './Home-Pages/admittedpatient';
//import SearchPatient from '.\Home-Pages\searchpatient';
import AdmittedPatient from "./admittedpatient";

const Adt = () => {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/searchpatient" element={<SearchPatient />} />
          <Route path="/admittedpatients" element={<AdmittedPatient />} />
          <Route path="/dischargedpatients" element={<DischargedPatient />} />
          <Route path="/exchangebed" element={<ExchangeBed />} />
          <Route path="/cancelbedreservation" element={<CancelReservation />} />
        </Routes>
      </div>
    </>
  );
};

export default Adt;
