// Layout.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./Layout.css";
import Sidebar from "./Sidebar";
import AppointmentRouting from "../../component/Appointment/AppointmentRouting";
import Inventory from "../../component/Inventory1/Inventory";
import Lab from "../../component/NavBarSection/Lab";
import Emergency from "../../component/Emergency/ERClinicalEntriesRoute";
import Utilitiesmain from "../../component/UTILITIES/utilitiesmain";
import SystemAdmin from "../../component/SystemAdmin/SystemAdmin";

import Disprensary from "../../component/DispensaryPage/disprensaryRoute";
// import ReportMainRouting from "../../component/Reports/ReportMainRouting";
import DoctorDashBoard from "../../component/DashBoards/DoctorDashBoard";
import Clinical from "../../component/Clinical/Clinical";
import Vaccination from "../../component/Vaccination/Vaccination";
import RadiologyRouting from "../../component/RadiologyNav/RadiologyRouting";
import PharmacyRouting from "../../component/PharmacyHospital/PharmacyRouting";
import PatientRouting from "../../component/Patient/PatientRouting";
import VerificationRouting from "../../component/Verification/VerificationRouting";
import BloodBank from "../../component/BloodBank/bloodBankRoute";
import TransportMainRouting from "../../component/TransportMain/transportMainRoute";
import SettingRouting from "../../component/Employee/SettingRouting";
import IncentiveApp from "../../component/IncentiveMain/incentiveApp";
import Header from "./Header";
import NursingRouting from "../../component/Nursing/NursingMainRouting";
import SuperUserMainRoute from "../../component/SuperUserMain/superUserMainRoute";
import SocialServicesMainRoute from "../../component/SocialServicesMain/SocialServicesMainRoute";
import PatientQueueRouting from "../../component/QueueMngmt/QueueManagementRouting";
import SubstoreRouting from "../../component/SubStoreMainPage/SubstoreRouting";
import SubStoreMain from "../../component/SubStoreMainPage/subStoreMain";
import MedicalReportRouting from "../../component/MedicalRec/MedicalRecordRouting";
import ReportRoute from "../../component/Reports/ReportRoute";
import Nhif from "../../component/NHIF/nhif";
import ADTRouting from "../../component/Admission/adt-main";
import MaternityHeader from "../../component/Maternity/MaternityHeader";
import HomeHealthRoutes from "../../component/HomeHealthCareModule/HomeHealthRoutes";
import PediatricInPatientNavbar from "../../component/pediatricModule/AppRoutes";
import PediatricOutPatientNavbar from "../../component/PediatricOutpatient/PaediatricOutpatientRoutes";
import PhysiotherapyRotes from "../../component/PhysiotherapyModule/PhysiotherapyRotes";
import Mkrtrefrrance from "../../component/MarketingRefferal/mrktreferrance";
import CSSD from "../../component/CSSD/Cssd";
import HRRouting from "../../component/HRHome/HRHome";
import RadiationTherapy from "../../component/RadiationTherapy/radiationtherapy";
import Pulmonology from "../../component/Pulmonology/Pulmonology";
import Chemotherapy from "../../component/ChemotherapyModule/ChemotherapyRoute";
import DynamicReport from "../../component/DynamicReport/DynamicReport";
import Procurementmain from "../../component/Procurement2/procurmentmain";
import HelpDeskRouting from "../../component/HelpD/HelpDeskRouting";
import Dashboard from "../../component/LoginDashboard/Dashboard/";
import MainVisitorFile from "../VisitorMgt/MainVisitorFile";
import OtMain from "../OperationTheater/OtMain";

import AssetmgntNavBar from "../ASsetManagement/assetmgnt";
import BillingRoute from "../Billings/Billing";

function Layout({ }) {
  return (
    <>
      {/* <div className='layout-container'> */}
      {/* 
            <Sidebar modules={modules} isOpen={isOpen} />
            <div className="main-content">
            <Header isOpen={isOpen} setIsOpen={setIsOpen}/> */}

      {/* Routes for each module and submodule */}
      <div className="scrollable-content">
        <Routes>
          {/* {Object.keys(modules).map((moduleName) =>
                        modules[moduleName].map((submodule) => (
                            <Route
                                key={`${moduleName}-${submodule}`}
                                path={`/${moduleName}/${submodule}`}
                                element={<ModulePage module={moduleName} submodule={submodule} />}
                            />
                        ))
                    )} */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointment/*" element={<AppointmentRouting />} />
          <Route path="/settings/*" element={<SettingRouting />} />
          <Route path="/dispensary/*" element={<Disprensary />} />
          <Route path="/inventory/*" element={<Inventory />} />
          <Route path="/incentive/*" element={<IncentiveApp />} />
          <Route path="/laboratory/*" element={<Lab />} />
          <Route path="/utilities/*" element={<Utilitiesmain />} />
          <Route path="/emergency/*" element={<Emergency />} />
          <Route path="/vaccination/*" element={<Vaccination />} />
          <Route path="/nursing/*" element={<NursingRouting />} />
          <Route path="/superuser/*" element={<SuperUserMainRoute />} />
          <Route path="/verification/*" element={<VerificationRouting />} />
          <Route path="/transport/*" element={<TransportMainRouting />} />
          <Route path="bloodbank/*" element={<BloodBank />} />
          <Route path="/pharmacy/*" element={<PharmacyRouting />} />
          <Route path="/transport/*" element={<TransportMainRouting />} />
          <Route path="/radioloagy/*" element={<RadiologyRouting />} />
          <Route path="/clinical/*" element={<Clinical />} />
          <Route path="/patient/*" element={<PatientRouting />} />
          <Route path="/doctor/*" element={<DoctorDashBoard />} />
          <Route path="/systemadmin/*" element={<SystemAdmin />} />
          <Route path="socialservice/*" element={<SocialServicesMainRoute />} />
          <Route path="/queuemngmt/*" element={<PatientQueueRouting />} />
          <Route path="/substore/*" element={<SubstoreRouting />} />
          <Route path="/report/*" element={<ReportRoute />} />
          <Route path="/hi/*" element={<Nhif />} />
          <Route path="/adt/*" element={<ADTRouting />} />
          <Route path="/maternity/*" element={<MaternityHeader />} />
          <Route path="/procurement/*" element={<Procurementmain />} />
          <Route path="/homehealthcare/*" element={<HomeHealthRoutes />} />
          <Route
            path="/pediatric/inpatient/*"
            element={<PediatricInPatientNavbar />}
          />
          <Route
            path="/pediatric/outpatient/*"
            element={<PediatricOutPatientNavbar />}
          />
          <Route path="/physiotherapy/*" element={<PhysiotherapyRotes />} />
          <Route path="/mktreferral/*" element={<Mkrtrefrrance />} />
          <Route path="/fixedassets/*" element={<AssetmgntNavBar />} />
          <Route path="/cssd/*" element={<CSSD />} />
          <Route path="/hr/*" element={<HRRouting />} />
          <Route path="/radiationtherapy/*" element={<RadiationTherapy />} />
          <Route path="/pulmonology/*" element={<Pulmonology />} />
          <Route path="/medicalrecord/*" element={<MedicalReportRouting />} />
          <Route path="/chemotherapy/*" element={<Chemotherapy />} />
          <Route path="/dynamicreport/*" element={<DynamicReport />} />
          <Route path="/helpdesk/*" element={<HelpDeskRouting />} />
          <Route path="/billing/*" element={<BillingRoute />} />
          <Route path="/visit/*" element={<MainVisitorFile />} />
          <Route path="/oprationtheater/*" element={<OtMain />} />

        </Routes>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default Layout;
