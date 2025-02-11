import React, { useEffect, useState } from "react";
import CustomModal from "../../../CustomModel/CustomModal";
import LocationMaster from "./LocationMaster";
import "./LocationMaster.css"; // Ensure this file contains the CSS for Location component
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { useFilter } from "../../ShortCuts/useFilter";

const Location = () => {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateLoc, setUpdateLoc] = useState({});
  const [showUpdate, setShowUpdate] = useState(false);
  const [triggerReload, setTriggerReload] = useState(0); // New state to trigger reload

  const handleClose = () => {
    setShow(false);
    setShowUpdate(false);
  };

  const fetchLocation = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/location-masters`);
      setLocation(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, [triggerReload]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSuccessfulUpdate = () => {
    handleClose();
    setTriggerReload((prev) => prev + 1); // Increment to trigger reload
  };

  const filteredItems = useFilter(location, searchTerm);

  const handleUpdate = (item) => {
    setUpdateLoc(item);
    setShowUpdate(true);
  };

  return (
    <div className="Location">
      <div className="Location-header">
        <button className="Location-add-btn" onClick={() => setShow(true)}>
          Add Location
        </button>
        <input
          type="text"
          className="soc-master-search"
          placeholder="Search location Master..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="Location-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Location Name</th>
            <th>Location Code</th>
            <th>Location Address</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredItems) &&
            filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.locationName}</td>
                <td>{item.locationCode}</td>
                <td>{item.locationAddress}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    className="Location-add-btn"
                    onClick={() => handleUpdate(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <CustomModal isOpen={show} onClose={handleClose}>
        <LocationMaster
          onClose={handleClose}
          onSuccess={handleSuccessfulUpdate}
        />
      </CustomModal>
      <CustomModal isOpen={showUpdate} onClose={handleClose}>
        <LocationMaster
          update={updateLoc}
          onClose={handleClose}
          onSuccess={handleSuccessfulUpdate}
        />
      </CustomModal>
    </div>
  );
};

export default Location;
