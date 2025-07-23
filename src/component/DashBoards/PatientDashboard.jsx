import React, { useEffect, useRef, useState } from "react";
import "./InPatientAction.css";
import VitalsPage from "./ClinicalVitals";
import ActionRecordPage from "./ActionRecordPage";
import Problems from "./Problems";
import { API_BASE_URL } from "../api/api";
import AddVitalsForm from "./AddVitals";
import PatientDischargeForm from "./DischargeSummary";
import Allergy from "./ClinicalAllergy";
import CinicalDocument from "./ClinicalDocuments";
import axios from "axios";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import RadiologyReportDoc from "./RadiologyReportDoc";
import VisitTable from "./EncounterHistory";
import LabReportResult from "./LabReportResult";
import Infusion from "./Infusion";
import ProcedureService from "./ProcedureService";
import TreatmentGiven from "./TreatmentGiven";
import DietOrder from "./DietOrder";
import ReferralConsultation from "./ReferralConsultation";
import NurseOrder from "./NurseOrder";
import PACRequest from "./PACRequest";
import AdmissionSlip from "./AdmissionSlip";
import OutPatient from "./OutPatient";
import CustomModal from "../../CustomModel/CustomModal";
import MedicationOrder from "./MedicationOrder ";
import SaveTemplate from "./SaveTemplate/SaveTemplate";
import PatientDetailsPrint from "./PatientDetailsPrint";
import Vitals from "./AddVitals";
import SaveHistoryTemplate from "./SaveTemplate/SaveHistoryTemplate";
import SaveClinicalTemplate from "./SaveTemplate/SaveClinicalTemplate";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jspdf-autotable

