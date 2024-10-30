import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './SurgicalInstrumentTracking.css'; 
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';


const SurgicalInstrumentTracking = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    
    const [instruments, setInstruments] = useState([]);
    const [newInstrument, setNewInstrument] = useState({
        instrumentId: '', // Changed to instrumentId
        instrumentName: '',
        availableQuantity: '',
        conditionStatus: ''
    });
    const [showAddInstrumentModal, setShowAddInstrumentModal] = useState(false);

    // Fetch instrument data when component mounts
    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const response = await axios.get('http://localhost:8051/api/instruments'); // Update this URL as needed
                setInstruments(response.data);
                console.log(response.data); // Set the instruments state with the fetched data
            } catch (error) {
                console.error('Error fetching instrument data:', error);
            }
        };

        fetchInstruments(); // Call the fetch function
    }, []);

    const handleAddInstrument = async () => {
        try {
            if (newInstrument.instrumentId) { // Check if we are editing an existing instrument
                // Update the existing instrument via PUT request
                const response = await axios.put(`http://localhost:8051/api/instruments/${newInstrument.instrumentId}`, newInstrument);
                setInstruments(instruments.map(instrument => 
                    (instrument.instrumentId === newInstrument.instrumentId ? response.data : instrument)
                ));
            } else { // Add a new instrument via POST request
                const response = await axios.post('http://localhost:8051/api/instruments', newInstrument);
                setInstruments([...instruments, response.data]);
            }

            // Reset the newInstrument state and close the modal
            setNewInstrument({ instrumentId: '', instrumentName: '', availableQuantity: '', conditionStatus: '' });
            setShowAddInstrumentModal(false);
        } catch (error) {
            console.error('Error saving instrument:', error);
        }
    };

    const handleEditInstrument = (instrument) => {
        setNewInstrument({
            instrumentId: instrument.instrumentId,
            instrumentName: instrument.instrumentName,
            availableQuantity: instrument.availableQuantity,
            conditionStatus: instrument.conditionStatus,
        });
        setShowAddInstrumentModal(true); // Show the modal
    };

    return (
        <div className="surgical-instrument-tracking">
            <button className='surgicalinstrumenttrackingbtn' onClick={() => setShowAddInstrumentModal(true)}>Add Instrument</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                    {["Instrument ID", "Instrument Name", "Available Quantity", "Condition Status", "Actions"].map((header, index) => (
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
                    {instruments.map((instrument, index) => (
                        <tr key={index}>
                            <td>{instrument.instrumentId}</td>
                            <td>{instrument.instrumentName}</td>
                            <td>{instrument.availableQuantity}</td>
                            <td>{instrument.conditionStatus}</td>
                            <td>
                                <button className='surgicalinstrumenttrackingedit-btn' onClick={() => handleEditInstrument(instrument)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddInstrumentModal && (
                <div className="surgicaltrack-modal" onClick={() => setShowAddInstrumentModal(false)}>
                    <div className="surgicaltrack-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className='.surgicaltrack-modal-content-h2'>{newInstrument.instrumentId ? 'Edit Instrument' : 'Add New Instrument'}</h2>
                        <label >Instrument Name:</label>
                        <input
                            type="text"
                            value={newInstrument.instrumentName}
                            onChange={(e) => setNewInstrument({ ...newInstrument, instrumentName: e.target.value })}
                        />
                        <label>Available Quantity:</label>
                        <input
                            type="number"
                            value={newInstrument.availableQuantity}
                            onChange={(e) => setNewInstrument({ ...newInstrument, availableQuantity: e.target.value })}
                        />
                        <label>Condition Status:</label>
                        <select 
                            value={newInstrument.conditionStatus}
                            onChange={(e) => setNewInstrument({ ...newInstrument, conditionStatus: e.target.value })}
                        >
                            <option value="">Select</option>
                            <option value="Good">Good</option>
                            <option value="Needs Repair">Needs Repair</option>
                            <option value="Out of Service">Out of Service</option>
                        </select>
                        <div>
                            <button className='surgicalinstrumenttrackingedit-btn' onClick={handleAddInstrument}>Save</button>
                            <button className='surgicalinstrumenttrackingedit-btn' onClick={() => setShowAddInstrumentModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SurgicalInstrumentTracking;
