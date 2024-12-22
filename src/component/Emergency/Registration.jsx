// import React, { useState, useEffect } from 'react';

// import axios from 'axios';

// import './Registration.css';

// const EmergencyPatientRegistration = () => {

// const [formData, setFormData] = useState({

// priceCategory: "",

// firstName: "",

// middleName: "",

// lastName: "",

// religion: "",

// gender: "",

// haveDOB: false,

// age: "",

// ageUnit: "Years",

// country: "",

// county: "",

// address: "",

// contactNumber: "",

// referredBy: "",

// conditionDuringArrival: "",

// modeOfArrival: "",

// careOfPerson: "",

// careOfPersonNumber: "",

// broughtBy: "",

// relationWithPatient: "",

// dob: "",

// });

// const [isFormVisible, setIsFormVisible] = useState(true); 

// const [loading, setLoading] = useState(false);

// const [errorMessage, setErrorMessage] = useState("");

// const [successMessage, setSuccessMessage] = useState("");




// const handleChange = (e) => {

// const { name, value, type, checked } = e.target;

// setFormData({

// ...formData,

// [name]: type === "checkbox" ? checked : value,

// });

// };



// const validateForm = () => {

// if (!formData.firstName || !formData.lastName || !formData.gender) {

// setErrorMessage("First Name, Last Name, and Gender are mandatory.");

// return false;

// }

// if (!formData.age && !formData.dob) {

// setErrorMessage("Please provide either Age or Date of Birth.");

// return false;

// }

// if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {

// setErrorMessage("Contact Number must be 10 digits.");

// return false;

// }

// if (["Dog Bite", "Snake Bite", "Animal Bite"].includes(formData.caseType)) {

// if (!formData.bitingAddress || !formData.dateOfBite || !formData.bittenOn) {

// setErrorMessage("Please fill all fields related to the bite details.");

// return false;

// }

// }

// if (formData.caseType === "Medico-Legal" && !formData.medicoLegalType) {

// setErrorMessage("Please select the Medico-Legal type.");

// return false;

// }

// setErrorMessage("");

// return true;

// };


// const handleSubmit = async (e) => {

// e.preventDefault();

// if (!validateForm()) return;


// const payload = {

// ...formData,

// age: formData.haveDOB ? undefined : formData.age,

// dob: formData.haveDOB ? formData.dob : undefined,

// firstAidGivenImmediately: formData.firstAidGiven || undefined,

// triages: [{ status: "Pending" }],

// };


// if (formData.caseType === "Dog Bite" || formData.caseType === "Snake Bite" || formData.caseType === "Animal Bite") {

// payload.bitingAddress = formData.bitingAddress;

// payload.dateOfBite = formData.dateOfBite;

// payload.bittenOn = formData.bittenOn;

// }


// if (formData.caseType === "Medico-Legal") {

// payload.medicoLegalType = formData.medicoLegalType;

// }


// console.log("Payload to be sent:", payload); // Log the payload to the console


// try {

// setLoading(true);

// const response = await axios.post(`http://192.168.0.118:8081/api/emergency-patients`, payload);

// console.log("Server Response:", response.data); // Log server response

// alert("Patient registered successfully!");

// setErrorMessage("");

// setFormData({

// priceCategory: "",

// firstName: "",

// middleName: "",

// lastName: "",

// religion: "",

// gender: "",

// haveDOB: false,

// dob: "",

// age: "",

// ageUnit: "Years",

// country: "",

// county: "",

// address: "",

// contactNumber: "",

// referredBy: "",

// conditionDuringArrival: "",

// modeOfArrival: "",

// careOfPerson: "",

// careOfPersonNumber: "",

// broughtBy: "",

// relationWithPatient: "",

// caseType: "",

// bitingAddress: "",

// dateOfBite: "",

// bittenOn: "",

// firstAidGiven: false,

// medicoLegalType: "",

// });

// } catch (error) {

// console.error("API Error:", error); // Log error to console

