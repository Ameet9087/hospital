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
    const itemcodeHeading=["itemName","batchNumber","expiryDate","mrp","tstock","bstock"];
    const [itemCodedata,setItemCodedata]=useState([]);
    const [selectedItemCode,setSelectedItemCode]=useState([]);

    // Fetch IP Numbers
    const fetchIpNos = async () => {
        try {
            const response = await axios.get("http://192.168.0.105:8080/api/ip-admissions");
            const inPatient = response.data.map((item) => ({
                inPatientId: item.patient.inPatientId || "N/A",
                patientName: `${item.patient.firstName} ${item.patient.lastName}` || "N/A",
                mobileNo: item.patient.phoneNumber || "N/A",
                consultantDoctor: item.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "N/A",
                sourceOfAdmission: item.financials?.sourceOfAdmission || "N/A",
                bedNo: item.roomDetails?.bedDTO?.bedNo || "N/A",
                // roomNo: item.roomDetails?.bedDTO?.roomNo || "N/A",
                admissionDate: item.admissionDate || "N/A",
                typeAdmission: item.financials?.typeAdmission || "N/A",
                severity: item.roomDetails?.roomTypeDTO?.type || "N/A",
                age:item.patient.age || "N/A",
                gender:item.patient.gender || "N/A",
                relative:item.patient.guarantorDTO.guarantorName || "N/A",
                roomNo:item.patient.roomDetails.roomDTO.floorNumber || "N/A",
                roomType:item.patient.roomDetails.roomDTO.roomTypeDTO.roomtype || "N/A",
                uhid:item.patient.uhid
            }));
            setIpNos(inPatient);
        } catch (error) {
            console.error("Error fetching IP numbers:", error);
        }
    };

    const fetchItemCode = async () => {
      try {
        const response = await axios.get("http://192.168.0.111:9090/api/item-detail-issue");
        const itemCode = response.data.map((code) => {
          const taxAmount = parseFloat(code.tax || 0) * parseFloat(code.taxPercent || 0) / 100;
          const totalAmount = parseFloat(code.mrp || 0) + taxAmount;
          return {
            itemDetailIssueWardId: code.itemDetailIssueWardId,
            scanCode: code.scanCode,
            itemName: code.itemName,
            pack: code.pack,
            batchNumber: code.batchNumber,
            expiryDate: code.expiryDate,
            mrp: code.mrp,
            tax: code.tax,
            colTax: code.colTax,
            taxPercent: code.taxPercent,
            tstock: code.tstock,
            bstock: code.bstock,
            issueQty: 0, // Default value
            taxAmount: taxAmount.toFixed(2), // Keep it formatted
            totalAmount: totalAmount.toFixed(2),
          };
        });
        setItemCodedata(itemCode);
      } catch (error) {
        console.error("Error Fetching in item", error);
      }
    };
    

    useEffect(() => {
        fetchIpNos();
        fetchItemCode();
    }, []);

    // Handle popup data
    const handleSelect = (data) => {
        if (activePopup === "IpNo") {
            setSelectedIPNo(data);
        }
        else if(activePopup==="ItemCode"){
          setSelectedItemCode(data);
        }
        setActivePopup(null);
    };

    const getPopupData = () => {
        if (activePopup === "IpNo") {
            return { columns: ipnoHeading, data: ipNos };
        }else if(activePopup==="ItemCode") {
            return {columns:itemcodeHeading,data:itemCodedata};
        }
        
        else  {
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
                    <input type="text" value={selectedIPNo?.patientName || ""} />
                </div>

                <div className="detail">
                    <label>Age:</label>
                    <input type="text" value={selectedIPNo?.age || ""} />
                </div>

                <div className="detail">
                    <label>Sex:</label>
                    <input type="text" value={selectedIPNo?.gender || "" } />
                </div>

                <div className="detail">
                    <label>Relative Name:</label>
                    <input type="text" value={selectedIPNo?.relative || "" } />
                </div>

                <div className="detail">
                    <label>Doctor Name:</label>
                    <input type="text" value={selectedIPNo?.consultantDoctor || ''}/>
                  
                </div>

                <div className="detail">
                    <label>Unit Name:</label>
                    <input type="text" />
                </div>

                <div className="detail">
                    <label>Mobile Number:</label>
                    <input type="text" value={selectedIPNo?.mobileNo || ''} />
                </div>

                <div className="detail">
                    <label>Type:</label>
                    <select>
                        <option>General</option>
                    </select>
                </div>

                <div className="detail">
                    <label>Bed No:</label>
                    <input type="text" value={selectedIPNo?.bedNo || ''}/>
                </div>

                <div className="detail">
                    <label>Room No:</label>
                    <input type="text" value={selectedIPNo?.roomNo || ''}   />
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

                {/* <a>Previous Bills</a>

                <div className="detail">
                    <label>MR No:</label>
                    <input type="text" />
                    <i className="fa fa-search"></i>
                </div>

                <div className="detail">
                    <label>Template Name:</label>
                    <input type="text" />
                    <i className="fa fa-search"></i>
                </div> */}
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
                            <th>MRP</th>
                            <th>Discount</th>
                            <th>Tax %</th>
                            <th>Tax Amount</th>
                            <th>Amount</th>
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
                                <td><input type="text" value={selectedItemCode.scanCode || ''} /></td>
                                <td ><input type="text" value={selectedItemCode.itemName || ''} style={{width:'70%'}} />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    onClick={() => setActivePopup("ItemCode")}
                                />
                                
                                </td>
                                <td><input type="text" value={selectedItemCode?.pack || ''} /></td>
                                <td><input type="text" value={selectedItemCode.tStock || ''} /></td>
                                <td><input type="text" value={selectedItemCode.bStock || ''} /></td>
                                <td><input type="text" value={row.issueQty || ''} onChange={(e) => updateIssueQty(row.itemDetailIssueWardId, e.target.value)} /></td>
                                <td><input type="text" value={selectedItemCode.batchNo || ''} /></td>
                                <td><input type="text" value={selectedItemCode.expiry || ''} /></td>

                                <td><input type="text" value={selectedItemCode.mrp || ''} /></td>
                                <td><input type="text" value={selectedItemCode.tax || ''} /></td>
                                <td><input type="text" value={selectedItemCode.colTax || ''} /></td>
                                <td><input type="text" value={selectedItemCode.taxPercent || ''} /></td>
                                <td><input type="text" value={selectedItemCode.totalAmount || ''} /></td>


                             
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
