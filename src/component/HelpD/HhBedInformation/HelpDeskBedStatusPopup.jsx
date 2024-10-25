import React, { useEffect, useState } from "react";
import "./helpDeskBedStatusPop.css";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";

function HelpDeskBedStatusPopup({ id, setBedStatus, wardName }) {
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    if (id != null) {
      // Fetching bed details by ward ID
      axios
        .get(`${API_BASE_URL}/manage-bed/getBedCountByWard/${id}`) // Make sure this endpoint matches your backend
        .then((res) => setBeds(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  // Calculate the number of available, reserved, and occupied beds
  const getBedCounts = () => {
    const counts = { occupied: 0, available: 0, reserved: 0 };

    // Iterate over the beds to categorize them based on status
    beds.forEach((bed) => {
      if (bed.BedStatus == "Occupied") {
        counts.occupied++;
      } else if (bed.BedStatus == "Available") {
        counts.available++;
      } else if (bed.BedStatus == "Reserved") {
        counts.reserved++;
      }
    });

    return counts;
  };

  const bedCounts = getBedCounts();

  // Helper function to generate bed divs based on count and status
  const renderBedDivs = (status) => {
    return beds
      .filter((bed) => bed.BedStatus == status)
      .map((bed, i) => (
        <div
          className={`helpDesk-bed helpDesk-${status}`}
          key={i}
          title={
            bed.PatientId
              ? `Patient Id: ${bed.PatientId} \nPatient: ${bed.PatientFirstName} ${bed.PatientLastName} \nAdmission Date: ${bed.AdmissionDate} \n`
              : ""
          }
        >
          <i className="fa-solid fa-bed"></i>
          <p>{`Bed #${bed.BedNumber || "N/A"}`}</p>
          {status == "Occupied" && bed.PatientId && (
            <span className="helpDesk-patient-info">
              {`Patient Id: ${bed.PatientId}`}
              <br />
              {`Patient Name: ${bed.PatientFirstName} ${bed.PatientLastName}`}
              <br />
              {`Admission Date: ${bed.AdmissionDate}`}
            </span>
          )}
        </div>
      ));
  };

  return (
    <div className="helpDesk-popup">
      <div className="helpDesk-popup-content">
        <h3>
          Bed Occupancy of: <span>{wardName}</span>
        </h3>

        <div className="helpDesk-bed-status">
          {bedCounts.occupied > 0 && (
            <div className="helpDesk-bed-section">
              <h4>Occupied Beds ({bedCounts.occupied})</h4>
              <div className="helpDesk-beds">{renderBedDivs("Occupied")}</div>
            </div>
          )}

          {/* Available Beds Section */}
          {bedCounts.available > 0 && (
            <div className="helpDesk-bed-section">
              <h4>Available Beds ({bedCounts.available})</h4>
              <div className="helpDesk-beds">{renderBedDivs("Available")}</div>
            </div>
          )}

          {/* Reserved Beds Section */}
          {bedCounts.reserved > 0 && (
            <div className="helpDesk-bed-section">
              <h4>Reserved Beds ({bedCounts.reserved})</h4>
              <div className="helpDesk-beds">{renderBedDivs("Reserved")}</div>
            </div>
          )}
        </div>

        <button
          onClick={() => setBedStatus(false)}
          className="helpDesk-close-popup-button"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default HelpDeskBedStatusPopup;