// setErrorMessage("Failed to register patient. Please check the details and try again.");

// } finally {

// setLoading(false);

// }

// };




// const handleClose = () => {

// setIsFormVisible(false); // Hide the form when cross button is clicked

// };




// return (

// <div className="PatientRegistration-container">

// <header className="PatientRegistration-header">

// <h1>Emergency Patient Registration</h1>


// <button className="PatientRegistration-close-button" onClick={handleClose}>✖</button>

// </header>

// <form className="PatientRegistration-form" onSubmit={handleSubmit}>

// {/* {errorMessage && <p className="error-message">{errorMessage}</p>}

// {successMessage && <p className="success-message">{successMessage}</p>} */}



// <div className="PatientRegistration-form-group">

// <label htmlFor="priceCategory">Price Category:</label>

// <select id="priceCategory" name="priceCategory" value={formData.priceCategory} onChange={handleChange}>

// <option value="">Select Price Category</option>

// <option value="Normal">Normal</option>

// <option value="Discounted">Discounted</option>

// <option value="Free">Free</option>

// </select>

// </div>



// <div className="PatientRegistration-form-section">

// <div className="PatientRegistration-form-left">

// <div className="PatientRegistration-form-group">

// <label htmlFor="firstName">First Name <span className="PatientRegistration-required">*</span>:</label>

// <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="middleName">Middle Name:</label>

// <input type="text" id="middleName" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="lastName">Last Name <span className="PatientRegistration-required">*</span>:</label>

// <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="religion">Religion <span className="PatientRegistration-required">*</span>:</label>

// <select id="religion" name="religion" value={formData.religion} onChange={handleChange}>

// <option value="">Select Religion</option>

// <option value="Christianity">Christianity</option>

// <option value="Islam">Islam</option>

// <option value="Hinduism">Hinduism</option>

// <option value="Buddhism">Buddhism</option>

// <option value="Other">Other</option>

// </select>

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="gender">Gender <span className="PatientRegistration-required">*</span>:</label>

// <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>

// <option value="">Select Gender</option>

// <option value="Male">Male</option>

// <option value="Female">Female</option>

// <option value="Other">Other</option>

// </select>

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="haveDOB">Have DOB?</label>

// <input type="checkbox" id="haveDOB" name="haveDOB" checked={formData.haveDOB} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="age">Age:</label>

// <div className="PatientRegistration-age-group">

// <input type="number" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />

// <select id="ageUnit" name="ageUnit" value={formData.ageUnit} onChange={handleChange}>

// <option value="Years">Years</option>

// <option value="Months">Months</option>

// <option value="Days">Days</option>

// </select>

// </div>

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="county">County:</label>

// <input type="text" id="county" name="county" placeholder="County" value={formData.county} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="address">Address:</label>

// <input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="caseType">Case Type:</label>

// <select id="caseType" name="caseType" value={formData.caseType} onChange={handleChange}>

// <option value="">Select Case Type</option>

// <option value="Emergency">Emergency</option>

// <option value="Dog Bite">Dog Bite</option>

// <option value="Snake Bite">Snake Bite</option>

// <option value="Animal Bite">Animal Bite</option>

// <option value="Emergency Labour">Emergency Labour</option>

// <option value="Medico-Legal">Medico-Legal</option>

// <option value="Accident">Accident</option>



// </select>

// </div>

// {["Dog Bite", "Snake Bite", "Animal Bite"].includes(formData.caseType) && (

// <>

// <div className="PatientRegistration-form-group">

// <label htmlFor="bitingAddress">Biting Address:</label>

// <input type="text" id="bitingAddress" name="bitingAddress" placeholder="Biting Address" value={formData.bitingAddress} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="dateOfBite">Date of Bite:</label>

// <input type="date" id="dateOfBite" name="dateOfBite" value={formData.dateOfBite} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="bittenOn">Bitten On:</label>

