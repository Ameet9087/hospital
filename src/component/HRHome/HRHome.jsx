import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './HRHome.css';

import AllEmployee from './AllEmployee/AllEmployee';
import Attendance from './Attendance/Attendance';
import EmpSchedule from './EmpSchedule/EmpSchedule';
import EmpLeave from './EmpLeave/EmpLeave';
import PerformanceEvaluation from './PerformanceEvaluation/PerformanceEvaluation';
import Payroll from './Payroll/Payroll';
import RecrutierMng from './Recruitment/RecrutierMng';

const HRHome = () => {
    return (
        <div className="HRHome-container">
            <nav className="HRHome-nav">
                <NavLink
                    to="/hr/employeelist"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Employee List
                </NavLink>
                <NavLink
                    to="/hr/attendance"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Attendance
                </NavLink>
                {/* <NavLink
                    to="/hr/employeeschedule"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Employee Schedule
                </NavLink> */}
                <NavLink
                    to="/hr/employeeleave"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Employee Leave
                </NavLink>
                <NavLink
                    to="/hr/performanceevaluation"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Performance Evaluation
                </NavLink>

                <NavLink
                    to="/hr/payroll"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Payroll
                </NavLink>

                <NavLink
                    to="/hr/recruitmentmanagement"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Recruitment Management
                </NavLink>





            </nav>

            <div className="HRHome-content">
                <Routes>
                    <Route path="/employeelist" element={<AllEmployee />} />
                    <Route path="/attendance" element={<Attendance />} />
                    {/* <Route path="/employeeschedule" element={<EmpSchedule />} /> */}
                    <Route path="/employeeleave" element={<EmpLeave />} />
                    <Route path="/performanceevaluation" element={<PerformanceEvaluation />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/recruitmentmanagement" element={<RecrutierMng />} />
                </Routes>
            </div>
        </div>
    );
};

export default HRHome;

