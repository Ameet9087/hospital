/* Adan  15-11-24 */
import React, { useState, useEffect } from 'react';
import './BedTranferNote.css';

const BedTransferNote = () => {
  const [formData, setFormData] = useState({
    transferNo: "",
    patientId: "",
    patientName: "",
    age: "",
    gender: "",
    currentRoomType: "",
    currentBedNo: "",
    payType: "",
    bedNo: "",
    roomType: "",
    roomNo: "",
    floorNo: "",
    unit: "",
    remark: "",
  });

  const [bedTransferNotes, setBedTransferNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBedTransferNotes();
  }, []);

  const fetchBedTransferNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://192.168.0.123:9090/api/bed-transfer-notes');
      setBedTransferNotes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bed transfer notes');
      console.error('Error fetching bed transfer notes:', err);
    } finally {
      setIsLoading(false);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/ip-allot-extra-room", formData);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleButtonClick = (action) => {
    switch(action) {
      case 'Save':
        handleSubmit(new Event('submit'));
        break;
      case 'Clear':
        setFormData({
          transferNo: "", patientId: "", patientName: "", age: "", 
          gender: "", currentRoomType: "", currentBedNo: "", payType: "", 
          bedNo: "", roomType: "", roomNo: "", floorNo: "", unit: "", remark: ""
        });
        break;
      case 'Search':
        fetchBedTransferNotes();
        break;
      default:
        alert(`${action} button clicked!`);
    }
  };

  return (
    <div className="BedTransferNote-container">
      <div className="BedTransferNote-header">
        <span>Bed Transfer Note</span>
      </div>

      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-spinner">Loading...</div>}

      <form onSubmit={handleSubmit}>
        <div className="BedTransferNote-content">
          <div className="BedTransferNote-Section">
            <div className="BedTransferNote-Form">
              <label>Transfer No: </label>
              <input
                type="text"
                name="transferNo"
                value={formData.transferNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className='BedTransferNote-Section-header'>
              Patient Details
            </div>
            <div className="BedTransferNote-Form">
              <label>IP No: </label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Patient Name: </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Age: </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Gender: </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="BedTransferNote-Form">
              <label>Current Room Type: </label>
              <input
                type="text"
                name="currentRoomType"
                value={formData.currentRoomType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Current Bed No: </label>
              <input
                type="text"
                name="currentBedNo"
                value={formData.currentBedNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="BedTransferNote-Section">
            <div className='BedTransferNote-Section-header'>Transfer Details</div>
            <div className="BedTransferNote-Form">
              <label>Pay Type: </label>
              <select
                name="payType"
                value={formData.payType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Insurance">Insurance</option>
              </select>
            </div>
            <div className="BedTransferNote-Form">
              <label>Bed No: </label>
              <input
                type="text"
                name="bedNo"
                value={formData.bedNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Room Type: </label>
              <input
                type="text"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Room No: </label>
              <input
                type="text"
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Floor No: </label>
              <input
                type="text"
                name="floorNo"
                value={formData.floorNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="BedTransferNote-Form">
              <label>Unit: </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="BedTransferNote-Section">
            <div className="BedTransferNote-Form">
              <label>Remark: </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
      <div className="BedTransferNote-navbar">
        <aside className="BedTransferNote-navbar-btns">
        <button onClick={() => handleButtonClick('Save')}>Save</button>
        <button onClick={() => handleButtonClick('Delete')}>Delete</button>
        <button onClick={() => handleButtonClick('Clear')}>Clear</button>
        <button onClick={() => handleButtonClick('Close')}>Close</button>
        <button onClick={() => handleButtonClick('Search')}>Search</button>
	    <button onClick={() => handleButtonClick('Tracking')}>Tracking</button>
	    <button onClick={() => handleButtonClick('Print')}>Print</button>
	    <button onClick={() => handleButtonClick('Error Logs')}>Error Logs</button>
        <button onClick={() => handleButtonClick('Export')}>Export</button>
	    <button onClick={() => handleButtonClick('Import')}>Import</button>
        <button onClick={() => handleButtonClick('Health')}>Health</button>
        <button onClick={() => handleButtonClick('Version Comparsion')}>Version Comparsion</button>
	    <button onClick={() => handleButtonClick('SDC')}>SDC</button>
	    <button onClick={() => handleButtonClick('Testing ')}>Testing </button>
	    <button onClick={() => handleButtonClick('Info')}>Info</button>
        </aside>
      </div>
    </div>
  );
};

export default BedTransferNote;