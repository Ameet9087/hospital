/* Dhanashree_QueryPage_27/09_Starts */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import './QueryPage.css';

function QueryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(location.state?.userId || '');
  const [departmentName, setDepartmentName] = useState(location.state?.departmentName || '');
  const [username, setUsername] = useState(location.state?.username || '');
  const [userMessage, setUserMessage] = useState(location.state?.userMessage || '');
  const [userQuery, setUserQuery] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleAction = async (actionType) => {
    try {
      let formData = {
        userId,
        departmentName,
        username,
        userMessage,
        userQuery,
      };
  
      if (actionType === 'SendToUser') {
        formData.status = 'SendToUser';
      } else if (actionType === 'Approve') {
        formData.status = 'Approved';
      } else if (actionType === 'Reject') {
        formData.status = 'Rejected';
      }
  
      console.log(formData);
  
      const response = await axios.put(`http://localhost:8085/api/super/departments/${userId}`, formData);
  
      if (response.status === 200) {
        if (actionType === 'SendToUser') {
          setMessage('Query sent successfully!');
        } else if (actionType === 'Approve') {
          setMessage('Approved successfully!');
        } else if (actionType === 'Reject') {
          setMessage('Rejected');
        }
        setMessageType('success');
      }
    } catch (error) {
      console.error(`Error during ${actionType.toLowerCase()} action:`, error);
      setMessage(`Error during ${actionType.toLowerCase()} action.`);
      setMessageType('error');
    }
  
    setTimeout(() => {
      setMessage('');
      // navigate('/inventory');
    }, 2000); // Close the message and navigate after 2 seconds
  };
  

  return (
    <div className="HIMSQueryPage-query-page">
      <div className="HIMSQueryPage-card">
        <form>
          <div className="HIMSQueryPage-form-group">
            <label>DepartId:</label>
            <input 
              type="text" 
              value={userId} 
              readOnly // Make field read-only
            />
          </div>

          <div className="HIMSQueryPage-form-group">
            <label>Department Name:</label>
            <input 
              type="text" 
              value={departmentName} 
              readOnly // Make field read-only
            />
          </div>

          <div className="HIMSQueryPage-form-group">
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              readOnly // Make field read-only
            />
          </div>

          <div className="HIMSQueryPage-form-group">
            <label>User Message:</label>
            <textarea 
              value={userMessage} 
              readOnly // Make field read-only
            />
          </div>

          <div className="HIMSQueryPage-form-group">
            <label>Send Query:</label>
            <textarea 
              value={userQuery} 
              onChange={(e) => setUserQuery(e.target.value)} 
              placeholder="Enter your query" 
            />
          </div>

          <div className="HIMSQueryPage-action-buttons">
            <button type="button" onClick={() => handleAction('SendToUser')} className="HIMSQueryPage-send-btn">Send to User</button>
            <button type="button" onClick={() => handleAction('Approve')} className="HIMSQueryPage-approve-btn">Approve</button>
            <button type="button" onClick={() => handleAction('Reject')} className="HIMSQueryPage-reject-btn">Reject</button>
          </div>
        </form>
        
        {/* Message Pop-Up */}
        {message && (
          <div className={`HIMSQueryPage-message ${messageType}`}>
            {messageType === 'success' ? (
              <span className="HIMSQueryPage-message-icon">✅</span>
            ) : (
              <span className="HIMSQueryPage-message-icon">❌</span>
            )}
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryPage;

/* Dhanashree_QueryPage_27/09_Ends */
