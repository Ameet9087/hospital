import React, { useState, useRef } from 'react';
import CustomModal from '../../../../CustomModel/CustomModal';
import { startResizing } from '../../../TableHeadingResizing/resizableColumns';
import "./citymaster.css";

function CityMaster() {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [showModal, setShowModal] = useState(false);
    const [cities, setCities] = useState([]);
    const [cityData, setCityData] = useState({
        cityId: '',
        cityName: '',
        pinCode: '',
        stateName: '', // Added state name
    });

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCityData({ ...cityData, [name]: value });
    };

    const handleAddCity = () => {
        setCities([
            ...cities,
            { ...cityData, cityId: cities.length + 1 },
        ]);
        setCityData({ cityId: '', cityName: '', pinCode: '', stateName: '' });
        handleClose();
    };

    return (
        <div className="citymaster-container">
            <h1 className="citymaster-title">City Master</h1>
            <button className="citymaster-add-btn" onClick={handleShow}>
                Add City
            </button>

            {/* City Table */}
            <div className="citymaster-table-container">
                <table className="citymaster-table" ref={tableRef}>
                    <thead>
                        <tr>
                            {['City ID', 'City Name', 'State Name', 'Pin Code'].map((header, index) => (
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
                        {cities.map((city, index) => (
                            <tr key={index}>
                                <td>{city.cityId}</td>
                                <td>{city.cityName}</td>
                                <td>{city.stateName}</td> {/* Displaying the State Name */}
                                <td>{city.pinCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

           
            <CustomModal isOpen={showModal} onClose={handleClose}>
                <h3>Add City</h3>
                <div className="citymaster-input-container">
                    <label>City Name</label>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        name="cityName"
                        value={cityData.cityName}
                        onChange={handleChange}
                    />
                </div>
                <div className="citymaster-input-container">
                    <label>State Name</label>
                    <input
                        type="text"
                        placeholder="Enter state name"
                        name="stateName"
                        value={cityData.stateName}
                        onChange={handleChange}
                    />
                </div>
                <div className="citymaster-input-container">
                    <label>Pin Code</label>
                    <input
                        type="text"
                        placeholder="Enter pin code"
                        name="pinCode"
                        value={cityData.pinCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="citymaster-modal-footer">
                    <button className="citymaster-close" onClick={handleClose}>Close</button>
                    <button className="citymaster-save" onClick={handleAddCity}>Save Changes</button>
                </div>
            </CustomModal>
        </div>
    );
}

export default CityMaster;
