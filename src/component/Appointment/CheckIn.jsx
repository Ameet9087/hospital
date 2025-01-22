import React, { useEffect, useState } from "react";
import "./CheckIn.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/api";
import AppoitmentPopupTable from "./AppoitmentPopupTable";
const CheckIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePopup, setActivePopup] = useState("");
  const [country, setCountry] = useState([]);
  const [states, setAllStates] = useState([]);
  const [cities, setAllCities] = useState([]);

  const { patient } = location.state || "";

  const [formData, setFormData] = useState({
    firstName: patient?.firstName || "",
    middleName: patient?.middleName || "",
    lastName: patient?.lastName || "",
    dateOfBirth: patient?.dateOfBirth || "",
    age: patient?.age || "",
    ageUnit: patient?.ageUnit || "",
    gender: patient?.gender || "",
    phoneNumber: patient?.contactNumber || patient?.phoneNumber || "",
    alternateNumber: patient?.alternateNumber || "",
    country: patient?.country,
    state: patient?.state,
    city: patient?.city,
    zipCode: patient?.zipCode,
    address: patient?.address || "",
    email: patient?.email || "",
    visitType: "OPD",
    careOfPerson: patient?.careOfPerson || "",
    relationWithPatient: patient?.relationWithPatient || "",
    careOfPersonContact: patient?.careOfPersonContact || "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const currentDate = new Date();

    setFormData((prevState) => {
      let updatedData = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "dateOfBirth" && value) {
        // Calculate age when DOB is entered
        const birthDate = new Date(value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const isBeforeBirthday =
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate());
        updatedData.age = isBeforeBirthday ? age - 1 : age;
      }

      if (name === "age" && value) {
        // Calculate DOB when age is entered, starting from January 1st
        const years = parseInt(value, 10);
        const dobYear = currentDate.getFullYear() - years;
        const dobFromJanuary = new Date(dobYear, 0, 1); // January 1st of the calculated year
        updatedData.dateOfBirth = dobFromJanuary.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      }

      return updatedData;
    });
  };

  const fetchDataByPinCode = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/cities/area-details?areaPinCode=${formData.zipCode}`
    );
    setFormData((prevState) => ({
      ...prevState,
      country: response.data.countryName,
      state: response.data.stateName,
      city: response.data.cityName,
    }));
  };

  const fetchAllCountry = async () => {
    const response = await axios.get(`${API_BASE_URL}/country`);
    setCountry(response.data);
  };

  const fetchAllCities = async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/cities/getAllStatesId/${id}`
    );
    console.log(response.data);

    setAllCities(response.data);
  };

  useEffect(() => {
    fetchAllCountry();
    fetchDataByPinCode();
  }, [formData.zipCode]);

  const getPopupData = () => {
    if (activePopup === "country") {
      return { columns: ["countryId", "countryName"], data: country };
    } else if (activePopup === "state") {
      return { columns: ["statesId", "stateName"], data: states };
    } else if (activePopup === "city") {
      return { columns: ["cityId", "cityName"], data: cities };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_BASE_URL}/out-patient/update/${patient?.outPatientId}`,
        {
          method: `${patient?.outPatientId > 0 ? "PUT" : "POST"}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            age: parseInt(formData.age, 10),
            ageUnit: formData.ageUnit,
            gender: formData.gender,
            visitType: "OPD",
            phoneNumber: formData.phoneNumber,
            alternateNumber: formData.alternateNumber,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            zipCode: formData.zipCode,
            address: formData.address,
            email: formData.email,
            careOfPerson: formData.careOfPerson,
            relationWithPatient: formData.relationWithPatient,
            careOfPersonContact: formData.careOfPersonContact,
          }),
        }
      );
      navigate("/patient/opd");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSelect = async (data) => {
    if (activePopup === "country") {
      setFormData((prevState) => ({ ...prevState, country: data.countryName }));
      setAllStates(data.statesDTO);
    } else if (activePopup === "state") {
      setFormData((prevState) => ({ ...prevState, state: data.stateName }));
      await fetchAllCities(data.statesId);
    } else if (activePopup === "city") {
      setFormData((prevState) => ({ ...prevState, city: data.cityName }));
    }
    setActivePopup(null); // Close the popup after selection
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="checkIn__container">
          <div className="checkIn__header">
            <h5>Out Patient</h5>
          </div>

          <div className="checkIn__content">
            <div className="checkIn__section checkIn__section--patient">
              <h3 className="checkIn__section-title">
                <span className="checkIn__section-icon">👤</span> Patient
                Information
              </h3>
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
              <div className=" checkIn__form-group">
                <label className="checkIn__label">DOB / Age / Gender</label>
                <div className="checkIn__DOB-inputs">
                  <input
                    type="date"
                    className="checkIn__input"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  {/* <div>
                <label className="checkIn__label">
                  Age <span className="checkIn__required">*</span>
                </label> */}
                  <input
                    className="checkIn__input checkIn__age-inputs"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="ageUnit"
                    onChange={handleChange}
                    value={formData.ageUnit}
                    className="checkIn__select"
                  >
                    <option>Select Age Units</option>
                    <option value={"Yrs"}>Yrs</option>
                    <option value={"Months"}>Months</option>
                    <option value={"Days"}>Days</option>
                  </select>

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
              </div>
              {/* <div className="checkIn__form-group">
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
              </div> */}
              {/* <div className="checkIn__form-group">
                
              </div> */}
              {/* <div className="checkIn__form-group">
                <label className="checkIn__label">
                  Gender <span className="checkIn__required">*</span>
                </label>
               
              </div> */}
              <div className="checkIn__form-group">
                <label className="checkIn__label">
                  Contact Details. <span className="checkIn__required">*</span>
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
                    placeholder="Alternate Number"
                    name="alternateNumber"
                    value={formData.alternateNumber}
                    onChange={handleChange}
                  />
                  <input
                    className="checkIn__input"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="checkIn__form-group">
                <label className="checkIn__label">
                  Address <span className="checkIn__required">*</span>
                </label>
                <div className="checkIn__address-inputs">
                  <div className="checkIn_search-con">
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="checkIn__select"
                      placeholder="Country"
                    />
                    <i
                      onClick={() => setActivePopup("country")}
                      className="fa-solid fa-magnifying-glass"
                    />
                  </div>
                  <div className="checkIn_search-con">
                    <input
                      name="state"
                      value={formData.state}
                      className="checkIn__select"
                      onChange={handleChange}
                      placeholder="State"
                    />
                    <i
                      onClick={() => setActivePopup("state")}
                      className="fa-solid fa-magnifying-glass"
                    />
                  </div>
                  <div className="checkIn_search-con">
                    <input
                      className="checkIn__input"
                      type="text"
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                    <i
                      onClick={() => setActivePopup("city")}
                      className="fa-solid fa-magnifying-glass"
                    />
                  </div>
                  <div className="checkIn_search-con">
                    <input
                      className="checkIn__input"
                      type="text"
                      placeholder="PinCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="checkIn__form-group">
                <label className="checkIn__label">Address</label>
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
              <div className="checkIn__form-group">
                <label className="checkIn__label">Next Of KIN</label>
                <div className="checkIn__Kin-inputs">
                  <input
                    className="checkIn__input"
                    type="text"
                    placeholder="Care Taker Person"
                    name="careOfPerson"
                    value={formData.careOfPerson}
                    onChange={handleChange}
                  />
                  <input
                    className="checkIn__input"
                    type="text"
                    name="relationWithPatient"
                    value={formData.relationWithPatient}
                    onChange={handleChange}
                  />
                  <input
                    className="checkIn__input"
                    type="text"
                    placeholder="Care Takers Contact"
                    name="careOfPersonContact"
                    value={formData.careOfPersonContact}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* <div className="checkIn__form-group">
                <label className="checkIn__label">Relation With Patient</label>
                
              </div>
              <div className="checkIn__form-group">
                <label className="checkIn__label">Care of Person Contact</label>
                
              </div> */}
            </div>
            <button type="submit" className="checkIn__print-btn">
              Update
            </button>
          </div>
        </div>
      </form>
      \
      {activePopup && (
        <AppoitmentPopupTable
          data={data}
          columns={columns}
          onClose={() => setActivePopup(null)}
          onSelect={handleSelect}
        />
      )}
    </>
  );
};

export default CheckIn;
