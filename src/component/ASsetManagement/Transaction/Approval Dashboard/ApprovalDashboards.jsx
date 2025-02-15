import React, { useState, useRef, useEffect } from 'react';
import './Approvaldashboards.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import CustomModal from '../../../../CustomModel/CustomModal';
import CondemnationandDisposalViewPopUp from '../Condemnation and Disposal View/CondemnationandDisposalViewPopUp';
import EquipmentGatePassInViewPopUp from '../Equipment Gate Pass In View/EquipmentGatePassInViewPopUp';
import EquipmentGatePassOutPopUp from '../EqipmentGatepassout/EquipmentGatePassOutPopUp';
import EquipmentGatePassOUTView from '../Equipment Gate Pass Out View/EquipmentGatePassOUTPopUp';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput } from '../../../../FloatingInputs';
import {toast}  from "react-toastify";


const ApprovalDashboards = ({ bookingId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [condemnationDisposalRows, setCondemnationDisposalRows] = useState([]);
  const [gatePassOutData, setGatePassOutData] = useState([]);
                                        


  useEffect(() => {
    const fetchCondemnationDisposalsData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/condemnation-disposals`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        // Map API data to table row format
        const formattedData = data.map((item, index) => ({
          sn: index + 1,
          condemnNo: item.condemnationDisposalId || 'N/A',
          nameOfEquipment: item.nameOfEquipment || 'Unknown Equipment',
          approvalDate: item.approvalDate || 'N/A',
          approvalTime: item.approvalTime || 'N/A',
          remarks: item.remarks || 'No remarks provided',
          approvalStatus: item.approvalStatus || 'Pending',
          approvedBy: item.approvedBy || 'Not Approved',
        }));
        setCondemnationDisposalRows(formattedData);
      } catch (error) {
        console.error('Failed to fetch condemnation disposals data:', error);
      }
    };
  
    fetchCondemnationDisposalsData(); // Call the function here
  }, []); // Close the useEffect dependency array properly
  
  useEffect(() => {
    const fetchGatePassINData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-gate-pass-in`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setGatePassINRows(data);
        
      } catch (error) {
        console.error('Failed to fetch Gate Pass IN data:', error);
      }
    };

    fetchGatePassINData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/gatePassOut`); // Update with the correct API endpoint
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setGatePassOutData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);



  const [packageTableRows, setPackageTableRows] = useState([
  
  ]);


  const [defectTableRows, setDefectTableRows] = useState([
    {
      sn: 1,
      entryReferenceNo: '',
      drugAssetCode: '',
      tradeName: '',
      doctorName: '',
      defectRaisingApprovalName: '',
      approval: '',
    }
  ]);

  const [gatePassINRows, setGatePassINRows] = useState([
    {
      sn: 1,
      name: '',
    }
  ]);

  const [selectedSection, setSelectedSection] = useState('proposalAMC');

  //Dhanashree
  const [showPopUp, setShowPopUp] = useState(false); // Popup state
  const [showPopUpRequest, setShowPopUpRequest] = useState(false); // Popup state
  const [showDisposalPopUp, setShowsetDisposalPopUp ]= useState(false);

  const [showReplacementPopup, setShowReplacementPopup] = useState(false);
  const [showGatePassInPopup, setShowGatePassInPopup] = useState(false);
  const [showGatePassOutPopup, setShowGatePassOutPopup] = useState(false);


  const [showDisposalPopup, setShowDisposalPopup] = useState(false);
  



  const openReplacementPopup = () => {
    setShowReplacementPopup(true);
  };
    const closeReplacementPopup = () => setShowReplacementPopup(false);

  const openDisposalPopup = () => setShowDisposalPopup(true);
  const closeDisposalPopup = () => setShowDisposalPopup(false);

  const openGatePassInPopup = () => setShowGatePassInPopup(true);
  const closeGatePassInPopup = () => setShowGatePassInPopup(false);

  const openGatePassOutPopup = () => setShowGatePassOutPopup(true);
  const closeGatePassOutPopup = () => setShowGatePassOutPopup(false);

 


  const sectionTitles = {
    // proposalAMC: "Proposal For AMC Approval",
    // replacementEquipment: "Replacement of Equipment Approval",
    condemnationDisposal: "Condemnation and Disposal",
    gatePassIN: "Gate Pass IN",
    gatePassOUT: "Gate Pass OUT",
  };


  

  const handleAddRow = (tableType) => {
    if (tableType === 'proposalAMC') {
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
    } else if (tableType === 'defectRaising') {
      const newRow = {
        sn: defectTableRows.length + 1,
        entryReferenceNo: '',
        drugAssetCode: '',
        tradeName: '',
        doctorName: '',
        defectRaisingApprovalName: '',
        approval: '',
      };
      setDefectTableRows([...defectTableRows, newRow]);
    } else if (tableType === 'gatePassIN') {
      const newRow = {
        sn: gatePassINRows.length + 1,
        name: '',
      };
      setGatePassINRows([...gatePassINRows, newRow]);
    } else if (tableType === 'replacementEquipment' || tableType === 'condemnationDisposal' || tableType === 'gatePassOUT') {
      const newRow = {
        sn: gatePassINRows.length + 1,
        name: '',
      };
      setGatePassINRows([...gatePassINRows, newRow]);
    }
  };
  

  const handleDeleteRow = (indexToRemove, tableType) => {
    if (tableType === 'proposalAMC') {
      const updatedRows = packageTableRows.filter((_, index) => index !== indexToRemove);
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1
      }));
      setPackageTableRows(renumberedRows);
    } else if (tableType === 'defectRaising') {
      const updatedRows = defectTableRows.filter((_, index) => index !== indexToRemove);
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1
      }));
      setDefectTableRows(renumberedRows);
    } else if (tableType === 'gatePassIN') {
      const updatedRows = gatePassINRows.filter((_, index) => index !== indexToRemove);
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1
      }));
      setGatePassINRows(renumberedRows);
    }
  };

  const handleOpenPopUp = () => {
    setShowPopUp(true); // Open popup
  };

  const closePopup = () => {
    setShowPopUp(false); // Close popup
  };



  const renderProposalForAMCApprovalTable = () => (
    <table ref={tableRef}>
      <thead>
        <tr>
          {[
            'Actions',
            'SN',
            'Entry Reference No',
            'Drug/ Asset Code',
            'Trade Name',
            'Doctor Name',
            'Generic / Molecule Name',
            'Approval',
            'View Attachment',
          ].map((header, index) => (
            <th
              key={index}
              style={{ width: columnWidths[index] }}
              className="ApprovalDashboards-resizable-th"
            >
              <div className="ApprovalDashboards-header-content">
                <span>{header}</span>
                <div
                  className="ApprovalDashboards-resizer"
                  onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
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
              <div className="ApprovalDashboards-table-actions">
                <button className="ApprovalDashboards-add-btn" onClick={handleAddRow}>
                  Add
                </button>
                <button
                  className="ApprovalDashboards-del-btn"
                  onClick={() => handleDeleteRow(index)}
                  disabled={packageTableRows.length <= 1}
                >
                  Del
                </button>
              </div>
            </td>
            <td>{row.sn}</td>
            <td>{row.entryReferenceNo}</td>
            <td>{row.drugAssetCode}</td>
            <td>{row.tradeName}</td>
            <td>{row.doctorName}</td>
            <td>{row.genericMoleculeName}</td>
            <td>
              <button
                className="ApprovalDashboards-popup-btn"
                onClick={handleOpenPopUp}
              >
                Proposal For AMC Approval
              </button>
            </td>
            <td>
              <button>View Attachment</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );


 
  const renderGatePassINApprovalTable = () => (
    <table ref={tableRef}>
      <thead>
        <tr>
          {['SN', 'Gate Pass In No', 'DC No', 'Gate Entry No', 'Prepared By', 'Approval'].map((header, index) => (
            <th
              key={index}
              style={{ width: columnWidths[index] }}
              className="ApprovalDashboards-resizable-th"
            >
              <div className="ApprovalDashboards-header-content">
                <span>{header}</span>
                <div
                  className="ApprovalDashboards-resizer"
                  onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                ></div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {gatePassINRows.map((row, index) => (
          <tr key={index}>
            
            <td>{index + 1}</td>
            <td>{row.gatePassInId}</td>
            <td>{row.dcNo}</td>
            <td>{row.gateEntryNo}</td>
            <td>{row.preparedBy}</td>
            <td>
              <button onClick={openGatePassInPopup}>Approve</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );


  

  {/* Disposal Approval Popup */}
  

  {/* Gate Pass IN Popup */}
 

  {/* Gate Pass OUT Popup */}
  


  const renderReplacementEquipmentApprovalTable = () => (
    <table ref={tableRef}>
      <thead>
        <tr>
          {["Actions", "SN", "Name", "Approval"].map((header, index) => (
            <th
              key={index}
              style={{ width: columnWidths[index] }}
              className="ApprovalDashboards-resizable-th"
            >
              <div className="ApprovalDashboards-header-content">
                <span>{header}</span>
                <div
                  className="ApprovalDashboards-resizer"
                  onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                ></div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {gatePassINRows.map((row, index) => (
          <tr key={index}>
            <td>
              <div className="ApprovalDashboards-table-actions">
                <button
                  className="ApprovalDashboards-add-btn"
                  onClick={() => handleAddRow('replacementEquipment')}
                >
                  Add
                </button>
                <button
                  className="ApprovalDashboards-del-btn"
                  onClick={() => handleDeleteRow(index, 'replacementEquipment')}
                  disabled={gatePassINRows.length <= 1}
                >
                  Del
                </button>
              </div>
            </td>
            <td>{row.sn}</td>
            <td>{row.name}</td>
            <td>{row.approval}
            <button onClick={openReplacementPopup}>Approve the Replacement</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

 
 // Fetch data from API
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/condemnation-view`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();

      // Map API data to the required fields
      const mappedData = data.map((item, index) => ({
        sn: index + 1,
        condemnNo: item.condemnNo || '',
        nameOfEquipment: item.nameOfEquipment || '',
        approvalDate: item.approvalDate || '',
        approvalTime: item.approvalTime || '',
        remarks: item.remarks || '',
        approvalStatus: item.approvalStatus || '',
        approvedBy: item.approvedBy || '',
      }));

      setGatePassINRows(mappedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  fetchData();
}, []);



const renderCondemnationDisposalTable = () => (
  <table ref={tableRef}>
    <thead>
      <tr>
        {[
          'SN',
          'Condem No',
          
          'Remarks',
          'Approval Status',
        ].map((header, index) => (
          <th
            key={index}
            style={{ width: columnWidths[index] }}
            className="ApprovalDashboards-resizable-th"
          >
            <div className="ApprovalDashboards-header-content">
              <span>{header}</span>
              <div
                className="ApprovalDashboards-resizer"
                onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
              ></div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {condemnationDisposalRows.map((row, index) => (
        <tr key={index}>
         
          <td>{row.sn}</td>
          <td>{row.condemnNo}</td>
        
          <td>{row.remarks}</td>
          <td>{row.approvalStatus}</td>
          <td>
            <button className="ApprovalDashboards-upload-button" onClick={openDisposalPopup}>Approve Disposal</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

   const renderGatePassOUTTable = () => (
    <table className="ApprovalDashboards-table">
      <thead>
        <tr>
          {[
            'Gate Pass ID',
            'Asset No',
            'Recommended By',
            'Reason',
            'Type',
            'Gate Pass Out Date',
           
            'Authorised By',
            'Type of Equipment',
            'Remark',
           
            'Actions',
          ].map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {gatePassOutData.map((row) => (
          <tr key={row.gatePassOutId}>
            <td>{row.gatePassOutId}</td>
            <td>{row.assetNo}</td>
            <td>{row.recommendedBy}</td>
            <td>{row.reason}</td>
            <td>{row.type}</td>
            <td>{row.gatePassOutDate}</td>
            <td>{row.authorisedBy}</td>
            <td>{row.typeOfEquipment}</td>
            <td>{row.remark}</td>
          
          
            <td>
              <button className="ApprovalDashboards-upload-button" onClick={() => openGatePassOutPopup(row)}>Approval</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderTable = (section) => {
    switch (section) {
      case 'proposalAMC':
        return renderProposalForAMCApprovalTable();
    
      case 'gatePassIN':
        return renderGatePassINApprovalTable();
      case 'replacementEquipment':
        return renderReplacementEquipmentApprovalTable();
      case 'condemnationDisposal':
        return renderCondemnationDisposalTable();
      case 'gatePassOUT':
        return renderGatePassOUTTable();
      default:
        return null;
    }
  };
  

  return (
    <div className="ApprovalDashboards-Events">
      <div className="ApprovalDashboards-title-bar">
        <div className="ApprovalDashboards-header">
          <span>Approval Dashboard</span>
        </div>
      </div>

      <div className="ApprovalDashboards-content-wrapper">
        <div className="ApprovalDashboards-main-section">
          <div className="ApprovalDashboards-panel dis-templates">
            <div className="ApprovalDashboards-panel-content">
              <div className="ApprovalDashboards-form-row">
                <FloatingInput
                label={"From Date"}
                type="date" value=""/>
                
              </div>
            </div>
          </div>

          <div className="ApprovalDashboards-panel operation-details">
            <div className="ApprovalDashboards-panel-content">
              <div className="ApprovalDashboards-form-row">
              <FloatingInput
                label={"From Date"}
                type="date" value=""/>
              
              </div>
            </div>
          </div>

          <div className="ApprovalDashboards-panel operation-details">
            <div className="ApprovalDashboards-panel-header">View Documents</div>
            <div className="ApprovalDashboards-panel-content">
              <div className="ApprovalDashboardsPanels">
                <input type="text" placeholder="Enter text" className="ApprovalDashboards-text-input" />
                <input type="file" className="ApprovalDashboards-file-input" />
                <button className="ApprovalDashboards-upload-button">Upload</button>
              </div>
            </div>
          </div>
        </div>

        <div className="ApprovalDashboards-services-section">
          <div className="ApprovalDashboards-services-table">
            <div className="ApprovalDashboards-title-bar">
            <div className="ApprovalDashboards-header">
  {Object.keys(sectionTitles).map((section) => (
    <button
      key={section}
      className={`ApprovalDashboards-ApprovalDashboardsBtns ${selectedSection === section ? 'active' : ''}`}
      onClick={() => setSelectedSection(section)}
    >
      {sectionTitles[section]}
    </button>
  ))}
</div>



            </div>

            {renderTable(selectedSection)}
            {showReplacementPopup && (
    <CustomModal isOpen={showReplacementPopup} onClose={closeReplacementPopup}>
      <ReplacementOfRequestApproval />
    </CustomModal>
  )}
  
 

            {showPopUp && (

              <CustomModal isOpen={showPopUp} onClose={closePopup}>
                  <AMCProposalForm/>
                  </CustomModal>  
            )}

            
  
  
  {showDisposalPopup && (
    <CustomModal isOpen={showDisposalPopup} onClose={closeDisposalPopup}>
      <CondemnationandDisposalViewPopUp/>
    </CustomModal>
  )}

{showGatePassInPopup && (
    <CustomModal isOpen={showGatePassInPopup} onClose={closeGatePassInPopup}>
      <EquipmentGatePassInViewPopUp/>
    </CustomModal>
  )}
  {showGatePassOutPopup && (
    <CustomModal isOpen={showGatePassOutPopup} onClose={closeGatePassOutPopup}>
      <EquipmentGatePassOUTView/>
    </CustomModal>
  )}
          </div>
        </div>

        <div className="ApprovalDashboards-action-buttons">
          {/* <button className="ApprovalDashboards-btn-blue">Save</button> */}
        </div>
      </div>
    </div>
  );
};

export default ApprovalDashboards;
