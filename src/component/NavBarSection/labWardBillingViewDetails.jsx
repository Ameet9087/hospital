import React from 'react';
// import '../NavBarSection/NavBarSection';
import "../NavBarSection/labWardBillingViewDetails.css"
function LabWardBillingViewDetails({ patient, onClose }) {
    return (
        <div className="labWardBilling-container">
            <div className="labWardBilling-header">
                <h2>Lab Tests Orders of {patient.name} (Patient Number: {patient.hospitalNo})</h2>
                <button className="close-btn"onClick={onClose}>×</button>
            </div>
            <div className="labWardBilling-patient-info">
                <span>Ward/Bed: {patient.wardBed}</span>
                <span>Admitting Doctor: {patient.admittingDoctor}</span>
                <span>Admitted On: {patient.admittedDate}</span>
            </div>
            <div className="labWardBilling-no-test">
                <span>No Test For Current InPatient</span>
            </div>
            <div className="labWardBilling-table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Department</th>
                            <th>Prescriber</th>
                            <th>Performer</th>
                            <th>ItemName</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><button className="delete-btn">×</button></td>
                            <td><input type="text" placeholder="Enter Department" /></td>
                            <td><input type="text" placeholder="Enter Name" /></td>
                            <td><input type="text" placeholder="Enter Name" /></td>
                            <td><input type="text" placeholder="Enter Item Name" /></td>
                            <td><input type="number" value="1" /></td>
                            <td><input type="number" value="0" /></td>
                            <td><button className="add-btn">+</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="labWardBilling-request">
                <button className="request-btn">Request</button>
            </div>
        </div>
    );
}

export default LabWardBillingViewDetails;
