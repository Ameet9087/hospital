import React, { useState, useEffect } from "react";
import "./AddPerformancePopup.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../FloatingInputs";
import { toast } from "react-toastify";
function AddPerformancePopup({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        employeeDTO: { employeeId: "" },
    });
    const [evaluationDate, setEvaluationDate] = useState("");
    const [evaluatorName, setEvaluatorName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState("");
    const [employees, setEmployees] = useState([]);

    // Fetch employees when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvaluation = {
            evaluationDate,
            evaluatorName,
            feedback,
            score: parseInt(score, 10), // Convert score to a number
            employeeDTO: {
                employeeId: parseInt(formData.employeeDTO.employeeId, 10), // Ensure employeeId is a number
            },
        };
        onAdd(newEvaluation);
        onClose();
    };

    const handleEmployeeChange = (e) => {
        const employeeId = e.target.value;
        setFormData({
            ...formData,
            employeeDTO: {
                employeeId: Number(employeeId), // Convert to number if required by backend
            },
        });
    };

    return (
        <div className="addperformance__overlay">
            <div className="addperformance__popup">
                <div className="addperformance__header">
                    <h2>Add Performance Evaluation</h2>
                    <button onClick={onClose} className="addperformance__closeButton">
                        X
                    </button>
                </div>
                <form className="addperformance__form" onSubmit={handleSubmit}>
                    <div className="addperformance__formGroup">
                    <FloatingSelect
    label="Employee"
    name="employeeId"
    value={formData.employeeDTO.employeeId || ""}
    onChange={handleEmployeeChange}
    options={[
        { value: "", label: "Select Employee", disabled: true },
        ...employees.map((employee) => ({
            value: employee.employeeId,
            label: `${employee.firstName} ${employee.lastName}`,
        })),
    ]}
    placeholder="Select Employee"
/>

                        
                    </div>
                    <div className="addperformance__formGroup">
                        <FloatingInput
                        label={"Evaluation Date"}
                        type="date"
                            value={evaluationDate}
                            onChange={(e) => setEvaluationDate(e.target.value)}
                            required/>
                        
                    </div>
                    <div className="addperformance__formGroup">
                        <FloatingInput
                        label={"Evaluator Name"}
                        type="text"
                            value={evaluatorName}
                            onChange={(e) => setEvaluatorName(e.target.value)}
                            required/>
                        
                    </div>
                    <div className="addperformance__formGroup">
                        <FloatingInput
                        label={"Feedback"}
                        type="text"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required/>
                        
                    </div>
                    <div className="addperformance__formGroup">
                        <FloatingInput
                        label={"Score"}
                        type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            required
                            min="1"
                            max="10"/>
                        
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
