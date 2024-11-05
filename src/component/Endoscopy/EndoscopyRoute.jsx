  /* Mohini_Endoscopy_18-10-24 */
    /* Prachi_Endoscopy_18-10-24 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProcedureSchedulingForm from './ProcedureSchedulingForm';
import EndoscopeInventoryForm from './EndoscopeInventoryForm';
import ImagingReportsForm from './ImagingReportsForm';
import SterilizationLogForm from './SterilizationLogForm';
import PostProcedureNotesForm from './PostProcedureNotesForm';
import PatientReportsSearchForm from './PatientReportsSearchForm';
import PatientReportsResults from './PatientReportsResults';
import EndoscopyNavbar from './EndoscopyNavbar';
const EndoscopyRoute = () => {
  return (
    <>
    
    <EndoscopyNavbar/>

    <Routes>
      <Route path="/procedure-scheduling" element={<ProcedureSchedulingForm />} />
      <Route path="/endoscope-inventory" element={<EndoscopeInventoryForm />} />
      <Route path="/imaging-reports" element={<ImagingReportsForm />} />
      <Route path="/sterilization-tracking" element={<SterilizationLogForm />} />
      <Route path="/post-procedure-doc" element={<PostProcedureNotesForm />} />
      <Route path="/patient-search-report" element={<PatientReportsSearchForm />} />
      <Route path="/patient-report-result" element={<PatientReportsResults />} />

    </Routes>

    </>
  );
};

export default EndoscopyRoute;
  /* Mohini_Endoscopy_18-10-24 */