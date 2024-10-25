/* Mohini_Verification Model_VerificationNavbar_14/10/24 */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeVerification from './EmployeeVerification';
import PatientDocumentVerification from './PatientDocumentVerification';
import PatientInsuranceForm from './PatientInsuranceForm';
import EmployeeInsuranceVerificationForm from './EmployeeInsuranceVerificationForm';
import EmpIdentityVerificationForm from './EmpIdentityVerificationForm';
import PatientIdentityVerificationForm from './PatientIdentityVerificationForm';


const VerificationRoutes = () => {
  return (
    <Routes>
      <Route path="/employee-verification" element={<EmployeeVerification />} />
     
        <Route path="/patient-verification" element={<PatientDocumentVerification/>} />
        <Route path="/patient-insurance-verification" element={<PatientInsuranceForm/>} />
        <Route path="/employee-insurance-verification" element={<EmployeeInsuranceVerificationForm/>} />
        <Route path="/employee-identity-verification" element={<EmpIdentityVerificationForm/>} />
        <Route path="/patient-identity-verification" element={<PatientIdentityVerificationForm/>} />

    </Routes>
  );
};

export default VerificationRoutes;
/* Mohini_Verification Model_VerificationNavbar_14/10/24 */
