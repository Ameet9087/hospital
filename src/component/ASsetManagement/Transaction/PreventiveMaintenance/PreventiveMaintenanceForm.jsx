import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import './PreventiveMaintenanceForm.css';
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import PopupTable from '../../../Admission/PopupTable';
import { API_BASE_URL } from '../../../api/api';

const PreventiveMaintenanceForm = () => {
    const tableRef = useRef(null);
    const [columnWidths, setColumnWidths] = useState({});
    const [activePopup, setActivePopup] = useState("")
    const [remark, setRemark] = useState(""); // To store the remark input value


    const [PONumbers, setPONumbers] = useState([]);
    const [selectedPONumber, setselectedPONumber] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/preventive-maintenance`)
            .then((response) => response.json())
            .then((data) => {
                setPONumbers(data); // Assuming data is an array of complaint objects

            })
            .catch((error) => console.error("Error fetching PO numbers:", error));
    }, []);

    const handlePONOChange = (event) => {
        const selectedEquipmentId = event.target.value;
        setselectedPONumber(selectedEquipmentId);
    }


    const getPopupData = () => {
        if (activePopup === "PONomber") {
            return {
                columns: ["preventiveMaintenanceCalibrationId", "preventiveMaintenanceDate"], data: PONumbers
            };
        }
        else {
            return { columns: [], data: [] };
        }
    };

    const { columns, data } = getPopupData();
    const handleSelect = async (data) => {
        if (activePopup === "PONomber") {
            setselectedPONumber(data)
        }

        console.log("Selected Data:", data);
        setActivePopup(null); // Close the popup after selection
    };






    const [scheduleDetails, setScheduleDetails] = useState([
        {
            id: 1,
            maintenanceTypes: '',
            periodTypes: '',
            startDate: '',
            endDate: '',
            toDoDate: '',
            remarks: '',
            status: '',
        },
    ]);

    const addNewRow = () => {
        const newRow = {
            id: scheduleDetails.length + 1,
            maintenanceTypes: '',
            periodTypes: '',
            startDate: '',
            endDate: '',
            toDoDate: '',
            remarks: '',
            status: '',
        };
        setScheduleDetails([...scheduleDetails, newRow]);
    };

    const deleteRow = (id) => {
        setScheduleDetails(scheduleDetails.filter((row) => row.id !== id));
    };

    const handleAdd = () => {
        if (!selectedPONumber?.preventiveMaintenanceCalibrationId) {
            alert("Please select a valid PM Number before adding.");
            return;
        }

        if (!remark) {
            alert("Remark is required.");
            return;
        }

        const postData = {
            remark,
            preventiveMaintenanceCalibrationDTO: {
                preventiveMaintenanceCalibrationId: selectedPONumber.preventiveMaintenanceCalibrationId,
            },
        };



        fetch(`${API_BASE_URL}/preventive-maintenance/cancellation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        })



            .then((response) => {
                if (response.ok) {
                    alert("Preventive Maintenance Cancellation added successfully.");
                } else {
                    throw new Error("Failed to add Preventive Maintenance Cancellation.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while adding the Preventive Maintenance Cancellation.");
            });
    };

    return (
        <div className="preventive-maintenance-container">
            <div className="preventive-maintenance-header">
                <h1>Preventive Maintenance/Calibration Cancellation</h1>
            </div>

            <div className="preventive-maintenance-form">
                <div className="preventive-maintenance-form-row">


                    <div className="preventive-maintenance-form-group">
                        <label>
                            PM NO<span className="preventive-maintenance-required">*</span>
                        </label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" className="preventive-maintenance-input" value={selectedPONumber?.preventiveMaintenanceCalibrationId} />
                            <Search onClick={() => setActivePopup("PONomber")} className="preventive-maintenance-input-icon" size={18} />
                        </div>
                    </div>


                    <div className="preventive-maintenance-form-group">
                        <label>
                            Equipment Name
                        </label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" className="preventive-maintenance-input" value={selectedPONumber?.equipmentMasterDTO?.equipmentName} />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>Serial No</label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.equipmentMasterDTO?.serialNo} className="preventive-maintenance-input" />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>Location</label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.equipmentMasterDTO?.assetLocationMaster?.subLocation} className="preventive-maintenance-input" />
                        </div>
                    </div>


                    <div className="preventive-maintenance-form-group">
                        <label>Responsible Department</label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.equipmentMasterDTO?.department?.departmentName} className="preventive-maintenance-input" />
                        </div>
                    </div>
                </div>

                <div className="preventive-maintenance-form-row">
                    <div className="preventive-maintenance-form-group">
                        <label>
                            PM Date
                        </label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input value={selectedPONumber?.preventiveMaintenanceDate}
                                type="text"
                                className="preventive-maintenance-input"
                            />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>Equipment No</label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.equipmentMasterDTO?.equipmentNo} className="preventive-maintenance-input" />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>Model No</label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.equipmentMasterDTO?.modelNo} className="preventive-maintenance-input" />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>Responsible Person</label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.equipmentMasterDTO?.employee?.firstName} className="preventive-maintenance-input" />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>Period Type</label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.periodType} className="preventive-maintenance-input" />
                        </div>
                    </div>
                </div>

                <div className="preventive-maintenance-form-row">
                    <div className="preventive-maintenance-form-group">
                        <label>
                            Asset No
                        </label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.equipmentMasterDTO?.assetNo} className="preventive-maintenance-input" />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>Category</label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.equipmentMasterDTO?.assetCateMasterDTO?.assetCategory} className="preventive-maintenance-input" />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>
                            Maintenance Types
                        </label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input type="text" value={selectedPONumber?.maintenanceTypeMasterDTO?.typeName} className="preventive-maintenance-input" />
                        </div>
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <label>
                            Remark<span className="preventive-maintenance-required">*</span>
                        </label>
                        <div className="preventive-maintenance-input-with-icon">
                            <input
                                type="text"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                                className="preventive-maintenance-input"
                                required
                            />
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

                </div>
                <button className='preventivemaintainance-add' onClick={handleAdd}>Add</button>

            </div>



        </div>
    );
};

export default PreventiveMaintenanceForm;
