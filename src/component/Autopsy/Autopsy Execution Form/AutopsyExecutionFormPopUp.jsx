import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupTable from '../../Admission/PopupTable'; // Ensure this component exists
import './AutopsyexecutionFormPopUp.css';
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

const AutopsyExecutionFormPopUp = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [formData, setFormData] = useState({
    autopsyRequestId: '',
    patientName: '',
    scheduledDate: '',
    scheduledTime: '',
    pathologistName: '',
    technicianName: '',
    externalExamFindings: '',
    internalExamFindings: '',
    sampleId: '',
    sampleStatus: '',
    otherTest: '',
    additionalNotes: ''
  });

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/autopsy-schedule`);
        const fetchedData = response.data.map(item => ({
          autopsyRequestId: item.autopsySchedulingFormId,
          // patientName: `${item.autopsyRequestFormDto?.firstName || ''} ${item.autopsyRequestFormDto?.lastName || ''}`.trim(), // Combine firstName and lastName
          patientName: item.autopsyRequestFormDto?.firstName,
          scheduledDate: item.scheduledDate,
          scheduledTime: item.scheduledTime,
          pathologistName: item.pathologistDto?.doctorName,
          technicianName: item.technicianDto?.doctorName,
          authorizedBy: item.autopsyRequestFormDto?.authorizedBy
        }));
        setRequestData(fetchedData);
        console.log('Fetched Data:', fetchedData);
      } catch (error) {
        console.error('Error fetching autopsy requests:', error);
      }
    };

    fetchRequestData();
  }, []);

  const getPopupData = () => {
    if (activePopup === "AutopsyRequest") {
      return {
        columns: ["autopsyRequestId",  "scheduledDate", "scheduledTime", "authorizedBy"],
        data: requestData
      };
    }

    return { columns: [], data: [] };
  };

  const handleSelect = (selectedData) => {
    if (activePopup === "AutopsyRequest") {
      setFormData(prev => ({
        ...prev,
        autopsyRequestId: selectedData.autopsyRequestId,
        patientName: selectedData.patientName,
        scheduledDate: selectedData.scheduledDate,
        scheduledTime: selectedData.scheduledTime,
        pathologistName: selectedData.pathologistName,
        technicianName: selectedData.technicianName
      }));
    }
    setActivePopup(null);
  };

  const handleSubmit = async () => {
    const payload = {
      externalExaminationFindings: formData.externalExamFindings,
      internalExaminationFindings: formData.internalExamFindings,
      samplesCollected: formData.sampleId,
      specify: "Additional sample details",
      sampleID: formData.sampleId,
      sampleStatus: formData.sampleStatus,
      toxicologyTest: "Completed",
      microbiologyTest: "Pending",
      histopathologyTest: "Ongoing",
      otherTest: formData.otherTest,
      additionalNotes: formData.additionalNotes,
      autopsySchedulingFormDTO: {
        autopsySchedulingFormId: formData.autopsyRequestId
      }
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/autopsy-execution-forms`, payload);
      alert('Autopsy Execution Form saved successfully!');
      console.log('Data saved successfully:', response.data);
      
      setFormData({
        autopsyRequestId: '',
        patientName: '',
        scheduledDate: '',
        scheduledTime: '',
        pathologistName: '',
        technicianName: '',
        externalExamFindings: '',
        internalExamFindings: '',
        sampleId: '',
        sampleStatus: '',
        otherTest: '',
        additionalNotes: ''
      });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };

  return (
    <>
      <div className="AutopsyExecution-container">
        <div className="AutopsyExecution-section">
          <div className="AutopsyExecution-header">Autopsy Request Information</div>
          <div className="AutopsyExecution-grid">
            <div className="AutopsyExecution-search-field">
              <FloatingInput
                label="Autopsy Scheduled ID"
                value={formData.autopsyRequestId}
                onChange={(e) => setFormData(prev => ({ ...prev, autopsyRequestId: e.target.value }))}
              />
              <button
                className="AutopsyExecution-search-icon"
                onClick={() => setActivePopup("AutopsyRequest")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                </svg>
              </button>
            </div>

            <FloatingInput
              label="Patient Name"
              value={formData.patientName}
              onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
            />
            <FloatingInput
              label="Scheduled Date"
              value={formData.scheduledDate}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
            />
            <FloatingInput
              label="Scheduled Time"
              value={formData.scheduledTime}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
            />

            <FloatingInput
              label="Pathologist Name"
              value={formData.pathologistName}
              onChange={(e) => setFormData(prev => ({ ...prev, pathologistName: e.target.value }))}
            />

            <FloatingInput
              label="Technician Name"
              value={formData.technicianName}
              onChange={(e) => setFormData(prev => ({ ...prev, technicianName: e.target.value }))}
            />

            <FloatingInput
              label="External Examination Findings"
              value={formData.externalExamFindings}
              onChange={(e) => setFormData(prev => ({ ...prev, externalExamFindings: e.target.value }))}
            />

            <FloatingInput
              label="Internal Examination Findings"
              value={formData.internalExamFindings}
              onChange={(e) => setFormData(prev => ({ ...prev, internalExamFindings: e.target.value }))}
            />

            <FloatingInput
              label="Sample ID"
              value={formData.sampleId}
              onChange={(e) => setFormData(prev => ({ ...prev, sampleId: e.target.value }))}
            />

            <FloatingSelect
              label="Sample Status"
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'collected', label: 'Collected' },
                { value: 'sentforTesting', label: 'Sent for Testing' }
              ]}
              value={formData.sampleStatus}
              onChange={(e) => setFormData(prev => ({ ...prev, sampleStatus: e.target.value }))}
            />

            <FloatingInput
              label="Other Test"
              value={formData.otherTest}
              onChange={(e) => setFormData(prev => ({ ...prev, otherTest: e.target.value }))}
            />

            <FloatingInput
              label="Additional Notes"
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
            />
          </div>
        </div>

        {activePopup && (
          <PopupTable
            columns={getPopupData().columns}
            data={getPopupData().data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
          />
        )}

        <button className="AutopsyExecution-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default AutopsyExecutionFormPopUp;
