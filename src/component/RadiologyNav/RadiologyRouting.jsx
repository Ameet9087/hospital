import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import RadiologyNavBar from "../RadiologyNav/RadiologyNavBar";
import RDLListRequest from "../RadiologyNav/ListRequest/rdlListRequest";

import RDLListReports from "../RadiologyNav/ListReports/rdlListReports";

import RDLEditDoctors from "../RadiologyNav/EditDoctors/relEditDoctors";
import RDLWardBilling from "../RadiologyNav/WardBilling/rdlWardBilling";
import RDopdbilling from "./OPDBilling/reopdbilling";
import RadiologyApproval from "./Approval/RadiologyApproval";

// import MapGovernmentItemxs from './NavBarSection/LabSetting/mapGovernmentItems';

function RadiologyRouting() {
  return (
    <>
      <RadiologyNavBar />
      <div className="lab-content">
        <Routes>
          <Route path="/listrequests" element={<RDLListRequest />} />
          <Route path="/approval" element={<RadiologyApproval />} />
          <Route path="/listreports" element={<RDLListReports />} />
          <Route path="/editdoctors" element={<RDLEditDoctors />} />
          <Route path="/rDLWardBilling" element={<RDLWardBilling />} />
          {/* <Route path="/opdbilling" element={<RDopdbilling/>}/> */}
        </Routes>
      </div>
    </>
  );
}

export default RadiologyRouting;
