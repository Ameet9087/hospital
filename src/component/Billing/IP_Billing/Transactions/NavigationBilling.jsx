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

          
        </nav>

        

    );
}

export default NavigationBilling;