import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import './Modal.css';
import "./bSDAddNewBloodNew.css"
import { API_BASE_URL } from '../../api/api';

const BSDAddNewBloodNew = ({ onClose, refreshData }) => {
    const [test_id, settest_id] = useState('');
    const [storagedate, setstoragedate] = useState(null);
    const [bloodgroup, setbloodgroup] = useState('');
    const [volume, setvolume] = useState('');
    const [expirydate, setexpirydate] = useState(null);
    const [storagelocation, setstoragelocation] = useState('');
    const [status, setStatus] = useState('');

    const handleSave = async () => {
        const data = {
            bloodTestingDTO: {
                testId: 1

            },
            storagedate: storagedate ? storagedate.toISOString() : null,
            bloodgroup,
            volume,
            expirydate: expirydate ? expirydate.toISOString() : null,
            storagelocation,
            status,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/bloodstorage/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            const result = await response.json();
            console.log('Data saved successfully:', result);
            refreshData(); // Call refreshData to update the main component
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error saving data: ' + error.message);
        }
    };

    return (
        <div className="modal-modal-background">
            <div className="modal-modal-container">
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>
                <h3>Add/Edit Blood Storage Entry</h3>

                <div className="modal-form-group">
                    <label>Test ID:</label>
                    <input
                        type="text"
                        value={test_id}
                        onChange={(e) => settest_id(e.target.value)}
                        placeholder="Enter Test ID"
                    />
                </div>

                <div className="modal-form-group">
                    <label>Storage Date:</label>
                    <DatePicker
                        selected={storagedate}
                        onChange={(date) => setstoragedate(date)}
                        placeholderText="Select Storage Date"
                    />
                </div>

                <div className="modal-form-group">
                    <label>Blood Group:</label>
                    <select value={bloodgroup} onChange={(e) => setbloodgroup(e.target.value)}>
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>

                <div className="modal-form-group">
                    <label>Volume (ml):</label>
                    <input
                        type="number"
                        value={volume}
                        onChange={(e) => setvolume(e.target.value)}
                        placeholder="Enter volume in ml"
                    />
                </div>

                <div className="modal-form-group">
                    <label>Expiry Date:</label>
                    <DatePicker
                        selected={expirydate}
                        onChange={(date) => setexpirydate(date)}
                        placeholderText="Select Expiry Date"
                    />
                </div>

                <div className="modal-form-group">
                    <label>Storage Location:</label>
                    <input
                        type="text"
                        value={storagelocation}
                        onChange={(e) => setstoragelocation(e.target.value)}
                        placeholder="Enter Storage Location"
                    />
                </div>

                <div className="modal-form-group">
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="Stored">Stored</option>
                        <option value="Discarded">Discarded</option>
                    </select>
                </div>

                <div className="modal-modal-actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default BSDAddNewBloodNew;
