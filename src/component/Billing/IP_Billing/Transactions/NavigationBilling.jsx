// src/components/Navigation.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBilling.css';

function NavigationBilling() {

    const [selectedButton, setSelectedButton] = useState("Out Patient");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

    return (
        <nav className="nursing-actions-container">

            <NavLink to="billing/ipmoney-receipt" selected> <button
                className={`nursing-action-button ${selectedButton === 'Nursing Dashboard' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('IP Money Receipt')}
                >IP Money Receipt</button>
            </NavLink>


            <NavLink to="billing/finalbill" selected> <button
                className={`nursing-action-button ${selectedButton === 'Out Patient' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('Final Bill')}
                > Final Bill</button>
            </NavLink>

            <NavLink to="billing/IPBilling" selected> <button
                className={`nursing-action-button ${selectedButton === 'IP Billing' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('IP Bill')}
                > IP Billing</button>
            </NavLink>
            <NavLink to="billing/opbilling" selected> <button
                className={`nursing-action-button ${selectedButton === 'OPD Billing' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('OPD Bill')}
                > OPD Billing</button>
            </NavLink>

          
        </nav>

        

    );
}

export default NavigationBilling;