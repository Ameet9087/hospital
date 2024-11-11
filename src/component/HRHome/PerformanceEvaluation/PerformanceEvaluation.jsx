/* Ravindra_Sanap_PerformanceEvaluation.jsx_04_10_2024_Start */


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AddPerformancePopup from './AddPerformancePopup';
import * as XLSX from 'xlsx'; // Import XLSX
import './PerformanceEvaluation.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';


function PerformanceEvaluation() {
    const [evaluations, setEvaluations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const evaluationsPerPage = 10;
    const tableRef = useRef(null);
    const [columnWidths, setColumnWidths] = useState([80, 150, 150, 150, 50, 200]);

    const { success, warning, error, CustomAlerts } = useCustomAlert();


    useEffect(() => {
        fetchEvaluations();
    }, []);

    const fetchEvaluations = async () => {
        try {
            const response = await axios.get('http://localhost:8086/api/performance/getall');
            setEvaluations(response.data);


        } catch (error) {
            console.error('Error fetching evaluation data:', error);
            warning('Failed to Fetch Performance');

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
            success('Performance Added Successfully');

        } catch (error) {
            console.error('Error adding evaluation:', error);
            warning('Failed to Add Performance');

        }
    };

    const filteredEvaluations = evaluations.filter((evaluation) =>
        evaluation.employee.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.evaluatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.evaluationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.score.toString().includes(searchTerm) ||
        evaluation.feedback.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEvaluation = currentPage * evaluationsPerPage;
    const indexOfFirstEvaluation = indexOfLastEvaluation - evaluationsPerPage;
    const currentEvaluations = filteredEvaluations.slice(indexOfFirstEvaluation, indexOfLastEvaluation);
    const totalPages = Math.ceil(filteredEvaluations.length / evaluationsPerPage);

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

    const exportToExcel = () => {
        if (filteredEvaluations.length === 0) {
            alert("No data available for export.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(filteredEvaluations);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Evaluations");
        XLSX.writeFile(workbook, "Performance_Evaluations.xlsx");
    };

    const printTable = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Evaluations</title>
                <link rel="stylesheet" href="path/to/your/PerformanceEvaluation.css"> <!-- Update this path -->
            </head>
            <body>
                <h2>Performance Evaluations</h2>
                <table>
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
                        ${currentEvaluations.map(evaluation => `
                            <tr>
                                <td>${evaluation.employee.empId}</td>
                                <td>${evaluation.employee.empName}</td>
                                <td>${evaluation.evaluationDate}</td>
                                <td>${evaluation.evaluatorName}</td>
                                <td>${evaluation.score}</td>
                                <td>${evaluation.feedback}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        
        <div className="performance-evaluation-container">
            <div className="performance-header">
                <button className="performance-button" onClick={handleAddClick}>
                    Add Performance
                </button>
                <h2>Performance Evaluations</h2>
                <CustomAlerts />


            </div>

            <div className="performance-evaluation-search-N-results">
                <div className="performance-evaluation-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="performance-evaluation-searchInput"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>


                <div className="performance-evaluation-results-info">
                    Showing {currentEvaluations.length} / {filteredEvaluations.length} results
                    <button
                        className="performance-evaluation-ex-pri-buttons"
                        onClick={exportToExcel}
                    >
                        <i className="fa-regular fa-file-excel"></i> Export
                    </button>
                    <button className="performance-evaluation-ex-pri-buttons" onClick={printTable}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>
          

            {showPopup && (
                <AddPerformancePopup
                    onClose={handleClosePopup}
                    onAdd={handleAddEvaluation}
                />
            )}

            <div className="table-container">
                <table className='evaluation-table' ref={tableRef}>
                    <thead>
                        <tr>
                            {[
                                "EMP. ID",
                                "EMP Name",
                                "Evaluation Date",
                                "Evaluator Name",
                                "Score",
                                "Feedback",
                            ].map((header, index) => (
                                <th
                                    key={index}
                                    style={{ width: columnWidths[index] }}
                                    className="resizable-th"
                                >
                                    <div className="header-content">
                                        <span>{header}</span>
                                        <div
                                            className="resizer"
                                            onMouseDown={(e) => startResizing(e, tableRef, setColumnWidths)(index)}
                                        ></div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvaluations.length === 0 ? (
                            <tr>
                                <td className='nodatatoshow' colSpan="6" style={{ textAlign: 'center' }}>
                                    No data to show
                                </td>
                            </tr>
                        ) : (
                            currentEvaluations.map((evaluation, index) => (
                                <tr key={index}>
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
            </div>

            <div className="HRpagination">
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
