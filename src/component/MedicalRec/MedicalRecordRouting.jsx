import { useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

import Layout from '../MedicalRec/Layout';
import MROutPatientList from '../MedicalRec/MROutPatientList';
import MRInpatientList from '../MedicalRec/MRInpatientList';
import BirthList from '../MedicalRec/BirthList';
import DeathList from '../MedicalRec/DeathList';
import MedicalRecordReport from '../MedicalRec/MedicalRecordReport';
import EmergencyPatientList from '../MedicalRec/EmergencyPatientList';
import 'bootstrap/dist/css/bootstrap.min.css';
import HospitalServiceSummaryReport from '../MedicalRec/HospitalServiceSummaryReport';
import InpatientMorbidityReport from '../MedicalRec/InpatientMorbidityReport';
import HospitalMortalityReport from '../MedicalRec/HospitalMortalityReport';
import EmergencyPMReport from '../MedicalRec/EmergencyPMReport';
import OutPatientMorbidityReport from '../MedicalRec/OutPatientMorbidityReport';
import LabServiceReport from '../MedicalRec/LabServiceReport';
function MedicalReportRouting() {

  return (
    <>
        <Layout>
          <Routes>
            {/* <Route path='/' element={<MROutPatientList/>}></Route> */}
            <Route path='/mroutpatientlist' element={<MROutPatientList/>}></Route>
            <Route path='/mrinpatientlist' element={<MRInpatientList/>}></Route>
            <Route path='/birthlist' element={<BirthList/>}></Route>
            <Route path='/deathlist' element={<DeathList/>}></Route>
            <Route path='/reports/*' element={<MedicalRecordReport/>}></Route>
            <Route path='/emergencypatientlist' element={<EmergencyPatientList/>}></Route>
            <Route path='/reports/HospitalServiceSummaryReport' element={<HospitalServiceSummaryReport/>}></Route>
            <Route path='/reports/InpatientMorbidityReport' element={<InpatientMorbidityReport/>}></Route>
            <Route path='/reports/HospitalMortalityReport' element={<HospitalMortalityReport/>}></Route>
            <Route path='/reports/EmergencyPMReport' element={<EmergencyPMReport/>}></Route>
            <Route path='/reports/OutPatientMorbidityReport' element={<OutPatientMorbidityReport/>}></Route>
            <Route path='/reports/LabServiceReport' element={<LabServiceReport/>}></Route>
          </Routes>
        </Layout>
      
    </>
  )
}

export default MedicalReportRouting
