import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './ChemotherapyScheduling.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

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

    const [showForm, setShowForm] = useState(false);
    const [records, setRecords] = useState([]);
    const [tableData, setTableData] = useState([]);

    // Fetch records from the API when the component mounts
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/chemotherapy-session/all');
                setRecords(response.data); // Assuming the response is an array of records
                setTableData(response.data);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, []); // Empty dependency array to run only once on mount

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to add a new chemotherapy session
            const response = await axios.post('http://localhost:8000/api/chemotherapy-session/add', formData);
            console.log("Data submitted: ", response.data);

            // Add the new record to the state
            setRecords([...records, response.data]); // Add the response data (new record) to the state
            setTableData([...records, response.data]); // Update the table with the new record
            setShowForm(false); // Hide form after submission

            // Clear the form
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
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };







    // Function to export table to Excel
    const handleExport = () => {
        const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
        const wb = XLSX.utils.book_new(); // Creates a new workbook
        XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
        XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
    };

    // Function to trigger print
    const handlePrint = () => {
        window.print(); // Triggers the browser's print window
    };




    return (
        <div className="chemotherapy-scheduling-container">

            {!showForm && (
                <button className="chemotherapy-scheduling-submit-btn" onClick={() => setShowForm(true)}>
                    Add Chemotherapy
                </button>
            )}
            {!showForm && tableData.length > 0 && (
                <div className='table-container'>
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {["Patient ID", "Patient Name", "Date of Birth", "Diagnosis", "Cycle", "Drug", "Dosage", "Frequency", "Start Date", "End Date", "Next Session", "Oncologist", "Comments"].map((header, index) => (
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
