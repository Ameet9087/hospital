import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import AddUnitOfMeasurement from "../components/AddUnitOfMeasurement"; // Ensure these imports are correct
import UpdateUnitOfMeasurement from "../components/UpdateUnitOfMeasurement";
import { useReactToPrint } from "react-to-print";
import "./UnitOfMeasurement.css";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
Modal.setAppElement("#root");

const UnitOfMeasurementComponent = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitOfMeasurements, setUnitOfMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/unitofmeasurement/fetchAll`
        );
        setUnitOfMeasurements(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);
  const openEditModal = (unit) => {
    setSelectedUnit(unit);
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Unit of Measurement",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="unit-of-measurement-container">
      <div className="uom-header">
        <button className="uom-add-button" onClick={openAddModal}>
          Add Unit of Measurement
        </button>
      </div>
      <div className="uom-filter">
        <div className="uom-search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div className="uom-results-info">
          Showing {unitOfMeasurements.length} / {unitOfMeasurements.length}{" "}
          results
          <button className="uom-print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
        </div>

      <div ref={tableRef} className="table-container">
        <table className="uom-table">
          <thead>
            <tr>
              <th>Unit of Measurement Name</th>
              <th>Description</th>
              <th>Is Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unitOfMeasurements.map((unit, index) => (
              <tr key={index}>
                <td>{unit.unitOfMeasurementName}</td>
                <td>{unit.description}</td>
                <td>{unit.active ? "true" : "false"}</td>
                <td>
                  <button
                    className="uom-edit-button"
                    onClick={() => openEditModal(unit)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Unit of Measurement */}
      <CustomModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        contentLabel="Add Unit of Measurement Modal"
      
      >
        <AddUnitOfMeasurement onClose={closeAddModal}/>
        
      </CustomModal>

      <CustomModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        contentLabel="Edit Unit of Measurement Modal"
       
      >
        {selectedUnit && (
          <UpdateUnitOfMeasurement
            unit={selectedUnit}
            closeModal={closeEditModal}
          />
        )}
       
      </CustomModal>
    </div>
  );
};

export default UnitOfMeasurementComponent;
