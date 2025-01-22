/* Mohini_SettingItemComponent_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; // Ensure this contains relevant styles
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import * as XLSX from 'xlsx';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import "./SettingItemComponet.css"


const SettingItemComponent = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [genericNames, setGenericNames] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, companiesResponse, categoriesResponse, unitsResponse, itemTypesResponse, genericNamesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/add-items`),
          axios.get(`${API_BASE_URL}/companies`),
          axios.get(`${API_BASE_URL}/categories`),
          axios.get(`${API_BASE_URL}/unitofmeasurement/fetchAll`),
          axios.get(`${API_BASE_URL}/itemtypes`),
          axios.get(`${API_BASE_URL}/generic-names`), // Fetch generic names
        ]);

        console.log('Items Response:', itemsResponse.data);
        console.log('Companies Response:', companiesResponse.data);
        console.log('Categories Response:', categoriesResponse.data);
        console.log('Units Response:', unitsResponse.data);
        console.log('Item Types Response:', itemTypesResponse.data);
        console.log('Generic Names Response:', genericNamesResponse.data);

        setItems(itemsResponse.data);
        setCompanies(companiesResponse.data);
        setCategories(categoriesResponse.data);
        setUnitsOfMeasurement(unitsResponse.data);
        setItemTypes(itemTypesResponse.data);
        setGenericNames(genericNamesResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = items.filter(item => {
    const genericName = item.genericNameDTO?.genericName || '';
    return genericName.toLowerCase().includes(searchTerm.toLowerCase());
  });



  console.log('Search Term:', searchTerm);
  console.log('Items:', items);
  console.log('Filtered Items:', filteredItems);

  const handleShowModal = (item = null) => {
    if (item) {
      setSelectedItem(item);
      setIsEditMode(true);
    } else {
      setSelectedItem({
        itemName: '',
        itemCode: '',
        isActive: '',
        isInternationalBrand: '',
        ccCharge: '',
        isNarcotic: '',
        reOrderQuantity: true,
        minStockQuantity: 0,
        dosage: '',
        budgetedQuantity: 0,
        isVatApplicable: false,
        abOrC: 0,
        veOrD: 0,
        purchaseRate: 0,
        salesRate: 0,
        purchaseDiscount: "",
        categoryDTO: {
          categoryId: ""
        },
        companyDTO: {
          companyId: ""
        },
        itemTypeDTO: {
          itemTypeId: ""
        },
        unitOfMeasurementPayload: {
          unitOfMeasurementId: ""
        },
        genericNameDTO: {
          genericNameId: ""
        }
      });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isEditMode
        ? `${API_BASE_URL}/add-items/${selectedItem.itemCode}`
        : `${API_BASE_URL}/add-items`;
      const method = isEditMode ? 'put' : 'post';

      console.log(selectedItem)
      const response = await axios({
        method,
        url,
        data: selectedItem,
      });

      if (isEditMode) {
        setItems(prevItems =>
          prevItems.map(item =>
            item.itemCode === selectedItem.itemCode ? response.data : item
          )
        );
      } else {
        setItems(prevItems => [...prevItems, response.data]);
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedItem((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleDelete = async (itemCode) => {
    try {
      await axios.delete(`${API_BASE_URL}/add-items/${itemCode}`);
      setItems(prevItems =>
        prevItems.filter(item => item.itemCode !== itemCode)
      );
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
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
      <CustomAlerts />
      <div className="setting-supplier-header">
        <button
          className="setting-supplier-add-user-button"
          onClick={() => handleShowModal()}
        >
          + Add Item
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="manage-users-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <div className="setting-supplier-span"> */}

      <div className='setting-supplier-span'>
        Showing {filteredItems.length} / {items.length} results
        <button className='item-wise-export-button' onClick={handleExport}>Export</button>
        <button className='item-wise-print-button' onClick={handlePrint}>Print</button>
      </div>

      {/* </div> */}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Generic Nameaaaaaaa",
                "Medicine Name",
                "Company Name",
                "Item Type",
                "ReOrder Quantity",
                "MinStock Quantity",
                "Rack No",
                "IsActive",
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
            {filteredItems.length ? (
              filteredItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.genericNameDTO?.genericName || 'N/A'}</td>
                  <td>{item.itemName || 'N/A'}</td>
                  <td>{item.companyDTO?.companyName || 'N/A'}</td>
                  <td>{item.itemTypeDTO?.type || 'N/A'}</td>
                  <td>{item.reOrderQuantity || 'N/A'}</td>
                  <td>{item.minStockQuantity || 'N/A'}</td>
                  <td>{item.rackNo || 'N/A'}</td>
                  <td>{item.active ? 'Active' : 'Inactive'}</td>
                  <td className="setting-supplier-action-buttons">
                    {/* <button className="setting-supplier-action-button">
                      Add To Rack
                    </button> */}
                    <button
                      className="setting-supplier-action-button"
                      onClick={() => handleShowModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="setting-supplier-action-button"
                      onClick={() => handleDelete(item.itemCode)}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CustomModal
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        <div className="supplier-setting-modal-header">
          <h5>{isEditMode ? 'Update Item' : 'Add New Item'}</h5>
          {/* <button className="close" onClick={handleCloseModal}>&times;</button> */}
        </div>
        <div className="supplier-setting-modal-body">
          <Form onSubmit={handleSubmit}>
            <div className='supplier-setting-modal-body'>
              <div>
                <Form.Group controlId="categoryDTO" className="supplier-setting-form-group">
                  <Form.Label>
                    Select Sales Category<span className="supplier-setting-text-danger">*</span>:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="categoryDTO"
                    value={selectedItem?.categoryDTO?.categoryId || ''}
                    onChange={(e) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        categoryDTO: { categoryId: e.target.value },
                      }))
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Control>
                  {error && <div className="supplier-setting-error">{error}</div>}
                </Form.Group>

                <Form.Group controlId="itemName" className="supplier-setting-form-group">
                  <Form.Label>Item Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="itemName"
                    value={selectedItem?.itemName || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="itemCode" className="supplier-setting-form-group">
                  <Form.Label>Item Code:</Form.Label>
                  <Form.Control
                    type="text"
                    name="itemCode"
                    value={selectedItem?.itemCode || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="companyDTO" className="supplier-setting-form-group">
                  <Form.Label>Company Name:</Form.Label>
                  <Form.Control
                    as="select"
                    name="companyDTO"
                    value={selectedItem?.companyDTO?.companyId || ''}
                    onChange={(e) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        companyDTO: { companyId: e.target.value },
                      }))
                    }
                  >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option key={company.companyId} value={company.companyId}>
                        {company.companyName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="itemTypeDTO" className="supplier-setting-form-group">
                  <Form.Label>Item Type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="itemTypeDTO"
                    value={selectedItem?.itemTypeDTO?.itemTypeId || ''}
                    onChange={(e) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        itemTypeDTO: { itemTypeId: e.target.value },
                      }))
                    }
                  >
                    <option value="">Select Item Type</option>
                    {itemTypes.map((itemType) => (
                      <option key={itemType.itemTypesId} value={itemType.itemTypesId}>
                        {itemType.type}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="unitOfMeasurementPayload" className="supplier-setting-form-group">
                  <Form.Label>Unit of Measurement:</Form.Label>
                  <Form.Control
                    as="select"
                    name="unitOfMeasurementPayload"
                    value={selectedItem?.unitOfMeasurementPayload?.unitOfMeasurementId || ''}
                    onChange={(e) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        unitOfMeasurementPayload: { unitOfMeasurementId: e.target.value },
                      }))
                    }
                  >
                    <option value="">Select Unit of Measurement</option>
                    {unitsOfMeasurement.map((unit) => (
                      <option key={unit.unitOfMeasurementId} value={unit.unitOfMeasurementId}>
                        {unit.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="genericNameDTO" className="supplier-setting-form-group">
                  <Form.Label>Generic Name:</Form.Label>
                  <Form.Control
                    as="select"
                    name="genericNameDTO"
                    value={selectedItem?.genericNameDTO?.genericNameId || ''}
                    onChange={(e) =>
                      setSelectedItem((prev) => ({
                        ...prev,
                        genericNameDTO: { genericNameId: e.target.value },
                      }))
                    }
                  >
                    <option value="">Select Generic Name</option>
                    {genericNames.map((genericName) => (
                      <option key={genericName.genericNameId} value={genericName.genericNameId}>
                        {genericName.genericName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="isActive" className="supplier-setting-form-group">
                  <Form.Check
                    type="checkbox"
                    name="isActive"
                    label="Active"
                    checked={selectedItem?.isActive || false}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="isInternationalBrand" className="supplier-setting-form-group">
                  <Form.Check
                    type="checkbox"
                    name="isInternationalBrand"
                    label="International Brand"
                    checked={selectedItem?.isInternationalBrand || false}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="ccCharge" className="supplier-setting-form-group">
                  <Form.Label>CC Charge:</Form.Label>
                  <Form.Control
                    type="number"
                    name="ccCharge"
                    value={selectedItem?.ccCharge || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="isNarcotic" className="supplier-setting-form-group">
                  <Form.Check
                    type="checkbox"
                    name="isNarcotic"
                    label="Narcotic"
                    checked={selectedItem?.isNarcotic || false}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="reOrderQuantity" className="supplier-setting-form-group">
                  <Form.Label>ReOrder Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    name="reOrderQuantity"
                    value={selectedItem?.reOrderQuantity || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group controlId="minStockQuantity" className="supplier-setting-form-group">
                  <Form.Label>MinStock Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    name="minStockQuantity"
                    value={selectedItem?.minStockQuantity || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="dosage" className="supplier-setting-form-group">
                  <Form.Label>Dosage:</Form.Label>
                  <Form.Control
                    type="text"
                    name="dosage"
                    value={selectedItem?.dosage || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="budgetedQuantity" className="supplier-setting-form-group">
                  <Form.Label>Budgeted Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    name="budgetedQuantity"
                    value={selectedItem?.budgetedQuantity || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="isVatApplicable" className="supplier-setting-form-group">
                  <Form.Check
                    type="checkbox"
                    name="isVatApplicable"
                    label="VAT Applicable"
                    checked={selectedItem?.isVatApplicable || false}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="purchaseRate" className="supplier-setting-form-group">
                  <Form.Label>Purchase Rate:</Form.Label>
                  <Form.Control
                    type="number"
                    name="purchaseRate"
                    value={selectedItem?.purchaseRate || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="salesRate" className="supplier-setting-form-group">
                  <Form.Label>Sales Rate:</Form.Label>
                  <Form.Control
                    type="number"
                    name="salesRate"
                    value={selectedItem?.salesRate || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="purchaseDiscount" className="supplier-setting-form-group">
                  <Form.Label>Purchase Discount:</Form.Label>
                  <Form.Control
                    type="number"
                    name="purchaseDiscount"
                    value={selectedItem?.purchaseDiscount || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="discountPercentage" className="supplier-setting-form-group">
                  <Form.Label>Discount Percentage:</Form.Label>
                  <Form.Control
                    type="number"
                    name="discountPercentage"
                    value={selectedItem?.discountPercentage || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <div className="modal-footer">
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    {isEditMode ? 'Update' : 'Add'}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </CustomModal>

    </div>
  );
};

export default SettingItemComponent;
/* Mohini_SettingItemComponent_WholePage_14/sep/2024 */
