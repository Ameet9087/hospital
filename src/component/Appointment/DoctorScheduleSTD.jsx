import React, { useState, useRef, useEffect } from "react";
import { Search, Calendar, Clock } from "lucide-react";
import "./DoctorScheduleSTD.css";
import moment from "moment";
import {
  FaSave,
  FaTrash,
  FaBroom,
  FaTimes,
  FaSearch,
  FaPrint,
  FaFileExport,
  FaFileImport,
  FaHeart,
  FaInfoCircle,
} from "react-icons/fa";
import axios from "axios";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import { FloatingInput, FloatingSelect } from "../../FloatingInputs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../FidgetSpinner/PopupContext";
import { text } from "@fortawesome/fontawesome-svg-core";
const DoctorScheduleSTD = ({ schedule,onClose }) => {
  console.log(schedule);
  
  const { showPopup } = usePopup();
  const [showsPopup, setShowsPopup] = useState(false);
  const [scheduleStartDate, setScheduleStartDate] = useState();
  const [scheduleEndDate, setScheduleEndDate] = useState();
  const [doctorDutyStartTime, setDoctorDutyStartTime] = useState("10:03:00 AM");
  const [doctorDutyEndTime, setDoctorDutyEndTime] = useState("08:03:00 PM");
  const [selectedWeekdays, setSelectedWeekdays] = useState({});
  const [generatedSchedule, setGeneratedSchedule] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [locations, setLocations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [breakTimeOptions, setBreakTimeOptions] = useState([]); // To hold API response
  const [breakTimings, setBreakTimings] = useState([]); // List of break timings
  const [isEditing, setIsEditing] = useState(false);
  const [newBreakTimeIds, setNewBreakTimeIds] = useState([]);
  const handleSearchClick = () => {
    setShowsPopup(true);
  };

  const handleClosePopup = () => {
    setShowsPopup(false);
  };

  useEffect(() => {
    if (schedule) {
        setSelectedDoctor(schedule?.doctor?.doctorId || "");
        setSelectedLocation(schedule?.location?.id || "");
        setScheduleStartDate(schedule?.scheduleStartDate || "");
        setScheduleEndDate(schedule?.scheduleEndDate || "");
        setDoctorDutyStartTime(schedule?.dutyStartTime || "10:03:00 AM");
        setDoctorDutyEndTime(schedule?.dutyEndTime || "08:03:00 PM");

    
        const weekdaysArray = schedule?.weekdays
            ? schedule.weekdays.split(", ").reduce((acc, day) => {
                  acc[day] = true; // Convert each day into a key-value pair
                  return acc;
              }, {})
            : {};

        setSelectedWeekdays(weekdaysArray);

  
        setBreakTimings(Array.isArray(schedule?.breakTimeList) ? schedule.breakTimeList : []);

        
        setFormValues((prevValues) => ({
            ...prevValues,
            reviewTime: schedule?.reviewTime || "",
        }));
    }
}, [schedule]);


  const [formValues, setFormValues] = useState({
    newPatientTime: "",
    noOfNewPatients: "",
    roomsNo: "",
    cubical: "",
    reviewTime: "",
    status: "active", // Default to 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleLocationChange = (e) => {
    console.log(e.target.value);

    setSelectedLocation(e.target.value);
  };

  // Handle doctor selection change
  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await axios.get(
          `${API_BASE_URL}/location-masters`
        );
        setLocations(locationResponse.data);

        const doctorResponse = await axios.get(`${API_BASE_URL}/doctors`);
        setDoctors(doctorResponse.data);

        const breakTimeResponse = await axios.get(`${API_BASE_URL}/breakTime`);
        setBreakTimeOptions(breakTimeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // Handle adding a new break timing
  const handleAdd = () => {
    setIsEditing(true);
    setNewBreakTimeIds([]); // Reset selected break times
  };

  // Handle saving a new break time row
  const handleSaveNewBreak = () => {
    const newEntry = {
      sn: breakTimings.length + 1,
      breakTimeIds: newBreakTimeIds,
    };

    setBreakTimings((prev) => [...prev, newEntry]);
    setIsEditing(false);
  };

  // Handle deleting a row
  const handleDelete = (sn) => {
    setBreakTimings((prev) => prev.filter((timing) => timing.sn !== sn));
  };

  // Handle selecting multiple break times
  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setNewBreakTimeIds(selectedOptions);
  };

  // Handle checkbox change for selected weekdays
  const handleWeekdayChange = (e) => {
    const { id, checked } = e.target;
    setSelectedWeekdays((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleAddRow = () => {
    setIsEditing(true);
    setBreakTimings([
      ...breakTimings,
      { breakTimeIds: [], breakToTime: "", breakRemarks: "" },
    ]);
  };

  // Handle removing a row
  const handleRemoveRow = (index) => {
    const updatedBreakTimings = breakTimings.filter((_, i) => i !== index);
    setBreakTimings(updatedBreakTimings);
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const generateScheduleObject = () => {
    const weekdays = Object.keys(selectedWeekdays).filter(
      (day) => selectedWeekdays[day]
    );

    if (!scheduleStartDate || !scheduleEndDate || weekdays.length === 0) {
      alert("Please select all fields correctly.");
      return [];
    }

    const startDate = moment(scheduleStartDate, "YYYY-MM-DD");
    const endDate = moment(scheduleEndDate, "YYYY-MM-DD");

    const schedule = [];
    let sn = 1;

    // Iterate from startDate to endDate
    for (
      let date = moment(startDate);
      date.isSameOrBefore(endDate);
      date.add(1, "days")
    ) {
      const dayName = date.format("dddd").toLowerCase(); // Get the day name
      if (weekdays.includes(dayName)) {
        schedule.push({
          sn: sn++,
          date: date.format("DD/MM/YYYY"),
          timing: `${doctorDutyStartTime} to ${doctorDutyEndTime}`,
          dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
          noOfCubical: 1,
        });
      }
    }

    return schedule;
  };
  const handleGenerate = () => {
    const scheduleObject = generateScheduleObject();
    setGeneratedSchedule(scheduleObject);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the breakTimes array
    const breakTimes = (breakTimings || []) // Ensure it's always an array
  .flatMap((timing) =>
    (timing?.breakTimeIds || []).map((breakTimeId) => ({ breakTimeId }))
  );

    // Prepare weekdays as an array of selected days
    const weekdays = Object.entries(selectedWeekdays)
      .filter(([_, isChecked]) => isChecked)
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1)) // Capitalize the day names
      .join(", ");

    // Create the form data object
    const formData = {
      doctorId: selectedDoctor,
      locationId: selectedLocation,
      breakTimes: breakTimes, // Flattened array of selected break time IDs
      scheduleStartDate: scheduleStartDate,
      scheduleEndDate: scheduleEndDate,
      dutyStartTime: doctorDutyStartTime,
      dutyEndTime: doctorDutyEndTime,
      reviewTime: formValues.reviewTime,
      weekdays: weekdays,
      active: true,
    };

    console.log("Submitting schedule data:", formData);

    try {
      let response;
      if (schedule?.scheduleId) {
        // If schedule ID exists, update using PUT
        response = await axios.put(
          `${API_BASE_URL}/schedules/update-new/${schedule.scheduleId}`,
          formData
        );
        toast.success("Schedule Updated Successfully");
        onClose();
      } else {
        // If no schedule ID, create a new schedule using POST
        response = await axios.post(
          `${API_BASE_URL}/schedules`,
          formData
        );
        toast.success("Schedule Added Successfully");
        onClose();
      }

      showPopup([
        {
          url: "/appointment/doctorappointment",
          text: "Do You Want to Check Doctor Appointment?",
        },
      ]);
    } catch (error) {
      toast.error("Error processing schedule");
      console.error("API error:", error);
    }
  };


  return (
    <div className="DoctorScheduleSTD-medical-interface">
      <div className="DoctorScheduleSTD-grid-layout">
        {/* Section 1 */}
        <div className="DoctorScheduleSTD-section">
          <div className="DoctorScheduleSTD-section-header">
            Doctor Selection and Schedule Information
          </div>
          <div className="DoctorScheduleSTD-section-content">
            {/* Doctor Selection */}
            <div className="DoctorScheduleSTD-field-row">
              <FloatingSelect
                label={"Location"}
                value={selectedLocation}
                onChange={handleLocationChange}
                options={[
                  { value: "", label: "" },
                  ...(Array.isArray(locations)
                    ? locations.map((location) => ({
                        value: location.id,
                        label: location.locationName,
                      }))
                    : []),
                ]}
              />
              <FloatingSelect
                label="Doctor"
                name="doctor"
                value={selectedDoctor}
                onChange={handleDoctorChange}
                options={[
                  { value: "", label: "" },
                  ...(Array.isArray(doctors)
                    ? doctors.map((doctor) => ({
                        value: doctor.doctorId,
                        label: doctor.doctorName,
                      }))
                    : []),
                ]}
              />
              {/* <label className="DoctorScheduleSTD-field-label">
                Location Name <span className="required">*</span>
              </label>
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="DoctorScheduleSTD-field-input"
              >
                <option value="">Select option</option>
                {locations.length > 0 &&
                  locations?.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.locationName}
                    </option>
                  ))}
              </select> */}
            </div>
            {/* Schedule Information */}
            <div className="DoctorScheduleSTD-field-row">
              <FloatingInput
                label={"Schedule Start Date"}
                type="date"
                value={scheduleStartDate}
                onChange={(e) => setScheduleStartDate(e.target.value)}
              />
              <FloatingInput
                label={"Schedule End Date"}
                type="date"
                value={scheduleEndDate}
                onChange={(e) => setScheduleEndDate(e.target.value)}
              />
            </div>
            <div className="DoctorScheduleSTD-field-row">
              <FloatingInput
                label={"Schedule End Date"}
                type="time"
                value={doctorDutyStartTime}
                onChange={(e) => setDoctorDutyStartTime(e.target.value)}
              />
              <FloatingInput
                label={"Doctor Duty End Time"}
                type="time"
                value={doctorDutyEndTime}
                onChange={(e) => setDoctorDutyEndTime(e.target.value)}
              />
            </div>
            <div className="DoctorScheduleSTD-field-row">
              {/* <FloatingInput
                label={"Cubical"}
                type="number"
                name="cubical"
                value={formValues.cubical}
                onChange={handleInputChange}
              /> */}

              <FloatingInput
                label={"Review Time"}
                type="number"
                name="reviewTime"
                value={formValues.reviewTime}
                onChange={handleInputChange}
              />
              <div className="DoctorScheduleSTD-sub-div">
              <div className="DoctorScheduleSTD-header">Action :</div>
                <div className="DoctorScheduleSTD-radio-item">
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    value="active"
                    checked={formValues.status === "active"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div className="DoctorScheduleSTD-radio-item">
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    value="inactive"
                    checked={formValues.status === "inactive"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
                </div>
            </div>
            {/* <div className="DoctorScheduleSTD-field-row">
              <FloatingInput
                label={"New Patient Time"}
                type="number"
                name="newPatientTime"
                value={formValues.newPatientTime}
                onChange={handleInputChange}
              />
              <FloatingInput
                label={"No Of New Patients"}
                type="number"
                name="noOfNewPatients"
                value={formValues.noOfNewPatients}
                onChange={handleInputChange}
              />
            </div> */}
            <div className="DoctorScheduleSTD-field-row">
              {/* <FloatingInput
                label={"Rooms No"}
                type="number"
                name="roomsNo"
                value={formValues.roomsNo}
                onChange={handleInputChange}
              /> */}
              <div className="DoctorScheduleSTD-radio-group">
                
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="DoctorScheduleSTD-section">
          <div className="DoctorScheduleSTD-section-header">
            Doctor Availability
          </div>
          <div className="DoctorScheduleSTD-section-content">
            {/* Doctor Duty */}

            {/* Availability */}
            <div className="DoctorScheduleSTD-checkbox-group">
              <div className="DoctorScheduleSTD-header-new">
                Doctor Available Weekdays :-
              </div>
              {[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ].map((day) => (
                <div className="DoctorScheduleSTD-checkbox-item" key={day}>
                  <input
                    type="checkbox"
                    id={day}
                    onChange={handleWeekdayChange}
                  />
                  <label htmlFor={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            <button
              className="DoctorScheduleSTD-submit-button"
              onClick={handleGenerate}
            >
              Generate Schedule
            </button>
            {/* Status */}
          </div>
        </div>
      </div>

      <div className="DoctorScheduleSTD-section-header">Schedule Grid</div>
      <div className="DoctorScheduleSTD-table-section">
        <table className="DoctorScheduleSTD-table" ref={tableRef}>
          <thead>
            <tr>
              {["SN", "Date", "Timing", "Day Name", "No Of Cubical"].map(
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
            {generatedSchedule.map((detail, index) => (
              <tr key={index}>
                <td>{detail.sn}</td>
                <td>{detail.date}</td>
                <td>{detail.timing}</td>
                <td>{detail.dayName}</td>
                <td>{detail.noOfCubical}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="DoctorScheduleSTD-break-timings">
        <div className="DoctorScheduleSTD-section-header">
          <div>Break Timings (Control + Enter For New Row)</div>
        </div>
        <table>
          <thead>
            <tr>
              {["SN", "Break Time(s)", "Action"].map((header, index) => (
                <th key={index}>
                  <div className="header-content">
                    <span>{header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Display existing rows */}
            {breakTimings.length > 0 ? (
              breakTimings.map((timing) => (
                <tr key={timing.sn}>
                  <td>{timing.sn}</td>
                  <td>
                    {Array.isArray(timing?.breakTimeIds)
                      ? timing.breakTimeIds
                          .map((id) =>
                            breakTimeOptions.find(
                              (option) => option.breakTimeId === id
                            )
                          )
                          .map((bt) =>
                            bt
                              ? `${bt.breakTimeStart} - ${bt.breakTimeEnd}`
                              : "N/A"
                          )
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      className="DoctorScheduleSTD-del-button"
                      onClick={() => handleDelete(timing.sn)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No break times available</td>
              </tr>
            )}

            {/* Row for adding new break times */}
            {isEditing && (
              <tr>
                <td>{breakTimings.length + 1}</td>
                <td>
                  <select
                    multiple
                    value={newBreakTimeIds}
                    onChange={handleSelectChange}
                  >
                    {breakTimeOptions.map((option) => (
                      <option
                        key={option.breakTimeId}
                        value={option.breakTimeId}
                      >
                        {option.breakTimeStart} - {option.breakTimeEnd}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="DoctorScheduleSTD-add-button"
                    onClick={handleSaveNewBreak}
                  >
                    Save
                  </button>
                  <button
                    className="DoctorScheduleSTD-del-button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Button to add a new row */}
        {!isEditing && (
          <button className="DoctorScheduleSTD-add-button" onClick={handleAdd}>
            Add New Break Timing
          </button>
        )}
      </div>

      <div className="DoctorScheduleSTD-action-buttons">
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
        {/* <button className="btn-red">Delete</button>
        <button className="btn-orange">Clear</button>
        <button className="btn-gray">Close</button> */}
        {/* <button className="btn-blue" onClick={handleSearchClick}>
          Search
        </button>
        <button className="btn-gray">Tracking</button>
        <button className="btn-green">Print</button>
        <button className="btn-blue">Export</button>
        <button className="btn-gray">Import</button>
        <button className="btn-green">Health</button>
        <button className="btn-gray">Version Comparison</button>
        <button className="btn-gray">SDC</button>
        <button className="btn-gray">Testing</button>
        <button className="btn-blue">Info</button> */}
      </div>

      {showsPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h3>
                <FaSearch /> Search
              </h3>
              <button className="popup-close-btn" onClick={handleClosePopup}>
                <FaTimes />
              </button>
            </div>
            <div className="popup-body">
              <label>
                From Date
                <input type="date" defaultValue="2024-11-27" />
              </label>
              <label>
                To Date
                <input type="date" defaultValue="2024-11-27" />
              </label>
              <div className="popup-search-box">
                <input type="text" placeholder="Search" />
                <button>
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorScheduleSTD;
