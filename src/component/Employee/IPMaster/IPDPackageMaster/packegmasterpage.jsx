import React, { useState } from 'react';
import './packegematerpage.css';
import Consultation from './AllPackeges/consultation';
import Investigation from './AllPackeges/investigation';
import Pharmacy from './AllPackeges/pharmacy';
import Service from './AllPackeges/service';
import RoomType from './AllPackeges/roomtype';

function Packegmasterpage() {
  const [activeComponent, setActiveComponent] = useState(null); // State to track which component to display

  return (
    <div className='ipdmpackege'>
    
      <div className="packegemasterclassmaindiv">
      <h3>IP Packege Master</h3>
        <div className='ipdpckgmasterformc'>
          <label>Packege Name:</label>
          <input type="text" />
        </div>
        <div className='ipdpckgmasterformc'>
          <label>Packege Code:</label>
          <input type="text" />
        </div>
        <div className='ipdpckgmasterformc'>
          <label>Packege Days:</label>
          <input type="text" />
        </div>
        <div className='ipdpckgmasterformc'>
          <input type="checkbox" /> Active
          <input type="checkbox" /> Apply Upper Limit
        </div>
        <div >
          <button className='ipdpckgmasterformcbtn'>SAVE</button>
        </div>
      </div>

      {/* Buttons to load components */}
      <div className="packegemasetersbuttons">
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('consultation')}>Consultation</button>
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('investigation')}>Investigation</button>
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('pharmacy')}>Pharmacy</button>
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('services')}>Services</button>
        <button className='packegemasetersbuttonsbtn'  onClick={() => setActiveComponent('payType')}>Pay Type</button>
        <button className='packegemasetersbuttonsbtn'  onClick={() => setActiveComponent('payType')}>Pay Type</button>
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('roomType')}>Room Type</button>
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('opdPckRate')}>OPDPCKRATE</button>
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('doctorTypeService')}>Doctor Type Service</button>
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('pharmacyLimit')}>Pharmacy PayType Wise Limit</button>
        <button className='packegemasetersbuttonsbtn' onClick={() => setActiveComponent('autoIncrementService')}>Auto Increment Service</button>
      </div>

      {/* Conditional rendering of components */}
      <div>
        {activeComponent === 'consultation' && <Consultation />}
        {activeComponent === 'investigation' && <Investigation/>}
        {activeComponent === 'pharmacy' && <Pharmacy/>}
        {activeComponent === 'services' && <Service/>}
        {activeComponent === 'payType' && <h1>Pay Type Page</h1>}
        {activeComponent === 'roomType' && <RoomType/>}
        {activeComponent === 'opdPckRate' && <h1>OPDPCKRATE Page</h1>}
        {activeComponent === 'doctorTypeService' && <h1>Doctor Type Service Page</h1>}
        {activeComponent === 'pharmacyLimit' && <h1>Pharmacy PayType Wise Limit Page</h1>}
        {activeComponent === 'autoIncrementService' && <h1>Auto Increment Service Page</h1>}
      </div>

      
    </div>
  );
}

export default Packegmasterpage;
