import React, { useState, useEffect } from "react";
import "./IpInformation.css";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { FloatingSelect } from "../../../FloatingInputs";

const IpInformation = () => {
  const [roomType, setRoomType] = useState("");
  const [bedStatus, setBedStatus] = useState("");
  const [beds, setBeds] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]); // To store room types fetched from API

  // Fetch room types on component mount
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/room-types`);
        setRoomTypes(response.data); // Assuming the API returns an array of room types
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  // Fetch beds whenever filters change
  useEffect(() => {
    const fetchFilteredBeds = async () => {
      try {
        let response;
        if (bedStatus === "Available") {
          response = await axios.get(`${API_BASE_URL}/beds/available-beds`);
        } else if (bedStatus === "All") {
          response = await axios.get(`${API_BASE_URL}/beds`);
        } else if (bedStatus === "Occupied") {
          const params = {
            bedStatus: "Occupied", // Explicitly set to "Occupied"
            roomTypeId: roomType || undefined,
          };
          response = await axios.get(
            `${API_BASE_URL}/ip-admissions/available`,
            { params }
          );
        } else {
          console.warn("Invalid bed status");
          return;
        }

        setBeds(response.data); // Assuming the API returns filtered beds
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching beds:", error);
      }
    };

    // Fetch filtered beds when roomType or bedStatus changes
    if (roomType || bedStatus) {
      fetchFilteredBeds();
    }
  }, [roomType, bedStatus]);
  // Refetch beds whenever filters change

  return (
    <div className="bed-booking">
      <h1 className="bed-booking__heading">Book Your Bed</h1>

      {/* Filters */}
      <div className="bed-booking__filters">
        <FloatingSelect
          label={"Room Types"}
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          options={
            Array.isArray(roomTypes)
              ? roomTypes.map((type) => ({
                  value: type.id,
                  label: type.roomtype,
                }))
              : []
          }
        />

        <FloatingSelect
          label={"Bed Status"}
          value={bedStatus}
          onChange={(e) => setBedStatus(e.target.value)}
          options={[
            { value: "All", label: "All" },
            { value: "Available", label: "Available" },
            { value: "Occupied", label: "Occupied" },
          ]}
        />
      </div>

      {/* Table */}
      <table className="bed-booking__table">
        <thead>
          <tr>
            <th>Bed No</th>
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Room Type</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {beds.length > 0 ? (
            beds.map((bed) => (
              <tr key={bed.id}>
                <td>{bed?.roomDetails?.bedDTO?.bedNo || bed?.bedNo}</td>
                <td>
                  {(bed?.patient?.patient?.firstName ?? "NA") +
                    " " +
                    (bed?.patient?.patient?.lastName ?? "NA")}
                </td>
                <td>
                  {
                    bed?.admissionUnderDoctorDetail?.consultantDoctor
                      ?.doctorName
                  }
                </td>
                <td
                  className={`bed-booking__status bed-booking__status--${
                    bed?.roomDetails?.bedDTO?.bedStatus || bed?.bedStatus
                  }`}
                >
                  {bed?.roomDetails?.bedDTO?.bedStatus || bed?.bedStatus}
                </td>
                <td>{bed?.roomDetails?.roomTypeDTO?.wardName}</td>
                <td>{bed?.roomDetails?.roomDTO?.roomNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Beds Not Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IpInformation;
