import React, { useEffect } from 'react';
import './ProvisionalSaleForm.css';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { API_BASE_URL } from '../../../api/api';
import PopupTable from '../../../Admission/PopupTable';
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";
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
                toast.success("Provisional Sale added successfully!");
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
                toast.error("Error adding Provisional Sale:", await response.text());
                console.error("Failed to add Provisional Sale.");
            }
        } catch (error) {
            toast.error("Error:", error);
            console.error("Error adding Provisional Sale.");
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
                            <FloatingInput
                            label={"Condemnation No"}
                            type="search" value={selectedDisposal?.condemnationDisposalId}
                            onIconClick={() => setActivePopup("disposal")}/>
                            
                            
                        </div>

                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Sale Date"}
                            type="date" name='saleDate' onChange={handleInputChange}/>
                            
                        </div>


                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Condemnation Date"}
                            type="text
                            "
                                    value={selectedDisposal?.condemDate}/>
                            
                        </div>

                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Equipment Name"}
                            type="text" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentName}/>
                            
                            
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
                            <FloatingInput
                            label={"Remarks"}
                            type="text"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleInputChange}/>
                            
                        </div>



                    </div>

                    <div className="provisional-sale-form-col">
                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Buyer Name *"}
                            type="text" value={selectedVendor?.vendorName}
                            onIconClick={() => setActivePopup("vendor")}/>
                            
                            
                        </div>

                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Purchase Amount"}
                            type="number" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.cost}/>
                           
                        </div>

                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Write Down Value (W.D.V)"}
                            type="text" value={formData.writeDownValue}
                                    onChange={handleInputChange} name='writeDownValue'/>
                           
                        </div>

                        <div className="provisional-sale-form-group">
                            <FloatingSelect
                            label={"Sale Type"}
                            name="saleType"
                                    value={formData.saleType}
                                    onChange={handleInputChange}
                                    options={[
                                        {value:"Sales",label:"Sales"},
                                        {value:"Direct Sale",label:"Direct Sale"}
                                    ]}/>                       
                        </div>
                    </div>
                    <div className="provisional-sale-form-col">
                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Old Asset No"}
                            type="text" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.oldAssetNo}/>
                            
                        </div>

                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Equipment No"}
                            type="text" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentNo}/>
                            </div>
                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Manual Sale Billno"}
                            type="text"
                                    name="manualSaleBillNo"
                                    value={formData.manualSaleBillNo}
                                    onChange={handleInputChange}/>
                           
                        </div>
                        <div className="provisional-sale-form-group">
                            <FloatingInput
                            label={"Asset No"}
                            type="text" value={selectedDisposal?.condemnationDisposalRequestDTO?.equipmentMasterDTO?.assetNo}/>
                            
                        </div>



                    </div>
                    <button className='provisional-sale-add' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default ProvisionalSaleForm;
