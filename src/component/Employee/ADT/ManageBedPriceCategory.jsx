import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const ManageBedPriceCategory = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Sample data
  const data = [
    { bedFeature: 'Male Ward', scheme: 'NHIF CAPITATION', priceCategory: 'NHIF CAPITATION', isActive: true },
    { bedFeature: 'Electronic', scheme: 'General', priceCategory: 'MTIBA', isActive: true },
    { bedFeature: 'Electronic', scheme: 'Astra', priceCategory: 'MTIBA', isActive: true },
  ];

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditing(true); // Set to true for edit mode
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    setSelectedItem({
      bedFeature: '',
      scheme: '',
      priceCategory: '',
      isActive: true
    });
    setIsEditing(false); // Set to false for add mode
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
    setIsEditing(false); // Reset editing state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(isEditing ? 'Updated:' : 'Added:', selectedItem);
    handleCloseModal();
  };

  return (
    <div className="manage-add-ward-page">
      <div className="manage-add-ward-table-container">
        <div className="manage-add-ward-manage-section">
          <Button className="manage-add-ward-btn" onClick={handleAddClick}>
            + Add Bed Feature Scheme And Price Category
          </Button>
        </div>
        <input type="text" placeholder="Search" className="manage-add-ward-search-input" />
        <div className="manage-add-ward-results-info">Showing {data.length} / {data.length} results</div>

        <div className='table-container'>
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Bed Feature",
                  "Scheme",
                  "Price Category",
                  "Is Active",
                  "Action"
                ].map((header, index) => (
                  <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
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
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.bedFeature}</td>
                  <td>{item.scheme}</td>
                  <td>{item.priceCategory}</td>
                  <td>{item.isActive ? 'true' : 'false'}</td>
                  <td>
                    <Button className="manage-add-ward-edit-btn" onClick={() => handleEditClick(item)}>Edit</Button>
                    <Button className="manage-add-ward-edit-btn">Deactivate</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseModal} dialogClassName="manage-add-employee-role">
        <div className="manage-modal-dialog">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">
              {isEditing ? 'Update Bed Feature Scheme And Price Category' : 'Add Bed Feature Scheme And Price Category'}
            </div>
            <Button onClick={handleCloseModal} className="manage-modal-employee-role-btn">X</Button>
          </div>
          <div className="manage-modal-modal-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="bedFeature">
                <Form.Label className="manage-modal-form-label">
                  Bed Feature <span className="manage-modal-text-danger">*</span>:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.bedFeature || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, bedFeature: e.target.value })}
                  placeholder="Bed Feature"
                  required
                  className="manage-modal-form-control"
                />
              </Form.Group>

              <Form.Group controlId="scheme">
                <Form.Label className="manage-modal-form-label">Scheme:</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.scheme || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, scheme: e.target.value })}
                  placeholder="Scheme"
                  className="manage-modal-form-control"
                />
              </Form.Group>

              <Form.Group controlId="priceCategory">
                <Form.Label className="manage-modal-form-label">Price Category:</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.priceCategory || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, priceCategory: e.target.value })}
                  placeholder="Price Category"
                  className="manage-modal-form-control"
                />
              </Form.Group>

              <Button type="submit" className="manage-modal-employee-btn">
                {isEditing ? 'Update' : 'Add'}
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageBedPriceCategory;
