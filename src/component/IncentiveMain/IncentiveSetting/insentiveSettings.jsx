// import React, { useState } from "react";
// import "../IncentiveSetting/insentiveSettings.css";
// import InsentiveSettingsEISNewEI from "./insentiveSettingsEISNewEI";
// import IncentiveSettingProfileManage from "./incentiveSettingProfileManage";
// import InsentiveSettingsEISEditBtn from "./insentiveSettingsEISEditBtn"; // Import the component to be shown in the popup
// import InsentiveSettingsEISEditTDSBtn from "./insentiveSettingsEISEditTDSBtn";

// const InsentiveSettings = () => {
//   const [selectedTab, setSelectedTab] = useState("Invoice");
//   const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
//   const [showEditPopup, setShowEditPopup] = useState(false); // State to manage the visibility of the Edit Item popup
//   const [showEditTdsPopup, setShowEditTdsPopup] = useState(false); // State to manage TDS popup visibility

//   // Function to render the content based on the selected tab
//   const renderTabContent = () => {
//     switch (selectedTab) {
//       case "Invoice":
//         return (
//           <div>
//             <div className="incentiveReport-filters">
//               <button
//                 className="incentiveReport-load-button"
//                 onClick={() => setShowPopup(true)} // Open New Employee Incentive popup on button click
//               >
//                 <i className="fa-solid fa-plus"></i> New Employee Incentive
//               </button>
//             </div>
//             <div className="insentiveSettings-search-Showing">
//               <div className="insentiveSettings-search-container">
//                 <input
//                   type="text"
//                   className="insentiveSettings-search-input"
//                   placeholder="Search"
//                 />
//                 <i className="fa fa-search search-icon"></i>
//               </div>

//               <div className="insentiveSettings-Showing">
//                 <span>Showing 3 / 3 results</span>
//                 <button>
//                   <i className="fa-regular fa-file-excel"></i> Export
//                 </button>
//                 <button>
//                   <i className="fa-solid fa-print"></i> Print
//                 </button>
//               </div>
//             </div>
//             <div className="insentiveSettings-profile-table-N-pagination">
//               <table className="insentiveSettings-profile-table">
//                 <thead>
//                   <tr>
//                     <th>Employee Name</th>
//                     <th>TDS Percent</th>
//                     <th>IsActive</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Dr. Ajhar Tamboli</td>
//                     <td>5</td>
//                     <td>true</td>
//                     <td>
//                       <button
//                         className="insentiveSettings-action-button iS-rename-button"
//                         onClick={() => setShowEditPopup(true)} // Show the Edit Item popup
//                       >
//                         Edit Items
//                       </button>
//                       <button className="insentiveSettings-action-button iS-deactivate-button">
//                         Deactivate
//                       </button>
//                       <button className="insentiveSettings-action-button iS-edit-items-button"
//                        onClick={() => setShowEditTdsPopup(true)} 
//                       >
//                         Edit TDS %
//                       </button>
//                     </td>
//                   </tr>
//                   {/* Add more rows as needed */}
//                 </tbody>
//               </table>
//               <div className="insentiveSettings-pagination">
//                 <span>0 to 0 of 0</span>
//                 <button>First</button>
//                 <button>Previous</button>
//                 <span>Page 0 of 0</span>
//                 <button>Next</button>
//                 <button>Last</button>
//               </div>
//             </div>
//           </div>
//         );
//       case "Invoice-Items":
//         return <IncentiveSettingProfileManage />;
//       case "Bill Sync":
//         return <IncentiveTransactionsBillScan />;
//       case "Payment":
//         return <IncentiveTransationPayment />;
//       default:
//         return <div>Invoice Content Here</div>;
//     }
//   };

//   return (
//     <div className="incentiveReport-container">
//       <div className="incentiveReport-tabs">
//         <div
//           className={`incentiveReport-tab ${
//             selectedTab === "Invoice" ? "incentiveReport-selected" : ""
//           }`}
//           onClick={() => setSelectedTab("Invoice")}
//         >
//           Employee Items Setup
//         </div>
//         <div
//           className={`incentiveReport-tab ${
//             selectedTab === "Invoice-Items" ? "incentiveReport-selected" : ""
//           }`}
//           onClick={() => setSelectedTab("Invoice-Items")}
//         >
//           Profile Manage
//         </div>
//       </div>

//       {/* Render content based on the selected tab */}
//       {renderTabContent()}

