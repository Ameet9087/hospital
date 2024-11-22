// Layout.js
import React,{useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import "./Layout.css"
import Sidebar from './Sidebar';
import AppointmentRouting from "../component/Appointment/AppointmentRouting";
import Inventory from "../component/Inventory1/Inventory";
import Lab from "../component/NavBarSection/Lab";
import Emergency from "../component/Emergency/Emergency";
import Utilitiesmain from "../component/UTILITIES/utilitiesmain";
import SystemAdmin from "../component/SystemAdmin/SystemAdmin";

import Disprensary from "../component/DispensaryPage/disprensaryRoute";
// import ReportMainRouting from "../../component/Reports/ReportMainRouting";
import DoctorDashBoard from "../component/DashBoards/DoctorDashBoard";
import Clinical from "../component/Clinical/Clinical";
import Vaccination from "../component/Vaccination/Vaccination";
import RadiologyRouting from "../component/RadiologyNav/RadiologyRouting";
import PharmacyRouting from "../component/PharmacyHospital/PharmacyRouting";
import PatientRouting from "../component/Patient/PatientRouting";
import VerificationRouting from "../component/Verification/VerificationRouting";
import BloodBank from "../component/BloodBank/bloodBankRoute";
import TransportMainRouting from "../component/TransportMain/transportMainRoute"
import SettingRouting from '../component/Employee/SettingRouting';
import IncentiveApp from '../component/IncentiveMain/incentiveApp';
import Header from '../Dashboard/components/Header';
import NursingRouting from '../component/Nursing/NursingMainRouting';
import SuperUserMainRoute from '../component/SuperUserMain/superUserMainRoute';
import SocialServicesMainRoute from '../component/SocialServicesMain/SocialServicesMainRoute';
import PatientQueueRouting from "../component/QueueMngmt/QueueManagementRouting";
import SubstoreRouting from '../component/SubStoreMainPage/SubstoreRouting';
import SubStoreMain from '../component/SubStoreMainPage/subStoreMain';
import MedicalReportRouting from '../component/MedicalRec/MedicalRecordRouting';
import ReportRoute from '../component/Reports/ReportRoute';
import Nhif from '../component/NHIF/nhif';
import ADTRouting from '../component/Admission/adt-main';
import MaternityHeader from '../component/Maternity/MaternityHeader';
import HomeHealthRoutes from '../component/HomeHealthCareModule/HomeHealthRoutes';
import PediatricInPatientNavbar from '../component/pediatricModule/AppRoutes';
import PediatricOutPatientNavbar from "../component/PediatricOutpatient/PaediatricOutpatientRoutes"
import PhysiotherapyRotes from '../component/PhysiotherapyModule/PhysiotherapyRotes';
import Mkrtrefrrance from '../component/MarketingRefferal/mrktreferrance';
import FixedAssests from "../component/FixedAssests/FixedAssests";
import CSSD from "../component/CSSD/Cssd"
import HRRouting from "../component/HRHome/HRHome"
import RadiationTherapy from "../component/RadiationTherapy/radiationtherapy"
import Pulmonology from "../component/Pulmonology/Pulmonology"
import Chemotherapy from "../component/ChemotherapyModule/ChemotherapyRoute"
import DynamicReport from "../component/DynamicReport/DynamicReport"
// Define modules and submodules
const modules = {
    Dispensary: {
        logo:"fa-solid fa-notes-medical",
        submodules : ['Prescription', 'Sale', 'Stock', 'Counter', 'Reports', 'Patient Consumption'],
    },
    Chemotherapy:{ 
        logo:"fa-solid fa-user-doctor",
        submodules : ['Surgery Management', 'Chemotherapy Scheduling', 'Radiation Therapy', 'Cancer Diagnosis', 'Patient Survival Tracking'],
    },
    SuperUser:{
        logo:"fa-solid fa-user-tie",
        submodules:['Revenue Management','User Management', 'Billing Discount Approval', 'Message Broadcast', 'Facility Services', 'Administration', 'Vendor and Supply Management', 'Control All Department'],
    },
    MedicalRecord:{
        logo:"fa-solid fa-book",
        submodules:['MR Outpatient List', 'MR Inpatient List', 'Birth List', 'Death List', 'Reports', 'Emergency Patient List'],
    },
    Transport:{
        logo:"fa-solid fa-truck-medical",
        submodules:['Patient Transport', 'Ambulance', 'Staff Transport', 'Transport Request', 'Vehicle Maintenance', 'Emergency Transport'],
    },
    BloodBank:{
        logo : "fa-solid fa-droplet",
        submodules : ['Blood Donation Registration', 'Blood Collection', 'Blood Testing and Screening', 'Blood Storage', 'Blood Request', 'Blood Issues', 'Reports'],
    },
    Billing:{
        logo:"fa-solid fa-money-bill",
        submodules:['IPD Billing', 'OPD Billing'],
    } ,
    Pharmacy:{
        logo:"fa-solid fa-prescription-bottle-medical",
        submodules:['Order', 'Supplier', 'Report', 'Setting', 'Store', 'Supplier Ledger', 'Substore Request'],
    }, 
    Procurement:{
        logo:"fa-solid fa-table-list",
        submodules:['Purchase Request', 'Purchase Order', 'Goods Arrival Notification', 'Quotation', 'Settings', 'Reports'],
    }, 
    Verification:{
        logo:"fa-solid fa-check-double",
        submodules: ['Inventory', 'Pharmacy', 'Document & Employment Verification', 'Identity Verification', 'Insurance Verification'],
    },
    Patient:{
        logo:"fa-solid fa-address-card",
        submodules:['Search Patient', 'Register Patient'],
    },
    DynamicReport:{
        logo:"fa-solid fa-clipboard-question",
        submodules:['Write SQL Query Here']
    },
    OperationTheater:{
        logo:"fa-solid fa-bandage",
        submodules: ['Booking List', 'Setting', 'Surgery Scheduling', 'OT Resource Management', 'Surgical Instrument Tracking', 'Anesthesia Record Management', 'Post Surgery Care'],
    },
    Doctor:{
        logo:"fa-solid fa-stethoscope",
        submodules:['Outpatient', 'In-Patient Department', 'Patient Record']
    },
    Clinical:{
        logo:"fa-solid fa-circle-h",
        submodules:['Clinical Assessment and Plan']
    } ,
    Accounting:{
        logo:"fa-solid fa-file-invoice",
        submodules:['Transactions', 'Settings', 'Reports', 'Voucher Verification', 'Medicare Registration', 'Bank Reconciliation']
    },
    Nursing:{
        logo:"fa-solid fa-user-nurse",
        submodules:['Outpatient', 'Inpatient', 'Requisition List', 'Discharge Summary']
    },
    Appointment:{
        logo:"fa-solid fa-bell",
        submodules:['Appointment Booking List', 'Book Appointment', 'List Visits', 'New Visit', 'Online Appointment'],
    }, 
    Settings:{
        logo:"fa-solid fa-gear",
        submodules:['Departments', 'Radiology', 'ADT', 'Security', 'Billing', 'Employee', 'Clinical']
    } ,
    Inventory:{
        logo:"fa-solid fa-warehouse",
        submodules:['Internal', 'Stock', 'Reports', 'Return To Vendor', 'Drug Registration']
    },
    Incentive:{
        logo:"fa-solid fa-money-check-dollar",
        submodules: ['Transaction', 'Reports', 'Setting']
    },
    Laboratory:{
        logo:"fa-solid fa-flask",
        submodules: ['Notification', 'OPD Billing', 'Home', 'Sample Collection', 'Add Results', 'Pending Reports', 'Final Reports', 'Settings']
    },
    Utilities:{
        logo:"fa-solid fa-screwdriver-wrench",
        submodules:['Scheme Refund List', 'Change Visit Scheme', 'Change Billing Counter', 'Organization Deposit'],
    },
    Emergency:{
        logo:"fa-solid fa-hospital",
        submodules:['Home', 'New Patients', 'Triaged Patients', 'Finalized Patients', 'Bed Information', 'Emergency Code Response', 'Response Log', 'Incident Summary', 'Emergency Drill Report']
    },
    SystemAdmin:{
        logo:"fa-solid fa-window-restore",
        submodules:['Database Backup', 'Materialized Sales View', 'New Sales Book', 'Audit Trail']
    },
    SocialService:{
        logo:"fa-solid fa-hand-holding-medical",
        submodules:['SSU Patient List', 'Patient Counseling']
    },
    QueueManagement:{
        logo:"fa-solid fa-list-check",
        submodules:['OPD', 'Patient Queue Prioritization', 'Real-Time Queue Monitoring', 'Service Time Tracking', 'Patient Notification'],
    }, 
    Substore:{
        logo:"fa-solid fa-pills",
        submodules:['stores'],
    },
    Report:{
        logo:"fa-solid fa-layer-group",
        submodules:['Admission', 'Billing Reports', 'Appointment', 'Radiology', 'Lab', 'Doctors', 'Patient', 'Police Case']   
    },
    HI:{
        logo:"fa-solid fa-file-medical",
        submodules:['Patient List', 'Visit List', 'IPD Billing', 'Report']
    },
    ADT:{
        logo:"fa-solid fa-hospital-user",
        submodules:['Search Patient', 'Admitted Patients', 'Discharged Patients', 'Exchange Bed', 'Cancel Bed Reservation'],
    },
    Maternity:{
        logo:"fa-solid fa-hands-holding-child",
        submodules:['Maternity List', 'Payments Reports', 'Antenatal Care', 'Postnatal Care', 'Labor Room Management', 'Breastfeeding Support', 'Family Planning Service']
    },
    HomeHealthcare:{
        logo:"fa-solid fa-house-medical",
        submodules:['Patient Registration']
    },
    Pediatric:{
        logo:"fa-solid fa-baby",
        submodules:['Out Patient', 'In Patient']
    },
    Physiotherapy:{
        logo:"fa-solid fa-circle-h",
        submodules: ['Session Form', 'Session List'],
    },
    UserManagement:{
        logo:"fa-solid fa-user",
        submodules:['Role', 'Assign Functionality', 'User']
    },
    Radiology:{
        logo:"fa-solid fa-x-ray",
        submodules:['List Requests', 'List Reports', 'Edit Doctors', 'OPD Billing']
    },
    MktReferral:{
        logo:"fa-solid fa-people-line",
        submodules:['Transaction', 'Setting', 'Report', 'Referral Tracking', 'Patient Referral Reward', 'Marketing Campaigns', 'Patient Outreach']
    } ,
    Vaccination:{
        logo:"fa-solid fa-syringe",
        submodules:['Patient List', 'Reports']
    },
    FixedAssets:{
        logo:"fa-solid fa-building",
        submodules:['Assets Management', 'Assets Maintenance', 'Depreciation And Discarding', 'Reports']
    },
    CSSD:{
        logo:"fa-solid fa-microscope",
        submodules:['Sterilization', 'Reports']
    },
    HR:{
        logo:"fa-solid fa-user-large",
        submodules:['Employee List', 'Attendance', 'Employee Schedule', 'Employee Leave', 'Performance Evaluation', 'Payroll', 'Recruitment Management']
    },
    RadiationTherapy:{
        logo:"fa-solid fa-circle-h",
        submodules:['Patient Therapy Plan', 'Dosage Tracking', 'Equipment Usage Logs', 'Radiation Safety Compliance', 'Appointment And Scheduling']
    },
    Pulmonology:{
        logo:"fa-solid fa-circle-h",
        submodules:['Respiratory Function Tests', 'Pulmonary Rehabilitation', 'Imaging and Lab Reports', 'Medication Management', 'Follow-Up Scheduling'],
    }, 
    Helpdesk:{
        logo:"fa-solid fa-circle-info",
        submodules:['Employee Information', 'Bed Information', 'Ward Information', 'Queue Information'],
    }, 
};

function Layout({}) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className='layout-container'>

            <Sidebar modules={modules} isOpen={isOpen} />
            <div className="main-content">
            <Header isOpen={isOpen} setIsOpen={setIsOpen}/>

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
                    <Route path="/appointment/*" element={<AppointmentRouting />} />
                    <Route path="/settings/*" element={<SettingRouting />} />
                    <Route path='/dispensary/*'element={<Disprensary/>}/>
                    <Route path='/inventory/*'element={<Inventory/>}/>
                    <Route path='/incentive/*'element={<IncentiveApp/>}/>
                    <Route path='/laboratory/*'element={<Lab/>}/>
                    <Route path='/utilities/*' element={<Utilitiesmain/>}/>
                    <Route path='/emergency/*' element={<Emergency/>}/>
                    <Route path='/vaccination/*' element={<Vaccination/>}/>
                    <Route path='/nursing/*' element={<NursingRouting/>}/>
                    <Route path='/superuser/*' element={<SuperUserMainRoute/>}/>
                    <Route path='/verification/*' element={<VerificationRouting/>}/>
                    <Route path='/transport/*' element={<TransportMainRouting/>}/>
                    <Route path='bloodbank/*' element={<BloodBank/>}/>
                    <Route path='/pharmacy/*' element={<PharmacyRouting/>}/>
                    <Route path='/transport/*' element={<TransportMainRouting/>}/>
                    <Route path='/radiology/*' element={<RadiologyRouting/>}/>
                    <Route path='/clinical/*' element={<Clinical/>}/>
                    <Route path='/patient/*' element={<PatientRouting/>}/>
                    <Route path='/doctor/*' element={<DoctorDashBoard/>}/>
                    <Route path='/systemadmin/*' element={<SystemAdmin/>}/>
                    <Route path='socialservice/*' element={<SocialServicesMainRoute/>}/>
                    <Route path='/queuemanagement/*' element={<PatientQueueRouting/>}/>
                    <Route path='/substore/*' element={<SubstoreRouting/>}/>
                    <Route path='/report/*' element={<ReportRoute/>}/>
                    <Route path='/hi/*' element={<Nhif/>}/> 
                    <Route path='/adt/*' element={<ADTRouting/>}/>
                    <Route path='/maternity/*' element={<MaternityHeader/>}/>
                    <Route path='/homehealthcare/*' element={<HomeHealthRoutes/>}/>
                    <Route path='/pediatric/inpatient/*' element={<PediatricInPatientNavbar/>}/>
                    <Route path='/pediatric/outpatient/*' element={<PediatricOutPatientNavbar/>}/>
                    <Route path='/physiotherapy/*' element={<PhysiotherapyRotes/>}/>
                    <Route path='/mktreferral/*' element={<Mkrtrefrrance/>}/>
                    <Route path='/fixedassets/*' element={<FixedAssests/>}/>
                    <Route path='/cssd/*' element={<CSSD/>}/>
                    <Route path='/hr/*' element={<HRRouting/>}/>
                    <Route path='/radiationtherapy/*' element={<RadiationTherapy/>}/>
                    <Route path='/pulmonology/*' element={<Pulmonology/>}/>
                    <Route path='/medicalrecord/*' element={<MedicalReportRouting/>}/>
                    <Route path='/chemotherapy/*' element={<Chemotherapy/>}/>
                    <Route path='/dynamicreport/*' element={<DynamicReport/>}/>
                </Routes>
            </div>
        </div>
        </div>
    );
}

export default Layout;
