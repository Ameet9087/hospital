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
      <ChemotherapyNavbar />
      <Routes>
        <Route path="/surgerymanagement" element={<SurgeryManagement />} />
        <Route path="/chemotherapyscheduling" element={<ChemotherapyScheduling />} />
        <Route path="/radiationtherapy" element={<RadiationTherapyIntegration />} />
        <Route path="/cancerdiagnosis" element={<CancerDiagnosisAndStaging />} />
        <Route path="/patientsurvivaltracking" element={<PatientSurvivalTracking />} />
      </Routes>
    </>
  );
};

export default ChemotherapyRoute;
