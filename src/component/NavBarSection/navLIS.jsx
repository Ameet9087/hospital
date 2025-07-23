// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import NavLISMachineResults from "./NavLIS/navLIS-MachineResults";
// import "../NavBarSection/navLIS.css"

// function NavLIS() {
//   const [selectedTab, setSelectedTab] = useState("SMS"); // State to keep track of the selected tab
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   return (
//     <div className="labLIS-page">
//       <div className="labLIS-N-imu-btn">
//       <div className="labLIS-tabs">
//         <button
//           className={`labLIS-tab ${selectedTab === "SMS" ? "labLIS-active" : ""}`}
//           onClick={() => setSelectedTab("SMS")}
//         >
//           LIS
//         </button>
//         </div>
//         <div className="labLIS-tabs"> 
//         <button
//           className={`labLIS-tab ${selectedTab === "IMU" ? "labLIS-active" : ""}`}
//           onClick={() => setSelectedTab("IMU")}
//         >
//           Machine Result
//         </button>
//       </div>
//       </div>

//       {selectedTab === "SMS" ? (
//         <div className="labLIS-Note-sms-content">
//           <div className="labLIS-filters">
            

//               <div className="labLIS-show-data">
//               <button className="labLIS-show-data-btn">
//               <i class="fa-solid fa-plus"></i>
//               Add New Mapping</button>

//             </div>

            
//           </div>

//           <div className="labLIS-note-search-n-filter">

//             <div className="labLIS-Not-search-bar">
//               <i className="fa-solid fa-magnifying-glass"></i>
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="labLIS-Not-search-input"
//               />
//             </div>

            

//             <div className="labLIS-filter-findings">
//             <span>Showing Results </span>
//               <button className="labLIS-filter-findings-Printbtn">Print</button>
//             </div>
//           </div>
//           <div className='labLIS-table-N-paginationDiv'>
//           <table className="labLIS-data-table">
//             <thead>
//               <tr>
//                 <th>Machine Name</th>
//                 <th>Component Name</th>
//                 <th>LIS Component Name</th>
//                 <th>Conversion Factor</th>
//                 <th>IsActive</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>{/* Table rows would go here */}</tbody>
//           </table>

//           {/* <div className="labLIS-pagination">
//         <button>« Previous</button>
//         <button>Next »</button>
//       </div> */}
//       <div className="labLIS-pagination">
//           <span>0 to 0 of 0</span>
//           <button>First</button>
//           <button>Previous</button>
//           <span>Page 0 of 0</span>
//           <button>Next</button>
//           <button>Last</button>
//         </div>
//         </div>

//         </div>
//       ) : (
//         <NavLISMachineResults />
//       )}
//     </div>
//   );
// }

// export default NavLIS;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavLISMachineResults from "./NavLIS/navLIS-MachineResults";
import LabLISAddNewMapping from "./NavLIS/labLISAddNewMapping";
import "../NavBarSection/navLIS.css";

function NavLIS() {
  const [selectedTab, setSelectedTab] = useState("SMS"); // State to keep track of the selected tab
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showMappingPopup, setShowMappingPopup] = useState(false); // State to control the popup visibility

  const openMappingPopup = () => {
    setShowMappingPopup(true);
  };

  const closeMappingPopup = () => {
    setShowMappingPopup(false);
  };

  return (
    <div className="labLIS-page">
      <div className="labLIS-N-imu-btn">
        <div className="labLIS-tabs">
          <button
            className={`labLIS-tab ${selectedTab === "SMS" ? "labLIS-active" : ""}`}
            onClick={() => setSelectedTab("SMS")}
          >
            LIS
          </button>
        </div>
        <div className="labLIS-tabs"> 
          <button
            className={`labLIS-tab ${selectedTab === "IMU" ? "labLIS-active" : ""}`}
            onClick={() => setSelectedTab("IMU")}
          >
            Machine Result
          </button>
        </div>
      </div>

      {selectedTab === "SMS" ? (
        <div className="labLIS-Note-sms-content">
          <div className="labLIS-filters">
            <div className="labLIS-show-data">
              <button className="labLIS-show-data-btn" onClick={openMappingPopup}>
                <i className="fa-solid fa-plus"></i>
                Add New Mapping
              </button>
            </div>
          </div>

          <div className="labLIS-note-search-n-filter">
            <div className="labLIS-Not-search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search"
                className="labLIS-Not-search-input"
              />
            </div>

            <div className="labLIS-filter-findings">
              <span>Showing Results </span>
              <button className="labLIS-filter-findings-Printbtn"><i class="fa-solid fa-print"></i> Print</button>
            </div>
          </div>
          <div className="labLIS-table-N-paginationDiv">
            <table className="labLIS-data-table">
              <thead>
                <tr>
                  <th>Machine Name</th>
                  <th>Component Name</th>
                  <th>LIS Component Name</th>
                  <th>Conversion Factor</th>
                  <th>IsActive</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{/* Table rows would go here */}</tbody>
            </table>

            {/* <div className="labLIS-pagination">
              <span>0 to 0 of 0</span>
              <button>First</button>
              <button>Previous</button>
              <span>Page 0 of 0</span>
              <button>Next</button>
              <button>Last</button>
            </div> */}
          </div>
        </div>
      ) : (
        <NavLISMachineResults />
      )}

      {/* Conditionally render the popup */}
      {showMappingPopup && (
        <LabLISAddNewMapping onClose={closeMappingPopup} />
      )}
    </div>
  );
}

export default NavLIS;
