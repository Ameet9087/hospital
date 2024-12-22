import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DischargeWordole from './dischargewarable';
import Investigation from './dischargenavbarbutton/investigation';
import Pharmacy from './dischargenavbarbutton/pharmacy';
import PharmacySummary from './dischargenavbarbutton/pharmacysummary';
import OperationDetails from './dischargenavbarbutton/oprationdetails';
import IcdCodes from './dischargenavbarbutton/icdcodes';
import RadiologyReport from './dischargenavbarbutton/radiologyreport';
import Procedure from './dischargenavbarbutton/procedure';
import MedicationAdviced from './dischargenavbarbutton/medicationadviced';

function Dischargewordoleroutemain() {
  return (
    <div>

<Router>
      <Routes>
        <Route path="/" element={<DischargeWordole />} />
        <Route path="/investigation" element={<Investigation />} />
        <Route path='/pharmacy' element={<Pharmacy/>}></Route>
        <Route path='/pharmacysummury' element={<PharmacySummary/>}></Route>
        <Route path='/oprationdetails' element={<OperationDetails/>}></Route>
        <Route path='/icdcode' element={<IcdCodes/>}></Route>
        <Route path='/radiologyreport' element={<RadiologyReport/>}></Route>
        <Route path='/procedure' element={<Procedure/>}></Route>
        <Route path='/medicationadvice' element={<MedicationAdviced/>}></Route>
      </Routes>
    </Router>
    </div>
  )
}

export default Dischargewordoleroutemain