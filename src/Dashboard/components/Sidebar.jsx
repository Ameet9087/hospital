import React, { useState } from 'react'
import {
  LuChevronDown,
  LuChevronUp,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu'
import { TbUsers } from 'react-icons/tb'
import { FaClinicMedical, FaUserMd, FaFileInvoice } from 'react-icons/fa'
import './Sidebar.css'
import hospitallogo from '../Images/hospitallogo.png'
import { Link } from 'react-router-dom'
const Sidebar = ({
  isOpen,
  setIsOpen,
  onAppointmentClick,
  onSettings,
  onInventory,
  onIncentive,
  onLaboratory,
  onUtilites,
  onEmergency,
  onSystemAdmin,
  onSocialService,
  onDisprensary,
  onDynamicReport,
  onReport,
  onNurse,
  onDoctor,
  onOperationTheater,
  onNhif,
  onADT,
  onMKT,
  onClinical,
  onVaccination,
  onFixAssests,
  onCSSD,
  onAccounting,
  onQueueManagement,
  onMaternity,
  onHelpdesk,
  onRadiology,
  onPharmacy,
  onPatient,
  onVerification,
  onSubstoreClick,
  onMedicalRecord,
  onProcurement,
  onBilling,

  onHomehealthcare,
  onpediatricoutpatient,
  onpediatricinpatient,
  onphysiotherapy,

  
  onBloodbank,
  onTransport,
  onSuperUser,

  onHr,

  onRadiationTherapy,
  onendoscopy

}) => {
  const [openMenus, setOpenMenus] = useState({})
  const [activeLink, setActiveLink] = useState(null)

  const handleLinkClick = (menu) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }))
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (menu, submenu) => {
    setActiveLink(`${menu}-${submenu}`)
  }

  const handleAppointmentClick = () => {
    handleLinkClick('appointment')
    onAppointmentClick() // Call the passed function when appointment is clicked
  }
  const handleSettingClick = () => {
    handleLinkClick('setting')
    onSettings()
  }

  const handleInventoryClick = () => {
    handleLinkClick('inventory')
    onInventory()
  }
  const handleIncentiveClick = () => {
    handleLinkClick('incentive')
    onIncentive()
  }
  const handleLaboratoryClick = () => {
    handleLinkClick('laboratory')
    onLaboratory()
  }
  const handleUtilitesClick = () => {
    handleLinkClick('utilites')
    onUtilites()
  }
  const handleEmergencyClick = () => {
    handleLinkClick('emergency')
    onEmergency()
  }

  const handleSystemAdminClick = () => {
    handleLinkClick('systemAdmin')
    onSystemAdmin()
  }
  const handleSocialServiceClick = () => {
    handleLinkClick('socialService')
    onSocialService()
  }
  const handleDisprensaryClick = () => {
    handleLinkClick('disprensary')
    onDisprensary()
  }
  const handleDynamicReportClick = () => {
    handleLinkClick('dynamicReport')
    onDynamicReport()
  }
  const handleReportClick = () => {
    handleLinkClick('report')
    onReport()
  }
  const handleNurseClick = () => {
    handleLinkClick('nurse')
    onNurse()
  }
  const handleDoctor = () => {
    handleLinkClick('doctor')
    onDoctor()
  }
  const handleOprationTheaterClick = () => {
    handleLinkClick('operationTheater')
    onOperationTheater()
  }
  const handleNhifClick = () => {
    handleLinkClick('nhif')
    onNhif()
  }
  const handleAdtClick = () => {
    handleLinkClick('adt')
    onADT()
  }
  const handleMKTClick = () => {
    handleLinkClick('mkt')
    onMKT()
  }
  const handleClinical = () => {
    handleLinkClick('clinical')
    onClinical()
  }
  const handleVaccination = () => {
    handleLinkClick('vaccination')
    onVaccination()
  }

  const handleFixAssests = () => {
    handleLinkClick('fixAssest')
    onFixAssests()
  }
  const handleCSSD = () => {
    handleLinkClick('cssd')
    onCSSD()
  }
  const handleAccounting = () => {
    handleLinkClick('accounting')
    onAccounting()
  }
  const handleQueueManament = () => {
    handleLinkClick('queueManagement')
    onQueueManagement()
  }
  const handleMeternity = () => {
    handleLinkClick('maternity')
    onMaternity()
  }
  const handleHelpdesk = () => {
    handleLinkClick('helpdesk')
    onHelpdesk()
  }
  const handleRadiology = () => {
    handleLinkClick('radiology')
    onRadiology()
  }
  const handlePharmacyClick = () => {
    handleLinkClick('pharmacy')
    onPharmacy()
  }

  const handlepatientClick = () => {
    handleLinkClick('patient')
    onPatient()
  }
  const handleverificationClick = () => {
    handleLinkClick('verification')
    onVerification()
  }

  const handleSubstoreClick = () => {
    handleLinkClick('substore')
    onSubstoreClick()
  }

  const handleMedicalRecord = () => {
    handleLinkClick('medicalrecord')
    onMedicalRecord()
  }
  const handleProcurement = () => {
    handleLinkClick('procurement')
    onProcurement()
  }

  const handleBilling = () => {
    handleLinkClick('billing')
    onBilling()
  }

  const handlebBloodbank = () => {
    handleLinkClick('bloodbank')
    onBloodbank()
  }

  const handleTransport = () => {
    handleLinkClick('transport')
    onTransport()
  }


  const handlehomehealthcareClick=()=>{
    handleLinkClick("homehealthcare");
    onHomehealthcare();
  }

  
  const handlePaediatricOutPatientClick=()=>{
    handleLinkClick("pediatricoutpatient");
    onpediatricoutpatient();
  }



  const handlepediatricinpatientClick=()=>{
    handleLinkClick("pediatricinpatient");
    onpediatricinpatient();
  }



  const handlephysiotherapyClick=()=>{
    handleLinkClick("physiotherapy");
    onphysiotherapy();
  }

  const handleSuperUserClick = () => {
    handleLinkClick('superUser')
    onSuperUser()
  }

  const handleHr = () => {
    handleLinkClick('hr')
    onHr()
  }

  const handleRadiationTherapy = () => {
    handleLinkClick('radiationTherapy')
    onRadiationTherapy()
  }
  

  const handleendoscopyClick = () => {
    handleLinkClick('endoscopy')
    onendoscopy()
  }

  return (
    <div className={`custom-sidebar ${isOpen ? '' : 'custom-sidebar-closed'}`}>
      {/* <button className="custom-toggle-button" onClick={toggleSidebar}>
        {isOpen ? <LuChevronLeft size={20} /> : <LuChevronRight size={20} />}
      </button> */}
      <div className="custom-logo-container">
        {isOpen ? (
          <span>
            <img
              style={{ width: '30px', marginRight: '10px' }}
              src={hospitallogo}
              alt="Hospital Logo"
            />
            <span>HIMS</span>
          </span>
        ) : (
          <img
            style={{ width: '30px' }}
            src={hospitallogo}
            alt="Hospital Logo"
          />
        )}
      </div>
      <ul className="custom-sidebar-links">
        <li
          className={`custom-nav-item ${
            activeLink === 'dispensary-submenu1' ||
            activeLink === 'dispensary-submenu2' ||
            activeLink === 'dispensary-submenu3' ||
            activeLink === 'dispensary-submenu4' ||
            activeLink === 'dispensary-submenu5' ||
            activeLink === 'dispensary-submenu6' ||
            activeLink === 'dispensary-submenu7'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleDisprensaryClick}
          >
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && <span className="custom-nav-link-text">Dispensary</span>}
            <span className="custom-dropdown-icon">
              {openMenus.dispensary ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.dispensary && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('dispensary', 'submenu1')}
                className={
                  activeLink === 'dispensary-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/disPrescription">Prescription</Link>
              </li>
              <li
                onClick={() => handleItemClick('dispensary', 'submenu2')}
                className={
                  activeLink === 'dispensary-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/dispenSales">Sale</Link>
              </li>
              <li
                onClick={() => handleItemClick('dispensary', 'submenu3')}
                className={
                  activeLink === 'dispensary-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/salesStockDetails">Stock</Link>
              </li>
              <li
                onClick={() => handleItemClick('dispensary', 'submenu4')}
                className={
                  activeLink === 'dispensary-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/dispenCouter">Counter </Link>
              </li>
              <li
                onClick={() => handleItemClick('dispensary', 'submenu5')}
                className={
                  activeLink === 'dispensary-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/dispenReportList">Reports </Link>
              </li>
              <li
                onClick={() => handleItemClick('dispensary', 'submenu5')}
                className={
                  activeLink === 'dispensary-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/dispenPatientConsump">Patient Consumption </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'superUser-submenu1' ||
            activeLink === 'superUser-submenu2' ||
            activeLink === 'superUser-submenu3' ||
            activeLink === 'superUser-submenu4' ||
            activeLink === 'superUser-submenu5' ||
            activeLink === 'superUser-submenu6' ||
            activeLink === 'superUser-submenu7' ||
            activeLink === 'superUser-submenu8'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleSuperUserClick}
          >
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && <span className="custom-nav-link-text">SuperUser</span>}
            <span className="custom-dropdown-icon">
              {openMenus.superUser ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.superUser && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('superUser', 'submenu1')}
                className={
                  activeLink === 'superUser-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/revenuemgnt">Revenue Management</Link>
              </li>
              <li
                onClick={() => handleItemClick('superUser', 'submenu2')}
                className={
                  activeLink === 'superUser-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/sUPermission">Permission</Link>
              </li>
              <li
                onClick={() => handleItemClick('superUser', 'submenu3')}
                className={
                  activeLink === 'superUser-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/billingNavbar">Billing Discount Approval</Link>
              </li>
              <li
                onClick={() => handleItemClick('superUser', 'submenu4')}
                className={
                  activeLink === 'superUser-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/homePage">Message Broadcast</Link>
              </li>
              <li
                onClick={() => handleItemClick('superUser', 'submenu5')}
                className={
                  activeLink === 'superUser-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/facilityService">Facility Services </Link>
              </li>
              <li
                onClick={() => handleItemClick('superUser', 'submenu6')}
                className={
                  activeLink === 'superUser-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/administration">Administration </Link>
              </li>
              <li
                onClick={() => handleItemClick('superUser', 'submenu7')}
                className={
                  activeLink === 'superUser-submenu7'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/vendorNavba">Vendor and Supply Management </Link>
              </li>
              <li
                onClick={() => handleItemClick('superUser', 'submenu8')}
                className={
                  activeLink === 'superUser-submenu8'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/controlAllDeptRoute">Control All Department</Link>
              </li>

              <li
                onClick={() => handleItemClick('superUser', 'submenu8')}
                className={
                  activeLink === 'superUser-submenu8'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Superusermodulemain/*">User Account Management</Link>
              </li>
              <li
                onClick={() => handleItemClick('superUser', 'submenu8')}
                className={
                  activeLink === 'superUser-submenu8'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/rolemgnt">Role Management</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'medicalrecord-submenu1' ||
            activeLink === 'medicalrecord-submenu2' ||
            activeLink === 'medicalrecord-submenu3' ||
            activeLink === 'medicalrecord-submenu4' ||
            activeLink === 'medicalrecord-submenu5' ||
            activeLink === 'medicalrecord-submenu6'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleMedicalRecord}
          >
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">MedicalRecord</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.medicalrecord ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.medicalrecord && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('medicalrecord', 'submenu1')}
                className={
                  activeLink === 'medicalrecord-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/MROutPatientList">MR Outpatient List</Link>
              </li>
              <li
                onClick={() => handleItemClick('medicalrecord', 'submenu2')}
                className={
                  activeLink === 'medicalrecord-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/MRInpatientList">MR Inpatient List</Link>
              </li>
              <li
                onClick={() => handleItemClick('medicalrecord', 'submenu3')}
                className={
                  activeLink === 'medicalrecord-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/BirthList">Birth List</Link>
              </li>
              <li
                onClick={() => handleItemClick('medicalrecord', 'submenu4')}
                className={
                  activeLink === 'medicalrecord-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/DeathList">Death List </Link>
              </li>
              <li
                onClick={() => handleItemClick('medicalrecord', 'submenu5')}
                className={
                  activeLink === 'medicalrecord-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/MedicalRecordReport">Reports </Link>
              </li>
              <li
                onClick={() => handleItemClick('medicalrecord', 'submenu6')}
                className={
                  activeLink === 'medicalrecord-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/EmergencyPatientList">Emergency Patient List</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'transport-submenu1' ||
            activeLink === 'transport-submenu2' ||
            activeLink === 'transport-submenu3' ||
            activeLink === 'transport-submenu4' ||
            activeLink === 'transport-submenu5' ||
            activeLink === 'transport-submenu6' ||
            activeLink === 'transport-submenu7'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleTransport}>
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && <span className="custom-nav-link-text">Transport</span>}
            <span className="custom-dropdown-icon">
              {openMenus.transport ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.transport && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('transport', 'submenu1')}
                className={
                  activeLink === 'transport-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodDonationForm">Blood Donation Registration</Link>
              </li>
              <li
                onClick={() => handleItemClick('transport', 'submenu2')}
                className={
                  activeLink === 'transport-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodcollectionmain">Blood Collection</Link>
              </li>
              <li
                onClick={() => handleItemClick('transport', 'submenu3')}
                className={
                  activeLink === 'transport-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/hIMSSampleDataTable">
                  Blood Testing and Screening
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('transport', 'submenu4')}
                className={
                  activeLink === 'transport-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodStorageDashboard">Blood Storage</Link>
              </li>
              <li
                onClick={() => handleItemClick('transport', 'submenu5')}
                className={
                  activeLink === 'transport-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodReq">Blood Request</Link>
              </li>
              <li
                onClick={() => handleItemClick('transport', 'submenu6')}
                className={
                  activeLink === 'transport-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodIssue">Blood Issues</Link>
              </li>
              <li
                onClick={() => handleItemClick('bloodbank', 'submenu7')}
                className={
                  activeLink === 'bloodbank-submenu7'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bBReport">Reports</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'bloodbank-submenu1' ||
            activeLink === 'bloodbank-submenu2' ||
            activeLink === 'bloodbank-submenu3' ||
            activeLink === 'bloodbank-submenu4' ||
            activeLink === 'bloodbank-submenu5' ||
            activeLink === 'bloodbank-submenu6'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handlebBloodbank}>
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && <span className="custom-nav-link-text">BloodBank</span>}
            <span className="custom-dropdown-icon">
              {openMenus.bloodbank ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.bloodbank && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('bloodbank', 'submenu1')}
                className={
                  activeLink === 'bloodbank-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodDonationForm">Blood Donation Registration</Link>
              </li>
              <li
                onClick={() => handleItemClick('bloodbank', 'submenu2')}
                className={
                  activeLink === 'bloodbank-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodcollectionmain">Blood Collection</Link>
              </li>
              <li
                onClick={() => handleItemClick('bloodbank', 'submenu3')}
                className={
                  activeLink === 'bloodbank-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/hIMSSampleDataTable">
                  Blood Testing and Screening
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('bloodbank', 'submenu4')}
                className={
                  activeLink === 'bloodbank-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodStorageDashboard">Blood Storage</Link>
              </li>
              <li
                onClick={() => handleItemClick('bloodbank', 'submenu5')}
                className={
                  activeLink === 'bloodbank-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodReq">Blood Request</Link>
              </li>
              <li
                onClick={() => handleItemClick('bloodbank', 'submenu6')}
                className={
                  activeLink === 'bloodbank-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bloodIssue">Blood Issues</Link>
              </li>
              <li
                onClick={() => handleItemClick('bloodbank', 'submenu6')}
                className={
                  activeLink === 'bloodbank-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bBReport">Reports</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'billing-submenu1' ||
            activeLink === 'billing-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleBilling}>
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && <span className="custom-nav-link-text">Billing</span>}
            <span className="custom-dropdown-icon">
              {openMenus.billing ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.billing && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('billing', 'submenu1')}
                className={
                  activeLink === 'billing-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/ipbilling">Ip Billing</Link>
              </li>
              <li
                onClick={() => handleItemClick('billing', 'submenu2')}
                className={
                  activeLink === 'billing-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Search_Patient">Op Billing</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'pharmacy-submenu1' ||
            activeLink === 'pharmacy-submenu2' ||
            activeLink === 'pharmacy-submenu3' ||
            activeLink === 'pharmacy-submenu4' ||
            activeLink === 'pharmacy-submenu5' ||
            activeLink === 'pharmacy-submenu6' ||
            activeLink === 'pharmacy-submenu7'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handlePharmacyClick}
          >
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && <span className="custom-nav-link-text">Pharmacy</span>}
            <span className="custom-dropdown-icon">
              {openMenus.pharmacy ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.pharmacy && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('pharmacy', 'submenu1')}
                className={
                  activeLink === 'pharmacy-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/order">Order</Link>
              </li>
              <li
                onClick={() => handleItemClick('pharmacy', 'submenu2')}
                className={
                  activeLink === 'pharmacy-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/SupplierLedgerComponent">Supplier</Link>
              </li>
              <li
                onClick={() => handleItemClick('pharmacy', 'submenu3')}
                className={
                  activeLink === 'pharmacy-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="report">Report</Link>
              </li>
              <li
                onClick={() => handleItemClick('pharmacy', 'submenu4')}
                className={
                  activeLink === 'pharmacy-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/setting">Setting </Link>
              </li>
              <li
                onClick={() => handleItemClick('pharmacy', 'submenu5')}
                className={
                  activeLink === 'pharmacy-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/store">Store </Link>
              </li>
              <li
                onClick={() => handleItemClick('pharmacy', 'submenu6')}
                className={
                  activeLink === 'pharmacy-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/SupplierHeaderCom">Supplier Ledger</Link>
              </li>
              <li
                onClick={() => handleItemClick('pharmacy', 'submenu7')}
                className={
                  activeLink === 'pharmacy-submenu7'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/SubstoreDispatchCom">Substore Request/Dispatch</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'procurement-submenu1' ||
            activeLink === 'procurement-submenu2' ||
            activeLink === 'procurement-submenu3' ||
            activeLink === 'procurement-submenu4' ||
            activeLink === 'procurement-submenu5' ||
            activeLink === 'procurement-submenu6'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleProcurement}>
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">Procurement</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.procurement ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.procurement && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('procurement', 'submenu1')}
                className={
                  activeLink === 'procurement-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Procurement">Purchase Request</Link>
              </li>
              <li
                onClick={() => handleItemClick('procurement', 'submenu2')}
                className={
                  activeLink === 'procurement-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/MRInpatientList">Purchase Order</Link>
              </li>
              <li
                onClick={() => handleItemClick('procurement', 'submenu3')}
                className={
                  activeLink === 'procurement-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/BirthList">Goods Arrival Notification</Link>
              </li>
              <li
                onClick={() => handleItemClick('procurement', 'submenu4')}
                className={
                  activeLink === 'procurement-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/DeathList">Quotation</Link>
              </li>
              <li
                onClick={() => handleItemClick('procurement', 'submenu5')}
                className={
                  activeLink === 'procurement-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/MedicalRecordReport">Settings</Link>
              </li>
              <li
                onClick={() => handleItemClick('procurement', 'submenu6')}
                className={
                  activeLink === 'procurement-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/EmergencyPatientList">Reports</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'verification-submenu1' ||
            activeLink === 'verification-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleverificationClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">Verification</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.verification ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.verification && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('verification', 'submenu1')}
                className={
                  activeLink === 'verification-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Inventory">Inventory</Link>
              </li>
              <li
                onClick={() => handleItemClick('patient', 'submenu2')}
                className={
                  activeLink === 'patient-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Pharmacy">Pharmacy</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'patient-submenu1' ||
            activeLink === 'patient-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handlepatientClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Patient</span>}
            <span className="custom-dropdown-icon">
              {openMenus.patient ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.patient && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('patient', 'submenu1')}
                className={
                  activeLink === 'patient-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/SearchPatient">Search Patient</Link>
              </li>
              <li
                onClick={() => handleItemClick('patient', 'submenu2')}
                className={
                  activeLink === 'patient-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/RegisterPatient">Register Patient</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'dynamicReport-submenu1'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleDynamicReportClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">Dynamic Report</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.dynamicReport ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'oprationTheatre-submenu1' ||
            activeLink === 'oprationTheatre-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleOprationTheaterClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">Opration Theater</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.oprationTheatre ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.oprationTheatre && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('oprationTheatre', 'submenu1')}
                className={
                  activeLink === 'oprationTheatre-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bookingList">BookingList</Link>
              </li>
              <li
                onClick={() => handleItemClick('oprationTheatre', 'submenu2')}
                className={
                  activeLink === 'oprationTheatre-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/setting/*">Settings</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'doctor-submenu1' || activeLink === 'doctor-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleDoctor}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Doctor</span>}
            <span className="custom-dropdown-icon">
              {openMenus.doctor ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.doctor && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('doctor', 'submenu1')}
                className={
                  activeLink === 'doctor-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Outpatient">Out Patient</Link>
              </li>
              <li
                onClick={() => handleItemClick('doctor', 'submenu2')}
                className={
                  activeLink === 'doctor-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Outpatient">In Patient Department </Link>
              </li>
              <li
                onClick={() => handleItemClick('doctor', 'submenu3')}
                className={
                  activeLink === 'doctor-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Outpatient">In Patient Department </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'clinical-submenu1' ||
            activeLink === 'clinical-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleClinical}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Clinical</span>}
            <span className="custom-dropdown-icon">
              {openMenus.clinical ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.clinical && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('clinical', 'submenu1')}
                className={
                  activeLink === 'clinical-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/ClinicalAssessmentAndPlan">
                  Clinical Assessment And Plan
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'accounting-submenu1' ||
            activeLink === 'accounting-submenu2' ||
            activeLink === 'accounting-submenu3' ||
            activeLink === 'accounting-submenu4' ||
            activeLink === 'accounting-submenu5' ||
            activeLink === 'accounting-submenu6'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleAccounting}>
            <span>
              <FaClinicMedical />
            </span>
            {isOpen && <span className="custom-nav-link-text">Accounting</span>}
            <span className="custom-dropdown-icon">
              {openMenus.accounting ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.accounting && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('accounting', 'submenu1')}
                className={
                  activeLink === 'accounting-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/transactions">Transaction</Link>
              </li>
              <li
                onClick={() => handleItemClick('accounting', 'submenu2')}
                className={
                  activeLink === 'accounting-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/settings">Settings</Link>
              </li>
              <li
                onClick={() => handleItemClick('accounting', 'submenu3')}
                className={
                  activeLink === 'accounting-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/reports">Reports</Link>
              </li>
              <li
                onClick={() => handleItemClick('accounting', 'submenu4')}
                className={
                  activeLink === 'accounting-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/voucher-verification">Voucher Verification </Link>
              </li>
              <li
                onClick={() => handleItemClick('accounting', 'submenu5')}
                className={
                  activeLink === 'accounting-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/medicare-registration">Medicare Registration </Link>
              </li>
              <li
                onClick={() => handleItemClick('accounting', 'submenu6')}
                className={
                  activeLink === 'accounting-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/bank-reconciliation">Bank Reconciliation</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'nursing-submenu1' ||
            activeLink === 'nursing-submenu2' ||
            activeLink === 'nursing-submenu3' ||
            activeLink === 'nursing-submenu4' ||
            activeLink === 'nursing-submenu5' ||
            activeLink === 'nursing-submenu6'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleNurseClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Nursing</span>}
            <span className="custom-dropdown-icon">
              {openMenus.nursing ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.nursing && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('nursing', 'submenu1')}
                className={
                  activeLink === 'nursing-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Outpatient">Out Patient</Link>
              </li>
              <li
                onClick={() => handleItemClick('nursing', 'submenu2')}
                className={
                  activeLink === 'nursing-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Inpatient" className="nursing-booking-list-nav-link">
                  In Patient
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('nursing', 'submenu3')}
                className={
                  activeLink === 'nursing-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/Nephrology"
                  className="appointment-booking-list-nav-link"
                >
                  Nephrology
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('nursing', 'submenu4')}
                className={
                  activeLink === 'nursing-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/RequisitionList"
                  className="appointment-booking-list-nav-link"
                >
                  Requisition List
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('nursing', 'submenu5')}
                className={
                  activeLink === 'nursing-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/DischargeSummary"
                  className="appointment-booking-list-nav-link"
                >
                  Discharge Summary
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'appointment-submenu1' ||
            activeLink === 'appointment-submenu2' ||
            activeLink === 'appointment-submenu3' ||
            activeLink === 'appointment-submenu4' ||
            activeLink === 'appointment-submenu5' ||
            activeLink === 'appointment-submenu6'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleAppointmentClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">Appointment</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.appointment ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.appointment && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('appointment', 'submenu1')}
                className={
                  activeLink === 'appointment-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/appointment-booking-list">
                  Appointment Booking List
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('appointment', 'submenu2')}
                className={
                  activeLink === 'appointment-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/book-appointment"
                  className="appointment-booking-list-nav-link"
                >
                  Book Appointment
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('appointment', 'submenu3')}
                className={
                  activeLink === 'appointment-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/list-visits"
                  className="appointment-booking-list-nav-link"
                >
                  List Visits
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('appointment', 'submenu4')}
                className={
                  activeLink === 'appointment-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/new-visit"
                  className="appointment-booking-list-nav-link"
                >
                  New Visit
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('appointment', 'submenu5')}
                className={
                  activeLink === 'appointment-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/online-appointment"
                  className="appointment-booking-list-nav-link"
                >
                  Online Appointment
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('appointment', 'submenu6')}
                className={
                  activeLink === 'appointment-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/ssf-claim"
                  className="appointment-booking-list-nav-link"
                >
                  SSFClaim
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'setting-submenu1' ||
            activeLink === 'setting-submenu2' ||
            activeLink === 'setting-submenu3' ||
            activeLink === 'setting-submenu4' ||
            activeLink === 'setting-submenu5' ||
            activeLink === 'setting-submenu6' ||
            activeLink === 'setting-submenu7' ||
            activeLink === 'setting-submenu8'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleSettingClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Settings</span>}
            <span className="custom-dropdown-icon">
              {openMenus.setting ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.setting && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('setting', 'submenu1')}
                className={
                  activeLink === 'setting-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="department">Departments</Link>
              </li>
              <li
                onClick={() => handleItemClick('setting', 'submenu2')}
                className={
                  activeLink === 'setting-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="radiology"
                  className="appointment-booking-list-nav-link"
                >
                  Radiology
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('setting', 'submenu3')}
                className={
                  activeLink === 'setting-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="adt" className="appointment-booking-list-nav-link">
                  ADT
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('setting', 'submenu4')}
                className={
                  activeLink === 'setting-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="security"
                  className="appointment-booking-list-nav-link"
                >
                  Security
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('setting', 'submenu5')}
                className={
                  activeLink === 'setting-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="billing"
                  className="appointment-booking-list-nav-link"
                >
                  Billing
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('setting', 'submenu6')}
                className={
                  activeLink === 'setting-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="employee"
                  className="appointment-booking-list-nav-link"
                >
                  Employee
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('setting', 'submenu7')}
                className={
                  activeLink === 'setting-submenu7'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="geolocation"
                  className="appointment-booking-list-nav-link"
                >
                  Geolocation
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('setting', 'submenu8')}
                className={
                  activeLink === 'setting-submenu8'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="clinical"
                  className="appointment-booking-list-nav-link"
                >
                  Clinical
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'inventory-submenu1' ||
            activeLink === 'inventory-submenu2' ||
            activeLink === 'inventory-submenu3' ||
            activeLink === 'inventory-submenu4' ||
            activeLink === 'inventory-submenu5'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleInventoryClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Inventory</span>}
            <span className="custom-dropdown-icon">
              {openMenus.inventory ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.inventory && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('inventory', 'submenu1')}
                className={
                  activeLink === 'inventory-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/internal/*">Internal</Link>
              </li>
              <li
                onClick={() => handleItemClick('inventory', 'submenu2')}
                className={
                  activeLink === 'inventory-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/stock/*"
                  className="appointment-booking-list-nav-link"
                >
                  Stock
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('inventory', 'submenu3')}
                className={
                  activeLink === 'inventory-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/reports/*"
                  className="appointment-booking-list-nav-link"
                >
                  Reports
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('inventory', 'submenu4')}
                className={
                  activeLink === 'inventory-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/return-to-vendor"
                  className="appointment-booking-list-nav-link"
                >
                  Return To Vendor
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('inventory', 'submenu5')}
                className={
                  activeLink === 'inventory-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/donate"
                  className="appointment-booking-list-nav-link"
                >
                  Donate
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'incentive-submenu1' ||
            activeLink === 'incentive-submenu2' ||
            activeLink === 'incentive-submenu3'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleIncentiveClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Incentive</span>}
            <span className="custom-dropdown-icon">
              {openMenus.incentive ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.incentive && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('incentive', 'submenu1')}
                className={
                  activeLink === 'incentive-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/internal/*">Transactions</Link>
              </li>
              <li
                onClick={() => handleItemClick('incentive', 'submenu2')}
                className={
                  activeLink === 'incentive-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/incentivereport"
                  className="appointment-booking-list-nav-link"
                >
                  Reports
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('incentive', 'submenu3')}
                className={
                  activeLink === 'incentive-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/incentivesettings"
                  className="appointment-booking-list-nav-link"
                >
                  Setting
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'laboratory-submenu1' ||
            activeLink === 'laboratory-submenu2' ||
            activeLink === 'laboratory-submenu3' ||
            activeLink === 'laboratory-submenu4' ||
            activeLink === 'laboratory-submenu5' ||
            activeLink === 'laboratory-submenu6' ||
            activeLink === 'laboratory-submenu7' ||
            activeLink === 'laboratory-submenu8'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleLaboratoryClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Laboratory</span>}
            <span className="custom-dropdown-icon">
              {openMenus.laboratory ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.laboratory && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('laboratory', 'submenu1')}
                className={
                  activeLink === 'laboratory-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/appointment-booking-list">Departments</Link>
              </li>
              <li
                onClick={() => handleItemClick('laboratory', 'submenu2')}
                className={
                  activeLink === 'laboratory-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/book-appointment"
                  className="appointment-booking-list-nav-link"
                >
                  Radiology
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('laboratory', 'submenu3')}
                className={
                  activeLink === 'laboratory-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/list-visits"
                  className="appointment-booking-list-nav-link"
                >
                  ADT
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('laboratory', 'submenu4')}
                className={
                  activeLink === 'laboratory-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/new-visit"
                  className="appointment-booking-list-nav-link"
                >
                  Security
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('laboratory', 'submenu5')}
                className={
                  activeLink === 'laboratory-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/online-appointment"
                  className="appointment-booking-list-nav-link"
                >
                  Billing
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('laboratory', 'submenu6')}
                className={
                  activeLink === 'laboratory-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/employee"
                  className="appointment-booking-list-nav-link"
                >
                  Employee
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('laboratory', 'submenu7')}
                className={
                  activeLink === 'laboratory-submenu7'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/ssf-claim"
                  className="appointment-booking-list-nav-link"
                >
                  Geolocation
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('laboratory', 'submenu8')}
                className={
                  activeLink === 'laboratory-submenu8'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/ssf-claim"
                  className="appointment-booking-list-nav-link"
                >
                  Geolocation
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'utilites-submenu1' ||
            activeLink === 'utilites-submenu2' ||
            activeLink === 'utilites-submenu3' ||
            activeLink === 'utilites-submenu4'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleUtilitesClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Utilites</span>}
            <span className="custom-dropdown-icon">
              {openMenus.utilites ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.utilites && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('utilites', 'submenu1')}
                className={
                  activeLink === 'utilites-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/schemerefundlist">Scheme Refund</Link>
              </li>
              <li
                onClick={() => handleItemClick('utilites', 'submenu2')}
                className={
                  activeLink === 'utilites-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/Change_Visitscheme"
                  className="appointment-booking-list-nav-link"
                >
                  Change Visit Scheme
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('utilites', 'submenu3')}
                className={
                  activeLink === 'utilites-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/CounterInfo"
                  className="appointment-booking-list-nav-link"
                >
                  Change Billing Counter
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('utilites', 'submenu4')}
                className={
                  activeLink === 'utilites-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/organizationdeposit"
                  className="appointment-booking-list-nav-link"
                >
                  Organization Deposit
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'emergency-submenu1' ||
            activeLink === 'emergency-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleEmergencyClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Emergency</span>}
            <span className="custom-dropdown-icon">
              {openMenus.emergency ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.emergency && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('emergency', 'submenu1')}
                className={
                  activeLink === 'emergency-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/newPatients"
                  className="appointment-booking-list-nav-link"
                >
                  New patients
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('emergency', 'submenu2')}
                className={
                  activeLink === 'emergency-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/triagedPatients"
                  className="appointment-booking-list-nav-link"
                >
                  Triaged Patients
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('emergency', 'submenu3')}
                className={
                  activeLink === 'emergency-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/finalizedPatients"
                  className="appointment-booking-list-nav-link"
                >
                  {' '}
                  Finalized patients
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('emergency', 'submenu3')}
                className={
                  activeLink === 'emergency-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/bedInfo"
                  className="appointment-booking-list-nav-link"
                >
                  {' '}
                  Bed Information
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'systemAdmin-submenu1' ||
            activeLink === 'systemAdmin-submenu2' ||
            activeLink === 'systemAdmin-submenu3' ||
            activeLink === 'systemAdmin-submenu4'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleSystemAdminClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">System Admin</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.systemAdmin ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.systemAdmin && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('systemAdmin', 'submenu1')}
                className={
                  activeLink === 'systemAdmin-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/database-backup">Database Backup</Link>
              </li>
              <li
                onClick={() => handleItemClick('systemAdmin', 'submenu2')}
                className={
                  activeLink === 'systemAdmin-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/materialized-sales-view"
                  className="appointment-booking-list-nav-link"
                >
                  Materialized Sales View
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('systemAdmin', 'submenu3')}
                className={
                  activeLink === 'systemAdmin-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/sales-book"
                  className="appointment-booking-list-nav-link"
                >
                  Sales Book
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('systemAdmin', 'submenu4')}
                className={
                  activeLink === 'systemAdmin-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/new-sales"
                  className="appointment-booking-list-nav-link"
                >
                  New Sales Book
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'socialService-submenu1'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleSocialServiceClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">Social Service</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.socialService ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'queuemngt-submenu1' ? 'custom-nav-item-active' : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleQueueManament}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">QueueMngmt</span>}
            <span className="custom-dropdown-icon">
              {openMenus.queuemngt ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'substore-submenu1' ? 'custom-nav-item-active' : ''
          }`}
        >
          <div
            className="custom-nav-link-content"
            onClick={handleSubstoreClick}
          >
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">SubStore</span>}
            <span className="custom-dropdown-icon">
              {openMenus.substore ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.substore && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('substore', 'submenu1')}
                className={
                  activeLink === 'substore-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/subStore">substore</Link>
              </li>
              <li
                onClick={() => handleItemClick('substore', 'submenu2')}
                className={
                  activeLink === 'substore-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/sSPStock/:store">Pharmacy</Link>
              </li>
              <li
                onClick={() => handleItemClick('substore', 'submenu3')}
                className={
                  activeLink === 'substore-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/SSIStock/:store"
                  className="appointment-booking-list-nav-link"
                >
                  Inventory
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'report-submenu1' ||
            activeLink === 'report-submenu2' ||
            activeLink === 'report-submenu3' ||
            activeLink === 'report-submenu4' ||
            activeLink === 'report-submenu5' ||
            activeLink === 'report-submenu6' ||
            activeLink === 'report-submenu7' ||
            activeLink === 'report-submenu8'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleReportClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Reports</span>}
            <span className="custom-dropdown-icon">
              {openMenus.report ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.report && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('report', 'submenu1')}
                className={
                  activeLink === 'report-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Admission">Admission</Link>
              </li>
              <li
                onClick={() => handleItemClick('report', 'submenu2')}
                className={
                  activeLink === 'report-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/BillingReports"
                  className="appointment-booking-list-nav-link"
                >
                  Billing Reports
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('report', 'submenu3')}
                className={
                  activeLink === 'report-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/AppointmentReport"
                  className="appointment-booking-list-nav-link"
                >
                  Appointment
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('report', 'submenu4')}
                className={
                  activeLink === 'report-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/RadiologyReport"
                  className="appointment-booking-list-nav-link"
                >
                  Radiology
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('report', 'submenu5')}
                className={
                  activeLink === 'report-submenu5'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/LabReport"
                  className="appointment-booking-list-nav-link"
                >
                  Lab
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('report', 'submenu6')}
                className={
                  activeLink === 'report-submenu6'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/DoctorReport"
                  className="appointment-booking-list-nav-link"
                >
                  Doctors
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('report', 'submenu7')}
                className={
                  activeLink === 'report-submenu7'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/PatientReport"
                  className="appointment-booking-list-nav-link"
                >
                  Patient
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('report', 'submenu8')}
                className={
                  activeLink === 'report-submenu8'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link
                  to="/PoliceCase"
                  className="appointment-booking-list-nav-link"
                >
                  Police Case
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'nhif-submenu1' ||
            activeLink === 'nhif-submenu2' ||
            activeLink === 'nhif-submenu3' ||
            activeLink === 'nhif-submenu4'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleNhifClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">HI</span>}
            <span className="custom-dropdown-icon">
              {openMenus.nhif ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.nhif && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('nhif', 'submenu1')}
                className={
                  activeLink === 'nhif-submenu1' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/PatientList">Patient List</Link>
              </li>
              <li
                onClick={() => handleItemClick('nhif', 'submenu2')}
                className={
                  activeLink === 'nhif-submenu2' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/VisitList"
                  className="appointment-booking-list-nav-link"
                >
                  Visit List
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('nhif', 'submenu3')}
                className={
                  activeLink === 'nhif-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/IPD_billing"
                  className="appointment-booking-list-nav-link"
                >
                  IPD Billing
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('nhif', 'submenu4')}
                className={
                  activeLink === 'nhif-submenu4' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/Report"
                  className="appointment-booking-list-nav-link"
                >
                  Reports
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'adt-submenu1' ||
            activeLink === 'adt-submenu2' ||
            activeLink === 'adt-submenu3' ||
            activeLink === 'adt-submenu4' ||
            activeLink === 'adt-submenu5'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleAdtClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">ADT</span>}
            <span className="custom-dropdown-icon">
              {openMenus.adt ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.adt && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('adt', 'submenu1')}
                className={
                  activeLink === 'adt-submenu1' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/PatientList">Search Patient</Link>
              </li>
              <li
                onClick={() => handleItemClick('adt', 'submenu2')}
                className={
                  activeLink === 'adt-submenu2' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/VisitList"
                  className="appointment-booking-list-nav-link"
                >
                  Admitted Patients
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('adt', 'submenu3')}
                className={
                  activeLink === 'adt-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/IPD_billing"
                  className="appointment-booking-list-nav-link"
                >
                  Discharged Patients
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('adt', 'submenu4')}
                className={
                  activeLink === 'adt-submenu4' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/Report"
                  className="appointment-booking-list-nav-link"
                >
                  ExchangeBed
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('adt', 'submenu5')}
                className={
                  activeLink === 'adt-submenu5' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/Report"
                  className="appointment-booking-list-nav-link"
                >
                  Cancel Bed Reservation
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'maternity-submenu1' ||
            activeLink === 'maternity-submenu2' ||
            activeLink === 'maternity-submenu3'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleMeternity}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Maternity</span>}
            <span className="custom-dropdown-icon">
              {openMenus.maternity ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.maternity && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('maternity', 'submenu1')}
                className={
                  activeLink === 'maternity-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/maternity-list">Maternity List</Link>
              </li>
              <li
                onClick={() => handleItemClick('maternity', 'submenu2')}
                className={
                  activeLink === 'maternity-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/patient-form">Payments</Link>
              </li>
              <li
                onClick={() => handleItemClick('maternity', 'submenu3')}
                className={
                  activeLink === 'maternity-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/reports">Reports</Link>
              </li>

              <li
                onClick={() => handleItemClick('maternity', 'submenu3')}
                className={
                  activeLink === 'maternity-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/PostnatalCare">PostnatalCare</Link>
              </li>
              <li
                onClick={() => handleItemClick('maternity', 'submenu3')}
                className={
                  activeLink === 'maternity-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Labourmgnt">LabourRoomMgnt</Link>
              </li>
              <li
                onClick={() => handleItemClick('maternity', 'submenu3')}
                className={
                  activeLink === 'maternity-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/BreastfeedingSupport">BreastfeedingSupport</Link>
              </li>
              <li
                onClick={() => handleItemClick('maternity', 'submenu3')}
                className={
                  activeLink === 'maternity-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/FamilyPlanningService">FamilyPlanningService</Link>
              </li>
            </ul>
          )}
        </li>


        {/* Prachi HomehealthCare */}

        <li
          className={`custom-nav-item ${
            activeLink === "homehealthcare-submenu1" ||
            activeLink === "homehealthcare-submenu2" ||
            activeLink === "homehealthcare-submenu3" ||
            activeLink === "homehealthcare-submenu4" ||
            activeLink === "homehealthcare-submenu5" ||
            activeLink === "homehealthcare-submenu6" 
              ? "custom-nav-item-active"
              : ""
          }`}
        >
          <div className="custom-nav-link-content" onClick={handlehomehealthcareClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">homehealthcare</span>}
            <span className="custom-dropdown-icon">
              {openMenus.homehealthcare ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.homehealthcare && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick("homehealthcare", "submenu1")}
                className={
                  activeLink === "homehealthcare-submenu1" ? "custom-submenu-active" : ""
                }
              >
                <Link to="patient-registeration">Patient Registration</Link>
              </li>
              <li
                onClick={() => handleItemClick("homehealthcare", "submenu2")}
                className={
                  activeLink === "homehealthcare-submenu2" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="medication"
                  className="appointment-booking-list-nav-link"
                >
                 Medication Management
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("homehealthcare", "submenu3")}
                className={
                  activeLink === "homehealthcare-submenu3" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="careplan"
                  className="appointment-booking-list-nav-link"
                >
                  Care Plan
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("homehealthcare", "submenu4")}
                className={
                  activeLink === "homehealthcare-submenu4" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="visitscheduling"
                  className="appointment-booking-list-nav-link"
                >
                  Visit Scheduling
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("homehealthcare", "submenu4")}
                className={
                  activeLink === "homehealthcare-submenu5" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="healthmonitoring"
                  className="appointment-booking-list-nav-link"
                >
                  Health Monitoring
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("homehealthcare", "submenu4")}
                className={
                  activeLink === "homehealthcare-submenu6" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="billing"
                  className="appointment-booking-list-nav-link"
                >
                  Billing and Insurance
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Prachi */}

          {/* Prachi paediatric Out patient */}

          <li
          className={`custom-nav-item ${
            activeLink === "pediatricoutpatient-submenu1" ||
            activeLink === "pediatricoutpatient-submenu2" ||
            activeLink === "pediatricoutpatient-submenu3" ||
            activeLink === "pediatricoutpatient-submenu4" ||
            activeLink === "pediatricoutpatient-submenu5" ||
            activeLink === "pediatricoutpatient-submenu6" ||
            activeLink === "pediatricoutpatient-submenu7" 
              ? "custom-nav-item-active"
              : ""
          }`}
        >
          <div className="custom-nav-link-content" onClick={handlePaediatricOutPatientClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Pediatric Out Patient</span>}
            <span className="custom-dropdown-icon">
              {openMenus.pediatricoutpatient ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.pediatricoutpatient && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick("pediatricoutpatient", "submenu1")}
                className={
                  activeLink === "pediatricoutpatient-submenu1" ? "custom-submenu-active" : ""
                }
              >
                <Link to="/registration-outpatient-form">Basic Information</Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricoutpatient", "submenu2")}
                className={
                  activeLink === "pediatricoutpatient-submenu2" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/vital-signs-inpatient"
                  className="appointment-booking-list-nav-link"
                >
                 Vital Signs
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricoutpatient", "submenu3")}
                className={
                  activeLink === "pediatricoutpatient-submenu3" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/chief-complaint-outpatient"
                  className="appointment-booking-list-nav-link"
                >
                  Chief Complaint
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricoutpatient", "submenu4")}
                className={
                  activeLink === "pediatricoutpatient-submenu4" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/examination-diagnosis-outpatient"
                  className="appointment-booking-list-nav-link"
                >
                  Examination
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricoutpatient", "submenu4")}
                className={
                  activeLink === "pediatricoutpatient-submenu5" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/treatment-prescription-Outpatient"
                  className="appointment-booking-list-nav-link"
                >
                  Treatment
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricoutpatient", "submenu4")}
                className={
                  activeLink === "pediatricoutpatient-submenu6" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/immunization-outpatient-form"
                  className="appointment-booking-list-nav-link"
                >
                  Immunization
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricoutpatient", "submenu4")}
                className={
                  activeLink === "pediatricoutpatient-submenu7" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/follow-up-review-Outpatient"
                  className="appointment-booking-list-nav-link"
                >
                  FollowUp
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Prachi */}

         {/* Prachi paediatric In patient */}

         <li
          className={`custom-nav-item ${
            activeLink === "pediatricinpatient-submenu1" ||
            activeLink === "pediatricinpatient-submenu2" ||
            activeLink === "pediatricinpatient-submenu3" ||
            activeLink === "pediatricinpatient-submenu4" ||
            activeLink === "pediatricinpatient-submenu5" ||
            activeLink === "pediatricinpatient-submenu6" ||
            activeLink === "pediatricinpatient-submenu7" ||
            activeLink === "pediatricinpatient-submenu8" ||
            activeLink === "pediatricinpatient-submenu9" 
              ? "custom-nav-item-active"
              : ""
          }`}
        >
          <div className="custom-nav-link-content" onClick={handlepediatricinpatientClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Pediatric In Patient</span>}
            <span className="custom-dropdown-icon">
              {openMenus.pediatricinpatient ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.pediatricinpatient && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu1")}
                className={
                  activeLink === "pediatricinpatient-submenu1" ? "custom-submenu-active" : ""
                }
              >
                <Link to="/patient-history-form">Patient History Form</Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu2")}
                className={
                  activeLink === "pediatricinpatient-submenu2" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/admission-form"
                  className="appointment-booking-list-nav-link"
                >
                 Admission Form
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu3")}
                className={
                  activeLink === "pediatricinpatient-submenu3" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/paediatric-vitals-examination-Form"
                  className="appointment-booking-list-nav-link"
                >
                  Paediatric Vitals Examination Form
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu4")}
                className={
                  activeLink === "pediatricinpatient-submenu4" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/paediatric-treatment-plan-form"
                  className="appointment-booking-list-nav-link"
                >
                  Paediatric Treatment Plan Form
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu4")}
                className={
                  activeLink === "pediatricinpatient-submenu5" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/nursing-care-plan-form"
                  className="appointment-booking-list-nav-link"
                >
                  Nursing Care Plan Form
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu4")}
                className={
                  activeLink === "pediatricinpatient-submenu6" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/paediatric-progress-notes-form"
                  className="appointment-booking-list-nav-link"
                >
                  Paediatric Progress Notes Form
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu4")}
                className={
                  activeLink === "pediatricinpatient-submenu7" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/discharge"
                  className="appointment-booking-list-nav-link"
                >
                  Discharge Summary
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu4")}
                className={
                  activeLink === "pediatricinpatient-submenu8" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/pediatric-immunization-form"
                  className="appointment-booking-list-nav-link"
                >
                  Pediatric Immunization Form
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("pediatricinpatient", "submenu4")}
                className={
                  activeLink === "pediatricinpatient-submenu9" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/nutrition"
                  className="appointment-booking-list-nav-link"
                >
                 Nutrition Form
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Prachi */}



        {/* Prachi physiotherapy */}

        <li
          className={`custom-nav-item ${
            activeLink === "physiotherapy-submenu1" ||
            activeLink === "physiotherapy-submenu2" 
         
              ? "custom-nav-item-active"
              : ""
          }`}
        >
          <div className="custom-nav-link-content" onClick={handlephysiotherapyClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Physiotherapy</span>}
            <span className="custom-dropdown-icon">
              {openMenus.physiotherapy ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.physiotherapy && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick("physiotherapy", "submenu1")}
                className={
                  activeLink === "physiotherapy-submenu1" ? "custom-submenu-active" : ""
                }
              >
                <Link to="/physiotherapy-session-form">Session Form</Link>
              </li>
              <li
                onClick={() => handleItemClick("physiotherapy", "submenu2")}
                className={
                  activeLink === "physiotherapy-submenu2" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/physiotherapy-session-list"
                  className="appointment-booking-list-nav-link"
                >
                 Session List
                </Link>
              </li>
              
            </ul>
          )}
        </li>
        {/* Prachi */}

 {/* Prachi endoscopy */}

 <li
          className={`custom-nav-item ${
            activeLink === "endoscopy-submenu1" ||
            activeLink === "endoscopy-submenu2" 
         
              ? "custom-nav-item-active"
              : ""
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleendoscopyClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Endoscopy</span>}
            <span className="custom-dropdown-icon">
              {openMenus.endoscopy ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.endoscopy && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick("endoscopy", "submenu1")}
                className={
                  activeLink === "endoscopy-submenu1" ? "custom-submenu-active" : ""
                }
              >
                <Link to="/procedure-scheduling">Procedure Scheduling</Link>
              </li>
              <li
                onClick={() => handleItemClick("endoscopy", "submenu2")}
                className={
                  activeLink === "endoscopy-submenu2" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/endoscope-inventory"
                  className="appointment-booking-list-nav-link"
                >
                 Endoscope Inventory
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("endoscopy", "submenu2")}
                className={
                  activeLink === "endoscopy-submenu2" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/sterilization-tracking"
                  className="appointment-booking-list-nav-link"
                >
                 Sterilization Tracking
                </Link>
              </li>
              <li
                onClick={() => handleItemClick("endoscopy", "submenu2")}
                className={
                  activeLink === "endoscopy-submenu2" ? "custom-submenu-active" : ""
                }
              >
                <Link
                  to="/post-procedure-doc"
                  className="appointment-booking-list-nav-link"
                >
                 Post-Procedure Documentation
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Prachi */}


        <li
          className={`custom-nav-item ${
            activeLink === 'radiology-submenu1' ||
            activeLink === 'radiology-submenu2' ||
            activeLink === 'radiology-submenu3' ||
            activeLink === 'radiology-submenu4'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleRadiology}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Radioloagy</span>}
            <span className="custom-dropdown-icon">
              {openMenus.radiology ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.radiology && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('radiology', 'submenu1')}
                className={
                  activeLink === 'radiology-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/rDLListRequest">List Requests</Link>
              </li>
              <li
                onClick={() => handleItemClick('radiology', 'submenu2')}
                className={
                  activeLink === 'radiology-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/rDLListReports">List Reports</Link>
              </li>
              <li
                onClick={() => handleItemClick('radiology', 'submenu3')}
                className={
                  activeLink === 'radiology-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/rDLEditDoctors">Edit Doctors</Link>
              </li>
              <li
                onClick={() => handleItemClick('radiology', 'submenu4')}
                className={
                  activeLink === 'radiology-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/rDLWardBilling">Ward Billing</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'mkt-submenu1' ||
            activeLink === 'mkt-submenu2' ||
            activeLink === 'mkt-submenu3'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleMKTClick}>
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">MktReferral</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.mkt ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.mkt && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('mkt', 'submenu1')}
                className={
                  activeLink === 'mkt-submenu1' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/Transaction">Transaction</Link>
              </li>
              <li
                onClick={() => handleItemClick('mkt', 'submenu2')}
                className={
                  activeLink === 'mkt-submenu2' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/Setting/*"
                  className="appointment-booking-list-nav-link"
                >
                  Settings
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('mkt', 'submenu3')}
                className={
                  activeLink === 'mkt-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/Mreport"
                  className="appointment-booking-list-nav-link"
                >
                  Reports
                </Link>
              </li>

              <li
                onClick={() => handleItemClick('mkt', 'submenu3')}
                className={
                  activeLink === 'mkt-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/refferaltracking"
                  className="appointment-booking-list-nav-link"
                >
                  Refferal Tracking
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('mkt', 'submenu3')}
                className={
                  activeLink === 'mkt-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/patientrefferingreward"
                  className="appointment-booking-list-nav-link"
                >
                  Patient Refferal Reward
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('mkt', 'submenu3')}
                className={
                  activeLink === 'mkt-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/marketingcampaign"
                  className="appointment-booking-list-nav-link"
                >
                  Marketing Campaigns
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('mkt', 'submenu3')}
                className={
                  activeLink === 'mkt-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link
                  to="/patientoutreach"
                  className="appointment-booking-list-nav-link"
                >
                  Patient Outreach
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'vaccination-submenu1' ||
            activeLink === 'vaccination-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleVaccination}>
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">Vaccination</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.vaccination ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.vaccination && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('vaccination', 'submenu1')}
                className={
                  activeLink === 'vaccination-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/PatientList">PatientList</Link>
              </li>
              <li
                onClick={() => handleItemClick('vaccination', 'submenu2')}
                className={
                  activeLink === 'vaccination-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Reports">Reports</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'fixAssest-submenu1' ||
            activeLink === 'fixAssest-submenu2' ||
            activeLink === 'fixAssest-submenu3' ||
            activeLink === 'fixAssest-submenu4'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleFixAssests}>
            <span>
              <TbUsers />
            </span>
            {isOpen && (
              <span className="custom-nav-link-text">Fix Assests</span>
            )}
            <span className="custom-dropdown-icon">
              {openMenus.fixAssest ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.fixAssests && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('fixAssest', 'submenu1')}
                className={
                  activeLink === 'fixAssest-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/AssetsManagement">Assets Management</Link>
              </li>
              <li
                onClick={() => handleItemClick('fixAssest', 'submenu2')}
                className={
                  activeLink === 'fixAssest-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/AssetsMaintainance"> Assets Maintainance</Link>
              </li>
              <li
                onClick={() => handleItemClick('fixAssest', 'submenu3')}
                className={
                  activeLink === 'fixAssest-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/DepreciationAndDiscarding">
                  {' '}
                  Depreciation And Discarding
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('fixAssest', 'submenu4')}
                className={
                  activeLink === 'fixAssest-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/Reports">Reports</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'cssd-submenu1' || activeLink === 'css-submenu2'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleCSSD}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">CSSD</span>}
            <span className="custom-dropdown-icon">
              {openMenus.cssd ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.cssd && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('cssd', 'submenu1')}
                className={
                  activeLink === 'cssd-submenu1' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/Sterilization">Sterilization</Link>
              </li>
              <li
                onClick={() => handleItemClick('cssd', 'submenu2')}
                className={
                  activeLink === 'cssd-submenu2' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/Reports">Reports</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'hr-submenu1' ||
            activeLink === 'hr-submenu2' ||
            activeLink === 'hr-submenu3' ||
            activeLink === 'hr-submenu4' ||
            activeLink === 'hr-submenu5' ||
            activeLink === 'hr-submenu6' ||
            activeLink === 'hr-submenu7'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleHr}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">HR</span>}
            <span className="custom-dropdown-icon">
              {openMenus.hr ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.hr && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('hr', 'submenu1')}
                className={
                  activeLink === 'hr-submenu1' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/employee-list">Employee List</Link>
              </li>
              <li
                onClick={() => handleItemClick('hr', 'submenu2')}
                className={
                  activeLink === 'hr-submenu2' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/employee-attendance">Attendance</Link>
              </li>
              <li
                onClick={() => handleItemClick('hr', 'submenu3')}
                className={
                  activeLink === 'hr-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/employee-schedule">Employee Schedule</Link>
              </li>
              <li
                onClick={() => handleItemClick('hr', 'submenu4')}
                className={
                  activeLink === 'hr-submenu4' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/employee-leave">Employee Leave</Link>
              </li>
              <li
                onClick={() => handleItemClick('hr', 'submenu5')}
                className={
                  activeLink === 'hr-submenu5' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/employee-performance">Performance Evaluation</Link>
              </li>
              <li
                onClick={() => handleItemClick('hr', 'submenu6')}
                className={
                  activeLink === 'hr-submenu6' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/employee-payroll">Payroll</Link>
              </li>

              <li
                onClick={() => handleItemClick('hr', 'submenu7')}
                className={
                  activeLink === 'hr-submenu7' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/employee-recruitment">Recruitment Management</Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={`custom-nav-item ${
            activeLink === 'radiationTherapy-submenu1' ||
            activeLink === 'radiationTherapy-submenu2' ||
            activeLink === 'hr-submenu3' ||
            activeLink === 'hr-submenu4' ||
            activeLink === 'hr-submenu5' ||
            activeLink === 'hr-submenu6' ||
            activeLink === 'hr-submenu7'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleRadiationTherapy}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Radiation Theropy</span>}
            <span className="custom-dropdown-icon">
              {openMenus.radiationTherapy ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.radiationTherapy && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('radiationTherapy', 'submenu1')}
                className={
                  activeLink === 'radiationTherapy-submenu1' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="/patienttherapyplan">Patient Therapy Plan</Link>
              </li>
              <li
                onClick={() => handleItemClick('radiationTherapy', 'submenu2')}
                className={
                  activeLink === 'radiationTherapy-submenu2' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="dasagetracking">Dosage Tracking</Link>
              </li>
              <li
                onClick={() => handleItemClick('radiationTherapy', 'submenu3')}
                className={
                  activeLink === 'radiationTherapy-submenu3' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="equipmentusagelogs">Equipment Usage Logs</Link>
              </li>
              <li
                onClick={() => handleItemClick('radiationTherapy', 'submenu4')}
                className={
                  activeLink === 'radiationTherapy-submenu4' ? 'custom-submenu-active' : ''
                }
              >
                <Link to="radiationsafetycompliance">Radiation Safety Compliance</Link>
              </li>
              
               
            </ul>
          )}
        </li>
        <li
          className={`custom-nav-item ${
            activeLink === 'helpdesk-submenu1' ||
            activeLink === 'helpdesk-submenu2' ||
            activeLink === 'helpdesk-submenu3' ||
            activeLink === 'helpdesk-submenu4'
              ? 'custom-nav-item-active'
              : ''
          }`}
        >
          <div className="custom-nav-link-content" onClick={handleHelpdesk}>
            <span>
              <TbUsers />
            </span>
            {isOpen && <span className="custom-nav-link-text">Helpdesk</span>}
            <span className="custom-dropdown-icon">
              {openMenus.helpdesk ? <LuChevronUp /> : <LuChevronDown />}
            </span>
          </div>
          {openMenus.helpdesk && isOpen && (
            <ul className="custom-submenu">
              <li
                onClick={() => handleItemClick('helpdesk', 'submenu1')}
                className={
                  activeLink === 'helpdesk-submenu1'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/hHEmpInformation">Employee Information</Link>
              </li>
              <li
                onClick={() => handleItemClick('helpdesk', 'submenu2')}
                className={
                  activeLink === 'helpdesk-submenu2'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/hHBedInformation">Bed Information</Link>
              </li>
              <li
                onClick={() => handleItemClick('helpdesk', 'submenu3')}
                className={
                  activeLink === 'helpdesk-submenu3'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/hHWardInformation">Ward Information</Link>
              </li>
              <li
                onClick={() => handleItemClick('helpdesk', 'submenu4')}
                className={
                  activeLink === 'helpdesk-submenu4'
                    ? 'custom-submenu-active'
                    : ''
                }
              >
                <Link to="/hHQueueInformation">Queue Information</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
