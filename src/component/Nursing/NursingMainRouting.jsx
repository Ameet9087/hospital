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

function NurisingMainRouting() {

  return (
    <Layout>
                <Routes>
                  {/* <Route path='/nursing' element={<NursingMainComponent/>}></Route> */}
                  <Route path="/inpatient" element={<Inpatient />} />
                  {/* <Route path='/MyPatients'element={<MyPatientsTable/>}></Route> */}
                  <Route path='/outpatient' element={<OutPatient/>}></Route>
                  <Route path='/nephrology' element={<Nephrology/>}></Route>
                  <Route path='/requisitionList' element={<RequisitionList/>}></Route>
                  <Route path='/dischargesummary' element={<DischargeSummary/>}></Route>
                  </Routes>
    </Layout>
  )
}

export default NurisingMainRouting;

