import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorScheduleTable.css"; // Ensure this CSS file exists
import CustomModal from "../../CustomModel/CustomModal";
import DoctorScheduleSTD from "./DoctorScheduleSTD";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingInput } from "../../FloatingInputs";
import { useFilter } from "../ShortCuts/useFilter";

const DoctorScheduleTable = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [search, setSearch] = useState("");
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null); // To store selected schedule
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log(`${API_BASE_URL}/schedules`);

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/schedules`);
        setScheduleData(response.data);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Failed to fetch schedule data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [showSchedule]);

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule); // Store selected schedule
    setShowSchedule(true); // Open modal
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = useFilter(scheduleData, searchTerm);

  const handleCloseModal = () => {
    setShowSchedule(false);
    setSelectedSchedule(null); // Clear selected schedule after closing modal
  };

  const handleDelete = async (selectedId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/schedules/${selectedId}`
      );

      if (response.status) {
        toast.success("Schedule deleted successfully!");
        setShowSchedule(false);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the schedule.");
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="doctor-schedule-table">
      <button
        className="doctor-schedule-table__add-button"
        onClick={() => setShowSchedule(true)}
      >
        Add Schedule
      </button>
      <div className="doctor-schedule-table-heading">
        <FloatingInput
          type="text"
          label={"Search"}
          placeholder="Search by doctor name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <p>Loading schedules...</p>
      ) : error ? (
        <p className="doctor-schedule-table__error">{error}</p>
      ) : (
        <table className="doctor-schedule-table__table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Doctor Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Weekdays</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
              filteredItems?.map((item, index) => (
                <tr key={item.scheduleId}>
                  <td>{index + 1}</td>
                  <td>{item.doctor.doctorName}</td>
                  <td>{item.scheduleStartDate}</td>
                  <td>{item.scheduleEndDate}</td>
                  <td>{item.dutyStartTime}</td>
                  <td>{item.dutyEndTime}</td>
                  <td>{item.weekdays}</td>
                  <td>{item.location.locationName}</td>
                  <td>
                    <button
                      className="doctor-schedule-table__add-button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="doctor-schedule-delete-button"
                      onClick={() => handleDelete(item.scheduleId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="doctor-schedule-table__no-data">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal for Adding/Editing Schedule */}
      <CustomModal isOpen={showSchedule} onClose={handleCloseModal}>
        <DoctorScheduleSTD
          schedule={selectedSchedule}
          onClose={handleCloseModal}
        />
      </CustomModal>
    </div>
  );
};

export default DoctorScheduleTable;
