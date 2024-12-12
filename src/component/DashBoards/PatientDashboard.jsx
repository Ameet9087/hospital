// SwapnilRokade_PatientDashboard_Adding_New_patientDashboard_13/09

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
import { startResizing } from "../TableHeadingResizing/resizableColumns";
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

const Section = ({ title, handleAddClick, children }) => (
  <div className="Patient-Dashboard-firstBox">
    <div className="Patient-Dashboard-subNav">
      <div className="Patient-Dashboard-labAndImg">
        <span className="Patient-Dashboard-spanText">{title}</span>
      </div>
      <button className="Patient-Dashboard-btnAdd" onClick={handleAddClick}>
        + Add
      </button>
    </div>
    {children || (
      <div className="Patient-Dashboard-inputOne">No Records Found</div>
    )}
  </div>
);

const PatientDashboard = ({ isPatientOPEN, patient, setIsPatientOPEN }) => {
  console.log(patient);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [selectedRadiology, setSelectedRadiology] = useState(null);
  const [selectedLabrotary, setSelectedLabrotary] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [prevAction, setPrevAction] = useState("dashboard");
  const [latestVitals, setLatestVitals] = useState(null);
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [allergies, setAllergies] = useState(null);
  const [activeProblem, setActiveProblem] = useState([]);
  const [radiology, setRadiology] = useState([]);
  const [LabRequest, setLabRequest] = useState([]);
  const [showRadioReport, setShowRadioReport] = useState(false);
  const [ShowLabReport, setShowLabReport] = useState(false);
  const [showInfusion,setInfusion]=useState([])
  const [services,setServices]=useState([])
  const [treatment,setTreatment]=useState([])
  console.log(patient);

  useEffect(() => {
    // Fetch medications data from the API
    const fetchInfusions = async () => {
      let endpoint = "";

        endpoint = `http://192.168.0.110:9000/infusions/patient/1`;
      // } else if (patient?.admissionId) {
      //   endpoint = `${API_BASE_URL}/medications/by-ipd-id?ipdPatientId= ${
      //     patient?.patientDTO?.patientId || patient?.patientId
      //   }`;
      
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log("infusion"+data);

        setInfusion(data);
      } catch (error) {
        console.error("Error fetching infusion:", error);
      }
    };

    fetchInfusions();
  }, [activeSection]);




  useEffect(() => {
    // Fetch medications data from the API
    const fetchMedications = async () => {
      let endpoint = "";

      if (patient?.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/medications/by-opd-id?opdPatientId=${patient?.newPatientVisitId}`;
      } else if (patient?.admissionId) {
        endpoint = `${API_BASE_URL}/medications/by-ipd-id?ipdPatientId= ${
          patient?.patientDTO?.patientId || patient?.patientId
        }`;
      }
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);

        setMedications(data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, [activeSection]);

  useEffect(() => {
    const fetchServices = async () => {
      const endpoint = 'http://192.168.0.110:9000/api/services/patient/1';
  
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
  
        // Process the serviceNames to parse the JSON string into an array
        const parsedServices = data.map((service) => {
          let parsedServiceNames = [];
  
          // Parse each serviceNames string into a proper array
          if (service.serviceNames && service.serviceNames.length > 0) {
            try {
              parsedServiceNames = JSON.parse(service.serviceNames[0]); // Only parse the first item in the array
            } catch (error) {
              console.error('Error parsing serviceNames:', error);
            }
          }
  
          return { ...service, serviceNames: parsedServiceNames }; // Return service with parsed serviceNames
        });
  
        console.log('Fetched Services:', parsedServices);
  
        setServices(parsedServices); // Set state with parsed services
  
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };
  
    fetchServices();
  }, [activeSection]);
  
  
  
  useEffect(() => {
    const fetchTreatmentGive = async () => {
      const endpoint = 'http://192.168.0.110:9000/api/treatments/patient/1';
  
      try {
        const response = await fetch(endpoint);

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Fetched data:', data); // Log the entire fetched data

        // Process the treatment descriptions and parse JSON strings
        const parsedTreatment = data.map((treatment) => {
          let parsedTreatmentDescriptions = [];

          // If treatmentDescriptions exist and have data, parse it
          if (treatment.treatmentDescriptions && treatment.treatmentDescriptions.length > 0) {
            parsedTreatmentDescriptions = treatment.treatmentDescriptions; // No need to parse if it's already an array
          }

          return { ...treatment, treatmentDescriptions: parsedTreatmentDescriptions };
        });

        console.log('Parsed Treatment:', parsedTreatment);

        setTreatment(parsedTreatment); // Set state with the parsed treatment data

      } catch (error) {
        console.error('Error fetching treatment data:', error);
      }
    };

    fetchTreatmentGive();
  }, [activeSection]); // Only re-fetch when activeSection changes


  




  useEffect(() => {
    const fetchVitals = () => {
      let endpoint = "";

      if (patient?.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/vitals/get-by-opd-patient-id/${patient?.newPatientVisitId}`;
      } else if (patient?.admissionId) {
        endpoint = `${API_BASE_URL}/vitals/get-by-in-patient-id/${
          patient?.patientDTO?.patientId || patient?.patientId
        }`;
      }

      // If an endpoint is determined, make the API call
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              // Set the latest vitals
              setLatestVitals(response.data[response.data.length - 1]);
              console.log(response.data[response.data.length - 1]);
            }
          })
          .catch((error) => {
            console.error("Error fetching vitals:", error);
          });
      }
    };

    fetchVitals();
  }, [patient.newPatientVisitId, patient.admissionId, activeSection]); // Dependencies

  useEffect(() => {
    const fetchAllergies = () => {
      let endpoint = "";

      // Check if newPatientVisitId is present

      if (patient?.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/allergies/by-newVisitPatientId/${patient?.newPatientVisitId}`;
      } else if (patient?.admissionId) {
        endpoint = `${API_BASE_URL}/allergies/by-patientId/${
          patient?.patientDTO?.patientId || patient?.patientId
        }`;
      }

      // If an endpoint is determined, make the API call
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
  }, [patient.newPatientVisitId, patient.admissionId, activeSection]); // Dependencies to re-run useEffect when IDs change

  useEffect(() => {
    const fetchActiveProblems = () => {
      let endpoint = "";

      // Check if newPatientVisitId is present

      if (patient?.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/active-problems/by-newVisitPatientId/${patient?.newPatientVisitId}`;
      } else if (patient?.admissionId) {
        endpoint = `${API_BASE_URL}/active-problems/by-patientId/${
          patient?.patientDTO?.patientId || patient?.patientId
        }`;
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
  }, [patient.newPatientVisitId, patient.admissionId, activeSection]); // Dependencies for re-fetching when IDs change

  useEffect(() => {
    const fetchImagingRequisitions = () => {
      let endpoint = "";

      // Check if newPatientVisitId or admissionId is present

      if (patient?.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-opd-patient-id?opdPatientId=${patient?.newPatientVisitId}`;
      } else if (patient?.admissionId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-ipd-patient-id?ipdPatientId=${
          patient?.patientDTO?.patientId || patient?.patientId
        }`;
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
  }, [patient.newPatientVisitId, patient.admissionId, activeSection]); // Dependencies to re-run useEffect when patient IDs change

  useEffect(() => {
    const fetchLabRequests = () => {
      let endpoint = "";

      // Check if newPatientVisitId or admissionId is present

      if (patient?.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/lab-requests/by-opd-patient-id?opdPatientId=${patient?.newPatientVisitId}`;
      } else if (patient?.admissionId) {
        endpoint = `${API_BASE_URL}/lab-requests/by-ipd-patient-id?ipdPatientId=${
          patient?.patientDTO?.patientId || patient?.patientId
        }`;
      }

      // If an endpoint is determined, make the API call
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
  }, [patient.newPatientVisitId, patient.admissionId, activeSection]); // Dependencies to track patient IDs

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
            patientId={patient?.patientDTO?.patientId || patient?.patientId}
            newPatientVisitId={patient?.newPatientVisitId}
          />
        );
      case "actionRecord":
        return (
          <ActionRecordPage
            patient={patient}
            patientId={patient?.patientDTO?.patientId || patient?.patientId}
            setActiveSection={setActiveSection}
            newPatientVisitId={patient?.newPatientVisitId}
            employeeId={
              patient?.employeeDTO?.employeeId ||
              patient?.admittedDoctorDTO?.employeeId
            }
          />
        );
      case "problems":
        return (
          <Problems
            patientId={patient?.patientDTO?.patientId || patient?.patientId}
            newPatientVisitId={patient?.newPatientVisitId}
          />
        );
      case "Vitals":
        return (
          <AddVitalsForm
            patientId={patient?.patientDTO?.patientId || patient?.patientId}
            newPatientVisitId={patient.newPatientVisitId}
          />
        );
      case "dischargeSummary":
        return <PatientDischargeForm patient={patient} />;
      case "Allergies":
        return (
          <Allergy
            patientId={patient?.patientDTO?.patientId || patient?.patientId}
            newPatientVisitId={patient.newPatientVisitId}
          />
        );
      case "Clinical-Document":
        return (
          <CinicalDocument
            patientId={patient?.patientDTO?.patientId || patient?.patientId}
            newPatientVisitId={patient.newPatientVisitId}
          />
        );
      case "encounte-rHistory":
        return (
          <Problems
            patientId={patient?.patientDTO?.patientId || patient?.patientId}
            newPatientVisitId={patient.newPatientVisitId}
          />
        );
        case "Infusion":
          return(
            <Infusion 
            patientId={patient?.patientDTO?.patientId || patient?.patientId}
            />
          )
        case "procedures":
          return(
            <ProcedureService/>
          )
        case "treatment":
          return(
            <TreatmentGiven/>
          )
        case "diet":
          return (
            <DietOrder/>
          )
        case "referral":
          return (
            <ReferralConsultation/>
          )
          case "nursing":
            return (
              <NurseOrder/>
            )
          case "pacrequest":
            return(
              <PACRequest/>
            )
          case "admissionslip":
            return(
              <AdmissionSlip/>
            )

      default:
        return renderDashboard();
    }
  };
  const renderDashboard = () => (
    <div className="Patient-Dashboard-main-section">
      <aside className="Patient-Dashboard-aside-section  Patient-Dashboard-left-aside">
        <div className="Patient-Dashboard-outOutDiv">
          <div className="Patient-Dashboard-outDiv">
            <div className="Patient-Dashboard-divOne">
              <div className="Patient-Dashboard-logoOne"></div>
              <button className="Patient-Dashboard-btnIpd">
                {patient.admissionId ? "IPD" : "OPD"}
              </button>
            </div>
            <span className="Patient-Dashboard-textName">{`${
              patient?.firstName ||
              patient?.patientDTO?.firstName ||
              patient?.patientFirstName ||
              patient?.patient?.firstName
            } ${
              patient?.lastName ||
              patient?.patientDTO?.lastName ||
              patient?.patientLastName
            }`}</span>
            <br></br>
            <span className="Patient-Dashboard-ageGen">{`${
              patient?.age || patient?.patientDTO?.age || patient?.patientAge
            }/${
              patient?.gender ||
              patient?.patientDTO?.gender ||
              patient?.patientGender
            }`}</span>
          </div>
          <hr></hr>
          <div className="Patient-Dashboard-divTwoDetails">
            <div className="Patient-Dashboard-ward">
              <span className="Patient-Dashboard-detailHeading">
                Ward/Bed: {patient?.wardName} / {patient?.bedNumber}
              </span>
              <span></span>
              <br></br>
            </div>
            <div className="Patient-Dashboard-attending">
              <span className="Patient-Dashboard-detailHeading">
                Attending:
              </span>
              <span>{`${
                patient?.employeeDTO?.salutation ||
                patient?.admittedDoctorDTO?.salutation ||
                patient?.doctorSalutationName
              } ${
                patient?.employeeDTO?.firstName ||
                patient?.admittedDoctorDTO?.firstName ||
                patient?.doctorFirstName
              } ${
                patient?.employeeDTO?.lastName ||
                patient?.admittedDoctorDTO?.lastName ||
                patient?.doctorLastName
              }`}</span>
            </div>
          </div>
        </div>
        <div className="Patient-Dashboard-detailsBox">
          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span
                className="Patient-Dashboard-textOne"
                onClick={() => {
                  setActiveSection("problems");
                  setPrevAction(...activeSection);
                }}
              >
                Problems
              </span>
            </div>
          </div>

          {/* <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Current Medications</span>
            </div>
          </div> */}

          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span
                className="Patient-Dashboard-textOne"
                onClick={() => {
                  setActiveSection("encounte-rHistory");
                  setPrevAction(...activeSection);
                }}
              >
                Encounter History
              </span>
            </div>
          </div>

          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Orders</span>
            </div>
          </div>

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

          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span
                className="Patient-Dashboard-textOne"
                onClick={() => {
                  setActiveSection("clinical");
                  setPrevAction(...activeSection);
                }}
              >
                Clinical
              </span>
            </div>
          </div>
          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Notes</span>
            </div>
          </div>
          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Scanned images</span>
            </div>
          </div>
          {patient.admissionId && (
            <div className="Patient-Dashboard-boxOne">
              <div className="Patient-Dashboard-textAndLogo">
                <span
                  className="Patient-Dashboard-textOne"
                  onClick={() => {
                    setActiveSection("dischargeSummary");
                    setPrevAction(...activeSection);
                  }}
                >
                  Discharge Summary
                </span>
              </div>
            </div>
          )}
          <div className="Patient-Dashboard-boxOne">
<div className="Patient-Dashboard-textAndLogo">
<span className="Patient-Dashboard-textOne"
onClick={() => {
  setActiveSection("diet");
  setPrevAction(...activeSection);
}}
>Diet Order</span>
</div>
</div>

<div className="Patient-Dashboard-boxOne">
<div className="Patient-Dashboard-textAndLogo">
<span className="Patient-Dashboard-textOne"
onClick={() => {
  setActiveSection("referral");
  setPrevAction(...activeSection);
}}
>Referral / Cross Consultation</span>
</div>
</div>

<div className="Patient-Dashboard-boxOne">
<div className="Patient-Dashboard-textAndLogo">
<span className="Patient-Dashboard-textOne"   
    onClick={() => {
    setActiveSection("nursing");
    setPrevAction(...activeSection);}}>Nursing Order</span>
</div>
</div>

<div className="Patient-Dashboard-boxOne">
<div className="Patient-Dashboard-textAndLogo">
<span className="Patient-Dashboard-textOne" 
    onClick={() => {
    setActiveSection("pacrequest");
    setPrevAction(...activeSection);}}>PAC Request</span>
</div>
</div>
<div className="Patient-Dashboard-boxOne">
<div className="Patient-Dashboard-textAndLogo">
<span className="Patient-Dashboard-textOne"  
    onClick={() => {
    setActiveSection("admissionslip");
    setPrevAction(...activeSection);}}>Admission Slip</span>
</div>
</div>

<div className="Patient-Dashboard-boxOne">
<div className="Patient-Dashboard-textAndLogo">
<span className="Patient-Dashboard-textOne">Doctor Appointment</span>
</div>
</div>

<div className="Patient-Dashboard-boxOne">
<div className="Patient-Dashboard-textAndLogo">
<span className="Patient-Dashboard-textOne">pending Cross Consultation</span>
</div>
</div>

        </div>
      </aside>

   {/* middle content */}

      <main className="Patient-Dashboard-betweenSection">
        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="🧪 Labs"
            handleAddClick={() => {
              setActiveSection("actionRecord");
              setPrevAction(activeSection);
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
                              {radiology.labTestName}
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

        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="🖼 Imaging"
            handleAddClick={() => setActiveSection("actionRecord")}
            children={
              <>
                {" "}
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
                              {radiology.imagingTypeDTO.imagingTypeName}
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
                                  <button
                                    onClick={() => ShowImagingReport(radiology)}
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

        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="⚠ Active Problems"
            handleAddClick={() => setActiveSection("problems")}
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
                          <th className="Patient-Dashboard-th">Onset Date</th>
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

        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="🧪 Medication"
            handleAddClick={() => {
              setPrevAction(activeSection);
              setActiveSection("actionRecord");
            }}
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
                          <th className="Patient-Dashboard-th">Frequency</th>
                          <th className="Patient-Dashboard-th">Last Taken</th>
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

        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="💉 Infusion"
            handleAddClick={() => {
              setPrevAction(activeSection);
              setActiveSection("Infusion");
            }}
            children={
              <>
                {" "}
                {showInfusion.length > 0 ?(
                  <div className="Patient-Dashboard-inputSection">
                    <table
                      border="1"
                      cellPadding="10"
                      cellSpacing="0"
                      className="patient-table"
                    >
                      <thead>
                        <tr>
                          <th className="Patient-Dashboard-th">Infusionnm</th>
                          <th className="Patient-Dashboard-th">Infusion Generic</th>
                          <th className="Patient-Dashboard-th">Infusion Frequency</th>
			  <th className="Patient-Dashboard-th">Drug</th>
			  <th className="Patient-Dashboard-th">Flow Rate</th>
			  <th className="Patient-Dashboard-th">InfuRemarks</th>
			  <th className="Patient-Dashboard-th">Start Date</th>
			  <th className="Patient-Dashboard-th">Start Time</th>
			  <th className="Patient-Dashboard-th">End Date</th>
			  <th className="Patient-Dashboard-th">End Time</th>

                        </tr>
                      </thead>
                      <tbody>
  {showInfusion.map((Infusion) => (
    <tr key={Infusion.sn}>
      <td className="Patient-Dashboard-td">{Infusion.infusionNm}</td>
      <td className="Patient-Dashboard-td">{Infusion.infusionGeneric}</td>
      <td className="Patient-Dashboard-td">{Infusion.infusionRoute}</td>
      <td className="Patient-Dashboard-td">{Infusion.drug}</td>
      <td className="Patient-Dashboard-td">{Infusion.flowRate}</td>
      <td className="Patient-Dashboard-td">{Infusion.infuRemarks}</td>
      <td className="Patient-Dashboard-td">{Infusion.startDate}</td>
      <td className="Patient-Dashboard-td">{Infusion.startTime}</td>
      <td className="Patient-Dashboard-td">{Infusion.endDate}</td>
      <td className="Patient-Dashboard-td">{Infusion.endTime}</td>
    </tr>
  ))}
</tbody>
                    </table>
                  </div>
                  ): "no data found"}
              </>
              
            }
          />
        </div>
        <div className="Patient-Dashboard-outOutDiv">
  <Section
    title="📝 Procedures / Services"
    handleAddClick={() => setActiveSection("procedures")}
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
                  <th className="Patient-Dashboard-th">Service Name</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => {
                  return (
                    <tr key={index}>
                      <td className="Patient-Dashboard-td">
                        {service.serviceNames.join(", ")} {/* Join the parsed service names into a comma-separated string */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          "No Data Available"
        )}
      </>
    }
  />
</div>






<div className="Patient-Dashboard-outOutDiv">
      <Section
        title="📟 Treatment Given"
        handleAddClick={() => {
          setPrevAction(activeSection);
          setActiveSection("treatment");
        }}
        children={
          <>
            {treatment.length > 0 ? (
              <div className="Patient-Dashboard-inputSection">
                <table
                  border="1"
                  cellPadding="10"
                  cellSpacing="0"
                  className="patient-table"
                >
                  <thead>
                    <tr>
                      <th className="Patient-Dashboard-th">Treatment Descriptions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatment.map((treatmentItem, index) => {
                      return (
                        <tr key={index}>
                          <td className="Patient-Dashboard-td">
                            {treatmentItem.treatmentDescriptions.join(", ")} {/* Join the array into a comma-separated string */}
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

      <aside className="Patient-Dashboard-aside-section  Patient-Dashboard-right-aside">
        <div className="Patient-Dashboard-asideDivTwo">
          <div className="Patient-Dashboard-asideNav">
            <div className="Patient-Dashboard-navTextandBtn">
              <div className="Patient-Dashboard-navVitals">
                <span className="Patient-Dashboard-spanText">Last Vitals</span>
                {/* <div className="Patient-Dashboard-twoBtns"> */}
                {/* <button className="Patient-Dashboard-oneBtnNormal">Show Graph</button> */}
                <button
                  className="Patient-Dashboard-secBtnBlue"
                  onClick={() => setActiveSection("Vitals")}
                >
                  Add Vitals
                </button>
                {/* </div> */}
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
          </div>
          <Section
            title="🚫 Allergies"
            handleAddClick={() => setActiveSection("Allergies")}
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
          />
        </div>
      </aside>
      {showRadioReport && (
        <RadiologyReportDoc
          reportData={selectedRadiology}
          onClose={() => setShowRadioReport(false)}
        />
      )}
      {ShowLabReport && (
        <LabReportResult
          reportData={selectedLabrotary}
          onClose={() => setShowLabReport(false)}
        />
      )}
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
          <div className="Patient-Dashboard-navLogoOne"></div>
          <span
            onClick={() => {
              setIsPatientOPEN(false);
            }}
          >
            {" "}
            🏠 Home
          </span>
        </div>
        <button
          className="Patient-Dashboard-btnAddBack"
          onClick={() => setActiveSection(prevAction)}
        >
          Back
        </button>
      </nav>
      {renderContent()}
    </div>
  );
};

export default PatientDashboard;
