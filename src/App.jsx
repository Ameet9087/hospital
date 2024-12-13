import React,{useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./NewSidebar/Layout";
import LoginHomePage from "./Logins/LoginHomePage";
import LoginPage from "./Logins/LoginPage"
import ProtectedRoute from "./Logins/ProtectedRoute"
import { AuthProvider } from "./Logins/AuthProvider";
import Sidebar from "./NewSidebar/Sidebar";
import Header from "./NewSidebar/Header";
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
      submodules:['Nursing Dashboard','Outpatient', 'Inpatient', 'Requisition List', 'Discharge Summary','Adhense Safety Precaution']
  },
  Appointment:{
      logo:"fa-solid fa-bell",
      submodules:['Appointment Booking List', "Doctor Appointment","Doctor Schedule Std","Break Time"],
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

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <BrowserRouter>
    <div className='layout-container'>
       <Sidebar modules={modules} isOpen={isOpen} />
            <div className="main-content">
            <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
      {/* <AuthProvider> */}
        <Routes>
          {/* <Route path="/home" element={<LoginHomePage/>}/>
          <Route path="/home/login" element={<LoginPage/>}/> */}
          <Route
            path="/*"
            element={
              // <ProtectedRoute>
              <Layout />
              // </ProtectedRoute>
            }
            />
        </Routes>
      {/* </AuthProvider> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
