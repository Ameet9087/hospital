import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './AppointmentBookingList.css';
import BookingAppointment from '../Appointment/BookingAppointment';
import ListVisited from '../Appointment/ListVisited';
import NewVisitedList from '../Appointment/NewVisitedList';
import OnlineAppointment from '../Appointment/OnlineAppointment';
import SSFClaim from '../Appointment/SSFClaim';
import AppointmentBookingList from '../Appointment/AppointmentBookingList';
import CheckIn from '../Appointment/CheckIn';
import AddNewAppointmentForm from './AddNewappointment';

const AppointmentRouting = () => {
  return (
    <div className="appointment-booking-list-container">
      <nav className="appointment-booking-list-nav">
        <NavLink 
          to="/appointment/appointmentbookinglist" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-navigation-link active" : "appointment-booking-list-navigation-link"
          }
        >
          Appointment Booking List
        </NavLink>
        <NavLink 
          to="/appointment/bookappointment" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-navigation-link active" : "appointment-booking-list-navigation-link"
          }
        >
          Book Appointment
        </NavLink>
        <NavLink 
          to="/appointment/listvisits" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-navigation-link active" : "appointment-booking-list-navigation-link"
          }
        >
          List Visits
        </NavLink>
        <NavLink 
          to="/appointment/newvisit" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-navigation-link active" : "appointment-booking-list-navigation-link"
          }
        >
          New Visit
        </NavLink>
        <NavLink 
          to="/appointment/onlineappointment" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-navigation-link active" : "appointment-booking-list-navigation-link"
          }
        >
          Online Appointment
        </NavLink>

        {/* <NavLink 
          to="/ssf-claim" 
          className={({ isActive }) => 
            isActive ? "appointment-booking-list-nav-link active" : "appointment-booking-list-nav-link"
          }
        >
          SSF Claim
        </NavLink> */}
        
        
       
      </nav>
      
      <div className="appointment-booking-list-content">
        <Routes>
          <Route path="appointmentbookinglist" element={<AppointmentBookingList />} />
          <Route path="bookappointment" element={<BookingAppointment />} />
          <Route path="listvisits" element={<ListVisited />} />
          <Route path="newvisit" element={<NewVisitedList />} />
          <Route path="onlineappointment" element={<OnlineAppointment />} />
          <Route path="ssf-claim" element={<SSFClaim />} />
          <Route path="checkIn/*" element={<CheckIn/>}></Route>
          <Route path="*" element={<AppointmentBookingList />} />
          <Route path="add-new-appointment" element={<AddNewAppointmentForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppointmentRouting;