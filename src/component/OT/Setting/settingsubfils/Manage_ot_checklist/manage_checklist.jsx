// neha-OT-manage-checklist-14-9-24
import React, { useState, useEffect,useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './manage_checklist.css';
import { startResizing } from '../../../../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../../../../api/api';

function ManageOtChecklist() {
  const [checklists, setChecklists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    checklistName: '',
    displayName: '',
    inputType: '',
    displaySequence: '',
    isActive: false,
    isMandatory: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  // Fetch data from API
  useEffect(() => {
    fetchChecklists();
  }, []);

  const fetchChecklists = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/otchecklists`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChecklists(data);
    } catch (error) {
      setError('Failed to fetch checklists. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (index) => {
    const checklist = checklists[index];
    setEditForm({
      checklistName: checklist.checklistName || '',
      displayName: checklist.displayName || '',
      inputType: checklist.inputType || '',
      displaySequence: checklist.displaySequence || '',
      isActive: checklist.isActive || false,
      isMandatory: checklist.isMandatory || false,
    });
    setEditingIndex(index);
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const url = editingIndex !== null 
        ? `${API_BASE_URL}/otchecklists/${checklists[editingIndex].id}`
        : `${API_BASE_URL}/otchecklists`;

      const method = editingIndex !== null ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to save checklist item.');
      }

      const savedChecklist = await response.json();

      if (editingIndex !== null) {
        // Update existing checklist
        setChecklists((prev) => {
          const newList = [...prev];
          newList[editingIndex] = savedChecklist;
          return newList;
        });
        setMessage('Checklist item updated successfully!');
      } else {
        // Add new checklist
        setChecklists((prev) => [...prev, savedChecklist]);
        setMessage('Checklist item added successfully!');
      }

      setEditingIndex(null);
      setEditForm({
        checklistName: '',
        displayName: '',
        inputType: '',
        displaySequence: '',
        isActive: false,
        isMandatory: false,
      });
    } catch (error) {
      setError('Error saving checklist. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditForm({
      checklistName: '',
      displayName: '',
      inputType: '',
      displaySequence: '',
      isActive: false,
      isMandatory: false,
    });
  };

  const filteredChecklists = checklists.filter((checklist) =>
    checklist.checklistName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='manage_ot_checklist_main'>
      <div className='manage_ot_checklist_form'>
        <form onSubmit={handleFormSubmit}>
          <div className="ot_checklist_input">
            <label htmlFor="checklist-name">Checklist Name:</label>
            <input
              type="text"
              id="checklist-name"
              name="checklistName"
              value={editForm.checklistName}
              onChange={handleFormChange}
              placeholder="Enter Checklist Name"
              required
            />
          </div>

          <div className="ot_checklist_input">
            <label htmlFor="display-name">Display Name:</label>
            <input
              type="text"
              id="display-name"
              name="displayName"
              value={editForm.displayName}
              onChange={handleFormChange}
              placeholder="Enter Display Name"
              required
            />
          </div>

          <div className="ot_checklist_dropdown">
            <label htmlFor="input-type">Input Type:</label>
            <select
              id="input-type"
              name="inputType"
              value={editForm.inputType}
              onChange={handleFormChange}
            >
              <option value="">Select Type</option>
              <option value="single">Single Section</option>
              <option value="multiple">Multiple Section</option>
              <option value="file">File</option>
              <option value="short-description">Short Description</option>
              <option value="long-description">Long Description</option>
            </select>
          </div>

          <div className="ot_checklist_input">
            <label htmlFor="display-sequence">Display Sequence:</label>
            <input
              type="number"
              id="display-sequence"
              name="displaySequence"
              value={editForm.displaySequence}
              onChange={handleFormChange}
              placeholder="Enter Display Sequence"
            />
          </div>

          <div className="ot_checklist_checkbox">
            <input
              type="checkbox"
              id="is-active"
              name="isActive"
              checked={editForm.isActive}
              onChange={handleFormChange}
            />
            <label htmlFor="is-active">Is Active</label>
          </div>

          <div className="ot_checklist_checkbox">
            <input
              type="checkbox"
              id="is-mandatory"
              name="isMandatory"
              checked={editForm.isMandatory}
              onChange={handleFormChange}
            />
            <label htmlFor="is-mandatory">Is Mandatory</label>
          </div>

          <div className="manage_ot_checklist_buttons">
            <button type="submit" className="manage_ot_checklist_save">Save</button>
            <button type="button" className="manage_ot_checklist_clear" onClick={handleCancelEdit}>Clear</button>
          </div>
        </form>
      </div>

      <div className="manage_ot_checklist_search_bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* <button className="manage_ot_checklist_filter_button">
          <FaSearch />
        </button> */}
      </div>

      
       <div className='table-container'>
       <table className="manage_ot_checklist_table" ref={tableRef}> 
          <thead>
            <tr>
            {[
  "Checklist Name",
  "Display Name",
  "Input Type",
  "Display Sequence",
  "Is Active",
  "Is Mandatory",
  "Action"
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
            {filteredChecklists.map((checklist, index) => (
              <tr key={index}>
                <td className='manage_ot_checklist_tabledata'>{checklist.checklistName || 'N/A'}</td>
                <td className='manage_ot_checklist_tabledata'>{checklist.displayName || 'N/A'}</td>
                <td className='manage_ot_checklist_tabledata'>{checklist.inputType || 'N/A'}</td>
                <td className='manage_ot_checklist_tabledata'>{checklist.displaySequence || 'N/A'}</td>
                <td className='manage_ot_checklist_tabledata'>{checklist.isActive ? 'Yes' : 'No'}</td>
                <td className='manage_ot_checklist_tabledata'>{checklist.isMandatory ? 'Yes' : 'No'}</td>
                <td className='manage_ot_checklist_tabledata'>
                  <button onClick={() => handleEdit(index)} className="manage_ot_checklist_edit_button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
    

      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default ManageOtChecklist;
