import React, { useState, useRef, useEffect } from 'react';
import './EquipmentGatePassOutViewpopUp.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { SearchIcon } from 'lucide-react';
import PopupTable from '../../../Admission/PopupTable';
import { API_BASE_URL } from '../../../api/api';
const EquipmentGatePassOUTView = ({ bookingId }) => {
  const [id, setId] = useState(bookingId || "");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [activePopup, setActivePopup] = useState("");
  const [gatePassOuts, setGatePassOuts] = useState([]);
  const [selectedGatePassOut, setSelectedGatePassOut] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    date: '',
    time: '',

  })

  useEffect(() => {
    fetch(`${API_BASE_URL}/gatePassOut`)
      .then((response) => response.json())
      .then((data) => {
        setGatePassOuts(data);
      })
      .catch((error) => console.error("Error fetching Gate Pass Out numbers:", error));
  }, []);

  const getPopupData = () => {
    if (activePopup === "gatePassOut") {
      return {
        columns: ["gatePassOutId", "type"],
        data: gatePassOuts
      };
    }
    return { columns: [], data: [] };
  };

  const handleSelect = async (data) => {
    if (activePopup === "gatePassOut") {
      const selectedPass = gatePassOuts.find(pass => pass.gatePassOutId === data.gatePassOutId);
      setSelectedGatePassOut(selectedPass);
    }
    setActivePopup(null);
  };

  const [partsTableRows, setPartsTableRows] = useState([]);

  useEffect(() => {
    if (selectedGatePassOut?.partsDTO) {
      const rows = selectedGatePassOut.partsDTO.map((part, index) => ({
        sNo: index + 1,
        ...part
      }));
      setPartsTableRows(rows);
    }
  }, [selectedGatePassOut]);

  const handleAddRow = () => {
    const newRow = {
      sNo: partsTableRows.length + 1,
      partName: '',
      modelNo: '',
      serialNo: ''
    };
    setPartsTableRows([...partsTableRows, newRow]);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updatedRows = partsTableRows.filter((_, index) => index !== indexToRemove);
    const renumberedRows = updatedRows.map((row, index) => ({
      ...row,
      sNo: index + 1
    }));
    setPartsTableRows(renumberedRows);
  };

  const handleSubmit = async () => {
    const payload = {
      status: formData.status,
      date: formData.date,
      time: formData.time,
      equipmentGatePassOutDTO: {
        gatePassOutId: selectedGatePassOut?.gatePassOutId || "",
      },
    };
    try {
      const response = await fetch(`${API_BASE_URL}/gatePassOutView`, {
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
    <div className="EquipmentGatePassOUTViewPopUp-surgery-Events">
      <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-title-bar">
        <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-header">
          <span>Equipment GatePass OUT View</span>
        </div>
      </div>
      <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-content-wrapper">
        <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-main-section">
          <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel dis-templates">
            <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassOutViewPopUp-form-row">
                <label>Gatepass Out No:</label>
                <div className="input-with-icon-EquipmentGatePassOutViewPopUp">
                  <input type="text" value={selectedGatePassOut?.gatePassOutId || ''} readOnly />
                  <SearchIcon
                    className="EquipmentGatePassOutViewPopUp-input-icon"
                    onClick={() => setActivePopup("gatePassOut")}
                    size={18}
                  />
                </div>
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Recommended By:</label>
                <input type="text" value={selectedGatePassOut?.recommendedBy || ''} readOnly />
              </div>
            </div>

            <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel-header">
              EQUIPMENT OUT DETAILS
            </div>
            <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Supplier Name:<span className='EquipmentGatePassOUTViewPopUp-required'>*</span></label>
                <input type="text" value={selectedGatePassOut?.vendorDTO?.vendorName || ''} readOnly />
              </div>
            </div>
          </div>

          <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Recommended By:</label>
                <input type="text" value={selectedGatePassOut?.recommendedBy || ''} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Reason:</label>
                <input type="text" value={selectedGatePassOut?.reason || ''} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Mode Of Transport:</label>
                <input type="text" value={selectedGatePassOut?.modeOfTransport || ''} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Type:</label>
                <input type="text" value={selectedGatePassOut?.type || ''} readOnly />
              </div>
            </div>
          </div>

          <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Gate Pass Out Date:</label>
                <input
                  type="text"
                  value={selectedGatePassOut?.gatePassOutDate || ''}
                  readOnly
                />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Gate Pass Out Time:</label>
                <input
                  type="text"
                  value={selectedGatePassOut?.gatePassOutTime || ''}
                  readOnly
                />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Time Period:</label>
                <input type="text" value={selectedGatePassOut?.timePeriod || ''} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Prepared By:</label>
                <input type="text" value={selectedGatePassOut?.preparedBy || ''} readOnly />
              </div>
            </div>
          </div>

          <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel operation-details">
            <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-panel-content">
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Received By:</label>
                <input type="text" value={selectedGatePassOut?.receivedBy || ''} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Authorised By:</label>
                <input
                  type="text"
                  value={selectedGatePassOut?.approvalByDTO?.doctorName || ''}
                  readOnly
                />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Remarks:<span className='EquipmentGatePassOUTViewPopUp-required'>*</span></label>
                <input type="text" value={selectedGatePassOut?.remark || ''} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Type:</label>
                <input type="text" value={selectedGatePassOut?.typeOfEquipment || ''} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Date:</label>
                <input type="date" value={new Date().toISOString().split("T")[0]} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
                <label>Time:</label>
                <input type="time" value={new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5)} readOnly />
              </div>
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-form-row">
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
          </div>
        </div>
        {activePopup && (
          <PopupTable
            columns={getPopupData().columns}
            data={getPopupData().data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
          />
        )}

        <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-services-section">
          <div className="EquipmentGatePassOUTViewPopUp-services-table">
            <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-title-bar">
              <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-header">
                <span>Item Details</span>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Part Name",
                    "Model No",
                    "Serial No",
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
                          onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {partsTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="EquipmentGatePassOUTViewPopUp-table-actions">
                        <button
                          className="EquipmentGatePassOUTViewPopUp-surgeryEvents-add-btn"
                          onClick={handleAddRow}
                        >
                          Add
                        </button>
                        <button
                          className="EquipmentGatePassOUTViewPopUp-surgeryEvents-del-btn"
                          onClick={() => handleDeleteRow(index)}
                          disabled={partsTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sNo}</td>
                    <td>{row.partName}</td>
                    <td>{row.modelNo}</td>
                    <td>{row.serialNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="EquipmentGatePassOUTViewPopUp-surgeryEvents-action-buttons">
          <button className="EquipmentGatePassOUTViewPopUp-btn-blue" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentGatePassOUTView;