import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserCollectionReport.css';
import { API_BASE_URL } from '../api/api';

const CategoryWiseLapReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [labReports, setLabReports] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchLabReports();
  }, []);

  const fetchLabReports = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lab-requests/fetch/category-wise-lab-report`
      );
      const data = response.data;

      const groupedReports = data.reduce((acc, report) => {
        const { labTestCategoryId, labTestCategoryName } = report;
        if (!acc[labTestCategoryId]) {
          acc[labTestCategoryId] = { category: labTestCategoryName, count: 0 };
        }
        acc[labTestCategoryId].count += 1;
        return acc;
      }, {});

      setLabReports(Object.values(groupedReports));
    } catch (error) {
      console.error('Error fetching lab reports:', error);
    }
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  const filteredReports = labReports.filter(report =>
    report.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    // Add heading
    doc.setFontSize(16);
    doc.text('Lab Revenue Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });

    // Add date range and current date/time
    doc.setFontSize(10);
    doc.text(`From Date: ${fromDate}`, 14, 25);
    doc.text(`To Date: ${toDate}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 35);

    // Prepare table data
    const tableData = filteredReports.map(report => [
      report.labTestName,
      report.createdOn,
      `₹${report.labTestPrice?.toFixed(2)}`,
      `₹${report.totalTestPrice?.toFixed(2)}`,
      `₹${report.discount?.toFixed(2)}`,
      `₹${report.totalRevenue?.toFixed(2)}`
    ]);

    // Define table headers
    const headers = [
      "Lab Test Name",
      "Created On",
      "Lab Test Price",
      "Total Test Price",
      "Discount",
      "Total Revenue"
    ];

    // Add table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Add total revenue at the bottom
    const lastY = doc.lastAutoTable.finalY;
    const totalRevenueSum = filteredReports.reduce((sum, report) => sum + report.totalRevenue, 0);
    doc.text(`Total Revenue: ₹${totalRevenueSum.toFixed(2)}`, 14, lastY + 10);

    // Open PDF in new tab
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };


  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Category Wise Lab Report</h3>
        <button className="user-collection-report-show-btn" onClick={handleShowReport}>
          Show Report
        </button>
      </div>

      {showReport && (
        <div className="user-collection-report-tab">
          <input
            type="text"
            placeholder="Search by Category"
            className="user-collection-report-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <table className="user-collection-report-table">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Category</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.category}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryWiseLapReport;