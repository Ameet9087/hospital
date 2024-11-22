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
              <NavLink to="/pulmonology/respiratoryfunctiontests" className="pulmonology-nav-link" activeClassName="active">Respiratory Function Tests</NavLink>
            </li>
            <li>
              <NavLink to="/pulmonology/pulmonaryrehabilitation" className="pulmonology-nav-link" activeClassName="active">Pulmonary Rehabilitation</NavLink>
            </li>
            <li>
              <NavLink to="/pulmonology/imagingandlabreports" className="pulmonology-nav-link" activeClassName="active">Imaging and Lab Reports</NavLink>
            </li>
            <li>
              <NavLink to="/pulmonology/medicationmanagement" className="pulmonology-nav-link" activeClassName="active">Medication Management</NavLink>
            </li>
            <li>
              <NavLink to="/pulmonology/follow-upscheduling" className="pulmonology-nav-link" activeClassName="active">Follow-Up Scheduling</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <Routes>
          <Route path="/respiratoryfunctiontests" element={<RespiratoryFunctionTests />} />
          <Route path="/pulmonaryrehabilitation" element={<PulmonaryRehabilitation />} />
          <Route path="/imagingandlabreports" element={<ImagingandLabReports />} />
          <Route path="/medicationmanagement" element={<MedicationManagement />} />
          <Route path="/follow-upscheduling" element={<FollowUpScheduling />} />
        </Routes>
      </div>
    </div>
  );
}

export default Pulmonology;
