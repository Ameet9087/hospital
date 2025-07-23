import React from "react";
import { Route, Routes } from "react-router-dom";

function ReportRoute() {
  return (
    <Routes>
      <Route path="/" element={<Reports />} />
      <Route path="/:reportName" element={<ReportPage />} />
    </Routes>
  );
}

export default ReportRoute;
