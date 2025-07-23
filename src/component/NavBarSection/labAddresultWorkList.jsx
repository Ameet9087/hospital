import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";
import "react-datepicker/dist/react-datepicker.css";
import "../NavBarSection/labAddresultWorkList.css";
import { useLocation } from "react-router-dom";

const LabAddResultWorkList = ({ onClose }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [category, setCategory] = useState("Biochemistry");
  const componentRef = useRef();
  console.log(test);

  return (
    <div className="labAddresultWorkList-container">
      <div className="labAddresultWorkList-header">
        <h4>Work List</h4>
        <button className="labAddresultWorkList-close-button" onClick={onClose}>
          X
        </button>
      </div>

      <div className="labAddresultWorkList-filters">
        <div className="labAddresultWorkList-date-range">
          <span>Sample Collection Date:</span>

          <div className="labAddresultWorkList-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
            {/* <button className="labAddresultWorkList-star-button">☆</button> */}
            {/* <button className="labAddresultWorkList-ok-button">OK</button> */}
          </div>
        </div>

        <div className="labAddresultWorkList-category-select">
          <span>Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select All</option>
            <option value="Biochemistry">Biochemistry</option>
            <option value="Hematology">Hematology</option>
            <option value="Microbiology">Microbiology</option>
            <option value="Parasitology">Parasitology</option>
            <option value="Serology">Serology</option>
            <option value="Immunoassay">Immunoassay</option>
            <option value="DEFAULT">DEFAULT</option>
            <option value="HISTOCYTOLOGY">HISTOCYTOLOGY</option>
            <option value="OUT SOURCE">OUT SOURCE</option>
            <option value="MOLECULAR BIOCHEMISTRY">
              MOLECULAR BIOCHEMISTRY
            </option>
            <option value="PATHOLOGY">PATHOLOGY</option>
            <option value="TUMOR MARKER">TUMOR MARKER</option>
            <option value="VIROLOGY">VIROLOGY</option>
            <option value="Blood Transfusion">Blood Transfusion</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <button className="labAddresultWorkList-load-button">
          Load <i className="fa fa-refresh" />
        </button>
      </div>

      <div ref={componentRef} className="labAddresultWorkList-table-container">
        <div className="labAddresultWorkList-table-header">
          <div className="labAddresultWorkList-hospital-info">
            <p>From: 2024-08-26</p>
            <p>To: 2024-08-26</p>
          </div>
          <div className="labAddresultWorkList-hospital-info">
            <p>Demo Hospital</p>
            <p>P.O Box 1718 RUIRU</p>
            <p>Work List Report</p>
            <p>Department:</p>
          </div>
          <div className="labAddresultWorkList-print-info">
            <p>
              Printed On: {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        <table className="labAddresultWorkList-table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Collected On</th>
              <th>Run No.</th>
              <th>BarCode No.</th>
              <th>Patient Name</th>
              <th>Hospital No</th>
              <th>Age/Sex</th>
              <th>Tests</th>
            </tr>
          </thead>
          <tbody>{/* Rows can be dynamically generated here */}</tbody>
        </table>
      </div>

      <div className="labAddresultWorkList-print-button-container">
        <ReactToPrint
          trigger={() => (
            <button className="labAddresultWorkList-print-button">
              <i className="fa fa-print"></i> Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
};

export default LabAddResultWorkList;
