/* Ajhar Tamboli rdlEditDrEditBtn.jsx 19-09-24 */

import React, { useEffect, useState } from "react";
import "../EditDoctors/rdlEditDrEditBtn.css";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import RadiologyPopupTable from "../RadiologyPopupTable";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../FloatingInputs";

function rdlEditDrEditBtn({ onClose, selectedRequest }) {
  const [reportingDoctor, setReportingDoctor] = useState();
  const [doctorList, setDoctorList] = useState([]);
  const [activePopup, setActivePopup] = useState(false);

  const fetchAllDoctors = async () => {
    const response = await axios.get(`${API_BASE_URL}/radiology-signatories`);
    const extractedEmployeeDTOs = response.data.map(
      (doctor) => doctor.employeeDTO
    );
    setDoctorList(extractedEmployeeDTOs);
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const getPopupData = () => {
    if (activePopup) {
      return {
        columns: ["employeeId", "firstName", "lastName"],
        data: doctorList,
      };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = (data) => {
    if (activePopup) {
      setReportingDoctor(data);
    }
  };

  const handleUpdate = async () => {
    const prescriberId = reportingDoctor?.employeeId;
    const imagingId = selectedRequest.imagingId;
    try {
      await axios.put(
        `${API_BASE_URL}/imaging-requisitions/approve-by?performerId=${prescriberId}&imagingId=${imagingId}`
      );
      toast.success("Doctor Changed Successfully");
      onClose();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="rdlEditDrEditBtn-popup-overlay">
        <div className="rdlEditDrEditBtn-popup-content">
          <div className="rdlEditDrEditBtn-transaction-container">
            <div className="rdlEditDrEditBtn-transaction-header">
              <div className="rdlEditDrEditBtn-transaction-date">
                <span>Transaction Date:</span>
                <span>
                  {new Date(selectedRequest.imagingDate).toDateString()}
                </span>
              </div>
              <div className="rdlEditDrEditBtn-patient-name">
                <span>Patient Name:</span>
                <span>
                  {selectedRequest.inPatientDTO?.patient?.salutation ||
                    selectedRequest.outPatientDTO?.patient?.salutation}{" "}
                  {selectedRequest.inPatientDTO?.patient?.firstName ||
                    selectedRequest.outPatientDTO?.patient?.firstName}{" "}
                  {selectedRequest.inPatientDTO?.patient?.lastName ||
                    selectedRequest.outPatientDTO?.patient?.lastName}
                </span>
              </div>
            </div>

            <table className="rdlEditDrEditBtn-transaction-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Item Name</th>
                  <th>Reporting Doctor (Radiologist)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {
                      selectedRequest.imagingItemDTO?.imagingType
                        ?.imagingTypeName
                    }
                  </td>
                  <td>{selectedRequest.imagingItemDTO.imagingItemName}</td>
                  <td>
                    {selectedRequest.performerDTO?.salutation}{" "}
                    {selectedRequest.performerDTO?.firstName}{" "}
                    {selectedRequest.performerDTO?.lastName}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="rdlEditDrEditBtn-reporting-doctor">
              <FloatingInput
                label={"Reporting Doctor"}
                type="search"
                value={reportingDoctor?.employeeId}
                onIconClick={() => setActivePopup(true)}
              />
            </div>
            <button
              className="rdlEditDrEditBtn-update-button"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button className="rdlEditDrEditBtn-close-button" onClick={onClose}>
              ×
            </button>
          </div>
        </div>
      </div>
      {activePopup && (
        <RadiologyPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </>
  );
}

export default rdlEditDrEditBtn;