// <input type="text" id="bittenOn" name="bittenOn" placeholder="Bitten On (e.g., arm, leg)" value={formData.bittenOn} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="firstAidGiven">First Aid Given Immediately:</label>

// <input type="checkbox" id="firstAidGiven" name="firstAidGiven" checked={formData.firstAidGiven} onChange={handleChange} />

// </div>

// </>

// )}

// {formData.caseType === "Medico-Legal" && (

// <div className="PatientRegistration-form-group">

// <select id="medicoLegalType" name="medicoLegalType" value={formData.medicoLegalType} onChange={handleChange}>

// <option value="">Select Type</option>

// <option value="Assault">Assault</option>

// <option value="RTA">RTA</option>

// <option value="Burn">Burn</option>

// <option value="Poisoning">Poisoning</option>

// <option value="Hanging">Hanging</option>

// <option value="Snake Bite">Snake Bite</option>

// <option value="Other">Other</option>

// </select>

// </div>

// )}

// </div>

// <div className="PatientRegistration-form-right">

// <div className="PatientRegistration-form-group">

// <label htmlFor="contactNumber">Contact Number:</label>

// <input type="tel" id="contactNumber" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="referredBy">Referred By:</label>

// <input type="text" id="referredBy" name="referredBy" value={formData.referredBy} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="conditionDuringArrival">Condition During Arrival:</label>

// <input type="text" id="conditionDuringArrival" name="conditionDuringArrival" value={formData.conditionDuringArrival} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="modeOfArrival">Mode of Arrival:</label>

// <input type="text" id="modeOfArrival" name="modeOfArrival" value={formData.modeOfArrival} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="careOfPerson">Care Of Person:</label>

// <input type="text" id="careOfPerson" name="careOfPerson" value={formData.careOfPerson} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="careOfPersonNumber">Care Of Person Number:</label>

// <input type="tel" id="careOfPersonNumber" name="careOfPersonNumber" value={formData.careOfPersonNumber} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="broughtBy">Brought By:</label>

// <input type="text" id="broughtBy" name="broughtBy" value={formData.broughtBy} onChange={handleChange} />

// </div>

// <div className="PatientRegistration-form-group">

// <label htmlFor="relationWithPatient">Relation with Patient:</label>

// <input type="text" id="relationWithPatient" name="relationWithPatient" value={formData.relationWithPatient} onChange={handleChange} />

// </div>

// </div>

// </div>



// <div className="PatientRegistration-button-container">

// <button type="submit" className="PatientRegistration-submit-button" disabled={loading}>

// Register

// </button>

// </div>

// </form>

// </div>

// );

// };



// export default EmergencyPatientRegistration;























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registration.css';

