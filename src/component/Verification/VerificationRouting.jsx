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
import OPCancelationApproval from './OPCancelationApproval';


const VerificationRouting = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/inventory/requisition" element={<RequisitionPage />} />
        <Route path="/pharmacy/requisitionPharmacy" element={<RequisitionPagePharmacy />} />

        <Route path="/inventory/purchase-request" element={<VerifyPurchaseRequests />} />
        <Route path="/inventory/verify-purchase-order" element={<PurchaseOrder />} />
        <Route path='/inventory/gr-quality-inspection' element={<GRQualityInspection />}></Route>
        <Route path="/pharmacy/verify-purchase-order" element={<PurchaseOrder />} />
        <Route path='/document&employmentverification/employee-verification' element={<EmployeeVerification />}></Route>
        <Route path='/document&employmentverification/patient-verification' element={<PatientDocumentVerification />}></Route>
        <Route path='/identityverification/employee-identity-verification' element={<EmpIdentityVerificationForm />}></Route>
        <Route path='/identityverification/patient-identity-verification' element={<PatientIdentityVerificationForm />}></Route>
        <Route path='/insuranceverification/employee-insurance-verification' element={<EmployeeInsuranceVerificationForm />}></Route>
        <Route path='/insuranceverification/patient-insurance-verification' element={<PatientInsuranceForm />}></Route>
        <Route path='/opdcanclepostapproval' element={<OPCancelationApproval />}></Route>


        {/* Add other routes here for different pages */}
      </Routes>
    </>
  );
}


export default VerificationRouting


