/* Mohini_AppointmentReminder_WholePage_8/10/24 */
import React, { useState, useRef } from 'react';
import './AppointmentReminder.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';


const AppointmentReminder = () => {
  const [showTable, setShowTable] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);



  const appointments = [
    { name: 'John Doe', time: '10:00 AM', date: '2024-10-09' },
    { name: 'Jane Smith', time: '2:00 PM', date: '2024-10-09' },
  ];

  const handleClick = () => {
    setShowTable(!showTable);
  };

  const getReminderMessages = () => {
    const now = new Date();

    return appointments.map((appointment) => {
      const [hour, minute] = appointment.time.split(':');
      const appointmentTime = new Date(now);
      appointmentTime.setHours(
        parseInt(hour, 10) + (appointment.time.includes('PM') ? 12 : 0),
        parseInt(minute.split(' ')[0], 10),
        0
      );

      const hoursDiff = (appointmentTime - now) / (1000 * 60 * 60);

      let messages = [];
      if (hoursDiff === 24) {
        messages.push(`🔔 Reminder: You have an appointment with ${appointment.name} tomorrow at ${appointment.time}.`);
      } else if (hoursDiff <= 2 && hoursDiff > 0) {
        messages.push(`🔔 Reminder: Your appointment with ${appointment.name} is in less than 2 hours at ${appointment.time}.`);
      }
      return messages;
    }).flat();
  };

  const reminders = getReminderMessages();

  return (
    <div className="appointment-reminder-container">
      {reminders.map((msg, index) => (
        <div key={index} className="appointment-whatsapp-message" onClick={handleClick}>
          {msg}
        </div>
      ))}

      {showTable && (
        <div className='table-container'>
          <table ref={tableRef}>
            <thead>
              <tr>
                {["Patient Name",
                  "Appointment Time",
                  "Appointment Date"].map((header, index) => (
                    <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.name}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.date}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AppointmentReminder;
/* Mohini_AppointmentReminder_WholePage_8/10/24 */