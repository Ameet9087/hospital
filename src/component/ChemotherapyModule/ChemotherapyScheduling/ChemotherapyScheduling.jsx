import React, { useState,useRef } from 'react';
import './ChemotherapyScheduling.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';


const ChemotherapyScheduling = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        dateOfBirth: '',
        diagnosisDetails: '',
        cycleNumber: '',
        drugName: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: '',
        nextSessionDate: '',
        attendingOncologist: '',
        comments: '',
    });

    const [showForm, setShowForm] = useState(false); // Initially false to show the table first
    const [records, setRecords] = useState([
        { 
            patientId: 'P001',
            patientName: 'John Doe',
            dateOfBirth: '1985-04-15',
            diagnosisDetails: 'Lung Cancer',
            cycleNumber: '2',
            drugName: 'Cisplatin',
            dosage: '75mg/m²',
            frequency: 'Every 3 weeks',
            startDate: '2024-01-10',
            endDate: '2024-04-10',
            nextSessionDate: '2024-02-01',
            attendingOncologist: 'Dr. Smith',
            comments: 'Patient responding well to treatment',
        },
        // You can add more records here
    ]);

    const [tableData, setTableData] = useState(records); // Initially display the records

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the new formData to the records array
        const updatedRecords = [...records, formData];
        setRecords(updatedRecords);
        setTableData(updatedRecords); // Update the table with the new record
        setShowForm(false); // Hide form after submission
        console.log("Form Data Submitted: ", formData);
        setFormData({
            patientId: '',
            patientName: '',
            dateOfBirth: '',
            diagnosisDetails: '',
            cycleNumber: '',
            drugName: '',
            dosage: '',
            frequency: '',
            startDate: '',
            endDate: '',
            nextSessionDate: '',
            attendingOncologist: '',
            comments: '',
        }); // Clear the form
    };

    return (
        <div className="chemotherapy-scheduling-container">
        {!showForm && (
            <button className="chemotherapy-scheduling-submit-btn" onClick={() => setShowForm(true)}>
                Add Chemotherapy
            </button>
        )}         {!showForm && tableData.length > 0 && (
              <div className='table-container'>
                  <table ref={tableRef}>
                        <thead>
                            <tr>
                                {["Patient ID",
    "Patient Name",
    "Date of Birth",
    "Diagnosis",
    "Cycle",
    "Drug",
    "Dosage",
    "Frequency",
    "Start Date",
    "End Date",
    "Next Session",
    "Oncologist",
    "Comments"].map((header, index) => (
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
                        {tableData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.patientId}</td>
                                <td>{data.patientName}</td>
                                <td>{data.dateOfBirth}</td>
                                <td>{data.diagnosisDetails}</td>
                                <td>{data.cycleNumber}</td>
                                <td>{data.drugName}</td>
                                <td>{data.dosage}</td>
                                <td>{data.frequency}</td>
                                <td>{data.startDate}</td>
                                <td>{data.endDate}</td>
                                <td>{data.nextSessionDate}</td>
                                <td>{data.attendingOncologist}</td>
                                <td>{data.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            )}

            {/* Toggle Button to Show Form */}
            {/* {!showForm && (
              
            )} */}

            {/* Display Form Conditionally */}
            {showForm && (
                <form className="chemotherapy-scheduling" onSubmit={handleSubmit}>
                    <div className="chemotherapy-scheduling-left">
                        <h3>Patient Details</h3>

                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Patient ID <span className="mandatory">*</span>
                            </label>
                            <input
                                type="text"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleInputChange}
                                placeholder="Patient ID"
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Patient Name <span className="mandatory">*</span>
                            </label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                                placeholder="Patient Name"
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Date of Birth <span className="mandatory">*</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Diagnosis Details <span className="mandatory">*</span>
                            </label>
                            <input
                                type="text"
                                name="diagnosisDetails"
                                value={formData.diagnosisDetails}
                                onChange={handleInputChange}
                                placeholder="Diagnosis Details"
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Cycle Number <span className="mandatory">*</span>
                            </label>
                            <input
                                type="text"
                                name="cycleNumber"
                                value={formData.cycleNumber}
                                onChange={handleInputChange}
                                placeholder="Cycle Number"
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Drug Name <span className="mandatory">*</span>
                            </label>
                            <input
                                type="text"
                                name="drugName"
                                value={formData.drugName}
                                onChange={handleInputChange}
                                placeholder="Drug Name"
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Dosage <span className="mandatory">*</span>
                            </label>
                            <input
                                type="text"
                                name="dosage"
                                value={formData.dosage}
                                onChange={handleInputChange}
                                placeholder="Dosage"
                                required
                            />
                        </div>
                    </div>
                    <div className="chemotherapy-scheduling-right">
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Frequency <span className="mandatory">*</span>
                            </label>
                            <input
                                type="text"
                                name="frequency"
                                value={formData.frequency}
                                onChange={handleInputChange}
                                placeholder="Frequency"
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Start Date <span className="mandatory">*</span>
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                End Date <span className="mandatory">*</span>
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>
                                Next Session Date <span className="mandatory">*</span>
                            </label>
                            <input
                                type="date"
                                name="nextSessionDate"
                                value={formData.nextSessionDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <h3>Medical Team</h3>
                        <div className="chemotherapy-scheduling-group">
                            <label>Attending Oncologist</label>
                            <input
                                type="text"
                                name="attendingOncologist"
                                value={formData.attendingOncologist}
                                onChange={handleInputChange}
                                placeholder="Attending Oncologist"
                            />
                        </div>
                        <div className="chemotherapy-scheduling-group">
                            <label>Comments</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleInputChange}
                                placeholder="Additional Comments"
                            />
                        </div>

                        <div className="chemotherapy-scheduling-buttons">
                            <button type="submit" className="chemotherapy-scheduling-submit-btn">
                                Submit
                            </button>
                           
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ChemotherapyScheduling;
