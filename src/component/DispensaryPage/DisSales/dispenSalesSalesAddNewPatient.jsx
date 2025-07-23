// import React from 'react';
// import '../DisSales/dispenSalesSalesAddNewPatient.css';

// const AddNewPatient = ({onClose}) => {
//     return (
//         <div className="salesAddNewPatient-modal-container">
//             <div className="salesAddNewPatient-modal-header">
//                 <h2>Add New Patient</h2>
//                 <button className="salesAddNewPatient-close-button"onClick={onClose}>X</button>
//             </div>
//             <div className="salesAddNewPatient-modal-body">
//                 <form>
//                     <div className="salesAddNewPatient-form-row">
//                         <div className="salesAddNewPatient-form-group">
//                             <label>First Name<span>*</span></label>
//                             <input type="text" placeholder="First Name" required />
//                         </div>
//                         <div className="salesAddNewPatient-form-group">
//                             <label>Contact Number</label>
//                             <input type="text" placeholder="Contact Number" />
//                         </div>
//                     </div>
//                     <div className="salesAddNewPatient-form-row">
//                         <div className="salesAddNewPatient-form-group">
//                             <label>Middle Name</label>
//                             <input type="text" placeholder="Middle Name" />
//                         </div>
//                         <div className="salesAddNewPatient-form-group">
//                             <label>Country<span>*</span></label>
//                             <select>
//                                 <option>Kenya</option>
//                                 {/* Add more countries if needed */}
//                             </select>
//                         </div>
//                     </div>
//                     <div className="salesAddNewPatient-form-row">
//                         <div className="salesAddNewPatient-form-group">
//                             <label>Last Name<span>*</span></label>
//                             <input type="text" placeholder="Last Name" required />
//                         </div>
//                         <div className="salesAddNewPatient-form-group">
//                             <label>County<span>*</span></label>
//                             <input type="text" placeholder="Juja sub county" required />
//                         </div>
//                     </div>
//                     <div className="salesAddNewPatient-form-row">
//                         <div className="salesAddNewPatient-form-group">
//                             <label>Gender<span>*</span></label>
//                             <select>
//                                 <option>--select--</option>
//                                 <option>Male</option>
//                                 <option>Female</option>
//                                 {/* Add more gender options if needed */}
//                             </select>
//                         </div>
//                         <div className="salesAddNewPatient-form-group">
//                             <label>Address</label>
//                             <input type="text" placeholder="Address" />
//                         </div>
//                     </div>
//                     <div className="salesAddNewPatient-form-row">
//                         <div className="salesAddNewPatient-form-group">
//                             <label>Age<span>*</span></label>
//                             <div className="salesAddNewPatient-age-group">
//                                 <input type="number" placeholder="Age" required />
//                                 <select>
//                                     <option>Years</option>
//                                     <option>Months</option>
//                                     <option>Days</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="salesAddNewPatient-form-group">
//                             <label>KRA PIN</label>
//                             <input type="text" placeholder="KRA PIN" />
//                         </div>
//                     </div>
//                     <div className="salesAddNewPatient-form-actions">
//                         <button type="submit" className="salesAddNewPatient-ok-button">OK</button>
//                         <button type="button" className="salesAddNewPatient-close-button"onClick={onClose}>Close</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddNewPatient;

import React, { useState } from 'react';
import '../DisSales/dispenSalesSalesAddNewPatient.css';

const AddNewPatient = ({ onClose, counterId }) => {
    // State to manage form data
    const [patientData, setPatientData] = useState({
        patientName: '',
        patientMiddleName: '',
        patientLastName: '',
        gender: '',
        age: '',
        contactNumber: '',
        country: 'Kenya',
        address: '',
        pinCode: '',
        counterId: counterId // Assume this is passed as a prop
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:1415/api/hospital/save-out-patient/1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patientData)
            });

            if (response.ok) {
                const savedPatient = await response.json();
                console.log('Patient saved successfully:', savedPatient);
                onClose(); // Close modal after successful save
            } else {
                console.error('Failed to save patient');
            }
        } catch (error) {
            console.error('Error while saving patient:', error);
        }
    };

    return (
        <div className="salesAddNewPatient-modal-container">
            <div className="salesAddNewPatient-modal-header">
                <h2>Add New Patient</h2>
                <button className="salesAddNewPatient-close-button" onClick={onClose}>X</button>
            </div>
            <div className="salesAddNewPatient-modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="salesAddNewPatient-form-row">
                        <div className="salesAddNewPatient-form-group">
                            <label>First Name<span>*</span> </label>
                            <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <input 
                                type="text" 
                                name="patientName"
                                placeholder="First Name" 
                                value={patientData.patientName}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="salesAddNewPatient-form-group">
                            <label>Contact Number</label>
                            <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <input 
                                type="text" 
                                name="contactNumber"
                                placeholder="Contact Number" 
                                value={patientData.contactNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="salesAddNewPatient-form-row">
                        <div className="salesAddNewPatient-form-group">
                            <label>Middle Name</label>
                        <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <input 
                                type="text" 
                                name="patientMiddleName"
                                placeholder="Middle Name" 
                                value={patientData.patientMiddleName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="salesAddNewPatient-form-group">
                            <label>Country<span>*</span></label>
                            <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <select 
                                name="country" 
                                value={patientData.country} 
                                onChange={handleChange}>
                                <option>Kenya</option>
                                {/* Add more countries if needed */}
                            </select>
                        </div>
                    </div>
                    <div className="salesAddNewPatient-form-row">
                        <div className="salesAddNewPatient-form-group">
                            <label>Last Name<span>*</span></label>
                        <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <input 
                                type="text" 
                                name="patientLastName"
                                placeholder="Last Name" 
                                value={patientData.patientLastName}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="salesAddNewPatient-form-group">
                            <label>County<span>*</span></label>
                            <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <input 
                                type="text" 
                                name="county"
                                placeholder="Juja sub county" 
                                value={patientData.country}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    <div className="salesAddNewPatient-form-row">
                        <div className="salesAddNewPatient-form-group">
                            <label>Gender<span>*</span></label>
                            <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <select 
                                name="gender" 
                                value={patientData.gender} 
                                onChange={handleChange} 
                                required>
                                <option value="">--select--</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div className="salesAddNewPatient-form-group">
                            <label>Address</label>
                            <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <input 
                                type="text" 
                                name="address"
                                placeholder="Address" 
                                value={patientData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="salesAddNewPatient-form-row">
                        <div className="salesAddNewPatient-form-group">
                            <label>Age<span>*</span></label>
                            <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <div className="salesAddNewPatient-age-group">
                                <input 
                                    type="number" 
                                    name="age"
                                    placeholder="Age" 
                                    value={patientData.age}
                                    onChange={handleChange}
                                    required 
                                />
                                <select>
                                    <option>Years</option>
                                    <option>Months</option>
                                    <option>Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="salesAddNewPatient-form-group">
                            <label>KRA PIN</label>
                            <span className="salesAddNewPatient-form-group-spandot">:</span>
                            <input 
                                type="text" 
                                name="pinCode"
                                placeholder="KRA PIN" 
                                value={patientData.pinCode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="salesAddNewPatient-form-actions">
                        <button type="submit" className="salesAddNewPatient-ok-button">OK</button>
                        <button type="button" className="salesAddNewPatient-close-buttontxt" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewPatient;


