import React, { useEffect, useState } from "react";
import "./DoctorAppointment.css";
import DoctorAppointmentPopUp from "./DoctorAppointmentPopUp.jsx";
import CustomModal from "../../CustomModel/CustomModal.jsx";
import axios from "axios";
import { API_BASE_URL } from "../api/api.js";
import FloatingInput from "../../FloatingInputs/FloatingInput.jsx";
import FloatingSelect from "../../FloatingInputs/FloatingSelect.jsx";
import { toast } from "react-toastify";
export default function DoctorAppointment() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [schedule, setSchedule] = useState(null);
  const [updatedAppointments, setUpdateAppointments] = useState({});
  const [doctorBlocking, setDoctorBlocking] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [locations, setLocations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    appointmentDate: new Date().toISOString().split("T")[0],
    location: "",
    specialization: "",
    doctor: "",
  });

  const fetchBlockingData = async (doctorId) => {
    try {
      const doctorblockresponse = await axios.get(
        `${API_BASE_URL}/doctor-blocking/doctor-blocking/latest/${doctorId}`
      );
      return doctorblockresponse.data; // Return the data if needed
    } catch (error) {
      console.log("Error fetching doctor blocking data:", error);
      return null; // Return null or an appropriate fallback if there's an error
    }
  };

  const handleLoadSlots = async ({ locationId, doctorId, appointmentDate }) => {
    if (!locationId || !doctorId || !appointmentDate) {
      toast.error(
        "Please select location, doctor, and date before loading slots."
      );
      return;
    }

    try {
      // Fetch schedule data
      const response = await axios.get(
        `${API_BASE_URL}/schedules/by-location-and-doctor?locationId=${locationId}&doctorId=${doctorId}&givenDate=${appointmentDate}`
      );

      const scheduleData = response.data;

      // Fetch doctor blocking data
      const doctorBlockingData = await fetchBlockingData(doctorId);

      let loadSlots = true;

      if (doctorBlockingData) {
        const appointmentDateObj = new Date(appointmentDate);
        const blockingFromDate = doctorBlockingData.fromDate
          ? new Date(doctorBlockingData.fromDate)
          : null;
        const blockingToDate = doctorBlockingData.toDate
          ? new Date(doctorBlockingData.toDate)
          : null;
        const blockingFromTime = doctorBlockingData.fromTime || null;
        const blockingToTime = doctorBlockingData.toTime || null;

        // Scenario 1: If blocking dates are present and appointment date falls within the range, do not load slots
        if (
          blockingFromDate &&
          blockingToDate &&
          appointmentDateObj >= blockingFromDate &&
          appointmentDateObj <= blockingToDate
        ) {
          loadSlots = false;
          toast.error(`${doctorBlockingData.message}`);
        }

        // Scenario 2: If blocking dates and times are present, show all time slots
        if (
          blockingFromDate &&
          blockingToDate &&
          blockingFromTime &&
          blockingToTime
        ) {
          loadSlots = true; // Override to allow loading slots
        }
      }

      // Load slots if allowed
      if (loadSlots && scheduleData) {
        setSchedule(scheduleData);
        if (doctorBlockingData) {
          setDoctorBlocking(doctorBlockingData);
        }
        generateTimeSlots(
          scheduleData.dutyStartTime,
          scheduleData.dutyEndTime,
          parseInt(scheduleData.reviewTime)
        );
      } else if (!scheduleData) {
        toast.error("No schedule found for the selected doctor and location.");
        setTimeSlots([]);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
      toast.error("Failed to load appointment slots. Please try again.");
    }
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

        const allSchedulesResponse = await axios.get(
          `${API_BASE_URL}/appointments`
        );
        const appointmentsData = Array.isArray(allSchedulesResponse.data)
          ? allSchedulesResponse.data
          : allSchedulesResponse.data.appointments || []; // Adjust based on response
        setAppointment(appointmentsData);
        console.log(appointmentsData);
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [modalVisible]);

  // Generate time slots
  const generateTimeSlots = (start, end, reviewTime) => {
    const slots = [];
    let current = convertToDateTime(start);
    const endTime = convertToDateTime(end);

    while (current < endTime) {
      const slot = formatTime(current);
      slots.push(slot);
      current.setMinutes(current.getMinutes() + reviewTime);
    }

    setTimeSlots(slots);
  };
  const convertToDateTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
    return date;
  };
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  const isPastTimeSlot = (timeSlot) => {
    const now = new Date();
    const [hour, minute] = timeSlot.split(/:| /); // Extract hour and minute
    const isPM = timeSlot.includes("PM");

    const slotHour =
      isPM && parseInt(hour) !== 12 ? parseInt(hour) + 12 : parseInt(hour);
    const slotMinute = parseInt(minute);

    const slotTime = new Date(formData.appointmentDate);
    slotTime.setHours(slotHour, slotMinute, 0, 0);

    return now > slotTime;
  };
  const openModal = (appointmentObjOrTimeSlot) => {
    if (!formData.appointmentDate) {
      toast.error("Please select an appointment date first.");
      return;
    }

    const now = new Date();
    const appointmentDate = new Date(formData.appointmentDate);
    appointmentDate.setHours(0, 0, 0, 0);

    // Check if trying to book for a past time slot today
    if (
      appointmentDate.toDateString() === now.toDateString() &&
      isPastTimeSlot(
        appointmentObjOrTimeSlot.timeSlot || appointmentObjOrTimeSlot
      )
    ) {
      toast.error("You cannot book an appointment for a past time slot today.");
      return;
    }

    const blockingFromTime = doctorBlocking?.fromTime;
    const blockingToTime = doctorBlocking?.toTime;
    const appointmentTime = convertTo24HourFormat(
      appointmentObjOrTimeSlot.timeSlot
    );
    console.log(doctorBlocking?.fromTime);
    console.log(doctorBlocking?.toTime);
    console.log(appointmentObjOrTimeSlot?.timeSlot);
    if (
      appointmentTime >= blockingFromTime &&
      appointmentTime <= blockingToTime
    ) {
      console.log("yess executed");

      toast.error(`${doctorBlocking.message}`);
      return;
    }
    const timeSlot =
      appointmentObjOrTimeSlot?.timeSlot || appointmentObjOrTimeSlot;
    const existingAppointment = appointmentObjOrTimeSlot?.mrNo
      ? appointmentObjOrTimeSlot
      : null;

    setSelectedTimeSlot(timeSlot);
    setFormData((prevData) => ({
      ...prevData,
      givenTime: timeSlot,
      mrNo: existingAppointment?.mrNo || "",
      patientName: existingAppointment?.patientName || "",
      remarks: existingAppointment?.remarks || "",
      userName: existingAppointment?.userName || "",
      cancelStatus: existingAppointment?.cancelStatus || "",
    }));

    setModalVisible(true);
  };

  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const updateModel = (object) => {
    console.log(object);
    setUpdateAppointments(object);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    handleLoadSlots();
    setUpdateAppointments(null);
    setSelectedTimeSlot(null);
    setFormData((prevData) => ({
      ...prevData,
      mrNo: "",
      patientName: "",
      givenTime: "",
      remarks: "",
      userName: "",
      cancelStatus: "",
    }));
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "doctor") {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.doctorId.toString() === value
      );

      if (selectedDoctor) {
        setFormData((prev) => ({
          ...prev,
          specialization: selectedDoctor.specialization || "",
        }));
      }

      if (formData.location && formData.appointmentDate) {
        await handleLoadSlots({
          locationId: formData.location,
          doctorId: value,
          appointmentDate: formData.appointmentDate,
        });
      }
    }
  };

  const handleSave = () => {
    setAppointments((prevAppointments) => ({
      ...prevAppointments,
      [selectedTimeSlot]: { ...formData },
    }));
    closeModal();
  };
  const handleUpdate = () => {
    setAppointments((prevAppointments) => ({
      ...prevAppointments,
      [selectedTimeSlot]: { ...formData },
    }));
    closeModal();
  };
  const handleDelete = () => {
    setAppointments((prevAppointments) => {
      const updatedAppointments = { ...prevAppointments };
      delete updatedAppointments[selectedTimeSlot];
      return updatedAppointments;
    });
    closeModal();
  };

  return (
    <div className="DoctorAppointments-container">
      <h1 className="DoctorAppointments-heading">Doctor Appointments</h1>
      <div className="DoctorAppointments-row">
        <div className="DoctorAppointments-field">
          <FloatingInput
            label={"Date"}
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="DoctorAppointments-field">
          <FloatingSelect
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            options={[
              { value: "", label: "" },
              ...(Array.isArray(locations)
                ? locations.map((loc) => ({
                    value: loc?.id,
                    label: loc?.locationName,
                  }))
                : []),
            ]}
          />
        </div>

        <div className="DoctorAppointments-field">
          <FloatingSelect
            label="Doctor"
            name="doctor"
            value={formData.doctor}
            onChange={(e) => {
              handleInputChange(e); // Update the doctor value in formData
              handleLoadSlots(); // Automatically load slots after doctor selection
            }}
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
        </div>
        <div className="DoctorAppointments-field">
          <FloatingInput
            label={"Specialization"}
            type="text"
            name="specialization"
            value={formData.specialization}
            readOnly
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Time Slot</th>
              <th>MR No</th>
              <th>Patient Name</th>
              <th>Given Time</th>
              <th>Appointment Date</th>
              <th>Remarks</th>
              <th>User Name</th>
              <th>Cancel Status</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots?.map((timeSlot) => {
              const appointmentObj = appointment.find(
                (appt) =>
                  appt.appointmentTime === timeSlot &&
                  appt.appointmentDate === formData.appointmentDate
              );

              // Skip rendering if the appointment status is "Cancelled"
              if (appointmentObj?.status === "Cancelled") {
                return null;
              }

              return (
                <tr
                  key={timeSlot}
                  onClick={() =>
                    appointmentObj
                      ? updateModel(appointmentObj)
                      : openModal({ timeSlot })
                  }
                >
                  <td>{timeSlot}</td>
                  <td>{appointmentObj?.patient?.uhid || ""}</td>
                  <td>{appointmentObj?.patient?.firstName || ""}</td>
                  <td>{appointmentObj?.appointmentTime || ""}</td>
                  <td>{appointmentObj?.appointmentDate || ""}</td>
                  <td>{appointmentObj?.remarks || ""}</td>
                  <td>{appointmentObj?.userName || ""}</td>
                  <td>{appointmentObj?.cancelStatus || ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <CustomModal isOpen={modalVisible} onClose={closeModal}>
          <DoctorAppointmentPopUp
            selectedDoctor={formData.doctor}
            date={formData.appointmentDate}
            selectedTimeSlot={selectedTimeSlot}
            slots={timeSlots}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            updatedAppointments={updatedAppointments}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            closeModal={closeModal}
            isUpdate={!!appointments[selectedTimeSlot]}
          />
        </CustomModal>
      )}
    </div>
  );
}
