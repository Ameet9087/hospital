//  neha-OT-OT-otmain-14-9-24
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import BookingList from './BookingList/booinglist';
import Setting from './Setting/setting';

import Sugeryscheduling from '../OT/SurgeryScheduling/sugeryscheduling';
import OTResourceManagement from './OTResourcemgnt/otresourcemangement';
import SurgicalInstrumentTracking from './surgicalinsrumenttrack/surgicalinstrumenttracking';
import AnesthesiaRecordManagement from './anesthesiarecordmgnt/anesthesiarecordmanagemet';
import PostSurgeryCare from './Postcaresurgery/postcaresurgery';
import SurgeryEvents from './SurgeryEvent/SurgeryEventsPage';
import OperationMaster from './Setting/settingsubfils/OperationMaster/OperationMaster';
import OTMaster from './Setting/settingsubfils/OTMaster/Otmaster';
import Ot_machine from './Setting/settingsubfils/Ot_machine/Ot_machine';
import OperationNotes from './OperationNotes/OperationNotes';
import PostOpInstructions from "./PostOpInstruction/PostOpInstructions"
import SurgeryScheduling from '../OT/SurgeryScheduling/sugeryscheduling';
import OT_Nurse_Notes from "../OT/OTNurseNotes/OT_Nurse_Notes"
import OTDisplaySetup from "../OT/OTTveDisplaySetUP/OTDisplaySetup"

const Otmain = () => {
  return (
    <>
        <Navbar/>
        
     
      <div className="app-container">
        <Routes>
        <Route path="bookinglist" element={<BookingList />} />
        <Route path="setting/*" element={<Setting />} />
        <Route path="otresourcemanagement" element={<OTResourceManagement/>}/>
        <Route path="surgeryScheduling" element={<SurgeryScheduling />} />
        <Route path="surgicaltrack" element={<SurgicalInstrumentTracking />} />
        <Route path="anesthesiarecordmgnt" element={<AnesthesiaRecordManagement />} />
        <Route path="postsurgerycare" element={<PostSurgeryCare />} />
        <Route path="otnursenotes" element={<OT_Nurse_Notes />} />
        <Route path="ottvsetup" element={<OTDisplaySetup />} />
        <Route path="postopinstruction" element={<PostOpInstructions />} />
        <Route path="operationnotes" element={<OperationNotes />} />
        
        
        {/* <Route path="/otpkgmaster" element={<OTPackageMaster/>}/> */}
        <Route path='/bookinglist/surgery-events' element={<SurgeryEvents/>}/>
        
    
      </Routes>
      </div>
      </>
    
  );
};

export default Otmain;
