// src/components/Navigation.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {

    const [selectedButton, setSelectedButton] = useState("Out Patient");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

    return (
        <nav className="nursing-actions-container">
            <NavLink to="/Outpatient" selected> <button
                className={`nursing-action-button ${selectedButton === 'Out Patient' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('Out Patient')}
                > Out Patient</button>
            </NavLink>

            <NavLink to="/Inpatient"> <button
                className={`nursing-action-button ${selectedButton === 'In Patient' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('In Patient')}
                > In Patient</button>
            </NavLink>

            {/* <NavLink to="/Nephrology"> <button
                className={`nursing-action-button ${selectedButton === 'Nephrology' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('Nephrology')}
                > Nephrology</button>
            </NavLink> */}

            <NavLink to="/RequisitionList"> <button
                className={`nursing-action-button ${selectedButton === 'RequisitionList' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('RequisitionList')}
                > Requisition List</button>
            </NavLink>

            <NavLink to="/DischargeSummary"> <button
                className={`nursing-action-button ${selectedButton === 'Discharge Summary' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('Discharge Summary')}
                > Discharge Summary</button>
            </NavLink>

            <NavLink to="/AdhenseSafetyPrecaution"> <button
                className={`nursing-action-button ${selectedButton === 'Adherence Safety Precaution' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('Adherence Safety Precaution')}
                > Adherence Safety Precaution</button>
            </NavLink>
        </nav>

        

    );
}

export default Navigation;