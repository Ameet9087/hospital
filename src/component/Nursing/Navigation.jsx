import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const location = useLocation();

    const isSelected = (path) => location.pathname === path;

    return (
        <nav className="nursing-actions-container">
            <NavLink to="/nursing/outpatient">
                <button
                    className={`nursing-action-button ${isSelected('/nursing/outpatient') ? 'selected' : ''}`}
                >
                    Out Patient
                </button>
            </NavLink>

            <NavLink to="/nursing/inpatient">
                <button
                    className={`nursing-action-button ${isSelected('/nursing/inpatient') ? 'selected' : ''}`}
                >
                    In Patient
                </button>
            </NavLink>

            <NavLink to="/nursing/requisitionlist">
                <button
                    className={`nursing-action-button ${isSelected('/nursing/requisitionlist') ? 'selected' : ''}`}
                >
                    Requisition List
                </button>
            </NavLink>

            <NavLink to="/nursing/dischargesummary">
                <button
                    className={`nursing-action-button ${isSelected('/nursing/dischargesummary') ? 'selected' : ''}`}
                >
                    Discharge Summary
                </button>
            </NavLink>

            <NavLink to="/nursing/adhensesafetyprecaution"> <button
                    className={`nursing-action-button ${isSelected('/nursing/adhensesafetyprecaution') ? 'selected' : ''}`}
                > Adherence Safety Precaution</button>
            </NavLink>
        </nav>
    );
}

export default Navigation;
