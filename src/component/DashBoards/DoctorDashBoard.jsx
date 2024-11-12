import React, { useEffect, useState } from 'react';
import './DoctorDashBoard.css'; // Make sure to create and include the CSS file
import PatientRecord from './OutPatient'; // Import the PatientRecord component
import InPatient from '../DashBoards/InPatient'; // Import the InPatient component
import Records from '../DashBoards/PatientsRecord'; // Import the Records component
import DoctorAppointment from './DoctorAppointment/doctorAppointment';
import DoctorLeave from './DoctorLeave/doctorLeave';
import DoctorPayoutSummary from './DoctorPayoutSummary/doctorPayoutSummary';
import DoctorAccountSettings from './DoctorAccountSettings/doctorAccountSettings';
import DoctorPaymentQuery from './DoctorPaymentQuery/doctorPaymentQuery';
import DoctorHandover from './DoctorHandover/doctorHandover';
import DoctorTakeover from './DoctorTakeover/doctorTakeover';
import DoctorFeePaymentVoucher from './DoctorFeePaymentVoucher/doctorFeePaymentVoucher';
import ICUDoctorEMR from './ICUDoctorEMR/iCUDoctorEMR';
import OTScheduleForDoctor from './OTScheduleForDoctor/oTScheduleForDoctor';
import DoctorLeaveApprove from './DoctorLeaveApprove/doctorLeaveApprove';
import DoctorsNightDutyRoster from './DoctorsNightDutyRoster/doctorsNightDutyRoster';
import DoctorsPaymentGuaranteeForm from './DoctorsPaymentGuaranteeForm/doctorsPaymentGuaranteeForm';
import CriticalValuePatientsForDoctor from './CriticalValuePatientsForDoctor/criticalValuePatientsForDoctor';
import CrossConsultationDetailsforDoctor from './CrossConsultationDetailsforDoctor/crossConsultationDetailsforDoctor';
import DiscountforDoctorServices from './DiscountforDoctorServices/discountforDoctorServices';
import DoctorAppointmentScheduleReport from './DoctorAppointmentScheduleReport/doctorAppointmentScheduleReport';

const DrDashboard = () => {
  // State to manage which content to display
  const [activeSection, setActiveSection] = useState('outPatient');

  useEffect(() => {
    // Add any necessary side effects here
  }, [activeSection]);

  // Function to handle button clicks
  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="doctor-dashboard-container">
      <div className="doctor-dashboard-button-group">
        <button
          className={`dashboard-button ${activeSection === 'outPatient' ? 'active' : ''}`}
          onClick={() => handleButtonClick('outPatient')}
        >
          Out Patient
        </button>
        <button
          className={`dashboard-button ${activeSection === 'inPatient' ? 'active' : ''}`}
          onClick={() => handleButtonClick('inPatient')}
        >
          In Patient Department
        </button>
        <button
          className={`dashboard-button ${activeSection === 'patientRecord' ? 'active' : ''}`}
          onClick={() => handleButtonClick('patientRecord')}
        >
          Patient Record
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorAppointment' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorAppointment')}
        >
          Doctor Appointments
        </button>
        {/* <button
          className={`dashboard-button ${activeSection === 'patientRecord' ? 'active' : ''}`}
          onClick={() => handleButtonClick('patientRecord')}
        >
          Doctor Appt
        </button> */}
        <button
          className={`dashboard-button ${activeSection === 'doctorLeave' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorLeave')}
        >
          Doctor Leave
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorLeaveApprove' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorLeaveApprove')}
        >
          Doctor Leave Approve
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorPayoutSummary' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorPayoutSummary')}
        >
          Doctor Payout Summary
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorAccountSettings' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorAccountSettings')}
        >
          Doctor Account Settings
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorHandover' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorHandover')}
        >
           Doctor Handover
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorTakeover' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorTakeover')}
        >
           Doctor Takeover
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorFeePaymentVoucher' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorFeePaymentVoucher')}
        >
           Doctor Fee Payment Voucher
        </button>
        <button
          className={`dashboard-button ${activeSection === 'iCUDoctorEMR' ? 'active' : ''}`}
          onClick={() => handleButtonClick('iCUDoctorEMR')}
        >
           ICU Doctor EMR
        </button>
        <button
          className={`dashboard-button ${activeSection === 'oTScheduleForDoctor' ? 'active' : ''}`}
          onClick={() => handleButtonClick('oTScheduleForDoctor')}
        >
           OT Schedule For Doctor
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorsNightDutyRoster' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorsNightDutyRoster')}
        >
           Doctors Night Duty Roster
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorsPaymentGuaranteeForm' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorsPaymentGuaranteeForm')}
        >
           Doctors Payment Guarantee Form
        </button>
        <button
          className={`dashboard-button ${activeSection === 'criticalValuePatientsForDoctor' ? 'active' : ''}`}
          onClick={() => handleButtonClick('criticalValuePatientsForDoctor')}
        >
           Critical Value Patients For Doctor
        </button>
        <button
          className={`dashboard-button ${activeSection === 'crossConsultationDetailsforDoctor' ? 'active' : ''}`}
          onClick={() => handleButtonClick('crossConsultationDetailsforDoctor')}
        >
           Critical Value Patients For Doctor
        </button>
        <button
          className={`dashboard-button ${activeSection === 'discountforDoctorServices' ? 'active' : ''}`}
          onClick={() => handleButtonClick('discountforDoctorServices')}
        >
           Discount for Doctor Services
        </button>
        <button
          className={`dashboard-button ${activeSection === 'doctorAppointmentScheduleReport' ? 'active' : ''}`}
          onClick={() => handleButtonClick('doctorAppointmentScheduleReport')}
        >
           Doctor Appointment Schedule Report
        </button>
      </div>

      {/* Conditionally render content based on activeSection */}
      {activeSection === 'outPatient' && <PatientRecord />}
      {activeSection === 'inPatient' && <InPatient />}
      {activeSection === 'patientRecord' && <Records />}
      {activeSection === 'doctorAppointment' && <DoctorAppointment />}
      {activeSection === 'doctorLeave' && <DoctorLeave />}
      {activeSection === 'doctorLeaveApprove' && <DoctorLeaveApprove />}
      {activeSection === 'doctorPayoutSummary' && <DoctorPayoutSummary />}
      {activeSection === 'doctorAccountSettings' && <DoctorAccountSettings />}
      {activeSection === 'doctorPaymentQuery' && <DoctorPaymentQuery />}
      {activeSection === 'doctorHandover' && <DoctorHandover />}
      {activeSection === 'doctorTakeover' && <DoctorTakeover />}
      {activeSection === 'doctorFeePaymentVoucher' && <DoctorFeePaymentVoucher />}
      {activeSection === 'iCUDoctorEMR' && <ICUDoctorEMR />}
      {activeSection === 'oTScheduleForDoctor' && <OTScheduleForDoctor />}
      {activeSection === 'doctorsNightDutyRoster' && <DoctorsNightDutyRoster />}
      {activeSection === 'doctorsPaymentGuaranteeForm' && <DoctorsPaymentGuaranteeForm />}
      {activeSection === 'criticalValuePatientsForDoctor' && <CriticalValuePatientsForDoctor />}
      {activeSection === 'crossConsultationDetailsforDoctor' && <CrossConsultationDetailsforDoctor />}
      {activeSection === 'discountforDoctorServices' && <DiscountforDoctorServices />}
      {activeSection === 'doctorAppointmentScheduleReport' && <DoctorAppointmentScheduleReport />}

    </div>
  );
}

export default DrDashboard;

