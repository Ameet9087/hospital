import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import "./citymaster.css";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput, PopupTable } from "../../../../FloatingInputs";
import { toast } from "react-toastify";

function CityMaster() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [openModel, setOpenModel] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [cityData, setCityData] = useState({
    cityName: "",
    area: "",
    areaPinCode: "",
  });
  const [selectedStates, setSelectedStates] = useState();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCityData({ ...cityData, [name]: value });
  };

  const fetchCitiesData = async () => {
    const response = await axios.get(`${API_BASE_URL}/cities`);
    setCities(response.data);
  };

  const fetchStatesData = async () => {
    const response = await axios.get(`${API_BASE_URL}/states`);
    setStates(response.data);
  };

  useEffect(() => {
    fetchStatesData();
    fetchCitiesData();
  }, []);

  const handleSaveCity = async () => {
    try {
      const cityPayload = {
        cityName: cityData.cityName,
        area: cityData.area,
        areaPinCode: cityData.areaPinCode,
        statesDTO: {
          statesId: selectedStates?.statesId,
        },
      };

      let response;
      if (isEditing) {
        response = await axios.put(
          `${API_BASE_URL}/cities/${cityData.cityId}`,
          cityPayload
        );
        toast.success("City updated successfully");
      } else {
        response = await axios.post(`${API_BASE_URL}/cities`, cityPayload);
        toast.success("City added successfully");
      }

      fetchCitiesData();
      handleClose();
    } catch (error) {
      toast.error("Something went wrong while saving the city");
    }
  };

  // Edit City
  const handleEditClick = (city) => {
    setCityData({
      cityId: city.cityId,
      cityName: city.cityName,
      area: city.area,
      areaPinCode: city.areaPinCode,
    });
    setSelectedStates(city.statesDTO);
    setIsEditing(true);
    setShowModal(true);
  };

  // Delete City
  const handleDeleteCity = async (cityId) => {
    try {
      await axios.delete(`${API_BASE_URL}/cities/${cityId}`);
      toast.success("City deleted successfully");
      fetchCitiesData();
    } catch (error) {
      toast.error("Failed to delete city");
    }
  };

  const getPopupData = () => {
    if (openModel) {
      return { columns: ["statesId", "stateName"], data: states };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (openModel) {
      setSelectedStates(data);
    }
  };

  return (
    <>
      <div className="citymaster-container">
        <button className="citymaster-add-btn" onClick={handleShow}>
          Add City
        </button>
        <div className="citymaster-table-container">
          <table className="citymaster-table" ref={tableRef}>
            <thead>
              <tr>
                {[
                  "City ID",
                  "City Name",
                  "Area",
                  "Pin Code",
                  "State Name",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
                    className="resizable-th"
                  >
                    <div className="header-content">
                      <span>{header}</span>
                      <div
                        className="resizer"
                        onMouseDown={startResizing(
                          tableRef,
                          setColumnWidths
                        )(index)}
                      ></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {cities.map((city, index) => (
                <tr key={index}>
                  <td>{city.cityId}</td>
                  <td>{city.cityName}</td>
                  <td>{city.area}</td>
                  <td>{city.areaPinCode}</td>
                  <td>{city.statesDTO?.stateName}</td>
                  <td>
                    <button
                      className="citymaster-edit-btn"
                      onClick={() => handleEditClick(city)}
                    >
                      Edit
                    </button>
                    <button
                      className="citymaster-delete-btn"
                      onClick={() => handleDeleteCity(city.cityId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CustomModal isOpen={showModal} onClose={handleClose}>
          <h3>{isEditing ? "Update City" : "Add City"}</h3>{" "}
          <div className="citymaster-input-container">
            <FloatingInput
              label={"City Name"}
              type="text"
              name="cityName"
              value={cityData.cityName}
              onChange={handleChange}
            />
          </div>
          <div className="citymaster-input-container">
            <FloatingInput
              label={"Area"}
              type="text"
              name="area"
              value={cityData.area}
              onChange={handleChange}
            />
          </div>
          <div className="citymaster-input-container">
            <FloatingInput
              label={"Pin Code"}
              type="text"
              restrictions={{ number: true }}
              name="areaPinCode"
              value={cityData.areaPinCode}
              onChange={handleChange}
            />
          </div>
          <div className="citymaster-input-container">
            <FloatingInput
              label={"State Name"}
              type="search"
              name="stateName"
              value={selectedStates?.stateName}
              onChange={handleChange}
              onIconClick={() => setOpenModel(true)}
            />
          </div>
          <div className="citymaster-modal-footer">
            <button className="citymaster-save" onClick={handleSaveCity}>
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </CustomModal>
      </div>
      {openModel && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setOpenModel(false)}
        />
      )}
    </>
  );
}

export default CityMaster;
