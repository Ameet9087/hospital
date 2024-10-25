// /* Ravindra_Sanap_HRHome.jsx_04_10_2024_Start */


// import React, { useState } from 'react';
// import './HRHome.css';
// import AllEmployee from './AllEmployee/AllEmployee';
// import Attendance from './Attendance/Attendance';
// import EmpSchedule from './EmpSchedule/EmpSchedule';
// import EmpLeave from './EmpLeave/EmpLeave';
// import PerformanceEvaluation from './PerformanceEvaluation/PerformanceEvaluation';
// import Payroll from './Payroll/Payroll';
// import RecrutierMng from './Recruitment/RecrutierMng';

// function HRHome() {
//     const [activeSection, setActiveSection] = useState('section1');

//     const handleSectionClick = (section) => {
//         setActiveSection(section);
//     };

//     return (
//         <>
//             <div className='hrhome-navbar'>
//                 <div
//                     className={activeSection === 'section1' ? 'section active' : 'section'}
//                     onClick={() => handleSectionClick('section1')}
//                 >
//                     Employee List
//                 </div>
//                 <div
//                     className={activeSection === 'section2' ? 'section active' : 'section'}
//                     onClick={() => handleSectionClick('section2')}
//                 >
//                     Attendance
//                 </div>
//                 <div
//                     className={activeSection === 'section3' ? 'section active' : 'section'}
//                     onClick={() => handleSectionClick('section3')}
//                 >
//                     Employee Schedule
//                 </div>
//                 <div
//                     className={activeSection === 'section4' ? 'section active' : 'section'}
//                     onClick={() => handleSectionClick('section4')}
//                 >
//                     Employee Leave
//                 </div>
//                 <div
//                     className={activeSection === 'section5' ? 'section active' : 'section'}
//                     onClick={() => handleSectionClick('section5')}
//                 >
//                     Performance Evaluation
//                 </div>
//                 <div
//                     className={activeSection === 'section6' ? 'section active' : 'section'}
//                     onClick={() => handleSectionClick('section6')}
//                 >
//                     Payroll
//                 </div>
//                 <div
//                     className={activeSection === 'section7' ? 'section active' : 'section'}
//                     onClick={() => handleSectionClick('section7')}
//                 >
//                     Recruitment Management
//                 </div>
//             </div>

//             <div className="hrhome-content">
//                 {activeSection === 'section1' && <AllEmployee />}
//                 {activeSection === 'section2' && <Attendance />}
//                 {activeSection === 'section3' && <EmpSchedule />}
//                 {activeSection === 'section4' && <EmpLeave />}
//                 {activeSection === 'section5' && <PerformanceEvaluation />}
//                 {activeSection === 'section6' && <Payroll />}
//                 {activeSection === 'section7' && <RecrutierMng />}

//             </div>
//         </>
//     );
// }

// export default HRHome;



// /* Ravindra_Sanap_HRHome.jsx_04_10_2024_End */




import AllEmployee from './AllEmployee/AllEmployee';
import Attendance from './Attendance/Attendance';
import EmpSchedule from './EmpSchedule/EmpSchedule';
import EmpLeave from './EmpLeave/EmpLeave';
import PerformanceEvaluation from './PerformanceEvaluation/PerformanceEvaluation';
import Payroll from './Payroll/Payroll';
import RecrutierMng from './Recruitment/RecrutierMng';


import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import './HRHome.css'; // Importing the CSS file for styling

function HRHome() {
    const location = useLocation(); // Get the current route

    return (
        <div className="HRHome-container">
            <nav className="HRHome-navbar">
                <ul className="HRHome-nav-links">
                    <li>
                        <Link
                            to="/employee-list"
                            className={`HRHome-button ${location.pathname === '/asset-tracking' ? 'active' : ''}`}
                        >
                            Employee List
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/employee-attendance"
                            className={`HRHome-button ${location.pathname === '/asset-maintenance' ? 'active' : ''}`}
                        >
                            Attendance
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/employee-schedule"
                            className={`HRHome-button ${location.pathname === '/depreciation-calculation' ? 'active' : ''}`}
                        >
                            Employee Schedule
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/employee-leave"
                            className={`HRHome-button ${location.pathname === '/asset-disposal' ? 'active' : ''}`}
                        >
                            Employee Leave
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/employee-performance"
                            className={`HRHome-button ${location.pathname === '/asset-report' ? 'active' : ''}`}
                        >
                            Performance Evaluation
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/employee-payroll"
                            className={`HRHome-button ${location.pathname === '/asset-report' ? 'active' : ''}`}
                        >
                            Payroll
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/employee-recruitment"
                            className={`HRHome-button ${location.pathname === '/asset-report' ? 'active' : ''}`}
                        >
                            Recruitment Management
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="HRHome-content">
                <Routes>
                    <Route path="employee-list" element={<AllEmployee />} />
                    <Route path="employee-attendance" element={<Attendance />} />
                    <Route path="employee-schedule" element={<EmpSchedule />} />
                    <Route path="employee-leave" element={<EmpLeave />} />
                    <Route path="employee-performance" element={<PerformanceEvaluation />} />
                    <Route path="employee-payroll" element={<Payroll />} />
                    <Route path="employee-recruitment" element={<RecrutierMng />} />
                </Routes>
            </div>
        </div>
    );
}

export default HRHome;
