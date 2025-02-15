/* Mohini_SettingTerm_WholePage_14/sep/2024 */
import React, { useState ,useRef} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; 
import './SettingSupplier.css';
import * as XLSX from 'xlsx';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { FloatingInput } from '../../FloatingInputs';

const usersData = [
  {
    name: 'gfhjk',
    text: '<p>xcv bnm,.</p>',
    isActive: false
  }
];

const SettingTerms = () => {
  const [suppliers, setSuppliers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: '',
    text: '',
    isActive: true
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  // Filtering users based on the search term
  const filteredUsers = suppliers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser({ name: '', text: '', isActive: true });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser({
      name: '',
      text: '',
      isActive: true
    });
  };
const handleSubmit = (event) => {
  event.preventDefault();

  try {
    if (isEditMode) {
      // Update the existing item
      setSuppliers(suppliers.map(supplier => 
        supplier.name === selectedUser.name ? selectedUser : supplier
      ));
      toast.success("Supplier updated successfully!");
    } else {
      // Add a new item
      setSuppliers([...suppliers, selectedUser]);
      toast.success("Supplier added successfully!");
    }

    handleCloseModal();
  } catch (error) {
    console.error("Error processing request", error);
    toast.error("Something went wrong! Please try again")
    
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({
      ...selectedUser,
      [name]: value
    });
  };

  const handleTextChange = (value) => {
    setSelectedUser({
      ...selectedUser,
      text: value
    });
  };




  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };

  return (
    <div className="setting-supplier-container">
      <CustomAlerts/>
      <div className="setting-supplier-header">
        <button className="setting-supplier-add-user-button" onClick={() => handleShowModal()}>
          + Add Terms
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="manage-users-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    
      <div className='setting-supplier-span'>
      <span>Showing {filteredUsers.length} / {suppliers.length} results</span>
      <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      <div className='table-container'>
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {[ "Name",
  "Text",
  "isActive",
  "Action"].map((header, index) => (
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
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td dangerouslySetInnerHTML={{ __html: user.text }}></td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowModal(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="setting-supplier-pagination">
          <div className="setting-supplier-pagination-controls">
            <button>First</button>
            <button>Previous</button>
            <button>1</button>
            <button>Next</button>
            <button>Last</button>
          </div>
        </div> */}
      </div>

      <CustomModal
  isOpen={showModal}
  onClose={handleCloseModal}
  className="supplier-setting-supplier-update-modal"
>
  <div className="supplier-setting-modal-header">
    <h5>{isEditMode ? `Update Terms` : 'Add New Terms'}</h5>
    {/* <button className="close" onClick={handleCloseModal}>&times;</button> */}
  </div>
  <div className="supplier-setting-modal-body">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="taxName" className="supplier-setting-form-group">
        <FloatingInput
        label={"Tax Name"}
          type="text"
          name="name"
          value={selectedUser.name}
          onChange={handleInputChange}
          placeholder="Enter Tax Name"
          required
        />
      </Form.Group>

      {/* Uncomment this section if ReactQuill is needed for text input */}
      {/* <Form.Group controlId="taxText" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">Text:</Form.Label>
        <ReactQuill
          value={selectedUser.text}
          onChange={handleTextChange}
          placeholder="Enter Text"
          className="supplier-setting-quill"
        />
      </Form.Group> */}

      <Form.Group controlId="taxText" className="supplier-setting-form-group">
        <FloatingInput
        label={"Type"}
          type="text"
          name="text"
          value={selectedUser.text}
          onChange={handleInputChange}
          placeholder="Enter Text"
        />
      </Form.Group>

      <Form.Group controlId="isActive" className="supplier-setting-form-group">
        <Form.Check
          type="checkbox"
          name="isActive"
          checked={selectedUser.isActive}
          onChange={(e) => setSelectedUser({ ...selectedUser, isActive: e.target.checked })}
          label="Active"
          className="supplier-setting-form-check"
        />
      </Form.Group>

      <div className="supplier-setting-text-right">
        <Button variant="primary" type="submit">Save</Button>
      </div>
    </Form>
  </div>
</CustomModal>

    </div>
  );
};

export default SettingTerms;
/* Mohini_SettingTerm_WholePage_14/sep/2024 */
