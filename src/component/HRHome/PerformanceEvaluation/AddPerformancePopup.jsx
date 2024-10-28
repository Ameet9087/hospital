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
       

        <div className="addperformance__overlay">
            <div className="addperformance__popup">
                <div className="addperformance__header">
                    <h2>Add Performance Evaluation</h2>
                    <button
                        onClick={onClose}
                        className="addperformance__closeButton"
                    >
                        X
                    </button>
                </div>
                <form className="addperformance__form" onSubmit={handleSubmit}>
                    <div className="addperformance__formGroup">
                        <label>
                            Employee ID: </label>
                        <input
                            type="number"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                        />

                    </div>
                    <div className="addperformance__formGroup">
                        <label>
                            Evaluation Date:</label>
                        <input
                            type="date"
                            value={evaluationDate}
                            onChange={(e) => setEvaluationDate(e.target.value)}
                            required
                        />

                    </div>
                    <div className="addperformance__formGroup">
                        <label>
                            Evaluator Name: </label>
                        <input
                            type="text"
                            value={evaluatorName}
                            onChange={(e) => setEvaluatorName(e.target.value)}
                            required
                        />

                    </div>
                    <div className="addperformance__formGroup">
                        <label>
                            Feedback: </label>
                        <input
                            type='text'
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        />

                    </div>
                    <div className="addperformance__formGroup">
                        <label>
                            Score:  </label>
                        <input
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            required
                            min="1"
                            max="10"
                        />

                    </div>


                    <div className="addperformance__formActions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit">Register</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default AddPerformancePopup;


/* Ravindra_Sanap_AddPerformancePopup.jsx_04_10_2024_End */
