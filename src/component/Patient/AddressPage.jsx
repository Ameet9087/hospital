//prachi parab patientRegisteration css 13/9

import React, { useEffect, useState } from "react";
import "./AddressPage.css";
import PatientPopupTable from "./PatientPopupTable";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const AddressPage = ({ sendaddressdata, addressData }) => {
  const [country, setCountry] = useState([]);
  const [states, setAllStates] = useState([]);
  const [activePopup, setActivePopup] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [addressDataPatient, setAddressDataPatinet] = useState({
    addressType: "Temporary",
    street1: "",
    street2: "",
    birthCountry: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const fetchDataByPinCode = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/cities/area-details?areaPinCode=${addressDataPatient.zipCode}`
    );
    setAddressDataPatinet((prevState) => ({
      ...prevState,
      birthCountry: response.data.countryName,
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
      `${API_BASE_URL}/cities/getAllCities/${id}`
    );
    setAllCities(response.data);
  };

  useEffect(() => {
    fetchAllCountry();
    fetchDataByPinCode();
  }, [addressDataPatient.zipCode]);

  const getPopupData = () => {
    if (activePopup === "country") {
      return { columns: ["countryId", "countryName"], data: country };
    } else if (activePopup === "state") {
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
    if (activePopup === "country") {
      setAddressDataPatinet((prevState) => ({
        ...prevState,
        birthCountry: data.countryName,
      }));
      console.log(data);
      setAllStates(data.statesDTO);
    } else if (activePopup === "state") {
      setAddressDataPatinet((prevState) => ({
        ...prevState,
        state: data.stateName,
      }));
      await fetchAllCities(data.statesId);
    } else if (activePopup === "city") {
      setAddressDataPatinet((prevState) => ({
        ...prevState,
        city: data.cityName,
      }));
    }
    setActivePopup(null); // Close the popup after selection
  };

  useEffect(() => {
    setAddressDataPatinet({
      addressType: addressData?.addressType || "",
      street1: addressData?.street1 || "",
      street2: addressData?.street2 || "",
      birthCountry: addressData?.birthCountry || "",
      state: addressData?.state || "",
      city: addressData?.city || "",
      zipCode: addressData?.zipCode || "",
    });
  }, [addressData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressDataPatinet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    sendaddressdata({ ...addressDataPatient, [name]: value });
  };

  return (
    <>
      <div className="address-page-container">
        <div className="address-page-main-content">
          <h5>Address Information</h5>
          <form className="address-page-form">
            <div className="address-page-form-row">
              <div className="address-page-form-group">
                <label htmlFor="addressType">
                  Address Type<span className="mandatory">*</span> :
                </label>
                <select
                  id="addressType"
                  name="addressType"
                  value={addressDataPatient.addressType}
                  onChange={handleChange}
                  required
                >
                  <option value="Temporary">Temporary</option>
                  <option value="Permanent">Permanent</option>
                </select>
              </div>
              <div className="address-page-form-group">
                <label htmlFor="street1">
                  Street 1<span className="mandatory">*</span> :
                </label>
                <input
                  type="text"
                  id="street1"
                  name="street1"
                  value={addressDataPatient.street1}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="address-page-form-row">
              <div className="address-page-form-group">
                <label htmlFor="street2">Street 2:</label>
                <input
                  type="text"
                  id="street2"
                  name="street2"
                  value={addressDataPatient.street2}
                  onChange={handleChange}
                />
              </div>

              <div className="address-page-form-group">
                <label htmlFor="birthCountry">
                  Birth Country<span className="mandatory">*</span>:
                </label>
                <input
                  type="text"
                  id="birthCountry"
                  name="birthCountry"
                  value={addressDataPatient.birthCountry}
                  onChange={handleChange}
                  required
                />
                <i
                  onClick={() => setActivePopup("country")}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="address-page-form-row">
              <div className="address-page-form-group">
                <label htmlFor="state">
                  State<span className="mandatory">*</span> :
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={addressDataPatient.state}
                  onChange={handleChange}
                  required
                />
                <i
                  onClick={() => setActivePopup("state")}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
              <div className="address-page-form-group">
                <label htmlFor="city">
                  City<span className="mandatory">*</span> :
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={addressDataPatient.city}
                  onChange={handleChange}
                  required
                />
                <i
                  onClick={() => setActivePopup("city")}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
            </div>
            <div className="address-page-form-row">
              <div className="address-page-form-group">
                <label htmlFor="zipCode">Zip Code:</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={addressDataPatient.zipCode}
                  onChange={handleChange}
                />
              </div>
              <div className="address-page-form-group"></div>
            </div>
          </form>
        </div>
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

export default AddressPage;
