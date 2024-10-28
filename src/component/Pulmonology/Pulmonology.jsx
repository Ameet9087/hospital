import React from 'react';
import RespiratoryFunctionTests from './RespiratoryFunctionTests/respiratoryFunctionTests';
import FollowUpScheduling from './Follow-UpScheduling/follow-UpScheduling';
import ImagingandLabReports from './ImagingandLabReports/ImagingandLabReports';
import MedicationManagement from './MedicationManagement/medicationManagement';
import PulmonaryRehabilitation from './PulmonaryRehabilitation/pulmonaryRehabilitation';
import { NavLink, Routes, Route } from 'react-router-dom';
import './pulmonology.css'; // Optional CSS for styling

function Pulmonology() {
  return (
    <div>
      <header>
        <nav>
          <ul className="pulmonology-navbar">
            <li>
              <NavLink to="/respiratory-function-tests" className="pulmonology-nav-link" activeClassName="active">Respiratory Function Tests</NavLink>
            </li>
            <li>
              <NavLink to="/pulmonary-rehabilitation" className="pulmonology-nav-link" activeClassName="active">Pulmonary Rehabilitation</NavLink>
            </li>
            <li>
              <NavLink to="/imaging-lab-reports" className="pulmonology-nav-link" activeClassName="active">Imaging and Lab Reports</NavLink>
            </li>
            <li>
              <NavLink to="/medication-management" className="pulmonology-nav-link" activeClassName="active">Medication Management</NavLink>
            </li>
            <li>
              <NavLink to="/follow-up-scheduling" className="pulmonology-nav-link" activeClassName="active">Follow-Up Scheduling</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <Routes>
          <Route path="/respiratory-function-tests" element={<RespiratoryFunctionTests />} />
          <Route path="/pulmonary-rehabilitation" element={<PulmonaryRehabilitation />} />
          <Route path="/imaging-lab-reports" element={<ImagingandLabReports />} />
          <Route path="/medication-management" element={<MedicationManagement />} />
          <Route path="/follow-up-scheduling" element={<FollowUpScheduling />} />
        </Routes>
      </div>
    </div>
  );
}

export default Pulmonology;
