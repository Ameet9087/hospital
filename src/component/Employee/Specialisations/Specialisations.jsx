// Specialisations.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Specialisations.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import IpMasterPopupTable from "../IPMaster/IpMasterPopupTable";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

function Specialisations({ onClose }) {
  const [activePopup, setActivePopup] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("Active");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const [specialisation, setSpecialisation] = useState({

    specialisationName: '',
    groupSpeciality: '',
    description: '',
    status: 'Active',
    hospitalSpecialisation: 'Yes',
    groupId: '',
  });
  const [message, setMessage] = useState("");
  const [specialisationsList, setSpecialisationsList] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const { specilityGroupName } = location.state || {};

  useEffect(() => {
    fetchSpecialisations();
  }, []);

  useEffect(() => {
    if (specilityGroupName) {
      setSpecialisation((prev) => ({
        ...prev,
        groupSpeciality: specilityGroupName,
      }));
    }
  }, [specilityGroupName]);

  const fetchSpecialisations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/specialityGroups`);
      const locationResponse = await axios.get(
        `${API_BASE_URL}/location-masters`
      );
      setLocations(locationResponse.data);
      setSpecialisationsList(response.data);
    } catch (error) {
      console.error("Error fetching specialisations:", error);
    }
  };

  const handleSearchClick = () => {
    navigate("/Display-SpecialityGroup");
  };

  const addSpecialisation = async () => {
    console.log(specialisation);

    try {
      await axios.post(`${API_BASE_URL}/specialisations`, specialisation);
      toast.success("Specialisation added successfully!");
      fetchSpecialisations();
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error adding specialisation:", error);
      toast.error("Failed to add specialisation.");
    }
  };

  const resetForm = () => {
    setSpecialisation({
      specialisationName: "",
      groupSpeciality: "",
      description: "",
      status: "Active",
      hospitalSpecialisation: "Yes",
    });
    setStatus("Active");
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setSpecialisation((prev) => ({ ...prev, status: newStatus }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpecialisation((prev) => ({ ...prev, [name]: value }));
  };

  const addRow = () => {
    setSelectedLocation((prev) => [...prev, { id: "", name: "" }]);
  };

  const handleLocationChange = (index, value) => {
    setSelectedLocation((prev) =>
      prev.map((loc, i) => (i === index ? { ...loc, name: value } : loc))
    );
  };
  const handleSelect = async (data) => {
    console.log(data);

    if (activePopup === "groupSpeciality" && data) {
      // Update the specialisation state with the selected group data
      setSpecialisation((prevState) => ({
        ...prevState,
        groupSpeciality: data.specialityGroup,

        groupId: data.groupId
      }));
    }
    if (activePopup === "location" && data) {
      // Update the specific row with the selected location
      setSelectedLocation((prevLocations) =>
        prevLocations.map((loc, i) =>
          i === editingRowIndex
            ? { ...loc, id: data.id, name: data.locationName }
            : loc
        )
      );
      setActivePopup(null); // Close the popup
      setEditingRowIndex(null); // Reset the editing row index
    }
  };

  const getPopupData = () => {
    if (activePopup === "groupSpeciality") {
      return { columns: ["specialityGroup"], data: specialisationsList };
    } else if (activePopup === "location") {
      return { columns: ["locationName"], data: locations };

    }
    else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();

  return (
    <div className="specialisations">
      <div className="specialisations__header">
        <h5>Specialisations</h5>
      </div>

      {message && <p className="specialisations__message">{message}</p>}

      <div className="specialisations__form-container">
        <div className="specialisations__form-group">
          <FloatingInput
            label="Specialisation *"
            type="text"
            name="specialisationName"
            value={specialisation.specialisationName}
            onChange={handleInputChange}
          />
        </div>

        <div className="specialisations__form-group">
          <FloatingInput
            label="Group Speciality *"
            type="search"
            name="groupSpeciality"
            value={specialisation.groupSpeciality}
            onChange={handleInputChange}
            onIconClick={() => setActivePopup("groupSpeciality")}
            
          />
        </div>

        <div className="specialisations__form-group">
          <FloatingInput
            label="Description *"
            type="text"
            name="description"
            value={specialisation.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="specialisations__form-group">
          <label>Status:</label>
          <div className="specialisations__radio-group">
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

        <div className="specialisations__form-group-sub">
          <FloatingSelect
            label="Hospital Specialisation *"
            name="hospitalSpecialisation"
            value={specialisation.hospitalSpecialisation}
            onChange={handleInputChange}
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            className="specialisations__form-group-sub-input"
          />
        </div>


        <div className="LocationsTable-container" tabIndex="0">
          <div className="LocationsTable-header">
            <span>LOCATIONS</span>
          
          </div>
          <table className="LocationsTable-table">
            <thead>
              <tr>
                <th>Add</th>
                <th>SN</th>
                <th>Locations</th>
              </tr>
            </thead>
            <tbody>
              {selectedLocation.map((location, index) => (
                <tr key={index}>
                  <td>
                    {index === 0 ? (
                      <span onClick={addRow} className="LocationsTable-action LocationsTable-add">
                        Add
                      </span>
                    ) : (
                      <span
                        onClick={() => setSelectedLocation(locations.filter((_, i) => i !== index))}
                        className="LocationsTable-action LocationsTable-delete"
                      >
                        Del
                      </span>
                    )}
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <FloatingInput
                     type="search"
                     value={location.name}
                     onChange={(e) => handleLocationChange(index, e.target.value)}
                     onIconClick={() => {
                      setActivePopup("location");
                      setEditingRowIndex(index);
                    }}/>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="specialisations__div-button">
        <button onClick={addSpecialisation} className="specialisations__submit-button">Save Specialisation </button>
        <button className="specialisations__submit-button" onClick={resetForm}>Reset</button>
        </div>
      </div>

      {activePopup && (
        <IpMasterPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
}

export default Specialisations;
