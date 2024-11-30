import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AddCompany from '../components/AddCompany';
import UpdateSomeCompany from '../components/UpdateSomeCompany';
import './Company.css';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';
import ReactToPrint from 'react-to-print';

Modal.setAppElement('#root');

const CompanyTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/company/allCompany`)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error('Error fetching companies:', error));
  }, [isAddModalOpen,isEditModalOpen]);

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
        <div>
          <span>Showing {companies.length}/{companies.length} results </span>
          <ReactToPrint
            trigger={() => <button className="CompanyTable-print-button">Print</button>}
            content={() => tableRef.current}
          />
        </div>
      </div>
<div className='CompanyTable-table-container'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Description</th>
            <th>Action</th>
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
        <AddCompany closeModal={closeAddModal}/>
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
