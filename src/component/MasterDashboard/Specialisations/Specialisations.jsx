// Specialisations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Specialisations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function Specialisations() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("Active");
  const [locations, setLocations] = useState([{ id: 1, name: '' }]);
  const [specialisation, setSpecialisation] = useState({
    specialisationName: '',
    groupSpeciality: '',
    description: '',
    status: 'Active',
    hospitalSpecialisation: 'Yes',
  });
  const [message, setMessage] = useState('');
  const [specialisationsList, setSpecialisationsList] = useState([]);

  // Extract specilityGroupName from the passed state in location
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
      const response = await axios.get('http://192.168.0.101:8086/api/specialisations');
      setSpecialisationsList(response.data);
    } catch (error) {
      console.error("Error fetching specialisations:", error);
    }
  };

  const handleSearchClick = () => {
    navigate('/Display-SpecialityGroup');
  };

  const addSpecialisation = async () => {
    try {
      await axios.post('http://192.168.0.101:8086/api/specialisations', {
        ...specialisation,
        locations,
      });
      setMessage("Specialisation added successfully!");
      fetchSpecialisations();
      resetForm();
    } catch (error) {
      console.error("Error adding specialisation:", error);
      setMessage("Failed to add specialisation.");
    }
  };

  const resetForm = () => {
    setSpecialisation({
      specialisationName: '',
      groupSpeciality: '',
      description: '',
      status: 'Active',
      hospitalSpecialisation: 'Yes',
    });
    setLocations([{ id: 1, name: '' }]);
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
    const newRow = { id: locations.length + 1, name: '' };
    setLocations((prev) => [...prev, newRow]);
  };

  const deleteRow = (id) => {
    setLocations((prev) => prev.filter((location) => location.id !== id));
  };

  const handleLocationChange = (index, value) => {
    setLocations((prev) => {
      const updatedLocations = [...prev];
      updatedLocations[index].name = value;
      return updatedLocations;
    });
  };

  return (
    <div className="specialisations">
      <div className="specialisations__header">
        <h3>Specialisations</h3>
      </div>

      {message && <p className="specialisations__message">{message}</p>}

      <div className="specialisations__form-container">
        <div className="specialisations__form-group">
          <label>Specialisation: *</label>
          <input
            type="text"
            name="specialisationName"
            value={specialisation.specialisationName}
            onChange={handleInputChange}
          />
        </div>

        <div className="specialisations__form-group">
          <label>Group Speciality: *</label>
          <input
            type="text"
            name="groupSpeciality"
            value={specialisation.groupSpeciality}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="search-icon-button"
            onClick={handleSearchClick}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="specialisations__form-group">
          <label>Description: *</label>
          <input
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

        <div className="specialisations__form-group">
          <label>Hospital Specialisation: *</label>
          <select
            name="hospitalSpecialisation"
            value={specialisation.hospitalSpecialisation}
            onChange={handleInputChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="LocationsTable-container" tabIndex="0">
          <div className="LocationsTable-header">
            <span>LOCATIONS</span>
            <span className="LocationsTable-instruction">(Control + Enter For New Row)</span>
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
              {locations.map((location, index) => (
                <tr key={location.id}>
                  <td>
                    {index === 0 ? (
                      <span onClick={addRow} className="LocationsTable-action LocationsTable-add">Add</span>
                    ) : (
                      <span onClick={() => deleteRow(location.id)} className="LocationsTable-action LocationsTable-delete">Del</span>
                    )}
                  </td>
                  <td>{location.id}</td>
                  <td>
                    <input
                      type="text"
                      value={location.name}
                      onChange={(e) => handleLocationChange(index, e.target.value)}
                      className="LocationsTable-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={addSpecialisation} className="specialisations__submit-button">
          Save Specialisation
        </button>

        <div className="specialisations__list">
          <h4>Specialisations List</h4>
          <ul>
            {specialisationsList.map((spec) => (
              <li key={spec.specialisationId}>
                {spec.specialisationName} - {spec.groupSpeciality} - {spec.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Specialisations;
