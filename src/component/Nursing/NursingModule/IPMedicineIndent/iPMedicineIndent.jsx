import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import "./iPMedicineIndent.css";
import PopupTable from "../Services/PopupTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";

const IpMedicineIndent = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [selectedIpNo, setSelectedIPNo] = useState(null);
  const [selectedMedicen,setSelectMedicen] = useState(null);
  const [ipNos, setIpNos] = useState([]);
  const [medicineDetails, setMedicineDetails] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const ipnoHeading = ["inPatientId", "patientName","mobileNo"];
  const mediceinHeading = ["medDetailId","itemName","genericName"];
  const departmentHeading=["deptNursingId","deptName"];
  const [departmentDetails,setDepartmentDetails]=useState([]);
  const [deptNursingId,setdeptNursingId]=useState([]);

 
  const [formData, setFormData] = useState({
    indentNo: "",
    locIpNo: "",
    ipNo: "",
    patientName: "",
    age: "",
    consultantDoctor: "",
    sourceType: "",
    admissionDate: "",
    admissionTime: "",
    bedNo: "",
    roomNo: "",
    indentToDept: "",
    severity: "",
    zeroStock: false,
    surgery: false,
    template: "",
  });

  const [tableData, setTableData] = useState([]);
 

  const fetchIpNos = async () => {
    try {
      const response = await axios.get("http://192.168.0.116:4069/api/ip-admissions");
  
      const inPatient = response.data.map((item) => ({
        inPatientId: item.patient.inPatientId,
        patientName: `${item.patient.firstName} ${item.patient.lastName}`,
        mobileNo: item.patient.phoneNumber,
        consultantDoctor: item.admissionUnderDoctorDetail?.consultantDoctor?.doctorName || "N/A",
        sourceOfAdmission: item.financials?.sourceOfAdmission || "N/A",
        bedNo: item.roomDetails?.bedDTO?.bedNo || "N/A",
        roomNo: item.roomDetails?.bedDTO?.roomNo || "N/A",
        admissionDate: item.admissionDate || "N/A",
        typeAdmission: item.financials?.typeAdmission || "N/A",
        severity: item.roomDetails?.roomTypeDTO?.type || "N/A",
      }));
  
      setIpNos(inPatient);
    } catch (error) {
      console.error("Error fetching IP numbers:", error);
    }
  };
  useEffect(()=>{
    const fetchDepartments=async()=>{
      try{
        const response=await axios.get("http://192.168.0.116:4069/api/department-nursing")
        setDepartmentDetails(response.data);
      }catch(error){
        console.error("Error fetching department data:",error);
      }
    };
    fetchDepartments();
  },[]);
  
  const fetchMedicineDetails = async () => {
    try {
      const response = await axios.get("http://192.168.0.116:4069/api/medicine-details");
      setMedicineDetails(response.data);
    } catch (error) {
      console.error("Error fetching medicine details:", error);
    }
  };

  const handleDeleteRow = (index) => {
    // Ensure there's at least one row
    if (tableData.length > 1) {
      const updatedTableData = tableData.filter((_, i) => i !== index);
      setTableData(updatedTableData);
    } else {
      alert("Cannot delete the last row.");
    }
  };
  

  useEffect(() => {
    fetchIpNos();
    fetchMedicineDetails();
  }, []);

  const handleSelect = (data) => {
    if (activePopup === "IpNo") {
      setSelectedIPNo(data);
      console.log(data);
    } else if (activePopup === "Medicine") {
      console.log(data);
      
      setTableData((prev) =>
        prev.map((row, index) =>
          row.medDetailId === data.medDetailId
            ? {
                ...row
              }
            : data
        )
      );
      alert(tableData);
      
    }
    else if(activePopup==="Department"){
      console.log(data);

      setTableData((prev) =>
        prev.map((row, index) =>
          row.setdeptNursingId === data.setdeptNursingId
            ? {
                ...row
              }
            : data
        )
      );

      // setdeptNursingId(data); 
      
    }
    setActivePopup(null);
  };


  const getPopupData = () => {
    if (activePopup === "IpNo") {
      return { columns: ipnoHeading, data:ipNos };
    } else if (activePopup === "Medicine") {
      return{columns:mediceinHeading,data:medicineDetails }
    }else if(activePopup==="Department"){
      return{columns:departmentHeading,data:departmentDetails}
    }
    else {
      return { columns: [], data: [] };
    }
  }

  const { columns, data } = getPopupData();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
   
  };

  

  const handleInputChange = (index, field, value) => {
    setTableData((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        medicineName: "",
        genericName: "",
        requiredQuantity: "",
        issuedQuantity: "",
      },
    ]);
  };
  const handleSave = () => {
    setTableData([...tableData, formData]);
    setFormData({
      indentNo: "",
      locIpNo: "",
      ipNo: "",
      patientName: "",
      age: "",
      consultantDoctor: "",
      sourceType: "",
      admissionDate: "",
      admissionTime: "",
      bedNo: "",
      roomNo: "",
      indentToDept: "",
      severity: "",
      zeroStock: false,
      surgery: false,
      template: "",
    });
  };


  const handleSavemedicein = async () => {
    const medicineList = tableData.map((row) => ({
      medicineId: row.medicineId || "",
    }));

    const payload = {
      indentNumber: formData.indentNo,
      severity: formData.severity,
      zeroStock: formData.zeroStock ? "Yes" : "No",
      remarks: formData.remarks,
      ipadmissionDTO: { ipAdmmissionId: selectedIpNo?.inPatientId || "" },
      surgeryDTO: { surgeryId: 2 },
      departmentNursingDTO: { deptNursingId: 2 },
      templateNursingDTO: { templateId: 2 },
      medicineNursingDTOList: medicineList,
    };
    

    try {
      const response = await axios.post(
        "http://192.168.0.110:9090/api/ip-medicine-indent",
        payload
      );
      console.log("Data saved successfully:", response.data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data!");
    }
  };
  return (
    <div className="ipmedicineindent-container">
      <h2 className="ipmedicineindent-header">IP Medicine Indent</h2>
      <div className="ipmedicineindent-form">
        <div className="ipmedicineindent-section">
          <label>Indent No:</label>
          <input
            type="text"
            name="indentNo"
            value={formData.indentNo}
            onChange={handleChange}
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>IP No:</label>
          <input
            type="text"
            value={selectedIpNo?.inPatientId || ""}
            placeholder="Search IP No"
          />
          <FontAwesomeIcon
  icon={faSearch}
  onClick={() => setActivePopup("IpNo")} 
/>
        </div>
        <div className="ipmedicineindent-section">
          <label>Patient Name:</label>
          <input
            type="text"
            name="patientName"
            value={selectedIpNo?.patientName}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Consultant Doctor:</label>
          <input
            type="text"
            name="consultantDoctor"
            value={selectedIpNo?.consultantDoctor}
          onChange={handleChange}

          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Source Type:</label>
          <input
            type="text"
            name="sourceType"
            value={selectedIpNo?.sourceType}
            onChange={handleChange}
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Admission Date:</label>
          <input
            type="text"
            name="admissionDate"
            value={selectedIpNo?.admissionDate}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Admission Time:</label>
          <input
            type="text"
            name="admissionTime"
            value={selectedIpNo?.admissionTime}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Bed No:</label>
          <input
            type="text"
            name="bedNo"
            value={selectedIpNo?.bedNo}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Room No:</label>
          <input
            type="text"
            name="roomNo"
            value={selectedIpNo?.roomNo}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Indent To Dept:</label>
          {/* <input
            type="text"
            name="indentToDept"
            value={formData.indentToDept}
            onChange={handleChange}
          /> */}

          <input type="text" value={deptNursingId?.deptNursingId || " "} placeholder="Search Department" />
          <FontAwesomeIcon icon={faSearch} onClick={()=>setActivePopup("Department")} />
        </div>
        <div className="ipmedicineindent-section">
          <label>Severity:</label>
          <input
            type="text"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Zero Stock:</label>
          <input
            type="checkbox"
            name="zeroStock"
            checked={formData.zeroStock}
            onChange={handleChange}
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Surgery:</label>
          <input
            type="checkbox"
            name="surgery"
            checked={formData.surgery}
            onChange={handleChange}
          />
        </div>
        <div className="ipmedicineindent-section">
          <label>Template:</label>
          <input
            type="text"
            name="template"
            value={formData.template}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="ipmedicineindent-save-btn" onClick={handleSavemedicein}>
        Save
      </button>

<table className="ipmedicineindent-table" ref={tableData}>
  <thead>
    <tr>
      {[
        "SN",
        "Medicine Name",
        "Generic Name",
        "Required Quantity",
        "Issued Quantity",
        "Actions",
      ].map((header, index) => (
        <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
          <div className="header-content">
            <span>{header}</span>
            <div
              className="resizer"
              onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
            ></div>
          </div>
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {tableData.map((row, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={row.itemName}
              readOnly
              placeholder="Search Medicine"
            />
            <FontAwesomeIcon
              icon={faSearch}
              onClick={() => {
                setActivePopup("Medicine");
              }}
            />
          </div>
        </td>
        <td>
          <input
            type="text"
            value={row.genericName}
            onChange={(e) => handleInputChange(index, "genericName", e.target.value)}
            readOnly
          />
        </td>
        <td>
          <input
            type="number"
            value={row.requiredQuantity}
            onChange={(e) => handleInputChange(index, "requiredQuantity", e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            value={row.issuedQuantity}
            onChange={(e) => handleInputChange(index, "issuedQuantity", e.target.value)}
          />
        </td>
        <td>
          <button
            className="ipmedicineindent-save-btn"
            onClick={() => handleAddRow(index)}
          >
            Add Row
          </button>
          <button
            className="ipmedicineindent-save-btn"
            onClick={() => handleDeleteRow(index)}
          >
            Delete Row
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
<button className="ipmedicineindent-save-btn" onClick={handleSavemedicein}>
        Save Medicine Indent
      </button>


      {activePopup && (
        <PopupTable
        columns={columns}
        data={data}
        onSelect={handleSelect}
        onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
};

export default IpMedicineIndent;