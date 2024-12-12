

import { Routes, Route } from 'react-router-dom';
import WardNurseDashboard from './WardNurseDashboard/wardNurseDashboard';
import APDashBoard from './APDashBoard/aPDashBoard';
import SelectConsultant from './SelectConsultant/SelectConsultant/SelectConsultant';



function NurseRoute() {
  return (
   
    <div className="dispensary-content">
      <Routes>
        <Route path='/' element={<SelectConsultant/>} />

        <Route path="patient-dashboard" element={<APDashBoard />} />

      </Routes>
    </div>
  );
}

export default NurseRoute;


