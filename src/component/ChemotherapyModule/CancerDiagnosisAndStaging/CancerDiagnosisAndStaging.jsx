import React, { useState, useRef } from 'react';
import './CancerDiagnosisAndStaging.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

const CancerDiagnosisAndStaging = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    
    // State for form data
    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        age: '',
        cancerType: '',
        diagnosisDate: '',
        biopsyResults: '',
        imagingReports: '',
        cancerStage: '',
        tumorMarkers: '',
        pathologist: '',
        oncologistAssigned: '',
        comments: ''
    });

    // State for tracking form visibility and records
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [records, setRecords] = useState([]); // New state to hold records

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add new record to records array
        setRecords([...records, formData]);
        console.log("Form Data Submitted: ", formData);
        // Reset form data after submission
        setFormData({
            patientId: '',
            patientName: '',
            age: '',
            cancerType: '',
            diagnosisDate: '',
            biopsyResults: '',
            imagingReports: '',
            cancerStage: '',
            tumorMarkers: '',
            pathologist: '',
            oncologistAssigned: '',
            comments: ''
        });
        setIsFormVisible(false); // Hide the form after submission
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible); // Toggle form visibility
    };

    return (
        <div className="cancer-diagnosis-and-staging-container">
            {/* Button to toggle form visibility */}
            {!isFormVisible && (
                <button 
                    className='cancer-diagnosis-and-staging-submit-btn' 
                    type="button" 
                    onClick={toggleFormVisibility}
                >
                   Add Cancer Type
                </button>
            )}

            {/* Table to display records */}
            {!isFormVisible && (
                <div className='table-container'>
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {["Patient ID", "Patient Name", "Age", "Cancer Type", "Diagnosis Date", "Biopsy Results", "Imaging Reports", "Cancer Stage", "Tumor Markers", "Pathologist", "Oncologist Assigned", "Comments"].map((header, index) => (
                                    <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                                        <div className="header-content">
                                            <span>{header}</span>
                                            <div
                                                className="resizer"
                                                onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                            ></div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.patientId}</td>
                                    <td>{record.patientName}</td>
                                    <td>{record.age}</td>
                                    <td>{record.cancerType}</td>
                                    <td>{record.diagnosisDate}</td>
                                    <td>{record.biopsyResults}</td>
                                    <td>{record.imagingReports}</td>
                                    <td>{record.cancerStage}</td>
                                    <td>{record.tumorMarkers}</td>
                                    <td>{record.pathologist}</td>
                                    <td>{record.oncologistAssigned}</td>
                                    <td>{record.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Form to collect patient details */}
            {isFormVisible && (
                <form className="cancer-diagnosis-and-staging" onSubmit={handleSubmit}>
                    <div className="cancer-diagnosis-and-staging-left">
                        <h3>Patient Details</h3>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Patient ID <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleInputChange}
                                placeholder="Patient ID"
                                required
                            />
                        </div>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Patient Name <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                                placeholder="Patient Name"
                                required
                            />
                        </div>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Age <span className="mandatory">*</span></label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                                required
                            />
                        </div>
                        <h3>Diagnosis</h3>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Cancer Type <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="cancerType"
                                value={formData.cancerType}
                                onChange={handleInputChange}
                                placeholder="Cancer Type"
                                required
                            />
                        </div>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Diagnosis Date <span className="mandatory">*</span></label>
                            <input
                                type="date"
                                name="diagnosisDate"
                                value={formData.diagnosisDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Biopsy Results <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="biopsyResults"
                                value={formData.biopsyResults}
                                onChange={handleInputChange}
                                placeholder="Biopsy Results"
                                required
                            />
                        </div>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Imaging Reports <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="imagingReports"
                                value={formData.imagingReports}
                                onChange={handleInputChange}
                                placeholder="Imaging Reports"
                                required
                            />
                        </div>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Tumor Markers <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="tumorMarkers"
                                value={formData.tumorMarkers}
                                onChange={handleInputChange}
                                placeholder="Tumor Markers"
                                required
                            />
                        </div>
                    </div>

                    <div className="cancer-diagnosis-and-staging-right">
                        <h3>Staging</h3>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Cancer Stage <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="cancerStage"
                                value={formData.cancerStage}
                                onChange={handleInputChange}
                                placeholder="Cancer Stage"
                                required
                            />
                        </div>
                        <h3>Medical Team</h3>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Pathologist</label>
                            <input
                                type="text"
                                name="pathologist"
                                value={formData.pathologist}
                                onChange={handleInputChange}
                                placeholder="Pathologist"
                            />
                        </div>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Oncologist Assigned</label>
                            <input
                                type="text"
                                name="oncologistAssigned"
                                value={formData.oncologistAssigned}
                                onChange={handleInputChange}
                                placeholder="Oncologist Assigned"
                            />
                        </div>
                        <div className="cancer-diagnosis-and-staging-group">
                            <label>Comments</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleInputChange}
                                placeholder="Comments"
                            />
                        </div>
                        <div className='cancer-diagnosis-and-staging-button'>
                            <button type="submit" className="cancer-diagnosis-and-staging-submit-btn">Submit</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CancerDiagnosisAndStaging;
