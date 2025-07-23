import React, { useState } from 'react';
import "../LabSetting/reportTemplate.css"
import LabReportTempAddNewLTC from './labReportTempAddNewLTC';
import LSLabTestAddNLTest from './lSLabTestAddNLTest';
const labTests = [
  { reportTemplateShortName: "Biochemistry", templateName: "Biochemistry", templateType: "normal",  displaySequence: 5 },
  { reportTemplateShortName: "Hematology", templateName: "Hematology", templateType: "normal",  displaySequence: 1 },
  { reportTemplateShortName: "Microbiology", templateName: "Microbiology", templateType: "normal",  displaySequence: 1 },
  { reportTemplateShortName: "Hematology", templateName: "Hematology", templateType: "normal",  displaySequence: 1 },
  // Add more rows as needed


];

const ReportTemplate = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="reportTemplate-container">
    <div className="reportTemplate-firstRow">
    <div className="reportTemplate-addBtn">
      <button className="reportTemplate-add-button" onClick={handleAddNewLabTestClick}>+Add New Lab Template</button>
      </div>
        
      </div>
      <div className='reportTemplate-search-N-result'>
      <div className="reportTemplate-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="reportTemplate-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="reportTemplate-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
      <table >
        <thead>
          <tr>
            <th>Report Template Short Name</th>
            <th>Template Name</th>
            <th>Template Type</th>
            <th>Display Sequence</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labTests.map((test, index) => (
            <tr key={index}>
              <td>{test.reportTemplateShortName}</td>
              <td>{test.templateName}</td>
              <td>{test.templateType}</td>
              <td>{test.displaySequence}</td>
              <td>
                <button className="reportTemplate-edit-button"onClick={handleAddNewLabTestClick}>Edit</button>
                <button className="reportTemplate-deactivate-button">Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="reportTemplate-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="reportTemplate-modal">
          <div className="reportTemplate-modal-content">
            <LabReportTempAddNewLTC onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportTemplate;
