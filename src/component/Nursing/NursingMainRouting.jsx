import React, { useState } from "react";

// import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NursingMainComponent from "./NursingMainComponent";
import OutPatient from "./NursingMainComponent";
import Layout from "./Layout";
import NurseRoute from "./NursingModule/nurseRoute";
import WardNurseDashboard from "./NursingModule/WardNurseDashboard/wardNurseDashboard";
import { Provider } from "react-redux";
import { store } from "./NursingModule/ReduxNursing/store";
import ServicePopup from "./NursingModule/Services/PopupTable";

function NurisingMainRouting() {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<NursingMainComponent />}></Route>
            <Route path="/nursingdashboard" element={<NurseRoute />} />
            <Route path="/outpatient" element={<OutPatient />}></Route>
            <Route
              path="/nurse-dashboard"
              element={<WardNurseDashboard />}
            ></Route>
            <Route path="/login-nursing" element={<WardNurseDashboard />} />
            <Route path="/services-all" element={<ServicePopup />} />
          </Routes>
        </Layout>
      </Provider>
    </>
  );
}

export default NurisingMainRouting;
