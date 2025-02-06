import React, { useState, useRef, useEffect } from "react";
import "./Dgmaster.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../../api/api";
import IpMasterPopupTable from "../IPMaster/IpMasterPopupTable";
function Dgmaster() {
  const [activePopup, setActivePopup] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [packageType, setPackageType] = useState("");
  const [status, setStatus] = useState("Active");
  const [packageName, setPackageName] = useState("");
  const [packageCode, setPackageCode] = useState("");
  const [paytypes, setPaytypes] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [specialisation, setSpecialisation] = useState([]);
  const [selectedspecialisation, setSelectedSpecialisation] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [error, setError] = useState([]);
  const [organisation, setOrganisation] = useState([]);
  const [selectOrganisation, setSelectOrganisation] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [companyPackageName, setCompanyPackageName] = useState("");
  const [companyPackageCode, setCompanyPackageCode] = useState("");
  const [duration, setDuration] = useState();
  const [totalCost, setTotalCost] = useState();
  const [pkgActCost, setPkgActCost] = useState();
  const [organisationDetails, setOrganisationDetails] = useState("No");
  const [testDetails, setTestDetails] = useState([
    {
      id: 1,
      testName: "",
      testRate: "",
      specialisation: "",
      doctor: "",
      actRate: "",
      remarks: "",
    },
  ]);
  const [packageRates, setPackageRates] = useState([
    { id: 1, paytype: "", rate: "", discount: "", discAmt: "", actDiscPer: "" },
  ]);
  const [organizations, setOrganizations] = useState([
    { id: 1, orgName: "", type: "" },
  ]);
  const handleAddRow = (setter) => {
    setter((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        testName: "",
        testRate: "",
        specialisation: "",
        doctor: "",
        actRate: "",
        remarks: "",
      },
    ]);
  };
  const handleorgDeleteRow = (setter, id) => {
    setter((prev) => prev.filter((row) => row.id !== id));
  };

  const handleDeleteRow = (rowId) => {
    setTestDetails((prevDetails) =>
      prevDetails.filter((row) => row.id !== rowId)
    );
  };

  const updateRowValue = (setter, id, field, value) => {
    setter((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };
  const getPopupData = () => {
    if (activePopup === "services") {
      return { columns: ["serviceName", "rates"], data: serviceDetails };
    } else if (activePopup === "specialisation") {
      return {
        columns: ["specialisationId", "specialisationName"],
        data: specialisation,
      };
    } else if (activePopup === "doctor") {
      return { columns: ["doctorId", "doctorName"], data: doctor };
    } else if (activePopup === "organisation") {
      return { columns: ["masterId", "name"], data: organisation };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  const handleSelect = async (data) => {
    if (activePopup === "services") {
      setSelectedService(data);
      setTestDetails((prevRows) => {
        const emptyRowIndex = prevRows.findIndex(
          (row) => !row.testName && !row.testRate
        );
        if (emptyRowIndex !== -1) {
          const updatedRows = [...prevRows];
          updatedRows[emptyRowIndex] = {
            ...updatedRows[emptyRowIndex],
            testName: data.serviceName,
            testRate: data.rates || "",
            serviceDetailsId: data.serviceDetailsId, // Add this
          };
          const newTotalRate = updatedRows.reduce(
            (sum, row) => sum + (parseFloat(row.testRate) || 0),
            0
          );
          setTotalRate(newTotalRate);
          return updatedRows;
        }
        return prevRows;
      });
    } else if (activePopup === "specialisation") {
      setSelectedSpecialisation(data);
      setTestDetails((prevRows) =>
        prevRows.map((row) =>
          row.id === selectedRowId // Ensure you're updating the correct row
            ? {
                ...row,
                specialisation: data.specialisationName,
                specialisationId: data.specialisationId, // Add the ID
              }
            : row
        )
      );

      try {
        const response = await axios.get(
          `${API_BASE_URL}/doctors/specialization/${data.specialisationId}`
        );
        setDoctor(response.data);
        console.log(response.data + "kkkkkkkkkkkkk");
        setTestDetails((prevRows) =>
          prevRows.map((row) =>
            row.id === data.rowId
              ? {
                  ...row,
                  doctor:
                    response.data.length > 0 ? response.data[0].doctorName : "", // Set first doctor's name or empty
                }
              : row
          )
        );
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    } else if (activePopup === "doctor") {
      setTestDetails((prevRows) =>
        prevRows.map((row) =>
          row.id === selectedRowId
            ? {
                ...row,
                doctor: data.doctorName,
                doctorId: data.doctorId, // Add this
              }
            : row
        )
      );
    }
    if (activePopup === "organisation") {
      setSelectOrganisation(data);

      // Update the organization name in the corresponding row
      setOrganizations((prevOrganizations) =>
        prevOrganizations.map((org) =>
          org.id === selectedRowId ? { ...org, name: data.name || "" } : org
        )
      );
    }

    setActivePopup(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      packageId: "",
      packageName: packageName,
      packageCode: packageCode,
      companyPackageName: companyPackageName,
      companyPackageCode: companyPackageCode,
      duration: duration,
      selectedOrganisationOnly: organisationDetails,
      packageType: packageType,
      status: status,
      total_cost: totalRate,
      pkgactcost: totalRate,
      testDetailsDTO: testDetails.map((detail) => ({
        testId: detail.id,
        testRate: parseFloat(detail.testRate) || 0,
        actualRate: parseFloat(detail.actRate) || 0,
        status: status,
        remark: detail.remarks,
        serviceDetailsDTO: {
          serviceDetailsId: detail.serviceDetailsId,
        },
        specialisationDTO: {
          specialisationId: detail.specialisationId,
        },
        doctorDTO: {
          doctorId: detail.doctorId,
        },
      })),
      packageRates: paytypes.map((rate) => ({
        id: rate.id,
        rate: parseFloat(rate.rate) || 0,
        discount: parseFloat(rate.discount) || 0,
        disAmount: parseFloat(rate.discAmt) || 0,
        actDiscountPercentage: parseFloat(rate.actDiscPer) || 0,
        payTypeDTO: {
          id: rate.id,
        },
      })),
      organisationMasterDTOS: {
        masterId: selectOrganisation?.masterId,
      },
    };
    console.log(JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(`${API_BASE_URL}/dg-packages`, payload);
      console.log("Data saved successfully:", response.data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error.response || error.message);
      alert("Failed to save data. Please try again.");
    }
  };

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/service-details/sorted-map`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch service details");
      }
      const data = await response.json();
      setServiceDetails(data);
    } catch (error) {
      console.error("Error fetching service details:", error);
      setError(error.message);
    }
  };
  const fetchSpecialisation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/specialisations`);
      if (!response.ok) {
        throw new Error("Failed to fetch specializations");
      }
      const data = await response.json();
      setSpecialisation(data);
    } catch (error) {
      console.error("Failed to fetch specializations", error);
      setError(error.message);
    }
  };
  const fetchOrganization = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/organisation-masters`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch organization. Status: ${response.status}`
        );

        

      }
      const data = await response.json();
      setOrganisation(data);
      
    } catch (error) {
      console.error("Error fetching organization data:", error.message);
    }
  };
  useEffect(() => {
    const fetchAllPaytypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/pay-type`);
        setPaytypes(response.data);
      } catch (error) {
        console.error("Error fetching paytypes:", error);
      }
    };
    fetchAllPaytypes();
    fetchServiceDetails();
    fetchSpecialisation();
    fetchOrganization();
  }, []);
  const handleDoctorFessChange = (e, index) => {
    const { name, value } = e.target;

    setPaytypes((prevPaytypes) => {
      return prevPaytypes.map((row, idx) => {
        if (idx === index) {
          const updatedRow = { ...row };
          updatedRow[name] = value;

          if (name === "rate") {
            const rate = parseFloat(value) || 0;
            const totalRateValue = parseFloat(totalRate) || 0;
            const discountAmount = (totalRateValue - rate).toFixed(2);
            const discountPercentage = (
              ((totalRateValue - rate) / totalRateValue) *
              100
            ).toFixed(2);
            updatedRow.discAmt = discountAmount;
            updatedRow.discount = discountPercentage;
            updatedRow.actDiscPer = discountPercentage;
          }
          return updatedRow;
        }
        return row;
      });
    });
  };

  useEffect(() => {
    const total = testDetails.reduce(
      (acc, row) => acc + (parseFloat(row.testRate) || 0),
      0
    );
    setTotalRate(total);
  }, [testDetails]);

  const totalDiscountedRate = paytypes.reduce(
    (total, row) =>
      total + (parseFloat(row.rate) || 0) - (parseFloat(row.discAmt) || 0),
    0
  );

  return (
    <div className="dgpkg-container">
      <h2 className="dgpkg-title">DG Master</h2>
      <form className="dgpkg-form">
        <div className="dgpkg-field">
          <label className="dgpkg-label" htmlFor="packageName">
            Package Name*
          </label>
          <input
            type="text"
            id="packageName"
            className="dgpkg-input"
            placeholder="Enter package name"
            onChange={(e) => setPackageName(e.target.value)}
            required
          />
        </div>
        <div className="dgpkg-field">
          <label className="dgpkg-label" htmlFor="packageCode">
            Package Code
          </label>
          <input
            type="text"
            id="packageCode"
            className="dgpkg-input"
            placeholder="Enter package code"
            onChange={(e) => setPackageCode(e.target.value)}
          />
        </div>
        <div className="dgpkg-field">
          <label className="dgpkg-label" htmlFor="companyName">
            Company Package Name
          </label>
          <input
            type="text"
            id="companyName"
            className="dgpkg-input"
            placeholder="Enter company name"
            onChange={(e) => setCompanyPackageName(e.target.value)}
          />
        </div>
        <div className="dgpkg-field">
          <label className="dgpkg-label" htmlFor="companyCode">
            Company Package Code
          </label>
          <input
            type="text"
            id="companyCode"
            className="dgpkg-input"
            placeholder="Enter company code"
            onChange={(e) => setCompanyPackageCode(e.target.value)}
          />
        </div>
        <div className="dgpkg-field">
          <label className="dgpkg-label" htmlFor="duration">
            Duration
          </label>
          <input
            type="number"
            id="duration"
            className="dgpkg-input"
            placeholder="Package duration"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="dgpkg-field">
          <label className="dgpkg-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="dgpkg-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="dgpkg-field">
          <label className="dgpkg-label">For Selected Organisation Only</label>
          <input
            type="checkbox"
            className="dgpkg-checkbox"
            onChange={(e) =>
              setOrganisationDetails(e.target.checked ? "Yes" : "No")
            }
          />
        </div>

        <div className="dgpkg-field">
          <label className="dgpkg-label" htmlFor="packageType">
            Package Type
          </label>
          <select
            id="packageType"
            className="dgpkg-select"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
          >
            <option value="">Select Package Type</option>
            <option value="HEALTH PACKAGE">HEALTH PACKAGE</option>
            <option value="Day Care">Day Care</option>
            <option value="OPD Package">OPD Package</option>
          </select>
        </div>
        {packageType === "HEALTH PACKAGE" && (
          <>
            <div className="dgpkg-field">
              <label className="dgpkg-label" htmlFor="fromDate">
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                className="dgpkg-input"
                defaultValue="2024-12-26"
              />
            </div>
            <div className="dgpkg-field">
              <label className="dgpkg-label" htmlFor="toDate">
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                className="dgpkg-input"
                defaultValue="2024-12-26"
              />
            </div>
          </>
        )}
        <div className="dgpkg-field">
          <label className="dgpkg-label">Fill All Organisations</label>
          <input type="checkbox" className="dgpkg-checkbox" />
        </div>
      </form>
      <div className="dgpkg-table-container">
        <h3>Test Details</h3>
        <table className="dgpkg-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Test Name",
                "Test Rate",
                "Specialisation",
                "Doctor",
                "ActRate",
                "Remarks",
                "Add/Del Row",
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
            {testDetails.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    type="text"
                    value={row.testName}
                    onChange={(e) =>
                      updateRowValue(
                        setTestDetails,
                        row.id,
                        "testName",
                        e.target.value
                      )
                    }
                    placeholder="Test Name"
                    className="table-input-dg"
                  />
                  <FaSearch
                    className="dg-search-icon"
                    onClick={() => setActivePopup("services")}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.testRate}
                    onChange={(e) =>
                      updateRowValue(
                        setTestDetails,
                        row.id,
                        "testRate",
                        e.target.value
                      )
                    }
                    placeholder="Test Rate"
                    className="table-input-dg"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.specialisation}
                    onChange={(e) =>
                      updateRowValue(
                        setSelectedSpecialisation,
                        row.id,
                        "specialisation",
                        e.target.value
                      )
                    }
                    placeholder="Specialisation"
                    className="table-input-dg"
                  />
                  <FaSearch
                    className="dg-search-icon"
                    onClick={() => {
                      setActivePopup("specialisation");
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.doctor || ""}
                    onChange={(e) =>
                      updateRowValue(
                        setDoctor,
                        row.id,
                        "doctor",
                        e.target.value
                      )
                    }
                    placeholder="Doctor"
                    className="table-input-dg"
                    readOnly
                  />
                  <FaSearch
                    className="dg-search-icon"
                    onClick={() => {
                      setSelectedRowId(row.id); // Track the row being edited
                      setActivePopup("doctor");
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.testRate}
                    onChange={(e) =>
                      updateRowValue(
                        setTestDetails,
                        row.id,
                        "actRate",
                        e.target.value
                      )
                    }
                    placeholder="ActRate"
                    className="table-input-dg"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.remarks}
                    onChange={(e) =>
                      updateRowValue(
                        setTestDetails,
                        row.id,
                        "remarks",
                        e.target.value
                      )
                    }
                    placeholder="Remarks"
                    className="table-input-dg"
                  />
                </td>
                <td>
                  <button
                    className="dgpkg-button"
                    onClick={() => handleAddRow(setTestDetails)}
                  >
                    Add
                  </button>
                  <button
                    className="dgpkg-button"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dgpkg-table-container">
        <h3>Organizations</h3>
        <table className="dgpkg-table">
          <thead>
            <tr>
              {[
                "SN",
                "Organisation Name",
                "Type",
                // "Add/Del Row"
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
            {organizations.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    type="text"
                    value={row.name || ""}
                    onChange={(e) =>
                      updateRowValue(
                        setOrganizations,
                        row.id,
                        "orgName",
                        e.target.value
                      )
                    }
                    placeholder="Organization Name"
                    className="table-input-dg"
                    readOnly
                  />
                  <FaSearch
                    className="dg-search-icon"
                    onClick={() => {
                      setSelectedRowId(row.id); // Track the row being edited
                      setActivePopup("organisation"); // Open the popup to select an organization
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.type || ""}
                    onChange={(e) =>
                      updateRowValue(
                        setOrganizations,
                        row.id,
                        "type",
                        e.target.value
                      )
                    }
                    placeholder="Type"
                    className="table-input-dg"
                    readOnly
                  />
                </td>
                {/* <td>
                  <button
                    className="dgpkg-button"
                    type="button"
                    onClick={() =>
                      handleAddRow(setOrganizations, { orgName: "", type: "" })
                    }
                  >
                    Add
                  </button>
                  <button
                    className="dgpkg-button"
                    type="button"
                    onClick={() => handleorgDeleteRow(setOrganizations, row.id)}
                  >
                    Del
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="dgpkg-total">
          <label htmlFor="">Total Rate:</label>
          <input type="text" value={totalRate} readOnly />
        </div>
      </div>
      <div className="dgpkg-table-container">
        <h3>Package Rates</h3>
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "S.NO",
                "Paytype",
                "Rate",
                "Discount (%)",
                "Disc Amt",
                "Act DiscPer",
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
            {paytypes.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.payTypeName}</td>
                <td>
                  <input
                    type="text"
                    name="rate"
                    value={row.rate}
                    onChange={(e) => handleDoctorFessChange(e, index)}
                    className="table-input-dg"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="discount"
                    value={row.discount}
                    onChange={(e) =>
                      updateRowValue(
                        setPackageRates,
                        row.id,
                        "discount",
                        e.target.value
                      )
                    }
                    className="table-input-dg"
                    readOnly // Calculated dynamically
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="discAmt"
                    value={row.discAmt}
                    onChange={(e) =>
                      updateRowValue(
                        setPackageRates,
                        row.id,
                        "discAmt",
                        e.target.value
                      )
                    }
                    className="table-input-dg"
                    readOnly // Calculated dynamically
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="actDiscPer"
                    value={row.actDiscPer}
                    onChange={(e) =>
                      updateRowValue(
                        setPackageRates,
                        row.id,
                        "actDiscPer",
                        e.target.value
                      )
                    }
                    className="table-input-dg"
                    readOnly // Same as Discount (%)
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dgpkg-field dgpkg-full-width">
        <button type="submit" className="dgpkg-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {activePopup && (
        <IpMasterPopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
}
export default Dgmaster;
