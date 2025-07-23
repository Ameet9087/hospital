import React, { useState } from 'react';
import "./OphthalmoPatientDashboard.css";
import EMRFrom from './EMRFrom';
import EMRHistory from './EMRHistory';

const OphthalmoPatientDashboard = ({patient}) => {
    console.log(patient);
    
    const [showEMR, setShowEMR] = useState(false);
    const [showEMRHistory,setShowEMRHistory] = useState(false);

    const handleNewEMR = () => {
        setShowEMR(true);
    }
    const handleNewEMRHistory = () => {
        setShowEMRHistory(true);
        setShowEMR(false);
    }

    const handleClose = () => {
        setShowEMR(false);
        setShowEMRHistory(false);
    }

    return (
        <div className='OphthalmoPatientDashboard-outerContainer'>
            <div className='OphthalmoPatientDashboard-navSection'>
                <ul className='OphthalmoPatientDashboard-navBar'>
                    <li onClick={handleNewEMR}>New EMR</li>
                    <li onClick={handleNewEMRHistory}>EMR History</li>
                </ul>
                <button className='OphthalmoPatientDashboard-backButton'>Back</button>
            </div>
            <div className='OphthalmoPatientDashboard-header'>
                <div className='OphthalmoPatientDashboard-header-left'>
                    <h4><b>Name :</b> {patient?.firstName+" "+patient?.lastName}</h4>
                    <h4><b>Age/Sex :</b> {patient?.age}</h4>
                    <h4><b>Address :</b> {patient?.address}</h4>
                </div>
                <div className='OphthalmoPatientDashboard-header-right'>
                    <h4><b>Doctor Name :</b> {patient?.employeeDTO?.salutation} {patient?.employeeDTO?.firstName}</h4>
                    <h4><b>Contact No :</b> 7028876563</h4>
                    <h4><b>Date :</b> {new Date().toUTCString()}</h4>
                </div>
            </div>
            {showEMR && <EMRFrom onClose={handleClose} patient={patient} />}
            {showEMRHistory && <EMRHistory onClose={handleClose} patient={patient} />}
        </div>
    );
}

export default OphthalmoPatientDashboard;
