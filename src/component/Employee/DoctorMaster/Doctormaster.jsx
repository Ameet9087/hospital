import React, { useEffect, useRef, useState } from 'react';
import './doctormaster.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faSearch } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../../CustomModel/CustomModal';
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns"
import IpMasterPopupTable from "../IPMaster/IpMasterPopupTable"
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';

const DoctorMaster = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [doctorData,setDoctorData]=useState([])
  const [formdata, setFormdata] = useState({
    salutation:"Dr",
    doctorName: "",
    gender: "",
    dob: "",
    anniversaryDate: "",
    specialization: "",
    pancardNo: "",
    emailId: "",
    degree: "",
    title: "",
    registrationNo: "",
    employeeType: "",
    doctorType: "",
    typeOfConsultant: "",
    complemetType: "None",
    residenceAddress: "",
    residenceCity: "",
    residenceDistrict: "",
    residenceState: "",
    residencePinCode: "",
    residencePhoneNo: "",
    mobileNumber: "",
    clinicAddress: "",
    clinicCity: "",
    clinicDistrict: "",
    clinicState: "",
    clinicPhoneNo: "",
    validSvNos: "",
    svValidDays: "",
    doctorAssistantNo: "",
    doctorAssistantDis: "",
    unitMaster: true
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [specialisation,setSpecialisation]=useState([])
  const [selectedSpecialisation,setSelectedSpecialisation]=useState(null);
  const [showModal,setShowModal]=useState(false)

  const fetchSpecialisation=async()=>{
    const response = await axios.get(`${API_BASE_URL}/specialisations`)
    setSpecialisation(response.data);
    console.log(response.data);
    
  }

  useEffect(()=>{
    fetchSpecialisation();
  },[])

  const fetchAllDoctorData=async()=>{
    const response = await axios.get(`${API_BASE_URL}/doctors`)
    setDoctorData(response.data)
  }

  useEffect(()=>{
    fetchAllDoctorData()
  },[])

  const getPopupData = () => {
    if (showModal) {
      return { columns: ["specialisationId", "specialisationName"], data: specialisation };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    setSelectedSpecialisation(data);
    setFormdata((prevState)=>({...prevState,specialization:data?.specialisationName}))
    setShowModal(false);
  };


   const fetchDataByPinCode = async (pincode) => {
      const response = await axios.get(
        `${API_BASE_URL}/cities/area-details?areaPinCode=${pincode}`
      );
      return response.data;
    };

    const handleInputChange = async (e) => {
      const { name, value, type, checked } = e.target;
      setFormdata((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      if(name == "residencePinCode"){
        const data = await fetchDataByPinCode(value)
        setFormdata((prevState) => ({
          ...prevState,
          residenceDistrict: data?.countryName,
          residenceState: data?.stateName,
          residenceCity: data?.cityName,
        }));
      }
    };

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
      try {

        formdata.specialisationId={
          specialisationId:selectedSpecialisation?.specialisationId || 1
        }
        const formDataObj = new FormData();
        
        if (selectedFile) {
          formDataObj.append("signature", selectedFile);
        }
    
        const jsonData = JSON.stringify(formdata);
        formDataObj.append("addDoctorDTO",jsonData)

        console.log("JSON Data:", jsonData);
        console.log("File:", selectedFile);
    
        const response = await fetch(`${API_BASE_URL}/doctors`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
          },
          body: formDataObj,
        });
        if (response.ok) {
          console.log("Success");
          setModelOpen(false);
          fetchAllDoctorData();
        } else {
          console.error("Failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during submission:", error);
      }
    };
    

  return (
    <>
      <div className="doctormaster-container">
        <button onClick={() => setModelOpen(true)} className='add-doctor-btn'>Add Doctor</button>

        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Initial",
                "Doctor Name",
                "Degree",
                "Title",
                "Mobile Number",
                "Email",
                "Date Of birth",
                "Gender",
                "Registration No",
                "Employee Type",
                "Residence Address"
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] || "auto" }}
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
            {doctorData?.length > 0 ? (
              doctorData.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.salutation}</td>
                  <td>{item.doctorName}</td>
                  <td>{item.degree}</td>
                  <td>{item.title}</td>
                  <td>{item.mobileNumber}</td>
                  <td>{item.emailId}</td>
                  <td>{item.dob}</td>
                  <td>{item.gender}</td>
                  <td>{item.registrationNo}</td>
                  <td>{item.employeeType}</td>
                  <td>{item.residenceAddress}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-data">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CustomModal isOpen={modelOpen} onClose={() => setModelOpen(false)}>
        <div className="doctormaster-main">
          <div className="doctormaster-doctor-details">
            <span className='doctormasterspanheader'>Doctor Detail</span>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Dr. Name:</label>
              <input className="doctormaster-input" value={formdata.doctorName} name={"doctorName"} onChange={handleInputChange} type="text" />
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Gender:</label>
              <select name="gender" value={formdata.gender} onChange={handleInputChange} className="doctormaster-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">DOB:</label>
              <input className="doctormaster-input" value={formdata.dob} onChange={handleInputChange} name="dob" type="date" />
            </div>


            <div className='docmasterformdata'>
              <label className="doctormaster-label">Anniversary:</label>
              <input className="doctormaster-input" value={formdata.anniversaryDate} onChange={handleInputChange} name="anniversaryDate" type="date" />
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Specialisation:</label>
              <input className="doctormaster-input" value={selectedSpecialisation?.specialisationName} type="text" />
              <i className="fa-solid fa-magnifying-glass" onClick={()=>setShowModal(true)}></i>
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Doctor Type:</label>
              <select value={formdata.doctorType} onChange={handleInputChange} name="doctorType" className="doctormaster-select">
                <option value="Employee">Employee</option>
                <option value="Consultant">Consultant</option>
              </select>
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Pancard No.:</label>
              <input className="doctormaster-input" type="text" value={formdata.pancardNo} onChange={handleInputChange} name="pancardNo"  />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Mobile No:</label>
              <input className="doctormaster-input" type="email" value={formdata.mobileNumber} onChange={handleInputChange} name="mobileNumber" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Email ID:</label>
              <input className="doctormaster-input" type="email" value={formdata.emailId} onChange={handleInputChange} name="emailId" />
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Dr. Degree:</label>
              <input className="doctormaster-input" type="text" value={formdata.degree} onChange={handleInputChange} name="degree" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Dr. Title:</label>
              <input className="doctormaster-input" type="text" value={formdata.title} onChange={handleInputChange} name="title" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Dr. Reg No:</label>
              <input className="doctormaster-input" type="text" value={formdata.registrationNo} onChange={handleInputChange} name="registrationNo" />
            </div>
          </div>


          <div className="doctormaster-residence-details">
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Employee Type:</label>
              <select value={formdata.employeeType} onChange={handleInputChange} name="employeeType" className="doctormaster-select">
                <option value="Permanent">Permanent</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Type of Consultent:</label>
              <select value={formdata.typeOfConsultant} onChange={handleInputChange} name="typeOfConsultant" className="doctormaster-select">
                <option value="full-time">full-time</option>
                <option value="half-time">Half-time</option>
              </select>
            </div>

            <span className='doctormasterspanheader'>
              Residence Address
            </span>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Address:</label>
              <input value={formdata.residenceAddress} onChange={handleInputChange} name="residenceAddress" className="doctormaster-input" type="text" />
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">District:</label>
              <input value={formdata.residenceDistrict} onChange={handleInputChange} name="residenceDistrict" className="doctormaster-input" type="text" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">City:</label>
              <input value={formdata.residenceState} onChange={handleInputChange} name="residenceState" className="doctormaster-input" type="text" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">City:</label>
              <input value={formdata.residenceCity} onChange={handleInputChange} name="residenceCity" className="doctormaster-input" type="text" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Phone No:</label>
              <input className="doctormaster-input" value={formdata.residencePhoneNo} onChange={handleInputChange} name="residencePhoneNo" type="text" />
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Pin Code:</label>
              <input className="doctormaster-input" value={formdata.residencePinCode} onChange={handleInputChange} name="residencePinCode" type="text" />
            </div>
            <span className='doctormasterspanheader'>Clinical Address</span>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Clinic Address:</label>
              <input className="doctormaster-input" type="text" value={formdata.clinicAddress} onChange={handleInputChange} name="clinicAddress" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">District :</label>
              <input className="doctormaster-input" type="text" value={formdata.clinicDistrict} onChange={handleInputChange} name="clinicDistrict" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">State :</label>
              <input className="doctormaster-input" type="text" value={formdata.clinicState} onChange={handleInputChange} name="clinicState" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">City:</label>
              <input className="doctormaster-input" type="text" value={formdata.clinicCity} onChange={handleInputChange} name="clinicCity" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Mobile No :</label>
              <input className="doctormaster-input" type="text" value={formdata.clinicPhoneNo} onChange={handleInputChange} name="clinicPhoneNo" />
            </div>
          </div>

          <div className="doctormaster-clinic-details">
            <span className='doctormasterspanheader'>Sub-Visit Validation</span>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Vlid SV Nos:</label>
              <input className="doctormaster-input" type="text" value={formdata.validSvNos} onChange={handleInputChange} name="validSvNos"  />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Valid SV Days   :</label>
              <input className="doctormaster-input" type="text" value={formdata.svValidDays} onChange={handleInputChange} name="svValidDays" />
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Upload Dr sign here:</label>
              <input className="doctormaster-input" type="text" />
            </div>

            <div className='docmasterformdata'>
              <input type="file" />
            </div>

            <div className='docmasterformdata'>
              <label className="doctormaster-label">Doctorn Assistent No:</label>
              <input className="doctormaster-input" type="text" value={formdata.doctorAssistantNo} onChange={handleInputChange} name="doctorAssistantNo" />
            </div>
            <div className='docmasterformdata'>
              <label className="doctormaster-label">Unit Master:</label>
              <input className="" type="checkbox" checked={formdata.unitMaster} />
            </div>
          </div>
        </div>
        <div className="doctormaster-header-right">
          <button className="doctormaster-button" onClick={handleSubmit}>Save</button>

        </div>
      </CustomModal>
        {showModal && (
          <IpMasterPopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={()=>setShowModal(false)}
          />
        )}
    </>

  );
}

export default DoctorMaster;
