import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SurgeryManagement.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../../api/api';

const SurgeryManagement = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [formData, setFormData] = useState({
        patientID: '',
        patientName: '',
        surgeryType: '',
        surgeryDate: '',
        surgeonName: '',
        anesthetistName: '',
        preOpInstructions: '',
        postOpCarePlan: '',
        hospitalStay: '',
        followUp: '',
        complications: '',
        outcome: '',
        comments: '',
    });

    const [records, setRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Fetch all surgery records (GET request)
    useEffect(() => {
        axios.get(`${API_BASE_URL}/surgeries/all`)
            .then(response => {
                setRecords(response.data);  // Set the fetched data to records state
            })
            .catch(error => {
                console.error("Error fetching surgery data: ", error);
            });
    }, []);

    // Handle input changes for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission (POST request)
    const handleSubmit = (e) => {
        e.preventDefault();

        const surgeryData = {
            patientName: formData.patientName,
            surgeryType: formData.surgeryType,
            surgeryDate: formData.surgeryDate,
            surgeonName: formData.surgeonName,
            anesthetistName: formData.anesthetistName,
            hospitalStay: formData.hospitalStay,
            preOpInstructions: formData.preOpInstructions,
            postOpCarePlan: formData.postOpCarePlan,
            followUp: formData.followUp,
            complications: formData.complications,
            outcome: formData.outcome,
            comments: formData.comments,
        };

        axios.post(`${API_BASE_URL}/surgeries/patient/${formData.patientID}`, surgeryData)
            .then(response => {
                console.log('Form Data Submitted:', response.data);
                alert("added Successfully");
                setRecords([...records, response.data]);  // Add the new record to the existing ones
                setShowForm(false);  // Hide form after submission
            })
            .catch(error => {
                console.error("Error submitting data: ", error);
            });
    };

    return (
        <div className="surgery-management-container">
            {!showForm && (
                <>
                    <button
                        className="surgery-management-submit-btn"
                        onClick={() => setShowForm(true)}
                    >
                        Add Surgery
                    </button>
                    <div className='table-container'>
                        <table ref={tableRef}>
                            <thead>
                                <tr>
                                    {[
                                        'Patient Name',
                                        'Surgery Type',
                                        'Surgery Date',
                                        'Surgeon Name',
                                        'Anesthetist Name',
                                        'Pre-Op Instructions',
                                        'Post-Op Care Plan',
                                        'Hospital Stay',
                                        'Follow-Up',
                                        'Complications',
                                        'Outcome',
                                        'Comments',
                                    ].map((header, index) => (
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
                                        <td>{record.patientName}</td>
                                        <td>{record.surgeryType}</td>
                                        <td>{record.surgeryDate}</td>
                                        <td>{record.surgeonName}</td>
                                        <td>{record.anesthetistName}</td>
                                        <td>{record.preOpInstructions}</td>
                                        <td>{record.postOpCarePlan}</td>
                                        <td>{record.hospitalStay}</td>
                                        <td>{record.followUp}</td>
                                        <td>{record.complications}</td>
                                        <td>{record.outcome}</td>
                                        <td>{record.comments}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {showForm && (
                <form className="surgery-management" onSubmit={handleSubmit}>
                    <div className="surgery-management-left">
                        <h3>Patient Details</h3>
                        <div className="surgery-management-group">
                            <label>Patient ID <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="patientID"
                                value={formData.patientID}
                                onChange={handleInputChange}
                                placeholder="Patient ID"
                                required
                            />
                        </div>
                        <div className="surgery-management-group">
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
                        <div className="surgery-management-group">
                            <label>Surgery Type <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="surgeryType"
                                value={formData.surgeryType}
                                onChange={handleInputChange}
                                placeholder="Surgery Type"
                                required
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Surgery Date <span className="mandatory">*</span></label>
                            <input
                                type="date"
                                name="surgeryDate"
                                value={formData.surgeryDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <h3>Surgery Details</h3>
                        <div className="surgery-management-group">
                            <label>Surgeon Name <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="surgeonName"
                                value={formData.surgeonName}
                                onChange={handleInputChange}
                                placeholder="Surgeon Name"
                                required
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Anesthetist Name <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="anesthetistName"
                                value={formData.anesthetistName}
                                onChange={handleInputChange}
                                placeholder="Anesthetist Name"
                                required
                            />
                        </div>
                    </div>
                    <div className="surgery-management-right">
                        <div className="surgery-management-group">
                            <label>Pre-Op Instructions</label>
                            <textarea
                                name="preOpInstructions"
                                value={formData.preOpInstructions}
                                onChange={handleInputChange}
                                placeholder="Pre-Op Instructions"
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Post-Op Care Plan</label>
                            <textarea
                                name="postOpCarePlan"
                                value={formData.postOpCarePlan}
                                onChange={handleInputChange}
                                placeholder="Post-Op Care Plan"
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Hospital Stay <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="hospitalStay"
                                value={formData.hospitalStay}
                                onChange={handleInputChange}
                                placeholder="Hospital Stay"
                                required
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Follow-Up <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="followUp"
                                value={formData.followUp}
                                onChange={handleInputChange}
                                placeholder="Follow-Up"
                                required
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Complications</label>
                            <textarea
                                name="complications"
                                value={formData.complications}
                                onChange={handleInputChange}
                                placeholder="Complications"
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Outcome</label>
                            <textarea
                                name="outcome"
                                value={formData.outcome}
                                onChange={handleInputChange}
                                placeholder="Outcome"
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Comments</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleInputChange}
                                placeholder="Comments"
                            />
                        </div>
                    </div>
                    <div className="surgery-management-actions">
                        <button type="submit" className="surgery-management-submit-btn">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SurgeryManagement;
