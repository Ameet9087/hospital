/* Mohini_PhysiotherapyModule_PhysiotherapyRotes_30/sep/24 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PhysiotherapySessionForm from './PhysiotherapySessionForm';
import PhysiotherapySessionList from './PhysiotherapySessionList';
import PhysiotherapyNavbar from './PhysiotherapyNavbar';
// import PhysiotherapyModule from './PhysiotherapyModule';

const PhysiotherapyRotes = () => {
    return (
        <>
        <PhysiotherapyNavbar/>
        <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            {/* <Route path="/physiotherapy-module" element={<PhysiotherapyModule />} /> */}
            <Route path="/physiotherapy-session-form" element={<PhysiotherapySessionForm />} />
            <Route path="/physiotherapy-session-list" element={<PhysiotherapySessionList />} />
        </Routes>

        </>
    );
};

export default PhysiotherapyRotes;
/* Mohini_PhysiotherapyModule_PhysiotherapyRotes_30/sep/24 */
