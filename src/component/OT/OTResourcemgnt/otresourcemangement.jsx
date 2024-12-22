import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './OTResourceManagement.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
import useCustomAlert from '../../../alerts/useCustomAlert';  // Import useCustomAlert

const OTResourceManagement = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [OTs, setOTs] = useState([]);
    const [newOT, setNewOT] = useState({
        OTID: '', OTName: '', AvailabilityStatus: '', EquipmentAvailable: '', Capacity: ''
    });
    const [openStickerPopup, setOpenStickerPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Custom alert hook
    const { success, error, CustomAlerts } = useCustomAlert();

    useEffect(() => {
        axios.get('http://localhost:8051/api/ot-resources')
            .then(response => {
                console.log(response.data);
                setOTs(response.data); 
            })
            .catch(err => {
                error('Error fetching OT data');
                console.error('Error fetching OT data:', err);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const printList = () => {
        window.print();
    };

    const handleAddOT = () => {
        if (newOT.OTID) { 
            axios.put(`http://localhost:8051/api/ot-resources/${newOT.OTID}`, {
                otName: newOT.OTName,
                availabilityStatus: newOT.AvailabilityStatus,
                equipmentAvailable: newOT.EquipmentAvailable,
                capacity: newOT.Capacity,
            })
            .then(response => {
                setOTs(OTs.map(ot => (ot.otId === newOT.OTID ? response.data : ot)));
                setNewOT({ OTID: '', OTName: '', AvailabilityStatus: '', EquipmentAvailable: '', Capacity: '' });
                setOpenStickerPopup(false);
                success('OT updated successfully!'); // Trigger success alert
            })
            .catch(err => {
                error('Error updating OT'); // Trigger error alert
                console.error('Error updating OT:', err);
            });
        } else { 
            axios.post('http://localhost:8051/api/ot-resources', {
                otName: newOT.OTName,
                availabilityStatus: newOT.AvailabilityStatus,
                equipmentAvailable: newOT.EquipmentAvailable,
                capacity: newOT.Capacity,
            })
            .then(response => {
                setOTs([...OTs, response.data]); 
                setNewOT({ OTID: '', OTName: '', AvailabilityStatus: '', EquipmentAvailable: '', Capacity: '' });
                setOpenStickerPopup(false);
                success('New OT added successfully!'); // Trigger success alert
            })
            .catch(err => {
                error('Error adding new OT'); // Trigger error alert
                console.error('Error adding new OT:', err);
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
        setOpenStickerPopup(true); 
    };

    return (
        <div className="">
            <div className="otresoucefilter">
                <div className="otresource-date-utlt">
                    <div className="ot-resorcefilter-patient">
                        <div className="date-range">
                            <label>From: </label>
                            <input className="ot-otresource-input" type="date" value="2024-08-05" />
                            <label> To: </label>
                            <input className="ot-otresource-input" type="date" value="2024-08-12" />
                        </div>
                    </div>
                </div>

                <div className='ot-resource-patient-search'>
                    <input
                        type="text"
                        placeholder="Search by PatientName/PatientId"
                        className="otsearch-otresource-search-input "
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button
                        onClick={printList}
                        className="otsearch-otresource-container-button"
                    >
                        Print
                    </button>
                </div>
            </div>

            <button className='otresourcemgntbtn' onClick={() => setOpenStickerPopup(true)}>Add OT</button>
            <CustomModal/>

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
                                        onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
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

            {openStickerPopup && (
                <div className="otresource-modal" onClick={() => setOpenStickerPopup(false)}>
                    <div className="ot-resource-modal-content" onClick={(e) => e.stopPropagation()}>
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
                            <button onClick={() => setOpenStickerPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Render the CustomAlerts component */}
            <CustomAlerts />
        </div>
    );
};

export default OTResourceManagement;
