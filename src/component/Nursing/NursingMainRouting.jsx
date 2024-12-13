import React, { useState } from 'react'

// import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NursingMainComponent from './NursingMainComponent';
import Inpatient from './InPatientMainContent';
import OutPatient from './NursingMainComponent';
import Layout from './Layout';
import MyPatientsTable from './MyPatientsTable';
import Nephrology from './Nephrology';
import RequisitionList from './RequisitionList';
import DischargeSummary from './DischargeSummary';
import AdhenseSafetyPrecaution from './AdhenseSafetyPrecaution';
import NurseRoute from './NursingModule/nurseRoute';
import AddDasboard from "./NursingModule/APDashBoard/aPDashBoard"
import WardNurseDashboard from './NursingModule/WardNurseDashboard/wardNurseDashboard';
import { Provider } from 'react-redux';
import { store } from './NursingModule/ReduxNursing/store';
import ServicePopup from './NursingModule/Services/PopupTable';


function NurisingMainRouting() {

  return (
    <>

          <Provider store={store}>
            <Layout>
                <Routes>
                  <Route path='/' element={<NursingMainComponent/>}></Route>
                  <Route path="/nursingdashboard" element={<NurseRoute />} />
                  <Route path="/Inpatient" element={<Inpatient />} />
                  {/* <Route path='/MyPatients'element={<MyPatientsTable/>}></Route> */}
                  <Route path='/Outpatient' element={<OutPatient/>}></Route>
                  <Route path='/Nephrology' element={<Nephrology/>}></Route>
                  <Route path='/RequisitionList' element={<RequisitionList/>}></Route>
                  <Route path='/DischargeSummary' element={<DischargeSummary/>}></Route>
                  <Route path='/AdhenseSafetyPrecaution' element={<AdhenseSafetyPrecaution/>}></Route>


                  <Route path="/nurse-dashboard" element={<WardNurseDashboard />} ></Route>
                  <Route path='/patient-dashboard' element={<AddDasboard/>}/>
                  <Route path="/login-nursing" element={<WardNurseDashboard />} />
                  <Route path='/services-all' element={<ServicePopup/>} />
             
                  </Routes>
            </Layout>
          </Provider>
    </>
  )
}

export default NurisingMainRouting;

