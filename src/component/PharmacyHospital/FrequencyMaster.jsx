

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FrequencyMaster.css';
import CustomModal from '../../CustomModel/CustomModal';
import { API_BASE_URL } from '../api/api';


function FrequencyMaster() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [formData, setFormData] = useState({
    frequency: '',
    time: [''],
    frequencyDescription: '',
    status: true,
  });
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/frequencies`);
      setTableData(response.data);
    } catch (error) {
      setError('Error fetching data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...formData.time];
    updatedTimes[index] = value;
    setFormData((prev) => ({
      ...prev,
      time: updatedTimes,
    }));
  };

  const addTimeField = () => {
    setFormData((prev) => ({
      ...prev,
      time: [...prev.time, ''],
    }));
  };

  const removeTimeField = (index) => {
    const updatedTimes = formData.time.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      time: updatedTimes,
    }));
  };

  const handleAddRecord = () => {
    setIsEditMode(false);
    setSelectedRecordId(null);
    setFormData({
      frequency: '',
      time: [''],
      frequencyDescription: '',
      status: true,
    });
    setIsModalOpen(true);
  };

  const handleEditRecord = (record) => {
    setIsEditMode(true);
    setSelectedRecordId(record.id);
    setFormData({
      frequency: record.frequency,
      time: record.time || [''],
      frequencyDescription: record.frequencyDescription,
      status: record.status === 'Active',
    });
    setIsModalOpen(true);
  };

  const handleDeleteRecord = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/frequencies/${id}`);
        fetchData();
      } catch (error) {
        setError('Error deleting record. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.frequency.trim() || formData.time.length === 0) {
      setError('Frequency and at least one time are required.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const data = {
        ...formData,
        status: formData.status ? 'Active' : 'Inactive',
      };

      if (isEditMode) {
        await axios.put(`${API_BASE_URL}/frequencies/${selectedRecordId}`, data);
      } else {
        await axios.post(`${API_BASE_URL}/frequencies`, data);
      }

      fetchData();
      setIsModalOpen(false);
      setFormData({
        frequency: '',
        time: [''],
        frequencyDescription: '',
        status: true,
      });
    } catch (error) {
      setError('Error submitting data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="FrequencyMaster-container">
      <h4>Frequency Master</h4>
      <button className="FrequencyMasteradd-btn" onClick={handleAddRecord}>
        Add Frequency Record
      </button>
      <table className="frequency-table">
        <thead>
          <tr>
            <th>SN No</th>
            <th>Frequency</th>
            <th>Times</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.frequency}</td>
              <td>{data.time.join(', ')}</td>
              <td>{data.frequencyDescription}</td>
              <td>{data.status}</td>
              <td className="frequency-actions">
                <button
                  className="frequency-action-btn"
                  onClick={() => handleEditRecord(data)}
                >
                  Edit
                </button>
                <button
                  className="frequency-action-btn"
                  onClick={() => handleDeleteRecord(data.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h4>{isEditMode ? 'Edit Frequency Record' : 'Add Frequency Record'}</h4>
          <form className="frequency-modal-form">
            <div className="FrequencyMaster-form-group">
              <label>Frequency</label>
              <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="FrequencyMaster-form-group">
              <label>Times</label>
              {formData.time.map((time, index) => (
                <div key={index} className="FrequencyMaster-time-field">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    required
                  />
                  {formData.time.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeField(index)}
                      className="FrequencyMaster-remove-time-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTimeField}
                className="FrequencyMaster-add-time-btn"
              >
                Add Time
              </button>
            </div>
            <div className="FrequencyMaster-form-group">
              <label>Description :</label>
              <textarea
                name="frequencyDescription"
                value={formData.frequencyDescription}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="FrequencyMaster-form-group">
              <label>
                Status:  </label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleInputChange}
                style={{ marginRight: '8px' }}
              />
              {formData.status ? ' Active' : ' Inactive'}

            </div>
            <div className="FrequencyMaster-submit-button">
              <button
                type="button"
                className="FrequencyMaster-submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </CustomModal>
      )}
    </div>
  );
}

export default FrequencyMaster;
