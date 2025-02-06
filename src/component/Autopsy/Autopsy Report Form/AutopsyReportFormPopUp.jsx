import React, { useState, useEffect } from "react";
import PopupTable from "../../Admission/PopupTable";
import { API_BASE_URL } from "../../api/api";

const FloatingInput = ({ label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };
  return (
    <div className={`AutopsyExecution-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="AutopsyExecution-floating-input"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="AutopsyExecution-floating-label">{label}</label>
    </div>
  );
};

const FloatingSelect = ({ label, options = [], ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className={`AutopsyExecution-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="AutopsyExecution-floating-select"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => setHasValue(e.target.value !== '')}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="AutopsyExecution-floating-label">{label}</label>
    </div>
  );
};

const AutopsyReportFormPopUp = () => {
  const [formData, setFormData] = useState({
    autopsyRequestId: "",
    patientName: "",
    dateOfAutopsy: "",
    causeOfDeath: "",
    findings: "",
    conclusion: "",
    seniorPathologistName: "",
    reviewedBy: "",
    reportStatus: ""
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [autopsyRequests, setAutopsyRequests] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedreviewedBy, setselectedreviewedBy] = useState([]);
  const [selectedseniorPathologist, setselectedseniorPathologist] = useState([]);

  useEffect(() => {
    const fetchAutopsyRequests = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/autopsy-requests`);
        const data = await response.json();
        setAutopsyRequests(data);
      } catch (error) {
        console.error('Error fetching autopsy requests:', error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/doctors/specialization/1`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchAutopsyRequests();
    fetchDoctors();
  }, []);

  const handleSearchClick = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const handlePopupSelect = (selectedRow) => {
    switch (popupType) {
      case "autopsyRequestId":
        setFormData(prev => ({
          ...prev,
          autopsyRequestId: selectedRow.autopsyreqId,
          patientName: `${selectedRow.firstName} ${selectedRow.middleName || ''} ${selectedRow.lastName}`,
          causeOfDeath: selectedRow.causeOfDeath
        }));
        break;
      case "seniorPathologist":
        setselectedseniorPathologist(selectedRow)
        setFormData(prev => ({
          ...prev,
          seniorPathologistName: selectedRow.doctorName
        }));
        break;
      case "reviewedBy":
        setselectedreviewedBy(selectedRow);
        setFormData(prev => ({
          ...prev,
          reviewedBy: selectedRow.doctorName
        }));
        break;
    }
    setShowPopup(false);
  };

  const handleInputChange = (e, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.autopsyRequestId || !formData.dateOfAutopsy || !formData.causeOfDeath) {
      alert("Please fill in all required fields.");
      return;
    }

    const fileInput = document.getElementById('fileUpload');
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.");
        return;
      }
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        alert("Invalid file type. Please upload a PDF, JPEG, or PNG file.");
        return;
      }
    }

    const payload = {
      autopsyRequestForm: { autopsyreqId: formData.autopsyRequestId },
      dateofAutopsy: formData.dateOfAutopsy,
      causeofDeath: formData.causeOfDeath,
      findings: formData.findings,
      conclusion: formData.conclusion,
      reviewedBy: { doctorId: selectedreviewedBy?.doctorId },
      seniorPathologist: { doctorId: selectedseniorPathologist?.doctorId },
      reportStatus: formData.reportStatus,
    };

    const formDataMultipart = new FormData();
    formDataMultipart.append('autopsyReportFormdto', JSON.stringify(payload));

    if (fileInput && fileInput.files.length > 0) {
      formDataMultipart.append('file', fileInput.files[0]);
    } else {
      formDataMultipart.append('file', new File([''], 'dummy.txt', { type: 'text/plain' }));
    }

    try {
      const response = await fetch(`${API_BASE_URL}/autopsy-report-form`, {
        method: 'POST',
        body: formDataMultipart,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      alert('Autopsy Report submitted successfully!');
      setFormData({
        autopsyRequestId: "",
        dateOfAutopsy: "",
        causeOfDeath: "",
        findings: "",
        conclusion: "",
        reviewedById: "",
        seniorPathologistId: "",
        reportStatus: "",
      });

      if (fileInput) {
        fileInput.value = null; // Reset file input
      }
    } catch (error) {
      console.error('Error submitting autopsy report:', error);
      alert(error.message || 'Failed to submit autopsy report. Please try again.');
    } finally {
    }
  };




  return (
    <>
      <div className="AutopsyExecution-container">
        <div className="AutopsyExecution-section">
          <div className="AutopsyExecution-header">Autopsy Report Form</div>
          <div className="AutopsyExecution-grid">
            <div className="AutopsyExecution-search-field">
              <FloatingInput
                label="Autopsy Request Id"
                value={formData.autopsyRequestId}
                onChange={(e) => handleInputChange(e, 'autopsyRequestId')}
              />
              <button
                className="AutopsyExecution-search-icon"
                onClick={() => handleSearchClick("autopsyRequestId")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                </svg>
              </button>
            </div>

            <FloatingInput
              label="Patient Name"
              value={formData.patientName}
              onChange={(e) => handleInputChange(e, 'patientName')}
            />

            <FloatingInput
              label="Date of Autopsy"
              type="date"
              value={formData.dateOfAutopsy}
              onChange={(e) => handleInputChange(e, 'dateOfAutopsy')}
            />

            <FloatingInput
              label="Cause Of Death"
              value={formData.causeOfDeath}
              onChange={(e) => handleInputChange(e, 'causeOfDeath')}
            />

            <div className="AutopsyExecution-search-field">
              <FloatingInput
                label="Findings"
                value={formData.findings}
                onChange={(e) => handleInputChange(e, 'findings')}
              />
            </div>

            <FloatingInput
              label="Conclusion"
              value={formData.conclusion}
              onChange={(e) => handleInputChange(e, 'conclusion')}
            />

            <div className="AutopsyExecution-search-field">
              <FloatingInput
                label="Senior Pathologist Name"
                value={formData.seniorPathologistName}
                onChange={(e) => handleInputChange(e, 'seniorPathologistName')}
              />
              <button
                className="AutopsyExecution-search-icon"
                onClick={() => handleSearchClick("seniorPathologist")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                </svg>
              </button>
            </div>

            <div className="AutopsyExecution-search-field">
              <FloatingInput
                label="Reviewed By"
                value={formData.reviewedBy}
                onChange={(e) => handleInputChange(e, 'reviewedBy')}
              />
              <button
                className="AutopsyExecution-search-icon"
                onClick={() => handleSearchClick("reviewedBy")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                </svg>
              </button>
            </div>

            <FloatingSelect
              label="Report Status"
              value={formData.reportStatus}
              onChange={(e) => handleInputChange(e, 'reportStatus')}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'finalized', label: 'Finalized' },
              ]}
            />
          </div>


        </div>
        <button className="AutopsyExecution-btn" onClick={handleSubmit}>Submit</button>
      </div>

      {showPopup && (
        <PopupTable
          columns={
            popupType === "autopsyRequestId"
              ? ["autopsyreqId", "firstName", "middleName", "lastName", "causeOfDeath"]
              : ["doctorId", "doctorName", "specialization"]
          }
          data={
            popupType === "autopsyRequestId"
              ? autopsyRequests
              : doctors
          }
          onSelect={handlePopupSelect}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default AutopsyReportFormPopUp;
