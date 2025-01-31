import React, { useRef } from "react";
import "./AdmissionFormPrint.css";
import { useReactToPrint } from "react-to-print";

const AdmissionFormPrint = ({ patient }) => {
  console.log(patient);
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;

    // Create a new iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.top = "-10000px"; // Move out of view
    document.body.appendChild(iframe);

    // Write the printable content into the iframe's document
    const frameDoc = iframe.contentWindow?.document || iframe.contentDocument;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print</title>
          <style>
        .AdmissionFormPrint-subContainer{
          background-color: white;
          margin-top: 50px;
          font-weight: bold;
        }
      input{
        border: none !important;
        outline:none !important;
      }
  .AdmissionFormPrint-section{
    margin-left: 5px;
    margin-right: 5px; 
  }


  .AdmissionFormPrint-heading{
    text-align: center;
  }
.AdmissionFormPrint-subContainer{
    display: flex;
    flex-direction: column;
    justify-self: center;
    gap: 5px;
    margin-bottom:10px;
}
.AdmissionFormPrint-section{
    display: flex;
    justify-content: space-between;
    
}
    .AdmissionFormPrint-mainSection{
      border:1px solid black;
      margin-bottom:10px;
    }
.AdmissionFormPrint-mainSection-table{
    display: flex;
    justify-content: space-around;
    padding: 5px;
   
}
.AdmissionFormPrint-mainSection-table table{
  width: 99%;
  border-collapse: collapse;
  background: #ccc;
}
.AdmissionFormPrint-mainSection-table table tr th{
    text-align: start;
    width: 50%;
} 
.AdmissionFormPrint-mainSection-subtable{
    width: 100%;
}
.AdmissionFormPrint-mainSection-subtable p{
    width: 99%;
    margin-top: 5px;
    text-align: center;
    font-weight: bold;
}
.AdmissionFormPrint-mainSection-subtable-joint{
    padding: 5px;
}
.AdmissionFormPrint-mainSection-fiiledByDoctor{
    display: flex;
    justify-content: space-between;

    margin: 10px;
}
.AdmissionFormPrint-mainSection-fiiledByDoctor-section{
    width: 80%;
}
.AdmissionFormPrint-mainSection-fiiledByDoctor-section-icd{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.AdmissionFormPrint-mainSection-fiiledByDoctor-a{
  align-self: center;
    
}
.AdmissionFormPrint-mainSection-fiiledByDoctor-a a{
    color: black;
      
 }
.AdmissionFormPrint-consent-form-container {
    margin: 20px;
    font-family: Arial, sans-serif;
}
  
.AdmissionFormPrint-consent-form-heading {
    text-align: center;
    margin-bottom: 20px;
}
  
.AdmissionFormPrint-consent-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 10px;
    page-break-before: always;
}
.AdmissionFormPrint-form-section label {
    font-weight: bold;
    margin-bottom: 8px;
}
  
.AdmissionFormPrint-checkbox-group {
  display: flex;
  gap: 5px;
}
  
.AdmissionFormPrint-checkbox-group input {
    margin-right: 5px;
}
  
.AdmissionFormPrint-consent-details {
    margin: 15px 0;
    display: flex;
}
  
.AdmissionFormPrint-consent-details h3 {
    margin-bottom: 5px;
    font-size: 18px;
}
  
.AdmissionFormPrint-consent-details p {
    font-size: 14px;
    width: 68%;
    margin-left: 25px;
   
}
.AdmissionFormPrint-form-section{
    display: flex;
}
.AdmissionFormPrint-consent-form-checkbox{
    margin-left: 10px;
}
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    frameDoc.close();

    // Trigger print on the iframe
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    // Remove the iframe after printing
    document.body.removeChild(iframe);
  };

  if (!patient) {
    return <div>Loading...</div>;
  }
  return (
    <div className="AdmissionFormPrint-Container">
      <div ref={printRef} className="AdmissionFormPrint-subContainer">
        <h2 className="AdmissionFormPrint-heading">Admission Form</h2>
        <div className="AdmissionFormPrint-mainSection">
          <div className="AdmissionFormPrint-section">
            <div className="AdmissionFormPrint-subsection">
              <label>Uhid : </label>
              <input
                type="text"
                value={patient?.patient?.patient?.uhid || ""}
                placeholder="UHID"
              />
            </div>
            <div className="AdmissionFormPrint-subsection">
              <label>Date: </label>
              <input
                type="text"
                value={patient?.admissionDate || ""}
                placeholder="Date"
              />
            </div>
          </div>
          <div className="AdmissionFormPrint-section">
            <div className="AdmissionFormPrint-subsection">
              <label>Patient Name :</label>
              <input
                type="text"
                value={
                  `${patient?.patient?.patient?.firstName} ${patient?.patient?.patient?.middleName} ${patient?.patient?.patient?.lastName}` ||
                  ""
                }
                placeholder="Patient Name"
              />
            </div>
            <div className="AdmissionFormPrint-section">
              <div className="AdmissionFormPrint-subsection">
                <label>Age :</label>
                <input
                  type="text"
                  value={patient?.patient?.patient?.age || ""}
                  placeholder="Age"
                />
              </div>
              <div className="AdmissionFormPrint-subsection">
                <label>Sex : </label>
                <input
                  type="text"
                  value={patient?.patient?.patient?.gender || ""}
                  placeholder="Sex"
                />
              </div>
            </div>
          </div>
          <div className="AdmissionFormPrint-section">
            <div className="AdmissionFormPrint-subsection">
              <label>D.O.B :</label>
              <input
                type="date"
                value={patient?.patient?.patient?.patient?.dateOfBirth || ""}
                placeholder="D.O.B"
              />
            </div>
            <div className="AdmissionFormPrint-subsection">
              <label>Marital Status :</label>
              <input
                type="text"
                value={patient?.patient?.patient?.maritalStatus || ""}
                placeholder="Marital Status"
              />
            </div>
            <div className="AdmissionFormPrint-subsection">
              <label>Nationality : </label>
              <input
                type="text"
                value={patient?.patient?.patient?.country || ""}
                placeholder="Nationality"
              />
            </div>
          </div>
        </div>

        <div className="AdmissionFormPrint-mainSection-table">
          <div className="AdmissionFormPrint-mainSection-subtable">
            <div>
              <div>
                <table border={1}>
                  <tbody>
                    <tr>
                      <th>Pin Code</th>
                      <td>{patient?.patient?.patient?.pinCode || ""}</td>
                    </tr>
                    <tr>
                      <th>Mobile No</th>
                      <td>{patient?.patient?.patient?.mobileNumber || ""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p>Next Of Kin/Brought By Details</p>
                <table border={1}>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{patient?.patient?.patient?.relationName || ""}</td>
                    </tr>
                    <tr>
                      <th>Relationship</th>
                      <td>{patient?.patient?.patient?.relation || ""}</td>
                    </tr>
                    <tr>
                      <th>Phone No</th>
                      <td>{patient?.patient?.patient?.contactNumber || ""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="AdmissionFormPrint-mainSection-subtable-input">
                <label>Translator Required :</label>
                <input type="text" placeholder="Translator Required" />
              </div>
              <div className="AdmissionFormPrint-mainSection-subtable-input">
                <label>Policy No. & Validity :</label>
                <input
                  type="text"
                  value={patient?.patient?.patient?.policyNumber || ""}
                  placeholder="Policy No. & Validity"
                />
              </div>
              <div className="AdmissionFormPrint-mainSection-subtable-input">
                <label>Referred By :</label>
                <input
                  type="text"
                  placeholder="Referred By"
                  value={patient?.referredDoctor?.doctorName}
                />
              </div>
            </div>
          </div>
          <div className="AdmissionFormPrint-mainSection-subtable">
            <p>Admission Details</p>
            <div>
              <table border={1}>
                <tbody>
                  <tr>
                    <th>I.P No</th>
                    <td>{patient?.ipAdmmissionId || ""}</td>
                  </tr>
                  <tr>
                    <th>Date And Time</th>
                    <td>
                      {patient?.admissionDate || ""}{" "}
                      {patient?.admissionTime || ""}
                    </td>
                  </tr>
                  <tr>
                    <th>Bed No</th>
                    <td>{patient.roomDetails?.bedDTO?.bedNo || ""}</td>
                  </tr>
                  <tr>
                    <th>Doctor Number</th>
                    <td>
                      {patient?.admissionUnderDoctorDetail?.consultantDoctor
                        ?.mobileNumber || ""}
                    </td>
                  </tr>
                  <tr>
                    <th>Department</th>
                    <td>
                      {patient?.admissionUnderDoctorDetail?.consultantDoctor
                        ?.specialisationId?.specialisationName || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <p>Payment Details</p>
              <p>Cash / Credit / Credit Card / Insurance / Employer</p>
              <div className="AdmissionFormPrint-mainSection-subtable-input">
                <label>Eligibility :</label>
                <input type="text" placeholder="Eligibility" />
              </div>
              <div className="AdmissionFormPrint-mainSection-subtable-input">
                <label>Approval Status :</label>
                <input type="text" placeholder="Approval Status" />
              </div>
              <div className="AdmissionFormPrint-mainSection-subtable-input">
                <label>Billing Category :</label>
                <input type="text" placeholder="Billing Category" />
              </div>
            </div>
          </div>
        </div>

        <div className="AdmissionFormPrint-mainSection-subtable-joint">
          <div>
            <label>Joint Consultant(S) :</label>
            <input
              type="text"
              value={
                `${patient?.admissionUnderDoctorDetail?.firstCoConsultant?.salutation} ${patient?.admissionUnderDoctorDetail?.firstCoConsultant?.doctorName}` ||
                ""
              }
              placeholder="Joint Consultant(S)"
            />
          </div>
          <div>
            <label>Remarks :</label>
            <input type="text" placeholder="Remarks" />
          </div>
        </div>

        <div className="AdmissionFormPrint-mainSection-fiiledByDoctor-a">
          <a href="#">To Be Filled By The Doctor</a>
        </div>

        <div className="AdmissionFormPrint-mainSection-fiiledByDoctor">
          <div className="AdmissionFormPrint-mainSection-fiiledByDoctor-section">
            <div>
              <label>Final Diagnosis :</label>
              <input type="text" placeholder="Final Diagnosis" />
            </div>
            <div>
              <label>Procedural Surgery :</label>
              <input type="text" placeholder="Procedural Surgery" />
            </div>
          </div>
          <div className="AdmissionFormPrint-mainSection-fiiledByDoctor-section-icd">
            <p>ICD CODE</p>
          </div>
        </div>

        <div className="AdmissionFormPrint-consent-form-checkbox">
          <div className="AdmissionFormPrint-form-section">
            <label>Discharge Status:</label>
            <div className="AdmissionFormPrint-checkbox-group">
              <div className="AdmissionFormPrint-checkbox-group-sub-div">
                <input type="checkbox" id="recovered" />
                <label htmlFor="recovered">Recovered</label>
              </div>
              <div className="AdmissionFormPrint-checkbox-group-sub-div">
                <input type="checkbox" id="improved" />
                <label htmlFor="improved">Improved</label>
              </div>
              <div className="AdmissionFormPrint-checkbox-group-sub-div">
                <input type="checkbox" id="dama" />
                <label htmlFor="dama">DAMA</label>
              </div>
              <div className="AdmissionFormPrint-checkbox-group-sub-div">
                <input type="checkbox" id="expired" />
                <label htmlFor="expired">Expired</label>
              </div>
              <div className="AdmissionFormPrint-checkbox-group-sub-div">
                <input type="checkbox" id="expired48hrs" />
                <label htmlFor="expired48hrs">Expired 48 hrs</label>
              </div>
            </div>
          </div>
          <label>Adding Doctor Signature :</label>
          <input type="text" />
        </div>
        {/* Consent Form */}
        <form className="AdmissionFormPrint-consent-form">
          <h3 className="AdmissionFormPrint-consent-form-heading">
            Consent Form
          </h3>
          <div className="AdmissionFormPrint-consent-details">
            <h3>1. Personal Valuables :</h3>
            <p>
              It is understood that during hospitalization, we are not supposed
              to bring any valuables to the hospital. The hospital maintains a
              SAFE for the safe keeping of money and valuables. The hospital
              shall not be liable for the loss or damage to any other valuables
              unless placed therein.
            </p>
          </div>

          <div className="AdmissionFormPrint-consent-details">
            <h3>2. Financial Agreement :</h3>
            <p>
              The undersigned agrees whether he/she signs as agent or as a
              patient, that in consideration of the services to be rendered to
              the patient, he hereby individually obligates himself to pay the
              hospital bill. Furthermore, it is clearly understood by the
              undersigned that the running bill of the hospital should be
              settled within the specified period of time during the stay at the
              hospital. The undersigned undertakes to pay the amount due to the
              hospital prior to discharge of the patient. The refunds, if any,
              are made by cheque only and in the patient’s name. They are
              processed within 7 days of discharge and can be sent by courier if
              required.
            </p>
          </div>

          <div className="AdmissionFormPrint-consent-details">
            <h3>3. Inpatient Guidelines :</h3>
            <p>
              The patient guide has been received, read, and understood by me. I
              shall abide by the same.
            </p>
          </div>

          <div className="AdmissionFormPrint-consent-details">
            <h3>4. Cost and Outcome :</h3>
            <p>
              I have been explained on the proposed care, expected outcome, and
              expected cost.
            </p>
          </div>
        </form>
      </div>

      <button onClick={handlePrint} className="AdmissionPrint-btn">Download PDF</button>
    </div>
  );
};

export default AdmissionFormPrint;
