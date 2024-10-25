import React, { useEffect, useState, useRef } from "react";
import "../HhEmployeeInformation/hhEmpInformation.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";

const HHEmpInformation = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/employees/get-all-employee`
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorText}`
          );
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        const formattedEmployees = data.map((employee) => ({
          name: `${employee.salutation || ""} ${employee.firstName || ""} ${
            employee.lastName || ""
          }`,
          designation: employee.employeeRoleDTO?.role || "",
          department: employee.departmentDTO?.departmentName || "",
          phone: employee.contactNumber || "",
          ext: employee.extension || "",
          speedDial: employee.speedDial || "",
          room: employee.roomNo || "",
          hours: employee.officeHour || "",
        }));
        setEmployees(formattedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handlePrint = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      document.body.appendChild(iframe);

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hh-employee-list">
      <h4>List of Employees:</h4>

      <div className="hh-search-container-N-search">
        <div className="hh-search-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            className="hh-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="hh-results-info">
          <span>
            Showing {filteredEmployees.length} / {employees.length} results
          </span>
          <button className="hh-print-button" onClick={handlePrint}>
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Employee Name",
                "Designation",
                "Department",
                "phone No.",
                "Ext",
                "Speed Dial",
                "Room No.",
                "Office Hours",
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
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.designation}</td>
                <td>{employee.department}</td>
                <td>{employee.phone}</td>
                <td>{employee.ext}</td>
                <td>{employee.speedDial}</td>
                <td>{employee.room}</td>
                <td>{employee.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HHEmpInformation;
