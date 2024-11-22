/* Mohini_HomeHealthCareModule_HomeHealthRoutes_27/sep/24 */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomehealthNavbar from "./HomeHealthNavbar"
import PatientRegistrationForm from './PatientRegistrationForm';
import MedicationManagementForm from './MedicationManagementForm';
import CarePlanForm from './CarePlanForm';
import VisitSchedulingForm from './VisitSchedulingForm';
import HealthMonitoringForm from './HealthMonitoringForm';
import BillingAndInsuranceForm from './BillingAndInsuranceForm';
import HomeHealth from './HomeHealth';


const HomeHealthRoutes = () => {
  return (
    <>
    <HomehealthNavbar/>
    <Routes>
      <Route path='/patientregistration' element={<HomeHealth/>}/>
      <Route path="/register" element={<PatientRegistrationForm />} />
      <Route path="/medication" element={<MedicationManagementForm />} />
      <Route path="/careplan" element={<CarePlanForm />} />
      <Route path="/visitscheduling" element={<VisitSchedulingForm />} />
      <Route path="/healthmonitoring" element={<HealthMonitoringForm />} />
      <Route path="/billing" element={<BillingAndInsuranceForm />} />
    </Routes>
    </>
  );
};

export default HomeHealthRoutes;
/* Mohini_HomeHealthCareModule_HomeHealthRoutes_27/sep/24 */

/* Prachi_HomeHealthCareModule_HomeHealthRoutes_28/sep/24 */