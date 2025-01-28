import React, { useState, useRef, useEffect } from "react";
import "./IpAdmission.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import PopupTable from "./PopupTable";
import { usePopup } from "../../FidgetSpinner/PopupContext";

const IpAdmission = ({ patientData, onClose }) => {
  const { showPopup } = usePopup()
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [country, setCountry] = useState([]);
  const [patient, setPatient] = useState();
  const [admissionSlipId, setAdmissionSlipId] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const response = location.state?.patientData || null;
    if (patientData != null) {
      setPatient(patientData);
    } else {
      setAdmissionSlipId(response?.admissionSlipId);
      setPatient(response);
    }
  }, [patientData]);

  const handleAddRow = () => {
    setPackageTableRows((prevRows) => [
      ...prevRows,
      {
        sn: prevRows.length + 1,
        idname: "aadhar card",
        patient: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setPackageTableRows((prevRows) => {
      const updatedRows = prevRows.filter((_, rowIndex) => rowIndex !== index);
      return updatedRows.map((row, idx) => ({
        ...row,
        sn: idx + 1, // Reassign serial numbers
      }));
    });
  };

  const [packageTableRows, setPackageTableRows] = useState([
    { sn: 1, idname: "aadhar card", idno: "" },
  ]);

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Add the file to the state
      setFiles((prevFiles) => [
        ...prevFiles,
        { name: selectedFile.name, file: selectedFile },
      ]);
    }
  };

  useEffect(() => {
    const fetchAllCountry = async () => {
      const response = await axios.get(`${API_BASE_URL}/country`);
      setCountry(response.data);
    };
    fetchAllCountry();
  }, []);

  const [activePopup, setActivePopup] = useState(null);
  const [paytype, setPaytype] = useState();
  const payTypeHeading = ["id", "payTypeName"];
  const roomHeadings = ["roomId", "roomType"];
  const bedHeadings = [
    "bedNo",
    "roomNo",
    "roomType",
    "floorNumber",
    "bedCharges",
  ];
  const consultantDoctorHeading = ["doctorName", "specialization"];
  const specialityHeading = ["specialisationId", "specialisationName"];
  const hospitalPanelHeading = ["panalId", "name"];
  const patientHeading = [
    "uhid",
    "salutation",
    "firstName",
    "lastName",
    "mobileNumber",
    "age",
    "gender",
  ];

  const [selectedPaytype, setSelectedPaytype] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [consultantDoctor, setConsultantDoctor] = useState([]);
  const [speciality, setSpecialtiy] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [coConsultant, setCoConsultant] = useState([]);
  const [selectedCoConsultant, setSelectedCoConsultant] = useState(null);
  const [selectedSecondCoConsultant, setSelectedSecondCoConsultant] =
    useState(null);
  const [floor, setFloor] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [files, setFiles] = useState([]);
  const [hospitalPanel, setHospitalPanel] = useState([]);
  const [selectedHospitalPanel, setSelectedHospitalPanel] = useState(null);
  const [allPatient, setAllPatient] = useState([]);
  const [referedDoctor, setReferedDoctor] = useState([]);
  const [selectedReferredDoctor, setSelectedReferredDoctor] = useState(null);

  const [formData, setFormData] = useState({
    diagnosis: "",
    remarks: "",
    pharmacyCredit: "",
    patientStatus: "",
    passportNo: "",
    passportIssueDate: "",
    passportAddress: "",
    nationality: "india",
    pancardNo: "",
    visaNo: "",
    visaExpiryDate: "",
    currentSOC: "",
    currentDiscountPolicy: "",
    sourceOfAdmission: "",
    typeDiagnostics: "",
    typeAdmission: "",
    visitorPasses: 0,
    issued: "",
    referredBy: "",
    type: "Hospital",
    idCardNo: "",
    cardHolder: "",
    cardHolderName: "",
    ccnNo: "",
    hospitalPanel: "",
  });

  const getPopupData = () => {
    if (activePopup === "patient") {
      return { columns: patientHeading, data: allPatient };
    } else if (activePopup === "paytype") {
      return { columns: payTypeHeading, data: paytype };
    } else if (activePopup === "room") {
      return { columns: roomHeadings, data: rooms };
    } else if (activePopup === "bed") {
      return { columns: bedHeadings, data: beds };
    } else if (activePopup === "consultantDoctor") {
      return { columns: consultantDoctorHeading, data: consultantDoctor };
    } else if (activePopup === "secondCoConsultant") {
      return { columns: consultantDoctorHeading, data: coConsultant };
    } else if (activePopup === "speciality") {
      return { columns: specialityHeading, data: speciality };
    } else if (activePopup === "coConsultant") {
      return { columns: consultantDoctorHeading, data: coConsultant };
    } else if (activePopup === "referredDoctors") {
      return { columns: consultantDoctorHeading, data: referedDoctor };
    } else if (activePopup === "hospitalPanel") {
      return { columns: hospitalPanelHeading, data: hospitalPanel };
    } else if (activePopup === "nationality") {
      return {
        columns: ["countryId", "countryName", "countryShortName"],
        data: country,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const fetchPaytypes = async () => {
    const response = await axios.get(`${API_BASE_URL}/pay-type`);
    setPaytype(response.data);
  };

  const fetchSpeciality = async () => {
    const response = await axios.get(`${API_BASE_URL}/specialisations`);
    setSpecialtiy(response.data);
  };

  const fetchAllReferredDoctors = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/doctors/doctors/non-employees`
    );
    setReferedDoctor(response.data);
  };

  const fetchAllDoctorUnderSepciality = async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/doctors/specialization/${id}`
    );
    return response.data;
  };

  const fetchAllDoctors = async () => {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    setConsultantDoctor(response.data);
  };

  const fetchAllCoConsultant = async () => {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    setCoConsultant(response.data);
  };

  const fetchAllHospitalPanel = async () => {
    const response = await axios.get(`${API_BASE_URL}/hospitalPanels`);
    setHospitalPanel(response.data);
  };

  const fetchPatientRegistration = async () => {
    const response = await axios.get(`${API_BASE_URL}/patient-register/all`);
    setAllPatient(response.data);
  };

  useEffect(() => {
    fetchPatientRegistration();
    fetchAllReferredDoctors();
    fetchPaytypes();
    fetchAllCoConsultant();
    fetchAllHospitalPanel();
    if (consultantDoctor.length == 0) {
      fetchAllDoctors();
      fetchSpeciality();
    } else {
      fetchSpeciality();
    }
  }, []);

  const handleSelect = async (data) => {
    if (activePopup === "patient") {
      setPatient(data);
    } else if (activePopup === "paytype") {
      try {
        setSelectedPaytype(data);
        const details = await fetchAllBedsAndRoomByPaytype(data.id);

        if (!details) {
          console.warn("No details returned from API");
          setRooms([]);
          setBeds([]);
          setFloor([]);
          setRoomTypes([]);
          return;
        }

        const normalizedDetails = Array.isArray(details) ? details : [details];
        console.log("Normalized Details:", normalizedDetails);

        const rooms = [];
        const beds = [];
        const roomsType = [];
        const floors = [];

        normalizedDetails.forEach((item) => {
          if (item.roomTypes) {
            item.roomTypes.forEach((type) => {
              roomsType.push({
                roomTypeId: type.roomTypeId,
                roomType: type.roomType,
              });
            });
          }

          if (item.rooms) {
            item.rooms.forEach((room) => {
              rooms.push({
                roomId: room.roomId,
                roomNumber: room.roomNumber,
                roomName: room.name,
              });
            });
          }

          if (item.beds) {
            item.beds.forEach((bed) => {
              beds.push({
                bedId: bed.bedId,
                roomNo: bed.roomNo,
                bedNo: bed.bedNo,
                bedCharges: bed.bedCharges,
                floorNumber: bed.floorNo,
                roomType: bed.roomType,
              });
            });
          }

          if (item.floors) {
            item.floors.forEach((floor) => {
              floors.push({
                floorId: floor.floorId,
                floorNo: floor.floorNo,
              });
            });
          }
        });
        setRooms(rooms);
        setBeds(beds);
        setFloor(floors);
        setRoomTypes(roomsType);
      } catch (error) {
        console.error("Error fetching or processing details:", error);
      }
    } else if (activePopup === "bed") {
      setSelectedBed(data);
      console.log(roomTypes);

      const roomContainingBed = rooms.find(
        (room) => room.roomNumber == data.roomNo
      );

      const floorDetails = floor.find(
        (floor) => floor.floorNo == data.floorNumber
      );
      const roomTypeDetails = roomTypes.find(
        (type) => type?.roomType == data.roomType
      );
      setSelectedRoom(roomContainingBed);
      setSelectedFloor(floorDetails);
      setSelectedRoomType(roomTypeDetails);
    } else if (activePopup === "room") {
      setSelectedRoom(data);
    } else if (activePopup === "speciality") {
      setSelectedSpeciality(data);
      let doctor = await fetchAllDoctorUnderSepciality(data.specialisationId);
      setConsultantDoctor(doctor);
    } else if (activePopup === "consultantDoctor") {
      setSelectedDoctor(data);
    } else if (activePopup === "coConsultant") {
      setSelectedCoConsultant(data);
    } else if (activePopup === "secondCoConsultant") {
      setSelectedSecondCoConsultant(data);
    } else if (activePopup === "referredDoctors") {
      setSelectedReferredDoctor(data);
    } else if (activePopup === "hospitalPanel") {
      setSelectedHospitalPanel(data);
    } else if (activePopup === "nationality") {
      const countryName = data?.countryName?.toLowerCase() || "india";
      setFormData((prevState) => ({
        ...prevState,
        nationality: countryName,
      }));
    }

    setActivePopup(null); // Close the popup after selection
  };

  const fetchAllBedsAndRoomByPaytype = async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/rooms/available-by-paytype/${id}`
    );
    return response.data;
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    console.log(packageTableRows);
    let organisationDetail;
    if (formData.type === "Organisation") {
      organisationDetail = {
        type: formData.type,
        referredBy: formData.referredBy,
        hospitalPanel: { panalId: selectedHospitalPanel?.panalId },
        idCardNo: formData.idCardNo,
        cardHolder: formData.cardHolder,
        cardHolderName: formData.cardHolderName,
        ccnNo: formData.ccnNo,
      };
    } else {
      organisationDetail = {
        type: formData.type,
      };
    }

    const payload = {
      ...(admissionSlipId > 0 && {
        admissionSlipId: admissionSlipId,
      }),
      organisationDetail,
      ...(selectedReferredDoctor && {
        referredDoctor: {
          doctorId: selectedReferredDoctor?.doctorId,
        },
      }),
      admissionUnderDoctorDetail: {
        consultantDoctor: {
          doctorId:
            selectedDoctor?.doctorId || patient?.admittingDoctor?.doctorId,
        },
        firstCoConsultant: {
          doctorId:
            selectedCoConsultant?.doctorId || patient?.consultant?.doctorId,
        },
        ...(selectedSecondCoConsultant && {
          secondCoConsultant: {
            doctorId: selectedSecondCoConsultant?.doctorId,
          },
        }),
        diagnosis: formData.diagnosis,
        remarks: formData.remarks,
        pharmacyCredit: formData.pharmacyCredit,
        patientStatus: formData.patientStatus,
      },
      patient: {
        patient: {
          patientRegistrationId:
            patient.patientRegistrationId ||
            patient.outPatient?.patient?.patientRegistrationId,
        },
      },
      financials: {
        currentSOC: formData.currentSOC,
        currentDiscountPolicy: formData.currentDiscountPolicy,
        sourceOfAdmission: formData.sourceOfAdmission,
        typeDiagnostics: formData.typeDiagnostics,
        typeAdmission: formData.typeAdmission,
        visitorPasses: formData.visitorPasses,
        issued: formData.issued,
      },

      govtIds: {
        nationality: formData.nationality,
        passportNumber: formData.passportNo,
        passportIssueDate: formData.passportIssueDate,
        passportAddress: formData.passportAddress,
        panCardNumber: formData.pancardNo,
        visaNumber: formData.visaNo,
        visaExipryDate: formData.visaExpiryDate,
      },
      roomDetails: {
        payTypeDTO: { id: parseInt(selectedPaytype?.id) || null },
        bedDTO: { id: parseInt(selectedBed?.bedId) || null },
        roomDTO: { id: parseInt(selectedRoom?.roomId) || null },
        floorDTO: { id: parseInt(selectedFloor?.floorId) || null },
        roomTypeDTO: { id: parseInt(selectedRoomType?.roomTypeId) || null },
      },
      identification: packageTableRows.map((item) => ({
        idName: item.idname,
        idNumber: item.idno,
      })),
    };

    try {
      formdata.append("ipAdmissionDTO", JSON.stringify(payload));
      if (files.length > 0) {
        formdata.append("documents", files);
      }

      console.log(payload);

      const response = await axios.post(
        `
        ${API_BASE_URL}/ip-admissions`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      showPopup([{ url: "/billing/ipdmoneyrecipt", text: "Ip Money Reciept" }])
      console.log("Submission successful");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClear = () => {
    setSelectedPaytype(null);
    setSelectedBed([]);
    setSelectedRoom([]);
    setSelectedSpeciality(null);
    setSelectedDoctor(null);
    setSelectedCoConsultant(null);
    setSelectedFloor(null);
    setSelectedRoomType(null);
    setFiles([]);
    setSelectedHospitalPanel(null);

    setFormData({
      diagnosis: "",
      remarks: "",
      pharmacyCredit: "",
      patientStatus: "",
      passportNo: "",
      passportIssueDate: "",
      passportAddress: "",
      nationality: "",
      pancardNo: "",
      visaNo: "",
      visaExpiryDate: "",
      currentSOC: "",
      currentDiscountPolicy: "",
      sourceOfAdmission: "",
      typeDiagnostics: "",
      typeAdmission: "",
      visitorPasses: 0,
      issued: "",
      referredBy: "",
      type: "",
      idCardNo: "",
      cardHolder: "",
      cardHolderName: "",
      ccnNo: "",
      hospitalPanel: "",
    });
  };

  return (
    <>
      <div className="ip-addmission-sh-container">
        {/* <h2 className="ip-addmission-sh-header">IP Admission</h2> */}
        <h3>Patient Details</h3>
        <div className="ip-addmission-sh-form">
          {/* <div className="ip-addmission-sh-section">
            <label>Patient Type</label>
            <select>
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
            </select>
          </div> */}
          {/* <div className="ip-addmission-sh-section">
            <label>Registered</label>
            <select>
              <option value="Booked">Booked</option>
              <option value="Unbooked">Unbooked</option>
            </select>
          </div> */}
          <div className="ip-addmission-sh-section">
            <label>MR No</label>
            <input
              type="search"
              value={patient?.uhid || patient?.outPatient?.patient?.uhid}
              id="description"
              placeholder="UHID"
            />
            <i
              onClick={() => setActivePopup("patient")}
              className="fa-solid fa-magnifying-glass"
            ></i>
          </div>
          {/* More fields as per your requirement */}
          {/* Attachments */}
          <div className="ip-addmission-sh-section">
            <label>IP No</label>
            <input
              type="text"
              value={patient?.inPatientId}
              placeholder="Ip No"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Name Initial</label>
            <input
              type="text"
              value={
                patient?.salutation || patient?.outPatient?.patient?.salutation
              }
              placeholder="Name intial"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Patient Name</label>
            <input
              type="text"
              value={`${patient?.firstName || patient?.outPatient?.patient?.firstName
                } ${patient?.middleName || patient?.outPatient?.patient?.middleName
                } ${patient?.lastName || patient?.outPatient?.patient?.lastName}`}
              placeholder="Patient Name"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>DOB</label>
            <input
              type="date"
              value={
                patient?.dateOfBirth ||
                patient?.outPatient?.patient?.dateOfBirth
              }
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Sex</label>
            <select
              disabled
              value={patient?.gender || patient?.outPatient?.patient?.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Marital Status</label>
            <select
              disabled
              value={
                patient?.maritalStatus ||
                patient?.outPatient?.patient?.maritalStatus
              }
            >
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Relation Suffix</label>
            <select
              disabled
              value={
                patient?.relation || patient?.outPatient?.patient?.relation
              }
            >
              <option value="">Select Relation Suffix</option>
              <option value="CO">C/O (Care Of)</option>
              <option value="SO">S/O (Son Of)</option>
              <option value="DO">D/O (Daughter Of)</option>
              <option value="WO">W/O (Wife Of)</option>
            </select>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Relative Name</label>
            <input
              type="text"
              value={
                patient?.relationName ||
                patient?.outPatient?.patient?.relationName
              }
              placeholder="Relative Name"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Address</label>
            <input
              type="text"
              id="description"
              value={patient?.address || patient?.outPatient?.patient?.address}
              placeholder="Address"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Area/Village</label>
            <input
              type="text"
              id="description"
              value={
                patient?.areaVillage ||
                patient?.outPatient?.patient?.areaVillage
              }
              placeholder="Area/Village"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>City/District</label>
            <input
              type="text"
              value={
                patient?.cityDistrict ||
                patient?.outPatient?.patient?.cityDistrict
              }
              placeholder="District Name"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Country</label>
            <input
              type="text"
              value={patient?.country || patient?.outPatient?.patient?.country}
              placeholder="Country"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>State</label>
            <input
              type="text"
              value={patient?.state || patient?.outPatient?.patient?.state}
              placeholder="State Name"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Pincode</label>
            <input
              type="text"
              value={patient?.pinCode || patient?.outPatient?.patient?.pinCode}
              placeholder="Pincode"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Mobile No</label>
            <input
              type="text"
              value={
                patient?.mobileNumber ||
                patient?.outPatient?.patient?.mobileNumber
              }
              placeholder="Phone No"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section"></div>
          {/* <div className="ip-addmission-sh-section">
            <label>Alternte No</label>
            <input
              type="text"
              value={patient?.alternateNumber}
              placeholder="Alternate number"
              disabled
            />
          </div> */}
          {/* <div className="ip-addmission-sh-section">
            <label>Religion</label>
            <select>
              <option value="">Select Religion</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Islam">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Sikhism">Sikhism</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Jainism">Jainism</option>
              <option value="Other">Other</option>
            </select>
          </div> */}
          <div></div>
        </div>
        <h3>Room Details</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            <label>Pay Type</label>
            <input
              type="text"
              value={selectedPaytype?.payTypeName}
              id="description"
              placeholder="Search Paytype"
            />
            <i
              onClick={() => setActivePopup("paytype")}
              className="fas fa-search"
            ></i>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Bed No</label>
            <input
              type="text"
              value={selectedBed?.bedNo}
              id="description"
              placeholder="Search Bed "
            />
            <i
              onClick={() => setActivePopup("bed")}
              className="fas fa-search"
            ></i>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Room No</label>
            <input
              type="text"
              id="description"
              value={selectedRoom?.roomNumber}
              placeholder="Search Room "
            />
            <i
              onClick={() => setActivePopup("room")}
              className="fas fa-search"
            ></i>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Floor No</label>
            <input
              type="text"
              value={selectedFloor?.floorNo}
              placeholder="Enter Entitlement"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Room Type</label>
            <input
              type="text"
              value={selectedRoomType?.roomType}
              placeholder="Enter Entitlement"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Expected Days of Stay</label>
            <input type="number" />
          </div>
        </div>
        <h3>Admission Under Dr Details</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            {/* <h3>Admission Under Dr Details</h3> */}
            <label>Consultant Dr</label>
            <input
              type="text"
              id="description"
              value={
                selectedDoctor?.doctorName ||
                patient?.admittingDoctor?.doctorName
              }
              placeholder="Search Consultant Doctor"
            />
            <i
              onClick={() => setActivePopup("consultantDoctor")}
              className="fas fa-search"
            ></i>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Specially</label>
            <input
              type="text"
              id="description"
              placeholder="Search Speciality"
              value={
                selectedSpeciality?.specialisationName ||
                selectedDoctor?.specialization ||
                patient?.admittingDoctor?.specialisationId?.specialisationName
              }
            />
            <i
              onClick={() => setActivePopup("speciality")}
              className="fas fa-search"
            ></i>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Co Consultant</label>
            <input
              type="text"
              id="description"
              value={
                selectedCoConsultant?.doctorName ||
                patient?.consultant?.doctorName
              }
              placeholder="Search Co Consultant "
            />
            <i
              onClick={() => setActivePopup("coConsultant")}
              className="fas fa-search"
            ></i>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Second Co Consultant</label>
            <input
              type="text"
              id="description"
              value={selectedSecondCoConsultant?.doctorName}
              placeholder="Search Second Co Consultant "
            />
            <i
              onClick={() => setActivePopup("secondCoConsultant")}
              className="fas fa-search"
            ></i>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Referred Doctors</label>
            <input
              type="text"
              id="description"
              value={selectedReferredDoctor?.doctorName}
              placeholder="Search Referred Doctors"
            />
            <i
              onClick={() => setActivePopup("referredDoctors")}
              className="fas fa-search"
            ></i>
          </div>
          <div className="ip-addmission-sh-section">
            <label>Diagnosis</label>
            <input
              type="text"
              id="diagnosis"
              value={formData.diagnosis}
              name="diagnosis"
              onChange={handleChange}
              placeholder="Enter Diagnosis"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Remarks</label>
            <input
              type="text"
              value={formData.remarks}
              name="remarks"
              onChange={handleChange}
              placeholder="Enter Remark"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Pharmacy Credit</label>
            <input
              type="text"
              value={formData.pharmacyCredit}
              name="pharmacyCredit"
              onChange={handleChange}
              placeholder="Enter Pharmacy Credit"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Patient Status</label>
            <textarea
              rows={3}
              value={formData.patientStatus}
              onChange={handleChange}
              name="patientStatus"
              id="patientStatus"
              placeholder="Enter Patient Status"
            />
          </div>
          <div></div>
          <div></div>
        </div>
        <h3>Organisation Details</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            <label>Type</label>
            <select
              id="type"
              onChange={handleChange}
              name="type"
              value={formData.type}
            >
              <option value={"Hospital"}>Hospital</option>
              <option value={"Organisation"}>Organisation</option>
            </select>
          </div>
          {formData.type == "Organisation" ? (
            <>
              <div className="ip-addmission-sh-section">
                <label>Hospital Panel</label>
                <input
                  type="text"
                  id="description"
                  placeholder="Search Hospital Panel"
                  value={selectedHospitalPanel?.name}
                />
                <i
                  onClick={() => setActivePopup("hospitalPanel")}
                  className="fas fa-search"
                ></i>
              </div>
              <div className="ip-addmission-sh-section">
                <label>Reffered By</label>
                <input
                  type="text"
                  id="referredBy"
                  value={formData.referredBy}
                  name="referredBy"
                  onChange={handleChange}
                  placeholder="Enter Reffered By"
                />
              </div>
              <div className="ip-addmission-sh-section">
                <label>Id Card No</label>
                <input
                  type="text"
                  id="idCardNo"
                  value={formData.idCardNo}
                  name="idCardNo"
                  onChange={handleChange}
                  placeholder="Enter Id Card No"
                />
              </div>
              <div className="ip-addmission-sh-section">
                <label>Card Holder</label>
                <select
                  value={formData.cardHolder}
                  name="cardHolder"
                  onChange={handleChange}
                >
                  <option value={""}>Select Card Holder</option>
                  <option value={"Self"}>Self</option>
                  <option value={"W/O"}>W/O</option>
                  <option value={"H/O"}>H/O</option>
                  <option value={"D/O"}>D/O</option>
                  <option value={"S/O"}>S/O</option>
                  <option value={"F/O"}>F/O</option>
                  <option value={"M/O"}>M/O</option>
                  <option value={"B/O"}>B/O</option>
                </select>
              </div>
              <div className="ip-addmission-sh-section">
                <label>Card Holder Name</label>
                <input
                  type="text"
                  value={
                    formData.cardHolder == "Self"
                      ? "Self"
                      : formData.cardHolderName
                  }
                  name="cardHolderName"
                  onChange={handleChange}
                  placeholder="Enter Card Holder Name"
                />
              </div>
              <div className="ip-addmission-sh-section">
                <label>CCN No</label>
                <input
                  value={formData.ccnNo}
                  name="ccnNo"
                  id="ccnNo"
                  onChange={handleChange}
                  placeholder="Enter CCN"
                />
              </div>
            </>
          ) : null}
          <div></div>
          <div></div>
        </div>
        <h3>Current Bed Details</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            {/* <h3>Current Bed Details</h3> */}
            <label>Current Bed No</label>
            <input
              type="search"
              id="description"
              placeholder="Current Bed"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Current Pay Type</label>
            <input
              type="search"
              id="description"
              placeholder="Current Paytype"
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label htmlFor="passportNo">PassPort No:</label>
            <input
              type="text"
              value={formData.passportNo}
              onChange={handleChange}
              name="passportNo"
              id="passportNo"
              placeholder="Enter Passport No"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label htmlFor="passportIssueDate">Passport Issue Date:</label>
            <input
              type="text"
              value={formData.passportIssueDate}
              onChange={handleChange}
              name="passportIssueDate"
              id="passportIssueDate"
              placeholder="Enter Passport Issue Date"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label htmlFor="passportAddress">PassPort Address:</label>
            <input
              type="text"
              value={formData.passportAddress}
              onChange={handleChange}
              name="passportAddress"
              id="passportAddress"
              placeholder="Enter Passport Address"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label htmlFor="nationality">Nationality:</label>
            <input
              id="nationality"
              placeholder="Enter Nationality"
              value={formData.nationality}
              name="nationality"
              onChange={handleChange}
            />
            <i
              onClick={() => setActivePopup("nationality")}
              className="fa-solid fa-magnifying-glass"
            ></i>
            {/* <input
              type="text"
              value={formData.nationality}
              onChange={handleChange}
              name="nationality"
              id="nationality"
              placeholder="Enter Nationality"
            /> */}
          </div>
          <div className="ip-addmission-sh-section">
            <label htmlFor="pancardNo">PanCard No:</label>
            <input
              type="text"
              value={formData.pancardNo}
              onChange={handleChange}
              name="pancardNo"
              id="pancardNo"
              placeholder="Enter Pancard No"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label htmlFor="visaNo">Visa No:</label>
            <input
              type="text"
              value={formData.visaNo}
              onChange={handleChange}
              name="visaNo"
              id="visaNo"
              placeholder="Enter Visa No"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Visa Expiry Date:</label>
            <input
              type="date"
              value={formData.visaExpiryDate}
              onChange={handleChange}
              name="visaExpiryDate"
              id="visaExpiryDate"
            />
          </div>
        </div>
        <h3>Financials</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            {/* <h3>Financials</h3> */}
            <label>Current SOC</label>
            <input
              type="text"
              value={formData.currentSOC}
              onChange={handleChange}
              name="currentSOC"
              id="currentSOC"
              placeholder="Enter Current Soc"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Current Discount Policy</label>
            <input
              type="text"
              value={formData.currentDiscountPolicy}
              onChange={handleChange}
              name="currentDiscountPolicy"
              id="currentDiscountPolicy"
              placeholder="Current Discount Policy"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Source of Admission</label>
            <input
              type="text"
              value={formData.sourceOfAdmission}
              onChange={handleChange}
              name="sourceOfAdmission"
              id="sourceOfAdmission"
              placeholder="Source of Admission"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Type of Diagnosis</label>
            <div>
              <input
                value={formData.typeDiagnostics}
                type="text"
                onChange={handleChange}
                id="typeDiagnostics"
                name="typeDiagnostics"
              />
            </div>
          </div>
          <div className="ip-addmission-sh-section">
            <label htmlFor="admissionType">Type of Admission</label>
            <input
              value={formData.typeAdmission}
              type="text"
              onChange={handleChange}
              id="typeAdmission"
              name="typeAdmission"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>No Of Visitor Passes</label>
            <input
              type="number"
              value={formData.visitorPasses}
              onChange={handleChange}
              id="visitorPasses"
              name="visitorPasses"
              placeholder="Enter No Of Visitor Passes"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <label>Issue Date</label>
            <input
              type="date"
              value={formData.issued}
              onChange={handleChange}
              id="issued"
              name="issued"
            />
          </div>
          <div></div>
          <div></div>
        </div>
        <h3>Add Attachments</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            <input type="file" onChange={handleFileChange} />
          </div>
          <div></div>
          <div></div>
          <div className="ip-addmission-sh-section">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {["Del", "SN", "Name", "FileName"].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div className="resizer" onMouseDown={() => { }}></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="ip-addmission-sh-delete-btn"
                        onClick={() =>
                          setFiles((prevFiles) =>
                            prevFiles.filter((_, i) => i !== index)
                          )
                        }
                      >
                        Del
                      </button>
                    </td>
                    <td>{index + 1}</td>
                    <td>{file.name}</td>
                    <td>{file.file.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <table ref={tableRef} className="ipd-return-indent-table">
        <thead>
          <tr>
            {["Actions", "SN", "Idname", "IdNo"].map((header, index) => (
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
          {packageTableRows.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="table-actions">
                  <button
                    className="ip-addmission-add-btn"
                    onClick={handleAddRow}
                  >
                    Add
                  </button>
                  <button
                    className="ip-addmission-del-btn"
                    onClick={() => handleDeleteRow(index)}
                    disabled={packageTableRows.length <= 1} // This condition ensures delete is disabled if there's only one row
                  >
                    Del
                  </button>
                </div>
              </td>
              <td>{row.sn}</td>
              <td>
                <select
                  value={row.idname}
                  name="idname"
                  onChange={(e) =>
                    setPackageTableRows((prevRows) =>
                      prevRows.map((r, i) =>
                        i === index ? { ...r, idname: e.target.value } : r
                      )
                    )
                  }
                >
                  <option value={""}>select</option>
                  <option value={"aadhar"}>aadhar card</option>
                </select>
              </td>
              <td>
                { }
                <input
                  type="text"
                  value={row.idno}
                  name="idno"
                  onChange={(e) =>
                    setPackageTableRows((prevRows) =>
                      prevRows.map((r, i) =>
                        i === index ? { ...r, idno: e.target.value } : r
                      )
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="ip-addmission-sh-btn">
        <button onClick={handleSubmit} className="ip-addmission-sh-sav">
          Save
        </button>
        <button onClick={handleClear} className="ip-addmission-sh-sav">
          Clear
        </button>
        <button onClick={onClose} className="ip-addmission-sh-sav">
          Close
        </button>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
};

export default IpAdmission;
