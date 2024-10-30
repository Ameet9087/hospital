// Routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import PediatricPatientRegistrationForm from './PediatricPatientRegistrationForm';
import DischargeSummaryForm from './DischargeSummaryForm';
import PaediatricNutritionForm from './PaediatricNutritionForm';
// import VaccinationReminderForm from './VaccinationReminderForm';
// import PaediatricFollowUpForm from './PaediatricFollowUpForm';
import PaediatricAdmissionForm from './PaediatricAdmissionForm';
import PatientHistoryForm from './PatientHistoryForm';
import PaediatricVitalsExaminationForm from './PaediatricVitalsExaminationForm';
import PaediatricTreatmentPlanForm from './PaediatricTreatmentPlanForm';
import NursingCarePlanForm from './NursingCarePlanForm';
import PaediatricProgressNotesForm from './PaediatricProgressNotesForm';
import PediatricImmunizationForm from './PediatricImmunizationForm';
import PadiatricNavbar from './PediatricNavbar';

const AppRoutes = () => {
  return (
    <>
    <PadiatricNavbar/>
    <Routes>
      {/* <Route path="/registration-form" element={<PediatricPatientRegistrationForm />} /> */}
      <Route path="/patient-history-form" element={<PatientHistoryForm />} />
      <Route path="/admission-form" element={<PaediatricAdmissionForm />} />
      <Route path="/paediatric-vitals-examination-Form" element={<PaediatricVitalsExaminationForm />} />
      <Route path="/paediatric-treatment-plan-form" element={<PaediatricTreatmentPlanForm />} />
      <Route path="/nursing-care-plan-form" element={<NursingCarePlanForm />} />
      <Route path="/paediatric-progress-notes-form" element={<PaediatricProgressNotesForm />} />
      <Route path="/discharge" element={<DischargeSummaryForm />} />
      <Route path="/pediatric-immunization-form" element={<PediatricImmunizationForm />} />
      <Route path="/nutrition" element={<PaediatricNutritionForm />} />
      {/* <Route path="/vaccination-reminder" element={<VaccinationReminderForm />} /> */}
      {/* <Route path="/follow-up" element={<PaediatricFollowUpForm />} /> */}
    </Routes>

    </>
  );
};

export default AppRoutes;
