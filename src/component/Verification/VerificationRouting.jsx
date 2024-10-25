import React from 'react'
import RequisitionPage from './RequisitionPage';
import PurchaseRequest from '../Inventory1/Internal/PurchaseRequest';
import NavigationBar from './NavigationBar';
import { Route, Routes } from 'react-router-dom';
import GRQualityInspection from "./GRQualityInspection"
import RequisitionPagePharmacy from './RequisitionPagePharmacy';
import VerifyPurchaseRequests from './VerifyPurchaseRequests';
import PurchaseOrder from './PurchaseOrder';
import EmployeeVerification from './Verification Model/EmployeeVerification';
import PatientDocumentVerification from './Verification Model/PatientDocumentVerification';
import EmpIdentityVerificationForm from './Verification Model/EmpIdentityVerificationForm';
import PatientIdentityVerificationForm from './Verification Model/PatientIdentityVerificationForm';
import EmployeeInsuranceVerificationForm from './Verification Model/EmployeeInsuranceVerificationForm';
import PatientInsuranceForm from './Verification Model/PatientInsuranceForm';


const VerificationRouting = () => {
  return (
      <>
      <NavigationBar />
      <Routes>
        <Route path="/requisition" element={<RequisitionPage />} />
        <Route path="/requisitionPharmacy" element={<RequisitionPagePharmacy />} />

        <Route path="/purchase-request" element={<VerifyPurchaseRequests />} />
        <Route path="/verify-purchase-order" element={<PurchaseOrder />} />
        <Route path='/gr-quality-inspection' element={<GRQualityInspection/>}></Route>
        <Route path='/employee-verification' element={<EmployeeVerification/>}></Route>
        <Route path='/patient-verification' element={<PatientDocumentVerification/>}></Route>
        <Route path='/employee-identity-verification' element={<EmpIdentityVerificationForm/>}></Route>
        <Route path='/patient-identity-verification' element={<PatientIdentityVerificationForm/>}></Route>
        <Route path='/employee-insurance-verification' element={<EmployeeInsuranceVerificationForm/>}></Route>
        <Route path='/patient-insurance-verification' element={<PatientInsuranceForm/>}></Route>


        {/* Add other routes here for different pages */}
      </Routes>
      </>
  );
}


export default VerificationRouting


