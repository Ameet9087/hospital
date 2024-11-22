import React from 'react';
import Home from "./Internal/Home";
import Internal from "./Internal/Internal";
import Stock from "./Stock/Stock";
import Reports from "./Reports/Reports";
import ReturnToVendor from "./ReturnToVendor/ReturnToVendor";
// import Donate from "./Donate/Donate";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import DrugRegistrationForm from './ExpiryManagement/DrugRegistrationForm';
import DrugExpiryAlert from './ExpiryManagement/ExpiryNotificationSettingsForm';
import DrugInventoryManagementForm from './ExpiryManagement/DrugInventoryManagementForm';
import DrugExpiryReportingForm from './ExpiryManagement/DrugExpiryReportingForm';



const Inventory = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/internal/*" element={<Internal />} />
        <Route path="/stock/*" element={<Stock/>} />
        <Route path="/reports/*" element={<Reports />} />
        <Route path="/returntovendor" element={<ReturnToVendor />} />
        <Route path="/drugregistration" element={<DrugRegistrationForm/>} />
        <Route path="/expiry-notification" element={<DrugExpiryAlert/>} />

        <Route path="/drug-inventory" element={<DrugInventoryManagementForm />} />
        <Route path="/expiry-report" element={<DrugExpiryReportingForm />} />

        {/* <Route path="/donate" element={<Donate />} /> */}
      </Routes>
    </div>
  )
}


export default Inventory