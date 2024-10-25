/* Mohini_EmergencyCodeResponse_EmergencyCodeResponseRoutes_10/10/24 */import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmergencyDrillReportForm from './EmergencyDrillReportForm';
import IncidentSummaryForm from './IncidentSummaryForm';
import ResponseLogForm from './ResponseLogForm';
import EmergencyCodeResponseForm from './EmergencyCodeResponseForm';

const EmergencyCodeResponseRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/emergency-drill-report" element={<EmergencyDrillReportForm />} />
            <Route path="/incident-summary" element={<IncidentSummaryForm />} />
            <Route path="/response-log" element={<ResponseLogForm />} />
            <Route path="/emergency-code-activation" element={<EmergencyCodeResponseForm />} />
        </Routes>
    );
};

export default EmergencyCodeResponseRoutes;
/* Mohini_EmergencyCodeResponse_EmergencyCodeResponseRoutes_10/10/24 */