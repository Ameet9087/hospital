/* Ravindra_Sanap_PerformanceEvaluation.jsx_04_10_2024_Start */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPerformancePopup from './AddPerformancePopup';
import './PerformanceEvaluation.css';

function PerformanceEvaluation() {
    const [evaluations, setEvaluations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const evaluationsPerPage = 10;

    useEffect(() => {
        fetchEvaluations();
    }, []);

    const fetchEvaluations = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/performance/getall');
            setEvaluations(response.data);
        } catch (error) {
            console.error('Error fetching evaluation data:', error);
        }
    };

    const handleAddClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAddEvaluation = async (newEvaluation) => {
        try {
            const response = await axios.post('http://localhost:8086/api/performance/add', newEvaluation);
            setEvaluations([...evaluations, response.data]);
        } catch (error) {
            console.error('Error adding evaluation:', error);
        }
    };

    const filteredEvaluations = evaluations.filter((evaluation) =>
        evaluation.employee.empName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEvaluation = currentPage * evaluationsPerPage;
    const indexOfFirstEvaluation = indexOfLastEvaluation - evaluationsPerPage;
    const currentEvaluations = filteredEvaluations.slice(indexOfFirstEvaluation, indexOfLastEvaluation);
    const totalPages = Math.ceil(evaluations.length / evaluationsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="performance-evaluation-container">
            <div className="performance-header">
                <h2>Performance Evaluations</h2>
                <button className="performance-button" onClick={handleAddClick}>
                    Add Performance
                </button>
            </div>

            <div className="employee-searchAndActions">
                <input
                    type="text"
                    placeholder="Search By Employee Name"
                    className="employee-searchInput"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>


            {showPopup && (
                <AddPerformancePopup
                    onClose={handleClosePopup}
                    onAdd={handleAddEvaluation}
                />
            )}

            <table className="evaluation-table">
                <thead>
                    <tr>
                        <th>EMP. ID</th>
                        <th>EMP Name</th>
                        <th>Evaluation Date</th>
                        <th>Evaluator Name</th>
                        <th>Score</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEvaluations.length === 0 ? (
                        <tr>
                            <td className='nodatatoshow' colSpan="6" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
                        </tr>
                    ) : (
                        currentEvaluations.map((evaluation) => (
                            <tr key={evaluation.evaluationId}>
                                <td>{evaluation.employee.empId}</td>
                                <td>{evaluation.employee.empName}</td>
                                <td>{evaluation.evaluationDate}</td>
                                <td>{evaluation.evaluatorName}</td>
                                <td>{evaluation.score}</td>
                                <td>{evaluation.feedback}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={prevPage} className={currentPage === 1 ? 'disabled' : ''} disabled={currentPage === 1}>
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={nextPage} className={currentPage === totalPages ? 'disabled' : ''} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PerformanceEvaluation;



/* Ravindra_Sanap_PerformanceEvaluation.jsx_04_10_2024_End */
