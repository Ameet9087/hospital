import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';

import PatientTransportForm from './PatientTransportation/patienttransport';
import Patienttrasferstatus from './patienttransferstatus/patienttrasferstatus';
import Tansferedpatientlist from './Transferlist/tansferedpatientlist';
import TransportList from '../Ambulance/TransportList';
import DispatchList from '../Ambulance/DispatchList';

import "../Transportsystem/transportsystem.css"

function Transportsystem() {
  return (
    <div>
      <header className="transportsystem-header">
          <ul className="transportsystem-nav-links">
            {/* <Link to="/transport/patienttransport/patientTransportForm" className="transportsystem-header-button"><li className='transportsystem-header-button'>Transport form</li></Link> */}
         
            <Link to="/transport/patienttransport/tansferedpatientlist" className="transportsystem-header-button"><li className='transportsystem-header-button'>All request list</li></Link>  
            <Link to="/transport/patienttransport/patienttrasferstatus" className="transportsystem-header-button"><li className='transportsystem-header-button'>Transport list</li></Link>
            {/* <Link to="/transport/patienttransport/dispatchList" className="transportsystem-header-button"> */}
            {/* <li className="transportsystem-header-button">Dispatch list</li> */}
           {/* <Link to="/transport/patienttransport/dispatchList" className="transportsystem-header-button"> Dispatch list</Link>
          </Link> */}
            {/* <Link to="/transport/patienttransport/TransportList" className="transportsystem-header-button"><li className='transportsystem-header-button'>All Transport list</li></Link>  */}
          </ul>
      </header>
      
      {/* <Routes>
        <Route path="/patient-transport" element={< PatientTransportForm/>} />
        <Route path="/patienttrasferstatus" element={< Patienttrasferstatus/>} />
        <Route path="/All-patient-transport" element={<Tansferedpatientlist />} />
        
      </Routes> */}
    </div>
  );
}

export default Transportsystem;
