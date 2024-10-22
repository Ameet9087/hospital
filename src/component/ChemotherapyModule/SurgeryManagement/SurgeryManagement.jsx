import React, { useState,useRef} from 'react';
import './SurgeryManagement.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

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

    const [records, setRecords] = useState([
        { 
            patientID: '', 
            patientName: '', 
            surgeryType: '', 
            surgeryDate: '', 
            surgeonName: '', 
            anesthetistName: '' 
        },
        // Add more records as needed
    ]);

    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the new formData to the records array
        setRecords([...records, formData]);
        setShowForm(false); // Hide form after submission
        console.log("Form Data Submitted: ", formData);
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
                                {[  'Patient ID',
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
                                        'Comments',].map((header, index) => (
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
                                  <td>{record.patientID}</td>
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
                            <label>Surgeon Name<span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="surgeonName"
                                value={formData.surgeonName}
                                onChange={handleInputChange}
                                placeholder="Surgeon Name"
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Anesthetist Name<span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="anesthetistName"
                                value={formData.anesthetistName}
                                onChange={handleInputChange}
                                placeholder="Anesthetist Name"
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
                            <label>Hospital Stay<span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="hospitalStay"
                                value={formData.hospitalStay}
                                onChange={handleInputChange}
                                placeholder="Hospital Stay"
                            />
                        </div>
                        <div className="surgery-management-group">
                            <label>Follow-Up</label>
                            <input
                                type="text"
                                name="followUp"
                                value={formData.followUp}
                                onChange={handleInputChange}
                                placeholder="Follow-Up"
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
                        <div className='surgery-management-button'>
                            <button type="submit" className="surgery-management-submit-btn">Submit</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SurgeryManagement;
