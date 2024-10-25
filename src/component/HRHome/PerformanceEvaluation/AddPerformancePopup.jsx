/* Ravindra_Sanap_AddPerformancePopup.jsx_04_10_2024_Start */


import React, { useState } from 'react';
import './AddPerformancePopup.css';

function AddPerformancePopup({ onClose, onAdd }) {
    const [employeeId, setEmployeeId] = useState('');
    const [evaluationDate, setEvaluationDate] = useState('');
    const [evaluatorName, setEvaluatorName] = useState('');
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvaluation = {
            employeeId,
            evaluationDate,
            evaluatorName,
            feedback,
            score,
        };
        onAdd(newEvaluation);
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="addperformanceclose-popup" onClick={onClose}>X</button>

                <h2>Add Performance Evaluation</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Employee ID:
                        <input
                            type="number"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Evaluation Date:
                        <input
                            type="date"
                            value={evaluationDate}
                            onChange={(e) => setEvaluationDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Evaluator Name:
                        <input
                            type="text"
                            value={evaluatorName}
                            onChange={(e) => setEvaluatorName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Feedback:
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Score:
                        <input
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            required
                            min="1"
                            max="10"
                        />
                    </label>
                    <button className='actionbtns' type="submit">Add Evaluation</button>
                    <button className='actionbtns' type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddPerformancePopup;


/* Ravindra_Sanap_AddPerformancePopup.jsx_04_10_2024_End */
