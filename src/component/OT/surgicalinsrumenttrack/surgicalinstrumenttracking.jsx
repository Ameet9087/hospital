import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './SurgicalInstrumentTracking.css'; 
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';

const SurgicalInstrumentTracking = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    
    const [instruments, setInstruments] = useState([]);
    const [newInstrument, setNewInstrument] = useState({
        instrumentId: '',
        instrumentName: '',
        availableQuantity: '',
        conditionStatus: ''
    });
    const [showAddInstrumentModal, setShowAddInstrumentModal] = useState(false);
    
    const { success, warning, error, CustomAlerts } = useCustomAlert(); // Use custom alert

    const [searchTerm, setSearchTerm] = useState('');

    // Fetch instrument data when component mounts
    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const response = await axios.get('http://localhost:8051/api/instruments');
                setInstruments(response.data);
            } catch (err) {
                error('Error fetching instrument data');
            }
        };

        fetchInstruments();
    }, []);

    const handleAddInstrument = async () => {
        try {
            if (newInstrument.instrumentId) {
                const response = await axios.put(`http://localhost:8051/api/instruments/${newInstrument.instrumentId}`, newInstrument);
                setInstruments(instruments.map(instrument => 
                    (instrument.instrumentId === newInstrument.instrumentId ? response.data : instrument)
                ));
                success('Instrument updated successfully!');
            } else {
                const response = await axios.post('http://localhost:8051/api/instruments', newInstrument);
                setInstruments([...instruments, response.data]);
                success('Instrument added successfully!');
            }
            setNewInstrument({ instrumentId: '', instrumentName: '', availableQuantity: '', conditionStatus: '' });
            setShowAddInstrumentModal(false);
        } catch (err) {
            error('Error saving instrument');
        }
    };

    const handleEditInstrument = (instrument) => {
        setNewInstrument({
            instrumentId: instrument.instrumentId,
            instrumentName: instrument.instrumentName,
            availableQuantity: instrument.availableQuantity,
            conditionStatus: instrument.conditionStatus,
        });
        setShowAddInstrumentModal(true);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // Add search logic if necessary
    };

    const handlePrint = () => {
        window.print();  // Trigger the print dialog
    };

    return (
        <div className="surgical-instrument-tracking">
            <div className="surgical-isntu-track-filter">
                <div className="surgical-isntu-track-filter-date-utlt">
                    <div className="surgical-isntu-track-filter-date-range">
                        <label>From: </label>
                        <input type="date" className="surgical-isntu-track-filter-input" />
                        <label>To: </label>
                        <input type="date" className="surgical-isntu-track-filter-input" />
                    </div>
                </div>

               
            </div>
            <div className='surgical-isntu-track-filter-search'>
                    <input
                        type="text"
                        placeholder="Search by InstrumentName/InstrumentId"
                        className="surgical-isntu-track-filter-search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button
                        className="surgical-isntu-track-filter-search-btn"
                    onClick={handlePrint}>
                        Print
                    </button>
                </div>

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
                        <h2 className='surgicaltrack-modal-content-h2'>{newInstrument.instrumentId ? 'Edit Instrument' : 'Add New Instrument'}</h2>
                        <div className='instrumenttrack-form'>
                        <label>Instrument Name:</label>
                        <input
                            type="text"
                            value={newInstrument.instrumentName}
                            onChange={(e) => setNewInstrument({ ...newInstrument, instrumentName: e.target.value })}
                        />
                        </div>
                        <div className='instrumenttrack-form'>
                        <label>Available Quantity:</label>
                        <input
                            type="number"
                            value={newInstrument.availableQuantity}
                            onChange={(e) => setNewInstrument({ ...newInstrument, availableQuantity: e.target.value })}
                        />
                        </div>
                        <div className='instrumenttrack-form'>
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
                        </div>
                        <div>
                            <button className='surgicalinstrumenttrackingedit-btn' onClick={handleAddInstrument}>Save</button>
                            <button className='surgicalinstrumenttrackingedit-btn' onClick={() => setShowAddInstrumentModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <CustomAlerts /> {/* Custom Alert Section */}
        </div>
    );
};

export default SurgicalInstrumentTracking;
