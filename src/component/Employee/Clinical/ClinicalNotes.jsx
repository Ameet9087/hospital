import React, { useState, useEffect, useRef } from 'react';
import './ClinicalNotes.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const ClinicalNotes = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  return (
    <div className="clinical-notes-container">
      <div className="clinical-notes-form-section">
        <div className='clinical-header'>
          <h3 >Clinical Notes Variable</h3>
        </div>
        <div className="clinical-notes-form-group">
          <label>Display Name<span>*</span></label>
          <input type="text" placeholder="Display Name" />
        </div>
        <div className="clinical-notes-form-group">
          <label>Field Name<span>*</span></label>
          <input type="text" placeholder="Field Name" />
        </div>
        <div className="clinical-notes-form-group">
          <label>Display Order<span>*</span></label>
          <input type="number" defaultValue="0" />
        </div>
        <div className="clinical-notes-button-group">
          <button className="clinical-notes-clear-btn">Clear</button>
          <button className="clinical-notes-save-btn">Save</button>
        </div>
      </div>

      <div className="clinical-notes-search-section">
        <input type="text" placeholder="Search" />
        {/* <button>
          <i className="fas fa-search"></i>
        </button> */}
      </div>
      <div className='clicnical-notes-span'>
        <span>Showing 1 / 1 results</span>

      </div>
      {/* <div className='clinical-notes-ta'> */}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Display Name",
                "Field Name",
                "Display Order",
                "Action"
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
            <tr>
              <td>Display Name*</td>
              <td>Field Name</td>
              <td>0</td>
              <td>
                <button className="clinical-notes-edit-btn">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="clinical-notes-pagination">

          {/* <div className="clinical-notes-pagination-buttons">
            <button>First</button>
            <button>Previous</button>
            <span>Page 1 of 1</span>
            <button>Next</button>
            <button>Last</button>
          </div> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ClinicalNotes;
