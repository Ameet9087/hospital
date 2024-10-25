import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './OTResourceManagement.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';


const OTResourceManagement = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [OTs, setOTs] = useState([]);
    const [newOT, setNewOT] = useState({
        OTID: '', OTName: '', AvailabilityStatus: '', EquipmentAvailable: '', Capacity: ''
    });
    const [showAddOTModal, setShowAddOTModal] = useState(false);

    // Fetch OT data when component mounts
    useEffect(() => {
        axios.get('http://localhost:8051/api/ot-resources')
            .then(response => {
                console.log(response.data);
                setOTs(response.data); // Set the OTs state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching OT data:', error);
            });
    }, []);

    const handleAddOT = () => {
        if (newOT.OTID) { // Check if we are editing an existing OT
            // PUT request to update existing OT
            axios.put(`http://localhost:8051/api/ot-resources/${newOT.OTID}`, {
                otName: newOT.OTName,
                availabilityStatus: newOT.AvailabilityStatus,
                equipmentAvailable: newOT.EquipmentAvailable,
                capacity: newOT.Capacity,
            })
            .then(response => {
                // Update local state
                setOTs(OTs.map(ot => (ot.otId === newOT.OTID ? response.data : ot)));
                setNewOT({ OTID: '', OTName: '', AvailabilityStatus: '', EquipmentAvailable: '', Capacity: '' });
                setShowAddOTModal(false);
            })
            .catch(error => {
                console.error('Error updating OT:', error);
            });
        } else { // Add a new OT
            // POST request to create a new OT
            axios.post('http://localhost:8051/api/ot-resources', {
                otName: newOT.OTName,
                availabilityStatus: newOT.AvailabilityStatus,
                equipmentAvailable: newOT.EquipmentAvailable,
                capacity: newOT.Capacity,
            })
            .then(response => {
                // Update local state with the new OT
                setOTs([...OTs, response.data]); // Assuming the server returns the created OT
                setNewOT({ OTID: '', OTName: '', AvailabilityStatus: '', EquipmentAvailable: '', Capacity: '' });
                setShowAddOTModal(false);
            })
            .catch(error => {
                console.error('Error adding new OT:', error);
            });
        }
    };

    const handleEditOT = (ot) => {
        setNewOT({
            OTID: ot.otId,
            OTName: ot.otName,
            AvailabilityStatus: ot.availabilityStatus,
            EquipmentAvailable: ot.equipmentAvailable,
            Capacity: ot.capacity,
        });
        setShowAddOTModal(true); // Show the modal
    };

    return (
        <div className="ot-resource-management">
            <button className='otresourcemgntbtn' onClick={() => setShowAddOTModal(true)}>Add OT</button>

            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "OTID",
                            "OT Name",
                            "Availability Status",
                            "Equipment Available",
                            "Capacity",
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
                    {OTs.map((ot, index) => (
                        <tr key={index}>
                            <td>{ot.otId}</td>
                            <td>{ot.otName}</td>
                            <td>{ot.availabilityStatus}</td>
                            <td>{ot.equipmentAvailable}</td>
                            <td>{ot.capacity}</td>
                            <td>
                                <button className='otresourcemgntedit-btn' onClick={() => handleEditOT(ot)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddOTModal && (
                <div className="otresource-modal" onClick={() => setShowAddOTModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{newOT.OTID ? 'Edit OT' : 'Add New OT'}</h2>
                        <label>OT Name:</label>
                        <input
                            type="text"
                            value={newOT.OTName}
                            onChange={(e) => setNewOT({ ...newOT, OTName: e.target.value })}
                        />
                        <label>Availability Status:</label>
                        <select
                            value={newOT.AvailabilityStatus}
                            onChange={(e) => setNewOT({ ...newOT, AvailabilityStatus: e.target.value })}
                        >
                            <option value="">Select</option>
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                        </select>
                        <label>Equipment Available:</label>
                        <input
                            type="text"
                            value={newOT.EquipmentAvailable}
                            onChange={(e) => setNewOT({ ...newOT, EquipmentAvailable: e.target.value })}
                        />
                        <label>Capacity:</label>
                        <input
                            type="number"
                            value={newOT.Capacity}
                            onChange={(e) => setNewOT({ ...newOT, Capacity: e.target.value })}
                        />
                        <div className='otresource-btn'>
                        <button onClick={handleAddOT}>Save</button>
                        <button onClick={() => setShowAddOTModal(false)}>Cancel</button>
                         </div>   
                    </div>
                </div>
            )}
        </div>
    );
};

export default OTResourceManagement;
