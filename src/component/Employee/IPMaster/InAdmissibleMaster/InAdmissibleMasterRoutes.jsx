import React from "react";
import { Route, Routes } from "react-router-dom";
import ServiceNameSearch from "../InAdmissibleMaster/ServiceNameSearch";
import InvestigationsNameSearch from "../InAdmissibleMaster/InvestigationsNameSearch";
import PharmacyNameSearch from "../InAdmissibleMaster/PharmacyNameSearch";
import InAdmissibleMaster from "../InAdmissibleMaster/InAdmissibleMaster";

const InAdmissibleMasterRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InAdmissibleMaster />} />
      <Route path="/services-name-search" element={<ServiceNameSearch />} />
      <Route
        path="/investigations-name-search"
        element={<InvestigationsNameSearch />}
      />
      <Route path="/pharmacy-name-search" element={<PharmacyNameSearch />} />
    </Routes>
  );
};

export default InAdmissibleMasterRoutes;
