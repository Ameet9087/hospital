import React, { useState } from "react";
import "./BookAppointment.css";
import { CiSearch } from "react-icons/ci";
import Location from "./OnlineAppointmentLocation";
import Speciality from "./OnlineAppointmentSpeciality";
import OnlineDoctorAppt from "./OnlineAppointmentDoctor";

const BookAppointment = () => {
  const [activeComponent, setActiveComponent] = useState("Location"); // Track which tab is active
  const [searchQuery, setSearchQuery] = useState("");
  const handleTabClick = (component) => {
    setActiveComponent(component); // Update the active component
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  return (
    <>
      <div className="BookAppointment-app-container">
        <h1 className="BookAppointment-header-title">Welcome</h1>
        <div className="BookAppointment-section">
          {/* Header Section */}
          <header className="BookAppointment-header">
            <h2 className="BookAppointment-header-subtitle">
              FIND DOCTOR & BOOK AN APPOINTMENT
            </h2>
          </header>

          {/* Tabs Section */}
          <div className="BookAppointment-tabs">
            <button
              className={`BookAppointment-tab ${activeComponent === "Location"
                ? "BookAppointment-active-tab"
                : ""
                }`}
              onClick={() => handleTabClick("Location")}
            >
              Location
            </button>
            {/* <button
              className={`BookAppointment-tab ${
                activeComponent === "Speciality"
                  ? "BookAppointment-active-tab"
                  : ""
              }`}
              onClick={() => handleTabClick("Speciality")}
            >
              Speciality
            </button>
            <button
              className={`BookAppointment-tab ${
                activeComponent === "Doctor" ? "BookAppointment-active-tab" : ""
              }`}
              onClick={() => handleTabClick("Doctor")}
            >
              Doctor
            </button> */}
          </div>

          {/* Search Bar Section */}
          <div className="BookAppointment-search-bar">
            <input
              type="text"
              placeholder="Search By Location"
              value={searchQuery}
              onChange={handleSearchChange}
              className="BookAppointment-search-input"
            />
            {/* <button className="BookAppointment-search-button">
              <span role="img" aria-label="Search Icon">
                <CiSearch />
              </span>
            </button> */}
          </div>

          {/* Conditional Rendering for Active Component */}
        </div>
        {activeComponent === "Location" && (
          <Location searchQuery={searchQuery} />
        )}
        {/* {activeComponent === "Speciality" && <Speciality />} */}
        {/* {activeComponent === "Doctor" && <OnlineDoctorAppt />} */}
      </div>
    </>
  );
};

export default BookAppointment;
