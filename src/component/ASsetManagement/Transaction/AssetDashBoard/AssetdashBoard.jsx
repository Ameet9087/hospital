import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './AssetDashboard.css';
import { API_BASE_URL } from '../../../api/api';


const AssetDashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [gatePassOutRecords, setGatePassOutRecords] = useState([]);
  const [gatePassInRecords, setGatePassInRecords] = useState([]);
  const [breakdownRecords, setBreakdownRecords] = useState([]);
  const [condemnationDisposalRecords, setCondemnationDisposalRecords] = useState([]);
  const filterRef = useRef(null);

  const sections = [
    { id: 1, title: 'Break Down Details', records: breakdownRecords },
    { id: 2, title: 'Gate Pass Out', records: gatePassOutRecords },
    { id: 3, title: 'Gate Pass In', records: gatePassInRecords },
    { id: 4, title: 'Condemnation And Disposal', records: condemnationDisposalRecords },
  ];

  const scrollFilters = (direction) => {
    if (filterRef.current) {
      const filterContainer = filterRef.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      filterContainer.scrollLeft += scrollAmount;
    }
  };

  const fetchGatePassOutData = async (start, end) => {
    try {
      const formattedStartDate = start.toISOString().split('T')[0];
      const formattedEndDate = end.toISOString().split('T')[0];

      const response = await axios.get(`${API_BASE_URL}/gatePassOut`, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      setGatePassOutRecords(response.data);
    } catch (error) {
      console.error('Error fetching Gate Pass Out data:', error);
      setGatePassOutRecords([]);
    }
  };

  const fetchGatePassInData = async (start, end) => {
    try {
      const formattedStartDate = start.toISOString().split('T')[0];
      const formattedEndDate = end.toISOString().split('T')[0];

      const response = await axios.get(`${API_BASE_URL}/equipment-gate-pass-in`, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      setGatePassInRecords(response.data);
    } catch (error) {
      console.error('Error fetching Gate Pass In data:', error);
      setGatePassInRecords([]);
    }
  };

  const fetchBreakdownData = async (start, end) => {
    try {
      const formattedStartDate = start.toISOString().split('T')[0];
      const formattedEndDate = end.toISOString().split('T')[0];

      const response = await axios.get(`${API_BASE_URL}/breakdowns`, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      setBreakdownRecords(response.data);
    } catch (error) {
      console.error('Error fetching Breakdown data:', error);
      setBreakdownRecords([]);
    }
  };

  const fetchCondemnationDisposalData = async (start, end) => {
    try {
      const formattedStartDate = start.toISOString().split('T')[0];
      const formattedEndDate = end.toISOString().split('T')[0];

      const response = await axios.get(`${API_BASE_URL}/condemnation-disposals`, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      setCondemnationDisposalRecords(response.data);
    } catch (error) {
      console.error('Error fetching Condemnation and Disposal data:', error);
      setCondemnationDisposalRecords([]);
    }
  };

  useEffect(() => {
    fetchGatePassOutData(startDate, endDate);
    fetchGatePassInData(startDate, endDate);
    fetchBreakdownData(startDate, endDate);
    fetchCondemnationDisposalData(startDate, endDate);
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    fetchGatePassOutData(date, endDate);
    fetchGatePassInData(date, endDate);
    fetchBreakdownData(date, endDate);
    fetchCondemnationDisposalData(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    fetchGatePassOutData(startDate, date);
    fetchGatePassInData(startDate, date);
    fetchBreakdownData(startDate, date);
    fetchCondemnationDisposalData(startDate, date);
  };

  const handleFilterClick = (filterType) => {
    const now = new Date();
    let newStartDate = new Date();
    const newEndDate = new Date();

    switch (filterType) {
      case 'today':
        newStartDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'yesterday':
        newStartDate = new Date(now.setDate(now.getDate() - 1));
        newStartDate.setHours(0, 0, 0, 0);
        break;
      case 'lastWeek':
        newStartDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'thisMonth':
        newStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'lastMonth':
        newStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        newEndDate.setDate(0);
        break;
      case 'last3Months':
        newStartDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        return;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    fetchGatePassOutData(newStartDate, newEndDate);
    fetchGatePassInData(newStartDate, newEndDate);
    fetchBreakdownData(newStartDate, newEndDate);
    fetchCondemnationDisposalData(newStartDate, newEndDate);
  };

  const handleRefresh = () => {
    fetchGatePassOutData(startDate, endDate);
    fetchGatePassInData(startDate, endDate);
    fetchBreakdownData(startDate, endDate);
    fetchCondemnationDisposalData(startDate, endDate);
  };

  return (
    <div className="AssetDashboard-container">
      <div className="AssetDashboard-header">
        <div className="AssetDashboard-header-controls">
          <div className="AssetDashboard-date-filters">
            <div className="AssetDashboard-header-title">Asset Dashboard</div>
            <button
              className="AssetDashboard-filter-btn"
              onClick={() => scrollFilters('left')}
            >
              &lt;
            </button>

            <div className="AssetDashboard-filter-container" ref={filterRef}>
              <button onClick={() => handleFilterClick('today')} className="AssetDashboard-filter-btn">Today</button>
              <button onClick={() => handleFilterClick('yesterday')} className="AssetDashboard-filter-btn">Yesterday</button>
              <button onClick={() => handleFilterClick('lastWeek')} className="AssetDashboard-filter-btn">Last Week</button>
              <button onClick={() => handleFilterClick('thisMonth')} className="AssetDashboard-filter-btn">This Month Till Date</button>
              <button onClick={() => handleFilterClick('lastMonth')} className="AssetDashboard-filter-btn">Last Month</button>
              <button onClick={() => handleFilterClick('last3Months')} className="AssetDashboard-filter-btn">Last 3 Months</button>
            </div>

            <button
              className="AssetDashboard-filter-btn"
              onClick={() => scrollFilters('right')}
            >
              &gt;
            </button>
          </div>
          <div className="AssetDashboard-date-display">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd-MM-yyyy"
              className="AssetDashboard-datepicker"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd-MM-yyyy"
              className="AssetDashboard-datepicker"
            />
            <button className="AssetDashboard-refresh-btn" onClick={handleRefresh}>Refresh</button>
            <button className="AssetDashboard-close-btn">Close</button>
          </div>
        </div>
      </div>
      <div className="AssetDashboard-grid">
        {sections.map((section) => (
          <div key={section.id} className="AssetDashboard-grid-item">
            <div className="AssetDashboard-section-header">
              <span>{section.title}</span>
              <span className="AssetDashboard-section-count">{section.records.length}</span>
            </div>
            <div className="AssetDashboard-section-content">
              {section.records.length === 0 && (
                <div className="AssetDashboard-no-records">No Records Found</div>
              )}
              {section.records.length > 0 && (
                <table className="AssetDashboard-records-table">
                  <thead>
                    <tr>
                      <th>SN</th>
                      {section.title === 'Break Down Details' && <><th>Breakdown Date</th><th>Equipment Name</th><th>Complaint Subject</th></>}
                      {section.title === 'Gate Pass Out' && <><th>Gate Pass Out Date</th><th>Equipment Name</th><th>Type</th></>}
                      {section.title === 'Gate Pass In' && <><th>Gate Pass In Date</th><th>Equipment Name</th><th>Type</th></>}
                      {section.title === 'Condemnation And Disposal' && <><th>Condemnation Date</th><th>Equipment Name</th><th>Type</th></>}
                    </tr>
                  </thead>
                  <tbody>
                    {section.records.map((record, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {section.title === 'Break Down Details' && <>
                          <td>{record.breakdownDate}</td>
                          <td>{record.complaintDTO?.equipmentMaster?.equipmentName}</td>
                          <td>{record.complaintDTO?.complaintSubject}</td>
                        </>}
                        {section.title === 'Gate Pass Out' && <>
                          <td>{record.gatePassOutDate}</td>
                          <td>{record.equipmentMasterDTO?.equipmentName}</td>
                          <td>{record.type}</td>
                        </>}
                        {section.title === 'Gate Pass In' && <>
                          <td>{record.gatePassInDate}</td>
                          <td>{record.equipmentMasterDTO?.equipmentName}</td>
                          <td>{record.gatePassType}</td>
                        </>}
                        {section.title === 'Condemnation And Disposal' && <>
                          <td>{record.condemDate}</td>
                          <td>{record.condemnationDisposalRequestDTO?.equipmentMasterDTO?.equipmentName}</td>
                          <td>{record.condemnationDisposalRequestDTO?.type}</td>
                        </>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetDashboard;
