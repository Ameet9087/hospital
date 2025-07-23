import React, { useEffect, useRef, useState } from "react";
import "./doctormaster.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomModal from "../../../CustomModel/CustomModal";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
} from "../../../FloatingInputs";
import { toast } from "react-toastify";
const DoctorMaster = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedTab, setSelectedTab] = useState("doctorFee");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const tableRef = useRef(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [doctorData, setDoctorData] = useState([]);
  const [allPaytype, setAllPaytype] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [doctorId, setDoctorId] = useState();

  const [locationData, setLocationData] = useState([
    { id: "", locationName: "", locationCode: "" },
  ]);

  const [formdata, setFormdata] = useState({
    salutation: "Dr",
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
    unitMaster: true,
  });

  const [doctorFeeTableRowsableRows, setDoctorFeeTableRowsableRows] = useState(
    allPaytype?.map((paytype) => ({
      payTypeName: paytype.payTypeName,
      opdCategory: paytype.opdCategory,
      paytypeId: paytype.id,
      morningFirstVisit: "",
      morningFirstVisitToDoctor: "",
      morningSubVisit: "",
      morningSubVisitToDoctor: "",
      morningEmergency: "",
      morningEmergencyToDoctor: "",
      eveningFirstVisit: "",
      eveningFirstVisitToDoctor: "",
      eveningSubVisit: "",
      eveningSubVisitToDoctor: "",
      eveningEmergency: "",
      eveningEmergencyToDoctor: "",
      referralVisit: "",
      referralVisitToDoctor: "",
      generalOpdFee: "",
      followupopdfees: "",
    }))
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [specialisation, setSpecialisation] = useState([]);
  const [selectedSpecialisation, setSelectedSpecialisation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAllPaytype = async () => {
      const response = await axios.get(`${API_BASE_URL}/pay-type`);
      setAllPaytype(response.data);
    };
    fetchAllPaytype();
  }, []);

  useEffect(() => {
    if (allPaytype.length > 0) {
      setDoctorFeeTableRowsableRows(
        allPaytype.map((paytype) => ({
          payTypeName: paytype.payTypeName,
          opdCategory: paytype.opdCategory,
          paytypeId: paytype.id,
          morningFirstVisit: "",
          morningFirstVisitToDoctor: "",
          morningSubVisit: "",
          morningSubVisitToDoctor: "",
          morningEmergency: "",
          morningEmergencyToDoctor: "",
          eveningFirstVisit: "",
          eveningFirstVisitToDoctor: "",
          eveningSubVisit: "",
          eveningSubVisitToDoctor: "",
          eveningEmergency: "",
          eveningEmergencyToDoctor: "",
          referralVisit: "",
          referralVisitToDoctor: "",
          generalOpdFee: "",
          followupopdfees: "",
        }))
      );
    }
  }, [allPaytype]);

  const fetchSpecialisation = async () => {
    const response = await axios.get(`${API_BASE_URL}/specialisations`);
    setSpecialisation(response.data);
    console.log(response.data);
  };

  const fetchLocation = async () => {
    const response = await axios.get(`${API_BASE_URL}/location-masters`);
    setLocations(response.data);
  };

  useEffect(() => {
    fetchSpecialisation();
    fetchLocation();
  }, []);

  const fetchAllDoctorData = async () => {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    setDoctorData(response.data);
  };

  useEffect(() => {
    fetchAllDoctorData();
  }, []);

  const getPopupData = () => {
    if (showModal) {
      return {
        columns: ["specialisationId", "specialisationName"],
        data: specialisation,
      };
    } else if (showLocationModal) {
      return {
        columns: ["id", "locationName"],
        data: locations,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    setSelectedSpecialisation(data);
    setFormdata((prevState) => ({
      ...prevState,
      specialization: data?.specialisationName,
    }));
    setShowModal(false);
  };
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);

  const handleLocationSelect = (data) => {
    setSelectedLocation(data);

    // Update the specific row in locationData
    setLocationData((prevState) => {
      const updatedLocationData = [...prevState];
      updatedLocationData[selectedLocationIndex] = {
        locationName: data.locationName,
        locationCode: data.locationCode,
      };
      return updatedLocationData;
    });

    setShowLocationModal(false);
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

    if (name == "residencePinCode") {
      const data = await fetchDataByPinCode(value);
      setFormdata((prevState) => ({
        ...prevState,
        residenceDistrict: data?.countryName,
        residenceState: data?.stateName,
        residenceCity: data?.cityName,
      }));
    }
  };

  const handleDoctorFessChange = (e, index) => {
    const { name, value } = e.target;
    setDoctorFeeTableRowsableRows((prevState) =>
      prevState.map((row, i) =>
        i === index
          ? {
            ...row,
            [name]: value,
          }
          : row
      )
    );
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      console.log("Selected file:", files[0]);
    } else {
      console.log("No file selected or input was cleared");
      setSelectedFile(null);
    }
  };

  const clear = () => {
    setFormdata({
      salutation: "Dr",
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
      unitMaster: true,
    });

    // Reset doctorFeeTableRowsableRows using the current allPaytype
    setDoctorFeeTableRowsableRows(
      allPaytype?.map((paytype) => ({
        payTypeName: paytype.payTypeName,
        opdCategory: paytype.opdCategory,
        paytypeId: paytype.id,
        morningFirstVisit: "",
        morningFirstVisitToDoctor: "",
        morningSubVisit: "",
        morningSubVisitToDoctor: "",
        morningEmergency: "",
        morningEmergencyToDoctor: "",
        eveningFirstVisit: "",
        eveningFirstVisitToDoctor: "",
        eveningSubVisit: "",
        eveningSubVisitToDoctor: "",
        eveningEmergency: "",
        eveningEmergencyToDoctor: "",
        referralVisit: "",
        referralVisitToDoctor: "",
        generalOpdFee: "",
        followupopdfees: "",
      }))
    );
  };

  const handleEdit = (doctor) => {
    setIsEdit(true);
    setDoctorId(doctor.doctorId);
    setFormdata({
      salutation: doctor.salutation || "Dr",
      doctorName: doctor.doctorName,
      gender: doctor.gender,
      dob: doctor.dob,
      anniversaryDate: doctor.anniversaryDate,
      specialization: doctor.specialization,
      pancardNo: doctor.pancardNo,
      emailId: doctor.emailId,
      degree: doctor.degree,
      title: doctor.title,
      registrationNo: doctor.registrationNo,
      employeeType: doctor.employeeType,
      doctorType: doctor.doctorType,
      typeOfConsultant: doctor.typeOfConsultant,
      complemetType: doctor.complemetType,
      residenceAddress: doctor.residenceAddress,
      residenceCity: doctor.residenceCity,
      residenceDistrict: doctor.residenceDistrict,
      residenceState: doctor.residenceState,
      residencePinCode: doctor.residencePinCode,
      residencePhoneNo: doctor.residencePhoneNo,
      mobileNumber: doctor.mobileNumber,
      clinicAddress: doctor.clinicAddress,
      clinicCity: doctor.clinicCity,
      clinicDistrict: doctor.clinicDistrict,
      clinicState: doctor.clinicState,
      clinicPhoneNo: doctor.clinicPhoneNo,
      validSvNos: doctor.validSvNos,
      svValidDays: doctor.svValidDays,
      doctorAssistantNo: doctor.doctorAssistantNo,
      doctorAssistantDis: doctor.doctorAssistantDis,
      unitMaster: doctor.unitMaster,
    });

    // Populate fees data
    setDoctorFeeTableRowsableRows(
      doctor.orgDoctorFees?.map((fee) => ({
        payTypeName: fee.payType.payTypeName,
        opdCategory: fee.payType.opdCategory,
        paytypeId: fee.payType.id,
        morningFirstVisit: fee.morningFirstVisit,
        morningFirstVisitToDoctor: fee.morningFirstVisitToDoctor,
        morningSubVisit: fee.morningSubVisit,
        morningSubVisitToDoctor: fee.morningSubVisitToDoctor,
        morningEmergency: fee.morningEmergency,
        morningEmergencyToDoctor: fee.morningEmergencyToDoctor,
        eveningFirstVisit: fee.eveningFirstVisit,
        eveningFirstVisitToDoctor: fee.eveningFirstVisitToDoctor,
        eveningSubVisit: fee.eveningSubVisit,
        eveningSubVisitToDoctor: fee.eveningSubVisitToDoctor,
        eveningEmergency: fee.eveningEmergency,
        eveningEmergencyToDoctor: fee.eveningEmergencyToDoctor,
        referralVisit: fee.referralVisit,
        referralVisitToDoctor: fee.referralVisitToDoctor,
        generalOpdFee: fee.generalOpdFee,
        followupopdfees: fee.followupopdfees,
      })) || []
    );

    setSelectedFile(doctor.doctorSignature);
    setModelOpen(true);
  };

  const handleDelete = async (doctorId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/${doctorId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Doctor Deleted Successfully");
        fetchAllDoctorData();
      } else {
        toast.error("Failed to delete doctor:", response.statusText);
      }
    } catch (error) {
      toast.error("Error deleting doctor:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formdata.doctorName || !formdata.gender || !formdata.mobileNumber) {
        toast.error("Please fill all required fields");
        return;
      }

      // Structure the doctor data according to API requirements
      const doctordata = {
        salutation: formdata.salutation || "Dr.",
        doctorName: formdata.doctorName,
        gender: formdata.gender,
        dob: formdata.dob,
        anniversaryDate: formdata.anniversaryDate,
        specialization: formdata.specialization,
        pancardNo: formdata.pancardNo,
        emailId: formdata.emailId,
        degree: formdata.degree,
        title: formdata.title,
        registrationNo: formdata.registrationNo,
        employeeType: formdata.employeeType,
        doctorType: formdata.doctorType,
        typeOfConsultant: formdata.typeOfConsultant,
        complemetType: formdata.complemetType || "None",
        residenceAddress: formdata.residenceAddress,
        residenceCity: formdata.residenceCity,
        residenceDistrict: formdata.residenceDistrict,
        residenceState: formdata.residenceState,
        residencePinCode: formdata.residencePinCode,
        residencePhoneNo: formdata.residencePhoneNo,
        mobileNumber: formdata.mobileNumber,
        clinicAddress: formdata.clinicAddress,
        clinicCity: formdata.clinicCity,
        clinicDistrict: formdata.clinicDistrict,
        clinicState: formdata.clinicState,
        clinicPhoneNo: formdata.clinicPhoneNo,
        validSvNos: formdata.validSvNos,
        svValidDays: formdata.svValidDays,
        doctorAssistantNo: formdata.doctorAssistantNo,
        doctorAssistantDis: formdata.doctorAssistantDis,
        unitMaster: formdata.unitMaster,

        // Add specialization ID
        specialisationId: {
          specialisationId: selectedSpecialisation?.specialisationId || 1
        },

        // Format location data
        locationMasterDTO: locationData
          .filter(location => location.locationName)
          .map(location => ({
            id: location.id
          })),

        // Format doctor fees
        orgDoctorFees: doctorFeeTableRowsableRows
          .filter(fee => fee.generalOpdFee || fee.followupopdfees) // Only include rows with fees
          .map(fee => ({
            payType: {
              id: fee.paytypeId
            },
            morningFirstVisit: fee.morningFirstVisit || 0,
            morningFirstVisitToDoctor: fee.morningFirstVisitToDoctor || 0,
            morningSubVisit: fee.morningSubVisit || 0,
            morningSubVisitToDoctor: fee.morningSubVisitToDoctor || 0,
            morningEmergency: fee.morningEmergency || 0,
            morningEmergencyToDoctor: fee.morningEmergencyToDoctor || 0,
            eveningFirstVisit: fee.eveningFirstVisit || 0,
            eveningFirstVisitToDoctor: fee.eveningFirstVisitToDoctor || 0,
            eveningSubVisit: fee.eveningSubVisit || 0,
            eveningSubVisitToDoctor: fee.eveningSubVisitToDoctor || 0,
            eveningEmergency: fee.eveningEmergency || 0,
            eveningEmergencyToDoctor: fee.eveningEmergencyToDoctor || 0,
            referralVisit: fee.referralVisit || 0,
            referralVisitToDoctor: fee.referralVisitToDoctor || 0,
            generalOpdFee: fee.generalOpdFee || 0,
            followupopdfees: fee.followupopdfees || 0
          }))
      };



      const formDataObj = new FormData();

      if (selectedFile) {
        formDataObj.append("signature", selectedFile);
      }

      const jsonData = JSON.stringify(doctordata);
      formDataObj.append("addDoctorDTO", jsonData);
      console.log(JSON.stringify(doctorData, null, 2));


      let response;
      if (isEdit) {
        response = await axios.put(
          `${API_BASE_URL}/doctors/${doctorId}`,
          formDataObj,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }else {
        response = await axios.post(
          `${API_BASE_URL}/doctors`,
          formDataObj,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      if (response.data) {
        setModelOpen(false);
        clear();
        fetchAllDoctorData();
        toast.success(isEdit ? "Doctor Updated Successfully" : "Doctor Added Successfully");
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error(error.response?.data?.message || "Error saving doctor data");
    }
  };


  const handleAdd = (index) => {
    // Logic to add a new row
    const newLocation = { locationName: "", locationCode: "" };
    setLocationData([...locationData, newLocation]);
  };
  const handleDeletes = (index) => {
    if (index === 0) {
      alert("The first row cannot be deleted!");
      return;
    }
    // Remove the selected row except the first one
    const updatedData = locationData.filter((_, i) => i !== index);
    setLocationData(updatedData);
  };

  const renderTable = () => {
    switch (selectedTab) {
      case "doctorFee":
        return (
          <div className="services-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "SN",
                    "payType",
                    "Opd Charges Allow",
                    "Morning First Visit",
                    "Morning First Visit (ToDoctor)",
                    "Morning Sub Visit",
                    "Morning Sub Visit(ToDoctor)",
                    "Morning Emergency",
                    "Morning Emergency(ToDoctor)",
                    "Evening First Visit",
                    "Evening First Visit(ToDoctor)",
                    "Evening Sub Visit",
                    "Evening Sub Visit(ToDoctor)",
                    "Evening Emergency",
                    "Evening Emergency(ToDoctor)",
                    "ReferralVisit",
                    "ReferralVisit(ToDoctor)",
                    "GeneralOpdFee",
                    "Followup Opd Fee",
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
                {doctorFeeTableRowsableRows?.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.payTypeName}</td>
                    <td>{row.opdCategory}</td>
                    <td>
                      <FloatingInput
                        label={"morningFirstVisit"}
                        type="text"
                        name="morningFirstVisit"
                        value={row.morningFirstVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"morningFirstVisitToDoctor"}
                        type="text"
                        name="morningFirstVisitToDoctor"
                        value={row.morningFirstVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"morningSubVisit"}
                        type="text"
                        name="morningSubVisit"
                        value={row.morningSubVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"morningSubVisitToDoctor"}
                        type="text"
                        name="morningSubVisitToDoctor"
                        value={row.morningSubVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"morningEmergency"}
                        type="text"
                        name="morningEmergency"
                        value={row.morningEmergency}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"morningEmergencyToDoctor"}
                        type="text"
                        name="morningEmergencyToDoctor"
                        value={row.morningEmergencyToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"eveningFirstVisit"}
                        type="text"
                        name="eveningFirstVisit"
                        value={row.eveningFirstVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"eveningFirstVisitToDoctor"}
                        type="text"
                        name="eveningFirstVisitToDoctor"
                        value={row.eveningFirstVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"eveningSubVisit"}
                        type="text"
                        name="eveningSubVisit"
                        value={row.eveningSubVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"eveningSubVisitToDoctor"}
                        type="text"
                        name="eveningSubVisitToDoctor"
                        value={row.eveningSubVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"eveningEmergency"}
                        type="text"
                        name="eveningEmergency"
                        value={row.eveningEmergency}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"eveningEmergencyToDoctor"}
                        type="text"
                        name="eveningEmergencyToDoctor"
                        value={row.eveningEmergencyToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"referralVisit"}
                        type="text"
                        name="referralVisit"
                        value={row.referralVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"referralVisitToDoctor"}
                        type="text"
                        name="referralVisitToDoctor"
                        value={row.referralVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"generalOpdFee"}
                        type="text"
                        name="generalOpdFee"
                        value={row.generalOpdFee}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                        required
                      />
                    </td>
                    <td>
                      <FloatingInput
                        label={"FollowUpOpdFees"}
                        type="text"
                        name="followupopdfees"
                        value={row.followupopdfees}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                        restrictions={{ number: true }}
                        min="0"
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="doctor-com-master-summary-section"></div>
          </div>
        );

      case "location":
        return (
          <div className="services-table">
            <table ref={tableRef}>
              <thead>
                <tr>
                  <th style={{ width: "100px" }} className="resizable-th">
                    Action
                  </th>
                  {["Sr. No", "Location Name", "Location Code"].map(
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
                {locationData.map((location, index) => (
                  <tr key={index}>
                    {/* Action Buttons */}
                    <td>
                      <button
                        onClick={() => handleAdd(index)}
                        className="DoctorMaster-add-btn"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => handleDeletes(index)}
                        className="DoctorMaster-delete-btn"
                      >
                        Delete
                      </button>
                    </td>

                    <td>{index + 1}</td>
                    <td>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          value={location.locationName}
                          onClick={() => {
                            setSelectedLocationIndex(index); // Set the index of the row being edited
                            setShowLocationModal(true);
                          }}
                          readOnly
                          style={{ paddingRight: "30px" }}
                        />
                        <FontAwesomeIcon
                          className="DoctorMastericon"
                          icon={faSearch}
                          onClick={() => {
                            setSelectedLocationIndex(index); // Set the index of the row being edited
                            setShowLocationModal(true);
                          }}
                        />
                      </div>
                    </td>
                    <td>{location.locationCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <>
      <div className="doctormaster-container">
        <button
          onClick={() => {
            clear();
            setModelOpen(true);
          }}
          className="add-doctor-btn"
        >
          Add Doctor
        </button>

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
                "Residence Address",
                "Actions",
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
                  <td>
                    <button
                      className="doctormaster-edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="doctormaster-delete-btn"
                      onClick={() => handleDelete(item.doctorId)}
                    >
                      Delete
                    </button>
                  </td>
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
        <div className="doctormaster-popup-con">
          <div className="doctormaster-main">
            <div className="doctormaster-doctor-details">
              <span className="doctormasterspanheader">Doctor Detail</span>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Dr. Name"}
                  value={formdata.doctorName}
                  name={"doctorName"}
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingSelect
                  label={"Gender"}
                  name="gender"
                  value={formdata.gender}
                  onChange={handleInputChange}
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ]}
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"DOB"}
                  value={formdata.dob}
                  onChange={handleInputChange}
                  name="dob"
                  type="date"
                />
              </div>

              <div className="docmasterformdata">
                <FloatingInput
                  label={"Anniversary"}
                  value={formdata.anniversaryDate}
                  onChange={handleInputChange}
                  name="anniversaryDate"
                  type="date"
                />
              </div>

              <div className="docmasterformdata">
                <FloatingInput
                  label={"Specialisation"}
                  value={selectedSpecialisation?.specialisationName}
                  type="search"
                  onIconClick={() => setShowModal(true)}
                />
              </div>
              <div className="docmasterformdata">
                <FloatingSelect
                  label={"Doctor Type"}
                  value={formdata.doctorType}
                  onChange={handleInputChange}
                  name="doctorType"
                  options={[
                    { value: "Employee", label: "Employee" },
                    { value: "Referral", label: "Referral" },
                    { value: "Consultant", label: "Consultant" },
                    { value: "Both", label: "Both" },
                  ]}
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Pancard No"}
                  type="text"
                  value={formdata.pancardNo}
                  onChange={handleInputChange}
                  name="pancardNo"
                  restrictions={{ varchar: true, max: 10 }}
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Mobile No"}
                  type="email"
                  value={formdata.mobileNumber}
                  onChange={handleInputChange}
                  name="mobileNumber"
                  restrictions={{ number: true, max: 10 }}
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Email ID"}
                  type="email"
                  value={formdata.emailId}
                  onChange={handleInputChange}
                  name="emailId"
                />
              </div>

              <div className="docmasterformdata">
                <FloatingInput
                  label={"Dr. Degree"}
                  type="text"
                  value={formdata.degree}
                  onChange={handleInputChange}
                  name="degree"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Dr. Title"}
                  type="text"
                  value={formdata.title}
                  onChange={handleInputChange}
                  name="title"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Dr. Reg No"}
                  type="text"
                  value={formdata.registrationNo}
                  onChange={handleInputChange}
                  name="registrationNo"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingSelect
                  label={"Employee Type"}
                  value={formdata.employeeType}
                  onChange={handleInputChange}
                  name="employeeType"
                  options={[
                    { value: "employee", label: "employee" },
                    { value: "non employee", label: "non employee" },
                  ]}
                />
              </div>

              <div className="docmasterformdata">
                <FloatingSelect
                  label={"Type of Consultent"}
                  value={formdata.typeOfConsultant}
                  onChange={handleInputChange}
                  name="typeOfConsultant"
                  options={[
                    { value: "full-time", label: "full-time" },
                    { value: "half-time", label: "half-time" },
                  ]}
                />
              </div>
            </div>

            <div className="doctormaster-residence-details">
              <span className="doctormasterspanheader">Residence Address</span>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Address"}
                  value={formdata.residenceAddress}
                  onChange={handleInputChange}
                  name="residenceAddress"
                  type="text"
                />
              </div>

              <div className="docmasterformdata">
                <FloatingInput
                  label={"District"}
                  value={formdata.residenceDistrict}
                  onChange={handleInputChange}
                  name="residenceDistrict"
                  type="text"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"State"}
                  value={formdata.residenceState}
                  onChange={handleInputChange}
                  name="residenceState"
                  type="text"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"City"}
                  value={formdata.residenceCity}
                  onChange={handleInputChange}
                  name="residenceCity"
                  type="text"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Phone No"}
                  value={formdata.residencePhoneNo}
                  onChange={handleInputChange}
                  name="residencePhoneNo"
                  type="text"
                  restrictions={{ number: true, max: 10 }}
                />
              </div>

              <div className="docmasterformdata">
                <FloatingInput
                  label={"Pin Code"}
                  value={formdata.residencePinCode}
                  onChange={handleInputChange}
                  name="residencePinCode"
                  type="text"
                  restrictions={{ number: true }}
                />
              </div>
              <span className="doctormasterspanheader">Clinical Address</span>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Clinic Address"}
                  type="text"
                  value={formdata.clinicAddress}
                  onChange={handleInputChange}
                  name="clinicAddress"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"District"}
                  type="text"
                  value={formdata.clinicDistrict}
                  onChange={handleInputChange}
                  name="clinicDistrict"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"State"}
                  type="text"
                  value={formdata.clinicState}
                  onChange={handleInputChange}
                  name="clinicState"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"City"}
                  type="text"
                  value={formdata.clinicCity}
                  onChange={handleInputChange}
                  name="clinicCity"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Mobile No"}
                  type="text"
                  value={formdata.clinicPhoneNo}
                  onChange={handleInputChange}
                  name="clinicPhoneNo"
                />
              </div>
            </div>

            <div className="doctormaster-clinic-details">
              <span className="doctormasterspanheader">
                Sub-Visit Validation
              </span>

              <div className="docmasterformdata">
                <FloatingInput
                  label={"Valid Sv Nos"}
                  type="text"
                  value={formdata.validSvNos}
                  onChange={handleInputChange}
                  name="validSvNos"
                />
              </div>
              <div className="docmasterformdata">
                <FloatingInput
                  label={"Valid Sv Days"}
                  type="text"
                  value={formdata.svValidDays}
                  onChange={handleInputChange}
                  name="svValidDays"
                />
              </div>

              <div className="docmasterformdata">
                <FloatingInput
                  label={"Doctor Assistent No"}
                  type="text"
                  value={formdata.doctorAssistantNo}
                  onChange={handleInputChange}
                  name="doctorAssistantNo"
                  restrictions={{ number: true, max: 10 }}
                />
              </div>
              <div className="docmasterformdata">
                <label className="doctormaster-label">Unit Master:</label>
                <input
                  className=""
                  type="checkbox"
                  checked={formdata.unitMaster}
                />
              </div>
              <div className="docmasterformdata">
                <input type="file" onChange={(e) => handleFileChange(e)} />
              </div>
              <div className="docmasterformdata"></div>

              <span className="doctormasterspanheader doctor-hidden-form-fields">
                Hello World
              </span>
              <div className="docmasterformdata doctor-hidden-form-fields">
                <FloatingInput />
              </div>
              <div className="docmasterformdata doctor-hidden-form-fields">
                <FloatingInput />
              </div>
              <div className="docmasterformdata doctor-hidden-form-fields">
                <FloatingInput />
              </div>
              <div className="docmasterformdata doctor-hidden-form-fields">
                <FloatingInput />
              </div>
              <div className="docmasterformdata doctor-hidden-form-fields">
                <FloatingInput />
              </div>
            </div>
          </div>
          <div>
            <button
              className={`doctormaster-service-button ${selectedTab === "doctorFee" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("doctorFee")}
            >
              Doctor Fee
            </button>

            <button
              className={`doctormaster-service-button ${selectedTab === "location" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("location")}
            >
              Location
            </button>
          </div>
          <div>{renderTable()}</div>
          <div className="doctormaster-header-right">
            <button className="doctormaster-button" onClick={handleSubmit}>
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </CustomModal>
      {showModal && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setShowModal(false)}
        />
      )}

      {showLocationModal && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleLocationSelect}
          onClose={() => setShowLocationModal(false)}
        />
      )}
    </>
  );
};

export default DoctorMaster;
