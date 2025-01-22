import React, { useEffect } from 'react';
import './ProvisionalSaleForm.css';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { API_BASE_URL } from '../../../api/api';
import PopupTable from '../../../Admission/PopupTable';

const ProvisionalSaleForm = () => {


    const [formData, setFormData] = useState({
        saleDate: "",
        writeDownValue: "",
        saleType: "Sales",
        manualSaleBillNo: "",
        remarks: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [activePopup, setActivePopup] = useState("")


    const [disposals, setdisposals] = useState([]);
    const [selectedDisposal, setselectedDisposal] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/condemnation-disposals`)
            .then((response) => response.json())
            .then((data) => {
                setdisposals(data); // Assuming data is an array of complaint objects

            })
            .catch((error) => console.error("Error fetching PO numbers:", error));
    }, []);

    const handleDisposalChange = (event) => {
        const selectedDisposalId = event.target.value;
        setselectedDisposal(selectedDisposalId);
    }

    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/vendors/getAllVendors`)
            .then((response) => response.json())
            .then((data) => {
                setVendors(data); // Assuming data is an array of complaint objects

            })
            .catch((error) => console.error("Error fetching PO numbers:", error));
    }, []);

    const handleVendorChange = (event) => {
        const selectedVendorId = event.target.value;
        setSelectedVendor(selectedVendorId);
    }


    const getPopupData = () => {
        if (activePopup === "disposal") {
            return {
                columns: ["condemnationDisposalId", "remarks"], data: disposals
            };
        }
        else if (activePopup === "vendor") {
            return {
                columns: ["id", "vendorName"], data: vendors
            };
        }
        else {
            return { columns: [], data: [] };
        }
    };

    const { columns, data } = getPopupData();

    const handleSelect = async (data) => {
        if (activePopup === "disposal") {
            setselectedDisposal(data);
        } else if (activePopup === "vendor") { // Corrected typo here
            setSelectedVendor(data);
        }

        setActivePopup(null); // Close the popup after selection
    };


    const handleAdd = async () => {
        const payload = {
            ...formData,
            condemnationDisposalDTO: {
                condemnationDisposalId: selectedDisposal?.condemnationDisposalId,
            },
            vendorDTO: {
                id: selectedVendor?.id,
            },
        };



        try {
            const response = await fetch(`${API_BASE_URL}/provisional-sales`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Provisional Sale added successfully!");
                setFormData({
                    saleDate: "",
                    writeDownValue: "",
                    saleType: "Sales",
                    manualSaleBillNo: "",
                    remarks: "",
                });
                setselectedDisposal("");
                setSelectedVendor("");
            } else {
                console.error("Error adding Provisional Sale:", await response.text());
                alert("Failed to add Provisional Sale.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding Provisional Sale.");
        }
    };


    return (
        <div className="provisional-sale-container">
            <div className="provisional-sale-header">
                <h1>Provisional Sale (Fixed Assets)</h1>
            </div>

            <div className="provisional-sale-form">
                <div className="provisional-sale-form-grid">
                    <div className="provisional-sale-form-col">

                        <div className="provisional-sale-form-group">
                            <label>Condemnation No</label>
                            <div className="provisional-sale-input-container">
                                <input type="text" value={selectedDisposal?.condemnationDisposalId} className="provisional-sale-form-input" />
                                <SearchIcon onClick={() => setActivePopup("disposal")} className="provisional-sale-input-icon" size={16} />
                            </div>
                        </div>

                        <div className="provisional-sale-form-group">
                            <label>Sale Date</label>
                            <div className="provisional-sale-input-container">
                                <input type="date" name='saleDate' className="provisional-sale-form-input" onChange={handleInputChange} />
                            </div>
                        </div>


                        <div className="provisional-sale-form-group">
                            <label>Condemnation Date</label>
                            <div className="provisional-sale-input-container">
                                <input
                                    type="text"
                                    className="provisional-sale-form-input"
                                    value={selectedDisposal?.condemDate}
                                />
                            </div>
                        </div>

                        <div className="provisional-sale-form-group">
                            <label>Equipment Name</label>
                            <div className="provisional-sale-input-container">
                                <input type="text" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentName} className="provisional-sale-form-input" />
                            </div>
                        </div>
                        {activePopup && (
                            <PopupTable
                                columns={columns}
                                data={data}
                                onSelect={handleSelect}
                                onClose={() => setActivePopup(false)}
                            />
                        )}
                        <div className="provisional-sale-form-group">
                            <label>Remarks</label>
                            <div className="provisional-sale-input-container">
                                <input
                                    type="text"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleInputChange}
                                    className="provisional-sale-form-input"
                                />
                            </div>
                        </div>



                    </div>

                    <div className="provisional-sale-form-col">
                        <div className="provisional-sale-form-group">
                            <label>Buyer Name<span className="provisional-sale-required">*</span></label>
                            <div className="provisional-sale-input-container">
                                <input type="text" value={selectedVendor?.vendorName} className="provisional-sale-form-input" />
                                <SearchIcon onClick={() => setActivePopup("vendor")} className="provisional-sale-input-icon" size={16} />
                            </div>
                        </div>

                        <div className="provisional-sale-form-group">
                            <label>Purchase Amount</label>
                            <div className="provisional-sale-input-container">
                                <input type="number" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.cost} className="provisional-sale-form-input" />
                            </div>
                        </div>

                        <div className="provisional-sale-form-group">
                            <label>Write Down Value (W.D.V)</label>
                            <div className="provisional-sale-input-container">
                                <input type="text" value={formData.writeDownValue}
                                    onChange={handleInputChange} name='writeDownValue' className="provisional-sale-form-input" />
                            </div>
                        </div>

                        <div className="provisional-sale-form-group">
                            <label>Sale Type</label>
                            <div className="provisional-sale-input-container">
                                <select
                                    name="saleType"
                                    value={formData.saleType}
                                    onChange={handleInputChange}
                                    className="provisional-sale-form-input"
                                >
                                    <option value="Sales">Sales</option>
                                    <option value="Direct Sale">Direct Sale</option>
                                </select>
                            </div>
                        </div>




                    </div>

                    <div className="provisional-sale-form-col">

                        <div className="provisional-sale-form-group">
                            <label>Old Asset No</label>
                            <div className="provisional-sale-input-container">
                                <input type="text" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.oldAssetNo} className="provisional-sale-form-input" />
                            </div>
                        </div>

                        <div className="provisional-sale-form-group">
                            <label>Equipment No</label>
                            <div className="provisional-sale-input-container">
                                <input type="text" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentNo} className="provisional-sale-form-input" />
                            </div>
                        </div>
                        <div className="provisional-sale-form-group">
                            <label>Manual Sale Billno</label>
                            <div className="provisional-sale-input-container">
                                <input
                                    type="text"
                                    name="manualSaleBillNo"
                                    value={formData.manualSaleBillNo}
                                    onChange={handleInputChange}
                                    className="provisional-sale-form-input"
                                />                            </div>
                        </div>
                        <div className="provisional-sale-form-group">
                            <label>Asset No</label>
                            <div className="provisional-sale-input-container">
                                <input type="text" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.assetNo} className="provisional-sale-form-input" />
                            </div>
                        </div>



                    </div>
                    <button className='provisional-sale-add' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default ProvisionalSaleForm;
