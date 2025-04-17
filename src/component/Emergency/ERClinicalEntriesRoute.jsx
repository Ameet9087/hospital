import React from "react";
import { Routes, Route } from "react-router-dom";
import ERClinicalEntries from "./ERClinicalEntries";
import DiabeticChartForm from "./DiabeticChartForm/DiabeticChartForm";
import WoundCertificate from "./WoundCertificate/WoundCertificate";
import AccidentReportForm from "./AccidentReportForm/AccidentReportForm";
import IncidentReport from "./IncidentReport/IncidentReport";
import CprReviewForm from "./CprReviewForm/CprReviewForm";
import GCSSheetForm from "./GCSSheetForm/GCSSheetForm";
import EstimationSeverityBurnWoundDetails from "./EstimationSeverityBurnWoundDetails/EstimationSeverityBurnWoundDetails";
import NarcoticDrugDispensedForm from "./NacoticDrugdispensed/NacoticDrugdispensed";
import CprRecordNew from "./CprRecordNew/CprRecordNew";
import PatientCareReport from "./PatientCareReport/PatientCareReport";
import ErInitialAssessment from "./ErInitialAssessmentForm/ErInitialAssessmentForm";
import ErRegister from "./ErRegister/ErRegister";

const ERClinicalEntriesRoute = () => {
  return (
    <Routes>
      <Route path="erclinicalentries" element={<ERClinicalEntries />} />
      <Route path="diabetic-chart" element={<DiabeticChartForm />} />
      <Route path="wound-certificate" element={<WoundCertificate />} />
      <Route path="accident-report" element={<AccidentReportForm />} />
      <Route path="incident-report" element={<IncidentReport />} />
      <Route path="cpr-review" element={<CprReviewForm />} />
      <Route path="gcs-sheet" element={<GCSSheetForm />} />
      <Route
        path="estimation-service-burn-wound"
        element={<EstimationSeverityBurnWoundDetails />}
      />
      <Route
        path="narcotic-drugs-dispensed"
        element={<NarcoticDrugDispensedForm />}
      />
      <Route path="cpr-record-new" element={<CprRecordNew />} />
      <Route path="patientCareReport" element={<PatientCareReport />} />
      <Route path="finalizedpatients" element={<ErRegister />} />
      <Route path="erinitialassessment" element={<ErInitialAssessment />} />
    </Routes>
  );
};

export default ERClinicalEntriesRoute;
