// neha-ADT-adtmain-19/09/24
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./header";
import SearchPatient from "./searchpatient";
import DischargedPatient from "./dischargedpatient";
import ExchangeBed from "./exchangebed";
import CancelReservation from "./canclereservation";
//import SearchPatient from './Home-Pages/admittedpatient';
//import SearchPatient from '.\Home-Pages\searchpatient';
import AdmittedPatient from "./admittedpatient";
import IpAdmission from "./IpAdmission";
import AdmissionDeskHomePage from "./AdmissionDeskHomepage";
import IpInformation from "./IpInformation/IpInformation";

const Adt = () => {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/home" element={<AdmissionDeskHomePage />} />
          <Route path="/ipadmission" element={<IpAdmission />} />
          <Route path="/admittedpatients" element={<AdmittedPatient />} />
          <Route path="/dischargedpatients" element={<DischargedPatient />} />
          <Route path="/exchangebed" element={<ExchangeBed />} />
          <Route path="/cancelbedreservation" element={<CancelReservation />} />
          <Route path="/ip-information" element={<IpInformation />} />
        </Routes>
      </div>
    </>
  );
};

export default Adt;
