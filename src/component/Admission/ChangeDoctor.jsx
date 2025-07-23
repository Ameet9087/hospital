import React, { useEffect, useState } from "react";
import "./changeDoctor.css";
import { API_BASE_URL } from "../api/api";
import { FloatingSelect } from "../../FloatingInputs/index";
import axios from "axios";
import { toast } from "react-toastify";

function ChangeDoctor({ patient, setShowOptionWindow }) {
  const [formData, setFormData] = useState({
    requestingDepartment: "-ALL-",
    admittedDoctor: 0,
  });
  const [departments, setDepartments] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctorList, setDoctorList] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/specialisations`);
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchAllDoctorList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value === "-ALL-") {
      setDoctors([]);
      fetchAllDoctorList();
    }

    if (name === "requestingDepartment" && value !== "-ALL-") {
      setSelectedDepartment(value);
    }
  };

  const fetchAllDoctorList = async () => {
    const response = await axios.get(`${API_BASE_URL}/doctors`);
    setDoctorList(response.data);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedDepartment) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/doctors/specialization/${selectedDepartment}`
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

  const handleSubmit = async () => {
    if (formData.admittedDoctor === 0) {
      return;
    }
    let admissionId = parseInt(patient.ipAdmmissionId);
    let doctorId = parseInt(formData.admittedDoctor);

    try {
      let baseUrl = `${API_BASE_URL}/ip-admissions/${admissionId}/change-doctor/${doctorId}`;
      const response = await axios.put(baseUrl);
      if (response.status === 200) {
        toast.success("Doctor Changed Successfully");
        setShowOptionWindow(false);
      }
    } catch (err) {
      toast.error("Form Not Submitting");
    }
  };

  return (
    <div className="changeDoctorContainer">
      <h2>Change Doctor</h2>
      <hr />
      <div className="changeDoctorPatientData">
        <p>
          {patient?.patient?.patient?.firstName}{" "}
          {patient?.patient?.patient?.middleName}{" "}
          {patient?.patient?.patient?.lastName} (
          {patient?.patient?.patient?.uhid})
        </p>
      </div>
      <div className="changeDoctorPreviousDoctorData">
        <p>
          <span>Department : </span>{" "}
          <span>{patient?.requestingDepartment}</span>
        </p>
        <p>
          <span>Current Doctor : </span>{" "}
          <span>
            {patient.admissionUnderDoctorDetail?.consultantDoctor?.salutation}{" "}
            {patient.admissionUnderDoctorDetail?.consultantDoctor?.doctorName}
          </span>
        </p>
      </div>
      <div className="changeDoctorNewDataUpdate">
        <FloatingSelect
          label={"Department"}
          name="requestingDepartment"
          value={formData.requestingDepartment}
          options={[
            { value: "", label: "" },
            ...(Array.isArray(departments)
              ? departments.map((department) => ({
                  value: department.specialisationId,
                  label: department.specialisationName,
                }))
              : []),
          ]}
          onChange={handleChange}
        />

        <FloatingSelect
          label={"Doctor"}
          name="admittedDoctor"
          value={formData.admittedDoctor}
          options={[
            { value: "", label: "" },
            ...(doctors.length > 0 ? doctors : doctorList).map((doctor) => ({
              value: doctor.doctorId,
              label: `${doctor.salutation} ${doctor.doctorName}`,
            })),
          ]}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} className="changeDoctorBTN">
        Change
      </button>
    </div>
  );
}

export default ChangeDoctor;
