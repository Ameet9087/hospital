import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ManageAutoAddBillingItems.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const ManageAutoAddBillingItems = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Sample data
  const data = [
    {
      bedFeature: 'Male Ward',
      scheme: 'NHIF CAPITATION',
      serviceItem: 'Male Ward',
      minChargeAmount: 1000,
      usePercentageOfBedCharge: true,
      percentageOfBedCharge: 10,
      isRepeatable: false,
      isActive: true
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Modal state and handlers
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle Add button click
  const handleAddClick = () => {
    setSelectedItem({
      bedFeature: '',
      scheme: '',
      serviceItem: '',
      minChargeAmount: '',
      usePercentageOfBedCharge: false,
      percentageOfBedCharge: '',
      isRepeatable: false,
      isActive: true
    });
    setIsEditing(false);
    setShowModal(true);
  };

  // Handle Edit button click
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add or update logic goes here
    if (isEditing) {
      console.log('Updated:', selectedItem);
    } else {
      console.log('Added:', selectedItem);
    }
    handleCloseModal();
  };

  return (
    <div className="manage-auto-billing-page">
      <div className="manage-auto-billing-table-container">
        <div className="manage-auto-billing-manage-section">
          <button
            className="manage-auto-billing-btn"
            onClick={handleAddClick}
          >
            + Add Auto Billing Items
          </button>
        </div>
        <input type="text" placeholder="Search" className="manage-auto-billing-search-input" />
        <div className="manage-auto-billing-results-info">
          Showing {currentItems.length} / {data.length} results
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Bed Feature",
                  "Scheme",
                  "Service Item",
                  "Minimum Charge Amount",
                  "Use Percentage Of Bed Charge?",
                  "Percentage Of Bed Charge",
                  "Is Repeatable?",
                  "Is Active",
                  "Action"
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
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.bedFeature}</td>
                  <td>{item.scheme}</td>
                  <td>{item.serviceItem}</td>
                  <td>{item.minChargeAmount}</td>
                  <td>{item.usePercentageOfBedCharge ? 'true' : 'false'}</td>
                  <td>{item.percentageOfBedCharge}</td>
                  <td>{item.isRepeatable ? 'true' : 'false'}</td>
                  <td>{item.isActive ? 'true' : 'false'}</td>
                  <td>
                    <button
                      className="manage-auto-billing-edit-btn"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button className="manage-auto-billing-deactivate-btn">
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="manage-add-employee-role"
      >
        <div className="manage-modal-dialog">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">
              {isEditing ? 'Update Auto Billing Item' : 'Add Auto Billing Item'}
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

              <Form.Group controlId="serviceItem">
                <Form.Label className="manage-modal-form-label">Service Item:</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.serviceItem || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, serviceItem: e.target.value })}
                  placeholder="Service Item"
                  className="manage-modal-form-control"
                />
              </Form.Group>

              <Form.Group controlId="minChargeAmount">
                <Form.Label className="manage-modal-form-label">Minimum Charge Amount:</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedItem?.minChargeAmount || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, minChargeAmount: e.target.value })}
                  placeholder="Minimum Charge Amount"
                  className="manage-modal-form-control"
                />
              </Form.Group>

              <Form.Group controlId="usePercentageOfBedCharge">
                <Form.Label className="manage-modal-form-label">Use Percentage Of Bed Charge:</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={selectedItem?.usePercentageOfBedCharge || false}
                  onChange={(e) => setSelectedItem({ ...selectedItem, usePercentageOfBedCharge: e.target.checked })}
                  className="manage-modal-form-check-input"
                />
              </Form.Group>

              <Form.Group controlId="percentageOfBedCharge">
                <Form.Label className="manage-modal-form-label">Percentage Of Bed Charge:</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedItem?.percentageOfBedCharge || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, percentageOfBedCharge: e.target.value })}
                  placeholder="Percentage Of Bed Charge"
                  className="manage-modal-form-control"
                />
              </Form.Group>

              <Form.Group controlId="isRepeatable">
                <Form.Label className="manage-modal-form-label">Is Repeatable:</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={selectedItem?.isRepeatable || false}
                  onChange={(e) => setSelectedItem({ ...selectedItem, isRepeatable: e.target.checked })}
                  className="manage-modal-form-check-input"
                />
              </Form.Group>

              <Form.Group controlId="isActive">
                <Form.Label className="manage-modal-form-label">Is Active:</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={selectedItem?.isActive || false}
                  onChange={(e) => setSelectedItem({ ...selectedItem, isActive: e.target.checked })}
                  className="manage-modal-form-check-input"
                />
              </Form.Group>

              <div className="manage-modal-button-group">
                <Button
                  className="manage-modal-submit-btn"
                  type="submit"
                >
                  {isEditing ? 'Update' : 'Submit'}
                </Button>
                <Button className="manage-modal-cancel-btn" onClick={handleCloseModal}>Cancel</Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAutoAddBillingItems;
