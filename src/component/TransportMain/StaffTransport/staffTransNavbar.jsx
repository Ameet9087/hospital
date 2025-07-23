// Dhanashree_WholeModule_25/09
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import "./StaffTransportManagement.css"

const StaffTransNavbar = () => {
  return (
      <div className="StaffTransportManagement-app-container">
        <nav className="StaffTransportManagement-nav">
          <ul className="StaffTransportManagement-nav-list">
            <li><NavLink to="/transport/stafftransport/staff-information" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Staff Information</NavLink></li>
            <li><NavLink to="/transport/stafftransport/transport-service-details" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Transport Service Details</NavLink></li>
            <li><NavLink to="/transport/stafftransport/route-schedule-management" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Route and Schedule Management</NavLink></li>
            {/* <li><NavLink to="/shift-scheduling-integration" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Shift Scheduling Integration</NavLink></li> */}
            <li><NavLink to="/transport/stafftransport/emergency-late-night-arrangements" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Emergency/Late-Night Arrangements</NavLink></li>
            {/* <li><NavLink to="/communication-notification" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Communication & Notification</NavLink></li>
            <li><NavLink to="/booking-confirmation" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Booking & Confirmation</NavLink></li>
            <li><NavLink to="/performance-feedback" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Performance & Feedback</NavLink></li> */}
            {/* <li><NavLink to="/admin-reporting" className="StaffTransportManagement-nav-link" activeClassName="StaffTransportManagement-active">Admin & Reporting</NavLink></li> */}
          </ul>
        </nav>
   
      </div>
  );
};

export default StaffTransNavbar;
