import React, { useState } from "react";
import "./InPatientAction.css";
import VitalsPage from "../DashBoards/ClinicalVitals";
import ImagingAdd from "../DashBoards/ImagingAdd";

import ClinicalDocument from "../DashBoards/ClinicalDocuments";
import NotesTable from "../DashBoards/Notes";
import VisitTable from "../DashBoards/EncounterHistory";
import OrdersPage from "../DashBoards/LabsActiveOrder";
import PatientDischargeForm from "../DashBoards/DischargeSummary";
import DynamicInputForm from "../DashBoards/AddCompliants"; // Import the DynamicInputForm component
import ActiveProblems from "./ActiveProblems";

const PatientDashboard = ({ patient }) => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showImagingAdd, setShowImagingAdd] = useState(false);
  const [showNotesTable, setShowNotesTable] = useState(false);
  const [showOrdersPage, setShowOrdersPage] = useState(false);
  const [showActiveProblems, setShowActiveProblems] = useState(false);
  const [showDischargeSummary, setShowDischargeSummary] = useState(false);
  const [showComplaintsForm, setShowComplaintsForm] = useState(false); // State for complaints form

  const renderContent = () => {
    if (showComplaintsForm) return <DynamicInputForm />; // Render DynamicInputForm if the state is true

    switch (activeSection) {
      case "clinical":
        return <VitalsPage />;
      case "documents":
        return <ClinicalDocument />;
      case "problems":
        return <ActiveProblems onClose={() => setShowActiveProblems(false)} />;
      case "encounterHistory":
        return <VisitTable />;
      default:
        if (showImagingAdd)
          return <ImagingAdd onClose={() => setShowImagingAdd(false)} />;
        if (showNotesTable)
          return <NotesTable onClose={() => setShowNotesTable(false)} />;
        if (showOrdersPage)
          return <OrdersPage onClose={() => setShowOrdersPage(false)} />;
        if (showDischargeSummary)
          return (
            <PatientDischargeForm
              onClose={() => setShowDischargeSummary(false)}
            />
          );
        return (
          <div className="main-content">
            <aside className="">
              <div className="patientDash-patient-info">
                <div className="avatar"></div>
                <div className="ipd-tag">IPD</div>
                <h2>{patient.name}</h2>
                <p>{patient.ageSex}</p>
                <p>Hospital No: {patient.hospitalNo}</p>
                <p>Ward/Bed: {patient.wardBed}</p>
                <p>Attending: {patient.providerName}</p>
              </div>

              <nav>
                <ul>
                  <li>Patient Overview</li>
                  <li
                    onClick={() => {
                      setActiveSection("problems");
                      setShowActiveProblems(true);
                    }}
                  >
                    Problems
                  </li>
                  <li onClick={() => setActiveSection("encounterHistory")}>
                    Encounter History
                  </li>
                  <li>Orders</li>
                  <li onClick={() => setActiveSection("documents")}>
                    Clinical Documents
                  </li>
                  <li onClick={() => setActiveSection("clinical")}>Clinical</li>
                  <li onClick={() => setShowNotesTable(true)}>Notes</li>
                  <li onClick={() => setShowDischargeSummary(true)}>
                    Discharge Summary
                  </li>
                </ul>
              </nav>
            </aside>

            <main>
              <section className="labs">
                <h3>🧪 Labs</h3>
                <button
                  className="add-button"
                  onClick={() => setShowOrdersPage(true)}
                >
                  + Add
                </button>
                <div className="no-records">No Records Found</div>
              </section>

              <section className="imaging">
                <h3>🖼 Imaging</h3>
                <button
                  className="add-button"
                  onClick={() => setShowImagingAdd(true)}
                >
                  + Add
                </button>
                <div className="no-records">No Records Found</div>
              </section>

              <section className="active-problems">
                <h3>⚠ Active Problems</h3>
                <button
                  className="add-button"
                  onClick={() => setShowActiveProblems(true)}
                >
                  + Add
                </button>
                <div className="no-records">No Records Found</div>
              </section>

              <section className="medications">
                <h3>💊 Medications</h3>
                <button className="add-button">+ Add</button>
                <table className="inpatient-table">
                  <tbody>
                    <tr>
                      <td>.OSMOLAX</td>
                      <td>0 times a day</td>
                      <td>Start Date- 02.08.2024</td>
                    </tr>
                    <tr>
                      <td>ACECLOFENAC + PARACETAMOL TABS</td>
                      <td>0 times a day</td>
                      <td>Start Date- 12.08.2024</td>
                    </tr>
                    <tr>
                      <td>ACECLOFENAC + PARACETAMOL TABS</td>
                      <td>3 times a day</td>
                      <td>Start Date- 13.08.2024</td>
                    </tr>
                    <tr>
                      <td>ACETAZOLAMIDE 250MG</td>
                      <td>2 times a day</td>
                      <td>Start Date- 13.08.2024</td>
                    </tr>
                    <tr>
                      <td>ACETAZOLAMIDE 250MG</td>
                      <td>3 times a day</td>
                      <td>Start Date- 13.08.2024</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </main>

            <aside className="right-panel">
              <section className="last-vitals">
                <h3>⏱ Last Vitals</h3>
                {/* <button className="show-graph">Show Graph</button> */}
                <button
                  className="add-vitals"
                  onClick={() => setShowActiveProblems(true)}
                >
                  + Add Vitals
                </button>
                <div className="no-records">No Records Found</div>
              </section>

              <section className="chief-complaints">
                <h3>🗣 Chief Complaints</h3>
                <button
                  className="new-complaint"
                  onClick={() => setShowComplaintsForm(true)}
                >
                  + New Complaint
                </button>{" "}
                {/* Toggle the form */}
                <div className="complaint">
                  Coughing
                  <button className="remove-complaint">❌</button>
                </div>
              </section>

              <section className="allergies">
                <h3>🚫 Allergies</h3>
                <button className="add-button">+ Add</button>
                <div className="no-records">No Records Found</div>
              </section>
            </aside>
          </div>
        );
    }
  };

  return (
    <div className="patient-dashboard">
      <header>
        <button className="home-button">🏠 Home</button>
      </header>
      {renderContent()}
    </div>
  );
};

export default PatientDashboard;
