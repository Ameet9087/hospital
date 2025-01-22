// // export default SocialServicePage;
// import React, { useEffect, useState } from "react";
// import "./SocialServicePage.css";
// import RegisterNewSSUPatient from "./registerNewSSUPatient";
// import PatientCounseling from "../PatientCounseling/nGOpatientRegistration";

// function SocialServicePage() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [data, setData] = useState(null);
//   const [selectedEdit, setSelectedEdit] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query
//   const [activeTab, setActiveTab] = useState("SSU"); // New state for tab selection

//   useEffect(() => {
//     fetch("")
//       .then((res) => res.json())
//       .then((data) => setData(data))
//       .catch((err) => console.log(err));
//   }, []);

//   const handlePrint = () => {
//     window.print();
//   };

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const handleEdit = (data) => {
//     setSelectedEdit(data);
//     togglePopup();
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value); // Update search query state
//   };

//   // Filter data based on search query
//   const filteredData = data
//     ? data.filter((item) =>
//         `${item.firstName} ${item.lastName}`
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="ssu-patient-list">
//       <button className="ssuPatient-bttn" onClick={() => setActiveTab("SSU")}>
//         SSU Patient List
//       </button>
//       <button className="ssuPatient-bttn" onClick={() => setActiveTab("Counseling")}>
//         Patient Counseling
//       </button>
//       {/* <button className="ssuPatient-bttn" >Financial Assistance</button>
//       <button className="ssuPatient-bttn">Social Welfare Support</button>
//       <button className="ssuPatient-bttn">Health Education Programs</button>
//       <button className="ssuPatient-bttn">Community Outreach</button> */}

//       <div className="socialService-content">
//         {activeTab === "SSU" ? (
//           <>
//             <div className="socialService-top-controls">
//               <button
//                 className="socialService-register-button"
//                 onClick={() => {
//                   setSelectedEdit(null);
//                   togglePopup();
//                 }}
//               >
//                 + Register New SSU Patient
//               </button>
//               <div className="socialService-edit-patient">
//                 <span>Edit Information Of</span>
//                 <input type="text" placeholder="Existing Patient Name" />
//               </div>
//             </div>

//             <div className="socialService-patient-status-main">
//               <div className="socialService-patient-status">
//                 <span>List by Patient Status:</span>
//                 <label>
//                   <input type="radio" name="status" value="all" defaultChecked /> All
//                 </label>
//                 <label>
//                   <input type="radio" name="status" value="active" /> Active
//                 </label>
//                 <label>
//                   <input type="radio" name="status" value="inactive" /> Inactive
//                 </label>
//               </div>
//             </div>

//             <div className="socialService-search-N-result">
//               <div className="socialService-search-bar">
//                 <input
//                   type="text"
//                   placeholder="Search (Minimum 3 Characters)"
//                   value={searchQuery} // Bind search query state to input value
//                   onChange={handleSearchChange} // Handle input change
//                 />
//                 <button className="socialService-search-button">
//                   <i className="fa-solid fa-magnifying-glass"></i>
//                 </button>
//               </div>
//               <div className="socialService-results-info">
//                 <span>
//                   Showing {filteredData.length} / {data ? data.length : 0} results
//                 </span>
//                 <button className="socialService-print-button" onClick={handlePrint}>
//                   <i className="fa-solid fa-print"></i> Print
//                 </button>
//               </div>
//             </div>

//             <div className="socialService-table-N-bttns">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Patient Name</th>
//                     <th>Age/Sex</th>
//                     <th>Address</th>
//                     <th>Phone</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredData.length > 0 ? (
//                     filteredData.map((item, index) => (
//                       <tr key={index}>
//                         <td>
//                           {item.firstName} {item.lastName}
//                         </td>
//                         <td>
//                           {item.age} {item.ageUnits}/{item.gender}
//                         </td>
//                         <td>{item.address}</td>
//                         <td>{item.phoneNumber}</td>
//                         <td>
//                           <button
//                             onClick={() => handleEdit(item)}
//                             className="socialService-table-editBtn"
//                           >
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="socialService-no-data">
//                         No Rows To Show
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {showPopup && (
//               <div className="socialService-popup">
//                 <div className="socialService-popup-inner">
//                   <button className="close-socialService-popup" onClick={togglePopup}>
//                     X
//                   </button>
//                   <RegisterNewSSUPatient
//                     togglePopup={togglePopup}
//                     patientData={selectedEdit}
//                   />
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <PatientCounseling /> // Render PatientCounseling component when "Patient Counseling" is clicked
//         )}
//       </div>
//     </div>
//   );
// }

// export default SocialServicePage;


import React, { useEffect, useState } from "react";
import "./SocialServicePage.css";
import RegisterNewSSUPatient from "./registerNewSSUPatient";
import PatientCounseling from "../PatientCounseling/nGOpatientRegistration";
import { API_BASE_URL } from "../../api/api";

function SocialServicePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [activeTab, setActiveTab] = useState("SSU"); // New state for tab selection

  // Fetch data from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/social-patients`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleEdit = (data) => {
    setSelectedEdit(data);
    togglePopup();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Filter data based on search query
  const filteredData = data
    ? data.filter((item) =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="ssu-patient-list">
      <button className="ssuPatient-bttn" onClick={() => setActiveTab("SSU")}>
        SSU Patient List
      </button>
      <button
        className="ssuPatient-bttn"
        onClick={() => setActiveTab("Counseling")}
      >
        Patient Counseling
      </button>

      <div className="socialService-content">
        {activeTab === "SSU" ? (
          <>
            <div className="socialService-top-controls">
              <button
                className="socialService-register-button"
                onClick={() => {
                  setSelectedEdit(null);
                  togglePopup();
                }}
              >
                + Register New SSU Patient
              </button>
            </div>

            <div className="socialService-search-N-result">
              <div className="socialService-search-bar">
                <input
                  type="text"
                  placeholder="Search (Minimum 3 Characters)"
                  value={searchQuery} // Bind search query state to input value
                  onChange={handleSearchChange} // Handle input change
                />
                <button className="socialService-search-button">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className="socialService-results-info">
                <span>
                  Showing {filteredData.length} / {data.length || 0} results
                </span>
                <button
                  className="socialService-print-button"
                  onClick={handlePrint}
                >
                  <i className="fa-solid fa-print"></i> Print
                </button>
              </div>
            </div>

            <div className="socialService-table-N-bttns">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age/Sex</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>
                          {item.age} {item.ageUnits}/{item.gender}
                        </td>
                        <td>{item.address}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(item)}
                            className="socialService-table-editBtn"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="socialService-no-data">
                        No Rows To Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {showPopup && (
              <div className="socialService-popup">
                <div className="socialService-popup-inner">
                  <button
                    className="close-socialService-popup"
                    onClick={togglePopup}
                  >
                    X
                  </button>
                  <RegisterNewSSUPatient
                    togglePopup={togglePopup}
                    patientData={selectedEdit}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <PatientCounseling /> // Render PatientCounseling component when "Patient Counseling" is clicked
        )}
      </div>
    </div>
  );
}

export default SocialServicePage;
