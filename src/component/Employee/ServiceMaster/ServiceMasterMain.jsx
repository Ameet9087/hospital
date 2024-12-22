import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServiceMaster from './ServiceMaster';
import ServiceRate from './ServiceRate';
import OperationOrProcedureRate from './OperationOrProcedureRate';


function ServiceMasterMain() {
  return (
    <div>


      <Routes>
        <Route path="/settings/serviceMaster" element={<ServiceMaster />} />
        <Route path="serviceMaster/serviceRate" element={<ServiceRate />} />
        <Route path="serviceMaster/operationOrProcedureRate" element={<OperationOrProcedureRate />} />

      </Routes>
   
    </div>
  )
}

export default ServiceMasterMain