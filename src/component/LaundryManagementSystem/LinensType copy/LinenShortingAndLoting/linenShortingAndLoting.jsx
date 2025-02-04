import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./linenShortingAndLoting.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import PopupTable from "../../../Admission/PopupTable";

const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div
      className={`LinenLoting-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="LinenLoting-form-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="LinenLoting-form-floating-label">{label}</label>
    </div>
  );
};
const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`LinenLoting-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="LinenLoting-form-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="LinenLoting-form-floating-label">{label}</label>
    </div>
  );
};
const LinenShortingAndLoting = () => {
  const tableRef = useRef(null);
  const [linenTypes, setLinenTypes] = useState([]);
  const ipnoHeading = ["receiveNumber", "receiveDate"];
  const [activePopup, setActivePopup] = useState("");
  const [columnWidths, setColumnWidths] = useState(Array(8).fill(150));
  const [formData, setFormData] = useState({
    lotingNo: "",
    dateRange: "",
    fromDept: "",
    linenName: "",
    receiveDate: "",
    receiveTime: "",
    linenDetails: [
      {
        sn: 1,
        linenName: "",
        recQty: "",
        soiledLinen: "",
        infectedLinen: "",
        foulLinen: "",
        radioactiveLinen: "",
      },
    ],
  });

  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      linenName: "",
      recCity: "",
      soiledLinen: "",
      infectedLinen: "",
      foulLinen: "",
      radioactiveLinen: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [mainKey, subKey] = name.split(".");
      setFormData({
        ...formData,
        [mainKey]: {
          ...formData[mainKey],
          [subKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddRow = () => {
    const newRow = {
      sn: packageTableRows.length + 1,
      linenName: "",
      recCity: "",
      soiledLinen: 0,
      infectedLinen: 0,
      foulLinen: 0,
      radioactiveLinen: 0,
    };
    setPackageTableRows([...packageTableRows, newRow]);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updatedRows = packageTableRows.filter(
      (_, index) => index !== indexToRemove
    );
    const renumberedRows = updatedRows.map((row, index) => ({
      ...row,
      sn: index + 1,
    }));
    setPackageTableRows(renumberedRows);
  };
  const fetchRecieveNo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/linens-receives`);

      setLinenTypes(response.data);
      // setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching linen types:", error);
      setMessage("Failed to fetch linen types. Please try again.");
    }
  };
  useEffect(() => {
    fetchRecieveNo();
  }, []);
  const handleSubmit = async () => {
    const payload = {
      dateRange: formData.dateRange,
      fromDept: formData.fromDept,

      receiveDate: formData.receiveDate,
      receiveTime: formData.receiveTime,
      receiveNo: {
        receiveNumber: formData.receiveNumber || null,
        receiveDate: formData.receiveDate || null,
      },
      linenDetails: packageTableRows.map((row, index) => ({
        recCity: row.recCity,
        linenName: row.linenName,
        soiledLinen: row.soiledLinen,
        infectedLinen: row.infectedLinen,
        foulLinen: row.foulLinen,
        radioactiveLinen: row.radioactiveLinen,
      })),
    };
    console.log("dddddd", payload)
    try {
      const response = await axios.post(`${API_BASE_URL}/linenLoting`, payload);
      console.log("Data submitted successfully:", response.data);
      alert("Linen Loting data submitted successfully!");
    } catch (error) {
      console.error("Error submitting linen loting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handleSelect = (data) => {
    if (!data) return;

    console.log("Selected data:", data); // Debugging: Check what data is coming in

    if (activePopup === "linenType") {
      setFormData((prev) => ({
        ...prev,
        receiveNumber: data.receiveNumber || "",
        receiveDate: data.receiveDate || "",
      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "linenType") {
      return { columns: ipnoHeading, data: linenTypes };
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();


  return (
    <div className="LinenLoting-type">
      <div className="LinenLoting-form-section">
        <div className="LinenLoting-header">
          <span>
            <FaArrowCircleRight className="LinenLoting-header-arrowCircle" />
            <span className="LinenLoting-headingName">Linen Loting</span>
          </span>
        </div>
        <form
        // onSubmit={handleSubmit}
        >
          <div className="LinenLoting-section">
            <div className="LinenLoting-grid">
              <FloatingInput
                type="text"
                label="Loting No"
                id="lotingNo"
                name="lotingNo"
                value={formData.lotingNo}
                onChange={handleChange}
              />
              <FloatingInput
                label="Date Range"
                type="text"
                name="dateRange"
                value={formData.dateRange}
                onChange={handleChange}
              />
              <FloatingInput
                label="From Dept"
                type="text"
                name="fromDept"
                value={formData.fromDept}
                onChange={handleChange}
              />

              <FloatingInput
                label="Receive Date"
                type="date"
                name="receiveDate"
                value={formData.receiveDate}
                onChange={handleChange}
              />
              <FloatingInput
                label="Receive Time"
                type="time"
                name="receiveTime"
                value={formData.receiveTime}
                onChange={handleChange}
              />

              <div className="LinenMaster-search-field">
                <FloatingInput
                  label="Receive No"
                  type="text"
                  name="receiveNumber"
                  value={formData.receiveNumber || ""} // Ensure it's never undefined
                  onChange={handleChange}
                />
                <button
                  type="button" // Prevents form submission
                  className="LinenMaster-search-icon"
                  onClick={() => setActivePopup("linenType")}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      fill="currentColor"
                      d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                    />
                  </svg>
                </button>
              </div>
              <FloatingInput
                label="Receive Date (for Receive No)"
                type="date"
                name="receiveDate"
                value={formData.receiveDate || ""} // Ensure it's never undefined
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="LinenLoting-services-table ">
        <table ref={tableRef} border="1">
          <thead>
            <tr>
              {[
                "",
                "Sn",
                "Linen Name",
                "Rec City",
                "Soiled Linen",
                "Infected Linen",
                "Foul Linen",
                "Radioactive Linen",
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
            {packageTableRows.map((row, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="LinenLoting-add-btn"
                    onClick={handleAddRow}
                  >
                    Add
                  </button>
                  <button
                    className="LinenLoting-del-btn"
                    onClick={() => handleDeleteRow(index)}
                    disabled={packageTableRows.length <= 1}
                  >
                    Del
                  </button>
                </td>
                <td>{row.sn}</td>
                <td>
                  <input
                    type="text"
                    value={row.linenName}
                    onChange={(e) => {
                      const updatedRows = [...packageTableRows];
                      updatedRows[index].linenName = e.target.value;
                      setPackageTableRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="recCity"
                    value={row.recCity}
                    onChange={(e) => {
                      const updatedRows = [...packageTableRows];
                      updatedRows[index].recCity = e.target.value;
                      setPackageTableRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="soiledLinen"
                    value={row.soiledLinen}
                    onChange={(e) => {
                      const updatedRows = [...packageTableRows];
                      updatedRows[index].soiledLinen = Number(e.target.value);
                      setPackageTableRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="infectedLinen"
                    value={row.infectedLinen}
                    onChange={(e) => {
                      const updatedRows = [...packageTableRows];
                      updatedRows[index].infectedLinen = Number(e.target.value);
                      setPackageTableRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="foulLinen"
                    value={row.foulLinen}
                    onChange={(e) => {
                      const updatedRows = [...packageTableRows];
                      updatedRows[index].foulLinen = Number(e.target.value);
                      setPackageTableRows(updatedRows);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="radioactiveLinen"
                    value={row.radioactiveLinen}
                    onChange={(e) => {
                      const updatedRows = [...packageTableRows];
                      updatedRows[index].radioactiveLinen = Number(
                        e.target.value
                      );
                      setPackageTableRows(updatedRows);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="LinenLoting-action-buttons">
        <button
          type="button"
          className="blue"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <button type="button" className="gray">
          Close
        </button>
        <button type="button" className="red">
          Delete
        </button>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
};

export default LinenShortingAndLoting;
