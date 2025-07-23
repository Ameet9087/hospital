import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const location = useLocation();

    // Determine which submenu should be open based on the current path
    const isAdmissionSubNavOpen = location.pathname.startsWith('/reports/admission');
    const isPatientSubNavOpen = location.pathname.startsWith('/reports/patient');
    const isRadiologySubNavOpen = location.pathname.startsWith('/reports/radiology');
    const isLabSubNavOpen = location.pathname.startsWith('/reports/lab');
    const isAppointmentSubNavOpen = location.pathname.startsWith('/reports/appointment');
    const isBillingReportsSubNavOpen = location.pathname.startsWith('/reports/billingreports');
    const isDoctorReportsSubNavOpen = location.pathname.startsWith('/reports/doctors')

    return (
        <div>
            <nav className="reports-tabs-nav">
                <NavLink
                    to="/reports/admission"
                    className={`reports-nav-link ${isAdmissionSubNavOpen ? 'active' : ''}`}
                >
                    Admission
                </NavLink>
                <NavLink
                    to="/reports/billingreports"
                    className={`reports-nav-link ${isBillingReportsSubNavOpen ? 'active' : ''}`}
                >
                    Billing Reports
                </NavLink>
                <NavLink
                    to="/reports/appointment"
                    className={`reports-nav-link ${isAppointmentSubNavOpen ? 'active' : ''}`}
                >
                    Appointment
                </NavLink>
                <NavLink
                    to="/reports/radiology"
                    className={`reports-nav-link ${isRadiologySubNavOpen ? 'active' : ''}`}
                >
                    Radiology
                </NavLink>
                <NavLink to="/reports/lab" className="reports-nav-link">Lab</NavLink>
                <NavLink to="/reports/doctors" className="reports-nav-link">Doctors</NavLink>
                <NavLink
                    to="/reports/patient"
                    className={`reports-nav-link ${isPatientSubNavOpen ? 'active' : ''}`}
                >
                    Patient
                </NavLink>
                {/* <NavLink to="/reports/policecase" className="reports-nav-link">Police Case</NavLink> */}
            </nav>

            {/* Admission Submenu */}
            {isAdmissionSubNavOpen && (
                <div className="patient-sub-nav-container">
                    <div className="Appointment-sub-nav">
                        <Link to="/reports/admission/InPatientCensusReport" className="patient-nav-link">InPatient Census Report</Link>
                        <Link to="/reports/admission/AdmittedPatient" className="patient-nav-link">Admitted Patient</Link>
                        <Link to="/reports/admission/DischargedPatient" className="patient-nav-link">Discharged Patient</Link>
                        <Link to="/reports/admission/TransferredPatient" className="patient-nav-link">Transferred Patient</Link>
                        {/* <Link to="/reports/admission/DiagnosisWisePatient" className="patient-nav-link">DiagnosisWise Patient</Link> */}
                        <Link to="/reports/admission/AdmissionDischargeList" className="patient-nav-link">Admission Discharge List</Link>
                        {/* <Link to="/reports/admission/RankMembershipWiseAdmittedPatient" className="patient-nav-link">Rank-MembershipWise Admitted Patient Report</Link>
                        <Link to="/reports/admission/InPatientOutstanding" className="patient-nav-link">InPatient Outstanding Report</Link>
                        <Link to="/reports/admission/RankMembershipWiseDischargedPatient" className="patient-nav-link">Rank-MembershipWise Discharged Patient Report</Link> */}
                    </div>
                </div>
            )}

            {/* Patient Submenu */}
            {isPatientSubNavOpen && (
                <div className="patient-sub-nav-container">
                    <div className="Appointment-sub-nav">
                        <Link to="/reports/patient/Registration" className="patient-nav-link">Registration Report</Link>
                        {/* <Link to="/reports/patient/EditedDetails" className="patient-nav-link">Edited Patient Detail Report</Link> */}
                    </div>
                </div>
            )}

            {/* Radiology Submenu */}
            {isRadiologySubNavOpen && (
                <div className="patient-sub-nav-container">
                    <div className="Appointment-sub-nav">
                        <Link to="/reports/radiology/TotalRevenue" className="patient-nav-link">Total Revenue</Link>
                        <Link to="/reports/radiology/CategoryWise" className="patient-nav-link">Category Wise Report</Link>
                        <Link to="/reports/radiology/FilmTypeCount" className="patient-nav-link">FilmType Count</Link>
                    </div>
                </div>
            )}

            {/* Appointment Submenu */}
            {isAppointmentSubNavOpen && (
                <div className="patient-sub-nav-container">
                    <div className="Appointment-sub-nav">
                        <Link to="/reports/appointment/Details" className="patient-nav-link">Details</Link>
                        <Link to="/reports/appointment/CountyWise" className="patient-nav-link">County Wise</Link>
                        <Link to="/reports/appointment/DepartmentWise" className="patient-nav-link">Department Wise</Link>
                        <Link to="/reports/appointment/DoctorWiseOutPatient" className="patient-nav-link">DoctorWise OutPatient</Link>
                        <Link to="/reports/appointment/PhoneBookAppointmentReport" className="patient-nav-link">PhoneBook Appointment Report</Link>
                        <Link to="/reports/appointment/DepartmentWiseRankCount" className="patient-nav-link">Department Wise Rank Count</Link>
                        <Link to="/reports/appointment/DepartmentWiseStatReport" className="patient-nav-link">Department Wise Stat Report</Link>
                        <Link to="/reports/appointment/GeographicalStatReport" className="patient-nav-link">Geographical Stat Report</Link>
                        <Link to="/reports/appointment/RankwiseDailyAppointmentReport" className="patient-nav-link">Rankwise Daily Appointment Report</Link>
                        <Link to="/reports/appointment/AgeClassifiedStatsReport" className="patient-nav-link">Age Classified Stats Report (OP)</Link>
                        <Link to="/reports/appointment/DoctorWiseStatisticsReport" className="patient-nav-link">Doctor Wise Statistics Report</Link>
                        <Link to="/reports/appointment/DayAndMonthwiseVisitReport" className="patient-nav-link">Day And Monthwise Visit Report</Link>
                    </div>
                </div>
            )}

            {isLabSubNavOpen && (
                <div className='patient-sub-nav-container'>
                    <div className="Appointment-sub-nav">
                        <Link to="/reports/lab/category-wise-report" className="patient-nav-link">Category Wise Report</Link>
                        <Link to="/reports/lab/total-revenue" className="patient-nav-link">Total Revenue</Link>
                        <Link to="/reports/lab/item-wise-lab" className="patient-nav-link">Item Vise Lab</Link>
                        <Link to="/reports/lab/test-status-detail-report" className="patient-nav-link">Test Status Detail Report</Link>
                        {/* <Link to="/reports/lab/covid-country-wise" className="patient-nav-link">Covid Country Wise</Link> */}
                        {/* <Link to="/reports/lab/hiv-test-details-report" className="patient-nav-link">Hiv Test Details Report</Link> */}
                        {/* <Link to="/reports/lab/lab-culture-details-report" className="patient-nav-link">Lab Culture Details Report</Link> */}
                        <Link to="/reports/lab/labtype-wise-test-count-report" className="patient-nav-link">LabType Wise Test Count Report</Link>
                        {/* <Link to="/reports/lab/covid-cases-detail-report" className="patient-nav-link">Covid Cases Details Report</Link> */}

                    </div>
                </div>
            )}
        </div>
    );
}

export default Navigation;
