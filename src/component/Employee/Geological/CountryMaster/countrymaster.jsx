import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import "./countrymaster.css";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";

function Countrymaster() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState({
    countryId: "",
    countryName: "",
    countryShortName: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchCountriesData = async () => {
    const response = await axios.get(`${API_BASE_URL}/country`);
    setCountries(response.data);
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountryData({ ...countryData, [name]: value });
  };

  const handleAddCountry = async () => {
    const response = await axios.post(`${API_BASE_URL}/country`, countryData);
    if (response.status === 200) {
      fetchCountriesData();
      handleClose();
    }
  };

  return (
    <div className="countrymaster-container">
      <button className="countrymaster-add-btn" onClick={handleShow}>
        Add Country
      </button>

      {/* Country Table */}
      <div className="table-container">
        <table className="countrymaster-table" ref={tableRef}>
          <thead>
            <tr>
              {["Country ID", "Country Name", "Country Short Name"].map(
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
            {countries.map((country, index) => (
              <tr key={index}>
                <td>{country.countryId}</td>
                <td>{country.countryName}</td>
                <td>{country.countryShortName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Country Custom Modal */}
      <CustomModal isOpen={showModal} onClose={handleClose}>
        <h3>Add Country</h3>
        <div className="input-container">
          <label>Country Name</label>
          <input
            type="text"
            placeholder="Enter country name"
            name="countryName"
            value={countryData.countryName}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <label>Country Short Name</label>
          <input
            type="text"
            placeholder="Enter short name"
            name="countryShortName"
            value={countryData.countryShortName}
            onChange={handleChange}
          />
        </div>
        <div className="modal-footer">
          <button className="countrymasterclose" onClick={handleClose}>
            Close
          </button>
          <button className="countrymastersave" onClick={handleAddCountry}>
            Save Changes
          </button>
        </div>
      </CustomModal>
    </div>
  );
}

export default Countrymaster;
