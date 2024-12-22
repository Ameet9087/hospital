//prachi parab patientRegisteration css 13/9
import React, { useEffect, useState } from "react";
import "./GaurantorPage.css";
import PatientPopupTable from "./PatientPopupTable";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const GuarantorPage = ({ sendguarantordata, guarantorData }) => {
  const [states, setAllStates] = useState([]);
  const [activePopup, setActivePopup] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [guarantorDataPatient, setGuarantorDataPatient] = useState({
    relationWithPatient: "",
    self: "",
    guarantorName: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    street1: "",
    street2: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const fetchDataByPinCode = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/cities/area-details?areaPinCode=${guarantorDataPatient.zipCode}`
    );
    setGuarantorDataPatient((prevState) => ({
      ...prevState,
      birthCountry: response.data.countryName,
      state: response.data.stateName,
      city: response.data.cityName,
    }));
  };

  const fetchAllStates = async () => {
    const response = await axios.get(`${API_BASE_URL}/states`);
    setAllStates(response.data);
  };

  const fetchAllCities = async (id) => {
    const response = await axios.get(
      `${API_BASE_URL}/cities/getAllCities/${id}`
    );
    setAllCities(response.data);
  };

  useEffect(() => {
    fetchAllStates();
    fetchDataByPinCode();
  }, [guarantorDataPatient.zipCode]);

  const getPopupData = () => {
    if (activePopup === "state") {
      return { columns: ["statesId", "stateName"], data: states };
    } else if (activePopup === "city") {
      return {
        columns: ["cityId", "cityName", "areaPinCode"],
        data: allCities,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "state") {
      setGuarantorDataPatient((prevState) => ({
        ...prevState,
        state: data.stateName,
      }));
      await fetchAllCities(data.statesId);
    } else if (activePopup === "city") {
      setGuarantorDataPatient((prevState) => ({
        ...prevState,
        city: data.cityName,
      }));
    }
    setActivePopup(null); // Close the popup after selection
  };

  useEffect(() => {
    setGuarantorDataPatient({
      relationWithPatient: guarantorData?.relationWithPatient || "",
      self: guarantorData?.self || "",
      guarantorName: guarantorData?.guarantorName || "",
      gender: guarantorData?.gender || "",
      phoneNumber: guarantorData?.phoneNumber || "",
      dateOfBirth: guarantorData?.dateOfBirth || "",
      street1: guarantorData?.street1 || "",
      street2: guarantorData?.street2 || "",
      state: guarantorData?.state || "",
      city: guarantorData?.city || "",
      zipCode: guarantorData?.zipCode || "",
    });
  }, [guarantorData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setGuarantorDataPatient((prevState) => {
      const updatedData = { ...prevState, [name]: newValue };

      // Pass updated data to parent whenever there's a change
      sendguarantordata(updatedData);

      return updatedData;
    });
  };

  return (
    <>
      <div className="guarantor-page">
        <h5 style={{ marginBottom: "20px" }}>Guarantor Information</h5>
        <form className="guarantor-page-form">
          <div className="guarantor-page-form-columns">
            <div className="guarantor-page-left-column">
              <div className="guarantor-page-relationpatient">
                <label>
                  Relationship with Patient<span className="mandatory">*</span>:
                </label>
                <input
                  type="text"
                  name="relationWithPatient"
                  value={guarantorDataPatient?.relationWithPatient}
                  disabled={guarantorDataPatient.self}
                  onChange={handleChange}
                  style={{ height: "fit-content", width: "calc(100% - 30px)" }}
                  required
                />
                <span className="guarantor-page-or-text">OR</span>
                <label className="guarantor-page-self-checkbox">
                  <input
                    type="checkbox"
                    name="self"
                    value={"Yes"}
                    checked={guarantorDataPatient.self}
                    onChange={handleChange}
                  />
                  SELF
                </label>
              </div>
              <div className="guarantor-page-form-group">
                <label>
                  Name<span className="mandatory">*</span>:
                </label>
                <input
                  type="text"
                  name="guarantorName"
                  value={guarantorDataPatient.guarantorName}
                  onChange={handleChange}
                  disabled={guarantorDataPatient.self}
                />
              </div>
              <div className="guarantor-page-form-group">
                <label style={{ marginRight: "5px" }}>Gender:</label>
                <div className="guarantor-page-radio-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={guarantorDataPatient.gender === "Male"}
                      onChange={handleChange}
                      disabled={guarantorDataPatient.self}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={guarantorDataPatient.gender === "Female"}
                      onChange={handleChange}
                      disabled={guarantorDataPatient.self}
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={guarantorDataPatient.gender === "Other"}
                      onChange={handleChange}
                      disabled={guarantorDataPatient.self}
                    />{" "}
                    Other
                  </label>
                </div>
              </div>
              <div className="guarantor-page-form-group">
                <label>Phone number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={guarantorDataPatient.phoneNumber}
                  onChange={handleChange}
                  disabled={guarantorDataPatient.self}
                />
              </div>
              <div className="guarantor-page-form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={guarantorDataPatient.dateOfBirth}
                  onChange={handleChange}
                  disabled={guarantorDataPatient.self}
                />
              </div>
            </div>

            <div className="guarantor-page-right-column">
              <div className="guarantor-page-form-group">
                <label>State:</label>
                <input
                  type="text"
                  name="state"
                  value={guarantorDataPatient.state}
                  onChange={handleChange}
                  disabled={guarantorDataPatient.self}
                />
                <i
                  onClick={() => setActivePopup("state")}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
              <div className="guarantor-page-form-group">
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={guarantorDataPatient.city}
                  onChange={handleChange}
                  disabled={guarantorDataPatient.self}
                />
                <i
                  onClick={() => setActivePopup("city")}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>

              <div className="guarantor-page-form-group">
                <label>Street 1:</label>
                <input
                  type="text"
                  name="street1"
                  value={guarantorDataPatient.street1}
                  onChange={handleChange}
                  disabled={guarantorDataPatient.self}
                />
              </div>
              <div className="guarantor-page-form-group">
                <label>Street 2:</label>
                <input
                  type="text"
                  name="street2"
                  value={guarantorDataPatient.street2}
                  onChange={handleChange}
                  disabled={guarantorDataPatient.self}
                />
              </div>
              {/* <div className="guarantor-page-form-group">
              <label>Country:</label>
              <select name="country" value={guarantorData.country} onChange={handleChange}>
                <option value="">Select country</option>
              </select>
            </div> */}

              <div className="guarantor-page-form-group">
                <label>Zip code:</label>
                <input
                  type="text"
                  name="zipCode"
                  value={guarantorDataPatient.zipCode}
                  onChange={handleChange}
                  disabled={guarantorDataPatient.self === "Yes"}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {activePopup && (
        <PatientPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
};

export default GuarantorPage;
