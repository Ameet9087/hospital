import React, { useEffect, useRef, useState } from "react";
import "./ServiceList.css";
import axios from "axios";
import CustomModel from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import ServiceMaster from "./ServiceMaster";

const Services = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceDetails, setServiceDetails] = useState([]);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/service-details`);
      setServiceDetails(response.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const refreshTable = () => {
    fetchServiceDetails();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="ServiceList">
        <button className="room-add-btn" onClick={openModal}>
          Add Service
        </button>

        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Service Name",
                "Display Name",
                "Service Code",
                "Service Type",
                "Company Name",
                "Company Code",
                "Doctor Required",
                "Package Services",
                "Status",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] || "auto" }}
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
            {serviceDetails?.length > 0 ? (
              serviceDetails.map((item) => (
                <tr key={item.serviceDetailsId}>
                  <td>{item.serviceName}</td>
                  <td>{item.displayName}</td>
                  <td>{item.serviceCode}</td>
                  <td>{item.serviceTypeName}</td>
                  <td>{item.companyName}</td>
                  <td>{item.companyCode}</td>
                  <td>{item.doctorRequireType}</td>
                  <td>{item.packageServices}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-data">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CustomModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ServiceMaster
            refreshTable={refreshTable}
            onClose={() => setIsModalOpen(false)}
          />
        </CustomModel>
      )}
    </>
  );
};

export default Services;
