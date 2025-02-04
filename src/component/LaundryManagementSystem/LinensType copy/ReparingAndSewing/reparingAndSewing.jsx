import React, { useState, useEffect, useRef } from "react";
import "./reparingAndSewing.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
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
      className={`reparingAndSewing-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <input
        type={type}
        className="reparingAndSewing-form-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="reparingAndSewing-form-floating-label">{label}</label>
    </div>
  );
};

// FloatingSelect component remains exactly the same
const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div
      className={`reparingAndSewing-form-floating-field ${isFocused || hasValue ? "active" : ""
        }`}
    >
      <select
        className="reparingAndSewing-form-floating-select"
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
      <label className="reparingAndSewing-form-floating-label">{label}</label>
    </div>
  );
};
const ReparingAndSewing = () => {
  const [formData, setFormData] = useState({
    refNo: "",
    repairDate: "",
  });

  const [activePopup, setActivePopup] = useState("");
  const ipnoHeading = ["linenTypeId", "linenType"];
  const [linenTypes, setLinenTypes] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);


  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      linenDesc: "",
      inStock: "",
      quantity: "",
    },
  ]);

  const [linenDetails, setLinenDetails] = useState([]);

  // Fetch linen details and auto-generate refNo from backend
  useEffect(() => {
    axios.get(`${API_BASE_URL}/linenTypes`)
      .then(response => {
        setLinenDetails(response.data);
        setLinenTypes(response.data);
      })
      .catch(error => {
        console.error("Error fetching linen details:", error);
      });

    // Fetch refNo (assuming it's auto-generated from backend)
    axios.get(`${API_BASE_URL}/linenRepairing/generateRefNo`)
      .then(response => {
        if (response.data && response.data.refNumber) {
          setFormData(prevData => ({ ...prevData, refNo: response.data.refNumber }));
        } else {
          console.error("No refNumber returned from backend");
        }
      })
      .catch(error => {
        console.error("Error fetching refNo:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      refNo: "",
      repairDate: "",
    });

    setPackageTableRows([{
      sn: 1,
      linenDesc: "",
      inStock: "",
      quantity: "",
    }]);
  };

  const handleAddRow = () => {
    const newRow = {
      sn: packageTableRows.length + 1,
      linenDesc: "",
      inStock: "",
      quantity: "",
    };
    setPackageTableRows([...packageTableRows, newRow]);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updatedRows = packageTableRows.filter((_, index) => index !== indexToRemove);
    const renumberedRows = updatedRows.map((row, index) => ({
      ...row,
      sn: index + 1,
    }));
    setPackageTableRows(renumberedRows);
  };

  // Handle the submission of the form
  const handleSubmit = () => {
    const payload = {
      repairDate: formData.repairDate,
      linenDetails: packageTableRows.map(row => ({

        inUse: row.inUse,
        quantity: row.quantity,
      })),
    };

    console.log("Payload being submitted:", payload);

    axios.post(`${API_BASE_URL}/linenRepairing`, payload)
      .then(response => {
        console.log("Data submitted successfully:", response.data);
        handleClear();  // Clear the form after submission
      })
      .catch(error => {
        console.error("Error submitting form:", error);
      });
  };
  const handleSelect = (data) => {
    console.log("Selected Data:", data); // Debugging
    if (!data) return;

    if (activePopup === "linenType") {
      // setAddLinnenTypes(data);
      setFormData((prev) => ({
        ...prev,
        linenType: data.linenType,
      }));
    }

    setActivePopup(null); // Close the popup after selection
  };

  const getPopupData = () => {
    if (activePopup === "linenType") {
      return { columns: ipnoHeading, data: linenTypes };
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();
  // Handle change for inStock value
  const handleInStockChange = (e, index) => {
    const updatedRows = [...packageTableRows];
    updatedRows[index].inStock = e.target.value;
    setPackageTableRows(updatedRows);
  };

  return (
    <div className="reparingAndSewing-type">
      {/* Header Section */}


      {/* Form Section */}
      <div className="reparingAndSewing-section">
        <div className="reparingAndSewing-header">
          <FaArrowCircleRight className="reparingAndSewing-header-arrowCircle" />
          <span className="reparingAndSewing-headingName">
            Linen Reparing And Sewing
          </span>
        </div>
        <div className="reparingAndSewing-grid">
          <FloatingInput

            label="Ref No"
            type="text"
            id="refNo"
            name="refNo"
            readonly="true"
            value={formData.refNo}
            onChange={handleChange}
            placeholder="Auto Generated Number"

          />
          <FloatingInput
            label="Repair Date"
            type="date"
            id="repairDate"
            name="repairDate"
            value={formData.repairDate}
            onChange={handleChange}
          />
          <a className="reparingAndSewing-form-group-load" href="#">Load Linen</a>
        </div>
      </div>

      {/* Table Section */}
      <div className="reparingAndSewing-services-table">
        <h3 className="reparingAndSewing-services-table-heading">Linen Details</h3>
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "", "Sn", "Linen Desc", "In Stock", "Quantity"
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
                    className="reparingAndSewing-add-btn"
                    onClick={handleAddRow}
                  >
                    Add
                  </button>
                  <button
                    className="reparingAndSewing-del-btn"
                    onClick={() => handleDeleteRow(index)}
                    disabled={packageTableRows.length <= 1}
                  >
                    Del
                  </button>
                </td>
                <td>{row.sn}</td>
                <td>
                  <div className="reparingAndSewing-form-group-search">
                    {/* <select
                      value={row.linenDesc}
                      onChange={(e) => {
                        const updatedRows = [...packageTableRows];
                        updatedRows[index].linenDesc = e.target.value;
                        setPackageTableRows(updatedRows);
                      }}
                       className="line-reparing-sew-in"
                    >
                      <option value="">Select Linen</option>
                      {linenDetails.map((linen) => (
                        <option key={linen.sn} value={linen.linenDesc}>
                          {linen.linenDesc}
                        </option>
                      ))}
                    </select> */}
                    <input name="" value={formData.linenType} />
                    <CiSearch onClick={() => setActivePopup("linenType")} />
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    value={row.inUse}
                    onChange={(e) => handleInStockChange(e, index)}
                    className="line-reparing-sew-in"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) => {
                      const updatedRows = [...packageTableRows];
                      updatedRows[index].quantity = e.target.value;
                      setPackageTableRows(updatedRows);
                      // className="line-reparing-sew-in"

                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="reparingAndSewing-action-buttons">
        <button className="btn-red">Delete</button>
        <button className="btn-orange" onClick={handleClear}>Clear</button>
        <button className="btn-gray">Close</button>
        <button className="btn-blue" onClick={handleSubmit}>Submit</button>
        <button className="btn-gray">Tracking</button>
        <button className="btn-green">Print</button>
        <button className="btn-gray">Version Comparison</button>
        <button className="btn-gray">SDC</button>
        <button className="btn-gray">Testing</button>
        <button className="btn-blue">Info</button>
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

export default ReparingAndSewing;
