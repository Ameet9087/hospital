import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import LMSNavBar from "./lMSNav";

import NavNotification from "./LinensType/linensType";
import LinenMaster from "./LinenMaster/LinenMaster";
import LinenRequirement from "./LinenRequirement/linenRequirement";
import LaundryStaffMapping from "./LaundryStaffMapping/LaundryStaffMapping";

import SquareLinensIssue from "./LinensType copy/squareLinensIssue";



const LMSRoutes = () => {
  return (
    <>
      <div className="lMSRoutes-content">
        <LMSNavBar />
        <Routes>
          <Route path="/master" element={<NavNotification />} />
          <Route path="/linenMaster" element={<LinenMaster />} />
          <Route path="/linenRequirement" element={<LinenRequirement />} />
          <Route path="/laundryStaffMapping" element={<LaundryStaffMapping />} />
          <Route path="/transaction" element={<SquareLinensIssue />} />

        </Routes>
      </div>
    </>
  );
};

export default LMSRoutes;