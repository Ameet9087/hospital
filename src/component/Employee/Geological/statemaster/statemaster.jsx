import React, { useState, useRef } from 'react';
import CustomModal from '../../../../CustomModel/CustomModal';
import { startResizing } from '../../../TableHeadingResizing/resizableColumns';
import "./statemaster.css";

function StateMaster() {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [states, setStates] = useState([]);
    const [stateData, setStateData] = useState({
        stateId: '',
        stateName: '',
        country: '', // This would be populated with countries
    });

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateData({ ...stateData, [name]: value });
    };

    const handleAddState = () => {
        setStates([
            ...states,
            { ...stateData, stateId: states.length + 1 },
        ]);
        setStateData({ stateId: '', stateName: '', country: '' });
        handleClose();
    };

    return (
        <div className="statemaster-container">
            <h1 className="statemaster-title">State Master</h1>
            <button className="statemaster-add-btn" onClick={handleShow}>
                Add State
            </button>

            {/* State Table */}
            <div className="statemaster-table-container">
                <table className="statemaster-table" ref={tableRef}>
                    <thead>
                        <tr>
                            {['State ID', 'State Name', 'Country'].map((header, index) => (
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
                        {states.map((state, index) => (
                            <tr key={index}>
                                <td>{state.stateId}</td>
                                <td>{state.stateName}</td>
                                <td>{state.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add State Custom Modal */}
            <CustomModal isOpen={showModal} onClose={handleClose}>
                <h3>Add State</h3>
                <div className="statemaster-input-container">
                    <label>State Name</label>
                    <input
                        type="text"
                        placeholder="Enter state name"
                        name="stateName"
                        value={stateData.stateName}
                        onChange={handleChange}
                    />
                </div>
                <div className="statemaster-input-container">
                    <label>Country</label>
                    <input
                        type="text"
                        placeholder="Enter country"
                        name="country"
                        value={stateData.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="statemaster-modal-footer">
                    <button className="statemaster-close" onClick={handleClose}>Close</button>
                    <button className="statemaster-save" onClick={handleAddState}>Save Changes</button>
                </div>
            </CustomModal>
        </div>
    );
}

export default StateMaster;
