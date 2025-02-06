import React, { useState, useRef, useEffect } from 'react';
import './EquipmentGatePassinviewPopUp.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { SearchIcon } from 'lucide-react';
import PopupTable from '../../../Admission/PopupTable';
import { API_BASE_URL } from '../../../api/api';
const EquipmentGatePassInViewPopUp = ({ bookingId }) => {
  const [id, setId] = useState(bookingId || "");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [activePopup, setActivePopup] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5)
  );


  const [gatePassIns, setgatePassIns] = useState([]);
  const [selectedGatePassIn, setSelectedGatePassIn] = useState("");
  const [formData, setFormData] = useState({
    status: '',
    date: '',
    time: '',

  })

  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-gate-pass-in`)
      .then((response) => response.json())
      .then((data) => {
        setgatePassIns(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching PO numbers:", error));
  }, []);

  const handleGatePassInChange = (event) => {
    const selectedGatePassInId = event.target.value;
    setSelectedGatePassIn(selectedGatePassInId);
  }



  const getPopupData = () => {
    if (activePopup === "gatePassIn") {
      return {
        columns: ["gatePassInId", "gatePassType"], data: gatePassIns
      };
    }

    else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "gatePassIn") {
      setSelectedGatePassIn(data);
    }

    setActivePopup(null); // Close the popup after selection
  };


  const [packageTableRows, setPackageTableRows] = useState([]);

  useEffect(() => {
    if (selectedGatePassIn && selectedGatePassIn.partsDTO) {
      const parts = selectedGatePassIn.partsDTO.map((part, index) => ({
        sn: index + 1,
        itemCode: part.partId,
        itemName: part.partName,
        outQty: part.outQuantity,
        pendingQty: part.pendingQuantity,
        recQty: part.recQuantity,
        remarks: part.remark,
      }));
      setPackageTableRows(parts);
    }
  }, [selectedGatePassIn]);



  const handleAddRow = () => {
    const newRow = {
      sn: packageTableRows.length + 1,
      serviceName: '',
      performDoctor: '',
      promptPercentage: '',
      total: '',
      discAmt: '',
      hours: '',
      extraP: '',
      fromTime: '',
      toTime: '',
      hourly: '',
      emergency: '',
      emerg: '',
      netAmt: '',
      doctor: ''
    };
    setPackageTableRows([...packageTableRows, newRow]);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updatedRows = packageTableRows.filter((_, index) => index !== indexToRemove);
    const renumberedRows = updatedRows.map((row, index) => ({
      ...row,
      sn: index + 1
    }));
    setPackageTableRows(renumberedRows);
  };

  const [fileName, setFileName] = useState('');

  const handleChooseFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      status: formData.status,
      date: formData.date,
      time: formData.time,
      equipmentGatePassInDTO: {
        gatePassInId: selectedGatePassIn?.gatePassInId || "",
      },
    };
    try {
      const response = await fetch(`${API_BASE_URL}/gatePassInView`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        alert('Failed to save data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving the data.');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="EquipmentGatePassInViewPopUp-surgery-Events">
      <div className="EquipmentGatePassInViewPopUp-surgeryEvents-title-bar">
        <div className="EquipmentGatePassInViewPopUp-surgeryEvents-header">
          <span>Equipment GatePass IN View</span>
        </div>
      </div>
      <div className="EquipmentGatePassInViewPopUp-surgeryEvents-content-wrapper">
        <div className="EquipmentGatePassInViewPopUp-surgeryEvents-main-section">

          <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel dis-templates">
            <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Gatepass IN No:</label>
                <div className="input-with-icon-EquipmentGatePassInViewPopUp">
                  <input type="text" value={selectedGatePassIn?.gatePassInId} readOnly />
                  <SearchIcon onClick={() => setActivePopup("gatePassIn")} className="eue-passin-input-icon" size={16} />
                </div>
              </div>
            </div>
            <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel-header">EQUIPMENT IN DETAILS   </div>
            <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Gate Pass Out No:</label>
                <input
                  type="text"
                  value={selectedGatePassIn?.equipmentGatePassOutDTO?.gatePassOutId || ""}
                  readOnly
                />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Supplier:</label>
                <input
                  type="text"
                  value={selectedGatePassIn?.equipmentMasterDTO?.vendor?.vendorName || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Gate Pass Out Date:</label>
                <input type="text" value={selectedGatePassIn?.gatePassOutDate} />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>DC No:<span className='EquipmentGatePassInViewPopUp-required'>*</span></label>
                <input type="text" value={selectedGatePassIn?.dcNo} readOnly />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Gate Entry No:<span className='EquipmentGatePassInViewPopUp-required'>*</span></label>
                <input type="text" value={selectedGatePassIn?.gateEntryNo} readOnly />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Gate Pass In Date:</label>
                <input type="text" value={selectedGatePassIn?.gatePassInDate} />
              </div>
            </div>
          </div>
          <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Gate Pass In Time:</label>
                <input type="text" value={selectedGatePassIn?.gatePassInTime} />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Time Period:</label>
                <input type="text" value={selectedGatePassIn?.timePeriod} readOnly />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Prepared By:</label>
                <input
                  type="text"
                  value={selectedGatePassIn?.preparedBy || ""}
                  readOnly
                />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Received By:</label>
                <input
                  type="text"
                  value={selectedGatePassIn?.receivedBy || ""}
                  readOnly
                />
              </div>

              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Authorised By:</label>
                <input
                  type="text"
                  value={selectedGatePassIn?.authorisedBy || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentGatePassInViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label> Remarks:<span className='EquipmentGatePassInViewPopUp-required'>*</span></label>
                <input type="text" value={id} readOnly />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Type:</label>
                <select>
                  <option>Category </option>
                  <option>Equipment</option>
                </select>
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Date:</label>
                <input type="date" value={new Date().toISOString().split("T")[0]} readOnly />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Time:</label>
                <input type="time" value={new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5)} readOnly />
              </div>
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
                <label>Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="approve">Approve</option>
                  <option value="pending">Pending</option>
                  <option value="hold">Hold</option>
                </select>

              </div>
            </div>
            <div className="EquipmentGatePassInViewPopUp-surgeryEvents-form-row">
              <button className='EquipmentGatePassInViewPopUp-surgeryEvents-submit-btn' onClick={handleSubmit}>Save</button>
              <button className='EquipmentGatePassInViewPopUp-surgeryEvents-submit-btn' onClick={() => setFormData({ status: '', date: '', time: '' })}>Reset</button>
            </div>
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
        <div className="EquipmentGatePassInViewPopUp-surgeryEvents-services-section">
          <div className="EquipmentGatePassInViewPopUp-services-table">
            <div className="EquipmentGatePassInViewPopUp-surgeryEvents-title-bar">
              <div className="EquipmentGatePassInViewPopUp-surgeryEvents-header">
                <span>Item Details</span>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Item Code",
                    "Item Name",
                    "Out Qty",
                    "Pending Qty",
                    "Rec Qty",
                    "Remarks",

                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(
                            tableRef,
                            setColumnWidths
                          )(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {packageTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="EquipmentGatePassInViewPopUp-table-actions">
                        <button
                          className="EquipmentGatePassInViewPopUp-surgeryEvents-add-btn"
                          onClick={() => handleAddRow()}
                        >
                          Add
                        </button>
                        <button
                          className="EquipmentGatePassInViewPopUp-surgeryEvents-del-btn"
                          onClick={() => handleDeleteRow(index)}
                          disabled={packageTableRows.length <= 1}>
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.itemCode}</td>
                    <td>{row.itemName}</td>
                    <td>{row.outQty}</td>
                    <td>{row.pendingQty}</td>
                    <td>{row.recQty}</td>
                    <td>{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EquipmentGatePassInViewPopUp;

