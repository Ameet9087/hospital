import React, { useEffect, useState, useRef } from "react";
import "./ExtraAndAttenderDietIndent.css";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import { useSelector } from "react-redux";
import PopupTable from "../PopUpTableBedTransfer/PopupTable";
import axios from "axios";

const ExtraAndAttenderDietIndent = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [dietCat,setDietCat]=useState(null);
  const [dietcategories, setDietCategories] = useState([]);

  const [dietTemplates,setDietTemplates]=useState(null);
  const[dietsdata,setDietsData]=useState(null);

  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});
  const patientData = useSelector((state) => state.patient?.patientData);

  console.log("--------Patient Data", patientData);

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }

  const getPopupData=()=>{
    if(activePopup==="dietCats"){
      return{
        columns:["categoryCode","categoryName","specialDiet"],
        data:dietCat
      }
    }if(activePopup==="dietTemplatedata"){
      return{
        columns:["code","templateName"],
        data:dietTemplates
      }
    }
      else{
        return{
          columns:[],data:[]
        };
      }
  };

  const {columns,data}=getPopupData();

  const handleSelect=async(data)=>{
    if(activePopup==="dietCats"){
      setDietCategories(data);
    } 
    if(activePopup==="dietTemplatedata"){
      setDietsData(data);
    }
    setActivePopup(null);
  }

  useEffect(() => {
    fetch("http://192.168.1.72:4096/api/diet-categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Diet Categories:", data);
        setDietCat(data);

        if (data.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            extraAttenderDietCategoryDTOs: [
              {
                ...prevFormData.extraAttenderDietCategoryDTOs[0],
                dietCategoryMasterDTO: {
                  dietCategoryId: data[0].dietCategoryId,
                },
              },
            ],
          }));
        }
      })
      .catch((error) => console.error("Error fetching Diet category:", error));
  }, []);


  // Fetch diet templates
  useEffect(() => {
    fetch("http://192.168.1.72:4096/api/diet-template-master")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Diet Templates:", data);
        setDietTemplates(data);

        if (data.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            extraAttenderDietCategoryDTOs: [
              {
                ...prevFormData.extraAttenderDietCategoryDTOs[0],
                dietTemplateMasterDTO: {
                  dietTemplateId: data[0].dietTemplateId,
                },
              },
            ],
          }));
        }
      })
      .catch((error) => console.error("Error fetching Diet Templates:", error));
  }, []);



  const [formData, setFormData] = useState({
    patientType: "",
    dietOrderDate: new Date().toISOString().split('T')[0],
    diagnosis: "",
    dietTypeAdvisedByDoctor: "",
    remarks: "",
    extraFood: "",
    ipAdmissionDTO: {
      ipAdmmissionId: 1,
    },
    extraAttenderDietCategoryDTOs: [
      {
        dietCategoryMasterDTO: {
          dietCategoryId: null,
        },
        dietTemplateMasterDTO: {
          // dietTemplateId: dietsdata[].dietTemplateId,
          dietTemplateId: null,
        }
      },
    ],
  });

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }));

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.1.72:4096/api/extra-attender-diet-indent",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      alert("Data posted successfully!");
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Failed to post data.");
    }
  };

  const [dietTableRows, setDietTableRows] = useState([
    { sn: 1, dietCategory: "", dietTiming: "", dietTemplate: "" },
  ]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddRow = () => {
    setDietTableRows([
      ...dietTableRows,
      {
        sn: dietTableRows.length + 1,
        dietCategory: "",
        dietTiming: "",
        dietTemplate: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setDietTableRows(dietTableRows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...dietTableRows];
    updatedRows[index][field] = value;
    setDietTableRows(updatedRows);
  };

  return (
    <div className="Extra-And-Attender-Diet-Indent-container">
      <div className="Extra-And-Attender-Diet-Indent-header">
        <h4>Extra And Attender Diet Indent</h4>
      </div>

      {/* Form Section */}
      <div className="Extra-And-Attender-Diet-Indent-form">
        <div className="Extra-And-Attender-Diet-Indent-form-sub">
          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Patient Type:</label>
            <select
              name="patientType"
              value={formData.patientType}
              onChange={handleInputChange}
            >
              <option value="Attender">Attender</option>
              <option value="Patient">Patient</option>
            </select>
          </div>
          
          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Diet Order Date:</label>
            <input
              type="date"
              name="dietOrderDate"
              value= {formData.dietOrderDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Ward Name:</label>
            <input type="text"
            name="wardName"
            value={patientData.roomDetails.roomTypeDTO.wardName}
            />
            {/* <select
              name="wardName"
              value={patientData.roomDetails.roomTypeDTO.wardName}
              onChange={handleFormChange}
            >
              <option value="2nd Floor">2nd Floor</option>
              <option value="1st Floor">1st Floor</option>
            </select> */}
          </div>
     


        </div>
        <div className="Extra-And-Attender-Diet-Indent-form-sub">

        <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>IP No:</label>
            <input
              type="text"
              name="ipno"
              value={patientData.ipAdmissionId}
            
              required
            />
          </div>

          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Patient Name:</label>
            <input
              type="text"
              name="patientName"
              value={`${patientData.patient?.firstName} ${patientData.patient?.lastName}`}
            
            />
          </div>

          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={patientData.patient?.age}
             
            />
          </div>
          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Sex:</label>
            <input
              type="text"
              name="gender"
              value={patientData.patient?.gender}
             
            />

            {/* <select name="sex" value={formData.sex} onChange={handleFormChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select> */}
          </div>

          
        
          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Diet Type Advised:</label>
            <input
              type="text"
              name="dietTypeAdvisedByDoctor"
              value={formData.dietTypeAdvisedByDoctor}
              onChange={handleInputChange}
            />
          </div>
          <div className="Extra-And-Attender-Diet-Indent-form-group-checkbox">
            <label>Extra Food:</label>
            <input
              type="checkbox"
              name="extraFood"
              checked={formData.extraFood}
              onChange={handleInputChange}
            />
          </div>
          
        </div>
        <div className="Extra-And-Attender-Diet-Indent-form-sub">
        <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Doctor Name:</label>
            <input
              type="text"
              name="doctorName"
              value={patientData.admissionUnderDoctorDetail.consultantDoctor.doctorName}
            />
          </div>
          
          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Bed No:</label>
            <input
              type="text"
              name="bedNo"
              value={patientData.roomDetails.bedDTO.bedNo}
            />
          </div>
          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Ward:</label>
            <input
              type="text"
              name="ward"
              value={patientData.roomDetails.bedDTO.roomNo}
              
            />
          </div>

          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Diagnosis:</label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleFormChange}
              
            />
         
          </div>

          <div className="Extra-And-Attender-Diet-Indent-form-group">
            <label>Remarks:</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
            ></textarea>
          </div>

         
        </div>
      </div>

      {/* Table Section */}
      <div className="Extra-And-Attender-Diet-Indent-header">
      <h4>Diet Category</h4>
        </div>
      
      <div className="Extra-And-Attender-Diet-Indent-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Actions", "SN", "diet Category", "	Diet Timing", "Diet Templates"].map(
                (header, index) => (
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
                )
              )}
            </tr>
          </thead>

          <tbody>
            {dietTableRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="Extra-And-Attender-Diet-Indent-add-btn"
                    onClick={handleAddRow}
                  >
                    Add
                  </button>
                  <button
                    className="Extra-And-Attender-Diet-Indent-del-btn"
                    onClick={() => handleDeleteRow(index)}
                    disabled={dietTableRows.length === 1}
                  >
                    Del
                  </button>
                </td>
                <td>{row.sn}</td>
                <td>
                  <input
                    type="text"
                    value={dietcategories.categoryName}
                    onChange={(e) =>
                      handleRowChange(index, "dietCategory", e.target.value)
                    }
                  />
                   <i
                    onClick={() => setActivePopup("dietCats")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </td>
                <td>
                  <input
                    type="text"
                    value={`${dietcategories.fromTime}  -  ${dietcategories.toTime}` || ""}
                    onChange={(e) =>
                      handleRowChange(index, "dietTiming", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                     value={dietsdata.templateName || ""}
                    onChange={(e) =>
                      handleRowChange(index, "dietTemplate", e.target.value)
                    }
                  />
                    <i
                    onClick={() => setActivePopup("dietTemplatedata")}
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onClose={() => setActivePopup(null)}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default ExtraAndAttenderDietIndent;
