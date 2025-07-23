import React, { useEffect, useState } from "react";
import "./LabReportResult.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { FloatingTextarea } from "../../FloatingInputs";

const LabReportResult = ({ reportData }) => {
  const [selectedSignatory, setSelectedSignatory] = useState(null);
  const navigate = useNavigate();
  const [labResult, setLabResult] = useState(null);
  const location = useLocation();
  const { labRequestId } = location.state || {};
  const [labDoctors, setlabDoctors] = useState([]);

  const fetchResult = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/lab-result/by-labRequest?labRequestId=${reportData?.labRequestId}&status=Approved`
    );
    console.log(response.data);

    setLabResult(response.data);
  };

  const fetchAllLabDoctors = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/employees/department?departmentName=Laboratory`
    );
    setlabDoctors(response.data);
  };

  useEffect(() => {
    fetchAllLabDoctors();
    fetchResult();
  }, []);

  const setDoctorAsSignatory = () => {
    if (labResult && labResult.verifyById) {
      const doctor = labDoctors.find(
        (doc) => doc.employeeId === labResult.verifyById
      );
      if (doctor) {
        setSelectedSignatory(doctor);
      }
    }
  };

  useEffect(() => {
    setDoctorAsSignatory();
  }, [labResult, labDoctors]);

  const handlePrint = () => {
    const printContents = document.querySelector(".lab-container2").innerHTML;
    const printWindow = window.open("", "_blank");

    // Create a new document for the print window and inject the content
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Lab Result</title>
          <style>
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
  font-size: 40px;
  font-weight: bolder;
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
  };

  const handleBackClick = () => {
    navigate("/laboratory/addResultForm");
  };

  return (
    <>
      <div className="lab-container-page">
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
                  {labResult?.labRequest?.inPatient?.patient?.firstName ||
                    labResult?.labRequest?.outPatient?.patient?.firstName}{" "}
                  {labResult?.labRequest?.inPatient?.patient?.lastName ||
                    labResult?.labRequest?.outPatient?.patient?.lastName}
                </p>
                <p>
                  Address:{" "}
                  {labResult?.labRequest?.inPatient?.patient?.address ||
                    labResult?.labRequest?.outPatient?.patient?.address}
                </p>
                <p>
                  Prescriber Name:{" "}
                  {labResult?.labRequest?.prescriber?.salutation +
                    labResult?.labRequest?.prescriber?.doctorName +
                    " " +
                    labResult?.labRequest?.prescriber?.lastName ||
                    labResult?.labRequest?.prescriber?.address}
                </p>
                <p>
                  Lab No:{" "}
                  {labResult?.labRequest?.sampleCollections?.map(
                    (labTest, index) => (
                      <span key={index}>
                        {index > 0 ? " , " : ""}
                        {labTest.runNumber}
                      </span>
                    )
                  )}
                </p>
              </div>
              <div>
                <p>
                  Patient No.:{" "}
                  {labResult?.labRequest?.inPatient?.inPatientId ||
                    labResult?.labRequest?.outPatient?.outPatientId ||
                    "N/A"}
                  {" / "}
                  {labResult?.labRequest?.inPatient?.patient?.uhid ||
                    labResult?.labRequest?.outPatient?.patient?.uhid ||
                    "N/A"}
                </p>
                <p>
                  Age/Sex:{" "}
                  {labResult?.labRequest?.inPatient?.patient?.age ||
                    labResult?.labRequest?.outPatient?.patient?.age ||
                    "N/A"}{" "}
                  {"Y / "}
                  {labResult?.labRequest?.inPatient?.patient?.gender ||
                    labResult?.labRequest?.outPatient?.patient?.gender ||
                    "N/A"}
                </p>
                <p>
                  Collection Date:{" "}
                  {labResult?.labRequest?.sampleCollections?.[0]
                    ?.collectionDate || "N/A"}
                </p>
                <p>
                  Reporting Date: {labResult?.labResultCreatedDate || "N/A"}{" "}
                  {labResult?.labResultCreatedTime || "N/A"}
                </p>
              </div>
            </div>
            <div className="lab-table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan="4">BIOCHEMISTRY REPORT</th>
                  </tr>
                  <tr>
                    <th>Tests</th>
                    <th>Findings</th>
                    <th>Unit</th>
                    <th>Range</th>
                  </tr>
                </thead>
                <tbody>
                  {labResult?.labTestComponentMappings?.length > 0 ? (
                    labResult.labTestComponentMappings.map((test, testIndex) =>
                      test?.labResultComponentResults?.map(
                        (item, itemIndex) => (
                          <tr key={`${testIndex}-${itemIndex}`}>
                            <td>
                              {item?.labComponent?.componentName || "N/A"}
                            </td>
                            <td>{item?.resultValue || "N/A"}</td>
                            <td>{item?.labComponent?.unit || "N/A"}</td>
                            <td>
                              {item?.labComponent?.componentRange || "N/A"}
                            </td>
                          </tr>
                        )
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="4">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="lab-comments">
              <FloatingTextarea
              label={"Comment"}
              value={labResult?.comments}
              rows={5}
              />
              {selectedSignatory && (
                <div className="selected-doctor-info">
                  <div className="doctor-info-sig">
                    <img
                      src={`data:image/jpeg;base64,${selectedSignatory?.signatureImage}`}
                      alt={`${selectedSignatory?.firstName} ${selectedSignatory?.lastName}`}
                      style={{width:100,height:100}}
                    />

                    <p>
                      {selectedSignatory?.salutation}{" "}
                      {selectedSignatory?.firstName}{" "}
                      {selectedSignatory?.lastName}
                    </p>
                  </div>
                </div>
              )}
              <p className="lab-disclaimer">
                This laboratory report must be integrated in conjunction with
                clinical history of the patient by a clinician test
              </p>
            </div>
          </div>
          <div className="lab-update-finalBtn">
            <button onClick={handlePrint} className="lab-print-button">
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabReportResult;
