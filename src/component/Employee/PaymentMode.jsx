import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import CustomModal from "../../CustomModel/CustomModal";
import { FloatingInput, FloatingSelect, PopupTable } from "../../FloatingInputs";
import "./PaymentMode.css";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as XLSX from "xlsx";

const PaymentMode = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    type: "",
    employeeDTO: [{
      employeeId: "",
    }
    ]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: formData.date,
      description: formData.description,
      type: formData.type,
      employeeDTO: [{
        employeeId: formData.employeeId || null,
      }],
    };

    console.log("Payload being sent:", payload); // Debugging

    try {
      const response = await axios.post("http://192.168.1.68:4096/api/paymode-master", payload);
      console.log("Response from API:", response.data);
      alert("Data saved successfully!");

      setData([...data, response.data]);
      setShowModal(false);

      // Reset form
      setFormData({
        date: "",
        description: "",
        type: "",
        employeeDTO: [], // Reset employee list
      });
    } catch (error) {
      console.error("Error submitting payment:", error.response ? error.response.data : error.message);
    }
  };

  const handleAdd = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get("http://192.168.1.68:4096/api/paymode-master");
        setData(response.data || []);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, []);

  const handleExport = () => {
    const exportData = data.map((item, index) => {
      const employee = item.employeeDTO?.[0] || {}; // Get first employee safely

      return {
        SrNo: index + 1,
        ID: employee.employeeId || "N/A", // Fix Employee ID
        "Employee Name": `${employee.firstName || ""} ${employee.middleName || ""} ${employee.lastName || ""}`.trim() || "N/A", // Fix Employee Name
        Date: item.date,
        Type: item.type,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payment Mode List");
    XLSX.writeFile(workbook, "Payment_Mode_List.xlsx");
  };


  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleEdit = (id) => alert(`Edit entry with ID: ${id}`);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.36:4096/api/payments/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting payment record:", error);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printableContent = document.getElementById("printable-table").outerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Payment Mode List</title>
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
          <h2>Payment Mode List</h2>
          ${printableContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };


  const filteredData = data.filter(
    (item) =>
      item.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date?.includes(searchTerm)
  );
  // Fetch Employee Data
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.68:4096/api/employees/get-all-employee"
        );
        setEmployeeData(response.data || []);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);
  const handleSelect = (selectedData) => {
    if (activePopup === "Employee") {
      setFormData((prev) => ({
        ...prev,
        employeeId: selectedData?.employeeId || "",
        employeeName: selectedData?.employeeName || "",
      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "Employee") {
      return {
        columns: ["employeeId", "employeeName"],
        data: employeeData.map((employee) => ({
          employeeId: employee?.employeeId,
          employeeName: employee?.firstName,
          realobj: employee,
        })),
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data: popupData } = getPopupData();

  return (
    <div className="PaymentMode-container">
      <button onClick={handleAdd} className="PaymentMode-add-btn">
        Add Payment Mode
      </button>
      <div className="PaymentMode-search-N-result">
        <div className="PaymentMode-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="PaymentMode-info">
          <button className="PaymentMode-print-button" onClick={handleExport}>
            <FontAwesomeIcon icon={faDownload} /> Export
          </button>
          <button className="PaymentMode-print-button" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>
        </div>
      </div>
      <div id="printable-table">
        <table ref={tableRef} className="PaymentMode-table">
          <thead>
            <tr>
              {["SrNo", "ID", "Employee Name", "Date", "Type", "Actions"].map(
                (header, index) => (
                  <th key={index} className={`resizable-th ${header === "Actions" ? "no-print" : ""}`}>

                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>No records found.</td>
              </tr>
            ) : (
              filteredData.map((item, index) => {
                const employee = item.employeeDTO?.[0];
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{employee?.employeeId || "N/A"}</td>
                    <td>{`${employee?.firstName || ""} ${employee?.middleName || ""} ${employee?.lastName || ""}`.trim() || "N/A"}</td> {/* Fix Employee Name */}
                    <td>{item.date}</td>
                    <td>{item.type}</td>
                    <td className="PaymentMode-action-btn no-print">

                      <button className="PaymentMode-status-btn" onClick={() => handleEdit(item.id)}>Edit</button>
                      <button className="PaymentMode-status-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>
      <CustomModal isOpen={showModal} onClose={handleClose}>
        <div className="PaymentMode-form">
          <div className="PaymentMode-section">
            <div className="PaymentMode-grid">
              <FloatingInput label="Employee Name" type="search" name="employeeName" value={formData.employeeName} onChange={handleChange} onIconClick={() => setActivePopup("Employee")} />
              <FloatingInput label="Employee Id" name="employeeId" value={formData.employeeId} onChange={handleChange} />
              <FloatingInput label="Current Date" type="date" name="date" value={formData.date} onChange={handleChange} />
              <FloatingInput label="Description" name="description" value={formData.description} onChange={handleChange} />
              <FloatingSelect
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={[
                  { label: "UPI", value: "UPI" },
                  { label: "Cash", value: "Cash" },
                  { label: "Card", value: "Card" },
                  { label: "Net Banking", value: "Net Banking" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="PaymentMode-submit-button">
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

export default PaymentMode;
