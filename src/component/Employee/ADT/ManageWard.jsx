import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import './ManageWard.css';
import { API_BASE_URL } from '../../api/api';
import CustomModal from '../../CustomModel/CustomModal';

const ManageWard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add' or 'edit'
  const [selectedWard, setSelectedWard] = useState(null);

  // State variables for form fields
  const [wardName, setWardName] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [wardLocation, setWardLocation] = useState('');
  const [subStore, setSubStore] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [occupied, setOccupied] = useState(0);
  const [vacant, setVacant] = useState(0);
  const [reserved, setReserved] = useState(0);
  const [numberOfBeds, setNumberOfBeds] = useState(0);

  const [wardsData, setWardsData] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch wards data when component mounts
  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ward-department/get-all-ward`);
      const data = await response.json();
      setWardsData(data); // Update this based on the response structure
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const handleEditClick = (ward) => {
    setModalType('edit');
    setSelectedWard(ward);
    setWardName(ward.wardName);
    setWardCode(ward.wardCode);
    setWardLocation(ward.wardLocation);
    setSubStore(ward.subStore.subStoreName);
    setIsActive(ward.isActive);
    setOccupied(ward.occupied);
    setVacant(ward.vacant);
    setReserved(ward.reserved);
    setNumberOfBeds(ward.numberOfBeds);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setModalType('add');
    setSelectedWard(null);
    setWardName('');
    setWardCode('');
    setWardLocation('');
    setSubStore('');
    setIsActive(false);
    setOccupied(0);
    setVacant(0);
    setReserved(0);
    setNumberOfBeds(0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWard(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const wardData = {
      wardName,
      wardCode,
      wardLocation,
      subStore,
      isActive,
      occupied,
      vacant,
      reserved,
      numberOfBeds,
    };

    try {
      if (modalType === 'edit') {
        await fetch(`${API_BASE_URL}/ward-department/update/${selectedWard.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(wardData),
        });
        console.log('Updated Ward:', wardData);
      } else if (modalType === 'add') {
        await fetch(`${API_BASE_URL}/ward-department/add-ward-data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(wardData),
        });
        console.log('Added New Ward:', wardData);
      }
      fetchWards(); // Refresh the list after adding or updating
      handleCloseModal();
    } catch (error) {
      console.error('Error saving ward:', error);
    }
  };

  return (
    <div className="manage-add-ward-page">
      <div className="manage-add-ward-table-container">
        <div className="manage-add-ward-manage-section">
          <button className="manage-add-ward-btn" onClick={handleAddClick}>
            + Add Ward
          </button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="manage-add-ward-search-input"
        />
        <div className="manage-add-ward-results-info">
          Showing {wardsData.length} results
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  'Ward Name',
                  'Ward Code',
                  'Ward Location',
                  'Sub Store',
                  'Occupied',
                  'Vacant',
                  'Reserved',
                  'Number of Beds',
                  'Is Active',
                  'Action',
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
                        onMouseDown={startResizing(tableRef, setColumnWidths)(
                          index
                        )}
                      ></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wardsData.map((ward, index) => (
                <tr key={index}>
                  <td>{ward.wardName}</td>
                  <td>{ward.wardCode}</td>
                  <td>{ward.wardLocation}</td>
                  <td>{ward?.subStore?.subStoreName}</td>
                  <td>{ward.occupied}</td>
                  <td>{ward.vacant}</td>
                  <td>{ward.reserved}</td>
                  <td>{ward.numberOfBeds}</td>
                  <td>{ward.isActive ? 'True' : 'False'}</td>
                  <td>
                    <button
                      className="manage-add-ward-edit-btn"
                      onClick={() => handleEditClick(ward)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomModal isOpen={showModal} onClose={handleCloseModal}>
      <div className="manage-add-employee-role">
  <div className="manage-modal-dialog">
    <div className="manage-modal-modal-header">
      <div className="manage-modal-modal-title">
        {modalType === 'edit' ? 'Update Ward Department' : 'Add New Ward'}
      </div>
    </div>
    <div className="manage-modal-modal-body">
      <form onSubmit={handleSubmit}>
        <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Ward Name <span className="manage-modal-text-danger">*</span>:
          </label>
          <input
            type="text"
            value={wardName}
            onChange={(e) => setWardName(e.target.value)}
            placeholder="Ward Name"
            required
            className="manage-modal-form-control"
          />
        </div>

        <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Ward Code:
          </label>
          <input
            type="text"
            value={wardCode}
            onChange={(e) => setWardCode(e.target.value)}
            placeholder="Ward Code"
            className="manage-modal-form-control"
          />
        </div>

        <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Ward Location:
          </label>
          <input
            type="text"
            value={wardLocation}
            onChange={(e) => setWardLocation(e.target.value)}
            placeholder="Ward Location"
            className="manage-modal-form-control"
          />
        </div>

        <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Sub Store:
          </label>
          <input
            type="text"
            value={subStore}
            onChange={(e) => setSubStore(e.target.value)}
            placeholder="Sub Store"
            className="manage-modal-form-control"
          />
        </div>

        {/* <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Occupied:
          </label>
          <input
            type="number"
            value={occupied}
            onChange={(e) => setOccupied(parseInt(e.target.value))}
            placeholder="Occupied"
            className="manage-modal-form-control"
          />
        </div>

        <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Vacant:
          </label>
          <input
            type="number"
            value={vacant}
            onChange={(e) => setVacant(parseInt(e.target.value))}
            placeholder="Vacant"
            className="manage-modal-form-control"
          />
        </div>

        <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Reserved:
          </label>
          <input
            type="number"
            value={reserved}
            onChange={(e) => setReserved(parseInt(e.target.value))}
            placeholder="Reserved"
            className="manage-modal-form-control"
          />
        </div>

        <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Number of Beds:
          </label>
          <input
            type="number"
            value={numberOfBeds}
            onChange={(e) => setNumberOfBeds(parseInt(e.target.value))}
            placeholder="Number of Beds"
            className="manage-modal-form-control"
          />
        </div> */}

        <div className="manage-modal-form-group">
          <label className="manage-modal-form-label">
            Is Active:
          </label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="manage-modal-form-check"
          />
        </div>

        <div className="manage-modal-modal-footer">
          <button type="submit" className="manage-add-modal-employee-role-btn">
            {modalType === 'edit' ? 'Update Ward' : 'Add Ward'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
      </CustomModal>
    </div>
  );
};

export default ManageWard;
