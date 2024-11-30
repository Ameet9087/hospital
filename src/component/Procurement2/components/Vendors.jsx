import React, { useState, useEffect, useRef } from "react";
import "./Vendors.css";
import AddVendor from "../components/AddVendor";
import UpdateVendor from "../components/UpdateVendor";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";

const Vendors = () => {
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isUpdateVendorOpen, setIsUpdateVendorOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch vendors data from API
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
          <button className="Vendors-print-btn">Print</button>
        </div>
      </div>

      <table className="Vendors-table" ref={tableRef}>
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
              "Action",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="Vendors-resizable-th"
              >
                <div className="Vendors-header-content">
                  <span>{header}</span>
                  <div
                    className="Vendors-resizer"
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
