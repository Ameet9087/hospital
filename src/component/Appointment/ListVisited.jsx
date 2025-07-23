import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, FormControl, InputGroup } from "react-bootstrap";
import "./ListVisited.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { useNavigate } from "react-router-dom";
import BarCode from "react-barcode";

const ListVisited = () => {
  const [listVisit, setListVisit] = useState([]);
  const [search, setSearch] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [stickerData, setStickerData] = useState(null);
  const [printCount, setPrintCount] = useState(1);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchVisitPatient = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/new-patient-visits`
        );
        setListVisit(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVisitPatient();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleUpdatePatient = (patient) => {
    navigate("/checkIn", { state: { patient: patient } });
  };
  const handleGenerateSticker = (patient) => {
    setStickerData(patient);
    setOpenStickerPopup(true);
  };

  const handlePrintTable = () => {
    const tableToPrint = tableRef.current;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document.open();
    doc.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 8px;
              text-align: left;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${tableToPrint.outerHTML}
        </body>
      </html>
    `);
    doc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  const handleStickerPrint = () => {
    let stickersContent = "";
    for (let i = 0; i < printCount; i++) {
      const content = document.getElementById(
        "new-visit-sticker-data"
      ).innerHTML;
      stickersContent += `<div style='display:flex; flex-direction:column; align-items:center; border:1px dashed black; margin-bottom: 10px; font-weight:bold; padding:10px; font-family:sans-serif;'>${content}</div>`;
    }

    const printWindow = window.open("", "", "height=600,width=800");

    printWindow.document.write(
      "<html><head><title>Print Sticker</title></head><body>"
    );
    printWindow.document.write(
      "<div style='display:flex; gap:10px; justify-content:center; flex-wrap:wrap;'>"
    );
    printWindow.document.write(stickersContent);
    printWindow.document.write("</div>");
    printWindow.document.write("</body></html>");

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="appointment-list">
      <div
        className="d-flex"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <div>
          <h5>Patient Visit List</h5>
          <p>
            * Followup is valid up to 10 days of last visit with same doctor
          </p>
          <p>* Refer is valid up to 7 days of last visit</p>
        </div>
      </div>

      <div className="appointment-visited-d-flex">
        <div className="appointment-visited-search-bar">
          <input
            type="text"
            placeholder="Search (Atleast 3 characters)"
            value={search}
            onChange={handleSearchChange}
          />
          <Button className="reload-button">Reload</Button>
        </div>
        <Button onClick={handlePrintTable} variant="primary">
          Print
        </Button>
      </div>
      <br></br>
      <table className="patientList-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Date Time",
              "Patient No",
              "Name",
              "Phone",
              "Age",
              "Department",
              "Doctor",
              "Visit Type",
              "Day",
              "Queue",
              "Actions",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className={`resizable-th ${header === "Actions" ? "no-print" : ""
                  }`}
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
          {listVisit
            .filter(
              (visit) =>
                (visit?.firstName || visit?.middleName || visit?.lastName)
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                visit?.newPatientVisitId.toString().includes(search)
            )
            ?.map((visit, index) => (
              <tr key={index}>
                <td>
                  {visit.visitDate} {visit.visitTime}
                </td>
                <td>{visit.newPatientVisitId}</td>
                <td>
                  {visit.firstName} {visit.middleName} {visit.lastName}
                </td>
                <td>{visit.phoneNumber}</td>
                <td>
                  {visit.age} {visit.ageUnit} / {visit.gender}
                </td>
                <td>{visit.department}</td>
                <td>
                  {visit?.employeeDTO?.salutation}{" "}
                  {visit?.employeeDTO?.firstName} {visit?.employeeDTO?.lastName}
                </td>
                <td>{visit.visitType}</td>
                <td>
                  {Math.floor(
                    (new Date() - new Date(visit?.visitDate)) /
                    (1000 * 60 * 60 * 24)
                  )}{" "}
                  Days
                </td>
                <td>{visit?.patientQueue?.patientQueueId}</td>
                <td>
                  {/* <button variant="primary" size="sm">
                    refer
                  </button> */}
                  <button
                    onClick={() => handleUpdatePatient(visit)}
                    className="list-visit-tableBtn no-print"
                  >
                    Update
                  </button>{" "}
                  <button
                    onClick={() => handleGenerateSticker(visit)}
                    className="list-visit-tableBtn no-print"
                  >
                    sticker
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {openStickerPopup && (
        <React.Fragment>
          <div className="listVisitPatientStickerPopup">
            <div className="listVisitPatientStickerContainer">
              <button
                onClick={() => setOpenStickerPopup(false)}
                className="listVisitPatientStickerPopupCloseBTN"
              >
                X
              </button>
              <div className="listVisitPatientStickerPopup-grid">
                <div className="listVisitPatientStickerPopup-grid1">
                  <table>
                    <thead>
                      <th>Patient Name</th>
                      <th>Age/Sex</th>
                      <th>Visit Type</th>
                      <th>Contact</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {stickerData.firstName} {stickerData.middleName}{" "}
                          {stickerData.lastName}
                        </td>
                        <td>
                          {stickerData.age} {stickerData.ageUnit} /{" "}
                          {stickerData.gender}
                        </td>
                        <td>{stickerData.visitType}</td>
                        <td>{stickerData.phoneNumber}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="listVisitPatientStickerPopup-grid2">
                  <div
                    id="new-visit-sticker-data"
                    className="listVisitPatientSticker"
                  >
                    <span>
                      {stickerData.firstName} {stickerData.lastName}{" "}
                      {stickerData.age} {stickerData.ageUnit} /{" "}
                      {stickerData.gender}
                    </span>
                    <span>
                      <BarCode
                        value={stickerData.newPatientVisitId}
                        height={20}
                        width={2}
                      />
                    </span>
                    <span>
                      {stickerData.visitDate} {stickerData.visitTime}
                    </span>
                  </div>
                  <div className="listVisitPatientStickerPopupPrint">
                    <label>
                      Number of Print :
                      <input
                        type="number"
                        onChange={(e) => setPrintCount(e.target.value)}
                        className=""
                        min={1}
                      />
                    </label>
                    <button
                      onClick={handleStickerPrint}
                      className="StickerPopupPrintBTN"
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ListVisited;
