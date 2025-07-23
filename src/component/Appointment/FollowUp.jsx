import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import "./FollowUp.css";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import CustomModal from "../../CustomModel/CustomModal";
import { FloatingInput, PopupTable } from "../../FloatingInputs";
import { useFilter } from "../ShortCuts/useFilter";

const FollowUp = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [followup,setFollowUp] = useState();
  const [formData, setFormData] = useState({
    followUpFees: "",
    days: "",
    addDoctorDTO: [
      {
        doctorId: "",
      },
    ],
    locationMasterDTO: [
      {
        id: "",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorResponse, locationResponse,followUpResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/doctors`),
          axios.get(`${API_BASE_URL}/location-masters`),
          axios.get(`${API_BASE_URL}/followup`)

        ]);

        setDoctorData(
          Array.isArray(doctorResponse.data) ? doctorResponse.data : []
        );
        setLocationData(
          Array.isArray(locationResponse.data) ? locationResponse.data : []
        );
        setFollowUp(
          Array.isArray(followUpResponse.data)?followUpResponse.data:[]
        );
        console.log(followUpResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        days: formData.days,
        followUpFees: formData.followUpFees,
        addDoctorDTO: [
          {
            doctorId: formData.doctorId || null,
          },
        ],
        locationMasterDTO: [
          {
            id: formData.id || null,
          },
        ],
      };
      console.log(requestData);
      
      console.log(requestData);
      const response = await axios.post(
        `${API_BASE_URL}/followup`,
        requestData
      );
      const newFollowUp = {
        id: response.data.followUpId,
        doctorName: formData.doctorName,
        doctorId: formData.doctorId,
        location: formData.locationName,
        fees: formData.followUpFees,
        duration: formData.days,
      };

      setData([...data, newFollowUp]);
      setShowModal(false);
      toast.success("FollowUp Added Successfully ");
      setFormData({
        doctorId: "",
        doctorName: "",

        locationName: "",
        followUpFees: "",
        days: "",
      });
    } catch (error) {
      console.error("Error submitting follow-up:", error);
    }
  };

  const handleAdd = () => setShowModal(true);

  const handleExport = () => {
    const exportData = data.map((item, index) => ({
      SrNo: index + 1,
      ID: item.id,
      "Doctor Name": item.doctorName,
      "Doctor ID": item.doctorId,
      Location: item.location,
      Fees: item.fees,
      Duration: item.duration,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FollowUp List");
    XLSX.writeFile(workbook, "FollowUp_List.xlsx");
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    let printableContent = document.getElementById("printable-table").outerHTML;

    // Remove the "Actions" column from the table
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = printableContent;
    const table = tempDiv.querySelector("table");

    if (table) {
      // Remove the last column from header and rows
      const headers = table.querySelectorAll("thead th");
      if (headers.length > 0) {
        headers[headers.length - 1].remove();
      }

      const rows = table.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells.length > 0) {
          cells[cells.length - 1].remove();
        }
      });
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Print FollowUp List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            @media print {
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <h2>Follow-Up List</h2>
          ${tempDiv.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (data) => {
    if (activePopup === "Doctor Name") {
      setFormData((prev) => ({
        ...prev,
        doctorId: data?.doctorId || "",
        doctorName: data?.doctorName || "",
      }));
    } else if (activePopup === "Location") {
      setFormData((prev) => ({
        ...prev,
        id: data.realobj?.id || "",
        locationName: data?.locationName || "",
      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "Doctor Name") {
      return {
        columns: ["doctorId", "doctorName"],
        data: doctorData.map((doctor) => ({
          doctorId: doctor?.doctorId,
          doctorName: doctor?.doctorName,
          realobj: doctor,
        })),
      };
    } else if (activePopup === "Location") {
      return {
        columns: ["locationName"],
        data: locationData.map((location) => ({
          id: location?.id,
          locationName: location?.locationName,
          realobj: location,
        })),
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data: popupData } = getPopupData();
    const filteredItems = useFilter(followup, searchTerm);

  return (
    <div className="FollowUp-container">
      <button onClick={handleAdd} className="FollowUp-add-btn">
        Add FollowUp
      </button>
      <div className="FollowUp-search-N-result">
        <div className="FollowUp-search-bar">
          <FloatingInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="FollowUp-info">
          <button className="FollowUp-print-button" onClick={handleExport}>
            <FontAwesomeIcon icon={faDownload} /> Export
          </button>
          <button className="FollowUp-print-button" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
        </div>
      </div>
      <table ref={tableRef} id="printable-table" className="FollowUp-table">
        <thead>
          <tr>
            {[
              "SrNo",
              "Doctor Name",
              "Doctor ID",
              "Location",
              "Fees",
              "Duration",
            ].map((header, index) => (
              <th key={index} style={{ width: columnWidths[index] }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {followup?.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No records found.
              </td>
            </tr>
          ) : (
            filteredItems?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.addDoctorDTO[0]?.doctorName}</td>
                <td>{item?.addDoctorDTO[0]?.doctorId}</td>
                <td>{item?.locationMasterDTO[0]?.locationName}</td>
                <td>{item?.followUpFees}</td>
                <td>{item?.days}</td>
                {/* <td className="FollowUp-action-btn">
                  <button
                    className="FollowUp-status-btn"
                    onClick={() => alert(`Edit ${item.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="FollowUp-status-btn"
                    onClick={() =>
                      setData(data.filter((d) => d.id !== item.id))
                    }
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="FollowUp-form">
          <div className="FollowUp-section">
            <div className="FollowUp-grid">
              <FloatingInput
                label="Doctor Name"
                type="search"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                onIconClick={() => setActivePopup("Doctor Name")}
              />
              <FloatingInput
                label="Doctor ID"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                readOnly
              />
              <FloatingInput
                label="Location"
                type="search"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                onIconClick={() => setActivePopup("Location")}
              />
              <FloatingInput
                label="Fees"
                name="followUpFees"
                value={formData.followUpFees}
                onChange={handleChange}
              />
              <FloatingInput
                label="Duration (Days)"
                name="days"
                value={formData.days}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="FollowUp-submit-button">
          <button onClick={handleSubmit}>Submit</button>
        </div>
        {activePopup && (
          <PopupTable
            columns={columns}
            data={popupData}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
          />
        )}
      </CustomModal>
    </div>
  );
};

export default FollowUp;
