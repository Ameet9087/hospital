import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SurgeryManagement from './SurgeryManagement/SurgeryManagement';
import ChemotherapyScheduling from './ChemotherapyScheduling/ChemotherapyScheduling';
import RadiationTherapyIntegration from './RadiationTherapyIntegration/RadiationTherapyIntegration';
import CancerDiagnosisAndStaging from './CancerDiagnosisAndStaging/CancerDiagnosisAndStaging';
import PatientSurvivalTracking from './PatientSurvivalTracking/PatientSurvivalTracking';
import ChemotherapyNavbar from '../ChemotherapyModule/ChemotherapyNavbar';



const ChemotherapyRoute = () => {
  return (
    <>
<ChemotherapyNavbar/>
    <Routes>
      <Route path="/surgery-management" element={<SurgeryManagement />} />
      <Route path="/chemotherapy-scheduling" element={<ChemotherapyScheduling />} />
      <Route path="/radiation-therapy" element={<RadiationTherapyIntegration />} />
      <Route path="/cancer-diagnosis" element={<CancerDiagnosisAndStaging />} />
      <Route path="/patient-survival-tracking" element={<PatientSurvivalTracking />} />
    </Routes>
    </>
  );
};

export default ChemotherapyRoute;
