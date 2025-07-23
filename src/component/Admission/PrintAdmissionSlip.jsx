import React from "react";
import "./printAdmissinSlip.css";

const PrintAdmissionSlip = ({ patient, setShowOptionWindow }) => {
  const handlePrint = (e) => {
    e.preventDefault();

    const printContent = `
          <div class="admissionSlip-container">
            <div class="admissionSlip-slip">
              <h2 class="admissionSlip-title">Patient Admission Slip</h2>
              <div class="admissionSlip-row">
                <span class="admissionSlip-label">
                  Patient: ${patient.patientDTO?.firstName} ${
      patient.patientDTO?.middleName || ""
    } ${patient.patientDTO?.lastName || ""} ${patient.patientDTO?.age} ${
      patient.patientDTO?.ageUnit
    } / ${patient.patientDTO?.gender}
                </span>
              </div>
              <div class="admissionSlip-row">
                <span class="admissionSlip-label">
                  IP Number: ${patient.patientDTO?.patientId}
                </span>
                <span class="admissionSlip-label">
                  Ward/Bed: ${patient.wardDepartmentDTO?.wardName} / ${
      patient.manageBedDTO?.wardType
    }-${patient.manageBedDTO?.bedNumber}
                </span>
              </div>
              <div class="admissionSlip-row">
                <span class="admissionSlip-label">
                  Department: ${patient?.requestingDepartment}
                </span>
                <span class="admissionSlip-label">
                  Doctor: ${patient.admittedDoctorDTO?.salutation} ${
      patient.admittedDoctorDTO?.firstName
    } ${patient.admittedDoctorDTO?.lastName}
                </span>
              </div>
              <div class="admissionSlip-row">
                <span class="admissionSlip-label">
                  Admitted On: ${patient?.admissionDate}
                </span>
                <span class="admissionSlip-label">
                  User: admin
                </span>
              </div>
            </div>
          </div>
        `;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
          <html>
            <head>
              <title>Print Admission Slip</title>
              <style>
                .admissionSlip-container {
                  font-family: Arial, sans-serif;
                  width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                }
                .admissionSlip-slip {
                  border: 1px solid #000;
                  padding: 20px;
                  margin-bottom: 20px;
                }
                .admissionSlip-title {
                  text-align: center;
                  font-weight: bold;
                  margin-bottom: 15px;
                }
                .admissionSlip-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                }
                .admissionSlip-label {
                  font-weight: 500;
                }
              </style>
            </head>
            <body>
              ${printContent}
              <script>
                window.onload = function() {
                  window.print();
                  window.close();
                };
              </script>
            </body>
          </html>
        `);
    printWindow.document.close();
    setShowOptionWindow(false);
  };
  return (
    <div className="admissionSlip-container">
      <div className="admissionSlip-slip">
        <h2 className="admissionSlip-title">Patient Admission Slip</h2>
        <div className="admissionSlip-row">
          <span className="admissionSlip-label">
            Patient : {patient.patientDTO?.firstName}{" "}
            {patient.patientDTO?.middleName} {patient.patientDTO?.lastName}{" "}
            {patient.patientDTO?.age} {patient.patientDTO?.ageUnit} /{" "}
            {patient.patientDTO?.gender}
          </span>
        </div>
        <div className="admissionSlip-row">
          <span className="admissionSlip-label">
            IP Number : {patient.patientDTO?.patientId}
          </span>
          <span className="admissionSlip-label">
            Ward/Bed : {patient.wardDepartmentDTO?.wardName} /{" "}
            {patient.manageBedDTO?.wardType}-{patient.manageBedDTO?.bedNumber}
          </span>
        </div>
        <div className="admissionSlip-row">
          <span className="admissionSlip-label">
            Department : {patient?.requestingDepartment}
          </span>
          <span className="admissionSlip-label">
            Doctor : {patient.admittedDoctorDTO?.salutation}{" "}
            {patient.admittedDoctorDTO?.firstName}{" "}
            {patient.admittedDoctorDTO?.lastName}
          </span>
        </div>
        <div className="admissionSlip-row">
          <span className="admissionSlip-label">
            Admitted On : {patient?.admissionDate}
          </span>
          <span className="admissionSlip-label">User : admin</span>
        </div>
      </div>
      <button className="admissionSlip-printButton" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
};

export default PrintAdmissionSlip;
