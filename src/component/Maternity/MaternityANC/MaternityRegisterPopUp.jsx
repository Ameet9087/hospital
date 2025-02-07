// import React, { useRef, useEffect, useState } from "react";
// import "./MaternityRegisterPopUp.css";
// import { CiSearch } from "react-icons/ci";
// import { Link } from "react-router-dom";
// import { FaSearch } from "react-icons/fa"; // Using react-icons
// import { startResizing } from "../TableHeadingResizing/resizableColumns";
// const MaternityRegisterPopUp = ({ onClose }) => {
//   const [selectedTab, setSelectedTab] = useState("itemDetails");
//   const [columnWidths, setColumnWidths] = useState({});
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const tableRef = useRef(null);
//   // ===================================================================
//   return (
//     <div
//     className="MaternityRegisterPopUp-container"
//     >
//       <div className="MaternityRegisterPopUp-header">
//         <h4>Maternity Register</h4>
//         {/* <button className="MaternityRegisterPopUp-close-btn" onClick={onClose}>
//           X
//         </button> */}
//       </div>
//       <div className="MaternityRegisterPopUp-form">
//         <div className="MaternityRegisterPopUp-form-row">
//         {/* <div className="MaternityRegisterPopUp-form-row-section-1"> */}
//           <div className="MaternityRegisterPopUp-form-group-1row">
//             <div className="MaternityRegisterPopUp-form-group">
//             <label htmlFor="actual-sale-no">Place of Delivery:</label>
//       <input id="actual-sale-no" type="text" placeholder="Enter Actual Sale No" />
//     </div>
//             <div className="MaternityRegisterPopUp-form-group">
//             <label htmlFor="manual-sale-no">Presentation:</label>
//             <select name="" id="" >
//         <option value="">--select--</option>
//         <option value=""></option>
//       </select>    </div>
//           </div>
//           <div className="MaternityRegisterPopUp-form-group-1row">
//           <div className="MaternityRegisterPopUp-form-group">
//             <label htmlFor="asset-no">Delivery Date:</label>
//       <input id="asset-no" type="date"  />
//     </div>
//             <div className="MaternityRegisterPopUp-form-group">
//             <label htmlFor="cost"> Delivery Time:</label>
//       <input id="cost" type="time"  />
//     </div>
//           </div>
//           {/* </div> */}
//           {/* ----------------------------------------------------------------------------- */}
//             <div className="MaternityRegisterPopUp-form-group-1row">
//             <div className="MaternityRegisterPopUp-form-group">
//             <label htmlFor="quantity">Obstretic Complication:</label>
//       <select name="" id="" >
//         <option value="">--select--</option>
//         <option value=""></option>
//       </select>
//     </div>
//             <div className="MaternityRegisterPopUp-form-group">
//             <label htmlFor="quantity">Type of Delivery:</label>
//       <select name="" id="" >
//         <option value="">--select--</option>
//         <option value=""></option>
//       </select>
//     </div>
//             </div>
//             <div className="MaternityRegisterPopUp-form-row-section-1">
//           <h4 className="MaternityRegisterPopUp-noANCListh4">New Born Baby Details</h4>
//           <div className="MaternityRegisterPopUp-form-group-1row">
//             <div className="MaternityRegisterPopUp-form-group">
//             <label htmlFor="quantity">Number of Babies:</label>
//       <select name="" id="" >
//         <option value="">1</option>
//         <option value="">2</option>
//         <option value="">3</option>
//         <option value="">4</option>
//         <option value="">5</option>
//         <option value="">6</option>
//       </select>
//     </div>
//             </div>
//           </div>
//           <div className="MaternityRegisterPopUp-form-group-1row">
//           <div className="table-container">
//           <table ref={tableRef}>
//         <thead>
//         <tr>{[
//             "Gender",
//             "WeightGram",
//             "Outcome of Baby",
//             "Outcome of Mother",
//           ].map((header, index) => (
//             <th
//             key={index}
//             style={{ width: columnWidths[index] }}
//             className="resizable-th"
//           >
//                <div className="header-content">
//                     <span>{header}</span>
//                     <div
//                       className="resizer"
//                       onMouseDown={startResizing(
//                         tableRef,
//                         setColumnWidths
//                       )(index)}
//                     ></div>
//                   </div>
//                 </th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//             <tr key={""}>
//               <td>
//                 <select
//                   className='MaternityRegisterPopUp-select'
//                   name="gender"
//                 >
//                   <option value="">--Select--</option>
//                     <option >Male</option>
//                     <option >Female</option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   className='MaternityRegisterPopUp-input'
//                   type="text"
//                   name="genericItemName"
//                 />
//               </td>
//               <td>
//                 <input
//                   className='MaternityRegisterPopUp-input'
//                   type="text"
//                   name="genericCode"
//                 />
//               </td>
//               <td>
//                 <input
//                   className='MaternityRegisterPopUp-input'
//                   type="text"
//                   name="genericQty"
//                 />
//               </td>
//             </tr>
//         </tbody>
//       </table>
//           </div>
//           </div>
//           <div className="MaternityRegisterPopUp-form-actions">
//         <button
//           className="MaternityRegisterPopUp-add-btn"
//           onClick={""}
//         >
//           Save
//         </button>
//       </div>
//       <div className="MaternityRegisterPopUp-form-row-section-1">
//           <h4 className="MaternityRegisterPopUp-NoChildDetailsinListh4">No Child Details in List</h4>
//           <div className="MaternityRegisterPopUp-form-group-1row">
//             </div>
//           </div>
//           </div>
//           </div>
//       <div className="MaternityRegisterPopUp-form-actions">
//         <button
//           className="MaternityRegisterPopUp-add-btn"
//           onClick={""}
//         >
//           Print
//         </button>
//         <button className="MaternityRegisterPopUp-close-btn" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };
// export default MaternityRegisterPopUp;

