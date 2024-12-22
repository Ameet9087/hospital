//  neha-OT-OT-otmain-14-9-24
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './otNavbar';
import BookingList from './BookingList/booinglist';
import Setting from './Setting/setting';

import Sugeryscheduling from './SurgeryScheduling/schedulinglist';
import OTResourceManagement from './OTResourcemgnt/otresourcemangement';
import SurgicalInstrumentTracking from './surgicalinsrumenttrack/surgicalinstrumenttracking';
import AnesthesiaRecordManagement from './anesthesiarecordmgnt/anesthesiarecordmanagemet';
import PostSurgeryCare from './Postcaresurgery/postcaresurgery';

const Otmain = () => {
  return (
    <>
        <Navbar/>
        
     
      <div className="app-container">
        <Routes>
          <Route path="/bookinglist" element={<BookingList/>} />
          <Route path="setting/*" element={<Setting/>} />
          {/* <Route path="/Change_Visitscheme" element={<Change_Visitscheme/>} /> */}
            <Route path="/surgeryScheduling" element={<Sugeryscheduling />} />
            <Route path='/otresourcemanagement' element={<OTResourceManagement />} />
            <Route path='/surgicalinstrumenttracking' element={<SurgicalInstrumentTracking />} />
            <Route path='/anesthesiarecordmanagement' element={<AnesthesiaRecordManagement />} />
            <Route path='/postsurgerycare' element={<PostSurgeryCare />} />
        </Routes>
      </div>
      </>
    
  );
};

export default Otmain;
