/* Mohini_EmergencyCodeResponse_EmergencyCodeResponseNavbar_10/10/24 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './EmergencyCodeResponseNavbar.css';

const EmergencyCodeResponseNavbar = () => {
    const location = useLocation(); // Get the current route location

    return (
        <nav className="emergency-code-activation-navbar">
           
            <ul>
            <li>
                    <Link 
                        to="/emergency-code-activation" 
                        className={`emergency-code-activation-button ${location.pathname === '/emergency-code-activation' ? 'active' : ''}`}
                    >
                        Emergency Code Response
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/response-log" 
                        className={`emergency-code-activation-button ${location.pathname === '/response-log' ? 'active' : ''}`}
                    >
                        Response Log
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/incident-summary" 
                        className={`emergency-code-activation-button ${location.pathname === '/incident-summary' ? 'active' : ''}`}
                    >
                        Incident Summary
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/emergency-drill-report" 
                        className={`emergency-code-activation-button ${location.pathname === '/emergency-drill-report' ? 'active' : ''}`}
                    >
                        Emergency Drill Report
                    </Link>
                </li>
               
                
              
            </ul>
        </nav>
    );
};

export default EmergencyCodeResponseNavbar;
/* Mohini_EmergencyCodeResponse_EmergencyCodeResponseNavbar_10/10/24 */