const Section = ({ title, handleAddClick, children, isAddBTN }) => (
  <div className="Patient-Dashboard-firstBox">
    <div className="Patient-Dashboard-subNav">
      <div className="Patient-Dashboard-labAndImg">
        <span className="Patient-Dashboard-spanText">{title}</span>
      </div>
      {isAddBTN && (
        <button className="Patient-Dashboard-btnAdd" onClick={handleAddClick}>
          + Add
        </button>
      )}
    </div>
    {children || (
      <div className="Patient-Dashboard-inputOne">No Records Found</div>
    )}
  </div>
);
const PatientDashboard = ({
  isPatientOPEN,
  patient,
  setIsPatientOPEN,
  ipAdmission,
}) => {
  console.log(patient);
  const [selectedRadiology, setSelectedRadiology] = useState(null);
  const [selectedLabrotary, setSelectedLabrotary] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [latestVitals, setLatestVitals] = useState(null);
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [allergies, setAllergies] = useState(null);
  const [activeProblem, setActiveProblem] = useState([]);
  const [radiology, setRadiology] = useState([]);
  const [LabRequest, setLabRequest] = useState([]);
  const [showRadioReport, setShowRadioReport] = useState(false);
  const [ShowLabReport, setShowLabReport] = useState(false);
  const [showInfusion, setInfusion] = useState([]);
  const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showHistorypopup, setShowHistoryPopup] = useState(false);
  const [showClinicalPopup, setShowClinicalPopup] = useState(false);
  const [showPrintPage, setShowPrintPage] = useState(false);
  const [contextMenuData, setContextMenuData] = useState([]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);
  const [historyMenuData, setHistoryMenuData] = useState([]);
  const [showHistoryContextMenu, setShowHistoryContextMenu] = useState(false);
  const [historyContextMenuPosition, setHistoryContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [historyTextareaValue, setHistoryTextareaValue] = useState("");
  const historyTextareaRef = useRef(null);
  const [clinicalImpressionTextareaValue, setClinicalImpressionTextareaValue] =
    useState("");
  const [
    showClinicalImpressionContextMenu,
    setShowClinicalImpressionContextMenu,
  ] = useState(false);
  const [
    clinicalImpressionContextMenuData,
    setClinicalImpressionContextMenuData,
  ] = useState([]);
  const [
    clinicalImpressionContextMenuPosition,
    setClinicalImpressionContextMenuPosition,
  ] = useState({ x: 0, y: 0 });
  const [patientQueueData, setPatientQueueData] = useState([]);
  const clinicalTextareaRef = useRef(null);

  const handlePrint = () => {
    const doc = new jsPDF("l", "mm", "a4");
    doc.setFontSize(16);
    doc.text("Patient Report", doc.internal.pageSize.width / 2, 15, {
      align: "center",
    });

    const currentDate = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 14, 10);

    const addTableToPDF = (headers, data, title) => {
      doc.text(title, 14, doc.autoTable.previous.finalY + 10 || 20); // Add title
      doc.autoTable({
        head: [headers],
        body: data,
        startY: doc.autoTable.previous.finalY + 15 || 30,
      });
    };
    if (LabRequest.length > 0) {
      const labHeaders = ["Test", "Date", "Result"];
      const labData = LabRequest.map((item) => [
        item.labTests.map((test) => test.labTestName).join(", "),
        item.requisitionDate,
        item.status === "Completed" ? "View" : item.status,
      ]);
      addTableToPDF(labHeaders, labData, "Labs");
    }
    if (radiology.length > 0) {
      const imagingHeaders = ["Type", "Item", "Date", "Status"];
      const imagingData = radiology.map((item) => [
        item.imagingItemDTO?.imagingType?.imagingTypeName,
        item.imagingItemDTO?.imagingItemName,
        item.requestedDate,
        item.status === "Completed" ? "View" : item.status,
      ]);
      addTableToPDF(imagingHeaders, imagingData, "Imaging");
    }
    if (allergies?.length > 0) {
      const allergyHeaders = [
        "Allergy",
        "Severity",
        "Comment",
        "Recorded Date",
      ];
      const allergyData = allergies.map((item) => [
        item.typeOfAllergy,
        item.severity,
        item.comments,
        item.recordedDate,
      ]);
      addTableToPDF(allergyHeaders, allergyData, "Allergies");
    }
    if (activeProblem.length > 0) {
      const problemHeaders = ["Problem", "Onset Date"];
      const problemData = activeProblem.map((item) => [
        item.searchProblem,
        item.onsetDate,
      ]);
      addTableToPDF(problemHeaders, problemData, "Active Problems");
    }
    if (medications.length > 0) {
      const medicationHeaders = ["Medication Name", "Frequency", "Last Taken"];
      const medicationData = medications.map((item) => [
        item.medicationName,
        item.frequency,
        item.lastTaken,
      ]);
      addTableToPDF(medicationHeaders, medicationData, "Medications");
    }
    if (showInfusion.length > 0) {
      const infusionHeaders = [
        "Infusion Name",
        "Infusion Generic",
        "Infusion Frequency",
        "Drug",
        "Flow Rate",
        "Infu Remarks",
        "Start Date",
        "Start Time",
        "End Date",
        "End Time",
      ];
      const infusionData = showInfusion.map((item) => [
        item.infusionNm,
        item.infusionGeneric,
        item.infusionRoute,
        item.drug,
        item.flowRate,
        item.infuRemarks,
        item.startDate,
        item.startTime,
        item.endDate,
        item.endTime,
      ]);
      addTableToPDF(infusionHeaders, infusionData, "Infusion");
    }
    if (services.length > 0) {
      const serviceHeaders = ["Service Name"];
      const serviceData = services.map((item) => [item.serviceName]);
      addTableToPDF(serviceHeaders, serviceData, "Procedures / Services");
    }
    if (treatment.length > 0) {
      const treatmentHeaders = ["Treatment Descriptions"];
      const treatmentData = treatment.map((item) => [
        item.treatmentDescriptions,
      ]);
      addTableToPDF(treatmentHeaders, treatmentData, "Treatment Given");
    }

    const pdfOutput = doc.output("datauristring");
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfOutput}'></iframe>`
    );
  };
  const handleDeleteLabRequest = async (labRequestId) => {
    console.log(labRequestId, "qqqqqqqqqqq");
    try {
      await axios.delete(`${API_BASE_URL}/lab-requests/${labRequestId}`);
      setLabRequest(
        LabRequest.filter((item) => item.labRequestId !== labRequestId)
      );
    } catch (error) {
      console.error("Error deleting lab request:", error);
    }
  };

  const handleDeleteRadiology = async (imagingId) => {
    console.log(imagingId, "hiiii");
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/imaging-requisitions/${imagingId}`
      );
      console.log("Delete Response:", response);

      setRadiology((prevRadiology) =>
        prevRadiology.filter(
          (item) => item.imagingId !== imagingId
        )
      );
    } catch (error) {
      console.error("Error deleting radiology:", error);
    }
  };

  const handleDeleteAllergy = async (allergiesId) => {
    
    try {
      await axios.delete(`${API_BASE_URL}/allergies/remove/${allergiesId}`);
      setAllergies(allergies.filter((item) => item.allergiesId !== allergiesId));
    } catch (error) {
      console.error("Error deleting allergy:", error);
    }
  };

  const handleDeleteActiveProblem = async (activeId) => {
    try {
      await axios.delete(`${API_BASE_URL}/active-problems/${activeId}`);
      setActiveProblem(
        activeProblem.filter((item) => item.activeId !== activeId)
      );
    } catch (error) {
      console.error("Error deleting active problem:", error);
    }
  };

  const handleDeleteMedication = async (medicationId) => {
    try {
      await axios.delete(`${API_BASE_URL}/medications/${medicationId}`);
      setMedications(
        medications.filter((item) => item.medicationId !== medicationId)
      );
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const handleDeleteInfusion = async (infusionId) => {
    try {
      await axios.delete(`${API_BASE_URL}/infusions/${infusionId}`);
      setInfusion(
        showInfusion.filter((item) => item.infusionId !== infusionId)
      );
    } catch (error) {
      console.error("Error deleting infusion:", error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`${API_BASE_URL}/services/${serviceId}`);
      setServices(services.filter((item) => item.serviceId !== serviceId));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleDeleteTreatment = async (treatmentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/treatments/${treatmentId}`);
      setTreatment(
        treatment.filter((item) => item.treatmentId !== treatmentId)
      );
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };
  const openPopup = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const openHistoryPopup = () => {
    setShowHistoryPopup(true);
  };
  const closeHistoryPopup = () => {
    setShowHistoryPopup(false);
  };
  const openClinicalPopup = () => {
    setShowClinicalPopup(true);
  };
  const closeClinicalPopup = () => {
    setShowClinicalPopup(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = (contentType) => {
    setModalContent(contentType);
    setIsModalOpen(true);
  };
  const handleClearData = () => {
    setTextareaValue("");
  };
  useEffect(() => {
    const fetchInfusions = async () => {
      let endpoint = "";
      if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/infusions/in-patient/${patient?.inPatientId}`;
      } else if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/infusions/out-patient/${patient.outPatientId}`;
      } else {
        console.error("No valid patient ID provided.");
        return;
      }
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Infusion data:", data);
        setInfusion(data);
      } catch (error) {
        console.error("Error fetching infusion:", error);
      }
    };
    fetchInfusions();
  }, [patient?.inPatientId, patient?.outPatientId, activeSection]);

  const fetchQueueData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const response = await axios.get(
        `${API_BASE_URL}/patient-queues/getAllQueue`
      );
      const filteredData = response.data.filter(
        (patient) =>
          patient.status.toLowerCase() === "pending" && patient.date === today // Assuming queueDate is in yyyy-mm-dd format
      );
      setPatientQueueData(filteredData);
    } catch (error) {
      console.error("Error fetching patient queue data:", error);
    }
  };
  useEffect(() => {
    fetchQueueData();
  }, []);
  useEffect(() => {
    const fetchMedications = async () => {
      let endpoint = "";
      if (patient?.outPatientId) {
        endpoint = `${API_BASE_URL}/medications/by-opd-id?opdPatientId=${patient?.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/medications/by-ipd-id?ipdPatientId=${patient?.inPatientId}`;
      }
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMedications(data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };
    fetchMedications();
  }, [activeSection, isModalOpen]);

  useEffect(() => {
    const fetchServices = async () => {
      let endpoint = "";
      if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/services/in-patient/${patient?.inPatientId}`;
      } else if (patient?.outPatientId) {
        endpoint = `${API_BASE_URL}/services/out-patient/${patient?.outPatientId}`;
      } else {
        console.error("No valid patient ID provided.");
        return;
      }
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Infusion data:", data);
        setServices(data);
      } catch (error) {}
    };
    fetchServices();
  }, [activeSection, isModalOpen]);

  useEffect(() => {
    const fetchTreatmentGive = async () => {
      let endpoint = "";
      if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/treatments/in-patient/${patient?.inPatientId}`;
      } else if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/treatments/out-patient/${patient.outPatientId}`;
      }
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        setTreatment(data);
      } catch (error) {
        console.error("Error fetching Treatments:", error);
      }
    };
    fetchTreatmentGive();
  }, [activeSection, isModalOpen]);
  useEffect(() => {
    const fetchVitals = () => {
      let endpoint = "";
      if (patient?.outPatientId) {
        endpoint = `${API_BASE_URL}/doc-vitals/get-by-opd-patient-id/${patient?.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/doc-vitals/get-by-in-patient-id/${patient?.inPatientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setLatestVitals(response.data[response.data.length - 1]);
            }
          })
          .catch((error) => {
            console.error("Error fetching vitals:", error);
          });
      }
    };
    fetchVitals();
  }, [patient?.inPatientId, patient?.outPatientId, activeSection]);
  
  useEffect(() => {
    const fetchAllergies = () => {
      let endpoint = "";
      if (patient?.outPatientId) {
        endpoint = `${API_BASE_URL}/allergies/by-newVisitPatientId/${patient?.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/allergies/by-patientId/${patient?.inPatientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            // console.log("Allergy:", response.data);
            if (response.data.length > 0) {
              console.log(response.data);

              setAllergies(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching allergies:", error);
          });
      }
    };
    fetchAllergies();
  }, [patient?.outPatientId, patient?.inPatientId, activeSection, isModalOpen]);
  useEffect(() => {
    const fetchActiveProblems = () => {
      let endpoint = "";
      if (patient?.outPatientId) {
        endpoint = `${API_BASE_URL}/active-problems/by-newVisitPatientId/${patient?.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/active-problems/by-patientId/${patient?.inPatientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setActiveProblem(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching active problems:", error);
          });
      }
    };
    fetchActiveProblems();
  }, [patient?.outPatientId, patient?.inPatientId, activeSection, isModalOpen]);

  useEffect(() => {
    const fetchImagingRequisitions = () => {
      let endpoint = "";
      if (patient?.outPatientId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-opd-patient-id?opdPatientId=${patient?.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-ipd-patient-id?ipdPatientId=${patient?.inPatientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              console.log("API Response:", response.data);
              setRadiology(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching imaging requisitions:", error);
          });
      }
    };
    fetchImagingRequisitions();
  }, [patient?.outPatientId, patient?.inPatientId, activeSection, isModalOpen]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/presenting-complaints`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const menuItems = data
          .filter((item) => item.template?.templateName)
          .map((item) => ({
            templateName: item.template.templateName,
            complaintsText: item.complaintsText,
          }));
        setContextMenuData(menuItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleContextMenu = (event) => {
    event.preventDefault();
    const rect = textareaRef.current.getBoundingClientRect();
    setContextMenuPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setShowContextMenu(true);
  };
  const handleClickOutside = () => {
    setShowContextMenu(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleContextMenuItemClick = (complaintsText) => {
    setTextareaValue(complaintsText);
    setShowContextMenu(false);
  };
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  useEffect(() => {
    fetch(`${API_BASE_URL}/history-examinations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        const menuItems = data
          .filter((item) => item.template?.templateName)
          .map((item) => ({
            templateName: item.template.templateName,
            historyexamination: item.historyexamination,
          }));
        setHistoryMenuData(menuItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleHistoryContextMenu = (event) => {
    event.preventDefault();
    const rect = historyTextareaRef.current.getBoundingClientRect();
    setHistoryContextMenuPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setShowHistoryContextMenu(true);
  };
  const handleHistoryClickOutside = () => {
    setShowHistoryContextMenu(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleHistoryClickOutside);
    return () => {
      document.removeEventListener("click", handleHistoryClickOutside);
    };
  }, []);
  const handleHistoryContextMenuItemClick = (historyexamination) => {
    console.log("Selected historyexamination:", historyexamination);
    setHistoryTextareaValue(historyexamination); // Set the value in the textarea
    setShowHistoryContextMenu(false); // Hide context menu
  };
  const handleHistoryTextareaChange = (event) => {
    setHistoryTextareaValue(event.target.value); // Update state with new textarea value
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/clinical-impressions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const menuItems = data
          .filter((item) => item.template?.templateName)
          .map((item) => ({
            templateName: item.template.templateName,
            clinicalImpressionText: item.clinicalImpressionText,
          }));
        setClinicalImpressionContextMenuData(menuItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleClinicalImpressionContextMenu = (event) => {
    event.preventDefault();
    const rect = clinicalTextareaRef.current.getBoundingClientRect();
    setClinicalImpressionContextMenuPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setShowClinicalImpressionContextMenu(true);
  };
  const handleClinicalImpressionClickOutside = () => {
    setShowClinicalImpressionContextMenu(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClinicalImpressionClickOutside);
    return () => {
      document.removeEventListener(
        "click",
        handleClinicalImpressionClickOutside
      );
    };
  }, []);
  const handleClinicalImpressionMenuItemClick = (clinicalImpressionText) => {
    setClinicalImpressionTextareaValue(clinicalImpressionText);
    setShowClinicalImpressionContextMenu(false);
  };
  const handleClinicalImpressionTextareaChange = (event) => {
    setClinicalImpressionTextareaValue(event.target.value);
  };
  useEffect(() => {
    const fetchLabRequests = () => {
      let endpoint = "";
      if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/lab-requests/by-opd-patient-id?opdPatientId=${patient.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/lab-requests/by-ipd-patient-id?ipdPatientId=${patient?.inPatientId}`;
      }
      
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
           
            if (response.data.length > 0) {
              console.log(response.data);
              setLabRequest(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching lab requests:", error);
          });
      }
    };
    fetchLabRequests();
  }, [patient?.outPatientId, patient?.inPatientId, activeSection, isModalOpen]); 

  const handleSkipQueuePatient = async (nextQueue, upcomming) => {
    try {
      const skipUrl = `${API_BASE_URL}/patient-queues/patient/quit?patientQueueId=${nextQueue}`;
      const attendUrl = `${API_BASE_URL}/patient-queues/patient/attend?patientQueueId=${upcomming}`;
      const [skipResponse, attendResponse] = await Promise.all([
        fetch(skipUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        fetch(attendUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);
      if (!skipResponse.ok || !attendResponse.ok) {
        const skipError = await skipResponse.text();
        const attendError = await attendResponse.text();
        console.error("Skip Error:", skipError);
        console.error("Attend Error:", attendError);
        throw new Error("Failed to update patient status.");
      }
      fetchQueueData();
      alert("Patient status updated successfully.");
    } catch (error) {
      console.error("Error in handleSkipQueuePatient:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handleCallNextPatient = async (currentPatientId, nextPatientId) => {
    try {
      const completedUrl = `${API_BASE_URL}/patient-queues/patient/completed?patientQueueId=${currentPatientId}`;
      const attendUrl = `${API_BASE_URL}/patient-queues/patient/attend?patientQueueId=${nextPatientId}`;
      const [completedResponse, attendResponse] = await Promise.all([
        fetch(completedUrl, { method: "PUT" }),
        fetch(attendUrl, { method: "PUT" }),
      ]);
      if (!completedResponse.ok || !attendResponse.ok) {
        const completedError = await completedResponse.text();
        const attendError = await attendResponse.text();
        console.error("Completed Error:", completedError);
        console.error("Attend Error:", attendError);
        throw new Error("Failed to update patient statuses.");
      }
      fetchQueueData();
      alert("Patient statuses updated successfully.");
    } catch (error) {
      console.error("Error in handleCallNextPatient:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const sortedPatientQueueData = [...patientQueueData].sort(
    (a, b) => parseInt(a.queueNumber) - parseInt(b.queueNumber)
  );

  // useEffect(() => {
  //   if (
  //     patient &&
  //     (patient.patientId !== 0 || patient.newPatientVisitId !== 0)
  //   ) {
  //     const filtered = medications
  //       .filter(
  //         (medication) =>
  //           (patient.patientId &&
  //             medication.patientDTO.patientId === patient.patientId) ||
  //           (patient.newPatientVisitId &&
  //             medication.newPatientVisitDTO?.newPatientVisitId ===
  //               patient.newPatientVisitId)
  //       )
  //       .sort((a, b) => new Date(b.lastTaken) - new Date(a.lastTaken)); // Sort by recent date

  //     setFilteredMedications(filtered);
  //   }
  // }, [medications, patient.patientId, patient.newPatientVisitId]);
  const ShowImagingReport = (item) => {
    setSelectedRadiology(item);
    setShowRadioReport(true);
  };
  const ShowlabReportResult = (item) => {
    setSelectedLabrotary(item);
    setShowLabReport(true);
  };
  const renderContent = () => {
    switch (activeSection) {
      case "clinical":
        return (
          <VitalsPage
            patientId={patient.patient?.inPatientId || patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "actionRecord":
        return (
          <ActionRecordPage
            patient={patient}
            patientId={patient.patient?.inPatientId || patient?.inPatientId}
            setActiveSection={setActiveSection}
            outPatientId={patient?.outPatientId}
            employeeId={
              patient?.employeeDTO?.employeeId ||
              patient?.admittedDoctorDTO?.employeeId
            }
          />
        );
      case "problems":
        return (
          <Problems
            patientId={patient.patient?.inPatientId || patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "vitals":
        return (
          <AddVitalsForm
            patientId={
              patient.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            outPatientId={patient?.outPatientId}
          />
        );
      case "dischargeSummary":
        return <PatientDischargeForm patient={patient} />;
      case "Allergies":
        return (
          <Allergy
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            outPatientId={patient?.outPatientId}
          />
        );
      case "Clinical-Document":
        return (
          <CinicalDocument
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            outPatientId={patient?.outPatientId}
          />
        );
      case "encounte-rHistory":
        return (
          <Problems
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            outPatientId={patient?.outPatientId}
          />
        );
      case "Infusion":
        return (
          <Infusion
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "procedures":
        return (
          <ProcedureService
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "treatment":
        return (
          <TreatmentGiven
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "diet":
        return (
          <DietOrder
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "referral":
        return (
          <ReferralConsultation
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "nursing":
        return (
          <NurseOrder
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "pacrequest":
        return (
          <PACRequest
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
      case "admissionslip":
        return (
          <AdmissionSlip
            patient={patient}
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        );
    }
  };
  const patientPrint = () => {
    setShowPrintPage(true);
  };
  if (showPrintPage) {
    return <PatientDetailsPrint />;
  }
  const renderDashboard = () => (
    <div className="Patient-Dashboard-main-section">
      {activeSection === "dashboard" ? (
        <>
          <aside className="Patient-Dashboard-aside-section  Patient-Dashboard-left-aside">
            <div className="Patient-Dashboard-outOutDiv">
              <div className="Patient-Dashboard-outDiv">
                <div className="Patient-dashboard-frame1"></div>
                <div className="Patient-dashboard-frame2"></div>
                <div className="Patient-dashboard-frame4"></div>
                <div className="Patient-dashboard-frame3"></div>
                <div className="Patient-Dashboard-divOne">
                  <button className="Patient-Dashboard-btnIpd">
                    {ipAdmission?.ipAdmmissionId ? "IPD" : "OPD"}
                  </button>
                </div>
                <div className="Patient-Dashboard-logoOne">
                  <div className="patient-img">
                    {!patient?.patient?.hasOwnProperty("fileAttachment") ? (
                      <span>{patient?.patient?.firstName?.[0]}</span>
                    ) : (
                      <img
                        src={`data:image/png;base64,${patient?.patient?.fileAttachment}`}
                        alt="patient attachment"
                      />
                    )}
                  </div>
                </div>
                <div className="patient-Dashboard-details">
                  <span className="Patient-Dashboard-textName">
                    Name :{" "}
                    {`${
                      patient?.firstName ||
                      patient?.patient?.firstName ||
                      patient?.FirstName
                    } ${
                      patient?.lastName ||
                      patient?.patient?.lastName ||
                      patient?.patientLastName
                    }`}
                  </span>
                </div>
              </div>
              <hr></hr>
              <div className="Patient-Dashboard-divTwoDetails">
                {patient.outPatientId != null ? (
                  <>
                    <div className="Patient-Dashboard-ward">
                      <span className="Patient-Dashboard-detailHeading">
                        UHID : {patient?.patient?.uhid}
                      </span>
                    </div>
                    <div className="Patient-Dashboard-ward">
                      <span className="Patient-Dashboard-detailHeading">
                        Age/Sex :{" "}
                        {`${
                          patient?.age ||
                          patient?.patient?.age ||
                          patient?.patientAge
                        } ${patient?.ageUnit || patient?.patient?.ageUnit}/${
                          patient?.gender ||
                          patient?.patient?.gender ||
                          patient?.patientGender
                        }`}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="Patient-Dashboard-ward">
                      <span className="Patient-Dashboard-detailHeading">
                        UHID : {patient.patient?.uhid}
                      </span>
                    </div>
                    <div className="Patient-Dashboard-ward">
                      <span className="Patient-Dashboard-detailHeading">
                        Ward/Bed:{" "}
                        {patient?.wardName ||
                          ipAdmission.roomDetails?.roomTypeDTO?.wardName}{" "}
                        /
                        {patient?.bedNumber ||
                          ipAdmission.roomDetails?.bedDTO?.bedNo}
                      </span>
                    </div>
                    <div className="Patient-Dashboard-attending">
                      <span className="Patient-Dashboard-detailHeading">
                        Consultant:
                      </span>
                      <span>{`${
                        patient?.employeeDTO?.salutation ||
                        ipAdmission?.admissionUnderDoctorDetail
                          ?.consultantDoctor?.salutation ||
                        patient?.doctorSalutationName
                      } ${
                        patient?.employeeDTO?.firstName ||
                        ipAdmission?.admissionUnderDoctorDetail
                          ?.consultantDoctor?.doctorName ||
                        patient?.doctorFirstName
                      }`}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {patient?.outPatientId && (
              <div className="Patient-Dashboard-QueuePatient">
                <div className="Patient-Dashboard-QueueBtns">
                  <button
                    onClick={() => {
                      if (sortedPatientQueueData.length >= 3) {
                        handleSkipQueuePatient(
                          sortedPatientQueueData[0]?.patientQueueId,
                          sortedPatientQueueData[2]?.patientQueueId
                        );
                      } else {
                        console.log("Not enough patients in the queue.");
                      }
                    }}
                  >
                    Not Available
                  </button>
                  <button
                    onClick={() => {
                      if (patientQueueData.length > 1) {
                        const currentPatientId = patient?.outPatientId;
                        const nextPatientId =
                          patientQueueData[1]?.patientQueueId;
                        handleCallNextPatient(currentPatientId, nextPatientId);
                      } else {
                        alert("No next patient in the queue.");
                      }
                    }}
                  >
                    Call Next Patient
                  </button>
                </div>
                <div className="Patient-Dashboard-QueuePatient-Table">
                  <table>
                    <thead>
                      <tr>
                        <th>Queue No</th>
                        <th>Name</th>
                        <th>Uhid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientQueueData.length > 0 ? (
                        patientQueueData
                          .sort((a, b) => a.queueNumber - b.queueNumber)
                          .slice(0, 2)
                          .map((item) => (
                            <tr key={item.queueNumber}>
                              <td>{item.queueNumber}</td>
                              <td>{item.name}</td>
                              <td>{item.uhid}</td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan={3}>No data Found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </aside>
          <main className="Patient-Dashboard-betweenSection">
            <div>
              <div className="Patient-Dashboard-subNav">
                <span className="Patient-Dashboard-spanText">
                  Presenting Complaints
                </span>
                <div className="Patient-Dashboard-btn">
                  <div className="Patient-Dashboard-table-header-sub">
                    <a href="#" onClick={openPopup}>
                      Save Template
                    </a>
                    <a href="#" onClick={handleClearData}>
                      Clear Data
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <textarea
                  ref={textareaRef}
                  className="Patient-Dashboard-textarea"
                  placeholder="Right-click here to see the previous templates"
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid lightgrey",
                  }}
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  onContextMenu={handleContextMenu}
                />
                {showContextMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: contextMenuPosition.y + 10,
                      left: contextMenuPosition.x + 10,
                      background: "white",
                      border: "1px solid grey",
                      borderRadius: "4px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                    }}
                  >
                    {contextMenuData.length > 0 ? (
                      <ul
                        style={{
                          margin: 0,
                          padding: "5px",
                          listStyle: "none",
                          fontSize: "14px",
                        }}
                      >
                        {contextMenuData.map((item, index) => (
                          <li
                            key={index}
                            style={{
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleContextMenuItemClick(item.complaintsText)
                            }
                          >
                            {item.templateName}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div style={{ padding: "10px", fontSize: "14px" }}>
                        No template names available
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* <textarea className="Patient-Dashboard-textarea" name="" id=""></textarea> */}
              {/* History Prachi */}
            </div>
            <div>
              <div className="Patient-Dashboard-subNav">
                <span className="Patient-Dashboard-spanText">
                  History And Examination
                </span>
                <div className="Patient-Dashboard-btn">
                  <div className="Patient-Dashboard-table-header-sub">
                    <a href="#" onClick={openHistoryPopup}>
                      Save Template
                    </a>
                    <a href="#" onClick={() => setHistoryTextareaValue("")}>
                      Clear Data
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <textarea
                  ref={historyTextareaRef}
                  className="Patient-Dashboard-textarea"
                  placeholder="Right-click here to see the previous templates"
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid lightgrey",
                  }}
                  value={historyTextareaValue}
                  onChange={handleHistoryTextareaChange}
                  onContextMenu={handleHistoryContextMenu}
                />
                {showHistoryContextMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: historyContextMenuPosition.y + 10,
                      left: historyContextMenuPosition.x + 10,
                      background: "white",
                      border: "1px solid grey",
                      borderRadius: "4px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                    }}
                  >
                    {historyMenuData.length > 0 ? (
                      <ul
                        style={{
                          margin: 0,
                          padding: "10px",
                          listStyle: "none",
                          fontSize: "14px",
                        }}
                      >
                        {historyMenuData.map((item, index) => (
                          <li
                            key={index}
                            style={{
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleHistoryContextMenuItemClick(
                                item.historyexamination
                              )
                            }
                          >
                            {item.templateName}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div style={{ padding: "10px", fontSize: "14px" }}>
                        No template names available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="Patient-Dashboard-subNav">
                <span className="Patient-Dashboard-spanText">
                  Clinical Impression/ Diagnosis
                </span>
                <div className="Patient-Dashboard-btn">
                  <div className="Patient-Dashboard-table-header-sub">
                    <a href="#" onClick={openClinicalPopup}>
                      Save Template
                    </a>
                    <a href="#" onClick={handleClearData}>
                      Clear Data
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ position: "relative" }}>
                <textarea
                  ref={clinicalTextareaRef}
                  className="Patient-Dashboard-textarea"
                  placeholder="Right-click here to see the previous clinical impressions"
                  style={{
                    width: "100%",
                    height: "100px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid lightgrey",
                  }}
                  value={clinicalImpressionTextareaValue}
                  onChange={handleClinicalImpressionTextareaChange}
                  onContextMenu={handleClinicalImpressionContextMenu}
                />
                {showClinicalImpressionContextMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: clinicalImpressionContextMenuPosition.y + 10,
                      left: clinicalImpressionContextMenuPosition.x + 10,
                      background: "white",
                      border: "1px solid grey",
                      borderRadius: "4px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                    }}
                  >
                    {clinicalImpressionContextMenuData.length > 0 ? (
                      <ul
                        style={{
                          margin: 0,
                          padding: "10px",
                          listStyle: "none",
                          fontSize: "14px",
                        }}
                      >
                        {clinicalImpressionContextMenuData.map(
                          (item, index) => (
                            <li
                              key={index}
                              style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleClinicalImpressionMenuItemClick(
                                  item.clinicalImpressionText
                                )
                              }
                            >
                              {item.templateName}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <div style={{ padding: "10px", fontSize: "14px" }}>
                        No template names available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="Patient-Dashboard-scrollCon">
              <Section
                title="🧪 Labs"
                isAddBTN={false}
                handleAddClick={() => {
                  setActiveSection("actionRecord");
                }}
                children={
                  <>
                    {" "}
                    {LabRequest.length > 0 ? (
                      <div className="Patient-Dashboard-inputSection">
                        <table
                          border="1"
                          cellPadding="10"
                          cellSpacing="0"
                          className="patient-table"
                        >
                          <thead>
                            <tr>
                              <th className="Patient-Dashboard-th">Test</th>
                              <th className="Patient-Dashboard-th">Date</th>
                              <th className="Patient-Dashboard-th">Result</th>
                              <th className="Patient-Dashboard-th">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {LabRequest.map((radiology, index) => (
                              <tr key={index}>
                                <td className="Patient-Dashboard-td">
                                  {radiology?.labTests?.map(
                                    (labTest, index) => (
                                      <span key={index}>
                                        {index > 0 ? " , " : ""}
                                        {labTest.labTestName}
                                      </span>
                                    )
                                  )}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology?.requisitionDate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology?.status === "Completed" ? (
                                    <>
                                      <button
                                        className="Patient-Dashboard-btnAdd"
                                        onClick={() =>
                                          ShowlabReportResult(radiology)
                                        }
                                      >
                                        View
                                      </button>
                                    </>
                                  ) : (
                                    radiology?.status
                                  )}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  <div className="Patient-Dashboard-btn-delbtn">
                                    <button
                                      className="Patient-Dashboard-btnAdd"
                                      handleAddClick={() =>
                                        handleOpenModal("procedures")
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="Patient-Dashboard-btn-del"
                                      onClick={() =>
                                        handleDeleteLabRequest(
                                          radiology.labRequestId
                                        )
                                      }
                                    >
                                      Del
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>
                        No Previous Radiology order Found for this patient or
                        visit.
                      </p>
                    )}
                  </>
                }
              />
            </div>
            <div className="Patient-Dashboard-scrollCon">
              <Section
                title="🖼 Imaging"
                isAddBTN={false}
                handleAddClick={() => setActiveSection("actionRecord")}
                children={
                  <>
                    {radiology.length > 0 ? (
                      <div className="Patient-Dashboard-inputSection">
                        <table
                          border="1"
                          cellPadding="10"
                          cellSpacing="0"
                          className="patient-table"
                        >
                          <thead>
                            <tr>
                              <th className="Patient-Dashboard-th">Type</th>
                              <th className="Patient-Dashboard-th">Item</th>
                              <th className="Patient-Dashboard-th">Date</th>
                              <th className="Patient-Dashboard-th">Status</th>
                              <th className="Patient-Dashboard-th">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {radiology.map((radiology, index) => (
                              <tr key={index}>
                                <td className="Patient-Dashboard-td">
                                  {
                                    radiology?.imagingItemDTO?.imagingType
                                      ?.imagingTypeName
                                  }
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology?.imagingItemDTO?.imagingItemName}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology?.requestedDate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology?.status === "Completed" ? (
                                    <>
                                      <button
                                        className="Patient-Dashboard-btnAdd"
                                        onClick={() =>
                                          ShowImagingReport(radiology)
                                        }
                                      >
                                        View
                                      </button>
                                    </>
                                  ) : (
                                    radiology.status
                                  )}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  <div className="Patient-Dashboard-btn-delbtn">
                                    <button
                                      className="Patient-Dashboard-btnAdd"
                                      handleAddClick={() =>
                                        handleOpenModal("actionRecord")
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="Patient-Dashboard-btn-del"
                                      onClick={() =>
                                        handleDeleteRadiology(
                                          radiology.imagingId
                                        )
                                      }
                                    >
                                      Del
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No Radiology order for this patient or visit.</p>
                    )}
                  </>
                }
              />
            </div>
            <div className="Patient-Dashboard-scrollCon">
              <Section
                title="🚫 Allergies"
                isAddBTN={true}
                handleAddClick={() => handleOpenModal("Allergies")}
                children={
                  <>
                    {" "}
                    {allergies?.length > 0 ? (
                      <div className="Patient-Dashboard-inputSection">
                        <table
                          border="1"
                          cellPadding="10"
                          cellSpacing="0"
                          className="patient-table"
                        >
                          <thead>
                            <tr>
                              <th className="Patient-Dashboard-th">Allergy</th>
                              <th className="Patient-Dashboard-th">Severity</th>
                              <th className="Patient-Dashboard-th">Comment</th>
                              <th className="Patient-Dashboard-th">
                                Recorded Date
                              </th>
                              <th className="Patient-Dashboard-th">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allergies.map((active) => (
                              <tr key={active.activeId}>
                                <td className="Patient-Dashboard-td">
                                  {active.typeOfAllergy}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {active.severity}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {active.comments}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {active.recordedDate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  <div className="Patient-Dashboard-btn-delbtn">
                                    {/* <button
                                      className="Patient-Dashboard-btnAdd"
                                      handleAddClick={() =>
                                        handleOpenModal("Allergies")
                                      }
                                    >
                                      Edit
                                    </button> */}
                                    <button
                                      className="Patient-Dashboard-btn-del"
                                      onClick={() =>
                                        handleDeleteAllergy(active.allergiesId)
                                      }
                                    >
                                      Del
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No allergies found.</p>
                    )}
                  </>
                }
              />
            </div>
            <div className="Patient-Dashboard-scrollCon">
              <Section
                title="⚠ Active Problems"
                isAddBTN={true}
                handleAddClick={() => handleOpenModal("problems")}
                children={
                  <>
                    {" "}
                    {activeProblem.length > 0 ? (
                      <div className="Patient-Dashboard-inputSection">
                        <table
                          border="1"
                          cellPadding="10"
                          cellSpacing="0"
                          className="patient-table"
                        >
                          <thead>
                            <tr>
                              <th className="Patient-Dashboard-th">Problem</th>
                              <th className="Patient-Dashboard-th">
                                Onset Date
                              </th>
                              <th className="Patient-Dashboard-th">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeProblem.map((active) => (
                              <tr key={active.activeId}>
                                <td className="Patient-Dashboard-td">
                                  {active.searchProblem}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {active.onsetDate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  <div className="Patient-Dashboard-btn-delbtn">
                                    {/* <button
                                      className="Patient-Dashboard-btnAdd"
                                      handleAddClick={() =>
                                        handleOpenModal("procedures")
                                      }
                                    >
                                      Edit
                                    </button> */}
                                    <button
                                      className="Patient-Dashboard-btn-del"
                                      onClick={() =>
                                        handleDeleteActiveProblem(active.activeId
                                        )
                                      }
                                    >
                                      Del
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No medications found for this patient or visit.</p>
                    )}
                  </>
                }
              />
            </div>
            <div className="Patient-Dashboard-scrollCon">
              <Section
                title="🧪 Medication"
                isAddBTN={true}
                handleAddClick={() => handleOpenModal("medicationOrder")}
                children={
                  <>
                    {" "}
                    {medications.length > 0 ? (
                      <div className="Patient-Dashboard-inputSection">
                        <table
                          border="1"
                          cellPadding="10"
                          cellSpacing="0"
                          className="patient-table"
                        >
                          <thead>
                            <tr>
                              <th className="Patient-Dashboard-th">
                                Medication Name
                              </th>
                              <th className="Patient-Dashboard-th">
                                Frequency
                              </th>
                              <th className="Patient-Dashboard-th">
                                Last Taken
                              </th>
                              <th className="Patient-Dashboard-th">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {medications.map((medication) => (
                              <tr key={medication.medicationId}>
                                <td className="Patient-Dashboard-td">
                                  {medication.medicationName}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {medication.frequency}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {medication.lastTaken}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  <div className="Patient-Dashboard-btn-delbtn">
                                    {/* <button
                                      className="Patient-Dashboard-btnAdd"
                                      handleAddClick={() =>
                                        handleOpenModal("procedures")
                                      }
                                    >
                                      Edit
                                    </button> */}
                                    <button
                                      className="Patient-Dashboard-btn-del"
                                      onClick={()=>handleDeleteMedication(medication?.medicationId)}
                                    >
                                      Del
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No medications found for this patient or visit.</p>
                    )}
                  </>
                }
              />
            </div>
            <div className="Patient-Dashboard-scrollCon">
              <Section
                title="💉 Infusion"
                isAddBTN={true}
                handleAddClick={() => handleOpenModal("Infusion")}
                children={
                  <>
                    {" "}
                    {showInfusion.length > 0 ? (
                      <div className="Patient-Dashboard-inputSection">
                        <table
                          border="1"
                          cellPadding="10"
                          cellSpacing="0"
                          className="patient-table"
                        >
                          <thead>
                            <tr>
                              <th className="Patient-Dashboard-th">
                                Infusionnm
                              </th>
                              <th className="Patient-Dashboard-th">
                                Infusion Generic
                              </th>
                              <th className="Patient-Dashboard-th">
                                Infusion Frequency
                              </th>
                              <th className="Patient-Dashboard-th">Drug</th>
                              <th className="Patient-Dashboard-th">
                                Flow Rate
                              </th>
                              <th className="Patient-Dashboard-th">
                                InfuRemarks
                              </th>
                              <th className="Patient-Dashboard-th">
                                Start Date
                              </th>
                              <th className="Patient-Dashboard-th">
                                Start Time
                              </th>
                              <th className="Patient-Dashboard-th">End Date</th>
                              <th className="Patient-Dashboard-th">End Time</th>
                              <th className="Patient-Dashboard-th">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {showInfusion.map((Infusion) => (
                              <tr key={Infusion.sn}>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.infusionNm}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.infusionGeneric}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.infusionRoute}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.drug}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.flowRate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.infuRemarks}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.startDate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.startTime}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.endDate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {Infusion.endTime}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  <div className="Patient-Dashboard-btn-delbtn">
                                    {/* <button
                                      className="Patient-Dashboard-btnAdd"
                                      handleAddClick={() =>
                                        handleOpenModal("procedures")
                                      }
                                    >
                                      Edit
                                    </button> */}
                                    <button
                                      className="Patient-Dashboard-btn-del"
                                      onClick={()=>handleDeleteInfusion(Infusion.infusionId)}
                                    >
                                      Del
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      "no data found"
                    )}
                  </>
                }
              />
            </div>
            <div className="Patient-Dashboard-scrollCon">
              <Section
                title="📝 Procedures / Services"
                isAddBTN={true}
                handleAddClick={() => handleOpenModal("procedures")}
                children={
                  <>
                    {services.length > 0 ? (
                      <div className="Patient-Dashboard-inputSection">
                        <table
                          border="1"
                          cellPadding="10"
                          cellSpacing="0"
                          className="patient-table"
                        >
                          <thead>
                            <tr>
                              <th className="Patient-Dashboard-th">
                                Service Name
                              </th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {services.map((service, index) => {
                              const serviceNames = Array.isArray(
                                service.serviceNames
                              )
                                ? service.serviceName
                                : [service.serviceName]; // If it's not an array, treat it as a single item array
                              return (
                                <tr key={index}>
                                  <td className="Patient-Dashboard-td">
                                    {service.serviceName}
                                  </td>
                                  <td className="Patient-Dashboard-td">
                                    <div className="Patient-Dashboard-btn-delbtn">
                                      {/* <button
                                        className="Patient-Dashboard-btnAdd"
                                        handleAddClick={() =>
                                          handleOpenModal("procedures")
                                        }
                                      >
                                        Edit
                                      </button> */}
                                      <button
                                        className="Patient-Dashboard-btn-del"
                                        onClick={()=>handleDeleteService(service.serviceId)}
                                      >
                                        Del
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No Data Available</p>
                    )}
                  </>
                }
              />
            </div>
            <div className="Patient-Dashboard-scrollCon">
              <Section
                title="📟 Treatment Given"
                isAddBTN={true}
                handleAddClick={() => handleOpenModal("treatment")}
                children={
                  <>
                    {treatment.length > 0 ? (
                      <div className="Patient-Dashboard-inputSection">
                        <table
                          table
                          border="1"
                          cellPadding="10"
                          cellSpacing="0"
                          className="patient-table"
                        >
                          <thead>
                            <tr>
                              <th className="Patient-Dashboard-th">
                                Treatment Descriptions
                              </th>
                              <th className="Patient-Dashboard-th">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {treatment.map((treatment, index) => {
                              const treatmentDescriptions = Array.isArray(
                                treatment.treatmentDescriptions
                              )
                                ? treatment.treatmentDescriptions
                                : [];
                              return (
                                <tr key={index}>
                                  <td className="Patient-Dashboard-td">
                                    {treatment.treatmentDescriptions}{" "}
                                  </td>
                                  <td className="Patient-Dashboard-td">
                                    <div className="Patient-Dashboard-btn-delbtn">
                                      {/* <button
                                        className="Patient-Dashboard-btnAdd"
                                        handleAddClick={() =>
                                          handleOpenModal("procedures")
                                        }
                                      >
                                        Edit
                                      </button> */}
                                      <button
                                        className="Patient-Dashboard-btn-del"
                                        onClick={()=>handleDeleteTreatment(treatment.treatmentId)}
                                      >
                                        Del
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No data found</p>
                    )}
                  </>
                }
              />
            </div>
          </main>
        </>
      ) : (
        <div className="Patient-Dashboard-render-Com">{renderContent()}</div>
      )}
      <aside className="Patient-Dashboard-aside-section  Patient-Dashboard-right-aside">
        <div className="Patient-Dashboard-detailsBox">
          <div
            onClick={() => setActiveSection("dashboard")}
            className={`${
              activeSection === "dashboard" ? "isTabActive" : ""
            } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Orders</span>
              <i className="fas fa-home"></i>
            </div>
          </div>
          <div
            onClick={() => setActiveSection("vitals")}
            className={`${
              activeSection === "vitals" ? "isTabActive" : ""
            } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Vitals</span>
              <i class="fas fa-procedures"></i>
            </div>
          </div>
          <div
            onClick={() => {
              setActiveSection("problems");
            }}
            className={`${
              activeSection === "problems" ? "isTabActive" : ""
            } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Problems</span>
              <i class="fas fa-exclamation-triangle"></i>
            </div>
          </div>
          {/* <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Current Medications</span>
            </div>
          </div> */}
          {/* <div
            onClick={() => {
              setActiveSection("encounte-rHistory");
            }}
            className="Patient-Dashboard-boxOne"
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">
                Encounter History
              </span>
            </div>
          </div> */}
          {/* <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span
                className="Patient-Dashboard-textOne"
                onClick={() => {
                  setActiveSection("Clinical-Document");
                  setPrevAction(...activeSection);
                }}
              >
                Clinical Documents
              </span>
            </div>
          </div> */}
          <div
            onClick={() => {
              setActiveSection("clinical");
            }}
            className={`${
              activeSection === "clinical" ? "isTabActive" : ""
            } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Clinical</span>
              <i class="fas fa-clinic-medical"></i>
            </div>
          </div>
          {/* <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Notes</span>
              <i class="fas fa-notes-medical"></i>
            </div>
          </div> */}
          {/* <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Scanned images</span>
              <i class="fas fa-images"></i>
            </div>
          </div> */}
          {patient.admissionId && (
            <div
              onClick={() => {
                setActiveSection("dischargeSummary");
              }}
              className={`${
                activeSection === "dischargeSummary" ? "isTabActive" : ""
              } Patient-Dashboard-boxOne`}
            >
              <div className="Patient-Dashboard-textAndLogo">
                <span className="Patient-Dashboard-textOne">
                  Discharge Summary
                </span>
                <i className="fas fa-arrow-alt-circle-left"></i>
              </div>
            </div>
          )}
          <div
            onClick={() => {
              setActiveSection("diet");
            }}
            className={`${
              activeSection === "diet" ? "isTabActive" : ""
            } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Diet Order</span>
              <i className="fas fa-edit"></i>
            </div>
          </div>

          <div
            onClick={() => {
              setActiveSection("referral");
            }}
            className={`${
              activeSection === "referral" ? "isTabActive" : ""
            } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">
                Referral/Cross Consultation
              </span>
              <i className="fas fa-handshake"></i>
            </div>
          </div>
          <div
            onClick={() => {
              setActiveSection("nursing");
            }}
            className={`${
              activeSection === "nursing" ? "isTabActive" : ""
            } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Nursing Order</span>
              <i className="fas fa-user-nurse"></i>
            </div>
          </div>
          <div
            onClick={() => {
              setActiveSection("pacrequest");
            }}
            className={`${
              activeSection === "pacrequest" ? "isTabActive" : ""
            } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">PAC Request</span>
              <i className="fas fa-arrow-alt-circle-left"></i>
            </div>
          </div>
          {patient?.outPatientId && (
            <div
              onClick={() => {
                setActiveSection("admissionslip");
              }}
              className={`${
                activeSection === "admissionslip" ? "isTabActive" : ""
              } Patient-Dashboard-boxOne`}
            >
              <div className="Patient-Dashboard-textAndLogo">
                <span className="Patient-Dashboard-textOne">
                  Admission Slip
                </span>
                <i class="fas fa-hospital"></i>
              </div>
            </div>
          )}

          {/* <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">
                Doctor Appointment
              </span>
              <i class="fas fa-calendar-check"></i>
            </div>
          </div> */}

          {/* <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">
                pending Cross Consultation
              </span>
              <i className="fas fa-arrow-alt-circle-left"></i>
            </div>
          </div> */}
        </div>
        {/* <div className="Patient-Dashboard-asideDivTwo">
          <div className="Patient-Dashboard-asideNav">
            <div className="Patient-Dashboard-navTextandBtn">
              <div className="Patient-Dashboard-navVitals">
                <span className="Patient-Dashboard-spanText">Last Vitals</span>
                <button
                  className="Patient-Dashboard-secBtnBlue"
                  onClick={showVitalsPage} // Toggle Vitals visibility
                >
                  🡨
                </button>
              </div>
              <div className="Patient-Dashboard-tableRecord">
                <table className="Patient-Dashboard-patient-table">
                  <tr>
                    <td className="Patient-Dashboard-td">Recoreded On</td>
                    <td className="Patient-Dashboard-td">
                      {new Date(latestVitals?.addedOn).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Height</td>
                    <td className="Patient-Dashboard-td">
                      {" "}
                      {latestVitals?.height} cm
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Weight</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.weight}kg
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">BMI</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.bmi}
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Temprature</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.temperature} °C
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Pulse</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.pulse} bpm
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Blood Pressure</td>
                    <td className="Patient-Dashboard-td">
                      {" "}
                      {latestVitals?.bpSystolic}/{latestVitals?.bpDiastolic}{" "}
                      mmHg
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Respiratory Rate</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.respiratoryRate} breaths/min
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">SpO2</td>
                    <td className="Patient-Dashboard-td">
                      {" "}
                      {latestVitals?.spO2} %
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">O2 Deliver Method</td>
                    <td className="Patient-Dashboard-td">
                      {" "}
                      {latestVitals?.o2DeliveryPlan}
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Pain Scale</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.painScale}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div> */}
        {/* <Section
            title="🚫 Allergies"
            isAddBTN={true}
            handleAddClick={() => handleOpenModal("Allergies")}
            children={
              <>
                <table className="patientList-table" ref={tableRef}>
                  <thead>
                    <tr>
                      {["Recorded On", "Allergen", "Severity", "Reaction"].map(
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
                    {allergies && allergies.length > 0 ? (
                      allergies.map((allergy) => (
                        <tr key={allergy.allergiesId}>
                          <td>{allergy.recordedDate}</td>
                          <td>{allergy.typeOfAllergy}</td>
                          <td>{allergy.severity}</td>
                          <td>{allergy.reaction}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No allergies found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            }
          /> */}
        {/* </div> */}
      </aside>
      {showRadioReport && (
        <CustomModal
          isOpen={showRadioReport}
          onClose={() => setShowRadioReport(false)}
        >
          <RadiologyReportDoc
            reportData={selectedRadiology}
            onClose={() => setShowRadioReport(false)}
          />
        </CustomModal>
      )}
      {ShowLabReport && (
        <CustomModal
          isOpen={ShowLabReport}
          onClose={() => setShowLabReport(false)}
        >
          <LabReportResult
            reportData={selectedLabrotary}
            onClose={() => setShowLabReport(false)}
          />
        </CustomModal>
      )}
      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <SaveTemplate complaintsText={textareaValue} />
        </CustomModal>
      )}
      {showHistorypopup && (
        <CustomModal isOpen={showHistorypopup} onClose={closeHistoryPopup}>
          <SaveHistoryTemplate historyText={historyTextareaValue} />
        </CustomModal>
      )}
      {showClinicalPopup && (
        <CustomModal isOpen={showClinicalPopup} onClose={closeClinicalPopup}>
          <SaveClinicalTemplate
            ClinicalText={clinicalImpressionTextareaValue}
          />
        </CustomModal>
      )}
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent === "problems" && (
          <Problems
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            setIsModalOpen={setIsModalOpen}
            outPatientId={patient?.outPatientId}
          />
        )}
        {modalContent === "medicationOrder" && (
          <MedicationOrder
            setIsModalOpen={setIsModalOpen}
            onClose={handleCloseModal}
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        )}
        {modalContent === "Infusion" && (
          <Infusion
            setIsModalOpen={setIsModalOpen}
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        )}

        {modalContent === "procedures" && (
          <ProcedureService
            setIsModalOpen={setIsModalOpen}
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        )}

        {modalContent === "treatment" && (
          <TreatmentGiven
            setIsModalOpen={setIsModalOpen}
            inPatientId={patient?.inPatientId}
            outPatientId={patient?.outPatientId}
          />
        )}
        {modalContent === "Allergies" && (
          <Allergy
            setIsModalOpen={setIsModalOpen}
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            outPatientId={patient?.outPatientId}
          />
        )}
      </CustomModal>
    </div>
  );
  return (
    <div
      className={`patient-dashboard ${
        isPatientOPEN ? "isPatientDetailsActive" : "isPatientDetailsInActive"
      }`}
    >
      <nav className="Patient-Dashboard-navbar">
        <div className="Patient-Dashboard-navText">
          <div className="Patient-Dashboard-navLogoOne">
            <span className="Patient-Dashboard-Opd">
              {ipAdmission?.ipAdmmissionId ? "IPD" : "OPD"}
            </span>
            <div className="Patient-Dashboard-navLogoOne-img">
              {!patient?.patient?.hasOwnProperty("fileAttachment") ? (
                <span>{patient?.patient?.firstName?.[0]}</span>
              ) : (
                <img
                  src={`data:image/png;base64,${patient.patient?.fileAttachment}`}
                  alt="patient attachment"
                />
              )}
            </div>
            <div className="Patient-Dasboard-nav-patientData">
              <p>
                {patient.patient?.firstName} {patient.patient?.lastName}
              </p>
              <span>{patient.patient?.uhid}</span>
              <span>
                {patient.patient?.age} {patient.patient?.ageUnit}{" "}
                {patient.patient?.gender}
              </span>
            </div>
            <div className="Patient-Dasboard-nav-patientDataExtra">
              {patient?.outPatientId != null ? (
                <>
                  <span className="Patient-Dashboard-nav-complaint">
                    Complaint : {patient.patient?.remarks}
                  </span>
                  <span>
                    App. Date/Time : {patient?.appointmentDate}{" "}
                    {patient?.appointmentTime}
                  </span>
                  <span>
                    Consultant :{patient.addDoctor?.salutation}{" "}
                    {patient.addDoctor?.doctorName}
                  </span>
                </>
              ) : (
                <>
                  <span>Add. Date/Time :{ipAdmission?.admissionDate}</span>
                  <span>
                    Ward/Bed : {ipAdmission.roomDetails?.roomTypeDTO?.wardName}{" "}
                    {ipAdmission.roomDetails?.bedDTO?.bedNo}
                  </span>
                  <span>
                    Consultant :
                    {
                      ipAdmission.admissionUnderDoctorDetail.consultantDoctor
                        ?.salutation
                    }{" "}
                    {
                      ipAdmission.admissionUnderDoctorDetail.consultantDoctor
                        ?.doctorName
                    }
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="Patient-Dashboard-navPatientDetails"></div>
        </div>
        <div className="Patient-Dashboard-navBtns">
          <div className="Patient-Dashboard-navBtns-vector"></div>
          <div>
            <button
              className="Patient-Dashboard-btnPrint"
              onClick={() => setIsPatientOPEN(false)}
            >
              <i class="fas fa-sign-out-alt"></i> Exit
            </button>{" "}
            <button
              className="Patient-Dashboard-btnAddBack"
              onClick={() => setActiveSection("dashboard")}
            >
              <i class="fas fa-chevron-circle-left"></i> Back
            </button>
            <button
              className="Patient-Dashboard-btn-print"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>
      </nav>
      {renderDashboard()}
    </div>
  );
};
export default PatientDashboard;
