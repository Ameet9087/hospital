import React, { useState, useRef, useEffect } from "react";
import "./LinenStockUpAndConversion.css";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from React Icons
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import PopupTable from "../../../Admission/PopupTable";
import { API_BASE_URL } from "../../../api/api";
import axios from "axios";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";

function LinenStockUpAndConversion() {
  const [rows, setRows] = useState([
    { linenTypeId: "", stock: "" }, // Each row tracks its own data
  ]);

  const [columnWidths1, setColumnWidths1] = useState({});
  const tableRef1 = useRef(null);
  const [linenDetails, setLinenDetails] = useState([]);
  const linenDetailsHeading = ["linenTypeId", "description"];
  const [activePopup, setActivePopup] = useState(null);
  const [addLinenDetails, setaddLinenDetails] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [formData, setFormData] = useState({ stockDate: "" });

  // Fetch linen details
  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/linenMaster`);
      const details = response.data.map((item) => ({
        linenTypeId: item.linenTypeDTO.linenTypeId,
        description: item.linenTypeDTO.description,
        quantity: item.linenTypeDTO.stock,
      }));
      setLinenDetails(details);
    } catch (error) {
      console.error("Error fetching linen details:", error);
    }
  };

  useEffect(() => {
    fetchItemDetails();
  }, []);

  // Handle popup close
  const handlePopupClose = () => {
    setActivePopup(null);
    setSelectedRowIndex(null);
  };

  // Handle selecting data from popup
  const handleSelect = (data) => {
    if (!data) return;
    setaddLinenDetails(data);
    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === selectedRowIndex
          ? { ...row, linenTypeId: data.linenTypeId, quantity: data.quantity }
          : row
      )
    );

    handlePopupClose(); // Close popup after selection
  };

  // Add a new row
  const handleAddRow = () => {
    setRows([...rows, { linenTypeId: "", stock: "" }]);
  };

  // Delete a row
  const handleDeleteRow = (index) => {
    if (index === 0) return; // Prevent deleting the first row
    setRows(rows.filter((_, i) => i !== index));
  };

  const getPopupData = () => {
    if (activePopup === "itemDetails") {
      return { columns: linenDetailsHeading, data: linenDetails };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();

  const handleAddStock = async () => {
    const linenDetailsDTO = rows.map((row) => ({
      quantity: row.quantity,

    }));

    const newEntry = {
      stockDate: formData.stockDate,
      linenDetailsDTO,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/linen-stockups`,
        newEntry
      );
      console.log("Response from server:", response.data);

      toast.success("Stock added successfully!");
    } catch (error) {
      console.error("Error posting data:", error.response || error.message);
      toast.error("Failed to post data. Please try again.");
    }
  };


  return (
    <div className="StockUpAndConversion-container">
      <h2 className="StockUpAndConversionH2">Linens Stock Up And Conversion</h2>
      <div className="LinenStockUpAndConversion-section">
        <div className="LinenStockUpAndConversion-grid">
          <FloatingInput label="Stockup Number" type="text" />
          <FloatingInput
            label="Stock Date"
            type="date"
            value={formData.stockDate}
            onChange={(e) =>
              setFormData({ ...formData, stockDate: e.target.value })
            }
          />
          <a className="reparingAndSewing-form-group-load" href="#">
            Load Linen
          </a>
        </div>
      </div>
      <div className="LinesRequirementlabeldiv">
        <label className="label3">
          Linen Details{" "}
          <label className="Label44">(Control + Enter For New Row)</label>
          <FaSearch className="StockUpAndConversion-search-icon" />
        </label>
      </div>

      <table className="StockUpAndConversion-table" ref={tableRef1}>
        <thead>
          <tr>
            {["Action", "SN", "Linens Desc", "Linen Quantity"].map(
              (header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths1[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef1,
                        setColumnWidths1
                      )(index)}
                    ></div>
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <button
                  className="StockUpAndConversion-action-button"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="StockUpAndConversion-action-button delete"
                  onClick={() => handleDeleteRow(index)}
                  disabled={index === 0}
                >
                  Delete
                </button>
              </td>
              <td>{index + 1}</td>
              <td>
                <div className="StockUpAndConversion-cell">
                  <span>{row.linenTypeId}</span>
                  <FaSearch
                    className="StockUpAndConversion-search-icon-row"
                    onClick={() => {
                      setActivePopup("itemDetails");
                      setSelectedRowIndex(index);
                    }}
                  />
                </div>
              </td>
              <td>
                <input value={row.quantity} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleAddStock} className="LinenStockUpAndConversion-save">Add</button>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
}

export default LinenStockUpAndConversion;
