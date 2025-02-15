/* Ravindra_Sanap_PerformanceEvaluation.jsx_04_10_2024_Start */

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AddPerformancePopup from './AddPerformancePopup';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx'; // Import XLSX
import './PerformanceEvaluation.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';

function PerformanceEvaluation() {
    const [evaluations, setEvaluations] = useState([]);  // Initialize as an empty array
    const [filteredEvaluations, setFilteredEvaluations] = useState([]); // Filtered data
    const [showPopup, setShowPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const tableRef = useRef(null);
    const [columnWidths, setColumnWidths] = useState([50, 100, 100, 150, 100, 80, 200]);

    const { success, warning, error, CustomAlerts } = useCustomAlert();

    useEffect(() => {
        fetchEvaluations();
    }, []);

    useEffect(() => {
        filterEvaluations();
    }, [searchTerm, evaluations]);

   

    const fetchEvaluations = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/performance-evaluation/getall`);
            if (Array.isArray(response.data)) {
                setEvaluations(response.data);
                setFilteredEvaluations(response.data);
            } else {
                warning('Fetched data is not an array');
            }
        } catch (error) {
            console.error('Error fetching evaluation data:', error);
            warning('Failed to Fetch Performance');
        }
    };

    const filterEvaluations = () => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = evaluations.filter(evaluation => {
            return (
                evaluation.evaluationDate?.toLowerCase().includes(lowerSearchTerm) ||
                evaluation.evaluatorName?.toLowerCase().includes(lowerSearchTerm) ||
                evaluation.feedback?.toLowerCase().includes(lowerSearchTerm) ||
                evaluation.score?.toString().includes(lowerSearchTerm) ||
                evaluation.employeeDTO?.firstName?.toLowerCase().includes(lowerSearchTerm) ||
                evaluation.employeeDTO?.lastName?.toLowerCase().includes(lowerSearchTerm)
            );
        });
        setFilteredEvaluations(filtered);
    };

    const handleAddClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleAddEvaluation = async (newEvaluation) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/performance-evaluation/add`, newEvaluation);
            setEvaluations([...evaluations, response.data]);
            toast.success('Performance Added Successfully');
        } catch (error) {
            console.error('Error adding evaluation:', error);
            toast.error('Failed to Add Performance');
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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Evaluation Date</th>
                            <th>Evaluator Name</th>
                            <th>Score</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredEvaluations.map(evaluation => `
                            <tr>
                                <td>${evaluation.employeeDTO.employeeId}</td>
                                <td>${evaluation.employeeDTO.firstName}</td>
                                <td>${evaluation.employeeDTO.lastName}</td>
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
                    <FloatingInput
                    label={"Search"}
                    type="text"
                    placeholder="Search..."
                    
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                    
                </div>

                <div className="performance-evaluation-results-info">
                    Showing {filteredEvaluations.length} results
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
                            {["EMP. ID", "First Name", "Last Name", "Evaluation Date", "Evaluator Name", "Score", "Feedback"].map((header, index) => (
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
                        {filteredEvaluations.length === 0 ? (
                            <tr>
                                <td className='nodatatoshow' colSpan="7" style={{ textAlign: 'center' }}>
                                    No data to show
                                </td>
                            </tr>
                        ) : (
                            filteredEvaluations.map((evaluation, index) => (
                                <tr key={index}>
                                    <td>{evaluation.employeeDTO.employeeId}</td>
                                    <td>{evaluation.employeeDTO.firstName}</td>
                                    <td>{evaluation.employeeDTO.lastName}</td>
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
        </div>
    );
}

export default PerformanceEvaluation;

/* Ravindra_Sanap_PerformanceEvaluation.jsx_04_10_2024_End */
