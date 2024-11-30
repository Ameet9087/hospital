import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import AddHeadCount from '../components/AddHeadCount'; // Import AddHeadCount component
import UpdateAccountHead from '../components/UpdateAccountHead'; // Import UpdateAccountHead component
import axios from 'axios';
import { useReactToPrint } from 'react-to-print'; // Import for print functionality
import './AccountHead.css';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';
Modal.setAppElement('#root'); // Set the app element for accessibility

const AccountHead = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [accountHeads, setAccountHeads] = useState([]);
  const [selectedAccountHead, setSelectedAccountHead] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const tableRef = useRef(); // Ref for the table to be printed

  useEffect(() => {
    // Fetch account heads from the API
    const fetchAccountHeads = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/account-heads/findAll`);
        setAccountHeads(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching account heads:', error);
      }
    };

    fetchAccountHeads();
  }, []); // Empty dependency array means this effect runs once on mount

  const handlePrint = useReactToPrint({
    content: () => tableRef.current, // Reference to the content to be printed
    documentTitle: 'Account Heads', // Title for the print document
  });

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (accountHead) => {
    setSelectedAccountHead(accountHead);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedAccountHead(null);
    setShowEditModal(false);
  };

  // Function to handle updating the account head
  const handleUpdateAccountHead = (updatedAccountHead) => {
    setAccountHeads(accountHeads.map(head =>
      head.id === updatedAccountHead.id ? updatedAccountHead : head
    ));
    closeEditModal();
  };

  return (
    <div className="account-head-container">
      <div className="account-head-header">
        <button className="account-head-add-button" onClick={openAddModal}>
          Add Account Head
        </button>
      </div>
      <div className="account-head-results-info">
        <div className="account-head-search-bar">
          <input type="text" placeholder="Search" />
        </div>
          <div>
          Showing {accountHeads.length} / {accountHeads.length} results
          <button className="account-head-print-button" onClick={handlePrint}>
            Print
          </button>
          </div>
        </div>

      {/* Table of account heads */}
      <div ref={tableRef} className='table-container'>
        <table className="account-head-table">
          <thead>
            <tr>
              <th>Account Head Name</th>
              <th>Description</th>
              <th>Is Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {accountHeads.length > 0 ? (
              accountHeads.map((accountHead, index) => (
                <tr key={index}>
                  <td>{accountHead.accountHeadName}</td>
                  <td>{accountHead.description}</td>
                  <td>{accountHead.active ? 'true' : 'false'}</td>
                  <td>
                    <button
                      className="account-head-edit-button"
                      onClick={() => openEditModal(accountHead)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Account Head */}
      <CustomModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        contentLabel="Add Account Head Modal"
      
      >
        <AddHeadCount onClose={closeAddModal} />
      </CustomModal>

      {/* Modal for Editing Account Head */}
      <CustomModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        contentLabel="Edit Account Head Modal"
       
      >
        {/* Render UpdateAccountHead with selectedAccountHead and the update handler */}
        {selectedAccountHead && (
          <UpdateAccountHead
            accountHead={selectedAccountHead}
            onClose={closeEditModal}
            onUpdate={handleUpdateAccountHead}
          />
        )}
       
      </CustomModal>
    </div>
  );
};

export default AccountHead;
