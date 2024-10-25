  /* Mohini_ExpiryManagement_ExpiryManagementRoute_7/10/2024*/
import { Route, Routes } from 'react-router-dom';
import DrugRegistrationForm from './DrugRegistrationForm';
import DrugInventoryManagementForm from './DrugInventoryManagementForm';
import ExpiryNotificationSettingsForm from './ExpiryNotificationSettingsForm';
import DrugExpiryReportingForm from './DrugExpiryReportingForm';

const ExpiryManagementRoute = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/drug-registration" element={<DrugRegistrationForm/>} />
      <Route path="/drug-inventory" element={<DrugInventoryManagementForm />} />
      <Route path="/expiry-notification" element={<ExpiryNotificationSettingsForm/>} />
      <Route path="/expiry-report" element={<DrugExpiryReportingForm />} />
    </Routes>
  );
};

export default ExpiryManagementRoute;
  /* Mohini_ExpiryManagement_ExpiryManagementRoute_7/10/2024*/