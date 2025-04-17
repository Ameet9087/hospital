// SwapnilRokade_PatientDashboard_Adding_New_patientDashboard_13/09

import React, { useEffect, useRef, useState } from "react";
import "../../../DashBoards/InpatientPage.css";
import VitalsPage from "../../../DashBoards/ClinicalVitals";
import ActionRecordPage from "../../../DashBoards/ActionRecordPage";
import Problems from "../../../DashBoards/Problems";
import { API_BASE_URL } from "../../../api/api";
import AddVitalsForm from "../../../DashBoards/AddVitals";
import PatientDischargeForm from "../../../DashBoards/DischargeSummary";
import Allergy from "../../../DashBoards/ClinicalAllergy";
import axios from "axios";
import RadiologyReportDoc from "../../../DashBoards/RadiologyReportDoc";
import LabReportResult from "../../../DashBoards/LabReportResult";
import Infusion from "../../../DashBoards/Infusion";
import ProcedureService from "../../../DashBoards/ProcedureService";
import TreatmentGiven from "../../../DashBoards/TreatmentGiven";
import CustomModal from "../../../../CustomModel/CustomModal";
import MedicationOrder from "../../../DashBoards/MedicationOrder ";
import SaveTemplate from "../../../DashBoards/SaveTemplate/SaveTemplate";
import PatientDetailsPrint from "../../../DashBoards/PatientDetailsPrint";
import Vitals from "../../../DashBoards/AddVitals";

import NursingCarePlan from "../NursingCarePlan/NursingCarePlan";
import FluidIntakeOutput from "../FluidIntakeOutput/FluidIntakeOutput";
import DietNurseIndent from "../DietnurseIndent/DietNurseIndent";
import NursingAssessment from "../DailyNursingAssessments/DailyNursingAssessment";
import IpChangeRoom from "../IPChangeRoom/IPChangeRoom";
import IpdIssueWard from "../IPDIssuedWard/ipdissuedward";
import IpdReturnWard from "../IPDReturnsWard/ipdreturnward";
import DischargeIntimation from "../DischargeIntimition/DischargeIntimationForm";
import IpBilling from "../IPBilling/iPBilling";
import AdmissionSlip from "../../../DashBoards/AdmissionSlip";

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

