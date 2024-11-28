// import React from 'react';
// import "../LabSetting/labCategories.css"
// const lookupData = [
//   {  name: 'Biochemistry', },
//   {  name: 'Hematology',},
//   {  name: 'Microbiology',},
//   {  name: 'Parasitology', },
//   {  name: 'Serology',  },
//   { name: 'Immunoassay',  },
//   { name: 'DEFAULT', },
//   {  name: 'HISTOCYTOLOGY',  },
//   {  name: 'OUT SOURCE', },
//   {  name: 'MOLECULAR BIOCHEMISTRY',  },
//   {  name: 'PATHOLOGY',  },
// ];

// function LabCategories() {
//   return (
//     <div className="app">
//       <button className="add-lookup-btn">+Add New Lab Categories</button>
//       <div className="search-container">
//         <input type="text" placeholder="Search" className="search-input" />
//         <button className="search-btn">🔍</button>
//       </div>
//       <div className="results-info">
//         Showing 29 / 29 results
//         <button className="print-btn">Print</button>
//       </div>
//       <table className="lookup-table">
//         <thead>
//           <tr>

//             <th>Category Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lookupData.map((item) => (
//             <tr key={item.id}>

//               <td>{item.name}</td>

//               <td>
//                 <button className="edit-btn">Edit</button>
//                 <button className="edit-btn">Deactivate</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LabCategories;

import React, { useState, useRef, useEffect } from "react";
import "../LabSetting/labCategories.css";
import LabCategoryAddNewLC from "./labCategoryAddNewLC";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import LabCategoryUpdateNewLC from "./LabCategoryUpdateNewLC";
// import LSLabTestAddNLTest from './lSLabTestAddNLTest';
const LabCategories = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [labCategories, setLabCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [labCategory, setLabCategory] = useState({});
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/lab-test-categories/getAll-testCategory`)
      .then((res) => res.json())

      .then((data) => setLabCategory(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/lab-test-categories/getAll-testCategory`)
      .then((res) => res.json())
      .then((data) => setLabCategories(data))
      .catch((err) => {
        console.log(err);
      });
  }, [showPopup, showUpdatePopup]);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowUpdatePopup(false);
  };
  const handleUpdateNewLabTestClick = (category) => {
    setLabCategory(category);
    setShowUpdatePopup(true); // Show the popup
    setShowPopup(false);
  };

  return (
    <div className="labCategories-container">
      <div className="labCategories-firstRow">
        <div className="labCategories-addBtn">
          <button
            className="labCategories-add-button"
            onClick={handleAddNewLabTestClick}
          >
            + Add New Lab Categories
          </button>
        </div>
      </div>
      <div className="labCategories-controls">
          <div className="labCategories-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>

    </div>
</div>
      <div className="labCategories-search-N-result">
        <div className="labCategories-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="labCategories-results-info">
          <span>
            Showing {labCategories?.length} / {labCategories?.length} results
          </span>
          <button className="labCategories-print-button">
          <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="labCategories-print-button">
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Category", "Action"].map((header, index) => (
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
            {labCategories != null &&
              labCategories?.map((category, index) => (
                <tr key={index}>
                  <td>{category.labTestCategoryName}</td>

                  <td>
                    <button
                      className="labCategories-edit-button"
                      onClick={() => handleUpdateNewLabTestClick(category)}
                    >
                      Edit
                    </button>
                    {/* <button className="labCategories-deactivate-button">
                      Deactivate
                    </button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* <div className="labCategories-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="labCategories-modal">
          <div className="labCategories-modal-content">
            <LabCategoryAddNewLC onClose={handleClosePopup} />
          </div>
        </div>
      )}
      {showUpdatePopup && (
        <div className="labCategories-modal">
          <div className="labCategories-modal-content">
            <LabCategoryUpdateNewLC
              labCategory={labCategory}
              onClose={handleClosePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LabCategories;
