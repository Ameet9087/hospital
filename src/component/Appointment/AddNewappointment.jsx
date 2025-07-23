import React, { useState, useEffect } from "react";
import "../Appointment/AddNewPpointment.css";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../api/api";

const AddNewAppointmentForm = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { patientData } = location.state || "";

  const [formData, setFormData] = useState({
    firstName: patientData?.firstName || "",
    middleName: patientData?.middleName || "",
    lastName: patientData?.lastName || "",
    gender: patientData?.gender || "",
    age: patientData?.age || 0,
    ageUnit: patientData?.ageUnit || "Yrs",
    reason: patientData?.reason || "",
    contactNumber: patientData?.contactNumber || "",
    appointmentDate: patientData?.appointmentDate || "",
    appointmentTime: patientData?.appointmentTime || "",
    department: patientData?.department || "",
    departmentId: patientData?.employeeDTO?.departmentDTO?.departmentId,
    doctor: patientData?.employeeDTO?.employeeId,
    visitType: patientData?.visitType || "New Patient",
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointmentError, setAppointmentError] = useState("");

  const { id } = useParams(); // Use id if necessary

  console.log(patientData);

  useEffect(() => {
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

    fetchDepartments();
  }, []);

  // Fetch doctors when department changes
  const fetchDoctors = async (departmentId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/employees/department/${departmentId}`

      );
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const checkAppointmentAvailability = async () => {
    const { appointmentDate, appointmentTime, doctor } = formData;
    console.log(formData.appointmentDate, formData.appointmentTime);

    const apiUrl = `${API_BASE_URL}/appointments/check-appointment?date=${appointmentDate}&time=${appointmentTime}&employeeId=${doctor}`;

    try {
      const response = await fetch(apiUrl);
      const isBooked = await response.json(); // Expecting a boolean response

      // If the response is true, it means the time is already booked
      if (!isBooked) {
        setAppointmentError("Appointment Date And Time Already Booked");
      } else {
        setAppointmentError(""); // Clear the error if no conflicts
      }
    } catch (error) {
      console.error("Error checking appointment availability:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (
      (name === "appointmentDate" || name === "appointmentTime") &&
      formData.appointmentDate &&
      formData.appointmentTime
    ) {
      checkAppointmentAvailability();
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartmentId = e.target.value;
    const selectedDepartment = departments.find(
      (dept) => dept.departmentId === parseInt(selectedDepartmentId, 10)
    );
    setFormData((prevState) => ({
      ...prevState,
      department: selectedDepartment.departmentName,
      departmentId: selectedDepartment.departmentId,
    }));

    fetchDoctors(selectedDepartmentId);
  };

  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      doctor: selectedDoctor,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let apiUrl;
    if (patientData != null) {
      apiUrl = `${API_BASE_URL}/appointments/update-appointment/${patientData.appointmentId}`;
    } else {
      apiUrl = `${API_BASE_URL}/appointments/save-new-appointment`;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          gender: formData.gender,
          age: parseInt(formData.age, 10),
          ageUnit: formData.ageUnit,
          reason: formData.reason,
          contactNumber: formData.contactNumber,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          department: formData.department,
          visitType: formData.visitType,
          status: "initiated",
          employee: {
            employeeId: parseInt(formData.doctor, 10), // Include employeeId under employee
          },
        }),
      });

      if (response.ok) {
        alert("Appointment added successfully!");
        navigate("/book-appointment");
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          gender: "",
          age: "",
          ageUnit: "Yrs",
          reason: "",
          contactNumber: "",
          appointmentDate: "",
          appointmentTime: "",
          department: "",
          doctor: 0,
          visitType: "New Patient",
        });
      } else {
        alert("Failed to add appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form className="addnewaptmtpatient" onSubmit={handleSubmit}>
      <div className="addnewaptmtpatient-left">
        {/* Left Side Inputs */}
        <div className="addnewaptmtpatient-group">
          <label>First Name *</label>:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Middle Name</label>:
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
          />
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Last Name *</label>:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Gender *</label>:
          <div className="addnewaptmtpatient-gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Age *</label>:
          <input
            type="number"
            name="age"
            min={1}
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            style={{ width: "30%" }}
          />
          <div className="addnewaptmtpatient-age-options">
            <label>
              <input
                type="radio"
                name="ageUnit"
                value="Yrs"
                checked={formData.ageUnit === "Yrs"}
                onChange={handleChange}
              />
              Yrs
            </label>
            <label>
              <input
                type="radio"
                name="ageUnit"
                value="Months"
                checked={formData.ageUnit === "Months"}
                onChange={handleChange}
              />
              Months
            </label>
            <label>
              <input
                type="radio"
                name="ageUnit"
                value="Days"
                checked={formData.ageUnit === "Days"}
                onChange={handleChange}
              />
              Days
            </label>
          </div>
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Reason</label>:
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
          />
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Contact Number *</label>:
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
        </div>
        <button className="addnewaptmtpatient-btn" type="submit">
          {patientData != null ? "Update Appointment" : "Add Appointment"}
        </button>
      </div>
      <div className="addnewaptmtpatient-right">
        {/* Right Side Inputs */}
        <div className="addnewaptmtpatient-group">
          <label>Department *</label>:
          <select
            name="department"
            value={formData.departmentId}
            onChange={(e) => handleDepartmentChange(e)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.departmentName}
              </option>
            ))}
          </select>
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Doctor</label>:
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleDoctorChange}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.employeeId} value={doc.employeeId}>
                {doc.salutation} {doc.firstName} {doc.lastName}

              </option>
            ))}
          </select>
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Appointment Date *</label>:
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="addnewaptmtpatient-group">
          <label>Appointment Time</label>:
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
          />
        </div>
        {appointmentError && (
          <div className="appointment-error-message">{appointmentError}</div>
        )}
        <div className="addnewaptmtpatient-group">
          <label>Select Visit Type</label>:
          <select
            name="visitType"
            value={formData.visitType}
            onChange={handleChange}
          >
            <option value="New Patient">New Patient</option>
            <option value="Follow-Up Patient">Follow-Up Patient</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default AddNewAppointmentForm;
