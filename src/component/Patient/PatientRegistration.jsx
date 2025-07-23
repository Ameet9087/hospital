//prachi parab patientRegisteration css 13/9
import React, { useEffect, useState } from "react";
import "./PatientRegistration.css";

const PatientRegistration = ({ sendpatientdata, patientData }) => {
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    adharCardId: "",
    phoneNumber: "",
    alternateNumber: "",
    country: "India",
    passportNumber: "",
    state: "Maharashtra",
    address: "",
    bloodGroup: "",
    gender: "",
    maritalStatus: "",
    notifications: "",
    employerInfo: "",
    previousLastName: "",
    occupation: "",
    email: "",
    race: "",
    pinCode: "",
    dialysisPatient: "",
  });
  useEffect(() => {
    setFormData({
      salutation: patientData?.salutation,
      adharCardId: patientData?.adharCardId || "",
      firstName: patientData?.firstName || "",
      middleName: patientData?.middleName || "",
      lastName: patientData?.lastName || "",
      dateOfBirth: patientData?.dateOfBirth || "",
      age: patientData?.age || "",
      phoneNumber: patientData?.phoneNumber || "",
      alternateNumber: patientData?.alternateNumber || "",
      country: patientData?.country || "",
      passportNumber: patientData?.passportNumber || "",
      state: patientData?.state || "",
      address: patientData?.address || "",
      bloodGroup: patientData?.bloodGroup || "",
      gender: patientData?.gender || "",
      maritalStatus: patientData?.maritalStatus || "",
      notifications: patientData?.notifications || "",
      employerInfo: patientData?.employerInfo || "",
      previousLastName: patientData?.previousLastName || "",
      occupation: patientData?.occupation || "",
      email: patientData?.email || "",
      race: patientData?.race || "",
      pinCode: patientData?.pinCode || "",
      dialysisPatient: patientData?.dialysisPatient || "",
    });
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentDate = new Date();
    const booleanFields = ["notifications", "dialysisPatient"];
    let updatedFormData = { ...formData, [name]: value };

    if (name === "dateOfBirth" && value) {
      // Calculate age when DOB is entered
      const birthDate = new Date(value);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const isBeforeBirthday =
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate());
      updatedFormData.age = isBeforeBirthday ? age - 1 : age;
    }

    if (name === "age" && value) {
      // Calculate DOB when age is entered, starting from January 1st
      const years = parseInt(value, 10);
      const dobYear = currentDate.getFullYear() - years;
      const dobFromJanuary = new Date(dobYear, 0, 1); // January 1st of the calculated year
      updatedFormData.dateOfBirth = dobFromJanuary.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    }

    if (booleanFields.includes(name)) {
      // Convert 'yes'/'no' to boolean for specific fields
      updatedFormData[name] = value === "yes" ? true : false;
    }

    setFormData(updatedFormData);
    sendpatientdata(updatedFormData);
  };
  return (
    <div className="patient-registration">
      <h5>Basic Information</h5>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label>Salutation:</label>
            <div className="patient-registration-data">
              <div className="form-group">
                Mr.
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Married"
                  onChange={handleChange}
                />
                Ms.
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Unmarried"
                  onChange={handleChange}
                />
                Mrs.
                <input
                  type="radio"
                  name="maritalStatus"
                  value="Unmarried"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-group">
                <label className="radio-label">Mr.</label>
                <input type="radio" name="salutation" value="Mr" onChange={handleChange} /> 
                <label className="radio-label">Ms.</label>
                <input type="radio" name="salutation" value="Ms" onChange={handleChange} /> 
                <label className="radio-label">Mrs.</label>
                <input type="radio" name="salutation" value="Mrs" onChange={handleChange} />
            </div> */}
            </div>
          </div>
          <div className="form-group">
            <label>
              Gender <span className="mandatory">*</span>:
            </label>

            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              required
            >
              <option value="">--select--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              First Name<span className="mandatory">*</span>:
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Religion:</label>
            <select onChange={handleChange}>
              <option value="">--select--</option>
              <option>Hindu</option>
              <option>Muslim</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ width: "49%" }}>
            <label>Marital Status:</label>

            <span className="radio-option">
              <input
                type="radio"
                id="married"
                name="maritalStatus"
                value="Married"
                onChange={handleChange}
              />
              <label htmlFor="married" className="radio-label">
                Married
              </label>
            </span>

            <span className="radio-option">
              <input
                type="radio"
                id="unmarried"
                name="maritalStatus"
                value="Unmarried"
                onChange={handleChange}
              />
              <label htmlFor="unmarried" className="radio-label">
                Unmarried
              </label>
            </span>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Last Name<span className="mandatory">*</span>:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Notifications:</label>
            <input
              type="text"
              name="notifications"
              onChange={handleChange}
              value={formData.notifications}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              onChange={handleChange}
              value={formData.dateOfBirth}
            />
          </div>
          <div className="form-group">
            <label>Employer Info:</label>
            <input
              type="text"
              name="employerInfo"
              onChange={handleChange}
              value={formData.employerInfo}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Age<span className="mandatory">*</span>:
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <select name="ageUnit" onChange={handleChange}>
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
          <div className="form-group">
            <label>Previous Last Name:</label>
            <input
              type="text"
              name="previousLastName"
              value={formData.previousLastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Phone Number<span className="mandatory">*</span>:
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Occupation:</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>alternate Number:</label>
            <input
              type="tel"
              name="alternateNumber"
              onChange={handleChange}
              value={formData.alternateNumber}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Country<span className="mandatory">*</span>:
            </label>
            <select
              name="country"
              onChange={handleChange}
              value={formData.country}
              required
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="South Africa">South Africa</option>
              <option value="India">India</option>
              <option value="China">China</option>
            </select>
          </div>
          <div className="form-group">
            <label>Race:</label>
            <input
              type="text"
              name="race"
              onChange={handleChange}
              value={formData.race}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Adhaar Number:</label>
            <input
              type="text"
              name="adharCardId"
              onChange={handleChange}
              value={formData.adharCardId}
            />
          </div>
          <div className="form-group">
            <label>Passport Number:</label>
            <input
              type="text"
              name="passportNumber"
              onChange={handleChange}
              value={formData.passportNumber}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label> PIN Code:</label>
            <input
              type="text"
              name="pinCode"
              onChange={handleChange}
              value={formData.pinCode}
            />
          </div>
          <div className="form-group">
            <label>
              State<span className="mandatory">*</span>:
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={formData.address}
            />
          </div>
          <div className="form-group"></div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Dialysis Patient:</label>
            <select
              name="dialysisPatient"
              onChange={handleChange}
              value={formData.dialysisPatient}
            >
              <option value="">--select--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-group">
            <label>Blood Group:</label>
            <select
              name="bloodGroup"
              onChange={handleChange}
              value={formData.bloodGroup}
            >
              <option value="">--select--</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;
