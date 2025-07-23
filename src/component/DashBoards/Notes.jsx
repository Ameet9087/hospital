import React, { useState } from 'react';
import './Notes.css';
import FormComponent from '../DashBoards/AddNotes';
import { Search } from 'lucide-react';

const NotesTable = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle between table and form

  const handleAddNotesClick = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  const handleViewNotesClick = () => {
    setShowForm(false); // Go back to the notes table when "View Notes" is clicked
  };

  return (
    <div className="notes-container">
      {!showForm ? (
        <>
          <button className="add-notes-btn" onClick={handleAddNotesClick}>+Add Notes</button>
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
            <Search className="search-icon" />
          </div>
          <div className="table-container">
            <table className="notes-table">
              <thead>
                <tr>
                  <th>Recorded On</th>
                  <th>Primary Doctor</th>
                  <th>Template Type</th>
                  <th>Note Type</th>
                  <th>Written By</th>
                  <th>Visit Code</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="no-rows">No Rows To Show</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>0 to 0 of 0</span>
            <button className="pagination-btn">First</button>
            <button className="pagination-btn">Previous</button>
            <span>Page 0 of 0</span>
            <button className="pagination-btn">Next</button>
            <button className="pagination-btn">Last</button>
          </div>
        </>
      ) : (
        <FormComponent onBack={handleViewNotesClick} /> // Passing a prop to handle back button
      )}
    </div>
  );
};

export default NotesTable;
