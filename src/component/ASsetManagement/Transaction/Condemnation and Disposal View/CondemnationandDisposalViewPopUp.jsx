import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import './CondemnationAnddisposalViewPopUp.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { FaSearch } from 'react-icons/fa';
import { API_BASE_URL } from '../../../api/api';
import PopupTable from '../../../Admission/PopupTable';
const CondemnationandDisposalViewPopUp = () => {
  const [condemnation, setcondmnation] = useState([]);
  const [activePopup, setActivePopup] = useState("")
  const [selectedcondmnaton, setSelectedcondmnation] = useState([]);
  const [activeTab, setActiveTab] = useState('proposal');
  const CondmnationHeading = ["condemnationDisposalId", "condemnation", "recommended"]
  const [proposalDetails, setProposalDetails] = useState([
    { sn: 1, equipmentName: '', type: 'New', assetNo: '', manualCode: '', location: '', category: '' }
  ]);
  const [approvedDetails, setApprovedDetails] = useState([
    { sn: 1, approvalBy: '', priority: '' }
  ]);
  const [formData, setFormData] = useState({
    status: '',
    date: '',
    time: '',

  })
  const handleSubmit = async () => {
    const payload = {
      status: formData.status,
      date: formData.date,
      time: formData.time,
      condemnationDisposalDTO: {
        condemnationDisposalId: selectedcondmnaton.condemnationDisposalId || "",
      },
    };
    try {
      const response = await fetch(`${API_BASE_URL}/condemnation-view`, {
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

  const handleAddRow = (type) => {
    if (type === 'proposal') {
      setProposalDetails([
        ...proposalDetails,
        { sn: proposalDetails.length + 1, equipmentName: '', type: 'New', assetNo: '', manualCode: '', location: '', category: '' }
      ]);
    } else {
      setApprovedDetails([
        ...approvedDetails,
        { sn: approvedDetails.length + 1, approvalBy: '', priority: '' }
      ]);
    }
  };

  const handleDeleteRow = (type, index) => {
    if (type === 'proposal') {
      setProposalDetails(proposalDetails.filter((_, i) => i !== index));
    } else {
      setApprovedDetails(approvedDetails.filter((_, i) => i !== index));
    }
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

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const fetchcondenmationno = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/condemnation-disposals`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setcondmnation(data);
      console.log(data);

    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  useEffect(() => {
    fetchcondenmationno();
  }, []);
  const getPopupData = () => {
    if (activePopup === "condemetiono") {
      return { columns: CondmnationHeading, data: condemnation };
    }
    else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (activePopup === "condemetiono") {
      setSelectedcondmnation(data);
    } setActivePopup(null); // Close the popup
  };

  return (
    <div className="CondemnationandDisposalViewPopUp-container">
      <div className="CondemnationandDisposalViewPopUp-header">
        Condemnation and Disposal View
      </div>

      <div className="CondemnationandDisposalViewPopUp-form-container">
        <div className="CondemnationandDisposalViewPopUp-form-section">
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Condem No</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalId} />
            <FaSearch onClick={() => setActivePopup("condemetiono")} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-section-header">Equipment Info</div>
          {/* <div className="CondemnationandDisposalViewPopUp-status">
  <label className="CondemnationandDisposalViewPopUp-label">Capital Item :</label>
  <div className="CondemnationandDisposalViewPopUp-radio-buttons">
    <input
      type="radio"
      id="yes"
      name="status"
      value="yes"
    />
    <label htmlFor="yes">Yes</label>

    <input
      type="radio"
      id="no"
      name="status"
      value="no"
    />
    <label htmlFor="no">No</label>
  </div>
</div> */}
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Name of Equipment<span className='CondemnationandDisposalViewPopUp-required'>*</span></span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" value={selectedcondmnaton.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentName} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Asset Serial No</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalRequestDTO?.equipmentMasterDTO?.serialNo} />
          </div>

          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Location</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalRequestDTO?.equipmentMasterDTO?.assetLocationMaster?.subLocation} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Approved Date</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="date" className="CondemnationandDisposalViewPopUp-input-field" value={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Approved Time</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="time" className="CondemnationandDisposalViewPopUp-input-field" value={new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5)} />
          </div>
        </div>
        <div className="CondemnationandDisposalViewPopUp-form-section">
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Make And Model</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalRequestDTO?.makeAndModel} />
          </div>

          {/* <div className="CondemnationandDisposalViewPopUp-section-header">Condemnation and Disposal Details</div> */}
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Life Recommended by Manufacturer</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalRequestDTO?.lifeRecommended} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Expenditure incurred on repairs	</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalRequestDTO?.expenditureIncurred} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Total downtime in months	</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalRequestDTO?.totalDowntime} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Name Of Proposer</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>

            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalRequestDTO?.nameOfProposer} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Name Of Operator</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.condemnationDisposalRequestDTO?.nameOfOperator} />
          </div>
        </div>
        <div className="CondemnationandDisposalViewPopUp-form-section">
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Name For Recommending</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.recommended} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <label className="CondemnationandDisposalViewPopUp-label"></label>
            <span className="CondemnationandDisposalViewPopUp-separator"></span>
            <div className="CondemnationandDisposalViewPopUp-input-container">
              <div className="CondemnationandDisposalViewPopUp-checkbox-group">
                <label className="CondemnationandDisposalViewPopUp-checkbox-label">
                  <input
                    type="checkbox"
                    className="CondemnationandDisposalViewPopUp-checkbox"
                    checked={!!selectedcondmnaton.condemnationDisposalRequestDTO?.condemnation}
                    readOnly
                  />
                  Condemnation
                </label>
                <label className="CondemnationandDisposalViewPopUp-checkbox-label">
                  <input type="checkbox" className="CondemnationandDisposalViewPopUp-checkbox"
                    checked={!!selectedcondmnaton.disposal} />
                  Disposal
                </label>
              </div>
            </div>
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Remarks</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" className="CondemnationandDisposalViewPopUp-input-field" value={selectedcondmnaton.remarks} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Type</span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            <input type="text" value={selectedcondmnaton.condemnationDisposalRequestDTO?.type} />
          </div>
          <div className="CondemnationandDisposalViewPopUp-form-group">
            <span className="CondemnationandDisposalViewPopUp-label">Approve status <span className='CondemnationandDisposalViewPopUp-required'>*</span></span>
            <span className="CondemnationandDisposalViewPopUp-separator">:</span>
            {/* <input type="text" className="CondemnationandDisposalViewPopUp-input-field" name='status' value={formData.status} onChange={handleInputChange}/> */}

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

          <div className="CondemnationandDisposalViewPopUp-section-header">Attachment</div>
          <div className="CondemnationandDisposalViewPopUp-file-upload">
            <input
              type="text"
              className="CondemnationandDisposalViewPopUp-input-field"
              placeholder="File Name"
              value={fileName}
              readOnly
            />
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              className="CondemnationandDisposalViewPopUp-btn-secondary"
              onClick={handleChooseFileClick}
            >
              Choose File
            </button>
            <button className="CondemnationandDisposalViewPopUp-btn-secondary">Upload</button>
          </div>
        </div>
      </div>

      <div className="CondemnationandDisposalViewPopUp-tabs-section">
        <div className="CondemnationandDisposalViewPopUp-tab-buttons">
          <button
            className={`CondemnationandDisposalViewPopUp-tab-btn ${activeTab === 'proposal' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposal')}
          >
            Details
          </button>

        </div>

        {activeTab === 'proposal' ? (
          <div className="CondemnationandDisposalViewPopUp-table-container">

            <table className="CondemnationandDisposalViewPopUp-data-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions", // Move the "Actions" column to the front
                    "SN",
                    "Approved By",


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
                {proposalDetails.map((row, index) => (
                  <tr key={row.sn}>
                    <td>
                      <button
                        className="CondemnationandDisposalViewPopUp-btn-add"
                        onClick={() => handleAddRow('proposal')}
                      >
                        Add
                      </button>
                      <button
                        className="CondemnationandDisposalViewPopUp-btn-delete"
                        onClick={() => handleDeleteRow('proposal', index)}
                      >
                        Del
                      </button>
                    </td>
                    <td>{row.sn}</td>
                    <td><input type="text" value={selectedcondmnaton.approvalBy?.doctorName} /></td> {/* For Schedule Date */}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="CondemnationandDisposalViewPopUp-table-container">
            <div className="CondemnationandDisposalViewPopUp-table-actions">
              <span>Existing Schedules</span>
            </div>


            <table className="CondemnationandDisposalViewPopUp-data-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Schedule Date",
                    "EMaintenance Type",
                    "ERemarks",
                    "To Do",
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
                {approvedDetails.map((row, index) => (
                  <tr key={row.sn}>
                    <td>
                      <button
                        className="CondemnationandDisposalViewPopUp-btn-add"
                        onClick={() => handleAddRow('approved')}
                      >
                        Add
                      </button>
                      <button
                        className="CondemnationandDisposalViewPopUp-btn-delete"
                        onClick={() => handleDeleteRow('approved', index)}
                      >
                        Del
                      </button>
                    </td>
                    <td>{row.sn}</td>
                    <td><input type="text" /></td> {/* Schedule Date */}
                    <td><input type="text" /></td> {/* EMaintenance Type */}
                    <td><input type="text" /></td> {/* ERemarks */}
                    <td><input type="text" /></td> {/* To Do */}
                  </tr>
                ))}
              </tbody>
            </table>



          </div>
        )}
      </div>
      <button className="CondemnationandDisposalViewPopUp-btn-blue" onClick={handleSubmit}>
        Save
      </button>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
};

export default CondemnationandDisposalViewPopUp;