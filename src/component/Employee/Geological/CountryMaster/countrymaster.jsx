import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import "./countrymaster.css";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput } from "../../../../FloatingInputs";
import { toast } from "react-toastify";

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

  const handleSave = async () => {
    try {
      if (countryData.countryId) {
        await axios.put(
          `${API_BASE_URL}/country/${countryData.countryId}`,
          countryData
        );
        toast.success("Country Updated Successfully");
      } else {
        // Add new country
        await axios.post(`${API_BASE_URL}/country`, countryData);
        toast.success("Country Added Successfully");
      }
      fetchCountriesData();
      handleClose();
    } catch (error) {
      console.error("Error saving country:", error);
      toast.error("Failed to save country");
    }
  };

  const handleEdit = (country) => {
    setCountryData(country);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/country/${id}`);
      toast.success("Country Deleted Successfully");
      fetchCountriesData();
    } catch (error) {
      console.error("Error deleting country:", error);
      toast.error("Failed to delete country");
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
              {[
                "Country ID",
                "Country Name",
                "Country Short Name",
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
            {countries.map((country, index) => (
              <tr key={index}>
                <td>{country.countryId}</td>
                <td>{country.countryName}</td>
                <td>{country.countryShortName}</td>
                <td>
                  <button
                    className="countrymaster-edit-btn"
                    onClick={() => handleEdit(country)}
                  >
                    Edit
                  </button>
                  <button
                    className="countrymaster-delete-btn"
                    onClick={() => handleDelete(country.countryId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Country Custom Modal */}
      <CustomModal isOpen={showModal} onClose={handleClose}>
        <div className="country-container">
          <h3>{countryData.countryId ? "Edit Country" : "Add Country"}</h3>
          <div className="input-container">
            <FloatingInput
              label={"Country Name"}
              type="text"
              name="countryName"
              value={countryData.countryName}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <FloatingInput
              label={"Country Short Name"}
              type="text"
              placeholder="Enter short name"
              name="countryShortName"
              value={countryData.countryShortName}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <button className="countrymastersave" onClick={handleSave}>
              {countryData.countryId ? "Update" : "Save"} Country
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

export default Countrymaster;
