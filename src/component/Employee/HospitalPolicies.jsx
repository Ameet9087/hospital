import React, { useState, useEffect, useRef } from "react";
import "./Hospitalpolicies.css";
import PopupTable from "../../FloatingInputs/PopupTable";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { FloatingInput, FloatingSelect } from "../../FloatingInputs";

const HospitalPolicies = () => {
  const [activePopup, setActivePopup] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopupTable, setShowPopupTable] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [savedPolicies, setSavedPolicies] = useState([]);

  // State for API data
  const [serviceDetails, setServiceDetails] = useState([]);
  const [paymodeMaster, setPaymodeMaster] = useState([]);
  const [departments, setDepartments] = useState([]);

  // State for form data
  const [formData, setFormData] = useState({
    purchasingBothMedicalGeneralItemsFromSameDepartment: false,
    rateEditableInGRNInCaseOfPO: false,
    dontNeedOPDNotesOleInDischargeSummaryStd: false,
    dontCallMissueNoSequenceInOPSBlesStd: false,
    dontCallMissueNoSequencetnIPDIssuesStd: false,
    grantAdjustmentPayMode: "",
    enterDaysToMedicineExpiry: "",
    releaseBedOn: "finalGatePass",
    finalGatePass: false,
    houseKeepingClearance: false,
    blockIPEntries: false,
    nonEmerStartTime: "",
    nonEmerEndTime: "",
    appointmentCancellationFee: "",
    approvalRequiredForOnlineIssues: false,
    disIndentToDept: "",
    staffPharmacyAdvPaymode: "",
    staffOpdAdvPaymode: "",
    restartSampleNoForFinancialYearOrContinue: false,
    salesReturnValidation: false,
    allowPartialDues: false,
    activeApprovalForCancellation: false,
    printLocationNameInWebtransPrintsAndWebreports: false,
    onlinePaymentPaymode: "",
    OPDBillingBillnoSequence: "",
    IPDBillingBillnoSequence: "",
    finalBillBillnoSequence: "",
    categoryWiseOPDConsultation: false,
    serviceForRegistrationCharges: "",
    tokenSystemBasedOnApptsTime: false,
    RISIntegration: false,
  });

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, paymodeRes, departmentsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/service-details`),
          axios.get(`${API_BASE_URL}/paymode-master`),
          axios.get(`${API_BASE_URL}/departments/getAllDepartments`),
        ]);

        setServiceDetails(serviceRes.data);
        setPaymodeMaster(paymodeRes.data);
        setDepartments(departmentsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSearchClick = (type) => {
    setPopupType(type);
    setShowPopupTable(true);
  };

  const handleRowSelect = (row) => {
    switch (popupType) {
      case "service":
        setFormData((prev) => ({
          ...prev,
          serviceForRegistrationCharges: row.serviceName,
        }));
        break;
      case "paymode":
        setFormData((prev) => ({
          ...prev,
          grantAdjustmentPayMode: row.description,
        }));
        break;
      case "department":
        setFormData((prev) => ({
          ...prev,
          disIndentToDept: row.departmentName,
        }));
        break;
      case "onlinePayment":
        setFormData((prev) => ({
          ...prev,
          onlinePaymentPaymode: row.description,
        }));
        break;
      default:
        break;
    }
    setShowPopupTable(false);
  };
  const handleSave = async () => {
    try {
      // Prepare the payload
      const payload = {
        purchasingBothMedicalGeneralItemsFromSameDepartment:
          formData.purchasingBothMedicalGeneralItemsFromSameDepartment,
        rateEditableInGRNInCaseOfPO: formData.rateEditableInGRNInCaseOfPO,
        dontNeedOPDNotesOleInDischargeSummaryStd:
          formData.dontNeedOPDNotesOleInDischargeSummaryStd,
        dontCallMissueNoSequenceInOPSBlesStd:
          formData.dontCallMissueNoSequenceInOPSBlesStd,
        dontCallMissueNoSequencetnIPDIssuesStd:
          formData.dontCallMissueNoSequencetnIPDIssuesStd,
        enterDaysToMedicineExpiry: parseInt(formData.enterDaysToMedicineExpiry),
        releaseBedOn: formData.releaseBedOn.toUpperCase(),
        finalGatePass: formData.finalGatePass,
        houseKeepingClearance: formData.houseKeepingClearance,
        blockIPEntries: formData.blockIPEntries,
        nonEmerStartTime: formData.nonEmerStartTime,
        nonEmerEndTime: formData.nonEmerEndTime,
        appointmentCancellationFee: parseFloat(
          formData.appointmentCancellationFee
        ),
        approvalRequiredForOnlineIssues:
          formData.approvalRequiredForOnlineIssues,
        staffPharmacyAdvPaymode: formData.staffPharmacyAdvPaymode,
        staffOpdAdvPaymode: formData.staffOpdAdvPaymode,
        restartSampleNoForFinancialYearOrContinue:
          formData.restartSampleNoForFinancialYearOrContinue ? "Continue" : "Restart",
        salesReturnValidation: formData.salesReturnValidation,
        allowPartialDues: formData.allowPartialDues,
        activeApprovalForCancellation: formData.activeApprovalForCancellation,
        printLocationNameInWebtransPrintsAndWebreports:
          formData.printLocationNameInWebtransPrintsAndWebreports,
        finalBillBillnoSequence: formData.finalBillBillnoSequence,
        categoryWiseOPDConsultation: formData.categoryWiseOPDConsultation,
        tokenSystemBasedOnApptsTime: formData.tokenSystemBasedOnApptsTime,
        paymodeMasterDTO: [
          {
            paymodeMasterId: paymodeMaster.find(
              (paymode) => paymode.description === formData.onlinePaymentPaymode
            )?.paymodeMasterId,
            date: new Date().toISOString().split("T")[0],
            description: formData.onlinePaymentPaymode,
            type: "Digital",
          },
        ],
        departmentDTO: [
          departments.find(
            (dept) => dept.departmentName === formData.disIndentToDept
          ),
        ],
        serviceDetailsDTO: [
          serviceDetails.find(
            (service) =>
              service.serviceName === formData.serviceForRegistrationCharges
          ),
        ],
      };

      // Send the payload to the API
      await axios.post(`${API_BASE_URL}/hospital-policies`, payload);

      // Add the current form data to the savedPolicies list
      setSavedPolicies((prevPolicies) => [...prevPolicies, formData]);

      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);



  const handleClear = () => {
    setFormData({
      purchasingBothMedicalGeneralItemsFromSameDepartment: false,
      rateEditableInGRNInCaseOfPO: false,
      dontNeedOPDNotesOleInDischargeSummaryStd: false,
      dontCallMissueNoSequenceInOPSBlesStd: false,
      dontCallMissueNoSequencetnIPDIssuesStd: false,
      grantAdjustmentPayMode: "",
      enterDaysToMedicineExpiry: "",
      releaseBedOn: "finalGatePass",
      finalGatePass: false,
      houseKeepingClearance: false,
      blockIPEntries: false,
      nonEmerStartTime: "",
      nonEmerEndTime: "",
      appointmentCancellationFee: "",
      approvalRequiredForOnlineIssues: false,
      disIndentToDept: "",
      staffPharmacyAdvPaymode: "",
      staffOpdAdvPaymode: "",
      restartSampleNoForFinancialYearOrContinue: false,
      salesReturnValidation: false,
      allowPartialDues: false,
      activeApprovalForCancellation: false,
      printLocationNameInWebtransPrintsAndWebreports: false,
      onlinePaymentPaymode: "",
      OPDBillingBillnoSequence: "",
      IPDBillingBillnoSequence: "",
      finalBillBillnoSequence: "",
      categoryWiseOPDConsultation: false,
      serviceForRegistrationCharges: "",
      tokenSystemBasedOnApptsTime: false,
      RISIntegration: false,
    });
  };

  const getPopupData = () => {
    switch (popupType) {
      case "service":
        return serviceDetails;
      case "paymode":
      case "onlinePayment":
        return paymodeMaster;
      case "department":
        return departments;
      default:
        return [];
    }
  };

  const getPopupColumns = () => {
    switch (popupType) {
      case "service":
        return ["serviceDetailsId", "serviceName", "serviceCode"];
      case "paymode":
      case "onlinePayment":
        return ["paymodeMasterId", "description", "type"];
      case "department":
        return ["departmentId", "departmentName", "departmentCode"];
      default:
        return [];
    }
  };



  return (
    <div className="HospitalPolicies-master">
      <div className="HospitalPolicies-title-bar">
        <span>Hospital Policies Setup</span>
      </div>
      <div className="HospitalPolicies-section">
        <div className="HospitalPolicies-grid">
          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="purchasingBothMedical"
              name="purchasingBothMedicalGeneralItemsFromSameDepartment"
              checked={formData.purchasingBothMedicalGeneralItemsFromSameDepartment}
              onChange={handleInputChange}
            />
            <label htmlFor="purchasingBothMedical" className="HospitalPolicies-checkbox-label">
              Purchasing Both Medical & General Items From Same Department
            </label>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="rateEditable"
              name="rateEditableInGRNInCaseOfPO"
              checked={formData.rateEditableInGRNInCaseOfPO}
              onChange={handleInputChange}
            />
            <label htmlFor="rateEditable" className="HospitalPolicies-checkbox-label">
              Rate Editable in GRN in Case of PO
            </label>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="dontNeedOPDNotes"
              name="dontNeedOPDNotesOleInDischargeSummaryStd"
              checked={formData.dontNeedOPDNotesOleInDischargeSummaryStd}
              onChange={handleInputChange}
            />
            <label htmlFor="dontNeedOPDNotes" className="HospitalPolicies-checkbox-label">
              Don't Need OPD Notes Ole in Discharge Summary Std
            </label>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="dontCallMissueNoOPD"
              name="dontCallMissueNoSequenceInOPSBlesStd"
              checked={formData.dontCallMissueNoSequenceInOPSBlesStd}
              onChange={handleInputChange}
            />
            <label htmlFor="dontCallMissueNoOPD" className="HospitalPolicies-checkbox-label">
              Don't Call MissueNo Sequence in OPSBles Std
            </label>
          </div>

          <div className="HospitalPolicies-search-field">
            <FloatingInput
              label="Grant Adjustment PayMode *"
              type="text"
              value={formData.grantAdjustmentPayMode}
              onChange={(e) => handleInputChange({ target: { name: 'grantAdjustmentPayMode', value: e.target.value } })}
            />
            <button
              className="HospitalPolicies-search-icon"
              onClick={() => handleSearchClick('paymode')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                />
              </svg>
            </button>
          </div>

          <FloatingInput
            label="Enter Days To Medicine Expiry :"
            type="text"
            name="enterDaysToMedicineExpiry"
            value={formData.enterDaysToMedicineExpiry}
            onChange={handleInputChange}
          />

          <div className="HospitalPolicies-form-group">
            <label>Release Bed On:</label>
            <div className="HospitalPolicies-radio-button">
              <label>
                <input
                  type="radio"
                  name="releaseBedOn"
                  value="finalGatePass"
                  checked={formData.releaseBedOn === "finalGatePass"}
                  onChange={handleInputChange}
                />
                Final Gate Pass
              </label>
              <label>
                <input
                  type="radio"
                  name="releaseBedOn"
                  value="houseKeeping"
                  checked={formData.releaseBedOn === "houseKeeping"}
                  onChange={handleInputChange}
                />
                House Keeping Clearance
              </label>
              <label>
                <input
                  type="radio"
                  name="releaseBedOn"
                  value="blockIP"
                  checked={formData.releaseBedOn === "blockIP"}
                  onChange={handleInputChange}
                />
                Block IP Entries
              </label>
            </div>
          </div>

          <FloatingInput
            label="Non Emer Start Time(Eg:0800):"
            type="text"
            name="nonEmerStartTime"
            value={formData.nonEmerStartTime}
            onChange={handleInputChange}
          />

          <FloatingInput
            label="Non Emer End Time(Eg:2000):"
            type="text"
            name="nonEmerEndTime"
            value={formData.nonEmerEndTime}
            onChange={handleInputChange}
          />

          <FloatingInput
            label="Appointment Cancellation Fee"
            type="text"
            name="appointmentCancellationFee"
            value={formData.appointmentCancellationFee}
            onChange={handleInputChange}
          />

          <div className="HospitalPolicies-search-field">
            <FloatingInput
              label="DIS Indent To Dept*"
              type="text"
              value={formData.disIndentToDept}
              onChange={(e) => handleInputChange({ target: { name: 'disIndentToDept', value: e.target.value } })}
            />
            <button
              className="HospitalPolicies-search-icon"
              onClick={() => handleSearchClick('department')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                />
              </svg>
            </button>
          </div>

          <FloatingSelect
            label="Staff Pharmacy Adv Paymode"
            name="staffPharmacyAdvPaymode"
            value={formData.staffPharmacyAdvPaymode}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select" },
              { value: "Cash", label: "Cash" },
              { value: "Card", label: "Card" },
              { value: "UPI", label: "UPI" }
            ]}
          />

          <FloatingSelect
            label="Staff Opd Adv Paymode"
            name="staffOpdAdvPaymode"
            value={formData.staffOpdAdvPaymode}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select" },
              { value: "Cash", label: "Cash" },
              { value: "Card", label: "Card" },
              { value: "UPI", label: "UPI" }
            ]}
          />

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="restartSampleNo"
              name="restartSampleNoForFinancialYearOrContinue"
              checked={formData.restartSampleNoForFinancialYearOrContinue}
              onChange={handleInputChange}
            />
            <label htmlFor="restartSampleNo" className="HospitalPolicies-checkbox-label">
              Restart Sample no for financialYear or continue
            </label>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="salesReturnValidation"
              name="salesReturnValidation"
              checked={formData.salesReturnValidation}
              onChange={handleInputChange}
            />
            <label htmlFor="salesReturnValidation" className="HospitalPolicies-checkbox-label">
              Sales Return Validation
            </label>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="allowPartialDues"
              name="allowPartialDues"
              checked={formData.allowPartialDues}
              onChange={handleInputChange}
            />
            <label htmlFor="allowPartialDues" className="HospitalPolicies-checkbox-label">
              Allow Partial Dues
            </label>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="activeApprovalForCancellation"
              name="activeApprovalForCancellation"
              checked={formData.activeApprovalForCancellation}
              onChange={handleInputChange}
            />
            <label htmlFor="activeApprovalForCancellation" className="HospitalPolicies-checkbox-label">
              Active Approval For cancellation
            </label>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="printLocationName"
              name="printLocationNameInWebtransPrintsAndWebreports"
              checked={formData.printLocationNameInWebtransPrintsAndWebreports}
              onChange={handleInputChange}
            />
            <label htmlFor="printLocationName" className="HospitalPolicies-checkbox-label">
              Print Location Name in Webtrans Prints & Webreports
            </label>
          </div>

          <div className="HospitalPolicies-search-field">
            <FloatingInput
              label="Online Payment paymode*"
              type="text"
              value={formData.onlinePaymentPaymode}
              onChange={(e) => handleInputChange({ target: { name: 'onlinePaymentPaymode', value: e.target.value } })}
            />
            <button
              className="HospitalPolicies-search-icon"
              onClick={() => handleSearchClick('onlinePayment')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="HospitalPolicies-section">
        <div className="HospitalPolicies-header">Sequences To Be Start With</div>
        <div className="HospitalPolicies-grid">
          <FloatingInput
            label="OPD Billing Billno Sequence"
            type="text"
            name="OPDBillingBillnoSequence"
            value={formData.OPDBillingBillnoSequence}
            onChange={handleInputChange}
          />

          <FloatingInput
            label="IPD Billing Billno Sequence"
            type="text"
            name="IPDBillingBillnoSequence"
            value={formData.IPDBillingBillnoSequence}
            onChange={handleInputChange}
          />

          <FloatingInput
            label="Final Bill Billno Sequence"
            type="text"
            name="finalBillBillnoSequence"
            value={formData.finalBillBillnoSequence}
            onChange={handleInputChange}
          />

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="categoryWiseOPDConsultation"
              name="categoryWiseOPDConsultation"
              checked={formData.categoryWiseOPDConsultation}
              onChange={handleInputChange}
            />
            <label htmlFor="categoryWiseOPDConsultation" className="HospitalPolicies-checkbox-label">
              Category wise OPD Consultation
            </label>
          </div>

          <div className="HospitalPolicies-search-field">
            <FloatingInput
              label="Service For Registration Charges :*"
              type="text"
              value={formData.serviceForRegistrationCharges}
              onChange={(e) => handleInputChange({ target: { name: 'serviceForRegistrationCharges', value: e.target.value } })}
            />
            <button
              className="HospitalPolicies-search-icon"
              onClick={() => handleSearchClick('service')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                />
              </svg>
            </button>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="tokenSystemBasedOnApptsTime"
              name="tokenSystemBasedOnApptsTime"
              checked={formData.tokenSystemBasedOnApptsTime}
              onChange={handleInputChange}
            />
            <label htmlFor="tokenSystemBasedOnApptsTime" className="HospitalPolicies-checkbox-label">
              Token System Based on Appts Time
            </label>
          </div>

          <div className="HospitalPolicies-form-row-chechbox">
            <input
              type="checkbox"
              id="RISIntegration"
              name="RISIntegration"
              checked={formData.RISIntegration}
              onChange={handleInputChange}
            />
            <label htmlFor="RISIntegration" className="HospitalPolicies-checkbox-label">
              RIS integration
            </label>
          </div>
        </div>
      </div>


      <div className="HospitalPolicies-section">
        <div className="HospitalPolicies-header">Hospital Policies List</div>
        <div className="HospitalPolicies-table-container">
          <table className="HospitalPolicies-table" ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Release Bed On",
                  "Non Emer Start Time",
                  "Non Emer End Time",
                  "DIS Indent To Dept",
                  "Staff Pharmacy Adv Paymode",
                  "Staff OPD Adv Paymode",
                  "Online Payment Paymode",
                  "OPD Billing Sequence",
                  "IPD Billing Sequence",
                  "Final Bill Sequence",
                  "Service For Registration"
                ].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
                    className="resizable-th"
                  >
                    <div className="header-content">
                      <span>{header}</span>
                      <div
                        className="resizer"
                        onMouseDown={startResizing(
                          tableRef,
                          setColumnWidths
                        )(index)}
                      ></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {savedPolicies.map((policy, index) => (
                <tr key={index}>
                  <td>{policy.releaseBedOn}</td>
                  <td>{policy.nonEmerStartTime}</td>
                  <td>{policy.nonEmerEndTime}</td>
                  <td>{policy.disIndentToDept}</td>
                  <td>{policy.staffPharmacyAdvPaymode}</td>
                  <td>{policy.staffOpdAdvPaymode}</td>
                  <td>{policy.onlinePaymentPaymode}</td>
                  <td>{policy.OPDBillingBillnoSequence}</td>
                  <td>{policy.IPDBillingBillnoSequence}</td>
                  <td>{policy.finalBillBillnoSequence}</td>
                  <td>{policy.serviceForRegistrationCharges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="HospitalPolicies-content-wrapper">
        <div className="HospitalPolicies-main-section"></div>
        <div className="HospitalPolicies-action-buttons">
          <button className="btn-blue" onClick={handleSave}>Save</button>
          <button className="btn-blue" onClick={() => setActivePopup(true)}>Search</button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange" onClick={handleClear}>Clear</button>
          <button className="btn-gray">Close</button>
        </div>
      </div>

      {/* Popup for Search */}
      {activePopup && (
        <div className="HospitalPolicies-popup">
          <div className="HospitalPolicies-popup-content">
            <div className="HospitalPolicies-popup-header">
              <span>From To Date</span>
              <button
                className="HospitalPolicies-popup-close"
                onClick={() => setActivePopup(false)}
              >
                &times;
              </button>
            </div>
            <div className="HospitalPolicies-popup-body">
              <div className="HospitalPolicies-popup-form">
                <FloatingInput
                  label="From Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />

                <FloatingInput
                  label="To Date"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />

                <div className="HospitalPolicies-search-field">
                  <FloatingInput
                    label="Search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="HospitalPolicies-search-icon"
                    onClick={() => handleSearchClick('search')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PopupTable for Search */}
      {showPopupTable && (
        <PopupTable
          columns={getPopupColumns()}
          data={getPopupData()}
          onSelect={handleRowSelect}
          onClose={() => setShowPopupTable(false)}
        />
      )}
    </div>
  );

};

export default HospitalPolicies;






