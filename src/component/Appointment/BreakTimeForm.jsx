import React, { useState } from 'react';
import { API_BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import { FloatingInput, FloatingTextarea } from '../../FloatingInputs';

const BreakTimeForm = ({ onClose }) => {
  const [breakTimeStart, setBreakTimeStart] = useState('');
  const [breakTimeEnd, setBreakTimeEnd] = useState('');
  const [breakTimeRemark, setBreakTimeRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'breakTimeStart') setBreakTimeStart(value);
    if (name === 'breakTimeEnd') setBreakTimeEnd(value);
    if (name === 'breakTimeReason') setBreakTimeRemark(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!breakTimeStart || !breakTimeEnd) {
      setError('Please fill in both break time start and end.');
      return;
    }

    if (breakTimeStart >= breakTimeEnd) {
      setError('Break Time Start must be before Break Time End.');
      return;
    }

    setIsSubmitting(true);
    setError(null); // Reset error

    try {
      const response = await fetch(`${API_BASE_URL}/breakTime`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          breakTimeStart,
          breakTimeEnd,
          breakTimeRemark,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save break time');
      }

      const data = await response.json();
      toast.success('Break time saved successfully!');
      setBreakTimeStart('');
      setBreakTimeEnd('');
      setBreakTimeRemark('');
      onClose();
    } catch (err) {
      toast.error(err.message || 'Something went wrong!');
    } 
  };

  return (
    <div className="add-break-time">
      <h3 className="add-break-time__heading">Add Break Time</h3>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="add-break-time__group">
          <FloatingInput
           type="time"
           label={"Break Time Start"}
          name="breakTimeStart"
          className="add-break-time__input"
          placeholder="Enter break time start"
          value={breakTimeStart}
          onChange={handleInputChange}
          />
        </div>

        <div className="add-break-time__group">
          <FloatingInput
          type="time"
          label={"Break Time End"}
          id="breakTimeEnd"
          name="breakTimeEnd"
          className="add-break-time__input"
          placeholder="Enter break time end"
          value={breakTimeEnd}
          onChange={handleInputChange}
          />
        </div>

        <div className="add-break-time__group">
          <FloatingTextarea
          label={"Reason for Break"}
          id="breakTimeReason"
          name="breakTimeReason"
          value={breakTimeRemark}
          onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="add-break-time__button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default BreakTimeForm;
