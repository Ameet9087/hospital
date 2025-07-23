import React, { useState } from 'react';
import "../LabSetting/mapGovernmentItems.css" 
// import LSLabTestAddNLTest from './lSLabTestAddNLTest';
import LabMapGovMapNewGov from './labMapGovMapNewGov';
const labTests = [
  // { vendorCode:'INTERNAL',vendorName: "Lab Internal", address: "", contactNo: "normal",  isExternal: "false", isActive:'true', isDefault:'true' }, 
  { sn: 1, govTestName: 'Hb', groupName: 'HIV RDT Total', mappedLabTestName: '', isComponentBased: 'false' ,componentName:'',positiveIndicator:'' },
   { sn: 2, govTestName: 'RBC Count', groupName: 'HIV RDT Positive', mappedLabTestName: '', isComponentBased: 'false',componentName:'' ,positiveIndicator:''},
   { sn: 3, govTestName: 'TLC', groupName: 'HAV ELISA/CLIA Total', mappedLabTestName: '', isComponentBased: 'false',componentName:'' ,positiveIndicator:''},
   { sn: 4, govTestName: 'Platelets Count', groupName: 'HAV ELISA/CLIA Positive', mappedLabTestN: '', isComponentBased: 'false',componentName:'' ,positiveIndicator:''},
   { sn: 5, govTestName: 'DLC ', groupName: 'HBsAg ELISA/CLIA Total' , mappedLabTestName: '', isComponentBased: 'false', componentName:'',positiveIndicator:''},
   { sn: 6, govTestName: 'ESR', groupName: 'HBsAg ELISA/CLIA Posit', mappedLabTestName: '', isComponentBased: 'false' ,componentName:'',positiveIndicator:''},
   { sn: 7, govTestName: 'PCV/Hct', groupName: 'HCV RDT Total', mappedLabTestName: '', isComponentBased: 'false' ,componentName:'',positiveIndicator:''},
   { sn: 8, govTestName: 'MCV', groupName: 'HCV RDT Positive', mappedLabTestName: '', isComponentBased: 'false' ,componentName:'',positiveIndicator:''},
   { sn: 9, govTestName: 'MCH', groupName: 'HEV ELISA/CLIA Total', mappedLabTestName: '', isComponentBased: 'false',componentName:'' ,positiveIndicator:''},
   { sn: 10, govTestName: 'MCHC', groupName: 'HEV ELISA/CLIA Positive', mappedLabTestName: '', isComponentBased: 'false',componentName:'' ,positiveIndicator:''},
 { sn: 11, govTestName: 'RDW', groupName: 'Anti-HBs', mappedLabTestName: '', isComponentBased: 'false' ,componentName:'',positiveIndicator:''},
        
  // Add more rows as needed
  

];

const MapGovernmentItemxs = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="mapGovernmentItems-container">
    <div className="mapGovernmentItems-firstRow">
    <div className="mapGovernmentItems-addBtn">
      <button className="mapGovernmentItems-add-button" onClick={handleAddNewLabTestClick}>+ Map New Component</button>
      </div>
        
      </div>
      <div className='mapGovernmentItems-search-N-result'>
      <div className="mapGovernmentItems-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="mapGovernmentItems-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="mapGovernmentItems-print-button">Print</button>
        </div>
        </div>
      <table >
        <thead>
          <tr>
          <th>S.N</th>
             <th>Gov. Test Name</th>
             <th>Group Name</th>
             <th>Mapped Lab Test Name</th>
             <th>Is Component Based</th>
             <th>Component Name</th>
             <th>Positive Indicator</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {labTests.map((test, index) => (
            <tr key={index}>
              <td>{test.sn}</td>
              <td>{test.govTestName}</td>
              <td>{test.groupName}</td>
              <td>{test.mappedLabTestName}</td>
              <td>{test.isComponentBased}</td>
              <td>{test.componentName}</td>
              <td>{test.positiveIndicator}</td>
              
              <td>
                <button className="mapGovernmentItems-edit-button"onClick={handleAddNewLabTestClick}>Add</button>
                {/* <button className="mapGovernmentItems-deactivate-button">Deactivate</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="mapGovernmentItems-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="mapGovernmentItems-modal">
          <div className="mapGovernmentItems-modal-content">
            <LabMapGovMapNewGov onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapGovernmentItemxs;
