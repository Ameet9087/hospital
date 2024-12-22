import React, { useState, useEffect, useRef } from 'react';
import useCustomAlert from '../../../../../alerts/useCustomAlert';
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
  
  const { success, warning, error, CustomAlerts } = useCustomAlert(); // Use the custom alert

  useEffect(() => {
    fetchPersonnelTypes();
  }, []);

  const fetchPersonnelTypes = async () => {
    try {
      const response = await fetch('http://localhost:1415/api/personnel-types/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPersonnelTypes(data);
    } catch (err) {
      error('Error fetching personnel types'); // Trigger error alert
    }
  };

  const handleSave = async () => {
    if (editingPersonnelType) {
      try {
        const response = await fetch(`http://localhost:1415/api/personnel-types/${editingPersonnelType.id}`, {
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
        success('Personnel type updated successfully'); // Trigger success alert
        handleCancel();
      } catch (err) {
        error('Error updating personnel type'); // Trigger error alert
      }
    } else {
      try {
        const response = await fetch('http://localhost:1415/api/personnel-types', {
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
        success('Personnel type added successfully'); // Trigger success alert
        handleCancel();
      } catch (err) {
        error('Error adding personnel type'); // Trigger error alert
      }
    }
  };

  const handleCancel = () => {
    setEditingPersonnelType(null);
    setPersonnelTypeName('');
    setIsActive(false);
  };

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

      <table className="ot_personnelType_table" ref={tableRef}>
        <thead>
          <tr>
            {['Personnel Type Name', 'IsActive', 'Action'].map((header, index) => (
              <th key={index} style={{ width: columnWidths[index] }} className="rd-resizable-th">
                <div className="header-content">
                  <span>{header}</span>
                  <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {personnelTypes.map((pt) => (
            <tr key={pt.id}>
              <td>{pt.name}</td>
              <td>{pt.isActive ? 'true' : 'false'}</td>
              <td>
                <button onClick={() => handleEdit(pt)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the CustomAlerts */}
      <CustomAlerts />
    </div>
  );
}

export default Ot_personnelType;