//       {/* Conditionally render the New Employee Incentive popup */}
//       {showPopup && (
//         <div className="incentiveReport-popup-overlay">
//           <div className="incentiveReport-popup-content">
//             <button
//               className="incentiveReport-close-button"
//               onClick={() => setShowPopup(false)} // Close New Employee Incentive popup
//             >
//               x
//             </button>
//             <InsentiveSettingsEISNewEI />
//           </div>
//         </div>
//       )}

//       {/* Conditionally render the Edit Item popup */}
//       {showEditPopup && (
//         <div className="insentiveSettingsEISEditBtn-popup-overlay">
//           <div className="insentiveSettingsEISEditBtn-popup-content">
//             <button
//               className="insentiveSettingsEISEditBtn-close-button"
//               onClick={() => setShowEditPopup(false)} // Close Edit Item popup
//             >
//               x
//             </button>
//             <InsentiveSettingsEISEditBtn />
//           </div>
//         </div>
//       )}
//        {/* Render the Edit TDS popup */}
//        {showEditTdsPopup && (
//         <div className="incentiveSettingsEISEditTDSBtn-popup-overlay">
//           <div className="incentiveSettingsEISEditTDSBtn-popup-content">
//             <button
//               className="incentiveSettingsEISEditTDSBtn-close-button"
//               onClick={() => setShowEditTdsPopup(false)}
//             >
//               x
//             </button>
//             <InsentiveSettingsEISEditTDSBtn />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InsentiveSettings;

// import React, { useState } from "react";
// import "../IncentiveSetting/insentiveSettings.css";
// import InsentiveSettingsEISNewEI from "./insentiveSettingsEISNewEI";
// import IncentiveSettingProfileManage from "./incentiveSettingProfileManage";
// import InsentiveSettingsEISEditBtn from "./insentiveSettingsEISEditBtn";
// import InsentiveSettingsEISEditTDSBtn from "./insentiveSettingsEISEditTDSBtn";

// const InsentiveSettings = () => {
//   const [selectedTab, setSelectedTab] = useState("Invoice");
//   const [showPopup, setShowPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [showEditTdsPopup, setShowEditTdsPopup] = useState(false);

//   // State to manage activation status of each row
//   const [employeeData, setEmployeeData] = useState([
//     { name: "Dr. Ajhar Tamboli", tds: 5, isActive: true },
//     // Add more employees as needed
//   ]);

//   // Function to handle deactivation
//   const handleDeactivate = (index) => {
//     const updatedData = [...employeeData];
//     updatedData[index].isActive = false; // Set the employee to inactive
//     setEmployeeData(updatedData);
//   };

//   // Function to render the content based on the selected tab
//   const renderTabContent = () => {
//     switch (selectedTab) {
//       case "Invoice":
//         return (
//           <div>
//             <div className="incentiveReport-filters">
//               <button
//                 className="incentiveReport-load-button"
//                 onClick={() => setShowPopup(true)}
//               >
//                 <i className="fa-solid fa-plus"></i> New Employee Incentive
//               </button>
//             </div>
//             <div className="insentiveSettings-search-Showing">
//               <div className="insentiveSettings-search-container">
//                 <input
//                   type="text"
//                   className="insentiveSettings-search-input"
//                   placeholder="Search"
//                 />
//                 <i className="fa fa-search search-icon"></i>
//               </div>

//               <div className="insentiveSettings-Showing">
//                 <span>Showing {employeeData.length} / {employeeData.length} results</span>
//                 <button>
//                   <i className="fa-regular fa-file-excel"></i> Export
//                 </button>
//                 <button>
//                   <i className="fa-solid fa-print"></i> Print
//                 </button>
//               </div>
//             </div>
//             <div className="insentiveSettings-profile-table-N-pagination">
//               <table className="insentiveSettings-profile-table">
//                 <thead>
//                   <tr>
//                     <th>Employee Name</th>
//                     <th>TDS Percent</th>
//                     <th>IsActive</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {employeeData.map((employee, index) => (
//                     <tr key={index}>
//                       <td>{employee.name}</td>
//                       <td>{employee.tds}</td>
//                       <td>{employee.isActive ? "true" : "false"}</td>
//                       <td>
//                         {/* Conditionally render the buttons based on activation status */}
//                         {employee.isActive && (
//                           <>
//                             <button
//                               className="insentiveSettings-action-button iS-rename-button"
//                               onClick={() => setShowEditPopup(true)}
//                             >
//                               Edit Items
//                             </button>
//                             <button
//                               className="insentiveSettings-action-button iS-edit-items-button"
//                               onClick={() => setShowEditTdsPopup(true)}
//                             >
//                               Edit TDS %
//                             </button>
//                           </>
//                         )}
//                         <button
//                           className="insentiveSettings-action-button iS-deactivate-button"
//                           onClick={() => handleDeactivate(index)} // Deactivate the row
//                         >
//                           Deactivate
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="insentiveSettings-pagination">
//                 <span>0 to 0 of 0</span>
//                 <button>First</button>
//                 <button>Previous</button>
//                 <span>Page 0 of 0</span>
//                 <button>Next</button>
//                 <button>Last</button>
//               </div>
//             </div>
//           </div>
//         );
//       case "Invoice-Items":
//         return <IncentiveSettingProfileManage />;
//       case "Bill Sync":
//         return <IncentiveTransactionsBillScan />;
//       case "Payment":
//         return <IncentiveTransationPayment />;
//       default:
//         return <div>Invoice Content Here</div>;
//     }
//   };

