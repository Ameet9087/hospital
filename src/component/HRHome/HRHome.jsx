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
                    to="/employee-list"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Employee List
                </NavLink>
                <NavLink
                    to="/employee-attendance"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Attendance
                </NavLink>
                <NavLink
                    to="/employee-schedule"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Employee Schedule
                </NavLink>
                <NavLink
                    to="/employee-leave"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Employee Leave
                </NavLink>
                <NavLink
                    to="/employee-performance"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Performance Evaluation
                </NavLink>

                <NavLink
                    to="/employee-payroll"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Payroll
                </NavLink>

                <NavLink
                    to="/employee-recruitment"
                    className={({ isActive }) =>
                        isActive ? "HRHome-navigation-link active" : "HRHome-navigation-link"
                    }
                >
                    Recruitment Management
                </NavLink>





            </nav>

            <div className="HRHome-content">
                <Routes>
                    <Route path="/employee-list" element={<AllEmployee />} />
                    <Route path="/employee-attendance" element={<Attendance />} />
                    <Route path="/employee-schedule" element={<EmpSchedule />} />
                    <Route path="/employee-leave" element={<EmpLeave />} />
                    <Route path="/employee-performance" element={<PerformanceEvaluation />} />
                    <Route path="/employee-payroll" element={<Payroll />} />
                    <Route path="/employee-recruitment" element={<RecrutierMng />} />
                </Routes>
            </div>
        </div>
    );
};

export default HRHome;

