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

function NurisingMainRouting() {

  return (
    <>
            <Layout>
                <Routes>
                  <Route path='/' element={<NursingMainComponent/>}></Route>
                  <Route path="/Inpatient" element={<Inpatient />} />
                  {/* <Route path='/MyPatients'element={<MyPatientsTable/>}></Route> */}
                  <Route path='/Outpatient' element={<OutPatient/>}></Route>
                  <Route path='/Nephrology' element={<Nephrology/>}></Route>
                  <Route path='/RequisitionList' element={<RequisitionList/>}></Route>
                  <Route path='/DischargeSummary' element={<DischargeSummary/>}></Route>
                  <Route path='/AdhenseSafetyPrecaution' element={<AdhenseSafetyPrecaution/>}></Route>
                  </Routes>
            </Layout>
    </>
  )
}

export default NurisingMainRouting;

