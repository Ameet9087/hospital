import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const location = useLocation();

    // Determine which submenu should be open based on the current path
    const isAdmissionSubNavOpen = location.pathname.startsWith('/report/admission');
    const isPatientSubNavOpen = location.pathname.startsWith('/report/patient');
    const isRadiologySubNavOpen = location.pathname.startsWith('/report/radiology');
    const isLabSubNavOpen = location.pathname.startsWith('/report/lab');
    const isAppointmentSubNavOpen = location.pathname.startsWith('/report/appointment');
    const isBillingReportsSubNavOpen = location.pathname.startsWith('/billingreports');

    return (
        <div>
            <nav className="reports-tabs-nav">
                <NavLink 
                    to="/report/admission" 
                    className={`reports-nav-link ${isAdmissionSubNavOpen ? 'active' : ''}`}
                >
                    Admission
                </NavLink>
                <NavLink 
                    to="/report/billingreports" 
                    className={`reports-nav-link ${isBillingReportsSubNavOpen ? 'active' : ''}`}
                >
                    Billing Reports
                </NavLink>
                <NavLink 
                    to="/report/appointment" 
                    className={`reports-nav-link ${isAppointmentSubNavOpen ? 'active' : ''}`}
                >
                    Appointment
                </NavLink>
                <NavLink 
                    to="/report/radiology" 
                    className={`reports-nav-link ${isRadiologySubNavOpen ? 'active' : ''}`}
                >
                    Radiology
                </NavLink>
                <NavLink to="/report/lab" className="reports-nav-link">Lab</NavLink>
                <NavLink to="/report/doctors" className="reports-nav-link">Doctors</NavLink>
                <NavLink 
                    to="/report/patient" 
                    className={`reports-nav-link ${isPatientSubNavOpen ? 'active' : ''}`}
                >
                    Patient
                </NavLink>
                <NavLink to="/report/policecase" className="reports-nav-link">Police Case</NavLink>
            </nav>

            {/* Admission Submenu */}
            {isAdmissionSubNavOpen && ( 
                <div className="patient-sub-nav-container">
                    <div className="Appointment-sub-nav">
                        <Link to="/report/admission/InPatientCensusReport" className="patient-nav-link">InPatient Census Report</Link>
                        <Link to="/report/admission/AdmittedPatient" className="patient-nav-link">Admitted Patient</Link>
                        <Link to="/report/admission/DischargedPatient" className="patient-nav-link">Discharged Patient</Link>
                        <Link to="/report/admission/TransferredPatient" className="patient-nav-link">Transferred Patient</Link>
                        <Link to="/report/admission/DiagnosisWisePatient" className="patient-nav-link">DiagnosisWise Patient</Link>
                        <Link to="/report/admission/AdmissionDischargeList" className="patient-nav-link">Admission Discharge List</Link>
                        <Link to="/report/admission/RankMembershipWiseAdmittedPatient" className="patient-nav-link">Rank-MembershipWise Admitted Patient Report</Link>
                        <Link to="/report/admission/InPatientOutstanding" className="patient-nav-link">InPatient Outstanding Report</Link>
                        <Link to="/report/admission/RankMembershipWiseDischargedPatient" className="patient-nav-link">Rank-MembershipWise Discharged Patient Report</Link>
                    </div>
                </div>
            )}

            {/* Patient Submenu */}
            {isPatientSubNavOpen && (
                <div className="patient-sub-nav-container">
                    <div className="Appointment-sub-nav">
                        <Link to="/report/patient/Registration" className="patient-nav-link">Registration Report</Link>
                        <Link to="/report/patient/EditedDetails" className="patient-nav-link">Edited Patient Detail Report</Link>
                    </div>
                </div>
            )}

            {/* Radiology Submenu */}
            {isRadiologySubNavOpen && (
                <div className="patient-sub-nav-container">
                    <div className="Appointment-sub-nav">
                        <Link to="/report/radiology/TotalRevenue" className="patient-nav-link">Total Revenue</Link>
                        <Link to="/report/radiology/CategoryWise" className="patient-nav-link">Category Wise Report</Link>
                        <Link to="/report/radiology/FilmTypeCount" className="patient-nav-link">FilmType Count</Link>
                    </div>
                </div>
            )}

            {/* Appointment Submenu */}
            {isAppointmentSubNavOpen && ( 
                <div className="patient-sub-nav-container">
                    <div className="Appointment-sub-nav">
                        <Link to="/report/appointment/Details" className="patient-nav-link">Details</Link>
                        <Link to="/report/appointment/CountyWise" className="patient-nav-link">County Wise</Link>
                        <Link to="/report/appointment/DepartmentWise" className="patient-nav-link">Department Wise</Link>
                        <Link to="/report/appointment/DoctorWiseOutPatient" className="patient-nav-link">DoctorWise OutPatient</Link>
                        <Link to="/report/appointment/PhoneBookAppointmentReport" className="patient-nav-link">PhoneBook Appointment Report</Link>
                        <Link to="/report/appointment/DepartmentWiseRankCount" className="patient-nav-link">Department Wise Rank Count</Link>
                        <Link to="/report/appointment/DepartmentWiseStatReport" className="patient-nav-link">Department Wise Stat Report</Link>
                        <Link to="/report/appointment/GeographicalStatReport" className="patient-nav-link">Geographical Stat Report</Link>
                        <Link to="/report/appointment/RankwiseDailyAppointmentReport" className="patient-nav-link">Rankwise Daily Appointment Report</Link>
                        <Link to="/report/appointment/AgeClassifiedStatsReport" className="patient-nav-link">Age Classified Stats Report (OP)</Link>
                        <Link to="/report/appointment/DoctorWiseStatisticsReport" className="patient-nav-link">Doctor Wise Statistics Report</Link>
                        <Link to="/report/appointment/DayAndMonthwiseVisitReport" className="patient-nav-link">Day And Monthwise Visit Report</Link>
                    </div>
                </div>
            )}

            {isLabSubNavOpen && (
                <div className='patient-sub-nav-container'>
                    <div className="Appointment-sub-nav">
                        <Link to="/report/lab/category-wise-report" className="patient-nav-link">Category Wise Report</Link>
                        <Link to="/report/lab/total-revenue" className="patient-nav-link">Total Revenue</Link>
                        <Link to="/report/lab/item-wise-lab" className="patient-nav-link">Item Vise Lab</Link>
                        <Link to="/report/lab/test-status-detail-report" className="patient-nav-link">Test Status Detail Report</Link>
                        <Link to="/report/lab/covid-country-wise" className="patient-nav-link">Covid Country Wise</Link>
                        <Link to="/report/lab/hiv-test-details-report" className="patient-nav-link">Hiv Test Details Report</Link>
                        <Link to="/report/lab/lab-culture-details-report" className="patient-nav-link">Lab Culture Details Report</Link>
                        <Link to="/report/lab/labtype-wise-test-count-report" className="patient-nav-link">LabType Wise Test Count Report</Link>
                        <Link to="/report/lab/covid-cases-detail-report" className="patient-nav-link">Covid Cases Details Report</Link>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Navigation;
