// neha-OT-OT-Personaltype-14-9-24
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './ot_personnelType.css';
import { startResizing } from '../../../../../TableHeadingResizing/ResizableColumns';

function Ot_personnelType() {
  const [personnelTypes, setPersonnelTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPersonnelType, setEditingPersonnelType] = useState(null);
  const [personnelTypeName, setPersonnelTypeName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  

  // Fetch personnel types from API
  useEffect(() => {
    fetchPersonnelTypes();
  }, []);

  // Function to fetch personnel types
  const fetchPersonnelTypes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/personnel-types/all`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPersonnelTypes(data);
    } catch (error) {
      console.error('Error fetching personnel types:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle edit button click
  const handleEdit = (personnelType) => {
    setEditingPersonnelType(personnelType);
    setPersonnelTypeName(personnelType.name);
    setIsActive(personnelType.isActive);
  };

  // Handle add or update personnel type
  const handleSave = async () => {
    if (editingPersonnelType) {
      // Update existing personnel type
      try {
        const response = await fetch(`${API_BASE_URL}/personnel-types/${editingPersonnelType.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: personnelTypeName,
            isActive: isActive,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Network response was not ok: ${errorData}`);
        }

        const updatedPersonnelType = await response.json();
        setPersonnelTypes((prevPersonnelTypes) =>
          prevPersonnelTypes.map((pt) =>
            pt.id === updatedPersonnelType.id ? updatedPersonnelType : pt
          )
        );

        handleCancel();
      } catch (error) {
        console.error('Error updating personnel type:', error);
      }
    } else {
      // Add new personnel type
      try {
        const response = await fetch(`${API_BASE_URL}/api/personnel-types`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: personnelTypeName,
            isActive: isActive,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Network response was not ok: ${errorData}`);
        }

        const newPersonnelType = await response.json();
        setPersonnelTypes((prevPersonnelTypes) => [...prevPersonnelTypes, newPersonnelType]);

        handleCancel();
      } catch (error) {
        console.error('Error adding personnel type:', error);
      }
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingPersonnelType(null);
    setPersonnelTypeName('');
    setIsActive(false);
  };

  // Filter personnel types based on search term
  const filteredPersonnelTypes = personnelTypes.filter((pt) =>
    pt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='ot_personnelType_main'>
      <div className="ot_personnelType_container">
        <div className="ot_personnelType_input">
          <label htmlFor="personnel-type-name">Personnel Type Name:</label>
          <input
            type="text"
            id="personnel-type-name"
            value={personnelTypeName}
            onChange={(e) => setPersonnelTypeName(e.target.value)}
            placeholder="Personnel Type Name"
          />
        </div>
        <div className="ot_personnelType_checkbox">
          <input
            type="checkbox"
            id="is-active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label htmlFor="is-active">Is Active</label>
        </div>
        <div className="ot_personnelType_buttons">
          <button
            className="ot_personnelType_save"
            onClick={handleSave}
          >
            {editingPersonnelType ? 'Update' : 'Add'}
          </button>
          <button
            className="ot_personnelType_clear"
            onClick={handleCancel}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="ot_personnelType_search_bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* <button className="ot_personnelType_filter_button">
          <FaSearch />
        </button> */}
      </div>

      <table className="ot_personnelType_table" ref={tableRef}>  
        <thead>
          <tr>
            
            {[
            'Personel Type Name',
            'IsActive',
            'Action'].map((header, index) => (
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
          {filteredPersonnelTypes.map((pt) => (
            <tr key={pt.id}>
              <td className='ot_personnelType_tabledata'>{pt.name}</td>
              <td className='ot_personnelType_tabledata'>{pt.isActive ? "true" : "false"}</td>
              <td className='ot_personnelType_tabledata'>
                <button
                  onClick={() => handleEdit(pt)}
                  className="ot_personnelType_edit_button"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="ot_personnelType_pagination">
        <button>First</button>
        <button>Previous</button>
        <span>Page 1 of 4</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}
    </div>
  );
}

export default Ot_personnelType;
