import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './AntenatalCare.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';


const AntenatalCare = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [editIndex, setEditIndex] = useState(null);
    const [showEditVisitModal, setShowEditVisitModal] = useState(false);
    const [visits, setVisits] = useState([]);
    const [newVisit, setNewVisit] = useState({
        visitDate: '',
        gestationalAge: '',
        weight: '',
        bloodPressure: '',
        urineTestResult: '',
        ultrasoundReport: '',
        babyweight: '',
        pregnancyRiskLevel: '',
        medicationsPrescribed: '',
        nextVisitDate: '',
        doctorName: '',
        doctorNotes: ''
    });

    const [showAddVisitModal, setShowAddVisitModal] = useState(false);

    // Fetch visits data when the component mounts
    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/antenatal-care');
                console.log(response.data); // Replace with your actual API endpoint
                setVisits(response.data);
            } catch (error) {
                console.error('Error fetching visits:', error);
            }
        };

        fetchVisits();
    }, []); // Empty dependency array means this runs once on mount

    const   handleAddVisit = async () => {
        //if (!newVisit.visitDate || !newVisit.gestationalAge) return; // Basic validation

        console.log("before submitting",newVisit)
        try {
            // Send POST request to add new visit
            const response = await axios.post('http://localhost:8080/api/antenatal-care', {
                ...newVisit,
                visitDate: new Date(newVisit.visitDate),
                nextVisitDate: new Date(newVisit.nextVisitDate),
                patientId:101
            });

            // Update local state with the new visit
            setVisits([...visits, response.data]);
        } catch (error) {
            console.error('Error adding visit:', error);
        }

        resetVisitForm();
        setShowAddVisitModal(false);
        setEditIndex(null); // Reset editIndex after saving
    };

    const handleEditVisit = async () => {
        if (editIndex === null) return; // Ensure editIndex is valid

        try {
            // Send PUT request to update the visit
            const updatedVisit = {
                ...newVisit,
                visitDate: new Date(newVisit.visitDate),
                nextVisitDate: new Date(newVisit.nextVisitDate)
            };

            console.log("data before updating",updatedVisit);

            await axios.put(`http://localhost:8080/api/antenatal-care/${visits[editIndex].ancId}`, updatedVisit); // Use visit ID for the PUT request

            // Update local state
            const updatedVisits = [...visits];
            updatedVisits[editIndex] = updatedVisit; // Update the visit in state
            setVisits(updatedVisits);
        } catch (error) {
            console.error('Error updating visit:', error);
        }

        resetVisitForm();
        setShowEditVisitModal(false);
        setEditIndex(null); // Reset edit index after editing
    };

    const openEditModal = (index) => {
        setEditIndex(index);
        setNewVisit(visits[index]); // Populate form with the selected visit data
        setShowEditVisitModal(true);
    };

    const resetVisitForm = () => {
        setNewVisit({
            visitDate: '',
            gestationalAge: '',
            weight: '',
            bloodPressure: '',
            urineTestResult: '',
            ultrasoundReport: '',
            babyweight: '',
            pregnancyRiskLevel: '',
            medicationsPrescribed: '',
            nextVisitDate: '',
            doctorName: '',
            doctorNotes: ''
        });
    };

    return (
        <div className="maternity-antenatalcare">
            <button className='maternity-antenatalcare-btn' onClick={() => setShowAddVisitModal(true)}>Add Visit</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Visit Date",
                            "Gestational Age (weeks)",
                            "Weight (kg)",
                            "Blood Pressure",
                            "Urine Test Result",
                            "Ultrasound Report",
                            "Baby Weight",
                            "Pregnancy Risk Level",
                            "Medications Prescribed",
                            "Next Visit Date",
                            "Doctor Name",
                            "Doctor Notes",
                            "Actions"
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
                    {visits.map((visit, index) => (
                        <tr key={index}>
                            <td>{new Date(visit.visitDate).toISOString().split('T')[0]}</td>
                            <td>{visit.gestationalAge}</td>
                            <td>{visit.weight}</td>
                            <td>{visit.bloodPressure}</td>
                            <td>{visit.urineTestResult}</td>
                            <td>{visit.ultrasoundReport}</td>
                            <td>{visit.babyweight}</td>
                            <td>{visit.pregnancyRiskLevel}</td>
                            <td>{visit.medicationsPrescribed}</td>
                            <td>{new Date(visit.nextVisitDate).toISOString().split('T')[0]}</td>
                            <td>{visit.doctorName}</td>
                            <td>{visit.doctorNotes}</td>
                            <td>
                                <button 
                                    className='maternity-antenatalcare-edit-btn' 
                                    onClick={() => openEditModal(index)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddVisitModal && (
                <div className="maternity-antenatalcare-modal" onClick={() => setShowAddVisitModal(false)}>
                    <div className="maternity-antenatalcare-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>Add New Visit</h4>
                        <div className='aaa' style={{ display: "flex" }}>
                            <div className='bbbb' style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                {/* Modal form fields */}
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Visit Date:</label>
                                    <input
                                        type="date"
                                        value={newVisit.visitDate}
                                        onChange={(e) => setNewVisit({ ...newVisit, visitDate: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Gestational Age (weeks):</label>
                                    <input
                                        type="number"
                                        value={newVisit.gestationalAge}
                                        onChange={(e) => setNewVisit({ ...newVisit, gestationalAge: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Weight (kg):</label>
                                    <input
                                        type="number"
                                        value={newVisit.weight}
                                        onChange={(e) => setNewVisit({ ...newVisit, weight: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Blood Pressure:</label>
                                    <input
                                        type="text"
                                        value={newVisit.bloodPressure}
                                        onChange={(e) => setNewVisit({ ...newVisit, bloodPressure: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Urine Test Result:</label>
                                    <input
                                        type="text"
                                        value={newVisit.urineTestResult}
                                        onChange={(e) => setNewVisit({ ...newVisit, urineTestResult: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Ultrasound Report:</label>
                                    <input
                                        type="text"
                                        value={newVisit.ultrasoundReport}
                                        onChange={(e) => setNewVisit({ ...newVisit, ultrasoundReport: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='bbbb' style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Baby's Weight:</label>
                                    <input
                                        type="text"
                                        value={newVisit.babyweight}
                                        onChange={(e) => setNewVisit({ ...newVisit, babyweight: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Pregnancy Risk Level:</label>
                                    <input
                                        type="text"
                                        value={newVisit.pregnancyRiskLevel}
                                        onChange={(e) => setNewVisit({ ...newVisit, pregnancyRiskLevel: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Medications Prescribed:</label>
                                    <input
                                        type="text"
                                        value={newVisit.medicationsPrescribed}
                                        onChange={(e) => setNewVisit({ ...newVisit, medicationsPrescribed: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Next Visit Date:</label>
                                    <input
                                        type="date"
                                        value={newVisit.nextVisitDate}
                                        onChange={(e) => setNewVisit({ ...newVisit, nextVisitDate: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Doctor's Name:</label>
                                    <input
                                        type="text"
                                        value={newVisit.doctorName}
                                        onChange={(e) => setNewVisit({ ...newVisit, doctorName: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Doctor's Notes:</label>
                                    <textarea
                                        value={newVisit.doctorNotes}
                                        onChange={(e) => setNewVisit({ ...newVisit, doctorNotes: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className='maternity-antenatalcare-submit-btn' onClick={handleAddVisit}>Submit</button>
                    </div>
                </div>
            )}

            {showEditVisitModal && (
                <div className="maternity-antenatalcare-modal" onClick={() => setShowEditVisitModal(false)}>
                    <div className="maternity-antenatalcare-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>Edit Visit</h4>
                        {/* Similar form structure as in Add Visit Modal */}
                        <div className='aaa' style={{ display: "flex" }}>
                            <div className='bbbb' style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                {/* Modal form fields */}
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Visit Date:</label>
                                    <input
                                        type="date"
                                        value={newVisit.visitDate}
                                        onChange={(e) => setNewVisit({ ...newVisit, visitDate: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Gestational Age (weeks):</label>
                                    <input
                                        type="number"
                                        value={newVisit.gestationalAge}
                                        onChange={(e) => setNewVisit({ ...newVisit, gestationalAge: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Weight (kg):</label>
                                    <input
                                        type="number"
                                        value={newVisit.weight}
                                        onChange={(e) => setNewVisit({ ...newVisit, weight: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Blood Pressure:</label>
                                    <input
                                        type="text"
                                        value={newVisit.bloodPressure}
                                        onChange={(e) => setNewVisit({ ...newVisit, bloodPressure: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Urine Test Result:</label>
                                    <input
                                        type="text"
                                        value={newVisit.urineTestResult}
                                        onChange={(e) => setNewVisit({ ...newVisit, urineTestResult: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Ultrasound Report:</label>
                                    <input
                                        type="text"
                                        value={newVisit.ultrasoundReport}
                                        onChange={(e) => setNewVisit({ ...newVisit, ultrasoundReport: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='bbbb' style={{ display: "flex", flexDirection: "column", width: "90%" }}>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Baby's Weight:</label>
                                    <input
                                        type="text"
                                        value={newVisit.babyweight}
                                        onChange={(e) => setNewVisit({ ...newVisit, babyweight: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Pregnancy Risk Level:</label>
                                    <input
                                        type="text"
                                        value={newVisit.pregnancyRiskLevel}
                                        onChange={(e) => setNewVisit({ ...newVisit, pregnancyRiskLevel: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Medications Prescribed:</label>
                                    <input
                                        type="text"
                                        value={newVisit.medicationsPrescribed}
                                        onChange={(e) => setNewVisit({ ...newVisit, medicationsPrescribed: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Next Visit Date:</label>
                                    <input
                                        type="date"
                                        value={newVisit.nextVisitDate}
                                        onChange={(e) => setNewVisit({ ...newVisit, nextVisitDate: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Doctor's Name:</label>
                                    <input
                                        type="text"
                                        value={newVisit.doctorName}
                                        onChange={(e) => setNewVisit({ ...newVisit, doctorName: e.target.value })}
                                    />
                                </div>
                                <div className='antenatalmaturnity-modalform'>
                                    <label>Doctor's Notes:</label>
                                    <textarea
                                        value={newVisit.doctorNotes}
                                        onChange={(e) => setNewVisit({ ...newVisit, doctorNotes: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className='maternity-antenatalcare-submit-btn' onClick={handleEditVisit}>Update</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AntenatalCare;
