// Dhanashree_DatabaseBackup_19/09
import React, { useState, useRef } from "react";
import "./DataBaseBackup.css";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactToPrint from "react-to-print";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
const DatabaseBackup = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Reference to the table for printing
  const componentRef = useRef();

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const exportToCSV = () => {
    const headers = [
      "Date",
      "File Name",
      "Database Name",
      "Database Version",
      "Action",
      "Status",
      "Action Detail",
    ];
    const data = [
      [
        "2024-08-13",
        "backup_20240813.sql",
        "employee_db",
        "v2.1",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-14",
        "backup_20240814.sql",
        "sales_db",
        "v1.8",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-15",
        "backup_20240815.sql",
        "customer_db",
        "v2.0",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-16",
        "backup_20240816.sql",
        "inventory_db",
        "v1.9",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-17",
        "backup_20240817.sql",
        "orders_db",
        "v2.2",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-18",
        "backup_20240818.sql",
        "product_db",
        "v1.7",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-19",
        "backup_20240819.sql",
        "hr_db",
        "v2.3",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-20",
        "backup_20240820.sql",
        "finance_db",
        "v1.6",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-21",
        "backup_20240821.sql",
        "support_db",
        "v2.4",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
      [
        "2024-08-22",
        "backup_20240822.sql",
        "marketing_db",
        "v1.5",
        "Backup",
        "Success",
        "Backup completed successfully",
      ],
    ];

    setSuccessMessage("CSV export done successfully");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    return { headers, data };
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Database Backup Report", 10, 10);
    doc.autoTable({
      head: [
        [
          "Date",
          "File Name",
          "Database Name",
          "Database Version",
          "Action",
          "Status",
          "Action Detail",
        ],
      ],
      body: [
        [
          "2024-08-13",
          "backup_20240813.sql",
          "employee_db",
          "v2.1",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-14",
          "backup_20240814.sql",
          "sales_db",
          "v1.8",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-15",
          "backup_20240815.sql",
          "customer_db",
          "v2.0",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-16",
          "backup_20240816.sql",
          "inventory_db",
          "v1.9",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-17",
          "backup_20240817.sql",
          "orders_db",
          "v2.2",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-18",
          "backup_20240818.sql",
          "product_db",
          "v1.7",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-19",
          "backup_20240819.sql",
          "hr_db",
          "v2.3",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-20",
          "backup_20240820.sql",
          "finance_db",
          "v1.6",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-21",
          "backup_20240821.sql",
          "support_db",
          "v2.4",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
        [
          "2024-08-22",
          "backup_20240822.sql",
          "marketing_db",
          "v1.5",
          "Backup",
          "Success",
          "Backup completed successfully",
        ],
      ],
    });
    doc.save("database-backup-report.pdf");

    setSuccessMessage("PDF export done successfully");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const exportToXML = () => {
    const data = `<backup>
  <record>
    <date>2024-08-13</date>
    <fileName>backup_20240813.sql</fileName>
    <databaseName>employee_db</databaseName>
    <databaseVersion>v2.1</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-14</date>
    <fileName>backup_20240814.sql</fileName>
    <databaseName>sales_db</databaseName>
    <databaseVersion>v1.8</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-15</date>
    <fileName>backup_20240815.sql</fileName>
    <databaseName>customer_db</databaseName>
    <databaseVersion>v2.0</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-16</date>
    <fileName>backup_20240816.sql</fileName>
    <databaseName>inventory_db</databaseName>
    <databaseVersion>v1.9</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-17</date>
    <fileName>backup_20240817.sql</fileName>
    <databaseName>orders_db</databaseName>
    <databaseVersion>v2.2</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-18</date>
    <fileName>backup_20240818.sql</fileName>
    <databaseName>product_db</databaseName>
    <databaseVersion>v1.7</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-19</date>
    <fileName>backup_20240819.sql</fileName>
    <databaseName>hr_db</databaseName>
    <databaseVersion>v2.3</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-20</date>
    <fileName>backup_20240820.sql</fileName>
    <databaseName>finance_db</databaseName>
    <databaseVersion>v1.6</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-21</date>
    <fileName>backup_20240821.sql</fileName>
    <databaseName>support_db</databaseName>
    <databaseVersion>v2.4</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
  <record>
    <date>2024-08-22</date>
    <fileName>backup_20240822.sql</fileName>
    <databaseName>marketing_db</databaseName>
    <databaseVersion>v1.5</databaseVersion>
    <action>Backup</action>
    <status>Success</status>
    <actionDetail>Backup completed successfully</actionDetail>
  </record>
</backup>`;

    const blob = new Blob([data], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "database-backup-report.xml";
    a.click();
    URL.revokeObjectURL(url);

    setSuccessMessage("XML export done successfully");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="database-backup-container">
      <div className="info-section">
        <h2>
          <u>Database Information for Backup</u>
        </h2>
        <div className="info-field">Database Name:</div>
        <div className="info-field">Database Version:</div>
        <div className="info-field">Backup File Name:</div>
        <div className="info-field">Last Backup Date:</div>
      </div>

      <div className="button-section">
        <div className="export-container">
          <div className="dropdown">
            <button className="export-button" onClick={handleDropdownToggle}>
              <span className="icon">↗</span> Database Export To ▼
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={exportToCSV}>Export to CSV</button>
                <button onClick={exportToPDF}>Export to PDF</button>
                <button onClick={exportToXML}>Export to XML</button>
              </div>
            )}
          </div>

          <button className="backup-button">
            <span className="icon">☰</span> Take Database Backup
          </button>
        </div>
      </div>

      <h3 className="details-header">DATABASE BACKUP/RESTORE DETAILS</h3>

      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="search-button">🔍</button>
      </div>

      <div className="results-info">
        <span>Showing 10 / 10 results</span>
        <button className="DatabaseBackupexport-btn">Export</button>
        <ReactToPrint
          trigger={() => (
            <button className="DatabaseBackup-print-btn">Print</button>
          )}
          content={() => componentRef.current}
        />
      </div>

      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "Date",
              "File Name",
              "Database Name",
              "Database Version",
              "Action",
              "Status",
              "Action Detail",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
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
          <tr>
            <td>2024-08-13</td>
            <td>backup_20240813.sql</td>
            <td>employee_db</td>
            <td>v2.1</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-14</td>
            <td>backup_20240814.sql</td>
            <td>sales_db</td>
            <td>v1.8</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-15</td>
            <td>backup_20240815.sql</td>
            <td>customer_db</td>
            <td>v2.0</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-16</td>
            <td>backup_20240816.sql</td>
            <td>inventory_db</td>
            <td>v1.9</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-17</td>
            <td>backup_20240817.sql</td>
            <td>orders_db</td>
            <td>v2.2</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-18</td>
            <td>backup_20240818.sql</td>
            <td>product_db</td>
            <td>v1.7</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-19</td>
            <td>backup_20240819.sql</td>
            <td>hr_db</td>
            <td>v2.3</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-20</td>
            <td>backup_20240820.sql</td>
            <td>finance_db</td>
            <td>v1.6</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-21</td>
            <td>backup_20240821.sql</td>
            <td>support_db</td>
            <td>v2.4</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
          <tr>
            <td>2024-08-22</td>
            <td>backup_20240822.sql</td>
            <td>marketing_db</td>
            <td>v1.5</td>
            <td>Backup</td>
            <td>Success</td>
            <td>Backup completed successfully</td>
          </tr>
        </tbody>
      </table>

      {/* <div className="pagination">
        <button className="disabled">First</button>
        <button className="disabled">Previous</button>
        <span>Page 1 of 1</span>
        <button className="disabled">Next</button>
        <button className="disabled">Last</button>
      </div> */}

      {/* Success Message Popup */}
      {showSuccess && (
        <div className="success-popup">
          <span className="success-icon">✔️</span> {successMessage}
        </div>
      )}
    </div>
  );
};

export default DatabaseBackup;

/* Dhanashree_DatabaseBackup_19/09 */
