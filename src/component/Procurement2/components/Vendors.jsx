import React, { useState, useEffect, useRef } from "react";
import "./Vendors.css";
import AddVendor from "../components/AddVendor";
import UpdateVendor from "../components/UpdateVendor";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import * as XLSX from 'xlsx';

const Vendors = () => {
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isUpdateVendorOpen, setIsUpdateVendorOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
 


const [columnWidths,setColumnWidths] = useState({});
const tableRef=useRef(null);


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
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };


  return (
    <div className="Vendors">
      <button className="Vendors-add-btn" onClick={openAddVendorModal}>
        Add Vendor
      </button>
      
      <div className="Vendors-table-header">
        <div className="Vendors-search-container">
          <input type="text" placeholder="Search" className="Vendors-search-input" />
        </div>
        <div className="Vendors-search-filter">
          <span>Showing {vendors.length} / {vendors.length}results</span>
          <button className="Vendors-print-btn" onClick={handleExport}>Export</button>
          <button className="Vendors-print-btn" onClick={handlePrint}>Print</button>
        </div>
      </div>

      <table  ref={tableRef}>
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
          {vendors.map((vendor, index) => (
            <tr key={index}>
              <td>{vendor.vendorName}</td>
              <td>{vendor.vendorCode}</td>
              <td>{vendor.contactPerson || ""}</td>
              <td>{vendor.contactAddress}</td>
              <td>{vendor.contactNumber}</td>
              <td>{vendor.kraPin || ""}</td>
              <td>{vendor.email || ""}</td>
              <td>{(vendor.isActive)?"Active":"Inactive"}</td>
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
        <AddVendor onClose={() => setIsAddVendorOpen(false)}/>
      </CustomModal>

      {/* UpdateVendor Modal */}
      <CustomModal isOpen={isUpdateVendorOpen} onClose={closeUpdateVendorModal}>
        <UpdateVendor vendor={selectedVendor} onClose={closeUpdateVendorModal} />
      </CustomModal>
    </div>
  );
};

export default Vendors;
