import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import './PreventiveMaintenanceForm.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import PopupTable from '../../../Admission/PopupTable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput,FloatingSelect,FloatingTextarea } from '../../../../FloatingInputs';
import { toast } from 'react-toastify';

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
                    toast.success("Preventive Maintenance Cancellation added successfully.");
                } else {
                    throw new Error("Failed to add Preventive Maintenance Cancellation.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occurred while adding the Preventive Maintenance Cancellation.");
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
                        <FloatingInput
                        label={"PM NO  *"}
                        value={selectedPONumber?.preventiveMaintenanceCalibrationId} 
                        type="search"
                        onIconClick={() => setActivePopup("PONomber")}/>
                        
                    </div>


                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Equipment Name"}
                        type="text"
                        value={selectedPONumber?.equipmentMasterDTO?.equipmentName}/>
                       
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Serial No"}
                        type="text"
                        value={selectedPONumber?.equipmentMasterDTO?.serialNo}/>
                        
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Location"}
                        type="text" value={selectedPONumber?.equipmentMasterDTO?.assetLocationMaster?.subLocation}/>
                        
                    </div>


                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Responsible Department"}
                        type="text" value={selectedPONumber?.equipmentMasterDTO?.department?.departmentName}/>
                        
                    </div>
                </div>

                <div className="preventive-maintenance-form-row">
                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"PM Date"}
                        value={selectedPONumber?.preventiveMaintenanceDate}
                                type="text"/>
                       
                       
                           
                            
                       
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Equipment No"}
                        type="text" value={selectedPONumber?.equipmentMasterDTO?.equipmentNo}/>
                        
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Model No"}
                        type="text" value={selectedPONumber?.equipmentMasterDTO?.modelNo}
                        />
                       
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Responsible Person"}
                        type="text" value={selectedPONumber?.equipmentMasterDTO?.employee?.firstName}/>
                        
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Period Type"}
                        type="text" value={selectedPONumber?.periodType}/>
                       
                    </div>
                </div>

                <div className="preventive-maintenance-form-row">
                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Asset No"}
                        type="text" value={selectedPONumber?.equipmentMasterDTO?.assetNo}/>
                        
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Category"}
                        type="text" value={selectedPONumber?.equipmentMasterDTO?.assetCateMasterDTO?.assetCategory}/>
                        
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Maintenance Types"}
                        type="text" value={selectedPONumber?.maintenanceTypeMasterDTO?.typeName}/>
                        
                    </div>

                    <div className="preventive-maintenance-form-group">
                        <FloatingInput
                        label={"Remark"}
                        type="text"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)} required/>
                        
                       
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
