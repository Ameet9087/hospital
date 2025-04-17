import React, { useState, useRef, useEffect } from "react";
import "./DgMasterPopup.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { API_BASE_URL } from "../../api/api";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
  PopupTable,
} from "../../../FloatingInputs";
function DgMasterPopup() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [activePopup, setActivePopup] = useState("");
  const [testDetailsColumnWidths, setTestDetailsColumnWidths] = useState({});
  const [organizationsColumnWidths, setOrganizationsColumnWidths] = useState(
    {}
  );
  const [packageRatesColumnWidths, setPackageRatesColumnWidths] = useState({});
  const testDetailsTableRef = useRef(null);
  const organizationsTableRef = useRef(null);
  const packageRatesTableRef = useRef(null);

  const [packageType, setPackageType] = useState("");
  const [packagefor, setPackagefor] = useState("");
  const [packageforipdopd, setpackageforipdopd] = useState("");
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
  const [forallorganisations, setforallorganisations] = useState("No");
  const [selectedOrganisationOnly, setselectedOrganisationOnly] =
    useState("No");
  const [totalRate, setTotalRate] = useState(0);
  const [companyPackageName, setCompanyPackageName] = useState("");
  const [companyPackageCode, setCompanyPackageCode] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [duration, setDuration] = useState();
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
    { id: 1, orgName: "", type: "", masterId: 0 },
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
  const handleDeleteRow = (rowId) => {
    if (testDetails.length === 1) {
      return;
    }
    setTestDetails((prevDetails) => {
      // First filter out the deleted row
      const filteredRows = prevDetails.filter((row) => row.id !== rowId);
      // Then update the IDs to match their new positions
      return filteredRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
    });
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/location-masters`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => console.error("Error fetching Locations:", error));
  }, []);

  const handleorgDeleteRow = (setter, id) => {
    if (organizations.length === 1) {
      return;
    }
    setter((prev) => {
      const filteredRows = prev.filter((row) => row.id !== id);
      return filteredRows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
    });
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
      return {
        columns: ["masterId", "name", "classification"],
        data: organisation,
      };
    } else if (activePopup === "Location") {
      return {
        columns: ["id", "locationName"],
        data: locations,
      };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  const handleSelect = async (data) => {
    if (activePopup === "services") {
      setSelectedService(data);

      // Update the specific row where the search icon was clicked
      setTestDetails((prevRows) =>
        prevRows.map((row) =>
          row.id === selectedRowId
            ? {
                ...row,
                testName: data.serviceName,
                actRate: data.rates || "",
                serviceDetailsId: data.serviceDetailsId,
              }
            : row
        )
      );

      // Update total rate
      const updatedTotalRate = testDetails.reduce(
        (sum, row) => sum + (parseFloat(row.testRate) || 0),
        0
      );
      setTotalRate(updatedTotalRate);
    } else if (activePopup === "specialisation") {
      setSelectedSpecialisation(data);
      setTestDetails((prevRows) =>
        prevRows.map((row) =>
          row.id === selectedRowId
            ? {
                ...row,
                specialisation: data.specialisationName,
                specialisationId: data.specialisationId,
                doctor: "",
                doctorId: "",
              }
            : row
        )
      );

      try {
        const response = await axios.get(
          `${API_BASE_URL}/doctors/specialization/${data.specialisationId}`
        );
        setDoctor(response.data);
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
                doctorId: data.doctorId,
              }
            : row
        )
      );
    } else if (activePopup === "organisation") {
      setSelectOrganisation(data);
      setOrganizations((prevOrganizations) =>
        prevOrganizations.map((org) =>
          org.id === selectedRowId
            ? {
                ...org,
                name: data.name || "",
                type: data.classification || "",
                masterId: data.masterId || 0, // Ensure masterId is assigned
              }
            : org
        )
      );
    } else if (activePopup === "Location") {
      setSelectedLocation(data);
    }

    setActivePopup(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      packageName: packageName,
      packageCode: packageCode,
      companyPackageName: companyPackageName,
      companyPackageCode: companyPackageCode,
      duration: duration,
      selectedOrganisationOnly: selectedOrganisationOnly,
      forallorganisations: forallorganisations,
      fromDate: fromDate,
      toDate: toDate,
      packageType: packageType,
      packagefor: packagefor,
      packageforipdopd: packageforipdopd,
      status: status,
      total_cost: totalRate,
      pkgactcost: totalRate,
      locationMasterDTO: {
        id: selectedLocation?.id,
      },
      testDetailsDTO: testDetails.map((detail) => ({
        testId: detail.id,
        testRate: parseFloat(detail.testRate) || 0,
        actualRate: parseFloat(detail.actRate) || 0,
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
      organisationMasterDTOS: organizations
        .filter((org) => org.masterId)
        .map((org) => ({
          masterId: org.masterId,
        })),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/dg-packages`, payload);
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

          const totalRateValue = parseFloat(totalRate) || 0;

          if (name === "discount") {
            // Calculate based on discount percentage
            const discountPercentage = parseFloat(value) || 0;
            const discountAmount = (totalRateValue * discountPercentage) / 100;
            const rate = totalRateValue - discountAmount;

            updatedRow.rate = rate.toFixed(2);
            updatedRow.discAmt = discountAmount.toFixed(2);
            updatedRow.actDiscPer = discountPercentage.toFixed(2);
          } else if (name === "rate") {
            // Calculate based on rate
            const rate = parseFloat(value) || 0;
            const discountAmount = (totalRateValue - rate).toFixed(2);
            const discountPercentage = (
              ((totalRateValue - rate) / totalRateValue) *
              100
            ).toFixed(2);

            updatedRow.discAmt = discountAmount;
            updatedRow.discount = discountPercentage;
            updatedRow.actDiscPer = discountPercentage;
          } else if (name === "discAmt") {
            // Calculate based on discount amount
            const discountAmount = parseFloat(value) || 0;
            const rate = totalRateValue - discountAmount;
            const discountPercentage = (
              (discountAmount / totalRateValue) *
              100
            ).toFixed(2);

            updatedRow.rate = rate.toFixed(2);
            updatedRow.discount = discountPercentage;
            updatedRow.actDiscPer = discountPercentage;
          } else if (name === "actDiscPer") {
            // Calculate based on actual discount percentage
            const discountPercentage = parseFloat(value) || 0;
            const discountAmount = (totalRateValue * discountPercentage) / 100;
            const rate = totalRateValue - discountAmount;

            updatedRow.rate = rate.toFixed(2);
            updatedRow.discAmt = discountAmount.toFixed(2);
            updatedRow.discount = discountPercentage.toFixed(2);
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
    <div className="dgpkg-EditAndDelete-container">
      <div className="dgpkg-EditAndDelete-section">
        <div className="dgpkg-EditAndDelete-header">DG Package</div>
        <div className="dgpkg-EditAndDelete-grid">
          <FloatingInput
            label="Package Name*"
            type="text"
            id="packageName"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
          />
          <FloatingInput
            label="Package Code"
            type="text"
            id="packageCode"
            value={packageCode}
            onChange={(e) => setPackageCode(e.target.value)}
          />
          <FloatingInput
            label="Company Package Name"
            type="text"
            id="companyName"
            value={companyPackageName}
            onChange={(e) => setCompanyPackageName(e.target.value)}
          />
          <FloatingInput
            label="Company Package Code"
            type="text"
            id="companyCode"
            value={companyPackageCode}
            onChange={(e) => setCompanyPackageCode(e.target.value)}
          />
          <FloatingInput
            label="Duration"
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <FloatingSelect
            label="Status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" },
            ]}
          />

          <FloatingSelect
            label="Package Type"
            id="packageType"
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            options={[
              { value: "HEALTH PACKAGE", label: "HEALTH PACKAGE" },
              { value: "Day Care", label: "Day Care" },
              { value: "OPD Package", label: "OPD Package" },
            ]}
          />
          <FloatingSelect
            label="Package For"
            id="packagefor"
            value={packagefor}
            onChange={(e) => setPackagefor(e.target.value)}
            options={[
              { value: "Both", label: "Both" },
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
          />
          <FloatingSelect
            label="IPD/OPD"
            id="packageforipdopd"
            value={packageforipdopd}
            onChange={(e) => setpackageforipdopd(e.target.value)}
            options={[
              { value: "Both", label: "Both" },
              { value: "IPD", label: "IPD" },
              { value: "OPD", label: "OPD" },
            ]}
          />
          <FloatingInput
            label="From Date"
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setfromDate(e.target.value)}
          />
          <FloatingInput
            label="To Date"
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => settoDate(e.target.value)}
          />
          <div className="dg-package-form-row-chechbox">
            <input
              type="checkbox"
              id="selectedOrganisationOnly"
              checked={selectedOrganisationOnly === "Yes"}
              onChange={(e) => {
                if (e.target.checked) {
                  setselectedOrganisationOnly("Yes");
                  setforallorganisations("No");
                } else {
                  setselectedOrganisationOnly("No");
                }
              }}
            />
            <label
              htmlFor="selectedOrganisationOnly"
              className="dg-package-checkbox-label"
            >
              For Selected Organisation Only
            </label>
          </div>

          <div className="dg-package-form-row-chechbox">
            <input
              type="checkbox"
              id="forallorganisations"
              checked={forallorganisations === "Yes"}
              onChange={(e) => {
                if (e.target.checked) {
                  setforallorganisations("Yes");
                  setselectedOrganisationOnly("No"); // Uncheck "For Selected Organisation Only"
                } else {
                  setforallorganisations("No");
                }
              }}
            />
            <label
              htmlFor="forallorganisations"
              className="dg-package-checkbox-label"
            >
              For All Organisations
            </label>
          </div>
          <div className="dgpkg-input-with-icon">
            <FloatingInput
              label="Location"
              value={selectedLocation?.locationName}
            />
            <div className="dgpkg-magnifier-btn">
              <CiSearch onClick={() => setActivePopup("Location")} />
            </div>
          </div>
        </div>
        <div className="dgpkg-EditAndDelete-section">
          <div className="dgpkg-EditAndDelete-header">Test Details</div>
          <table className="dgpkg-table" ref={testDetailsTableRef}>
            <thead>
              <tr>
                {[
                  "SN",
                  "Test Name",
                  "Test Rate",
                  "Specialisation",
                  "Doctor",
                  "Act Rate",
                  "Remarks",
                  "Add/Del Row",
                ].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: testDetailsColumnWidths[index] }}
                    className="resizable-th"
                  >
                    <div className="header-content">
                      <span>{header}</span>
                      <div
                        className="resizer"
                        onMouseDown={startResizing(
                          testDetailsTableRef,
                          setTestDetailsColumnWidths
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
                    <div className="dg-package-input-with-icon">
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
                        onClick={() => {
                          setSelectedRowId(row.id); // Set the selected row ID
                          setActivePopup("services"); // Open the services popup
                        }}
                      />
                    </div>
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
                    <div className="dg-package-input-with-icon">
                      <input
                        type="text"
                        value={row.specialisation || ""}
                        onChange={(e) =>
                          updateRowValue(
                            setTestDetails,
                            row.id,
                            "specialisation",
                            e.target.value
                          )
                        }
                        placeholder="Specialisation"
                        className="table-input-dg"
                        readOnly
                      />
                      <FaSearch
                        className="dg-search-icon"
                        onClick={() => {
                          setSelectedRowId(row.id);
                          setActivePopup("specialisation");
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="dg-package-input-with-icon">
                      <input
                        type="text"
                        value={row.doctor || ""}
                        onChange={(e) =>
                          updateRowValue(
                            setTestDetails,
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
                          setSelectedRowId(row.id);
                          setActivePopup("doctor");
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.actRate || ""}
                      onChange={(e) =>
                        updateRowValue(
                          setTestDetails,
                          row.id,
                          "actRate",
                          e.target.value
                        )
                      }
                      placeholder="Actual Rate"
                      className="table-input-dg"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.remarks || ""}
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
                      className="dg-package-add-btn"
                      onClick={() => handleAddRow(setTestDetails)}
                    >
                      Add
                    </button>
                    <button
                      className="dg-package-del-btn"
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className="dgpkg-EditAndDelete-grid">
              <FloatingInput
                label="Total Rate"
                type="number"
                value={totalRate}
                onChange={(e) => settoDate(e.target.value)}
                readOnly
              />
            </div>
          </div>
        </div>
        {selectedOrganisationOnly === "Yes" && (
          <div className="dgpkg-EditAndDelete-section">
            <div className="dgpkg-EditAndDelete-header">Organizations</div>
            <table className="dgpkg-table" ref={organizationsTableRef}>
              <thead>
                <tr>
                  {["SN", "Organisation Name", "Type", "Add/Del Row"].map(
                    (header, index) => (
                      <th
                        key={index}
                        style={{ width: organizationsColumnWidths[index] }}
                        className="resizable-th"
                      >
                        <div className="header-content">
                          <span>{header}</span>
                          <div
                            className="resizer"
                            onMouseDown={startResizing(
                              organizationsTableRef,
                              setOrganizationsColumnWidths
                            )(index)}
                          ></div>
                        </div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {organizations.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      <div className="dg-package-input-with-icon">
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
                      </div>
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
                      />
                    </td>
                    <td>
                      <button
                        className="Organisition_Master-add-btn"
                        type="button"
                        onClick={() =>
                          handleAddRow(setOrganizations, {
                            orgName: "",
                            type: "",
                          })
                        }
                      >
                        Add
                      </button>
                      <button
                        className="Organisition_Master-del-btn"
                        type="button"
                        onClick={() =>
                          handleorgDeleteRow(setOrganizations, row.id)
                        }
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="dgpkg-EditAndDelete-section">
          <div className="dgpkg-EditAndDelete-header">Package Rates</div>
          <table ref={packageRatesTableRef}>
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
                    style={{ width: packageRatesColumnWidths[index] }}
                    className="resizable-th"
                  >
                    <div className="header-content">
                      <span>{header}</span>
                      <div
                        className="resizer"
                        onMouseDown={startResizing(
                          packageRatesTableRef,
                          setPackageRatesColumnWidths
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
                      onChange={(e) => handleDoctorFessChange(e, index)}
                      className="table-input-dg"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="discAmt"
                      value={row.discAmt}
                      onChange={(e) => handleDoctorFessChange(e, index)}
                      className="table-input-dg"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="actDiscPer"
                      value={row.actDiscPer}
                      onChange={(e) => handleDoctorFessChange(e, index)}
                      className="table-input-dg"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <div className="dg-package-action-buttons">
        <button className="dg-package-btn-blue" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
export default DgMasterPopup;
