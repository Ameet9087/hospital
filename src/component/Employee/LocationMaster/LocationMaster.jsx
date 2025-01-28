import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LocationMaster.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../api/api";
import DisplaySOC from "../SOCMaster/DisplaySOC";

function LocationMaster({ update, onClose, onSuccess }) {
  const location = useLocation();
  const { selectedSocName } = location.state || {};
  const [activePopup, setActivePopup] = useState(false);
  const [socs, setSocs] = useState([]);
  const [selectedSoc, setSelectedSoc] = useState(null);

  useEffect(() => {
    if (selectedSocName) {
      setSocName(selectedSocName); // Set the selected socName on page load
    }
  }, [selectedSocName]);

  const handleSelect = (data) => {
    setSelectedSoc(data);
  };

  const [locationData, setLocationData] = useState({
    locationName: update?.locationName || "",
    socName: update?.socName || "",
    currentDiscountPolicy: update?.currentDiscountPolicy || "",
    locationCode: update?.locationCode || "",
    hospitalName: update?.hospitalName || "",
    locationAddress: update?.locationAddress || "",
    phone: update?.phone || "",
    drugLicenseNo: update?.drugLicenseNo || "",
    squareFeetNo: update?.squareFeetNo || "",
    dhcpSequence: update?.dhcpSequence || "",
    toAddress: update?.toAddress || "",
    importNormalRangesFromLocation:
      update?.importNormalRangesFromLocation || false,
    parametersCount: update?.parametersCount || 0,
    providentFundCode: update?.providentFundCode || "",
    employeeNoStartsWith: update?.employeeNoStartsWith || "",
    description: update?.description || "",
    emailId: update?.emailId || "",
    helpMessage: update?.helpMessage || "",
    nonEmerStartTmeg: update?.nonEmerStartTmeg || "",
    nonEmerEndTmeg: update?.nonEmerEndTmeg || "",
    slotsOpenForWaitingList: update?.slotsOpenForWaitingList || "",
    transitDeptForOnlineIssues: update?.transitDeptForOnlineIssues || "",
    stateCode: update?.stateCode || "",
    gstNo: update?.gstNo || "",
    treatAsSeparateCompany: update?.treatAsSeparateCompany || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocationData({
      ...locationData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchSoc = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/socmasters`);
      setSocs(response.data);
    } catch (error) {
      console.error("Error fetching SOC Masters:", error);
    }
  };

  useEffect(() => {
    fetchSoc(); // Call the function here
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { ...locationData, socId: selectedSoc.socId };

    // Determine if it's an update or a new record
    const requestMethod = update ? "put" : "post";
    const url = update
      ? `${API_BASE_URL}/location-masters/${update.id}` // Assuming locationCode is unique and can be used for update
      : `${API_BASE_URL}/location-masters`;

    try {
      const response = await axios[requestMethod](url, formData);
      console.log("Location saved:", response.data);

      // Call onSuccess prop if it exists
      if (onSuccess) {
        onSuccess();
      }

      alert(
        update
          ? "Location updated successfully."
          : "Location data saved successfully."
      );
    } catch (error) {
      console.error("Error saving location:", error);
      alert(update ? "Unable to save updated data" : "Unable to save");
    }
  };
  const navigate = useNavigate();
  const handleSearchClick = () => {
    setActivePopup(true);
  };

  const getPopupData = () => {
    if (activePopup) {
      return { columns: ["socName"], data: socs };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();

  return (
    <>
      <div className="location-master">
        <div className="location-master__header">
          <h3 className="location-master__header-h3">Location Master</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="location-master__form-container"
        >
          <div className="location-master__left-column">
            <div className="location-master__form-group">
              <label>Location Name: *</label>
              <input
                type="text"
                name="locationName"
                value={locationData.locationName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="location-master__form-group">
              <label>SOC Name:*</label>
              <input
                type="text"
                name="socName"
                value={selectedSoc?.socName}
                required
              />
              <button
                type="button"
                className="search-icon-button"
                onClick={handleSearchClick}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <div className="location-master__form-group">
              <label style={{ width: "100px" }}>Current Discount Policy:</label>
              <input
                type="text"
                name="currentDiscountPolicy"
                value={locationData.currentDiscountPolicy}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>Location Code:</label>
              <input
                type="text"
                name="locationCode"
                value={locationData.locationCode}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>Hospital Name:</label>
              <input
                type="text"
                name="hospitalName"
                value={locationData.hospitalName}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>Location Address:</label>
              <textarea
                name="locationAddress"
                value={locationData.locationAddress}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="location-master__form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={locationData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>Drug License No:</label>
              <input
                type="text"
                name="drugLicenseNo"
                value={locationData.drugLicenseNo}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>Square Feet No:</label>
              <input
                type="text"
                name="squareFeetNo"
                value={locationData.squareFeetNo}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>DHCP Sequence:</label>
              <input
                type="text"
                name="dhcpSequence"
                value={locationData.dhcpSequence}
                onChange={handleChange}
                placeholder="Enter First 9 Integers of IP Address"
              />
            </div>
            <div className="location-master__form-group">
              <label>To Address:</label>
              <input
                type="text"
                name="toAddress"
                value={locationData.toAddress}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group-sub">
              <label style={{ width: "165px" }}>
                Import Normal Ranges From Location:
              </label>
              <div className="location-master__radio-group">
                <label>
                  <input
                    type="radio"
                    name="importNormalRangesFromLocation"
                    value={false}
                    checked={
                      locationData.importNormalRangesFromLocation === false
                    }
                    onChange={handleChange}
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="importNormalRangesFromLocation"
                    value={true}
                    checked={
                      locationData.importNormalRangesFromLocation === true
                    }
                    onChange={handleChange}
                  />
                  Yes
                </label>
              </div>
            </div>

            <div className="location-master__form-group">
              <label>Parameters Count:</label>
              <input
                type="text"
                name="parametersCount"
                value={locationData.parametersCount}
                readOnly
              />
            </div>
            <div className="location-master__form-group">
              <label style={{ width: "100px" }}>Provident Fund Code:</label>
              <input
                type="text"
                name="providentFundCode"
                value={locationData.providentFundCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit" className="location-master__submit-button">
                Save
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="location-master__right-column">
            <div className="location-master__form-group">
              <label style={{ width: "100px" }}>
                Employee No. Starts With:
              </label>
              <input
                type="text"
                name="employeeNoStartsWith"
                value={locationData.employeeNoStartsWith}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={locationData.description}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>Email Id:</label>
              <input
                type="email"
                name="emailId"
                value={locationData.emailId}
                onChange={handleChange}
              />
            </div>

            {/* Online Appointment Desk */}
            <div className="location-master__appointment-desk">
              <div className="location-master-headers">
                Online Appointment Desk
              </div>
              <div className="location-master__form-group">
                <label>Help Message:</label>
                <input
                  type="text"
                  name="helpMessage"
                  value={locationData.helpMessage}
                  onChange={handleChange}
                />
              </div>
              <div className="location-master__form-group">
                <label>Non Emer Start Tm:</label>
                <input
                  type="text"
                  name="nonEmerStartTmeg"
                  value={locationData.nonEmerStartTmeg}
                  onChange={handleChange}
                  placeholder="eg(0900)"
                />
              </div>
              <div className="location-master__form-group">
                <label>Non Emer End Tm:</label>
                <input
                  type="text"
                  name="nonEmerEndTmeg"
                  value={locationData.nonEmerEndTmeg}
                  onChange={handleChange}
                  placeholder="eg(1800)"
                />
              </div>
              <div className="location-master__form-group">
                <label style={{ width: "100px" }}>
                  No Of Slots Open For Waiting List In Doctor Appointments:
                </label>
                <input
                  type="text"
                  name="slotsOpenForWaitingList"
                  value={locationData.slotsOpenForWaitingList}
                  onChange={handleChange}
                />
              </div>
              <div className="location-master__form-group">
                <label style={{ width: "100px" }}>
                  Transit Dept For Online Issues: *
                </label>
                <input
                  type="text"
                  name="transitDeptForOnlineIssues"
                  value={locationData.transitDeptForOnlineIssues}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="location-master__form-group">
              <label>State Code:</label>
              <input
                type="text"
                name="stateCode"
                value={locationData.stateCode}
                onChange={handleChange}
              />
            </div>
            <div className="location-master__form-group">
              <label>GST No:</label>
              <input
                type="text"
                name="gstNo"
                value={locationData.gstNo}
                onChange={handleChange}
              />
            </div>

            <div className="location-master__checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="treatAsSeparateCompany"
                  checked={locationData.treatAsSeparateCompany}
                  onChange={handleChange}
                />
                Treat this location as Separate Company
              </label>
            </div>
            <div className="location-master__form-group">
              <a href="#" className="location-master__link">
                Create View for income
              </a>
            </div>
          </div>
        </form>
      </div>
      {activePopup && (
        <DisplaySOC
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </>
  );
}

export default LocationMaster;
