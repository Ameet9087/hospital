import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const DepositeSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Sample data
  const data = [
    { bedFeature: 'FEMALE WARD', scheme: 'NHIF CAPITATION', depositHead: 'Normal Deposit', minimumDeposit: 1000, isOnlyMinimum: true, isActive: true },
    { bedFeature: 'Male Ward', scheme: 'NHIF CAPITATION', depositHead: 'Normal Deposit', minimumDeposit: 25, isOnlyMinimum: true, isActive: false },
  ];

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setSelectedItem({ bedFeature: '', scheme: '', depositHead: '', minimumDeposit: '', isOnlyMinimum: false, isActive: false });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(isEditing ? 'Updated:' : 'Added:', selectedItem);
    handleCloseModal();
  };

  return (
    <div className="manage-add-ward-page">
      <div className="manage-add-ward-table-container">
        <div className="manage-add-ward-manage-section">
          <Button className="manage-add-ward-btn" onClick={handleAddClick}>+ Add Minimum Deposit Setting</Button>
        </div>
        <input type="text" placeholder="Search" className="manage-add-ward-search-input" />
        <div className="manage-add-ward-results-info">Showing {data.length} / {data.length} results</div>

        <div className='table-container'>
          <table ref={tableRef}>
            <thead>
              <tr>
                {["Bed Features", "Schemes", "Deposit Head", "Minimum Deposit", "Is Only Minimum", "Is Active", "Action"].map((header, index) => (
                  <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                    <div className="header-content">
                      <span>{header}</span>
                      <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
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
                  <td>{item.depositHead}</td>
                  <td>{item.minimumDeposit}</td>
                  <td>{item.isOnlyMinimum.toString()}</td>
                  <td>{item.isActive.toString()}</td>
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

      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="manage-add-employee-role">
        <div className="manage-modal-dialog">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">{isEditing ? 'Update Minimum Deposit Setting' : 'Add Minimum Deposit Setting'}</div>
            <Button onClick={handleCloseModal} className="manage-modal-employee-role-btn">X</Button>
          </div>
          <div className="manage-modal-modal-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="bedFeature">
                <Form.Label className="manage-modal-form-label">Bed Features <span className="manage-modal-text-danger">*</span>:</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.bedFeature || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, bedFeature: e.target.value })}
                  placeholder="Bed Features"
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

              <Form.Group controlId="depositHead">
                <Form.Label className="manage-modal-form-label">Deposit Head:</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedItem?.depositHead || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, depositHead: e.target.value })}
                  placeholder="Deposit Head"
                  className="manage-modal-form-control"
                />
              </Form.Group>

              <Form.Group controlId="minimumDeposit">
                <Form.Label className="manage-modal-form-label">Minimum Deposit Amount:</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedItem?.minimumDeposit || ''}
                  onChange={(e) => setSelectedItem({ ...selectedItem, minimumDeposit: e.target.value })}
                  placeholder="Minimum Deposit Amount"
                  className="manage-modal-form-control"
                />
              </Form.Group>

              <Form.Group controlId="isOnlyMinimum">
                <Form.Label className="manage-modal-form-label">Is Only Minimum Deposit:</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={selectedItem?.isOnlyMinimum || false}
                  onChange={(e) => setSelectedItem({ ...selectedItem, isOnlyMinimum: e.target.checked })}
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

              <Button type="submit" className="manage-modal-employee-btn">{isEditing ? 'Update' : 'Add'}</Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DepositeSettings;
