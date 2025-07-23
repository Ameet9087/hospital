import React, { useEffect, useState } from "react";
import "./WardTransfer.css"; // Import the corresponding CSS file
import axios from "axios"; // Make sure to install axios
import { API_BASE_URL } from "../api/api";

const WardTransfer = ({ patient, setShowModal }) => {
  const [formData, setFormData] = useState({
    requestingDepartment: "", // For requesting department
    admittedDoctor: "", // For secondary doctor
    ward: "", // For ward
    wardName: "",
    bedFeature: "", // For bed feature
    bed: "", // For bed
    transferDate: "",
    transferTime: "",
    transferRemarks: "",
    price: 0,
  });

  console.log(patient);

  const [wardHistory, setWardHistory] = useState([]);
  const [wards, setWards] = useState([]);
  const [bedFeatures, setBedFeatures] = useState([]);
  const [beds, setBeds] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedBedFeature, setSelectedBedFeature] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    // Fetch wards
    const fetchWards = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/ward-department/get-all-ward`
        );
        const data = await response.json();
        setWards(data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/departments/getAllDepartments`
        );
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    // Fetch bed features
    const fetchBedFeatures = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/ward-bedFeature/getAllWardBed`
        );
        const data = await response.json();
        setBedFeatures(data);
      } catch (error) {
        console.error("Error fetching bed features:", error);
      }
    };
    fetchDepartments();
    fetchWards();
    fetchBedFeatures();
  }, []);

  const fetchWardHistories = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admissions/get-ward-histories/${patient?.admissionId}`
      );
      const data = await response.text();
      const wardHistoryData = JSON.parse(data);
      setWardHistory(wardHistoryData);
    } catch (error) {
      console.error("Error fetching ward histories:", error);
    }
  };

  useEffect(() => {
    fetchWardHistories();
  }, [patient]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedDepartment) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/employees/department/${selectedDepartment}`
          );
          const data = await response.json();
          setDoctors(data);
        } catch (error) {
          console.error("Error fetching admitting doctors:", error);
        }
      }
    };
    fetchDoctors();
  }, [selectedDepartment]);

  useEffect(() => {
    const fetchBedsByWardAndFeature = async () => {
      if (selectedWard && selectedBedFeature) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/manage-bed/AllManageBedByWardAndFeature?wardDepartmentId=${selectedWard}&wardBedFeatureId=${selectedBedFeature}`
          );
          const data = await response.json();
          setBeds(data); // Update the beds based on the selected ward and bed feature
        } catch (error) {
          console.error("Error fetching filtered beds:", error);
        }
      }
    };

    fetchBedsByWardAndFeature();
  }, [selectedWard, selectedBedFeature]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "bedFeature") {
      setSelectedBedFeature(e.target.value);
    }
  };

  const handleWard = (e) => {
    const wardId = e.target.value;
    const selectedWard = wards.find((item) => item.wardDepartmentId == wardId);
    setSelectedWard(wardId);
    formData.ward = wardId;
    formData.wardName = selectedWard.wardName;
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    console.log(departmentId);
    const selectedDepartment = departments.filter(
      (item) => item.departmentId == departmentId
    );
    setSelectedDepartment(departmentId);
    formData.requestingDepartment = selectedDepartment[0].departmentName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let admissionData;
    if (!wardHistory || wardHistory.length === 0) {
      admissionData = {
        startDate: patient?.admissionDate,
        endDate: formData.transferDate,
        wardName: patient?.wardDepartmentDTO?.wardName,
      };
    } else {
      admissionData = {
        startDate: patient?.transferDate,
        endDate: formData.transferDate,
        wardName: patient?.wardDepartmentDTO?.wardName,
      };
    }

    const wardHistories = [admissionData];

    if (Array.isArray(wardHistory) && wardHistory.length > 0) {
      wardHistories.unshift(...wardHistory);
    }

    // Convert to string if needed
    const transferHistoryString = JSON.stringify(wardHistories);

    const transfer = {
      requestingDepartment: formData.requestingDepartment,
      transferDate: formData.transferDate,
      transferTime: formData.transferTime,
      price: formData.price,
      admittedDoctor: { employeeId: formData.admittedDoctor },
      wardDepartment: { wardDepartmentId: formData.ward },
      wardBedFeature: { wardBedFeatureId: formData.bedFeature },
      manageBed: { bedId: formData.bed },
      wardHistories: transferHistoryString,
    };

    try {
      console.log(transfer);

      const response = await axios.put(
        `${API_BASE_URL}/admissions/transfer/${patient?.admissionId}`,
        transfer
      );
      console.log(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating admission:", error);
      alert("Failed to update admission. Please try again.");
    }
  };

  return (
    <div className="WardTransfer-container">
      <div className="WardTransfer-header">
        <h2>
          {patient?.patientDTO?.firstName} {patient?.patientDTO?.lastName} /{" "}
          {patient?.patientDTO?.age} / {patient?.patientDTO?.gender}{" "}
        </h2>
      </div>

      <form className="WardTransfer-form-section" onSubmit={handleSubmit}>
        <div className="WardTransfer-left-column">
          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">
              Requesting Department *
            </label>
            <select
              className="WardTransfer-form-group-input"
              name="requestingDepartment"
              onChange={handleDepartmentChange} // Event handler to update the state
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option
                  key={department.departmentId}
                  value={department.departmentId}
                >
                  {department.departmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">
              Primary Doctor:
            </label>
            <span className="WardTransfer-form-group-input">
              {patient?.admittedDoctorDTO?.salutation}{" "}
              {patient?.admittedDoctorDTO?.firstName}{" "}
              {patient?.admittedDoctorDTO?.lastName}{" "}
            </span>
          </div>
          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">
              Secondary Doctor:
            </label>
            <select
              className="WardTransfer-form-group-input"
              name="admittedDoctor"
              value={formData.admittedDoctor}
              onChange={handleChange}
            >
              <option value="">Select Secondary Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.employeeId} value={doctor.employeeId}>
                  {doctor.salutation} {doctor.firstName} {doctor.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">Ward *</label>
            <select
              className="WardTransfer-form-group-input"
              name="ward"
              value={formData.ward}
              onChange={handleWard}
            >
              <option value="">Select Ward</option>
              {wards.map((ward) => (
                <option
                  key={ward.wardDepartmentId}
                  value={ward.wardDepartmentId}
                >
                  {ward.wardName}
                </option>
              ))}
            </select>
          </div>

          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">
              Select Bed Feature *
            </label>
            <select
              className="WardTransfer-form-group-input"
              name="bedFeature"
              value={formData.bedFeature}
              onChange={handleChange}
            >
              <option value="">Select Bed Feature</option>
              {bedFeatures.map((feature) => (
                <option
                  key={feature.wardBedFeatureId}
                  value={feature.wardBedFeatureId}
                >
                  {feature.featureFullName}
                </option>
              ))}
            </select>
          </div>

          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">Price:</label>
            <span className="WardTransfer-form-group-input">
              {formData.price}
            </span>
          </div>

          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">
              Select Bed *
            </label>
            <select
              className="WardTransfer-form-group-input"
              name="bed"
              value={formData.bed}
              onChange={handleChange}
            >
              <option value="">Select Bed</option>
              {beds.map((bed) => (
                <option key={bed.manageBedId} value={bed.manageBedId}>
                  {bed?.wardDepartmentDTO?.wardName}-{bed.bedNumber}
                </option>
              ))}
            </select>
          </div>
          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">
              Transfer Date:
            </label>
            <div className="WardTransfer-form-group-two-input">
              <input
                className="WardTransfer-form-group-input"
                type="date"
                value={formData.transferDate}
                name="transferDate"
                onChange={handleChange}
              />
              <input
                className="WardTransfer-form-group-input"
                type="time"
                value={formData.transferTime}
                name="transferTime"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="WardTransfer-form-group">
            <label className="WardTransfer-form-group-label">
              Transfer Remarks *
            </label>
            <textarea
              name="transferRemarks"
              value={formData.transferRemarks}
              onChange={handleChange}
              className="WardTransfer-form-group-input"
            ></textarea>
          </div>

          <button type="submit" className="WardTransfer-transfer-btn">
            Transfer
          </button>
        </div>

        <div className="WardTransfer-right-column">
          <h3>Admission records</h3>
          <p>
            Current Ward/Bed: {patient?.wardDepartmentDTO?.wardName} /{" "}
            {patient?.manageBedDTO?.wardType}-{patient?.manageBedDTO?.bedNumber}
          </p>
          <hr />
          <h4>Ward History</h4>
          <table className="WardTransfer-table">
            <thead>
              <tr>
                <th>Started on</th>
                <th>Ended on</th>
                <th>Ward Name</th>
              </tr>
            </thead>
            <tbody>
              {wardHistory != null &&
                wardHistory.map((history, index) => (
                  <tr key={index}>
                    <td>{history.startDate}</td>
                    <td>{history.endDate}</td>
                    <td>{history.wardName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default WardTransfer;
