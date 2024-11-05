/* Ajhar Tamboli addhealthEducationPrograms.jsx 08-10-24 */

import React, { useEffect, useState } from 'react';
import "./addhealthEducationPrograms.css";

const AddhealthEducationPrograms = ({ program, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    programId: '',
    programName: '',
    targetAudience: '',
    instructorName: '',
    programDate: '',
    topicsCovered: '',
    feedback: '',
  });

  useEffect(() => {
    if (program) {
      // If a program is provided, populate the form with its data
      setFormData({
        programId: program.programId || '',
        programName: program.programName || '',
        targetAudience: program.targetAudience || '',
        instructorName: program.instructorName || '',
        programDate: program.programDate || '',
        topicsCovered: program.topicsCovered || '',
        feedback: program.feedback || '',
      });
    }
  }, [program]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData ,program);
    onClose(); // Close the popup after submission
  };

  return (
    <div className="addhealthEducationPrograms-container">
      <div className="addhealthEducationPrograms-header">
        <h3>{program ? 'Update' : 'Add'} Health Education Programs</h3>
        <button className="addhealthEducationPrograms-close-btn" onClick={onClose}>x</button>
      </div>

      <form className="addhealthEducationPrograms-form">
        <div className="addhealthEducationPrograms-form-row">
          <div className="addhealthEducationPrograms-form-group-1row">
            <div className="addhealthEducationPrograms-form-group">
              <label>Program ID<span>*</span></label>
              <input
                type="text"
                name="programId"
                value={formData.programId}
                onChange={handleChange}
                placeholder="Enter Program ID"
                required
              />
            </div>
            <div className="addhealthEducationPrograms-form-group">
              <label>Program Name<span>*</span></label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleChange}
                placeholder="Enter Program Name"
                required
              />
            </div>
          </div>
          
          <div className="addhealthEducationPrograms-form-group-1row">
            <div className="addhealthEducationPrograms-form-group">
              <label>Target Audience<span>*</span></label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="Enter Target Audience"
                required
              />
            </div>
            <div className="addhealthEducationPrograms-form-group">
              <label>Instructor Name<span>*</span></label>
              <input
                type="text"
                name="instructorName"
                value={formData.instructorName}
                onChange={handleChange}
                placeholder="Enter Instructor Name"
                required
              />
            </div>
          </div>

          <div className="addhealthEducationPrograms-form-group-1row">
           
            <div className="addhealthEducationPrograms-form-group">
              <label>Topics Covered</label>
              <input
                type="text"
                name="topicsCovered"
                value={formData.topicsCovered}
                onChange={handleChange}
                placeholder="Enter Topics Covered"
              />
            </div>
            <div className="addhealthEducationPrograms-form-group">
              <label>Feedback</label>
              <input
                type="text"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Enter Feedback"
              />
            </div>
          </div>

          <div className="addhealthEducationPrograms-form-group-1row">
           
            <div className="addhealthEducationPrograms-form-group">
              <label>Program Date</label>
              <input
                type="date"
                name="programDate"
                value={formData.programDate}
                onChange={handleChange}
                placeholder="Enter Program Date"
              />
            </div>
          </div>
        </div>

        <div className="addhealthEducationPrograms-form-actions">
          <button type="submit" className="addhealthEducationPrograms-add-btn" onClick={handleSubmit}>
            {program ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddhealthEducationPrograms;
