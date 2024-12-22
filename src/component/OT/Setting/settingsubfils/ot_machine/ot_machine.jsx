import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './ot_machine.css';
import { startResizing } from '../../../../../TableHeadingResizing/ResizableColumns';

function Ot_machine() {
  const [machines, setMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMachine, setEditingMachine] = useState(null);
  const [machineName, setMachineName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  // const { success, error, CustomAlerts } = useCustomAlert(); 

  // Fetch machines from API
  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await fetch('http://localhost:1415/api/ot-machines');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMachines(data); // Assuming the API returns an array of machines
    } catch (err) {
      error('Error fetching machines'); // Show error alert
      console.error('Error fetching machines:', err);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle edit button click
  const handleEdit = (machine) => {
    setEditingMachine(machine);
    setMachineName(machine.machineName);
    setIsActive(machine.active);
  };

  // Handle add new machine
  const handleAdd = async () => {
    try {
      const response = await fetch('http://localhost:1415/api/ot-machines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machineName,
          active: isActive,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Network response was not ok: ${errorData}`);
      }

      const newMachine = await response.json();
      setMachines((prevMachines) => [...prevMachines, newMachine]);

      success('Machine added successfully'); // Show success alert
      clearForm();
    } catch (err) {
      error('Error adding machine'); // Show error alert
      console.error('Error adding machine:', err);
    }
  };

  // Handle update machine
  const handleUpdate = async () => {
    if (!editingMachine) return;

    try {
      const response = await fetch(`http://localhost:1415/api/ot-machines/${editingMachine.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machineName,
          active: isActive,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Network response was not ok: ${errorData}`);
      }

      const updatedMachine = await response.json();
      setMachines((prevMachines) =>
        prevMachines.map((machine) =>
          machine.id === updatedMachine.id ? updatedMachine : machine
        )
      );

      success('Machine updated successfully'); // Show success alert
      clearForm();
    } catch (err) {
      error('Error updating machine'); // Show error alert
      console.error('Error updating machine:', err);
    }
  };

  // Handle clear form and cancel edit
  const clearForm = () => {
    setEditingMachine(null);
    setMachineName('');
    setIsActive(false);
  };

  // Filter machines based on search term
  const filteredMachines = machines.filter((machine) =>
    (machine.machineName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='ot_machine_main'>
      {/* Custom Alerts */}
      {/* <CustomAlerts /> */}

      <div className="ot_machine_container">
        <div className="ot_machine_input">
          <label htmlFor="machine-name">Machine Name:</label>
          <input
            type="text"
            id="machine-name"
            value={machineName}
            onChange={(e) => setMachineName(e.target.value)}
            placeholder="Machine Name"
          />
        </div>
        <div className="ot_machine_checkbox">
          <input
            type="checkbox"
            id="is-active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label htmlFor="is-active">Is Active</label>
        </div>
        <div className="ot_machine_buttons">
          <button
            className="ot_machine_save"
            onClick={editingMachine ? handleUpdate : handleAdd}
          >
            {editingMachine ? 'Update' : 'Add'}
          </button>
          <button
            className="ot_machine_clear"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="ot_machine_search_bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <table className="ot_machine_table">
        <thead>
          <tr>
            {[
              'Machine Name',
              'IsActive',
              'Action'
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="rd-resizable-th"
              >
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
          {filteredMachines.map((machine) => (
            <tr key={machine.id}>
              <td className='ot_machine_tabledata'>{machine.machineName}</td>
              <td className='ot_machine_tabledata'>{machine.active.toString()}</td>
              <td className='ot_machine_tabledata'>
                <button
                  onClick={() => handleEdit(machine)}
                  className="ot_machine_edit_button"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ot_machine;
