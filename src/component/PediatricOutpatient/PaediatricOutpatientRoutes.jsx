// PediatricInpatientRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes
import VitalSignsInpatientForm from './VitalSignsInpatientForm';
import ExaminationDiagnosisOutpatientForm from './ExaminationDiagnosisOutpatientForm';
import ChiefComplaintOutpatientForm from './ChiefComplaintOutpatientForm';
import ConsentLegalOutpatientForms from './ConsentLegalOutpatientForms';
import DischargeSummaryOutpatientForm from './DischargeSummaryOutpatientForm';
import PatientOutPatientRegistrationForm from './PatientOutPatientRegistrationForm';
import TreatmentPrescriptionOutpatientForm from './TreatmentPrescriptionOutpatientForm';
import ImmunizationOutpatientForm from './ImmunizationOutpatientForm';
import FollowUpReviewOutpatientForm from './FollowUpReviewOutpatientForm';
import PaediatricOutpatientNavbar from './PaediatricOutPatientNavbar';

const PaediatricOutpatientRoutes = () => {
  return (
    <>
    <PaediatricOutpatientNavbar/>
    <div className="bloodBank-content">
    <Routes> {/* Wrap all routes inside Routes */}
      <Route path="/registration-outpatient-form" element={<PatientOutPatientRegistrationForm />} />
      <Route path="/vital-signs-inpatient" element={<VitalSignsInpatientForm />} />
      <Route path="/chief-complaint-outpatient" element={<ChiefComplaintOutpatientForm   />} />
      <Route path="/examination-diagnosis-outpatient" element={<ExaminationDiagnosisOutpatientForm />} />
      <Route path="/treatment-prescription-Outpatient" element={<TreatmentPrescriptionOutpatientForm />} />
      <Route path="/immunization-outpatient-form" element={<ImmunizationOutpatientForm />} />
      <Route path="/follow-up-review-Outpatient" element={<FollowUpReviewOutpatientForm/>} />
      <Route path="/consentlegal-outpatient" element={<ConsentLegalOutpatientForms />} />
      <Route path="/discharge-Outpatient" element={<DischargeSummaryOutpatientForm />} />
    </Routes>
    </div>
    </>
  );
};

export default PaediatricOutpatientRoutes;
