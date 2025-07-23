/* Ajhar Tamboli transportMainRoute.jsx 25-09-24 */

import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import TransportNavBar from './transportNav';

import Transportsystem from './Transportsystem/transport';
import PatientTransportForm from './Transportsystem/PatientTransportation/patienttransport';
import Patienttrasferstatus from './Transportsystem/patienttransferstatus/patienttrasferstatus';
import Tansferedpatientlist from './Transportsystem/Transferlist/tansferedpatientlist';

import AmbulanceNavbar from './Ambulance/ambulanceNavbar';
import AmbulanceList from './Ambulance/AmbulanceList';
import DispatchForm from './Ambulance/DispatchForm';
// import GPSMap from './Ambulance/GPSMap';
import EmergencyRequest from './Ambulance/EmergencyRequest';

import StaffTransNavbar from './StaffTransport/staffTransNavbar';
import StaffTransportTable from './StaffTransport/StaffInformation/StaffInformation';
import VehicleTable from './StaffTransport/TransportServiceDetails/TransportServiceDetails';
import RouteScheduleManagement from './StaffTransport/RouteScheduleManagement/RouteScheduleManagement';
import EmergencyLateNightArrangements from './StaffTransport/EmergencyLateNightArrangements/EmergencyLateNightArrangements';


import EmergencyTransportTable from './EmergencyTransport/emergencyTransportTable';
import TransportRequest from './TransportRequest/TransportRequest';
import AddEmergencyPageTransport from './EmergencyTransport/AddEmergencyPage';

import VehicleMaintenance from './VehicleMaintenance/vehicleMaintenance';
import TransportList from './Ambulance/TransportList';
import DispatchList from './Ambulance/DispatchList';

function TransportMain() {

  return (
    <>
      <TransportNavBar />
      <div className="transportNavBar-content">
        <Routes>

          <Route path="/patienttransport" element={<Transportsystem />} />
          <Route path="/patienttransport/patientTransportForm" element={<PatientTransportForm />} />
          <Route path="/patienttransport/patienttrasferstatus" element={<Patienttrasferstatus />} />
          <Route path="/patienttransport/tansferedpatientlist" element={<Tansferedpatientlist />} />


          <Route path="/ambulance" element={<AmbulanceNavbar />} />
          <Route path="/ambulance/ambulance-list" element={<AmbulanceList />} />
          <Route path="/ambulance/dispatch" element={<DispatchForm />} />
          {/* <Route path="/ambulance/gps-map" element={<GPSMap />} /> */}
          <Route path="/ambulance/emergency-request" element={<EmergencyRequest />} />

          <Route path="/stafftransport" element={<StaffTransNavbar />} />
          <Route path="/stafftransport/staff-information" element={<StaffTransportTable />} />
          <Route path="/stafftransport/transport-service-details" element={<VehicleTable />} />
          <Route path="/stafftransport/route-schedule-management" element={<RouteScheduleManagement />} />
          <Route path="/stafftransport/emergency-late-night-arrangements" element={<EmergencyLateNightArrangements />} />

          <Route path="/emergencytransport" element={<EmergencyTransportTable />} />
          <Route path="/emergencytransport/addEmergencyPageTransport" element={<AddEmergencyPageTransport />} />

          <Route path="/transportRequest" element={<TransportRequest />} />


          <Route path="/vehicleMaintenance" element={<VehicleMaintenance />} />

          <Route path='/transport/patienttransport/TransportList' element={<TransportList />} />
          <Route path="/transport/patienttransport/dispatchList" element={<DispatchList />} />
        </Routes>
      </div>
    </>
  )
}

export default TransportMain
