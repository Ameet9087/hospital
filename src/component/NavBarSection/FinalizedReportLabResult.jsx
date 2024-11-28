import React, { useEffect, useState } from "react";
import "./labResult.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const FinalizedReportLabResult = ({ data, setShowLabResult }) => {
  const navigate = useNavigate();
  const [labResult, setLabResult] = useState(data);

  useEffect(() => {
    setLabResult(data);
  }, []);

  const handlePrint = async () => {
    const printContents = document.querySelector(".lab-container2").innerHTML;
    const printWindow = window.open("", "_blank");

    // Create a new document for the print window and inject the content
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Lab Result</title>
          <style>
            /* Add the necessary CSS for printing */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
           .lab-container2{
            border: 0.5px solid black;
            background-color: white;
            margin: 10px;
            padding: 20px;
             overflow-x: scroll;
            }
          .lab-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            }
          .lab-circle{
          border-radius: 50%;
            align-items: center;
            justify-content: center;
            border: 4px solid #00c9c0;
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

.lab-plus {
  /* position: absolute; */
  font-size: 40px;
  font-weight: bolder;
  margin-top: -10px;
  /* left: 50%; */
  /* top: 50%; */
}

.lab-text {
  font-size: 20px;
  font-weight: bold;
  
}

.lab-hospital {
  font-size: 25px;
  font-weight: bold;
  justify-content: center;  
  align-items: center;
}

.lab-contact {
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
.lab-patient-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border: 0.5px solid black;
  background-color: white;
  padding: 5px;
}
.lab-patient-details p{
  margin: 0px;
}

.lab-table-container {
  margin-bottom: 20px;
}
  table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
          .lab-comments {
            margin-top: 20px;
          }
            .lab-comments textarea{
              border:none;
              width:100%;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close(); // Ensure the content is finished loading
    printWindow.focus(); // Focus on the new window for printing
    printWindow.print(); // Trigger the print dialog
    printWindow.close();
    const response = await axios.put(
      `${API_BASE_URL}/lab-result/update-isPrinted/${data.labResultId}`
    );
    if (response.status === 200) {
      setShowLabResult(false);
    }
  };

  const handleBackClick = () => {
    setShowLabResult(false);
  };

  return (
    <div className="lab-page2">
      <button className="back-button" onClick={handleBackClick}>
        ← Back To Grid
      </button>
      <div className="lab-container2" id="printLabResult">
        <header>
          <div className="lab-logo">
            <div className="lab-circle">
              <span className="lab-plus">+</span>
            </div>
            <span className="lab-text">Hims Health</span>
          </div>
          <div className="lab-hospital">
            <span>Hims Health Hospital</span>
          </div>
        </header>
        <div className="lab-patient-details">
          <div>
            <p>
              Name:{" "}
              {labResult?.labRequestDTO?.newPatientVisitDTO?.firstName ||
                labResult?.labRequestDTO?.patientDTO?.firstName}{" "}
              {labResult?.labRequestDTO?.newPatientVisitDTO?.lastName ||
                labResult?.labRequestDTO?.patientDTO?.lastName}
            </p>
            <p>
              Address:{" "}
              {labResult?.labRequestDTO?.newPatientVisitDTO?.address ||
                labResult?.labRequestDTO?.patientDTO?.address}
            </p>
            <p>
              Prescriber Name:{" "}
              {labResult?.labRequestDTO?.prescriber?.salutation +
                labResult?.labRequestDTO?.prescriber?.firstName +
                " " +
                labResult?.labRequestDTO?.prescriber?.lastName ||
                labResult?.labRequestDTO?.patientDTO?.address}
            </p>
            <p>Lab No: {labResult?.labRequestDTO?.runNumber}</p>
          </div>
          <div>
            <p>
              Patient No.:{" "}
              {labResult?.labRequestDTO?.newPatientVisitDTO
                ?.newPatientVisitId ||
                labResult?.labRequestDTO?.patientDTO?.patientId}
            </p>
            <p>
              Age/Sex:{" "}
              {labResult?.labRequestDTO?.newPatientVisitDTO?.age ||
                labResult?.labRequestDTO?.patientDTO?.age}{" "}
              {"Y / "}
              {labResult?.labRequestDTO?.newPatientVisitDTO?.gender ||
                labResult?.labRequestDTO?.patientDTO?.gender}
            </p>
            <p>
              Collection Date: {labResult?.labRequestDTO?.sampleCollectedDate}{" "}
              {labResult?.labRequestDTO?.sampleCollectedTime}
            </p>
            <p>
              Reporting Date: {labResult?.labResultCreatedDate}{" "}
              {labResult?.labResultCreatedTime}
            </p>
          </div>
        </div>
        <div className="lab-table-container">
          <table>
            <thead>
              <tr>
                <th colSpan="3">BIOCHEMISTRY REPORT</th>
              </tr>
              <tr>
                <th>Tests</th>
                <th>Findings</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {labResult?.componentsJson != null &&
                JSON.parse(labResult?.componentsJson).map((item) => (
                  <tr>
                    <td>{item.componentName}</td>
                    <td>{item.value}</td>
                    <td>{item.unit}</td>
                    {/* <td>{item.}</td>
                    <td></td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="lab-comments">
          <p>Comments:</p>
          <textarea value={labResult?.comments} rows={5} disabled />
          <p className="lab-disclaimer">
            This laboratory report must be integrated in conjunction with
            clinical history of the patient by a clinician test
          </p>
        </div>
      </div>
      <div className="lab-update">
        <button onClick={handlePrint} className="lab-print-button">
          Print
        </button>
      </div>
    </div>
  );
};

export default FinalizedReportLabResult;
