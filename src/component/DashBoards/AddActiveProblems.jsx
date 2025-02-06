import React, { useState } from 'react';
import './AddActiveProblems.css';
import { FloatingInput } from '../../FloatingInputs';

const AddActiveProblem = () => {
  const [problem, setProblem] = useState('');
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [onsetDate, setOnsetDate] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      problem,
      isPrincipal,
      currentStatus,
      onsetDate,
      note
    });
  };

  return (
    <div className="AddActive-add-active-problem">
      <form onSubmit={handleSubmit}>
        <div className="AddActive-form-group">
          <FloatingInput
          label={"Search Problem"}
           type="text"
           id="problem"
           value={problem}
           onChange={(e) => setProblem(e.target.value)}
           required
           />
        </div>

        <div className="AddActive-form-group">
          <input
            type="checkbox"
            id="isPrincipal"
            checked={isPrincipal}
            onChange={(e) => setIsPrincipal(e.target.checked)}
          />
          <label htmlFor="isPrincipal">Mark if Principle Problem</label>
        </div>

        <div className="AddActive-form-group">
          <label htmlFor="currentStatus">Current Status:</label>
          <input
            type="text"
            id="currentStatus"
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
          />
        </div>

        <div className="AddActive-form-group">
          <label htmlFor="onsetDate">OnSet Date *</label>
          <input
            type="date"
            id="onsetDate"
            value={onsetDate}
            onChange={(e) => setOnsetDate(e.target.value)}
            required
          />
        </div>

        <div className="AddActive-form-group">
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="AddActive-add-problem-button">Add Problem</button>
      </form>
    </div>
  );
};

export default AddActiveProblem;