const EmergencyPatientRegistration = () => {
  const [formData, setFormData] = useState({
    priceCategory: "",
    firstName: "",
    middleName: "",
    lastName: "",
    religion: "",
    gender: "",
    haveDOB: false,
    age: "",
    ageUnit: "Years",
    country: "",
    county: "",
    address: "",
    contactNumber: "",
    referredBy: "",
    conditionDuringArrival: "",
    modeOfArrival: "",
    careOfPerson: "",
    careOfPersonNumber: "",
    broughtBy: "",
    relationWithPatient: "",
    dob: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.gender) {
      setErrorMessage("First Name, Last Name, and Gender are mandatory.");
      return false;
    }

    if (!formData.age && !formData.dob) {
      setErrorMessage("Please provide either Age or Date of Birth.");
      return false;
    }

    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      setErrorMessage("Contact Number must be 10 digits.");
      return false;
    }

    if (["Dog Bite", "Snake Bite", "Animal Bite"].includes(formData.caseType)) {
      if (!formData.bitingAddress || !formData.dateOfBite || !formData.bittenOn) {
        setErrorMessage("Please fill all fields related to the bite details.");
        return false;
      }
    }

    if (formData.caseType === "Medico-Legal" && !formData.medicoLegalType) {
      setErrorMessage("Please select the Medico-Legal type.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      age: formData.haveDOB ? undefined : formData.age,
      dob: formData.haveDOB ? formData.dob : undefined,
      firstAidGivenImmediately: formData.firstAidGiven || undefined,
      triages: [{ status: "Pending" }],
    };

    if (formData.caseType === "Dog Bite" || formData.caseType === "Snake Bite" || formData.caseType === "Animal Bite") {
      payload.bitingAddress = formData.bitingAddress;
      payload.dateOfBite = formData.dateOfBite;
      payload.bittenOn = formData.bittenOn;
    }

    if (formData.caseType === "Medico-Legal") {
      payload.medicoLegalType = formData.medicoLegalType;
    }

    console.log("Payload to be sent:", payload);

    try {
      setLoading(true);
      const response = await axios.post(`http://192.168.0.118:8081/api/emergency-patients`, payload);
      console.log("Server Response:", response.data);
      alert("Patient registered successfully!");

      setErrorMessage("");
      setFormData({
        priceCategory: "",
        firstName: "",
        middleName: "",
        lastName: "",
        religion: "",
        gender: "",
        haveDOB: false,
        dob: "",
        age: "",
        ageUnit: "Years",
        country: "",
        county: "",
        address: "",
        contactNumber: "",
        referredBy: "",
        conditionDuringArrival: "",
        modeOfArrival: "",
        careOfPerson: "",
        careOfPersonNumber: "",
        broughtBy: "",
        relationWithPatient: "",
        caseType: "",
        bitingAddress: "",
        dateOfBite: "",
        bittenOn: "",
        firstAidGiven: false,
        medicoLegalType: "",
      });
    } catch (error) {
      console.error("API Error:", error);
      setErrorMessage("Failed to register patient. Please check the details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsFormVisible(false); // Hide the form when cross button is clicked
  };

  return (
    isFormVisible && ( // Only render the form if `isFormVisible` is true
      <div className="PatientRegistration-container">
        <header className="PatientRegistration-header">
          <h1>Emergency Patient Registration</h1>
          <button className="PatientRegistration-close-button" onClick={handleClose}>✖</button>
        </header>
        <form className="PatientRegistration-form" onSubmit={handleSubmit}>
          <div className="PatientRegistration-form-group">
            <label htmlFor="priceCategory">Price Category:</label>
            <select id="priceCategory" name="priceCategory" value={formData.priceCategory} onChange={handleChange}>
              <option value="">Select Price Category</option>
              <option value="Normal">Normal</option>
              <option value="Discounted">Discounted</option>
              <option value="Free">Free</option>
            </select>
          </div>


          <div className="PatientRegistration-form-section">

<div className="PatientRegistration-form-left">

<div className="PatientRegistration-form-group">

<label htmlFor="firstName">First Name <span className="PatientRegistration-required">*</span>:</label>

<input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="middleName">Middle Name:</label>

<input type="text" id="middleName" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="lastName">Last Name <span className="PatientRegistration-required">*</span>:</label>

<input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="religion">Religion <span className="PatientRegistration-required">*</span>:</label>

<select id="religion" name="religion" value={formData.religion} onChange={handleChange}>

<option value="">Select Religion</option>

<option value="Christianity">Christianity</option>

<option value="Islam">Islam</option>

<option value="Hinduism">Hinduism</option>

<option value="Buddhism">Buddhism</option>

<option value="Other">Other</option>

</select>

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="gender">Gender <span className="PatientRegistration-required">*</span>:</label>

<select id="gender" name="gender" value={formData.gender} onChange={handleChange}>

<option value="">Select Gender</option>

<option value="Male">Male</option>

<option value="Female">Female</option>

<option value="Other">Other</option>

</select>

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="haveDOB">Have DOB?</label>

<input type="checkbox" id="haveDOB" name="haveDOB" checked={formData.haveDOB} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="age">Age:</label>

<div className="PatientRegistration-age-group">

<input type="number" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />

<select id="ageUnit" name="ageUnit" value={formData.ageUnit} onChange={handleChange}>

<option value="Years">Years</option>

<option value="Months">Months</option>

<option value="Days">Days</option>

</select>

</div>

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="county">County:</label>

<input type="text" id="county" name="county" placeholder="County" value={formData.county} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="address">Address:</label>

<input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="caseType">Case Type:</label>

<select id="caseType" name="caseType" value={formData.caseType} onChange={handleChange}>

<option value="">Select Case Type</option>

<option value="Emergency">Emergency</option>

<option value="Dog Bite">Dog Bite</option>

<option value="Snake Bite">Snake Bite</option>

<option value="Animal Bite">Animal Bite</option>

<option value="Emergency Labour">Emergency Labour</option>

<option value="Medico-Legal">Medico-Legal</option>

<option value="Accident">Accident</option>



</select>

</div>

{["Dog Bite", "Snake Bite", "Animal Bite"].includes(formData.caseType) && (

<>

<div className="PatientRegistration-form-group">

<label htmlFor="bitingAddress">Biting Address:</label>

<input type="text" id="bitingAddress" name="bitingAddress" placeholder="Biting Address" value={formData.bitingAddress} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="dateOfBite">Date of Bite:</label>

<input type="date" id="dateOfBite" name="dateOfBite" value={formData.dateOfBite} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="bittenOn">Bitten On:</label>

<input type="text" id="bittenOn" name="bittenOn" placeholder="Bitten On (e.g., arm, leg)" value={formData.bittenOn} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="firstAidGiven">First Aid Given Immediately:</label>

<input type="checkbox" id="firstAidGiven" name="firstAidGiven" checked={formData.firstAidGiven} onChange={handleChange} />

</div>

</>

)}

{formData.caseType === "Medico-Legal" && (

<div className="PatientRegistration-form-group">

<select id="medicoLegalType" name="medicoLegalType" value={formData.medicoLegalType} onChange={handleChange}>

<option value="">Select Type</option>

<option value="Assault">Assault</option>

<option value="RTA">RTA</option>

<option value="Burn">Burn</option>

<option value="Poisoning">Poisoning</option>

<option value="Hanging">Hanging</option>

<option value="Snake Bite">Snake Bite</option>

<option value="Other">Other</option>

</select>

</div>

)}

</div>

<div className="PatientRegistration-form-right">

<div className="PatientRegistration-form-group">

<label htmlFor="contactNumber">Contact Number:</label>

<input type="tel" id="contactNumber" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="referredBy">Referred By:</label>

<input type="text" id="referredBy" name="referredBy" value={formData.referredBy} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="conditionDuringArrival">Condition During Arrival:</label>

<input type="text" id="conditionDuringArrival" name="conditionDuringArrival" value={formData.conditionDuringArrival} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="modeOfArrival">Mode of Arrival:</label>

<input type="text" id="modeOfArrival" name="modeOfArrival" value={formData.modeOfArrival} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="careOfPerson">Care Of Person:</label>

<input type="text" id="careOfPerson" name="careOfPerson" value={formData.careOfPerson} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="careOfPersonNumber">Care Of Person Number:</label>

<input type="tel" id="careOfPersonNumber" name="careOfPersonNumber" value={formData.careOfPersonNumber} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="broughtBy">Brought By:</label>

<input type="text" id="broughtBy" name="broughtBy" value={formData.broughtBy} onChange={handleChange} />

</div>

<div className="PatientRegistration-form-group">

<label htmlFor="relationWithPatient">Relation with Patient:</label>

<input type="text" id="relationWithPatient" name="relationWithPatient" value={formData.relationWithPatient} onChange={handleChange} />

</div>

</div>

</div>

          <div className="PatientRegistration-button-container">
            <button type="submit" className="PatientRegistration-submit-button" disabled={loading}>Register</button>
          </div>
        </form>
      </div>
    )
  );
};

export default EmergencyPatientRegistration;
