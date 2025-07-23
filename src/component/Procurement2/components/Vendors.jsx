import React, { useState, useEffect, useRef } from "react";
import "./Vendors.css";
import AddVendor from "../components/AddVendor";
import UpdateVendor from "../components/UpdateVendor";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import * as XLSX from 'xlsx';

const Vendors = () => {
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isUpdateVendorOpen, setIsUpdateVendorOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);


  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/vendors/getAllVendors`);
        const data = await response.json();
        setVendors(data);
        console.log(data);

      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendors();
  }, []);

  const openAddVendorModal = () => {
    setIsAddVendorOpen(true);
  };

  const openUpdateVendorModal = (vendor) => {
    setSelectedVendor(vendor);
    setIsUpdateVendorOpen(true);
  };

  const closeUpdateVendorModal = () => {
    setIsUpdateVendorOpen(false);
  };

  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
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
  useEffect(() => {
    const filtered = vendors.filter((vendor) =>
      Object.values(vendor).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredVendors(filtered);
  }, [searchQuery, vendors]);
  return (
    <div className="Vendors">
      <button className="Vendors-add-btn" onClick={openAddVendorModal}>
        Add Vendor
      </button>

      <div className="Vendors-table-header">
        <div className="Vendors-search-container">
          {/* <input type="text" placeholder="Search" className="Vendors-search-input" /> */}
          <input
            type="text"
            placeholder="Search"
            className="Vendors-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="Vendors-search-filter">
          <span>Showing {vendors.length} / {vendors.length}results</span>
          <button className="Vendors-print-btn" onClick={handleExport}>Export</button>
          <button className="Vendors-print-btn" onClick={printList}>Print</button>
        </div>
      </div>

      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "Vendor Name",
              "Vendor Code",
              "Contact Person",
              "Contact Address",
              "Contact Number",
              "KRA PIN",
              "Email Address",
              "Is Active",
              "Action"
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
          {filteredVendors.map((vendor, index) => (
            <tr key={index}>
              <td>{vendor.vendorName}</td>
              <td>{vendor.vendorCode}</td>
              <td>{vendor.contactPerson || ""}</td>
              <td>{vendor.contactAddress}</td>
              <td>{vendor.contactNumber}</td>
              <td>{vendor.kraPin || ""}</td>
              <td>{vendor.email || ""}</td>
              <td>{(vendor.isActive) ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="Vendors-edit-btn"
                  onClick={() => openUpdateVendorModal(vendor)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* AddVendor Modal */}
      <CustomModal isOpen={isAddVendorOpen} onClose={() => setIsAddVendorOpen(false)}>
        <AddVendor onClose={() => setIsAddVendorOpen(false)} />
      </CustomModal>

      {/* UpdateVendor Modal */}
      <CustomModal isOpen={isUpdateVendorOpen} onClose={closeUpdateVendorModal}>
        <UpdateVendor vendor={selectedVendor} onClose={closeUpdateVendorModal} />
      </CustomModal>
    </div>
  );
};

export default Vendors;
