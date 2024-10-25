import React, { useState, useEffect, useRef } from 'react';
import './ReferralTracking.css';
import axios from 'axios';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

function ReferralTracking() {
  const [referrals, setReferrals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/referrals')
      .then(response => {
        setReferrals(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the referrals!", error);
      });
  }, []);

  // Function to open the modal
  const openModal = (referral) => {
    setSelectedReferral(referral);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReferral(null);
  };

  // Function to update referral data using Axios PUT request
  const updateReferral = (updatedReferral) => {
    axios.put(`http://localhost:5000/api/referrals/${updatedReferral.referralId}`, updatedReferral)
      .then(response => {
        console.log('Referral updated successfully', response.data);
        // Update local state with the updated referral
        setReferrals(referrals.map(ref => 
          ref.referralId === updatedReferral.referralId ? updatedReferral : ref
        ));
        closeModal();
      })
      .catch(error => {
        console.error('There was an error updating the referral!', error);
      });
  };

  return (
    <div className='mkt-refferaltracking-main-container'>
      <div className="mkt-refferaltracking-header">
        <div className="mkt-refferaltracking-date-picker">
          <label>From: <input type="date" /></label>
          <label>To: <input type="date" /></label>
          <button className='mkt-refferaltracking-edit-button-ok'>OK</button>
        </div>
      </div>

      <div className="mkt-refferaltracking-search">
        <input className='mkt-refferaltracking-search-input' type="text" placeholder="Search Referrals" />
      </div>

      <div className="mkt-refferaltracking-table-container">
        <table className="mkt-refferaltracking-table" ref={tableRef}>
          <thead>
            <tr>
              {["Referral ID", "Referrer ID","ReferreName", "Referred Patient ID","Referred Patient Name","Referral Date", "Referral Status", "Reward Eligibility", "Note", "Action"].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
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
            {referrals.map(referral => (
              <tr key={referral.referralId}>
                <td>{referral.referralId}</td>
                <td>{referral.referrerId}</td>
                <td>{referral.referreName}</td>
                <td>{referral.referredPatientId}</td>
                <td>{referral.referredPatientName}</td>
                <td>{referral.referralDate}</td>
                <td>{referral.referralStatus}</td>
                <td>{(referral.rewardEligibility) ? "Yes" : "No"}</td>
                <td>{referral.notes}</td>
                <td>
                  <button className="mkt-refferaltracking-edit-button" onClick={() => openModal(referral)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedReferral && (
        <div className="mkt-refferaltracking-modal">
          <div className="mkt-refferaltracking-modal-content">
            <span className="mkt-refferaltracking-close-button" onClick={closeModal} style={{ fontSize: "20px", cursor: "pointer" }}>&times;</span>
            <h4>Editing Referral</h4>
            <form>
              <div className='mkt-reffaringtracking-form'>
                <label>
                  Referral Status:
                  <input
                    type="text"
                    value={selectedReferral.referralStatus}
                    onChange={(e) => setSelectedReferral({ ...selectedReferral, referralStatus: e.target.value })}
                  />
                </label>
              </div>
              <div className='mkt-reffaringtracking-form'>
                <label>
                  Reward Eligibility:
                  <input
                    type="text"
                    value={selectedReferral.rewardEligibility}
                    onChange={(e) => setSelectedReferral({ ...selectedReferral, rewardEligibility: e.target.value })}
                  />
                </label>
              </div>
              <div className='mkt-reffaringtracking-form'>
                <label>
                  Note:
                  <textarea
                    value={selectedReferral.notes}
                    onChange={(e) => setSelectedReferral({ ...selectedReferral, notes: e.target.value })}
                  />
                </label>
              </div>
              <button
                className='mkt-reffaringtracking-savebtn'
                type="button"
                onClick={() => updateReferral(selectedReferral)} // Call edit API
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReferralTracking;
