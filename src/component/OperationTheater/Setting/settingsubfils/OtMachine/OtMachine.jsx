import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OtMachine.css';
import { API_BASE_URL } from "../../../../api/api"

// const API_BASE_URL = 'http://192.168.210.48:8080/api/ot-machines';

function Ot_machine() {
  const [machines, setMachines] = useState([]);
  const [editingMachine, setEditingMachine] = useState(null);
  const [machineName, setMachineName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const tableRef = useRef(null);

  // Fetch machines on component mount
  useEffect(() => {
    loadMachines();
  }, []);

  // Load all machines
  const loadMachines = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ot-machines`);
      const normalizedData = response.data.map((machine) => ({
        id: Number(machine.otMachineId), // Ensure ID is a number
        machineName: machine.machineName,
        active: machine.isActive === 'Yes',
      }));
      setMachines(normalizedData);
    } catch (err) {
      console.error('Error fetching machines:', err.message);
    }
  };

  // Add or update machine
  // const handleAddOrUpdate = async () => {
  //   try {
  //     const payload = {
        
        
  //       machineName,
  //       isActive: isActive ? 'Yes' : 'No',
  //     };
      
  //     if (editingMachine) {
  //       // Update existing machine
  //       const machineId = Number(editingMachine.id); // Ensure ID is a number
  //       await axios.put(`${API_BASE_URL}/${machineId}`, payload);

  //       setMachines((prevMachines) =>
  //         prevMachines.map((m) =>
  //           m.id === machineId ? { ...payload, id: machineId, active: isActive } : m
  //         )
  //       );
  //     } else {
  //       // Add new machine
  //       const response = await axios.post(`${API_BASE_URL}/ot-machines`, payload);
  //       setMachines((prevMachines) => [
  //         ...prevMachines,
  //         {
  //           ...response.data,
  //           id: Number(response.data.otMachineId), // Ensure ID is a number
  //           active: response.data.isActive === 'Yes',
  //         },
  //       ]);
  //     }

  //     clearForm();
  //   } catch (err) {
  //     console.error('Error saving machine:', err.message);
  //   }
  // };
  const handleAddOrUpdate = async () => {
    try {
      const payload = {
        machineName,
        isActive: isActive ? 'Yes' : 'No',
      };

      if (editingMachine) {
        // Update existing machine
        const machineId = Number(editingMachine.id); // Ensure ID is a number
        console.log("Updating Machine ID:", machineId);

        await axios.put(`${API_BASE_URL}/ot-machines/${machineId}`, payload);

        setMachines((prevMachines) =>
          prevMachines.map((m) =>
            m.id === machineId ? { ...payload, id: machineId, active: isActive } : m
          )
        );
      } else {
        // Add new machine
        const response = await axios.post(`${API_BASE_URL}/ot-machines`, payload);
        console.log("New Machine ID:", response.data.otMachineId);

        setMachines((prevMachines) => [
          ...prevMachines,
          {
            id: Number(response.data.otMachineId), // Ensure ID is a number
            machineName: response.data.machineName,
            active: response.data.isActive === 'Yes',
          },
        ]);
      }

      clearForm();
    } catch (err) {
      console.error('Error saving machine:', err.message);
    }
  };

  // // Delete machine
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(${API_BASE_URL}/${Number(id)}); // Ensure ID is a number
  //     setMachines((prevMachines) => prevMachines.filter((m) => m.id !== id));
  //   } catch (err) {
  //     console.error('Error deleting machine:', err.message);
  //   }
  // };

  // Edit existing machine
  const handleEdit = (machine) => {
    setEditingMachine(machine);
    setMachineName(machine.machineName);
    setIsActive(machine.active);
  };

  // Clear form
  const clearForm = () => {
    setEditingMachine(null);
    setMachineName('');
    setIsActive(false);
  };

  return (
    <div className="ot_machine_main">
      {/* Form Section */}
      <div className="ot_machine_container">
        <div>
          <label>Machine Name:</label>
          <input
            type="text"
            value={machineName}
            onChange={(e) => setMachineName(e.target.value)}
            placeholder="Machine Name"
          />
        </div>
        <div>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label>Is Active</label>
        </div>
        <div>
          <button onClick={handleAddOrUpdate} className='ot_machine_container_button'>
            {editingMachine ? 'Update' : 'Add'}
          </button>
          <button onClick={clearForm} className='ot_machine_container_button'>Clear</button>
        </div>
      </div>

      {/* Machines Table */}
      <table ref={tableRef} className="ot_machine_table">
        <thead>
          <tr>
            <th>Machine Name</th>
            <th>Is Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id}>
              <td>{machine.machineName}</td>
              <td>{machine.active ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(machine)} className='ot_machine_table_button'>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ot_machine;