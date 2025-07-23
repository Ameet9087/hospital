import React, { useState } from 'react';
import './DistchargeFromNurse.css';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DistchargeFromNurse({ onClose, show }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(show);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose(); // Close the modal
        navigate('/DischargeSummary'); // Navigate back to the DischargeSummary page
    };

    return (
        <>
            <Modal show onHide={closeModal} size="lg" className="dist-custom-modal">
                <Modal.Header closeButton>
                    <h2>Discharge Summary</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="dist-container">
                        {/* Header Section */}
                        <header className="dist-distcharge-header">
                            <div className="dist-patient-header">
                                <h2>Aakash Pathan</h2>
                                <div className="dist-patient-details">
                                    <div>
                                        <p><strong>Address:</strong> Pune</p>
                                        <p><strong>Hospital No:</strong> 240008307</p>
                                        <p><strong>Admitted On:</strong> 2024-08-24 02:51 AD</p>
                                        <p><strong>Discharged On:</strong> -</p>
                                    </div>
                                    <div>
                                        <p><strong>Contact No:</strong> 838288382</p>
                                        <p><strong>InPatient No:</strong> H240007</p>
                                        <p><strong>Ward:</strong> Male Ward</p>
                                    </div>
                                    <div>
                                        <p><strong>Guardian:</strong> Sanjay Pathan | Son</p>
                                        <p><strong>Bed Number:</strong> 001</p>
                                    </div>
                                    <div>
                                        <p>25 Y/Male</p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Form Section */}
                        <form className="dist-form">
                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Discharge Type:</label>
                                    <select>
                                        <option value="Not Improved">Not Improved</option>
                                    </select>
                                </div>
                                <div className="dist-form-group">
                                    <label>Treatment During Hospital Stay:</label>
                                    <textarea rows="3"></textarea>
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Consultant:</label>
                                    <input type="text" placeholder="Consultant: name" />
                                </div>
                                <div className="dist-form-group">
                                    <label>Condition On Discharge:</label>
                                    <textarea rows="3"></textarea>
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Doctor Incharge:</label>
                                    <input type="text" placeholder="Dr. VICTOR OCHEING OKECH" readOnly />
                                </div>
                                <div className="dist-form-group">
                                    <label>Pending Reports:</label>
                                    <textarea rows="3"></textarea>
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Anesthetists:</label>
                                    <input type="text" placeholder="Anesthetists: name" />
                                </div>
                                <div className="dist-form-group">
                                    <label>Special Notes:</label>
                                    <textarea rows="3"></textarea>
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Resident Dr:</label>
                                    <input type="text" placeholder="Dr. VICTOR OCHEING OKECH" />
                                </div>
                                <div className="dist-form-group">
                                    <label>Allergies:</label>
                                    <textarea rows="3"></textarea>
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Select Diagnosis:</label>
                                    <input type="text" placeholder="Select ICD-11(a) for Provisional Diagnosis" />
                                </div>
                                <div className="dist-form-group">
                                    <label>Discharge Order:</label>
                                    <textarea rows="3"></textarea>
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Provisional Diagnosis:</label>
                                    <input type="text" placeholder="Select ICD-11(b) for Provisional Diagnosis" />
                                </div>
                                <div className="dist-form-group">
                                    <label>Activities:</label>
                                    <input type="text" placeholder="Activities" />
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Other Diagnosis:</label>
                                    <input type="text" placeholder="Enter Other Diagnosis" />
                                </div>
                                <div className="dist-form-group">
                                    <label>Diet:</label>
                                    <input type="text" placeholder="Diet" />
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Clinical Findings:</label>
                                    <textarea rows="3" placeholder="Clinical Findings"></textarea>
                                </div>
                                <div className="dist-form-group">
                                    <label>Rest Days:</label>
                                    <input type="text" placeholder="Rest Days" />
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Chief Complain:</label>
                                    <textarea rows="3" placeholder="Chief Complain"></textarea>
                                </div>
                                <div className="dist-form-group">
                                    <label>Follow UP:</label>
                                    <input type="text" placeholder="Follow UP" />
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>History Of Presenting Illness:</label>
                                    <textarea rows="3" placeholder="History Of Presenting Illness"></textarea>
                                </div>
                                <div className="dist-form-group">
                                    <label>Others:</label>
                                    <input type="text" placeholder="Others" />
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Past History:</label>
                                    <textarea rows="3" placeholder="Past History"></textarea>
                                </div>
                                <div className="dist-form-group">
                                    <label>CheckedBy:</label>
                                    <input type="text" placeholder="CheckedBy: name" />
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Case Summary:</label>
                                    <textarea rows="3" placeholder="Case Summary"></textarea>
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group">
                                    <label>Procedure:</label>
                                    <textarea rows="3" placeholder="Procedure"></textarea>
                                </div>
                            </div>

                            <div className="dist-form-row">
                                <div className="dist-form-group full-width">
                                    <div className="dist-medications">
                                        <label>Medications:</label>
                                        <input type="text" placeholder="Enter Medicines" />
                                        <button className="dist-add-button">+</button>
                                        <button className="dist-remove-button">x</button>
                                    </div>
                                </div>
                            </div>

                            <div className="dist-form-actions">
                                <button type="submit" className="dist-submit-button">Submit and Print Summary</button>
                                <button type="button" className="dist-update-button">Update</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DistchargeFromNurse;
