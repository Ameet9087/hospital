import React, { useState, useRef, useEffect } from "react";
import "./IpAdmission.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import {
  PopupTable,
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../FloatingInputs/index";
import { usePopup } from "../../FidgetSpinner/PopupContext";
import AdmissionFormPrint from "./AdmissionFormPrint";
import PrintGenericSticker from "./PrintGenericSticker";
import CustomModal from "../../CustomModel/CustomModal";
import { toast } from "react-toastify";

const IpAdmission = ({ patientData, onClose }) => {
  const { showPopup } = usePopup();
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [country, setCountry] = useState([]);
  const [patient, setPatient] = useState();
  const [admissionSlipId, setAdmissionSlipId] = useState(0);
  const [isAdmissionForm, setIsAdmissionForm] = useState(false);
  const [isPrintGenericSticker, setIsGenericSticker] = useState(false);
  const [submittedPatientData, setSubmittedPatientData] = useState(null);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update form state properly
    }));
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
    visitorPasses: "",
    issued: "",
    referredBy: "",
    type: "Hospital",
    idCardNo: "",
    cardHolder: "",
    cardHolderName: "",
    ccnNo: "",
    hospitalPanel: "",
    expectedDayOfStay: "",
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

    setActivePopup(null); 
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
      setIsAdmissionForm(true);
      setIsGenericSticker(true);
      setSubmittedPatientData(response.data);
      showPopup([{ url: "/billing/ipdmoneyrecipt", text: "Ip Money Reciept" }]);

      toast.success("Admission Successfully");
    } catch (error) {
      toast.error("Error submitting form:", error);
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
            <FloatingInput
              label={"UHID"}
              type="search"
              value={patient?.uhid || patient?.outPatient?.patient?.uhid}
              onIconClick={() => setActivePopup("patient")}
            />
          </div>
          {/* More fields as per your requirement */}
          {/* Attachments */}
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"IP No"}
              type="search"
              value={patient?.inPatientId}
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Name Initial"}
              type="text"
              value={
                patient?.salutation || patient?.outPatient?.patient?.salutation
              }
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Patient Name"}
              type="text"
              value={
                `${patient?.firstName || patient?.outPatient?.patient?.firstName
                } ${patient?.middleName ||
                patient?.outPatient?.patient?.middleName
                } ${patient?.lastName || patient?.outPatient?.patient?.lastName
                } ` || ""
              }
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"DOB"}
              type="date"
              value={
                patient?.dateOfBirth ||
                patient?.outPatient?.patient?.dateOfBirth
              }
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingSelect
              label="Gender"
              value={patient?.gender || patient?.outPatient?.patient?.gender}
              options={[
                { value: "", label: "" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingSelect
              label="Marital Status"
              value={
                patient?.maritalStatus ||
                patient?.outPatient?.patient?.maritalStatus
              }
              options={[
                { value: "", label: "" },
                { value: "Single", label: "Single" },
                { value: "Married", label: "Married" },
                { value: "Unmarried", label: "Unmarried" },
              ]}
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingSelect
              label="Relation Suffix"
              value={
                patient?.relation || patient?.outPatient?.patient?.relation
              }
              options={[
                { value: "", label: "" },
                { value: "Father", label: "Father" },
                { value: "Mother", label: "Mother" },
                { value: "Brother", label: "Brother" },
                { value: "Sister", label: "Sister" },
                { value: "Spouse", label: "Spouse" },
                { value: "Son", label: "Son" },
                { value: "Daughter", label: "Daughter" },
                { value: "Grandparent", label: "Grandparent" },
                { value: "Uncle", label: "Uncle" },
                { value: "Aunt", label: "Aunt" },
                { value: "Guardian", label: "Guardian" },
                { value: "Friend", label: "Friend" },
                { value: "Other", label: "Other" },
              ]}
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Relative Name"}
              type="text"
              value={
                patient?.relationName ||
                patient?.outPatient?.patient?.relationName
              }
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Address"}
              type="text"
              value={patient?.address || patient?.outPatient?.patient?.address}
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Area/Village"}
              type="text"
              value={
                patient?.areaVillage ||
                patient?.outPatient?.patient?.areaVillage
              }
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"City/District"}
              type="text"
              value={
                patient?.cityDistrict ||
                patient?.outPatient?.patient?.cityDistrict
              }
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Country"}
              type="text"
              value={patient?.country || patient?.outPatient?.patient?.country}
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"City/District"}
              type="text"
              value={patient?.state || patient?.outPatient?.patient?.state}
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Pincode"}
              type="text"
              value={patient?.pinCode || patient?.outPatient?.patient?.pinCode}
              disabled
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Mobile No"}
              type="text"
              value={
                patient?.mobileNumber ||
                patient?.outPatient?.patient?.mobileNumber
              }
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
            <FloatingInput
              label={"Pay Type"}
              type="search"
              value={selectedPaytype?.payTypeName}
              onIconClick={() => setActivePopup("paytype")}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Bed No"}
              type="search"
              value={selectedBed?.bedNo}
              onIconClick={() => setActivePopup("bed")}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Room No"}
              type="search"
              value={selectedRoom?.roomNumber}
              onIconClick={() => setActivePopup("room")}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Floor No"}
              type="search"
              value={selectedFloor?.floorNo}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Room Type"}
              type="search"
              value={selectedRoomType?.roomType}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Expected Days of Stay"}
              name={"expectedDayOfStay"}
              value={formData.expectedDayOfStay}
              onChange={handleChange}
              restrictions={{ number: true }}
              type="text"
            />
          </div>
        </div>
        <h3>Admission Under Dr Details</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Consultant Dr"}
              type="search"
              value={
                selectedDoctor?.doctorName ||
                patient?.admittingDoctor?.doctorName
              }
              onIconClick={() => setActivePopup("consultantDoctor")}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Speciality"}
              type="search"
              value={
                selectedSpeciality?.specialisationName ||
                selectedDoctor?.specialization ||
                patient?.admittingDoctor?.specialisationId?.specialisationName
              }
              onIconClick={() => setActivePopup("speciality")}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Co Consultant"}
              type="search"
              value={
                selectedCoConsultant?.doctorName ||
                patient?.consultant?.doctorName
              }
              onIconClick={() => setActivePopup("coConsultant")}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Second Co Consultant"}
              type="search"
              value={selectedSecondCoConsultant?.doctorName}
              onIconClick={() => setActivePopup("secondCoConsultant")}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Referred Doctor"}
              type="search"
              value={selectedReferredDoctor?.doctorName}
              onIconClick={() => setActivePopup("referredDoctors")}
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Diagnosis"}
              name={"diagnosis"}
              value={formData.diagnosis}
              onChange={handleChange}
              restrictions={{ varchar: true }}
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Remarks"}
              name={"remarks"}
              value={formData.remarks}
              onChange={handleChange}
              restrictions={{ varchar: true }}
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Pharmacy Credit"}
              name={"pharmacyCredit"}
              value={formData.pharmacyCredit}
              onChange={handleChange}
              restrictions={{ varchar: true }}
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingTextarea
              label={"Patient Status"}
              name={"patientStatus"}
              value={formData.patientStatus}
              onChange={handleChange}
              restrictions={{ varchar: true }}
              type="text"
            />
          </div>
          <div></div>
          <div></div>
        </div>
        <h3>Organisation Details</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            <FloatingSelect
              label="Type"
              value={formData.type}
              name="type"
              onChange={handleChange}
              options={[
                { value: "", label: "" },
                { value: "Hospital", label: "Hospital" },
                { value: "Organisation", label: "Organisation" },
              ]}
            />
          </div>
          {formData.type == "Organisation" ? (
            <>
              <div className="ip-addmission-sh-section">
                <FloatingInput
                  label={"Hospital Panel"}
                  value={selectedHospitalPanel?.name}
                  onIconClick={() => setActivePopup("hospitalPanel")}
                  type="search"
                />
              </div>
              <div className="ip-addmission-sh-section">
                <FloatingInput
                  label={"Reffered By"}
                  name={"referredBy"}
                  value={formData.referredBy}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="ip-addmission-sh-section">
                <FloatingInput
                  label={"Id Card No"}
                  name={"idCardNo"}
                  value={formData.idCardNo}
                  onChange={handleChange}
                  restrictions={{ number: true }}
                  type="text"
                />
              </div>
              <div className="ip-addmission-sh-section">
                <FloatingSelect
                  label="Card Holder"
                  value={formData.cardHolder}
                  name="cardHolder"
                  onChange={handleChange}
                  options={[
                    { value: "", label: "" },
                    { value: "Self", label: "Self" },
                    { value: "W/O", label: "W/O" },
                    { value: "H/O", label: "H/O" },
                    { value: "D/O", label: "D/O" },
                    { value: "S/O", label: "S/O" },
                    { value: "F/O", label: "F/O" },
                    { value: "M/O", label: "M/O" },
                    { value: "B/O", label: "B/O" },
                  ]}
                />
              </div>
              <div className="ip-addmission-sh-section">
                <FloatingInput
                  label={"Card Holder Name"}
                  name={"referredBy"}
                  value={
                    formData.cardHolder == "Self"
                      ? "Self"
                      : formData.cardHolderName
                  }
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className="ip-addmission-sh-section">
                <FloatingInput
                  label={"CCN No"}
                  name={"ccnNo"}
                  value={formData.ccnNo}
                  onChange={handleChange}
                  type="text"
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
            <FloatingInput label={"Current Bed No"} type="text" disabled />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput label={"Current Pay Type"} type="text" disabled />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Passport No"}
              value={formData.passportNo}
              onChange={handleChange}
              restrictions={{ number: true }}
              name="passportNo"
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Passport Issue Date"}
              value={formData.passportIssueDate}
              onChange={handleChange}
              name="passportIssueDate"
              type="date"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Passport Address"}
              value={formData.passportAddress}
              onChange={handleChange}
              name="passportAddress"
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Nationality"}
              value={formData.nationality}
              name="nationality"
              onIconClick={() => setActivePopup("nationality")}
              type="search"
            />
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
            <FloatingInput
              label={"Pancard No"}
              value={formData.pancardNo}
              onChange={handleChange}
              restrictions={{ varchar: true, max: 10 }}
              name="pancardNo"
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Visa No"}
              value={formData.visaNo}
              onChange={handleChange}
              name="visaNo"
              restrictions={{ varchar: true, max: 8 }}
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Visa Expiry Date"}
              value={formData.visaExpiryDate}
              onChange={handleChange}
              name="visaExpiryDate"
              type="date"
            />
          </div>
        </div>
        <h3>Financials</h3>
        <div className="ip-addmission-sh-form">
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Current SOC"}
              value={formData.currentSOC}
              onChange={handleChange}
              name="currentSOC"
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Current Discount Policy"}
              value={formData.currentDiscountPolicy}
              onChange={handleChange}
              name="currentDiscountPolicy"
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Source of Admission"}
              value={formData.sourceOfAdmission}
              onChange={handleChange}
              name="sourceOfAdmission"
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Type of Diagnosis"}
              value={formData.typeDiagnostics}
              onChange={handleChange}
              name="typeDiagnostics"
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Type of Admission"}
              value={formData.typeAdmission}
              onChange={handleChange}
              name="typeAdmission"
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"No Of Visitor Passes"}
              value={formData.visitorPasses}
              onChange={handleChange}
              name="visitorPasses"
              restrictions={{ number: true }}
              type="text"
            />
          </div>
          <div className="ip-addmission-sh-section">
            <FloatingInput
              label={"Issue Date"}
              value={formData.issued}
              onChange={handleChange}
              name="issued"
              type="date"
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
                <FloatingSelect
                  label="Id Name"
                  value={row.idname}
                  name="idname"
                  onChange={(e) =>
                    setPackageTableRows((prevRows) =>
                      prevRows.map((r, i) =>
                        i === index ? { ...r, idname: e.target.value } : r
                      )
                    )
                  }
                  options={[
                    { value: "", label: "" },
                    { value: "aadhar", label: "Aadhar Card" },
                    { value: "pan", label: "Pancard" },
                    { value: "Driving Licence", label: "Driving Licence" },
                  ]}
                />
              </td>
              <td>
                <FloatingInput
                  label={"Card Number"}
                  value={row.idno}
                  name="idno"
                  onChange={(e) =>
                    setPackageTableRows((prevRows) =>
                      prevRows.map((r, i) =>
                        i === index ? { ...r, idno: e.target.value } : r
                      )
                    )
                  }
                  restrictions={{ varchar: true }}
                  type="text"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="ip-addmission-sh-btn">
        <button onClick={handleSubmit} className="ip-addmission-sh-sav">
          Admit
        </button>
        {/* <button onClick={handleClear} className="ip-addmission-sh-sav">
          Clear
        </button>
        <button onClick={onClose} className="ip-addmission-sh-sav">
          Close
        </button> */}
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
      {isAdmissionForm && (
        <>
          <CustomModal
            isOpen={isAdmissionForm}
            onClose={() => setIsAdmissionForm(false)}
          >
            <AdmissionFormPrint
              setIsFormSubmitted={setIsAdmissionForm}
              patient={submittedPatientData}
            />
          </CustomModal>
        </>
      )}
      {isPrintGenericSticker && (
        <CustomModal
          isOpen={isPrintGenericSticker}
          onClose={() => setIsGenericSticker(false)}
        >
          <PrintGenericSticker patient={submittedPatientData} />
        </CustomModal>
      )}
    </>
  );
};

export default IpAdmission;
