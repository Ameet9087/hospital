import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './LabourStaffManagement.css'; 
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
const LabourStaffManagement = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    
    const [staffList, setStaffList] = useState([]);
    const [newStaff, setNewStaff] = useState({
        staffId: '', // Corrected to staffId
        shiftStartTime: '',
        shiftEndTime: '',
        assignedRole: '',
        responsibilitiesDescription: '',
        emergencyResponseTeam: false
    });

    const [showAddStaffModal, setShowAddStaffModal] = useState(false);

    // Fetch staff data from API when the component mounts
    useEffect(() => {
        const fetchStaffList = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/labor-staff-management`); // Replace with your actual API endpoint
                setStaffList(response.data);
            } catch (error) {
                console.error('Error fetching staff list:', error);
            }
        };

        fetchStaffList();
    }, []); // Empty dependency array ensures this runs once on mount

    const handleAddStaff = async () => {
        try {
            if (newStaff.staffId) {
                // Update existing staff
                await axios.put(`${API_BASE_URL}/labor-staff-management/${newStaff.staffId}`, newStaff);
                setStaffList(staffList.map(staff => (staff.staffId === newStaff.staffId ? newStaff : staff)));
            } else {
                // Add new staff
                const response = await axios.post(`${API_BASE_URL}/labor-staff-management`, newStaff);
                setStaffList([...staffList, response.data]);
            }
            // Reset newStaff state
            setNewStaff({
                staffId: '', // Corrected to staffId
                shiftStartTime: '',
                shiftEndTime: '',
                assignedRole: '',
                responsibilitiesDescription: '',
                emergencyResponseTeam: false
            });
            setShowAddStaffModal(false);
        } catch (error) {
            console.error('Error adding/updating staff:', error);
        }
    };

    const handleEditStaff = (staff) => {
        setNewStaff({
            staffId: staff.staffId, // Corrected to staffId
            shiftStartTime: staff.shiftStartTime,
            shiftEndTime: staff.shiftEndTime,
            assignedRole: staff.assignedRole,
            responsibilitiesDescription: staff.responsibilitiesDescription,
            emergencyResponseTeam: staff.emergencyResponseTeam,
        });
        setShowAddStaffModal(true); 
    };

    return (
        <div className="labour-staffmgnt">
            <button className='labour-staffmgnt-btn' onClick={() => setShowAddStaffModal(true)}>Add Staff</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Staff ID",
                            "Shift Start Time",
                            "Shift End Time",
                            "Assigned Role",
                            "Responsibilities",
                            "Emergency Response",
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
                                        onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                    ></div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {staffList.map((staff, index) => (
                        <tr key={index}>
                            <td>{staff.staffId}</td> {/* Corrected to staffId */}
                            <td>{staff.shiftStartTime}</td>
                            <td>{staff.shiftEndTime}</td>
                            <td>{staff.assignedRole}</td>
                            <td>{staff.responsibilitiesDescription}</td>
                            <td>{staff.emergencyResponseTeam ? 'Yes' : 'No'}</td>
                            <td>
                                <button className='labour-staffmgnt-edit-btn' onClick={() => handleEditStaff(staff)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddStaffModal && (
                <div className="labour-staffmgnt-modal" onClick={() => setShowAddStaffModal(false)}>
                    <div className="labour-staffmgnt-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>{newStaff.staffId ? 'Edit Staff' : 'Add New Staff'}</h4>
                        <div className='labour-staffmgnt-modalform'>
                            <label>Shift Start Time:</label>
                            <input
                                type="time"
                                value={newStaff.shiftStartTime}
                                onChange={(e) => setNewStaff({ ...newStaff, shiftStartTime: e.target.value })}
                            />
                        </div>
                        <div className='labour-staffmgnt-modalform'>
                            <label>Shift End Time:</label>
                            <input
                                type="time"
                                value={newStaff.shiftEndTime}
                                onChange={(e) => setNewStaff({ ...newStaff, shiftEndTime: e.target.value })}
                            />
                        </div>
                        <div className='labour-staffmgnt-modalform'>
                            <label>Assigned Role:</label>
                            <input
                                type="text"
                                value={newStaff.assignedRole}
                                onChange={(e) => setNewStaff({ ...newStaff, assignedRole: e.target.value })}
                            />
                        </div>
                        <div className='labour-staffmgnt-modalform'>
                            <label>Responsibilities:</label>
                            <textarea
                                value={newStaff.responsibilitiesDescription}
                                onChange={(e) => setNewStaff({ ...newStaff, responsibilitiesDescription: e.target.value })}
                            />
                        </div>
                        <div className='labour-staffmgnt-modalform'>
                            <label>Emergency Response Team:</label>
                            <input
                                type="checkbox"
                                checked={newStaff.emergencyResponseTeam}
                                onChange={(e) => setNewStaff({ ...newStaff, emergencyResponseTeam: e.target.checked })}
                            />
                        </div>
                        <button onClick={handleAddStaff}>Save</button>
                        <button onClick={() => setShowAddStaffModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabourStaffManagement;
