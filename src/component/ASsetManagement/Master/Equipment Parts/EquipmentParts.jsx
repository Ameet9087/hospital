import React, { useState, useEffect } from "react";
import "./Equipmentparts.css";
import EquipmentPartsPopUp from "./EquipmentPartsPopUp";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import * as XLSX from "xlsx";
import { FloatingInput } from "../../../../FloatingInputs";

const EquipmentParts = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [equipmentParts, setEquipmentParts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        fetch(`${API_BASE_URL}/parts`)
            .then((response) => response.json())
            .then((data) => {
                setEquipmentParts(data);
            })
            .catch(() => {
                setError("Failed to fetch data");
            });
    }, []);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const filteredEquipmentParts = equipmentParts.filter((part) => {
        return (
            part.partName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.equipmentMasterDTO?.equipmentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.modelNo?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleExport = () => {
        const exportData = filteredEquipmentParts.map((part, index) => ({
            SN: index + 1,
            "Part Name": part.partName,
            "Equipment Name": part.equipmentMasterDTO?.equipmentName,
            "Model No": part.modelNo,
            "Serial No": part.serialNo,
            "Stand By": part.standBy,
            Quantity: part.quantity,
            "Contract Type": part.contractType,
            "Covered Under": part.coveredUnder,
            Remark: part.remark,
            "Under Insurance Cost": part.underInsuranceCost,
            "Pending Quantity": part.pendingQuantity,
            "Rec Quantity": part.recQuantity,
            "Out Quantity": part.outQuantity,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Equipment Parts");
        XLSX.writeFile(workbook, "EquipmentParts.xlsx");
    };

    const handlePrint = () => {
        const printContents = document.querySelector(".EquipmentParts-table-container").innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // To reset the page after printing
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="EquipmentParts-container">
            <div className="EquipmentParts-addBtn">
                <button className="EquipmentParts-add-button" onClick={openPopup}>
                    + Add New Equipment Part
                </button>
            </div>

            <div className="newCondemnationReasonMaster-search-N-result">
                <div className="newCondemnationReasonMaster-search-bar">
                    <FloatingInput
                    label={"search"}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="newCondemnationReasonMaster-results-info">
                    <span>
                        Showing {filteredEquipmentParts.length} / {equipmentParts.length} results
                    </span>
                    <button
                        className="newCondemnationReasonMaster-print-button"
                        onClick={handleExport}
                    >
                        <i className="fa-solid fa-file-excel"></i> Export
                    </button>
                    <button
                        className="newCondemnationReasonMaster-print-button"
                        onClick={handlePrint}
                    >
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>

            <div className="EquipmentParts-table-container">
                <table>
                    <thead>
                        <tr>
                            {[
                                "SN",
                                "Part Name",
                                "Equipment Name",
                                "Model No",
                                "Serial No",
                                "Stand By",
                                "Quantity",
                                "Contract Type",
                                "Covered Under",
                                "Remark",
                                "Under Insurance Cost",
                                "Pending Quantity",
                                "Rec Quantity",
                                "Out Quantity",
                            ].map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEquipmentParts.map((part, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{part.partName}</td>
                                <td>{part.equipmentMasterDTO?.equipmentName}</td>
                                <td>{part.modelNo}</td>
                                <td>{part.serialNo}</td>
                                <td>{part.standBy}</td>
                                <td>{part.quantity}</td>
                                <td>{part.contractType}</td>
                                <td>{part.coveredUnder}</td>
                                <td>{part.remark}</td>
                                <td>{part.underInsuranceCost}</td>
                                <td>{part.pendingQuantity}</td>
                                <td>{part.recQuantity}</td>
                                <td>{part.outQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <CustomModal isOpen={showPopup} onClose={closePopup}>
                    <EquipmentPartsPopUp onClose={closePopup} />
                </CustomModal>
            )}
        </div>
    );
};

export default EquipmentParts;
