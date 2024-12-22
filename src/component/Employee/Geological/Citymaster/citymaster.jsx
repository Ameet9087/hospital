import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import "./citymaster.css";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import GeolocationPopupTable from "../GeolocationPopupTable";

function CityMaster() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [openModel, setOpenModel] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
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

  const handleAddCity = async () => {
    const cityPayload = {
    cityName: cityData.cityName,
    area: cityData.area,
    areaPinCode: cityData.areaPinCode,
    statesDTO: {
      statesId: selectedStates?.statesId,
    },
  };
    const response = await axios.post(`${API_BASE_URL}/cities`, cityPayload);
    if (response.status === 200) {
      fetchCitiesData();
      handleClose();
    }
    handleClose();
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
                {["City ID", "City Name", "Area", "Pin Code", "State Name"].map(
                  (header, index) => (
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
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {cities.map((city, index) => (
                <tr key={index}>
                  <td>{city.cityId}</td>
                  <td>{city.cityName}</td>
                  <td>{city.area}</td>
                  <td>{city.areaPinCode}</td>
                  <td>{city.statesDTO?.stateName}</td>{" "}
                  {/* Displaying the State Name */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CustomModal isOpen={showModal} onClose={handleClose}>
          <h3>Add City</h3>
          <div className="citymaster-input-container">
            <label>City Name</label>
            <input
              type="text"
              placeholder="Enter city name"
              name="cityName"
              value={cityData.cityName}
              onChange={handleChange}
            />
          </div>
          <div className="citymaster-input-container">
            <label>Area</label>
            <input
              type="text"
              placeholder="Enter Area name"
              name="area"
              value={cityData.area}
              onChange={handleChange}
            />
          </div>
          <div className="citymaster-input-container">
            <label>Pin Code</label>
            <input
              type="text"
              placeholder="Enter pin code"
              name="areaPinCode"
              value={cityData.areaPinCode}
              onChange={handleChange}
            />
          </div>
          <div className="citymaster-input-container">
            <label>State Name</label>
            <div>
              <input
                type="text"
                placeholder="Enter state name"
                name="stateName"
                value={selectedStates?.stateName}
                onChange={handleChange}
              />
              <i
                onClick={() => setOpenModel(true)}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
          </div>
          <div className="citymaster-modal-footer">
            <button className="citymaster-save" onClick={handleAddCity}>
              Save Changes
            </button>
          </div>
        </CustomModal>
      </div>
      {openModel && (
        <GeolocationPopupTable
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
