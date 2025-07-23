import React, { useState, useEffect } from 'react';
import './StaffInformation.css';
import Modal from '../Modal';
import axios from 'axios';
import UpdateStaff from './UpdateStaff';
import { API_BASE_URL } from '../../../api/api';


const StaffTransportTable = () => {
  const [staffData, setStaffData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState([]); // Store the selected staff for editing


  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/staff`);
        setStaffData(response.data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
        setError('Failed to fetch staff data');
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  const handleAdd = () => {
    setSelectedStaff(null); // Clear any existing selection for new staff
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null); // Reset selected staff when closing the modal
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    console.log(staff) // Set the selected staff for editing
    setIsModalOpen(true);
  };



  return (
    <div className="SSStaffTransportManagement-container">
      <h2>Staff Transport Management</h2>

      <button className="SSStaffTransportManagement-add-button" onClick={handleAdd}>
        Add New Staff
      </button>

      <table className="SSStaffTransportManagement-table">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>No. of People</th>
            <th>Staff Route ID</th>
            <th>Department</th>
            <th>Shift Timing</th>
            <th>Pickup Location</th>
            <th>Drop-off Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {staffData.map((staff, index) => (
            <tr key={index}>
              <td>{staff.staffID}</td>
              <td>{staff.rootName}</td>
              <td>{staff.noOfPeople}</td>
              <td>{staff.route.routeID}</td>
              <td>{staff.staffDepartment}</td>
              <td>{staff.shiftTime}</td>
              <td>{staff.pickupLocation}</td>
              <td>{staff.dropOffLocation}</td>
              <td>
                <button onClick={() => handleEdit(staff)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>

        <UpdateStaff initialData={selectedStaff}></UpdateStaff>
         // Pass selected staff data for editing

      </Modal>

    </div>
  );
};

export default StaffTransportTable;