//   return (
//     <div className="incentiveReport-container">
//       <div className="incentiveReport-tabs">
//         <div
//           className={`incentiveReport-tab ${
//             selectedTab === "Invoice" ? "incentiveReport-selected" : ""
//           }`}
//           onClick={() => setSelectedTab("Invoice")}
//         >
//           Employee Items Setup
//         </div>
//         <div
//           className={`incentiveReport-tab ${
//             selectedTab === "Invoice-Items" ? "incentiveReport-selected" : ""
//           }`}
//           onClick={() => setSelectedTab("Invoice-Items")}
//         >
//           Profile Manage
//         </div>
//       </div>

//       {/* Render content based on the selected tab */}
//       {renderTabContent()}

//       {/* Conditionally render the New Employee Incentive popup */}
//       {showPopup && (
//         <div className="incentiveReport-popup-overlay">
//           <div className="incentiveReport-popup-content">
//             <button
//               className="incentiveReport-close-button"
//               onClick={() => setShowPopup(false)}
//             >
//               x
//             </button>
//             <InsentiveSettingsEISNewEI />
//           </div>
//         </div>
//       )}

//       {/* Conditionally render the Edit Item popup */}
//       {showEditPopup && (
//         <div className="insentiveSettingsEISEditBtn-popup-overlay">
//           <div className="insentiveSettingsEISEditBtn-popup-content">
//             <button
//               className="insentiveSettingsEISEditBtn-close-button"
//               onClick={() => setShowEditPopup(false)}
//             >
//               x
//             </button>
//             <InsentiveSettingsEISEditBtn />
//           </div>
//         </div>
//       )}

//       {/* Render the Edit TDS popup */}
//       {showEditTdsPopup && (
//         <div className="incentiveSettingsEISEditTDSBtn-popup-overlay">
//           <div className="incentiveSettingsEISEditTDSBtn-popup-content">
//             <button
//               className="incentiveSettingsEISEditTDSBtn-close-button"
//               onClick={() => setShowEditTdsPopup(false)}
//             >
//               x
//             </button>
//             <InsentiveSettingsEISEditTDSBtn />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InsentiveSettings;



 /* Ajhar Tamboli insentiveSettings.jsx 18-09-2024 */


import React, { useState } from "react";
import "../IncentiveSetting/insentiveSettings.css";
import InsentiveSettingsEISNewEI from "./insentiveSettingsEISNewEI";
import IncentiveSettingProfileManage from "./incentiveSettingProfileManage";
import InsentiveSettingsEISEditBtn from "./insentiveSettingsEISEditBtn"; // Import the component to be shown in the popup
import InsentiveSettingsEISEditTDSBtn from "./insentiveSettingsEISEditTDSBtn";

const InsentiveSettings = () => {
  const [selectedTab, setSelectedTab] = useState("Invoice");
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [showEditPopup, setShowEditPopup] = useState(false); // State to manage the visibility of the Edit Item popup
  const [showEditTdsPopup, setShowEditTdsPopup] = useState(false); // State to manage TDS popup visibility
  const [activeRows, setActiveRows] = useState({
    1: true, // Assume row 1 is initially active
    2: true, // Add more rows as needed
  });

  // Function to render the content based on the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Invoice":
        return (
          <div>
            <div className="insentiveSettings-filters">
              <button
                className="insentiveSettings-load-button"
                onClick={() => setShowPopup(true)} // Open New Employee Incentive popup on button click
              >
                <i className="fa-solid fa-plus"></i> New Employee Incentive
              </button>
            </div>

            <div className="insentiveSettings-controls">
          <div className="insentiveSettings-date-range">
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
            <div className="insentiveSettings-search-Showing">
              <div className="insentiveSettings-search-container">
                <input
                  type="text"
                  className="insentiveSettings-search-input"
                  placeholder="Search"
                />
                <i className="fa fa-search search-icon"></i>
              </div>

              <div className="insentiveSettings-Showing">
                <span>Showing 3 / 3 results</span>
                <button>
                  <i className="fa-regular fa-file-excel"></i> Export
                </button>
                <button>
                  <i className="fa-solid fa-print"></i> Print
                </button>
              </div>
            </div>
            <div className="insentiveSettings-profile-table-N-pagination">
              <table className="insentiveSettings-profile-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>TDS Percent</th>
                    <th>IsActive</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dr. Ajhar Tamboli</td>
                    <td>5</td>
                    <td>{activeRows[1] ? "true" : "false"}</td>
                    <td>
                      {activeRows[1] && (
                        <>
                          <button
                            className="insentiveSettings-action-button iS-rename-button"
                            onClick={() => setShowEditPopup(true)} // Show the Edit Item popup
                          >
                            Edit Items
                          </button>
                          <button
                            className="insentiveSettings-action-button iS-edit-items-button"
                            onClick={() => setShowEditTdsPopup(true)}
                          >
                            Edit TDS %
                          </button>
                        </>
                      )}
                      <button
                        className="insentiveSettings-action-button iS-deactivate-button"
                        onClick={() =>
                          setActiveRows((prev) => ({
                            ...prev,
                            1: !prev[1],
                          }))
                        }
                      >
                        {activeRows[1] ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
              {/* <div className="insentiveSettings-pagination">
                <span>0 to 0 of 0</span>
                <button>First</button>
                <button>Previous</button>
                <span>Page 0 of 0</span>
                <button>Next</button>
                <button>Last</button>
              </div> */}
            </div>
          </div>
        );
      case "Invoice-Items":
        return <IncentiveSettingProfileManage />;
      case "Bill Sync":
        return <IncentiveTransactionsBillScan />;
      case "Payment":
        return <IncentiveTransationPayment />;
      default:
        return <div>Invoice Content Here</div>;
    }
  };

  return (
    <div className="insentiveSettings-container">
      <div className="insentiveSettings-tabs">
        <div
          className={`insentiveSettings-tab ${
            selectedTab === "Invoice" ? "insentiveSettings-selected" : ""
          }`}
          onClick={() => setSelectedTab("Invoice")}
        >
          Employee Items Setup
        </div>
        <div
          className={`insentiveSettings-tab ${
            selectedTab === "Invoice-Items" ? "insentiveSettings-selected" : ""
          }`}
          onClick={() => setSelectedTab("Invoice-Items")}
        >
          Profile Manage
        </div>
      </div>

      {/* Render content based on the selected tab */}
      {renderTabContent()}

      {/* Conditionally render the New Employee Incentive popup */}
      {showPopup && (
        <div className="insentiveSettings-popup-overlay">
          <div className="insentiveSettings-popup-content">
            <button
              className="insentiveSettings-close-button"
              onClick={() => setShowPopup(false)} // Close New Employee Incentive popup
            >
              x
            </button>
            <InsentiveSettingsEISNewEI />
          </div>
        </div>
      )}

      {/* Conditionally render the Edit Item popup */}
      {showEditPopup && (
        <div className="insentiveSettingsEISEditBtn-popup-overlay">
          <div className="insentiveSettingsEISEditBtn-popup-content">
            <button
              className="insentiveSettingsEISEditBtn-close-button"
              onClick={() => setShowEditPopup(false)} // Close Edit Item popup
            >
              x
            </button>
            <InsentiveSettingsEISEditBtn />
          </div>
        </div>
      )}
      {/* Render the Edit TDS popup */}
      {showEditTdsPopup && (
        <div className="incentiveSettingsEISEditTDSBtn-popup-overlay">
          <div className="incentiveSettingsEISEditTDSBtn-popup-content">
            <button
              className="incentiveSettingsEISEditTDSBtn-close-button"
              onClick={() => setShowEditTdsPopup(false)}
            >
              x
            </button>
            <InsentiveSettingsEISEditTDSBtn />
          </div>
        </div>
      )}
    </div>
  );
};

export default InsentiveSettings;
