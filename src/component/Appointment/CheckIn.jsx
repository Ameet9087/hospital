import React, { useEffect, useState } from "react";
import "./CheckIn.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/api";

const CheckIn = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const location = useLocation();

  const { patient } = location.state || "";

  const [formData, setFormData] = useState({
    firstName: patient?.firstName || "",
    middleName: patient?.middleName || "",
    lastName: patient?.lastName || "",
    religion: patient?.religion || "",
    haveDOB: patient?.dateOfBirth ? true : false,
    dateOfBirth: patient?.dateOfBirth || "",
    age: patient?.age || "",
    ageUnit: patient?.ageUnit || "",
    gender: patient?.gender || "",
    phoneNumber: patient?.contactNumber || patient?.phoneNumber || "",
    landlineNumber: patient?.landlineNumber || "",
    country: "",
    state: "",
    address: patient?.address || "",
    email: patient?.email || "",
    careOfPerson: patient?.careOfPerson || "",
    relationWithPatient: patient?.relationWithPatient || "",
    careOfPersonContact: patient?.careOfPersonContact || "",
    visitType: patient?.visitType || "New Visit",
    visitDate: "",
    visitTime: "",
    referredBy: patient?.referredBy || "",
    isExternal: patient?.isExternal || "No",
    discount: 0,
    discountPercentage: 0,
    discountAmount: 0,
    subTotal: 0,
    totalAmount: 0,
    changeReturn: 0,
    tender: 0,
    paymentOptions: "Cash",
    department: "",
    departmentId: patient?.departmentId || 0,
    employeeId: "",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/departments/getAllDepartments`)
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const fetchDoctors = async (departmentId) => {
    try {
      const response = await fetch(
        `http://localhost:1415/api/employees/department/${departmentId}`
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let apiUrl =
      patient?.newPatientVisitId > 0
        ? `${API_BASE_URL}/new-patient-visits/update/${patient?.newPatientVisitId}`
        : `${API_BASE_URL}/new-patient-visits/save-new-patient`;

    try {
      const response = await fetch(apiUrl, {
        method: `${patient?.newPatientVisitId > 0 ? "PUT" : "POST"}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          religion: formData.religion,
          age: parseInt(formData.age, 10),
          ageUnit: formData.ageUnit,
          gender: formData.gender,
          phoneNumber: formData.phoneNumber,
          landlineNumber: formData.landlineNumber,
          country: formData.country,
          state: formData.state,
          address: formData.address,
          email: formData.email,
          careOfPerson: formData.careOfPerson,
          relationWithPatient: formData.relationWithPatient,
          careOfPersonContact: formData.careOfPersonContact,
          visitType: formData.visitType,
          visitDate: formData.visitDate,
          visitTime: formData.visitTime,
          referredBy: formData.referredBy,
          isExternal: formData.isExternal,
          discount: parseFloat(formData.discount),
          discountPercentage: parseFloat(formData.discountPercentage),
          discountAmount: parseFloat(formData.discountAmount),
          subTotal: parseFloat(formData.subTotal),
          totalAmount: parseFloat(formData.totalAmount),
          changeReturn: parseFloat(formData.changeReturn),
          tender: parseFloat(formData.tender),
          paymentOptions: formData.paymentOptions,
          department: formData.department,
          employeeDTO: {
            employeeId: parseInt(formData.employeeId, 10),
          },
        }),
      });
      if (response.ok) {
        alert("Patient added successfully!");
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          haveDOB: false,
          dateOfBirth: "",
          religion: "",
          age: "",
          ageUnit: "",
          gender: "",
          phoneNumber: "",
          landlineNumber: "",
          country: "",
          state: "",
          address: "",
          email: "",
          careOfPerson: "",
          relationWithPatient: "",
          careOfPersonContact: "",
          visitType: "New Visit",
          visitDate: "",
          visitTime: "",
          referredBy: "",
          isExternal: "No",
          discount: 0,
          discountPercentage: 0,
          discountAmount: 0,
          subTotal: 0,
          totalAmount: 0,
          changeReturn: 0,
          tender: 0,
          paymentOptions: "Cash",
          department: "",
          departmentId: 0,
          employeeId: "",
        });


        const response = await axios.put(
          `${API_BASE_URL}/appointments/update-status/${patient?.appointmentId}?status=cancelled`
        );
        if (response.ok) {
          console.log("Status Updated Successfully");
          navigate("/new-visit");
        }
      } else {
        alert("Failed to add appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkIn__container">
        <div className="checkIn__header">
          <h5>New Visit</h5>
        </div>

        <div className="checkIn__topbar">
          <div className="checkIn__field">
            <label>
              Membership <span className="checkIn__required">*</span>
            </label>
            <select className="checkIn__dropdown">
              <option>General</option>
            </select>
          </div>
          <div className="checkIn__field">
            <label>Price Category:</label>
            <select className="checkIn__dropdown">
              <option>Normal</option>
            </select>
          </div>
        </div>

        <div className="checkIn__content">
          <div className="checkIn__section checkIn__section--patient">
            <h3 className="checkIn__section-title">
              <span className="checkIn__section-icon">👤</span> Patient
              Information
            </h3>
            {/* <div className="checkIn__form"> */}
            <div className="checkIn__form-group">
              <label className="checkIn__label">
                First Name <span className="checkIn__required">*</span>
              </label>
              <div className="checkIn__name-inputs">
                <input
                  className="checkIn__input"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  className="checkIn__input"
                  type="text"
                  placeholder="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
                <input
                  className="checkIn__input"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className=" checkIn__form-group--dob">
              <label className="checkIn__label">Have DOB?</label>
              <div className="checkIn__DOB-inputs">
                <input
                  className="checkIn__checkBox"
                  type="checkbox"
                  name="haveDOB"
                  value={true}
                  checked={formData.haveDOB}
                  onChange={handleChange}
                />
                {formData.haveDOB && (
                  <input
                    type="date"
                    className="checkIn__input"
                    name="dateOfBirth"
                    checked={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">
                Religion <span className="checkIn__required">*</span>
              </label>
              <input
                className="checkIn__input"
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              />
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">
                Age <span className="checkIn__required">*</span>
              </label>
              <div className="checkIn__age-inputs">
                <input
                  className="checkIn__input checkIn__age-inputs"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                <select
                  onChange={handleChange}
                  value={formData.ageUnit}
                  className="checkIn__select"
                >
                  <option>Select Age Units</option>
                  <option value={"Yrs"}>Years</option>
                  <option value={"Months"}>Months</option>
                  <option value={"Days"}>Days</option>
                </select>
              </div>
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">
                Gender <span className="checkIn__required">*</span>
              </label>
              <select
                className="checkIn__select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">
                Phone No. <span className="checkIn__required">*</span>
              </label>
              <div className="checkIn__phone-inputs">
                <input
                  className="checkIn__input"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  className="checkIn__input"
                  type="text"
                  placeholder="LandLine Number"
                  name="landlineNumber"
                  value={formData.landlineNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">
                Address <span className="checkIn__required">*</span>
              </label>
              <div className="checkIn__address-inputs">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="checkIn__select"
                >
                  <option>Select Country</option>
                  <option value="India">India</option>
                </select>
                <select
                  name="state"
                  value={formData.state}
                  className="checkIn__select"
                  onChange={handleChange}
                >
                  <option>Select State</option>
                  <option value={"Maharashtra"}>Maharashtra</option>
                </select>
                <input
                  className="checkIn__input"
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">Email</label>
              <input
                className="checkIn__input"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">Care of Person</label>
              <input
                className="checkIn__input"
                type="text"
                placeholder="Care Taker Person"
                name="careOfPerson"
                value={formData.careOfPerson}
                onChange={handleChange}
              />
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">Relation With Patient</label>
              <input
                className="checkIn__input"
                type="text"
                name="relationWithPatient"
                value={formData.relationWithPatient}
                onChange={handleChange}
              />
            </div>
            <div className="checkIn__form-group">
              <label className="checkIn__label">Care of Person Contact</label>
              <input
                className="checkIn__input"
                type="text"
                placeholder="Care Takers Contact"
                name="careOfPersonContact"
                value={formData.careOfPersonContact}
                onChange={handleChange}
              />
            </div>
            {/* </div> */}
          </div>
          <div className="checkIn-visit-billing">
            <div className="checkIn__section checkIn__section--visit">
              <h3 className="checkIn__section-title">Visit Information</h3>
              <div className="checkIn__form">
                <div className="checkIn__form-group">
                  <label>
                    Department <span className="checkIn__required">*</span>
                  </label>
                  <select
                    className="checkIn__select"
                    value={formData.departmentId}
                    onChange={handleDepartmentChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.departmentId} value={dept.departmentId}>
                        {dept.departmentName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="checkIn__form-group">
                  <label>
                    Doctor <span className="checkIn__required">*</span>
                  </label>
                  <select
                    className="checkIn__select"
                    value={formData.employeeId}
                    name="employeeId"
                    onChange={handleChange}
                  >
                    <option value="">Select Doctor</option>
                    {employees.map((emp) => (
                      <option key={emp.employeeId} value={emp.employeeId}>
                        {emp.firstName +
                          " " +
                          emp.middleName +
                          " " +
                          emp.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="checkIn__form-group">
                  <label>Referred By</label>
                  <input
                    type="text"
                    className="checkIn__input"
                    placeholder="Enter Name"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkIn__form-group">
                  <label>
                    Visit Date <span className="checkIn__required">*</span>
                  </label>
                  <select
                    className="checkIn__select"
                    value={formData.visitType}
                    name="visitType"
                    onChange={handleChange}
                  >
                    <option value="New Patient">New Patient</option>
                    <option value="Follow-Up Patient">Follow-Up Patient</option>
                  </select>
                </div>
                <div className="checkIn__form-group">
                  <label>
                    Visit Date <span className="checkIn__required">*</span>
                  </label>
                  <input
                    className="checkIn__input"
                    type="date"
                    value={formData.visitDate}
                    name="visitDate"
                    onChange={handleChange}
                  />
                </div>
                <div className="checkIn__form-group">
                  <label>
                    Visit Time <span className="checkIn__required">*</span>
                  </label>
                  <input
                    className="checkIn__input"
                    type="time"
                    value={formData.visitTime}
                    name="visitTime"
                    onChange={handleChange}
                  />
                </div>
                <div className="checkIn__form-group">
                  <span className="checkIn_required">External?</span>
                  <select
                    className="checkIn__select"
                    name="isExternal"
                    value={formData.isExternal}
                    onChange={handleChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="checkIn__section checkIn__section--billing">
              <h3 className="checkIn__section-title">Billing Information</h3>
              <div className="checkIn__form">
                {/* <div className="checkIn__billing-summary"> */}
                <div className="checkIn__billing-item">
                  <span className="checkIn_required">Particular(s)</span>
                  <input
                    type="text"
                    className="checkIn__input"
                    value="Admission Fees"
                    disabled
                  />
                </div>
                <div className="checkIn__billing-item">
                  <span className="checkIn_required">Discount %</span>
                  <input
                    type="number"
                    className="checkIn__input"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkIn__billing-item">
                  <span className="checkIn_required">Discount Amount</span>
                  <input
                    type="number"
                    className="checkIn__input"
                    name="discountAmount"
                    value={formData.discountAmount}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkIn__billing-item">
                  <span className="checkIn_required">SubTotal</span>
                  <input
                    type="text"
                    className="checkIn__input"
                    name="subTotal"
                    value={formData.subTotal}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="checkIn__billing-item">
                  <span className="checkIn_required">Total Amount</span>
                  <input
                    type="text"
                    className="checkIn__input"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="checkIn__billing-item">
                  <span className="checkIn_required">Tender</span>
                  <input
                    type="number"
                    className="checkIn__input"
                    name="tender"
                    value={formData.tender}
                    onChange={handleChange}
                  />
                </div>
                <div className="checkIn__billing-item">
                  <span className="checkIn_required">Change/Return</span>
                  <input
                    type="number"
                    className="checkIn__input"
                    name="changeReturn"
                    value={formData.changeReturn}
                    onChange={handleChange}
                    disabled
                  />
                </div>

                <div className="checkIn__billing-item">
                  <span className="checkIn_required">Payment Options</span>
                  <select
                    className="checkIn__select"
                    name="paymentOptions"
                    value={formData.paymentOptions}
                    onChange={handleChange}
                  >
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* </div> */}

                {/* <div>
                <label>Employee ID:</label>
                <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                />
            </div> */}
                <button type="submit" className="checkIn__print-btn">
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckIn;
