import React, { useState, useEffect } from 'react';
import './IpdIssuedWard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PopupTable from "../Services/PopupTable";

const IPDIssuesWard = () => {
    const [ipNos, setIpNos] = useState([]);
    const [activePopup, setActivePopup] = useState(null);
    const [selectedIPNo, setSelectedIPNo] = useState(null);
    const [rows, setRows] = useState([{ id: 1, scanCode: '', itemName: '', pack: '', tStock: '', bStock: '', issueQty: '', batchNo: '', expiry: '' }]);

    const ipnoHeading = ["uhid", "inPatientId", "firstName", "lastName", "phoneNumber", "address"];

    // Fetch IP Numbers
    const fetchIpNos = async () => {
        try {
            const response = await axios.get("http://192.168.0.105:8080/api/ip-admissions");
            const inPatient = response.data.map((item) => ({
                inPatientId: item.patient.inPatientId,
                patientName: `${item.patient.firstName} ${item.patient.lastName}`,
                mobileNo: item.patient.phoneNumber,
                consultantDoctor: item.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "N/A",
                sourceOfAdmission: item.financials?.sourceOfAdmission || "N/A",
                bedNo: item.roomDetails?.bedDTO?.bedNo || "N/A",
                roomNo: item.roomDetails?.bedDTO?.roomNo || "N/A",
                admissionDate: item.admissionDate || "N/A",
                typeAdmission: item.financials?.typeAdmission || "N/A",
                severity: item.roomDetails?.roomTypeDTO?.type || "N/A",
            }));
            setIpNos(inPatient);
        } catch (error) {
            console.error("Error fetching IP numbers:", error);
        }
    };

    useEffect(() => {
        fetchIpNos();
    }, []);

    // Handle popup data
    const handleSelect = (data) => {
        if (activePopup === "IpNo") {
            setSelectedIPNo(data);
        }
        setActivePopup(null);
    };

    const getPopupData = () => {
        if (activePopup === "IpNo") {
            return { columns: ipnoHeading, data: ipNos };
        } else {
            return { columns: [], data: [] };
        }
    };

    const { columns, data } = getPopupData();

    // Add new row
    const addRow = () => {
        setRows([...rows, { id: rows.length + 1, scanCode: '', itemName: '', pack: '', tStock: '', bStock: '', issueQty: '', batchNo: '', expiry: '' }]);
    };

    // Delete a row
    const deleteRow = (id) => {
        if (rows.length === 1) {
            alert('Cannot delete the last row!');
            return;
        }
        setRows(rows.filter(row => row.id !== id));
    };

    return (
        <div className="ipd-issues-ward-container">
            <h6><center><b>IPD Issues Ward</b></center></h6>

            <div className="detail">
                <label>MIssue No:</label>
                <input type="text" />
            </div>

            <h6><b>Patient Details</b></h6>
            <div className="patient-details">
                <div className="detail">
                    <label>Issue Type:</label>
                    <select>
                        <option>Direct</option>
                    </select>
                </div>

                <div className="detail">
                    <label>IP No:</label>
                    <input type="text"  value={selectedIPNo?.inPatientId || ""} />
                    <FontAwesomeIcon
                        icon={faSearch}
                        onClick={() => setActivePopup("IpNo")}
                    />
                </div>

                <div className="detail">
                    <label>Patient Name:</label>
                    <input type="text" value={selectedIPNo?.patient?.firstName || ""} />
                </div>

                <div className="detail">
                    <label>Age:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Sex:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Relative Name:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Doctor Name:</label>
                    <input type="text" />
                    <i className="fa fa-search"></i>
                </div>

                <div className="detail">
                    <label>Unit Name:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Mobile Number:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Type:</label>
                    <select>
                        <option>General</option>
                    </select>
                </div>

                <div className="detail">
                    <label>Bed No:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Room No:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Floor No:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Room Type:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Pay Type:</label>
                    <input type="text" />
                </div>

                <a>Previous Bills</a>

                <div className="detail">
                    <label>MR No:</label>
                    <input type="text" />
                    <i className="fa fa-search"></i>
                </div>

                <div className="detail">
                    <label>Template Name:</label>
                    <input type="text" />
                    <i className="fa fa-search"></i>
                </div>
            </div>

            <div className="item-details">
                <h6><b>Item Details</b></h6>

                <table className="item-table">
                    <thead>
                        <tr>
                            <th>Add</th>
                            <th>Del</th>
                            <th>Scan Code</th>
                            <th>Item Name</th>
                            <th>Pack</th>
                            <th>TStock</th>
                            <th>BStock</th>
                            <th>Issue Qty</th>
                            <th>Batch No</th>
                            <th>Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={row.id}>
                                <td>
                                    {index === rows.length - 1 && (
                                        <button onClick={addRow} className="add-button">Add</button>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => deleteRow(row.id)} className="delete-button">Del</button>
                                </td>
                                <td><input type="text" value={row.scanCode} /></td>
                                <td><input type="text" value={row.itemName} /></td>
                                <td><input type="text" value={row.pack} /></td>
                                <td><input type="text" value={row.tStock} /></td>
                                <td><input type="text" value={row.bStock} /></td>
                                <td><input type="text" value={row.issueQty} /></td>
                                <td><input type="text" value={row.batchNo} /></td>
                                <td><input type="text" value={row.expiry} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div><br />

            {/* Financial Details */}
            <h6><b>Financial Details</b></h6>
            <div className="ipdissuedward-form">
                {[
                    { label: "Total Amount", name: "totalAmount" },
                    { label: "Less Discount", name: "lessDiscount" },
                    { label: "Net Amount", name: "netAmount" },
                    { label: "Tax Amount", name: "taxAmount" },
                    { label: "Paid Amount", name: "paidAmount" },
                    { label: "Due Amount", name: "dueAmount" },
                    { label: "Current Due", name: "currentDue" },
                    { label: "Remarks", name: "remarks" },
                    { label: "Amount in Words", name: "amountInWords", readOnly: true },
                ].map((field, index) => (
                    <div key={index} className="ipdissuedward-section">
                        <label>{field.label}:</label>
                        <input
                            type="text"
                            // name={field.name}
                            // value={formData[field.name]}
                            // onChange={handleChange}
                            // readOnly={field.readOnly || false}
                        />
                    </div>
                ))}
            </div>

            {/* Popup for IP Number selection */}
            {activePopup && (
                <PopupTable
                    columns={columns}
                    data={data}
                    onSelect={handleSelect}
                    onClose={() => setActivePopup(null)}
                />
            )}
        </div>
    );
};

export default IPDIssuesWard;
