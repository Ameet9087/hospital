import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import "./bloodStorageDashboard.css"
import CustomModal from '../../../CustomModel/CustomModal';
import BSDAddNewBloodNew from './bSDAddNewBloodNew';
import { API_BASE_URL } from '../../api/api';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
const BloodStorageDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [storageData, setStorageData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    // Fetch the data from the API
    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/bloodstorage/getall`);
            const data = await response.json();
            setStorageData(data);
            setFilteredData(data); // Initially set filteredData to all fetched data
        } catch (error) {
            console.error('Error fetching blood storage data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter the data whenever searchTerm changes
    useEffect(() => {
        const filtered = storageData.filter((item) => {
            const storageId = item.storage_id?.toString() || '';
            const testId = item.bloodTestingDTO?.testId?.toString() || '';
            return (
                searchTerm === '' ||
                storageId.includes(searchTerm) ||
                testId.includes(searchTerm)
            );
        });
        setFilteredData(filtered);
    }, [searchTerm, storageData]);

    // Handle delete functionality
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bloodstorage/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting the record');
            }

            const updatedData = storageData.filter((item) => item.storage_id !== id);
            setStorageData(updatedData);
            setFilteredData(updatedData);
            alert(`Storage ID: ${id} has been deleted.`);
        } catch (error) {
            console.error('Error deleting storage:', error);
            alert('There was an error deleting the record.');
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const refreshData = async () => {
        await fetchData();
        handleCloseModal();
    };

    return (
        <div className="bloodStorage-dashboard-container-box">
            <span className='bloodStorage-dashboard-container-heading'><i className="fa-solid fa-star-of-life"></i>Blood Storage Dashboard</span>
            <div className="bloodStorage-dashboard-actions">
                <button onClick={handleOpenModal}>Add New Blood Unit</button>
            </div>


            <div className='bloodStorage-search-bar-input-btn'>
                <input
                    type="text"
                    placeholder="Search by Storage ID or Test ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>



            <table ref={tableRef}>
                <thead>
                    <tr >
                        {[
                            "Storage ID",
                            "Test ID",
                            "Blood Group",
                            "Volume",
                            "Storage Date",
                            "Expiry Date",
                            "Storage Location",
                            "Status"
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
                    {filteredData.map((item) => (
                        <tr key={item.storage_id}>
                            <td>{item.storage_id}</td>
                            <td>{item?.bloodTestingDTO?.testId}</td>
                            <td>{item.bloodgroup}</td>
                            <td>{item.volume} ml</td>
                            <td>{item.storagedate}</td>
                            <td>{item.expirydate}</td>
                            <td>{item.storagelocation}</td>
                            <td>{item.status}</td>
                            {/* <td>
                                <button onClick={() => handleDelete(item.storage_id)}>Delete</button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <CustomModal isOpen={showModal} onClose={handleCloseModal}>
                <BSDAddNewBloodNew onClose={handleCloseModal} refreshData={refreshData} />
            </CustomModal>
        </div>
    );
};

export default BloodStorageDashboard;
