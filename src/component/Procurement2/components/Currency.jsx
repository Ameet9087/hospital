import React, { useRef, useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; // Import axios for API requests
import AddCurrency from './AddCurrency';
import UpdateCurrency from './UpdateCurrency';
import ReactToPrint from 'react-to-print'; // Import ReactToPrint
import './Currency.css';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const CurrencyTable = () => {
  const [currencies, setCurrencies] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);


  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);


  // Fetch currencies from the API on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/currency-codes/getAll`);
        setCurrencies(response.data); // Assuming response.data is the list of currencies
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, [isAddModalOpen, isEditModalOpen]);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (currency) => {
    setSelectedCurrency(currency);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCurrency(null);
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
    <div className="procurment-add-container">
      <button className="procurment-add-currency" onClick={openAddModal}>Add Currency</button>
      <div className="procurment-add-results-info">
        <div className="procurment-add-search-bar">
          <input type="text" placeholder="Search" className='procurment-add-search-bar-input' />
        </div>
        <div className='procurment-add-print-section'>
          <span>Showing {currencies.length} / {currencies.length} results</span>
          <button className="procurment-add-button" onClick={handleExport}>Export</button>
          <ReactToPrint
            trigger={() => <button className="procurment-add-button" aria-label="Print" onClick={handlePrint}>Print</button>}
            content={() => tableRef.current}
          />
        </div>
      </div>

      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "Currency Code",
              "Description",
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
          {currencies.map((currency, index) => (
            <tr key={index}>
              <td>{currency.currencyCode}</td>
              <td>{currency.description}</td>
              <td>{currency.isActive ? 'Yes' : 'No'}</td>
              <td>
                <button
                  className=" procurment-add-button"
                  aria-label={`Edit ${currency.code}`}
                  onClick={() => openEditModal(currency)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Currency */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        contentLabel="Add Currency Modal"

      >
        <AddCurrency onClose={closeAddModal} />
      </CustomModal>

      {/* Modal for Updating Currency */}
      {selectedCurrency && (
        <CustomModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          contentLabel="Edit Currency Modal"

        >
          <UpdateCurrency currency={selectedCurrency} onClose={closeEditModal} />
        </CustomModal>
      )}
    </div>
  );
};

export default CurrencyTable;
