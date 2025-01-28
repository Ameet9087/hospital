import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import "./statemaster.css";
import GeolocationPopupTable from "../GeolocationPopupTable";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";

function StateMaster() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState();

  const [stateData, setStateData] = useState({
    stateName: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchCountriesData = async () => {
    const response = await axios.get(`${API_BASE_URL}/country`);
    setCountries(response.data);
  };

  const fetchStatesData = async () => {
    const response = await axios.get(`${API_BASE_URL}/states`);
    setStates(response.data);
  };

  useEffect(() => {
    fetchCountriesData();
    fetchStatesData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateData({ ...stateData, [name]: value });
  };

  const handleAddState = async () => {
    stateData.countryDTO = {
      countryId: selectedCountries?.countryId,
    };
    const response = await axios.post(`${API_BASE_URL}/states`, stateData);
    if (response.status === 200) {
      fetchStatesData();
      handleClose();
      alert("State Added Successfully");
    }
  };

  const getPopupData = () => {
    if (openPopup) {
      return { columns: ["countryId", "countryName"], data: countries };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (openPopup) {
      setSelectedCountries(data);
    }
  };

  return (
    <>
      <div className="statemaster-container">
        <button className="statemaster-add-btn" onClick={handleShow}>
          Add State
        </button>

        {/* State Table */}
        <div className="statemaster-table-container">
          <table className="statemaster-table" ref={tableRef}>
            <thead>
              <tr>
                {["State ID", "State Name", "Country"].map((header, index) => (
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
              {states?.map((state, index) => (
                <tr key={index}>
                  <td>{state.statesId}</td>
                  <td>{state.stateName}</td>
                  <td>{state.countryDTO.countryName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add State Custom Modal */}
        <CustomModal isOpen={showModal} onClose={handleClose}>
          <h3>Add State</h3>
          <div className="statemaster-input-container">
            <label>State Name</label>
            <input
              type="text"
              placeholder="Enter state name"
              name="stateName"
              value={stateData.stateName}
              onChange={handleChange}
            />
          </div>
          <div className="statemaster-input-container">
            <label>Country</label>
            <div>
              <input
                type="text"
                placeholder="Enter country"
                name="country"
                value={selectedCountries?.countryName}
                onChange={handleChange}
              />
              <i
                onClick={() => setOpenPopup(true)}
                className="fa-solid fa-magnifying-glass"
              ></i>
            </div>
          </div>
          <div className="statemaster-modal-footer">
            <button className="statemaster-save" onClick={handleAddState}>
              Save Changes
            </button>
          </div>
        </CustomModal>
      </div>
      {openPopup && (
        <GeolocationPopupTable
          columns={columns}
          onSelect={handleSelect}
          onClose={() => setOpenPopup(false)}
          data={data}
        />
      )}
    </>
  );
}

export default StateMaster;
