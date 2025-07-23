import React, { useState, useRef, useEffect } from 'react';
import './PostnatalCare.css'; 
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import axios from 'axios';

const PostnatalCareManagement = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    
    const [visits, setVisits] = useState([]);
    const [newVisit, setNewVisit] = useState({
        visitID: '', visitDate: '', motherCondition: '', babyCondition: '', doctorNotes: ''
    });

    const [showAddVisitModal, setShowAddVisitModal] = useState(false);

    // Fetch visits on component mount
    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/postnatal-care`); 
                console.log(response.data); // Replace with your actual API endpoint
                setVisits(response.data); // Assuming the API returns an array of visits
            } catch (error) {
                console.error('Error fetching visits:', error);
            }
        };

        fetchVisits();
    }, []);

    const handleAddVisit = async () => {
        if (newVisit.visitID) { 
            // If the visit ID exists, we are editing an existing visit, so we use PUT
            try {
                const response = await axios.put(`${API_BASE_URL}/postnatal-care/${newVisit.visitID}`, newVisit);
                console.log('Updated visit:', response.data);
                setVisits(visits.map(visit => (visit.pncId === newVisit.visitID ? response.data : visit)));
            } catch (error) {
                console.error('Error updating visit:', error);
            }
        } else { 
            // Otherwise, we assume it's a new visit
            try {
                const newVisit1={
                    ...newVisit,
                    patientId:101,
                }
                const response = await axios.post(`${API_BASE_URL}/postnatal-care`, newVisit1);
                console.log('New visit added:', response.data);
                setVisits([...visits, response.data]);
            } catch (error) {
                console.error('Error adding new visit:', error);
            }
        }
        setNewVisit({ visitID: '', visitDate: '', motherCondition: '', babyCondition: '', doctorNotes: '' });
        setShowAddVisitModal(false);
    };

    const handleEditVisit = (visit) => {
        setNewVisit({
            visitID: visit.pncId,
            visitDate: visit.visitDate,
            motherCondition: visit.motherCondition,
            babyCondition: visit.babyCondition,
            doctorNotes: visit.doctorNotes,
            patientId:101
        });
        setShowAddVisitModal(true); 
    };

    return (
        <div className="postnatalcare-management">
            <button className='postnatalcare-btn' onClick={() => setShowAddVisitModal(true)}>Add Visit</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Visit ID",
                            "Visit Date",
                            "Mother's Condition",
                            "Baby's Condition",
                            "Doctor's Notes",
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
                            <td>{visit.pncId}</td>
                            <td>{visit.visitDate}</td>
                            <td>{visit.motherCondition}</td>
                            <td>{visit.babyCondition}</td>
                            <td>{visit.doctorNotes}</td>
                            <td>
                                <button className='postnatalcare-edit-btn' onClick={() => handleEditVisit(visit)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddVisitModal && (
                <div className="postnatalcare-modal" onClick={() => setShowAddVisitModal(false)}>
                    <div className="postnatalcare-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>{newVisit.visitID ? 'Edit Visit' : 'Add New Visit'}</h4>
                        <div className='postnatalcare-modalform'>
                            <label>Visit Date:</label>
                            <input
                                type="date"
                                value={newVisit.visitDate}
                                onChange={(e) => setNewVisit({ ...newVisit, visitDate: e.target.value })}
                            />
                        </div>
                        <div className='postnatalcare-modalform'>
                            <label>Mother's Condition:</label>
                            <input
                                type="text"
                                value={newVisit.motherCondition}
                                onChange={(e) => setNewVisit({ ...newVisit, motherCondition: e.target.value })}
                            />
                        </div>
                        <div className='postnatalcare-modalform'>
                            <label>Baby's Condition:</label>
                            <input
                                type="text"
                                value={newVisit.babyCondition}
                                onChange={(e) => setNewVisit({ ...newVisit, babyCondition: e.target.value })}
                            />
                        </div>
                        <div className='postnatalcare-modalform'>
                            <label>Doctor's Notes:</label>
                            <textarea
                                value={newVisit.doctorNotes}
                                onChange={(e) => setNewVisit({ ...newVisit, doctorNotes: e.target.value })}
                            />
                        </div>
                        <button onClick={handleAddVisit}>Save</button>
                        <button onClick={() => setShowAddVisitModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostnatalCareManagement;