const NursingPatientDashboard = ({
  isPatientOPEN,
  patient,
  setIsPatientOPEN,
  ipAdmission,
}) => {
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
  const [showVitals, setShowVitals] = useState(false);

  const [showPrintPage, setShowPrintPage] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (contentType) => {
    setModalContent(contentType); // Set which content to render
    setIsModalOpen(true); // Open modal
  };

  const showVitalsPage = () => {
    setShowVitals(true); // Show the Vitals component when called
  };
  const closeVitalsPage = () => {
    setShowVitals(false);
    // Close the Vitals component when called
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
  }, [patient?.inPatientId, patient.outPatientId, activeSection, isModalOpen]);

  useEffect(() => {
    // Fetch medications data from the API
    const fetchMedications = async () => {
      let endpoint = "";

      if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/medications/by-opd-id?opdPatientId=${patient.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/medications/by-ipd-id?ipdPatientId= ${patient?.inPatientId}`;
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
      } else if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/services/out-patient/${patient.outPatientId}`;
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
      } catch (error) { }
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
      if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/doc-vitals/get-by-opd-patient-id/${patient.outPatientId}`;
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
  }, [
    patient?.inPatientId,
    patient.outPatientId,
    activeSection,
    isModalOpen,
  ]);

  useEffect(() => {
    const fetchAllergies = () => {
      let endpoint = "";

      if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/allergies/by-newVisitPatientId/${patient.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/allergies/by-patientId/${patient?.inPatientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
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
  }, [patient.outPatientId, patient?.inPatientId, activeSection, isModalOpen]); // Dependencies to re-run useEffect when IDs change

  useEffect(() => {
    const fetchActiveProblems = () => {
      let endpoint = "";

      // Check if newPatientVisitId is present

      if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/active-problems/by-newVisitPatientId/${patient.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/active-problems/by-patientId/${patient?.inPatientId}`;
      }

      // If an endpoint is determined, make the API call
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
  }, [patient.outPatientId, patient?.inPatientId, activeSection, isModalOpen]); // Dependencies for re-fetching when IDs change

  useEffect(() => {
    const fetchImagingRequisitions = () => {
      let endpoint = "";

      // Check if newPatientVisitId or admissionId is present

      if (patient.outPatientId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-opd-patient-id?opdPatientId=${patient.outPatientId}`;
      } else if (patient?.inPatientId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-ipd-patient-id?ipdPatientId=${patient?.inPatientId}`;
      }

      // If an endpoint is determined, make the API call
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              console.log(response.data);
              setRadiology(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching imaging requisitions:", error);
          });
      }
    };

    fetchImagingRequisitions();
  }, [patient.outPatientId, patient?.inPatientId, activeSection, isModalOpen]); // Dependencies to re-run useEffect when patient IDs change

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
  }, [patient.outPatientId, patient?.inPatientId, activeSection, isModalOpen]); // Dependencies to track patient IDs

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
        return <PatientDischargeForm patient={patient} ipAdmission={ipAdmission}
 />;
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
      case "nursecareplan":
        return (
          <NursingCarePlan
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            ipAdmission={ipAdmission}
            outPatientId={patient?.outPatientId}
          />
        );
      case "fluidintake":
        return (
          <FluidIntakeOutput
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            ipAdmission={ipAdmission}
            outPatientId={patient?.outPatientId}
          />
        );
      // case "dietnurseindent":
      //   return (
      //     <DietNurseIndent
      //       patientId={
      //         patient?.patient?.inPatientId ||
      //         patient?.patientId ||
      //         patient?.inPatientId
      //       }
      //       ipAdmission={ipAdmission}
      //       outPatientId={patient?.outPatientId}
      //     />
      //   );
      case "dailynurseassesment":
        return (
          <NursingAssessment
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            ipAdmission={ipAdmission}
            outPatientId={patient?.outPatientId}
          />
        );
      case "ipbilling":
        return <IpBilling ipAdmission={ipAdmission} />;
      case "ipchangeroom":
        return (
          <IpChangeRoom
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            ipAdmission={ipAdmission}
            outPatientId={patient?.outPatientId}
          />
        );
      case "ipdissueward":
        return (
          <IpdIssueWard
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            ipAdmission={ipAdmission}
            outPatientId={patient?.outPatientId}
          />
        );
      case "ipdreturnward":
        return (
          <IpdReturnWard
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            ipAdmission={ipAdmission}
            outPatientId={patient?.outPatientId}
          />
        );
      case "dischareintimation":
        return (
          <DischargeIntimation
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            ipAdmission={ipAdmission}
            outPatientId={patient?.outPatientId}
          />
        );
      case "admissionslip":
        return (
          <AdmissionSlip
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            patient={patient}
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
                    {`${patient?.firstName ||
                      patient?.patient?.firstName ||
                      patient?.FirstName
                      } ${patient?.lastName ||
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
                        {`${patient?.age ||
                          patient?.patient?.age ||
                          patient?.patientAge
                          } ${patient?.ageUnit || patient?.patient?.ageUnit}/${patient?.gender ||
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
                      <span>{`${patient?.employeeDTO?.salutation ||
                        ipAdmission?.admissionUnderDoctorDetail
                          ?.consultantDoctor?.salutation ||
                        patient?.doctorSalutationName
                        } ${patient?.employeeDTO?.firstName ||
                        ipAdmission?.admissionUnderDoctorDetail
                          ?.consultantDoctor?.doctorName ||
                        patient?.doctorFirstName
                        }`}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>

          <main className="Patient-Dashboard-betweenSection">
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
                                  {radiology.requisitionDate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology.status === "Completed" ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          ShowlabReportResult(radiology)
                                        }
                                      >
                                        View
                                      </button>
                                    </>
                                  ) : (
                                    radiology.status
                                  )}
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
                            </tr>
                          </thead>
                          <tbody>
                            {radiology.map((radiology, index) => (
                              <tr key={index}>
                                <td className="Patient-Dashboard-td">
                                  {
                                    radiology.imagingItemDTO?.imagingType
                                      ?.imagingTypeName
                                  }
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology.imagingItemDTO.imagingItemName}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology.requestedDate}
                                </td>
                                <td className="Patient-Dashboard-td">
                                  {radiology.status === "Completed" ? (
                                    <>
                                      <button className="Patient-Dashboard-td-view"
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

            {/* adan 14/11/24 */}

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
                            </tr>
                          </thead>
                          <tbody>
                            {services.map((service, index) => {
                              // Ensure serviceNames is an array before joining
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
                            </tr>
                          </thead>
                          <tbody>
                            {treatment.map((treatment, index) => {
                              const treatmentDescriptions = Array.isArray(
                                treatment.treatmentDescriptions
                              )
                                ? treatment.treatmentDescriptions
                                : []; // Default to an empty array if it's not an array
                              return (
                                <tr key={index}>
                                  <td className="Patient-Dashboard-td">
                                    {treatment.treatmentDescriptions}{" "}
                                    {/* Safely join the array */}
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
            className={`${activeSection === "dashboard" ? "isTabActive" : ""
              } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Orders</span>
              <i className="fas fa-home"></i>
            </div>
          </div>
          <div
            onClick={() => setActiveSection("vitals")}
            className={`${activeSection === "vitals" ? "isTabActive" : ""
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
            className={`${activeSection === "problems" ? "isTabActive" : ""
              } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Problems</span>
              <i class="fas fa-exclamation-triangle"></i>
            </div>
          </div>
          <div
            onClick={() => {
              setActiveSection("clinical");
            }}
            className={`${activeSection === "clinical" ? "isTabActive" : ""
              } Patient-Dashboard-boxOne`}
          >
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Clinical</span>
              <i class="fas fa-clinic-medical"></i>
            </div>
          </div>
          {patient?.inPatientId && (
            <>
              <div
                onClick={() => {
                  setActiveSection("nursecareplan");
                }}
                className={`${activeSection === "nursecareplan" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Nurse Care Plan
                  </span>
                  <i className="fas fa-hand-holding-medical"></i>
                </div>
              </div>
              <div
                onClick={() => {
                  setActiveSection("fluidintake");
                }}
                className={`${activeSection === "fluidintake" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Fluid Intake OutPut
                  </span>
                  <i className="fas fa-tint"></i>
                </div>
              </div>
              {/* <div
                onClick={() => {
                  setActiveSection("dietnurseindent");
                }}
                className={`${activeSection === "dietnurseindent" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Diet Nurse Indent
                  </span>
                  <i className="fas fa-indent"></i>
                </div>
              </div> */}
              <div
                onClick={() => {
                  setActiveSection("dailynurseassesment");
                }}
                className={`${activeSection === "dailynurseassesment" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Daily Nurse Assesment
                  </span>
                  <i class="fas fa-user-nurse"></i>
                </div>
              </div>
              <div
                onClick={() => {
                  setActiveSection("ipbilling");
                }}
                className={`${activeSection === "ipbilling" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">Ip Billing</span>
                  <i class="fas fa-user-nurse"></i>
                </div>
              </div>
              <div
                onClick={() => {
                  setActiveSection("ipchangeroom");
                }}
                className={`${activeSection === "ipchangeroom" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Ip Change Room
                  </span>
                  <i className="fas fa-person-booth"></i>
                </div>
              </div>
              {/* <div
                onClick={() => {
                  setActiveSection("ipdissueward");
                }}
                className={`${activeSection === "ipdissueward" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Ipd Issue Ward
                  </span>
                  <i className="fas fa-bed"></i>
                </div>
              </div> */}
              {/* <div
                onClick={() => {
                  setActiveSection("ipdreturnward");
                }}
                className={`${activeSection === "ipdreturnward" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Ipd Return Ward
                  </span>
                  <i className="fas fa-undo-alt"></i>
                </div>
              </div> */}
              <div
                onClick={() => {
                  setActiveSection("dischareintimation");
                }}
                className={`${activeSection === "dischareintimation" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Discharge Intimation
                  </span>
                  <i className="fas fa-undo-alt"></i>
                </div>
              </div>

              <div
                onClick={() => {
                  setActiveSection("dischargeSummary");
                }}
                className={`${activeSection === "dischargeSummary" ? "isTabActive" : ""
                  } Patient-Dashboard-boxOne`}
              >
                <div className="Patient-Dashboard-textAndLogo">
                  <span className="Patient-Dashboard-textOne">
                    Discharge Summary
                  </span>
                  <i className="fas fa-undo-alt"></i>
                </div>
              </div>
            </>
          )}
          {patient?.outPatientId && (
            <div
              onClick={() => {
                setActiveSection("admissionslip");
              }}
              className={`${activeSection === "admissionslip" ? "isTabActive" : ""
                } Patient-Dashboard-boxOne`}
            >
              <div className="Patient-Dashboard-textAndLogo">
                <span className="Patient-Dashboard-textOne">
                  Admission Slip
                </span>
                <i className="fas fa-undo-alt"></i>
              </div>
            </div>
          )}
        </div>
      </aside>
      {showRadioReport && (
        <RadiologyReportDoc
          reportData={selectedRadiology}
          onClose={() => setShowRadioReport(false)}
        />
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

      {showVitals && (
        <Vitals
          outPatientId={patient?.outPatientId}
          patientId={
            patient.patient?.inPatientId ||
            patient?.patientId ||
            patient?.inPatientId
          }
          isVisible={showVitalsPage}
          setShowVitals={setShowVitals}
          onClose={closeVitalsPage}
        />
      )}

      {/* Prachi */}
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent === "problems" && (
          <Problems
            patientId={
              patient?.patient?.inPatientId ||
              patient?.patientId ||
              patient?.inPatientId
            }
            outPatientId={patient?.outPatientId}
          />
        )}
        {modalContent === "medicationOrder" && (
          <MedicationOrder
            // selectedOrders={selectedOrders}
            setIsModalOpen={setIsModalOpen}
            inPatientId={patient?.patientId}
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

  {
    /*/ Prachi */
  }

  return (
    <div
      className={`patient-dashboard ${isPatientOPEN ? "isPatientDetailsActive" : "isPatientDetailsInActive"
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
          </div>
        </div>
      </nav>
      {renderDashboard()}
    </div>
  );
};

export default NursingPatientDashboard;
