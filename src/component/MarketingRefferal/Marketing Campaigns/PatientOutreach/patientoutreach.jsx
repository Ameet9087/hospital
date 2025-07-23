import React, { useState, useEffect, useRef } from 'react';
import './PatientOutreach.css';
import axios from 'axios';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
function PatientOutreach() {

    const tableRef = useRef(null);
    const [columnWidths, setColumnWidths] = useState([]);
    const [outreachData, setOutreachData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(''); // 'add' or 'edit'
    const [formData, setFormData] = useState({
        outreachId: '',
        staffId: '', // Added staffId field
        patientId: '',
        outreachType: '',
        outreachDate: '',
        outreachStatus: '',
    });

    // Fetch outreach data from the API
    useEffect(() => {
        axios.get('http://localhost:5000/api/outreach') // Replace with your API endpoint
            .then((response) => {
                setOutreachData(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching outreach data:', error);
            });
    }, []);

    const openModal = (mode, outreach = {}) => {
        setModalMode(mode);
        if (mode === 'edit') {
            setFormData(outreach);
        } else {
            setFormData({
                outreachId: '',
                staffId: '', // Reset staffId on modal open for adding
                patientId: '',
                outreachType: '',
                outreachDate: '',
                outreachStatus: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            outreachId: '',
            staffId: '', // Reset staffId when modal is closed
            patientId: '',
            outreachType: '',
            outreachDate: '',
            outreachStatus: '',
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (modalMode === 'add') {
            // POST request to add a new outreach entry
            const newOutreach = {
                staffId: formData.staffId, // Include staffId in the new outreach data
                patientId: formData.patientId,
                outreachType: formData.outreachType,
                outreachDate: formData.outreachDate,
                outreachStatus: formData.outreachStatus,
            };

            axios.post('http://localhost:5000/api/outreach', newOutreach) // Replace with your API endpoint
                .then((response) => {
                    setOutreachData([...outreachData, response.data]); // Add new outreach to state
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error adding outreach:', error);
                });

        } else if (modalMode === 'edit') {
            // PUT request to update the existing outreach entry
            axios.put(`http://localhost:5000/api/outreach/${formData.outreachId}`, formData) // Replace with your API endpoint
                .then((response) => {
                    const updatedOutreachData = outreachData.map((outreach) =>
                        outreach.outreachId === formData.outreachId ? response.data : outreach
                    );
                    setOutreachData(updatedOutreachData); // Update the outreach in the list
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error updating outreach:', error);
                });
        }
    };

    return (
        <div className="mkt-patientoutreach-container">
            <h2>Patient Outreach</h2>
            <button className="mkt-patientoutreach-add-button" onClick={() => openModal('add')}>
                Add New Outreach
            </button>
            <table className="mkt-patientoutreach-table" ref={tableRef}>
                <thead>
                    <tr>
                    {[
                        "Outreach ID",
                        "Referred By (Staff ID)", // Added staffId column
                        "Patient ID",
                        "Outreach Type",
                        "Outreach Date",
                        "Outreach Status",
                        "Action"
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
                                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                ></div>
                            </div>
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {outreachData.map((outreach) => (
                        <tr key={outreach.outreachId}>
                            <td>{outreach.outreachId}</td>
                            <td>{outreach.staffId}</td> {/* Displaying staffId */}
                            <td>{outreach.patientId}</td>
                            <td>{outreach.outreachType}</td>
                            <td>{outreach.outreachDate}</td>
                            <td>{outreach.outreachStatus}</td>
                            <td>
                                <button
                                    className="mkt-patientoutreach-edit-button"
                                    onClick={() => openModal('edit', outreach)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="mkt-patientoutreach-modal">
                    <div className="mkt-patientoutreach-modal-content">
                        <span className="mkt-patientoutreach-close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <h3>{modalMode === 'add' ? 'Add New Outreach' : 'Edit Outreach'}</h3>
                        <form>
                            <div className='patinetoutreach-form'>
                                <label>Staff ID (Referred By):</label> {/* Added staffId input field */}
                                <input
                                    type="text"
                                    name="staffId"
                                    value={formData.staffId}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='patinetoutreach-form'>
                                <label>Patient ID:</label>
                                <input
                                    type="text"
                                    name="patientId"
                                    value={formData.patientId}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='patinetoutreach-form'>
                                <label>Outreach Type:</label>
                                <input
                                    type="text"
                                    name="outreachType"
                                    value={formData.outreachType}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='patinetoutreach-form'>
                                <label>Outreach Date:</label>
                                <input
                                    type="date"
                                    name="outreachDate"
                                    value={formData.outreachDate}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='patinetoutreach-form'>
                                <label>Outreach Status:</label>
                                <input
                                    type="text"
                                    name="outreachStatus"
                                    value={formData.outreachStatus}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                        <button className="mkt-patientoutreach-submit-button" onClick={handleSubmit}>
                            {modalMode === 'add' ? 'Add Outreach' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientOutreach;
