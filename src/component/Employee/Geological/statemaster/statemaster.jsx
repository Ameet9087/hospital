import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import "./statemaster.css";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  PopupTable,
} from "../../../../FloatingInputs";

function StateMaster() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [stateData, setStateData] = useState({
    stateId: null,
    stateName: "",
  });

  const handleShow = () => {
    setStateData({ stateId: null, stateName: "" });
    setSelectedCountries(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    setShowModal(false);
  };

  const fetchCountriesData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/country`);
      setCountries(response.data);
    } catch (error) {
      toast.error("Failed to fetch countries");
    }
  };

  const fetchStatesData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/states`);
      setStates(response.data);
    } catch (error) {
      toast.error("Failed to fetch states");
    }
  };

  useEffect(() => {
    fetchCountriesData();
    fetchStatesData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateData({ ...stateData, [name]: value });
  };

  const handleSaveState = async () => {
    try {
      // Create a copy of stateData and remove stateId for new entries
      const requestData = {
        stateName: stateData.stateName,
        countryDTO: { countryId: selectedCountries?.countryId },
      };

      let response;
      if (isEditing) {
        response = await axios.put(
          `${API_BASE_URL}/states/${stateData.stateId}`,
          requestData
        );
        toast.success("State updated successfully");
      } else {
        response = await axios.post(`${API_BASE_URL}/states`, requestData);
        toast.success("State added successfully");
      }

      if (response.status === 200) {
        fetchStatesData();
        handleClose();
      }
    } catch (error) {
      toast.error("Something went wrong while saving the state");
    }
  };

  const handleEditClick = (state) => {
    setStateData({
      stateId: state.statesId,
      stateName: state.stateName,
    });
    setSelectedCountries(state.countryDTO);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteState = async (stateId) => {
    try {
      await axios.delete(`${API_BASE_URL}/states/${stateId}`);
      fetchStatesData();
      toast.success("State deleted successfully");
    } catch (error) {
      toast.error("Something went wrong while deleting the state");
    }
  };

  const getPopupData = () => ({
    columns: openPopup ? ["countryId", "countryName"] : [],
    data: openPopup ? countries : [],
  });

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
                {["State ID", "State Name", "Country", "Action"].map(
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
              {states?.map((state, index) => (
                <tr key={index}>
                  <td>{state.statesId}</td>
                  <td>{state.stateName}</td>
                  <td>{state.countryDTO.countryName}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(state)}
                      className="statemaster-edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteState(state.statesId)}
                      className="statemaster-delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit State Custom Modal */}
        <CustomModal isOpen={showModal} onClose={handleClose}>
          <h3>{isEditing ? "Update State" : "Add State"}</h3>
          <div className="statemaster-input-container">
            <FloatingInput
              label="State Name"
              type="text"
              name="stateName"
              value={stateData.stateName}
              onChange={handleChange}
            />
          </div>
          <div className="statemaster-input-container">
            <FloatingInput
              label="Country"
              type="search"
              name="country"
              value={selectedCountries?.countryName || ""}
              onChange={handleChange}
              onIconClick={() => setOpenPopup(true)}
            />
          </div>
          <div className="statemaster-modal-footer">
            <button className="statemaster-save" onClick={handleSaveState}>
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </CustomModal>
      </div>

      {openPopup && (
        <PopupTable
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
