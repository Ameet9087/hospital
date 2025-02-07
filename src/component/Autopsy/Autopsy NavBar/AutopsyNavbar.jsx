import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './AutopsynavBar.css';

import AutopsyRequestForm from '../Autopsy Request Form/AutopsyRequestForm';
import AutopsySchedulingForm from '../Autopsy Scheduling Form/AutopsySchedulingForm';
import AutopsyExecutionForm from '../Autopsy Execution Form/AutopsyExecutionForm';
import AutopsyReportForm from '../Autopsy Report Form/AutopsyReportForm';
import AutopsyReportDistributionForm from '../Autopsy Report Distribution Form/AutopsyReportDistributionForm';

const AutopsyNavbar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="AtopsyNavbar-autopsy-navbar">
      <nav className="AtopsyNavbar-nav">
        <ul className="AtopsyNavbar-ul">
          <li className="AtopsyNavbar-nav-item">
            <Link
              to="/autopsy/autopsyexecutionform"
              className={`AtopsyNavbar-link ${activeLink === '/autopsyrequestform' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/autopsyrequestform')}
            >
              Autopsy Request Form
            </Link>
          </li>
          <li className="AtopsyNavbar-nav-item">
            <Link
              to="/autopsy/autopsyschedulingform"
              className={`AtopsyNavbar-link ${activeLink === '/autopsyschedulingform' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/autopsyschedulingform')}
            >
              Autopsy Scheduling Form
            </Link>
          </li>
          <li className="AtopsyNavbar-nav-item">
            <Link
              to="/autopsy/autopsyexecutionform"
              className={`AtopsyNavbar-link ${activeLink === '/autopsyexecutionform' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/autopsyexecutionform')}
            >
              Autopsy Execution Form
            </Link>
          </li>
          <li className="AtopsyNavbar-nav-item">
            <Link
              to="/autopsy/autopsyreportform"
              className={`AtopsyNavbar-link ${activeLink === '/autopsyreportform' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/autopsyreportform')}
            >
              Autopsy Report Form
            </Link>
          </li>
          <li className="AtopsyNavbar-nav-item">
            <Link
              to="/autopsy/autopsyreportdistributionform"
              className={`AtopsyNavbar-link ${activeLink === '/autopsyreportdistributionform' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/autopsyreportdistributionform')}
            >
              Autopsy Report Distribution Form
            </Link>
          </li>
        </ul>
      </nav>

      <div className="AtopsyNavbar-content">
        <Routes>
          <Route path="/autopsyrequestform" element={<AutopsyRequestForm />} />
          <Route path="/autopsyschedulingform" element={<AutopsySchedulingForm />} />
          <Route path="/autopsyexecutionform" element={<AutopsyExecutionForm />} />
          <Route path="/autopsyreportform" element={<AutopsyReportForm />} />
          <Route path="/autopsyreportdistributionform" element={<AutopsyReportDistributionForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AutopsyNavbar;
