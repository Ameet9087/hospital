import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiceList from "./ServiceList";
import ServiceRate from "./ServiceRate";
import OperationOrProcedureRate from "./OperationOrProcedureRate";
import ServiceMasterNav from "./ServiceMasterNav";
import GroupServiceType from "./GroupServiceType";
import ServiceType from "./ServiceType";

function ServiceMasterMain() {
  return (
    <div>
      <ServiceMasterNav />
      <Routes>
        <Route path="/service" element={<ServiceList />} />
        <Route path="/groupservicetype" element={<GroupServiceType />} />
        <Route path="/servicetype" element={<ServiceType />} />
        <Route path="/serviceRate" element={<ServiceRate />} />
        <Route
          path="serviceMaster/operationOrProcedureRate"
          element={<OperationOrProcedureRate />}
        />
      </Routes>
    </div>
  );
}

export default ServiceMasterMain;