// import React, { useRef, useState } from "react";
// import "./MaternityRegisterPopUp.css";
// import { startResizing } from "../TableHeadingResizing/resizableColumns";

// const MaternityRegisterPopUp = ({ onClose }) => {
//   const [columnWidths, setColumnWidths] = useState({});
//   const [formData, setFormData] = useState({
//     placeOfDelivery: "",
//     deliveryDateAndTime: "",
//     typeOfDelivery: "",
//     presentation: "",
//     obstreticComplications: "",
//     newBornBabies: [
//       {
//         babyGender: "",
//         babyWeight: "",
//         outComeBaby: "",
//         outComeMother: "",
//       },
//     ],
//   });

//   const tableRef = useRef(null);

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleBabyDetailsChange = (index, field, value) => {
//     const updatedBabies = [...formData.newBornBabies];
//     updatedBabies[index][field] = value;
//     setFormData({ ...formData, newBornBabies: updatedBabies });
//   };

//   const addNewBaby = () => {
//     setFormData({
//       ...formData,
//       newBornBabies: [
//         ...formData.newBornBabies,
//         { babyGender: "", babyWeight: "", outComeBaby: "", outComeMother: "" },
//       ],
//     });
//   };

//   const saveData = async () => {
//     try {
//       const response = await fetch(
//         "http://192.168.0.100:4069/api/maternity-register/save/1",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         alert("Data saved successfully!");
//       } else {
//         alert("Failed to save data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("An error occurred while saving the data.");
//     }
//     console.log(formData)
//   };

//   return (
//     <div className="MaternityRegisterPopUp-container">
//       <div className="MaternityRegisterPopUp-header">
//         <h4>Maternity Register</h4>
//       </div>
//       <div className="MaternityRegisterPopUp-form">
//         <div className="MaternityRegisterPopUp-form-row">
//           <div className="MaternityRegisterPopUp-form-group-1row">
//             <div className="MaternityRegisterPopUp-form-group">
//               <label htmlFor="place-of-delivery">Place of Delivery:</label>
//               <input
//                 id="place-of-delivery"
//                 type="text"
//                 value={formData.placeOfDelivery}
//                 onChange={(e) => handleInputChange("placeOfDelivery", e.target.value)}
//               />
//             </div>
//             <div className="MaternityRegisterPopUp-form-group">
//               <label htmlFor="presentation">Presentation:</label>
//               <select
//                 id="presentation"
//                 value={formData.presentation}
//                 onChange={(e) => handleInputChange("presentation", e.target.value)}
//               >
//                 <option value="">--select--</option>
//                 <option value="Cephalic">Cephalic</option>
//                 <option value="Breech">Breech</option>
//               </select>
//             </div>
//             <div className="MaternityRegisterPopUp-form-group">
//               <label htmlFor="obstretic-complications">Obstetric Complication:</label>
//               <select
//                 id="obstretic-complications"
//                 value={formData.obstreticComplications}
//                 onChange={(e) => handleInputChange("obstreticComplications", e.target.value)}
//               >
//                 <option value="">--select--</option>
//                 <option value="None">None</option>
//                 <option value="Pre-eclampsia">Pre-eclampsia</option>
//               </select>
//             </div>
//           </div>
//           <div className="MaternityRegisterPopUp-form-group-1row">
//             <div className="MaternityRegisterPopUp-form-group">
//               <label htmlFor="delivery-date">Delivery Date:</label>
//               <input
//                 id="delivery-date"
//                 type="date"
//                 onChange={(e) =>
//                   handleInputChange(
//                     "deliveryDateAndTime",
//                     `${e.target.value}T${formData.deliveryDateAndTime.split("T")[1] || "00:00"}`
//                   )
//                 }
//               />
//             </div>
//             <div className="MaternityRegisterPopUp-form-group">
//               <label htmlFor="delivery-time">Delivery Time:</label>
//               <input
//                 id="delivery-time"
//                 type="time"
//                 onChange={(e) =>
//                   handleInputChange(
//                     "deliveryDateAndTime",
//                     `${formData.deliveryDateAndTime.split("T")[0] || ""}T${e.target.value}`
//                   )
//                 }
//               />
//             </div>
//             <div className="MaternityRegisterPopUp-form-group">
//               <label htmlFor="type-of-delivery">Type of Delivery:</label>
//               <select
//                 id="type-of-delivery"
//                 value={formData.typeOfDelivery}
//                 onChange={(e) => handleInputChange("typeOfDelivery", e.target.value)}
//               >
//                 <option value="">--select--</option>
//                 <option value="Normal">Normal</option>
//                 <option value="C-Section">C-Section</option>
//               </select>
//             </div>
//           </div>
//           <div className="MaternityRegisterPopUp-form-group-1row">

//           </div>
//           <div className="MaternityRegisterPopUp-form-row-section-1">
//           <h4 className="MaternityRegisterPopUp-noANCListh4">New Born Baby Details</h4>
//           <div className="MaternityRegisterPopUp-form-group-1row">
//             <div className="MaternityRegisterPopUp-form-group">
//             <label htmlFor="quantity">Number of Babies:</label>
//       <select name="" id="" >
//         <option value="">1</option>
//         <option value="">2</option>
//         <option value="">3</option>
//         <option value="">4</option>
//         <option value="">5</option>
//         <option value="">6</option>
//       </select>
//     </div>
//             </div>
//           </div>
//                     <div className="table-container">
//             <table ref={tableRef}>
//               <thead>
//                 <tr>
//                   {[
//                     "Gender",
//                     "Weight (grams)",
//                     "Outcome of Baby",
//                     "Outcome of Mother",
//                   ].map((header, index) => (
//                     <th
//                       key={index}
//                       style={{ width: columnWidths[index] }}
//                       className="resizable-th"
//                     >
//                       <div className="header-content">
//                         <span>{header}</span>
//                         <div
//                           className="resizer"
//                           onMouseDown={startResizing(
//                             tableRef,
//                             setColumnWidths
//                           )(index)}
//                         ></div>
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {formData.newBornBabies.map((baby, index) => (
//                   <tr key={index}>
//                     <td>
//                       <select
//                         className="MaternityRegisterPopUp-select"
//                         value={baby.babyGender}
//                         onChange={(e) =>
//                           handleBabyDetailsChange(index, "babyGender", e.target.value)
//                         }
//                       >
//                         <option value="">--Select--</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                       </select>
//                     </td>
//                     <td>
//                       <input
//                         className="MaternityRegisterPopUp-input"
//                         type="number"
//                         value={baby.babyWeight}
//                         onChange={(e) =>
//                           handleBabyDetailsChange(index, "babyWeight", e.target.value)
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         className="MaternityRegisterPopUp-input"
//                         type="text"
//                         value={baby.outComeBaby}
//                         onChange={(e) =>
//                           handleBabyDetailsChange(index, "outComeBaby", e.target.value)
//                         }
//                       />
//                     </td>
//                     <td>
//                       <input
//                         className="MaternityRegisterPopUp-input"
//                         type="text"
//                         value={baby.outComeMother}
//                         onChange={(e) =>
//                           handleBabyDetailsChange(index, "outComeMother", e.target.value)
//                         }
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button className="MaternityRegisterPopUp-add-btn" onClick={addNewBaby}>
//               Add Baby
//             </button>
//           </div>
//           <div className="MaternityRegisterPopUp-form-row-section-1">
//           {/* <h4 className="MaternityRegisterPopUp-NoChildDetailsinListh4">No Child Details in List</h4> */}
//           <h4 className="MaternityRegisterPopUp-NoChildDetailsinListh4">Child Details of</h4>
//           <div className="table-container">
//             <table ref={tableRef}>
//               <thead>
//                 <tr>
//                   {[
//                     "DeliveryDate",
//                     "Gender",
//                     "Weight (grams)",
//                     "Outcome of Baby",
//                     "Outcome of Mother",
//                   ].map((header, index) => (
//                     <th
//                       key={index}
//                       style={{ width: columnWidths[index] }}
//                       className="resizable-th"
//                     >
//                       <div className="header-content">
//                         <span>{header}</span>
//                         <div
//                           className="resizer"
//                           onMouseDown={startResizing(
//                             tableRef,
//                             setColumnWidths
//                           )(index)}
//                         ></div>
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>

//               </tbody>
//             </table>
//           </div>
//           </div>
//         </div>
//       </div>
//       <div className="MaternityRegisterPopUp-form-actions">
//         <button className="MaternityRegisterPopUp-add-btn" onClick={saveData}>
//           Save
//         </button>
//         <button
//           className="MaternityRegisterPopUp-add-btn"
//           onClick={""}
//         >
//           Print
//         </button>
//         <button className="MaternityRegisterPopUp-close-btn" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MaternityRegisterPopUp;

import React, { useRef, useState } from "react";
import "./MaternityRegisterPopUp.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";

const MaternityRegisterPopUp = ({ patientData, onClose }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const [formData, setFormData] = useState({
    placeOfDelivery: "",
    deliveryDateAndTime: "",
    typeOfDelivery: "",
    presentation: "",
    obstreticComplications: "",
    newBornBabies: [
      {
        babyGender: "",
        babyWeight: "",
        outComeBaby: "",
        outComeMother: "",
      },
    ],
  });

  const tableRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBabyDetailsChange = (index, field, value) => {
    const updatedBabies = [...formData.newBornBabies];
    updatedBabies[index][field] = value;
    setFormData({ ...formData, newBornBabies: updatedBabies });
  };

  const addNewBaby = () => {
    setFormData({
      ...formData,
      newBornBabies: [
        ...formData.newBornBabies,
        { babyGender: "", babyWeight: "", outComeBaby: "", outComeMother: "" },
      ],
    });
  };

  const saveData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/maternity-register/save/${patientData?.inPatientDTO?.inPatientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving the data.");
    }
  };

  return (
    <div className="MaternityRegisterPopUp-container">
      <div className="MaternityRegisterPopUp-header">
        <h4>Maternity Register</h4>
      </div>
      <div className="MaternityRegisterPopUp-form">
        <div className="MaternityRegisterPopUp-form-row">
          <div className="MaternityRegisterPopUp-form-group-1row">
            <div className="MaternityRegisterPopUp-form-group">
              <label htmlFor="place-of-delivery">Place of Delivery:</label>
              <input
                id="place-of-delivery"
                type="text"
                value={formData.placeOfDelivery}
                onChange={(e) =>
                  handleInputChange("placeOfDelivery", e.target.value)
                }
              />
            </div>
            <div className="MaternityRegisterPopUp-form-group">
              <label htmlFor="presentation">Presentation:</label>
              <select
                id="presentation"
                value={formData.presentation}
                onChange={(e) =>
                  handleInputChange("presentation", e.target.value)
                }
              >
                <option value="">--select--</option>
                <option value="Cephalic">Cephalic</option>
                <option value="Breech">Breech</option>
              </select>
            </div>
            <div className="MaternityRegisterPopUp-form-group">
              <label htmlFor="obstretic-complications">
                Obstetric Complication:
              </label>
              <select
                id="obstretic-complications"
                value={formData.obstreticComplications}
                onChange={(e) =>
                  handleInputChange("obstreticComplications", e.target.value)
                }
              >
                <option value="">--select--</option>
                <option value="None">None</option>
                <option value="Pre-eclampsia">Pre-eclampsia</option>
              </select>
            </div>
          </div>
          <div className="MaternityRegisterPopUp-form-group-1row">
            <div className="MaternityRegisterPopUp-form-group">
              <label htmlFor="delivery-date">Delivery Date:</label>
              <input
                id="delivery-date"
                type="date"
                onChange={(e) =>
                  handleInputChange(
                    "deliveryDateAndTime",
                    `${e.target.value}T${formData.deliveryDateAndTime.split("T")[1] || "00:00"
                    }`
                  )
                }
              />
            </div>
            <div className="MaternityRegisterPopUp-form-group">
              <label htmlFor="delivery-time">Delivery Time:</label>
              <input
                id="delivery-time"
                type="time"
                onChange={(e) =>
                  handleInputChange(
                    "deliveryDateAndTime",
                    `${formData.deliveryDateAndTime.split("T")[0] || ""}T${e.target.value
                    }`
                  )
                }
              />
            </div>
            <div className="MaternityRegisterPopUp-form-group">
              <label htmlFor="type-of-delivery">Type of Delivery:</label>
              <select
                id="type-of-delivery"
                value={formData.typeOfDelivery}
                onChange={(e) =>
                  handleInputChange("typeOfDelivery", e.target.value)
                }
              >
                <option value="">--select--</option>
                <option value="Normal">Normal</option>
                <option value="C-Section">C-Section</option>
              </select>
            </div>
          </div>
          <div className="MaternityRegisterPopUp-form-row-section-1">
            <h4 className="MaternityRegisterPopUp-noANCListh4">
              New Born Baby Details
            </h4>
            <div className="MaternityRegisterPopUp-form-group-1row">
              <div className="MaternityRegisterPopUp-form-group">
                <label htmlFor="quantity">Number of Babies:</label>
                <select name="" id="">
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                  <option value="">6</option>
                </select>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Gender",
                    "Weight (grams)",
                    "Outcome of Baby",
                    "Outcome of Mother",
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
                {formData.newBornBabies.map((baby, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        className="MaternityRegisterPopUp-select"
                        value={baby.babyGender}
                        onChange={(e) =>
                          handleBabyDetailsChange(
                            index,
                            "babyGender",
                            e.target.value
                          )
                        }
                      >
                        <option value="">--Select--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </td>
                    <td>
                      <input
                        className="MaternityRegisterPopUp-input"
                        type="number"
                        value={baby.babyWeight}
                        onChange={(e) =>
                          handleBabyDetailsChange(
                            index,
                            "babyWeight",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="MaternityRegisterPopUp-input"
                        type="text"
                        value={baby.outComeBaby}
                        onChange={(e) =>
                          handleBabyDetailsChange(
                            index,
                            "outComeBaby",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="MaternityRegisterPopUp-input"
                        type="text"
                        value={baby.outComeMother}
                        onChange={(e) =>
                          handleBabyDetailsChange(
                            index,
                            "outComeMother",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="MaternityRegisterPopUp-add-btn"
              onClick={addNewBaby}
            >
              Add Baby
            </button>
          </div>
          <div className="MaternityRegisterPopUp-form-row-section-1">
            <h4 className="MaternityRegisterPopUp-NoChildDetailsinListh4">
              Child Details
            </h4>
            <div className="table-container">
              <table ref={tableRef}>
                <thead>
                  <tr>
                    {[
                      "Delivery Date",
                      "Gender",
                      "Weight (grams)",
                      "Outcome of Baby",
                      "Outcome of Mother",
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
                  {formData.newBornBabies.map((baby, index) => (
                    <tr key={index}>
                      <td>{formData.deliveryDateAndTime.split("T")[0]}</td>
                      <td>{baby.babyGender}</td>
                      <td>{baby.babyWeight}</td>
                      <td>{baby.outComeBaby}</td>
                      <td>{baby.outComeMother}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="MaternityRegisterPopUp-form-actions">
        <button className="MaternityRegisterPopUp-add-btn" onClick={saveData}>
          Save
        </button>
        {/* <button className="MaternityRegisterPopUp-add-btn" onClick={""}>
          Print
        </button>
        <button className="MaternityRegisterPopUp-close-btn" onClick={onClose}>
          Close
        </button> */}
      </div>
    </div>
  );
};

export default MaternityRegisterPopUp;
