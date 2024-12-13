import React, { useEffect, useState } from "react";
import "./labResult.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const Lab2 = () => {
  const [selectedSignatory, setSelectedSignatory] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const [labResult, setLabResult] = useState(null);
  const location = useLocation();
  const { labRequestId } = location.state;

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/lab-result/by-labRequest?labRequestId=${labRequestId}`
    )
      .then((res) => res.json())
      .then((res) => setLabResult(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSignatoryChange = (event) => {
    setSelectedSignatory(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value); // Update comment state when input changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if a signatory is selected
    if (!selectedSignatory) {
      alert("Please select a signatory.");
      return;
    }

    // Prepare the data for updating the lab result
    const updatedLabResult = {
      verifyBy: selectedSignatory,
      verifyById: 0,
      comments: comment,
      isVerified: "Yes",
      verifiedDate: new Date().toLocaleTimeString().split("-")[0],
    };

    try {
      // Call the API to update the lab result
      await axios.put(
        `${API_BASE_URL}/lab-result/update/${labResult.labResultId}`,
        updatedLabResult
      );
      console.log("Lab result updated successfully!");

      // Trigger print after successful update
      handlePrint();
    } catch (err) {
      console.error("Error updating lab result:", err);
    }
  };

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
    navigate("/add-results");
  };

  const handleBackClick = () => {
    navigate("/addResultForm");
  };

  return (
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
                {/* <th>Reference</th>
                <th>Method</th> */}
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
          <textarea
            value={comment}
            onChange={handleCommentChange}
            rows={5}
            placeholder="Enter comments here..."
          />
          <p className="lab-disclaimer">
            This laboratory report must be integrated in conjunction with
            clinical history of the patient by a clinician test
          </p>
        </div>

        




     

      {/* <div className="lab-signatory-section">
        <div className="lab-signatory">
          <input type="text" placeholder="Not found" />
        </div>
        <div className="lab-signatory">
          <input type="text" placeholder="BMUTHONI" />
        </div>
        <div className="lab-signatory">
          <input type="text" placeholder="Not found" />
        </div>
      </div> */}
    
    </div>


      
    
   </div>
   <div className="lab-signatories">
      
        <p>Select Signatories:</p>
        <select value={selectedSignatory} onChange={handleSignatoryChange}>
          <option value="">Select a signatory</option>
          <option value="Dr. VICTOR OCHIENG OKECH">
            Dr. VICTOR OCHIENG OKECH
          </option>
        </select>
      </div>
      <div className="lab-update">
        <button onClick={handleSubmit} className="lab-print-button">
          Update Signatories and Print
        </button>
      </div> 
   </div>

  );
};

export default Lab2;
