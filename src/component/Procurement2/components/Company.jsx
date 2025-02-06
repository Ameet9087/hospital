import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import AddCompany from '../components/AddCompany';
import UpdateSomeCompany from '../components/UpdateSomeCompany';
import './Company.css';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';
import ReactToPrint from 'react-to-print';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

Modal.setAppElement('#root');

const CompanyTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);


  useEffect(() => {
    fetch(`${API_BASE_URL}/company/allCompany`)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error('Error fetching companies:', error));
  }, [isAddModalOpen, isEditModalOpen]);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCompany(null); // Clear selected company after closing the modal
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
    <div className="CompanyTable-container">
      {/* Add Company Button */}
      <button className="CompanyTable-add-company-button" onClick={openAddModal}>
        Add Company
      </button>

      {/* Search Bar */}
      <div className="CompanyTable-print-section">
        <div className="CompanyTable-search-bar">
          <input
            type="text"
            placeholder="Search"
            className="CompanyTable-search-bar-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div >
          <span>Showing {companies.length}/{companies.length} results </span>
          <button className="CompanyTable-print-button" onClick={handleExport}>Export</button>

          <ReactToPrint
            trigger={() => <button className="CompanyTable-print-button" onClick={handlePrint}>Print</button>}
            content={() => tableRef.current}
          />
        </div>
      </div>
      <div className='CompanyTable-table-container'>
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Name",
                "Code",
                "Address",
                "Contact",
                "Email",
                "Description",
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
            {companies.length > 0 ? (
              companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.companyName}</td>
                  <td>{company.code}</td>
                  <td>{company.address}</td>
                  <td>{company.contactNo}</td>
                  <td>{company.email}</td>
                  <td>{company.description}</td>
                  <td>
                    <button
                      className="CompanyTable-action-button"
                      onClick={() => openEditModal(company)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No companies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal for Adding Company */}
      <CustomModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        contentLabel="Add Company Modal"
      >
        <AddCompany closeModal={closeAddModal} />
      </CustomModal>

      {/* Modal for Editing Company */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        contentLabel="Edit Company Modal"
      >
        <UpdateSomeCompany company={selectedCompany} closeModal={closeEditModal} />
      </CustomModal>
    </div>
  );
};

export default CompanyTable;
