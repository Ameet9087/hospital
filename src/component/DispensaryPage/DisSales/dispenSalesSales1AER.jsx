// import React, { useState } from 'react';
// import "../DisSales/dispenSalesSales1AER.css";

// const AddExternalReferral = ({onClose}) => {
//     const [isIncentiveApplicable, setIsIncentiveApplicable] = useState(true);
//     const [isActive, setIsActive] = useState(true);

//     return (
//         <div className="addExternalReferral-modal-container">
//             <div className="addExternalReferral-modal-header">
//                 <h2>Add External Referral</h2>
//                 <button className="addExternalReferral-close-button" onClick={onClose}>X</button>
//             </div>
//             <div className="addExternalReferral-modal-body">
//                 <form>
//                     <div className="addExternalReferral-form-group">
//                         <label>Referrer Name <span>*</span></label>
//                         <input type="text" placeholder="Referrer Name" required />
//                     </div>
//                     <div className="addExternalReferral-form-group">
//                         <label>Address</label>
//                         <input type="text" placeholder="Address" />
//                     </div>
//                     <div className="addExternalReferral-form-group">
//                         <label>Contact Number<span>*</span></label>
//                         <input type="text" placeholder="Contact Number" required />
//                     </div>
//                     <div className="addExternalReferral-form-group">
//                         <label>Email</label>
//                         <input type="email" placeholder="Email" />
//                     </div>
//                     <div className="addExternalReferral-form-group">
//                         <label>KRA PIN</label>
//                         <input type="text" placeholder="KRA PIN" />
//                     </div>
//                     <div className="addExternalReferral-form-group">
//                         <label>KMPDC NO</label>
//                         <input type="text" placeholder="KMPDC NO" />
//                     </div>
//                     <div className="addExternalReferral-form-group">
//                         <label>TDS Percent</label>
//                         <input type="number" placeholder="0" defaultValue="0" />
//                     </div>
//                     <div className="addExternalReferral-form-group">
//                         <label>Is Incentive Applicable</label>
//                         <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
//                         <span>{isIncentiveApplicable ? "True" : "False"}</span>
//                     </div>
//                     <div className="addExternalReferral-form-group">
//                         <label>Is Active</label>
//                         <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
//                         <span>True</span>
//                     </div>
//                     <div className="addExternalReferral-form-actions">
//                         <button  type="submit">Add</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddExternalReferral;



import React, { useState } from 'react';
import "../DisSales/dispenSalesSales1AER.css";

const AddExternalReferral = ({ onClose }) => {
    const [formData, setFormData] = useState({
        referralName: '',
        referralAddress: '',
        referralNumber: '',
        referralEmail: '',
        pinCode: '',
        kmpdcNumber: '',
        tdcPercent: 0,
        incentiveApplicable: true,
        active: true,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:1415/api/hospital/save-external-referral", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("External referral added successfully!");
                setFormData({
                    referralName: '',
                    referralAddress: '',
                    referralNumber: '',
                    referralEmail: '',
                    pinCode: '',
                    kmpdcNumber: '',
                    tdcPercent: 0,
                    incentiveApplicable: true,
                    active: true,
                    
                });
            } else {
                alert("Failed to add external referral.");
            }
        } catch (error) {
            console.error("Error occurred while adding external referral:", error);
            console.log(formData);
        }
    };

    return (
        <div className="addExternalReferral-modal-container">
            <div className="addExternalReferral-modal-header">
                <h2>Add External Referral</h2>
                <button className="addExternalReferral-close-button" onClick={onClose}>x</button>
            </div>
            <div className="addExternalReferral-modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="addExternalReferral-form-group">
                        <label>Referrer Name <span>*</span></label>
                        <input type="text" name="referralName" placeholder="Referrer Name" value={formData.referralName} onChange={handleInputChange} required />
                    </div>
                    <div className="addExternalReferral-form-group">
                        <label>Address</label>
                        <input type="text" name="referralAddress" placeholder="Address" value={formData.referralAddress} onChange={handleInputChange} />
                    </div>
                    <div className="addExternalReferral-form-group">
                        <label>Contact Number<span>*</span></label>
                        <input type="text" name="referralNumber" placeholder="Contact Number" value={formData.referralNumber} onChange={handleInputChange} required />
                    </div>
                    <div className="addExternalReferral-form-group">
                        <label>Email</label>
                        <input type="email" name="referralEmail" placeholder="Email" value={formData.referralEmail} onChange={handleInputChange} />
                    </div>
                    <div className="addExternalReferral-form-group">
                        <label>KRA PIN</label>
                        <input type="text" name="pinCode" placeholder="KRA PIN" value={formData.pinCode} onChange={handleInputChange} />
                    </div>
                    <div className="addExternalReferral-form-group">
                        <label>KMPDC NO</label>
                        <input type="text" name="kmpdcNumber" placeholder="KMPDC NO" value={formData.kmpdcNumber} onChange={handleInputChange} />
                    </div>
                    <div className="addExternalReferral-form-group">
                        <label>TDS Percent</label>
                        <input type="number" name="tdcPercent" placeholder="0" value={formData.tdcPercent} onChange={handleInputChange} />
                    </div>
                    <div className="addExternalReferral-form-group">
                        <label>Is Incentive Applicable</label>
                        <input type="checkbox" name="incentiveApplicable" checked={formData.incentiveApplicable} onChange={handleInputChange} />
                        <span>{formData.incentiveApplicable ? "True" : "False"}</span>
                    </div>
                    <div className="addExternalReferral-form-group">
                        <label>Is Active</label>
                        <input type="checkbox" name="active" checked={formData.active} onChange={handleInputChange} />
                        <span>{formData.active ? "True" : "False"}</span>
                    </div>
                    <div className="addExternalReferral-form-actions">
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddExternalReferral;
