import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SpecialityGroup.css';
import useCustomAlert from '../../../alerts/useCustomAlert';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput, PopupTable } from "../../../FloatingInputs";
import { toast } from 'react-toastify';

function SpecialityMaster({ onClose }) {
  const [specialityGroup, setSpecialityGroup] = useState("");
  const [misHeads, setMisHeads] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const { success, warning, error, CustomAlerts } = useCustomAlert();
  const [activePopup, setActivePopup] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/location-masters`);
        setLocation(response.data);

      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchLocationData();
  }, []);

  const getPopupData = () => {
    if (activePopup === "location") {
      return {
        columns: ["id", "locationName", "locationCode"],
        data: location,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (activePopup === "location") {
      setSelectedLocation(data);
      console.log(data, "selectedLocation");
    }
    setActivePopup(null); // Close the popup after selection
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      specialityGroup,
      misHeads,
      description,
      status,
      locationMasterDTO: {
        id: selectedLocation?.id
      }
    };

    console.log(requestData, "Submitting Data");

    try {
      await axios.post(`${API_BASE_URL}/specialityGroups`, requestData);
      toast.success("Speciality Group Added");
      onClose();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data");
    }
  };
  const handleReset = () => {
    setSpecialityGroup("");
    setMisHeads("");
    setDescription("");
    setStatus("Active");
    setSelectedLocation(null);
  };

  return (
    <div className="speciality-group">
      <CustomAlerts />

      <div className="speciality-group__header">
        <h3>Speciality Group</h3>
      </div>

      <form onSubmit={handleSubmit} className="speciality-group__form-container">
        <div className="floor-form-group">
          <FloatingInput
            label={"Location"}
            type="search"
            value={selectedLocation?.locationName || ""}
            onIconClick={() => setActivePopup("location")}
            readOnly
          />
        </div>

        <div className="speciality-group__form-group">
          <FloatingInput
            label={"Speciality Group"}
            type="text"
            value={specialityGroup}
            onChange={(e) => setSpecialityGroup(e.target.value)}
            required
          />
        </div>

        <div className="speciality-group__form-group">
          <FloatingInput
            label={"MIS Heads"}
            type="text"
            value={misHeads}
            onChange={(e) => setMisHeads(e.target.value)}
            required
          />
        </div>

        <div className="speciality-group__form-group">
          <FloatingInput
            label={"Description"}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="speciality-group__form-group">
          <div className="speciality-group__radio-group">
            <label>Status: </label>
            <label>
              <input
                type="radio"
                value="Active"
                checked={status === "Active"}
                onChange={handleStatusChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={handleStatusChange}
              />
              Inactive
            </label>
          </div>
        </div>
<div className="speciality-group__div-button">
  
<button type="submit" className="speciality-group__submit-button">Submit</button>
        <button type="button" className="speciality-group__submit-button" onClick={handleReset}>Reset</button>
</div>
      </form>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
}

export default SpecialityMaster;
