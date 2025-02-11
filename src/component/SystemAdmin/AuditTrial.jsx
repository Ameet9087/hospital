// Dhanashree_AuditTrial_19/09
import React, { useRef, useState } from 'react';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import '../SystemAdmin/AuditTrial.css';

const AuditTrails = () => {
  const auditTableRef = useRef();
  const loginInfoTableRef = useRef();
  const [columnWidthsAudit, setColumnWidthsAudit] = useState({});
  const [columnWidthsLogin, setColumnWidthsLogin] = useState({});

  const handlePrint = () => {
    const printContent = auditTableRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="AuditTrials-audit-trail">
      <h2 className="AuditTrials-section-title">AUDIT TRAIL DETAILS</h2>
      
      <div className="AuditTrials-filters">
        <div className="AuditTrials-filter-item">
          <label>User Name :</label>
          <select><option>Select User(s)</option></select>
        </div>
        <div className="AuditTrials-filter-item">
          <label>Table Name :</label>
          <select><option>Select Table(s)</option></select>
        </div>
        <div className="AuditTrials-filter-item">
          <label>Select Action :</label>
          <select>
            <option>Select Action</option>
          </select>
        </div>
      </div>
      
      <div className="AuditTrials-date-range">
        <div className="AuditTrials-date-input">
          <label>From:</label>
          <input type="date" value="2024-08-06" />
        </div>
        <div className="AuditTrials-date-input">
          <label>To:</label>
          <input type="date" value="2024-08-13" />
        </div>
        <button className="AuditTrials-star-btn">☆</button>
        <button className="AuditTrials-minus-btn">-</button>
        <button className="AuditTrials-ok-btn">OK</button>
      </div>
      
      <div className="AuditTrials-search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>
      
      <div className="AuditTrials-results-info">
        <span>Showing 0 / 0 results</span>
        <button className="AuditTrials-export-btn">Export</button>
        <button className="AuditTrials-print-btn" onClick={handlePrint}>Print</button>
      </div>

      {/* First Table - Audit Trails */}
      <div ref={auditTableRef}>
  <table className="AuditTrials-audit-table">
    <thead>
      <tr>
        {[
          "AuditId", 
          "InsertDate", 
          "ChangedByUserId", 
          "ChangedByUserName", 
          "Table_Database", 
          "ActionName", 
          "Table_Name", 
          "PrimaryKey", 
          "ColumnsValue"
        ].map((header, index) => (
          <th
            key={index}
            style={{ width: columnWidthsAudit[index] }}
            className="resizable-th"
          >
            <div className="header-content">
              <span>{header}</span>
              <div
                className="resizer"
                onMouseDown={startResizing(
                  auditTableRef,
                  setColumnWidthsAudit
                )(index)}
              ></div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[
        { AuditId: 1, InsertDate: '2024-08-01', ChangedByUserId: 101, ChangedByUserName: 'JohnDoe', Table_Database: 'SalesDB', ActionName: 'UPDATE', Table_Name: 'Orders', PrimaryKey: 'OrderID', ColumnsValue: 'Status=Delivered' },
        { AuditId: 2, InsertDate: '2024-08-02', ChangedByUserId: 102, ChangedByUserName: 'JaneSmith', Table_Database: 'HRDB', ActionName: 'INSERT', Table_Name: 'Employees', PrimaryKey: 'EmployeeID', ColumnsValue: 'Name=John Smith' },
        { AuditId: 3, InsertDate: '2024-08-03', ChangedByUserId: 103, ChangedByUserName: 'AliceJohnson', Table_Database: 'FinanceDB', ActionName: 'DELETE', Table_Name: 'Invoices', PrimaryKey: 'InvoiceID', ColumnsValue: 'InvoiceID=12345' },
        { AuditId: 4, InsertDate: '2024-08-04', ChangedByUserId: 104, ChangedByUserName: 'BobWilliams', Table_Database: 'SalesDB', ActionName: 'UPDATE', Table_Name: 'Customers', PrimaryKey: 'CustomerID', ColumnsValue: 'Address=New York' },
        { AuditId: 5, InsertDate: '2024-08-05', ChangedByUserId: 105, ChangedByUserName: 'CharlieBrown', Table_Database: 'HRDB', ActionName: 'INSERT', Table_Name: 'Departments', PrimaryKey: 'DeptID', ColumnsValue: 'DeptName=Marketing' },
        { AuditId: 6, InsertDate: '2024-08-06', ChangedByUserId: 106, ChangedByUserName: 'DavidMiller', Table_Database: 'FinanceDB', ActionName: 'UPDATE', Table_Name: 'Salaries', PrimaryKey: 'SalaryID', ColumnsValue: 'Amount=5000' },
        { AuditId: 7, InsertDate: '2024-08-07', ChangedByUserId: 107, ChangedByUserName: 'EmmaWilson', Table_Database: 'SalesDB', ActionName: 'DELETE', Table_Name: 'Products', PrimaryKey: 'ProductID', ColumnsValue: 'ProductID=98765' },
        { AuditId: 8, InsertDate: '2024-08-08', ChangedByUserId: 108, ChangedByUserName: 'FrankThomas', Table_Database: 'HRDB', ActionName: 'INSERT', Table_Name: 'Positions', PrimaryKey: 'PositionID', ColumnsValue: 'PositionName=Manager' },
        { AuditId: 9, InsertDate: '2024-08-09', ChangedByUserId: 109, ChangedByUserName: 'GraceLee', Table_Database: 'FinanceDB', ActionName: 'UPDATE', Table_Name: 'Transactions', PrimaryKey: 'TransactionID', ColumnsValue: 'Status=Completed' },
        { AuditId: 10, InsertDate: '2024-08-10', ChangedByUserId: 110, ChangedByUserName: 'HenryGreen', Table_Database: 'SalesDB', ActionName: 'DELETE', Table_Name: 'Orders', PrimaryKey: 'OrderID', ColumnsValue: 'OrderID=1234' },
      ].map((row, index) => (
        <tr key={index}>
          <td>{row.AuditId}</td>
          <td>{row.InsertDate}</td>
          <td>{row.ChangedByUserId}</td>
          <td>{row.ChangedByUserName}</td>
          <td>{row.Table_Database}</td>
          <td>{row.ActionName}</td>
          <td>{row.Table_Name}</td>
          <td>{row.PrimaryKey}</td>
          <td>{row.ColumnsValue}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>





















      <h2 className="AuditTrials-section-title">LOGIN INFORMATIONS</h2>
      
      <div className="AuditTrials-date-range">
        <div className="AuditTrials-date-input">
          <label>From:</label>
          <input type="date" value="2024-08-06" />
        </div>
        <div className="AuditTrials-date-input">
          <label>To:</label>
          <input type="date" value="2024-08-13" />
        </div>
        <button className="AuditTrials-star-btn">☆</button>
        <button className="AuditTrials-minus-btn">-</button>
        <button className="AuditTrials-ok-btn">OK</button>
      </div>
      
      <div className="AuditTrials-search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>

      <div className="AuditTrials-results-info">
        <span>Showing 318 / 318 results</span>
        <button className="AuditTrials-print-btn" onClick={handlePrint}>Print</button>
      </div>

      {/* Second Table - Login Information */}
      <div ref={loginInfoTableRef}>
        <table className="AuditTrials-login-info-table">
          <thead>
            <tr>
              {["Employ...", "UserName", "Action Name", "DateTime"].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidthsLogin[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        loginInfoTableRef,
                        setColumnWidthsLogin
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>admin</td>
              <td>login</td>
              <td>2024-08-06T00:05:14.933</td>
            </tr>
           

            <tr>
            <td>1</td>
            <td>admin</td>
            <td>login</td>
            <td>2024-08-06T01:43:47.403</td>
          </tr>
          <tr>
            <td>1</td>
            <td>admin</td>
            <td>login</td>
            <td>2024-08-06T06:25:28.727</td>
          </tr>
          <tr>
            <td>1</td>
            <td>admin</td>
            <td>login</td>
            <td>2024-08-06T07:57:55.65</td>
          </tr>
          <tr>
            <td></td>
            <td>admin</td>
            <td>invalid-login-attempt</td>
            <td>2024-08-06T09:01:35.563</td>
          </tr>
          <tr>
            <td></td>
            <td>admin</td>
            <td>invalid-login-attempt</td>
            <td>2024-08-06T09:01:42.11</td>
          </tr>
          <tr>
            <td>1</td>
            <td>admin</td>
            <td>login</td>
            <td>2024-08-06T11:26:45.623</td>
          </tr>
          <tr>
            <td></td>
            <td>admin</td>
            <td>invalid-login-attempt</td>
            <td>2024-08-06T11:45:54.25</td>
          </tr>
          <tr>
            <td></td>
            <td>admin</td>
            <td>invalid-login-attempt</td>
            <td>2024-08-06T11:47:43.39</td>
          </tr>
          <tr>
            <td></td>
            <td>admin</td>
            <td>invalid-login-attempt</td>
            <td>2024-08-06T11:47:53.733</td>
          </tr>
          <tr>
            <td></td>
            <td>admin</td>
            <td>invalid-login-attempt</td>
            <td>2024-08-06T11:49:04.873</td>
          </tr>



          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditTrails;
// Dhanashree_AuditTrial_19/09
