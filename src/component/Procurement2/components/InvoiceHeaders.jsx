import React, { useEffect, useState } from "react";
import "./InvoiceHeaders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import InvoiceHeaderForm from "../components/AddInvoiceHeader";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";

const InvoiceHeaders = () => {
  const [invoiceHeaders, setInvoiceHeaders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInvoiceHeaders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/invoice-headers/getAll`);
      const data = await response.json();
      setInvoiceHeaders(data);
    } catch (error) {
      console.error("Error fetching invoice headers:", error);
    }
  };

  useEffect(() => {
    fetchInvoiceHeaders();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="InvoiceHeaders">
      {/* Add Header Button */}
      <button className="InvoiceHeaders__add-button" onClick={openModal}>
        Add New Invoice Header
      </button>

      {/* Search Section */}
      

      {/* Header Section */}
      <div className="InvoiceHeaders__table-header">
      <div className="InvoiceHeaders__search-container">
        <input
          type="text"
          placeholder="Search"
          className="InvoiceHeaders__search-input"
        />
      </div>
      <div>
        <span>Showing 0 / 0 results</span>
        <button className="InvoiceHeaders__print-button">Print</button>
        </div>
      </div>

      {/* Table Section */}
      <table className="InvoiceHeaders__table">
        <thead>
          <tr>
            {[
              "Hospital Name",
              "Address",
              "Telephone",
              "Email",
              "Pin",
              "DDA",
              "Header Description",
              "Created Date",
              "Is Active",
              "Action",
            ].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoiceHeaders.length > 0 ? (
            invoiceHeaders.map((header) => (
              <tr key={header.id}>
                <td>{header.hospitalName}</td>
                <td>{header.address}</td>
                <td>{header.telephone}</td>
                <td>{header.email}</td>
                <td>{header.kraPin}</td>
                <td>{header.dda}</td>
                <td>{header.headerDescription}</td>
                <td>{header.createdDate}</td>
                <td>{header.isActive ? "Yes" : "No"}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="InvoiceHeaders__no-data">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Invoice Header Modal */}
      <CustomModal isOpen={isModalOpen} onClose={closeModal}>
        <InvoiceHeaderForm />
      </CustomModal>
    </div>
  );
};

export default InvoiceHeaders;
