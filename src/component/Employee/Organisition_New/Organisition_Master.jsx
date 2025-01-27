import React, { useState, useRef, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import "./Organisition_Master.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { CiSearch } from "react-icons/ci";
import PopupTable from "../../Admission/PopupTable";
import axios from "axios";

const Organisition_Master = () => {
  const [selectedTab, setSelectedTab] = useState("otherGrid");
  const [columnWidths, setColumnWidths] = useState({});
  const [activePopup, setActivePopup] = useState(null);
  const [cities, setcities] = useState([]);
  const [states, setState] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [payModes, setPayModes] = useState([]);
  const [discountPolicies, setDiscountPolicies] = useState([]);
  const [allPaytype, setAllPaytype] = useState([]);
  const [locations, setLocations] = useState([]);
  const cityHeading = ["city", "cityId"];
  const stateHeading = ["stateName", "statesId"];
  const districtHeading = ["DistrictName", "DistrictCode"];
  const payModeHeading = ["PayModeName", "PayModeCode"];
  const discountPolicyHeading = ["PolicyName", "DiscountPercentage"];
  const locationHeading = ["locationName", "locationAddress", "id"];
  const [payMode, setPayMode] = useState("");

  const tableRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    state: "",
    phoneNumber1: "",
    phoneNumber2: "",
    mobileNumber: "",
    email: "",
    faxNumber: "",
    pinCode: "",
    mouStartDate: "",
    mouEndDate: "",
    validityForPatient: "",
    opdConsDocFees: "",
    regiCharNotApplicable: "",
    creditType: "",
    orgSaleType: "",
    accEntry: "",
    insurance: "",
    contactPerson: "",
    discountPolicy: "",
    organisationCode: "",
    organisationCategory: "",
    employeemandatory: "",
    classification: "",
    organisationClassificationDTO: {},
    orgGrdDetailsDTO: {
      contactDetails: "",
      particular: "",
      details: "",
    },
    locationMasterDTO: {
      id: "",
    },
    gstnumber: "",
  });
  const [locationTableRows, setlocationTableRows] = useState([
    {
      sn: 1,
      locationName: "",
    },
  ]);

  const [otherGridTableRows, setotherGridTableRows] = useState([
    {
      sn: 1,
      contactDetails: "",
      particular: "",
      details: "",
    },
  ]);


  const [doctorFeeTableRowsableRows, setDoctorFeeTableRowsableRows] = useState(
    allPaytype?.map((paytype) => ({
      payTypeName: paytype.payTypeName,
      paytypeId: paytype.id,
      morningFirstVisit: "",
      morningFirstVisitToDoctor: "",
      morningSubVisit: "",
      morningSubVisitToDoctor: "",
      morningEmergency: "",
      morningEmergencyToDoctor: "",
      eveningFirstVisit: "",
      eveningFirstVisitToDoctor: "",
      eveningSubVisit: "",
      eveningSubVisitToDoctor: "",
      eveningEmergency: "",
      eveningEmergencyToDoctor: "",
      referralVisit: "",
      referralVisitToDoctor: "",
      generalOpdFee: "",
    }))
  );

  useEffect(() => {
    if (allPaytype.length > 0) {
      setDoctorFeeTableRowsableRows(
        allPaytype.map((paytype) => ({
          payTypeName: paytype.payTypeName,
          // opdCategory: paytype.opdCategory,
          paytypeId: paytype.id,
          morningFirstVisit: "",
          morningFirstVisitToDoctor: "",
          morningSubVisit: "",
          morningSubVisitToDoctor: "",
          morningEmergency: "",
          morningEmergencyToDoctor: "",
          eveningFirstVisit: "",
          eveningFirstVisitToDoctor: "",
          eveningSubVisit: "",
          eveningSubVisitToDoctor: "",
          eveningEmergency: "",
          eveningEmergencyToDoctor: "",
          referralVisit: "",
          referralVisitToDoctor: "",
          generalOpdFee: "",
        }))
      );
    }
  }, [allPaytype]);

  const fetchAllPaytype = async () => {
    const response = await axios.get(`${API_BASE_URL}/pay-type`);
    setAllPaytype(response.data);
  };

  const handleAddRow = (tableType) => {
    if (tableType === "location") {
      const newRow = {
        sn: locationTableRows.length + 1,
        locationName: "",
      };
      setlocationTableRows([...locationTableRows, newRow]);
    } else if (tableType === "otherGrid") {
      const newRow = {
        sn: otherGridTableRows.length + 1,
        contactDetails: "",
        particular: "",
        details: "",
      };
      setotherGridTableRows([...otherGridTableRows, newRow]);
    }
  };

  const handleDeleteRow = (tableType, indexToRemove) => {
    if (tableType === "location") {
      const updatedRows = locationTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setlocationTableRows(renumberedRows);
    } else if (tableType === "otherGrid") {
      const updatedRows = otherGridTableRows.filter(
        (_, index) => index !== indexToRemove
      );
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1,
      }));
      setotherGridTableRows(renumberedRows);
    }
  };

  const handlePopupClose = () => {
    setActivePopup(null);
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cities`);
      const data = await response.json();
      console.log("API Response:", data);
      const cities = data.map((item) => ({
        cityId: item.cityId,
        city: item.cityName,
        state: item.statesDTO.stateName,
        pinCode: item.areaPinCode,
      }));
      setcities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchLocation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/location-masters`);
      const data = await response.json();
      console.log("API Response:", data);
      const states = data.map((item) => ({
        locationName: item.locationName,
        locationAddress: item.locationAddress,
        id: item.id,
      }));
      setLocations(states);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleSave = async () => {
    try {
      // Prepare the final formData including the doctor fee data (single object format)
      const finalFormData = {
        ...formData, // Existing form data
        orgDoctorFeeDTO: doctorFeeTableRowsableRows.map((row) => ({
          payType: {
            id: row.paytypeId,
          },
          morningFirstVisit: row.morningFirstVisit,
          morningFirstVisitToDoctor: row.morningFirstVisitToDoctor,
          morningSubVisit: row.morningSubVisit,
          morningSubVisitToDoctor: row.morningSubVisitToDoctor,
          morningEmergency: row.morningEmergency,
          morningEmergencyToDoctor: row.morningEmergencyToDoctor,
          eveningFirstVisit: row.eveningFirstVisit,
          eveningFirstVisitToDoctor: row.eveningFirstVisitToDoctor,
          eveningSubVisit: row.eveningSubVisit,
          eveningSubVisitToDoctor: row.eveningSubVisitToDoctor,
          eveningEmergency: row.eveningEmergency,
          eveningEmergencyToDoctor: row.eveningEmergencyToDoctor,

        })),
      };
      console.log("Final form data to be posted:", finalFormData);

      // Post the formData to the API
      const response = await axios.post(
        "http://192.168.1.62:1415/api/organisation-masters",
        finalFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check the response status
      if (response.status === 200 || response.status === 201) {
        // Handle success
        console.log("API Response:", response.data);
        alert("Data saved successfully!");
      } else {
        // Handle unexpected status codes
        console.error("Unexpected response status:", response.status);
        alert("Failed to save data. Please try again.");
      }
    } catch (error) {
      // Handle error from API call
      console.error("Error posting data:", error);
      alert("Error posting data. Please check the console for details.");
    }
  };




  useEffect(() => {
    fetchCities();
    fetchAllPaytype();
    fetchLocation();
  }, []);

  const handlePopupSelection = (selectedData) => {
    if (activePopup === "City") {
      // Autofill city, district, and state when city is selected
      setFormData((prevData) => ({
        ...prevData,
        city: selectedData.city,
        state: selectedData.state,
        pinCode: selectedData.pinCode,
      }));
    } else if (activePopup === "PayMode") {
      setFormData((prevData) => ({
        ...prevData,
        payMode: selectedData.PayModeName,
      }));
    } else if (activePopup === "DiscountPolicy") {
      setFormData((prevData) => ({
        ...prevData,
        discountPolicy: selectedData.PolicyName,
      }));
    } else if (activePopup === "Location") {

      setFormData((prevData) => ({
        ...prevData,
        // locationName:selectedData.locationName,
        locationMasterDTO: {
          id: selectedData.id,
        },

      }));

    }
    handlePopupClose();
  };

  const getPopupData = () => {
    if (activePopup === "City") {
      return { columns: cityHeading, data: cities };
    } else if (activePopup === "District") {
      return { columns: districtHeading, data: districts };
    } else if (activePopup === "State") {
      return { columns: stateHeading, data: states };
    } else if (activePopup === "PayMode") {
      return { columns: payModeHeading, data: payModes };
    } else if (activePopup === "DiscountPolicy") {
      return { columns: discountPolicyHeading, data: discountPolicies };
    } else if (activePopup === "Location") {
      return { columns: locationHeading, data: locations };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();
  const handlePayModeChange = (e) => {
    setPayMode(e.target.value);
  };
  const handleDoctorFessChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...doctorFeeTableRowsableRows];
    updatedRows[index][name] = value; //
    setDoctorFeeTableRowsableRows(updatedRows);
  };

  const renderTable = () => {
    switch (selectedTab) {
      case "location":
        return (
          <div className="Organisition_Master-location-table">
            <table ref={tableRef} border="1">
              <thead>
                <tr>
                  {["Actions", "SN", "Location Name"].map((header, index) => (
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
                {locationTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="Organisition_Master-add-btn"
                          onClick={() => handleAddRow("location")}
                        >
                          Add
                        </button>
                        <button
                          className="Organisition_Master-del-btn"
                          onClick={() => handleDeleteRow("location", index)}
                          disabled={locationTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>
                      {formData.locationName}
                      <CiSearch onClick={() => setActivePopup("Location")} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "orgDoctor":
        return (
          <div className="Organisition_Master-orgDoctor-table">
            <table ref={tableRef} border={1}>
              <thead>
                <tr>
                  {[
                    "SN",
                    "payType",
                    "Opd Charges Allow",
                    "Morning First Visit",
                    "Morning First Visit (ToDoctor)",
                    "Morning Sub Visit",
                    "Morning Sub Visit(ToDoctor)",
                    "Morning Emergency",
                    "Morning Emergency(ToDoctor)",
                    "Evening First Visit",
                    "Evening First Visit(ToDoctor)",
                    "Evening Sub Visit",
                    "Evening Sub Visit(ToDoctor)",
                    "Evening Emergency",
                    "Evening Emergency(ToDoctor)",

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
                {doctorFeeTableRowsableRows?.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.payTypeName}</td>
                    <td>{row.opdCategory}</td>
                    <td>
                      <input
                        type="text"
                        name="morningFirstVisit"
                        value={formData.morningFirstVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="morningFirstVisitToDoctor"
                        value={row.morningFirstVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="morningSubVisit"
                        value={row.morningSubVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="morningSubVisitToDoctor"
                        value={row.morningSubVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="morningEmergency"
                        value={row.morningEmergency}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="morningEmergencyToDoctor"
                        value={row.morningEmergencyToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="eveningFirstVisit"
                        value={row.eveningFirstVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="eveningFirstVisitToDoctor"
                        value={row.eveningFirstVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="eveningSubVisit"
                        value={row.eveningSubVisit}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="eveningSubVisitToDoctor"
                        value={row.eveningSubVisitToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="eveningEmergency"
                        value={row.eveningEmergency}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="eveningEmergencyToDoctor"
                        value={row.eveningEmergencyToDoctor}
                        onChange={(e) => handleDoctorFessChange(e, index)}
                      />
                    </td>


                  </tr>
                ))}
              </tbody>
            </table>
            <div className="doctor-com-master-summary-section"></div>
          </div>
        );

      case "otherGrid":
        return (
          <div className="Organisition_Master-otherGrid-table">
            <table ref={tableRef} border="1">
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Contact Details",
                    "Particular",
                    "Details",
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
                {otherGridTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button
                          className="Organisition_Master-add-btn"
                          onClick={() => handleAddRow("otherGrid")}
                        >
                          Add
                        </button>
                        <button
                          className="Organisition_Master-del-btn"
                          onClick={() => handleDeleteRow("otherGrid", index)}
                          disabled={otherGridTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>
                      <select
                        value={formData.orgGrdDetailsDTO.contactDetails}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            orgGrdDetailsDTO: {
                              ...formData.orgGrdDetailsDTO, // Ensure other properties of orgGrdDetailsDTO are preserved
                              contactDetails: e.target.value,
                            },
                          });
                        }}
                      >
                        <option>select</option>
                        <option>Adhar Card</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="Organisition_Master-table-input"
                        value={formData.orgGrdDetailsDTO.particular}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            orgGrdDetailsDTO: {
                              ...formData.orgGrdDetailsDTO,
                              particular: e.target.value,
                            },
                          });
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="Organisition_Master-table-input"
                        value={formData.orgGrdDetailsDTO.details}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            orgGrdDetailsDTO: {
                              ...formData.orgGrdDetailsDTO,
                              details: e.target.value,
                            },
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="Organisition_Master-event">
      <div className="Organisition_Master-event-bar">
        <div className="Organisition_Master-event-header">
          <span>Organisation Master</span>
        </div>
      </div>
      <div className="Organisition_Master-content-wrapper">
        <div className="Organisition_Master-main-section">
          <div className="Organisition_Master-panel dis-templates">
            <div className="Organisition_Master-panel-header"></div>
            <div className="Organisition_Master-panel-content">
              <div className="Organisition_Master-form-row">
                <label>Classification:</label>
                <select value={formData.classification}
                  onChange={(e) =>
                    setFormData({ ...formData, classification: e.target.value })
                  }>
                  <option>select</option>
                  <option>TPA</option>
                  <option>Panel</option>
                  <option>Insurance</option>
                </select>
              </div>
              <div className="Organisition_Master-header-contact">
                <h3>Contact Details</h3>
              </div>
              <div className="Organisition_Master-form-row">
                <label>Name: *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="Organisition_Master-form-row">
                <label>Address: *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <label>City: *</label>
                <div className="Organisition_Master-input-with-search-icon">
                  <input
                    type="text"
                    value={formData.city}
                    name="city"
                    readOnly
                  />
                  <div className="Organisition_Master-magnifier-btn">
                    <CiSearch onClick={() => setActivePopup("City")} />
                  </div>
                </div>
              </div>
              <div className="Organisition_Master-form-row">
                <label>Pin Code: </label>
                <input type="text" value={formData.pinCode} name="pinCode" />
              </div>

              <div className="Organisition_Master-form-row">
                <label>State: *</label>
                <div className="Organisition_Master-input-with-search-icon">
                  <input type="text" value={formData.state} />
                  <div className="Organisition_Master-magnifier-btn">
                    <CiSearch onClick={() => setActivePopup("State")} />
                  </div>
                </div>
              </div>

              <div className="Organisition_Master-form-row">
                <label>Phone1: *</label>
                <input
                  type="tel"
                  value={formData.phoneNumber1}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber1: e.target.value })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <label>Phone2: </label>
                <input
                  type="tel"
                  value={formData.phoneNumber2}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber2: e.target.value })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <label>Mobile No: </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <label>Email ID: </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="Organisition_Master-panel operation-details">
            <div className="Organisition_Master-panel-header"></div>
            <div className="Organisition_Master-panel-content">
              <div className="Organisition_Master-form-row">
                <label>Fax Number: </label>
                <input
                  type="text"
                  value={formData.faxNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, faxNumber: e.target.value })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <label>MOU Start Date: </label>
                <input
                  type="date"
                  value={formData.mouStartDate}
                  onChange={(e) =>
                    setFormData({ ...formData, mouStartDate: e.target.value })
                  }
                />
              </div>
              <div className="Organisition_Master-form-row">
                <label>MOU End Date: </label>
                <input
                  type="date"
                  value={formData.mouEndDate}
                  onChange={(e) =>
                    setFormData({ ...formData, mouEndDate: e.target.value })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <input
                  type="checkbox"
                  checked={formData.validityForPatient}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      validityForPatient: e.target.checked,
                    })
                  }
                />
                <label> Apply Validity for Patient </label>
              </div>

              <div className="Organisition_Master-form-row">
                <label>OPD Cons Doc Fees from Org </label>
                <input
                  type="text"
                  value={formData.opdConsDocFees}
                  onChange={(e) =>
                    setFormData({ ...formData, opdConsDocFees: e.target.value })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <input
                  type="checkbox"
                  checked={formData.regiCharNotApplicable}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      regiCharNotApplicable: e.target.checked,
                    })
                  }
                />
                <label> Registration Charges Not Applicable </label>
              </div>
              <div className="Organisition_Master-form-row">
                <label>Credit Type:</label>
                <select
                  value={formData.creditType}
                  onChange={(e) =>
                    setFormData({ ...formData, creditType: e.target.value })
                  }
                >
                  <option>Cash</option>
                  <option>Both</option>
                  <option>OPD Only</option>
                  <option>IPD Only</option>
                </select>
              </div>

              <div className="Organisition_Master-form-row">
                <label>Org Sale type:</label>
                <select
                  value={formData.orgSaleType}
                  onChange={(e) =>
                    setFormData({ ...formData, orgSaleType: e.target.value })
                  }
                >
                  <option>Sale On MRP</option>
                  <option>Sale On Purchase Price</option>
                  <option>Sale Policy</option>
                </select>
              </div>

              <div className="Organisition_Master-form-row">
                <input
                  type="checkbox"
                  checked={formData.accEntry}
                  onChange={(e) =>
                    setFormData({ ...formData, accEntry: e.target.checked })
                  }
                />
                <label>Account Entry </label>
              </div>

              <div className="Organisition_Master-form-row">
                <input
                  type="checkbox"
                  checked={formData.insurance}
                  onChange={(e) =>
                    setFormData({ ...formData, insurance: e.target.checked })
                  }
                />
                <label> Insurance </label>
              </div>

              <div className="Organisition_Master-form-row">
                <label>Contact Person: </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="Organisition_Master-panel operation-details">
            <div className="Organisition_Master-panel-header"></div>
            <div className="Organisition_Master-panel-content">
              <div className="Organisition_Master-form-row">
                <label>Grant Adjustment PayMode: </label>
                <select value={payMode} onChange={handlePayModeChange}>
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="CreditCard">Credit Card</option>
                  <option value="Cheque">Cheque</option>
                  <option value="DebitCard">Debit Card</option>
                </select>
              </div>
              <div>
                {payMode === "CreditCard" && (
                  <div>
                    <div className="Organisition_Master-form-row">
                      <label>Credit Card No: </label>
                      <input type="text" placeholder="Enter Credit Card No" />
                    </div>
                    <div className="Organisition_Master-form-row">
                      <label>CSS No: </label>
                      <input type="text" placeholder="Enter CSS No" />
                    </div>
                    <div className="Organisition_Master-form-row">
                      <label>Expiry Date: </label>
                      <input type="date" />
                    </div>
                  </div>
                )}
              </div>

              <div className="Organisition_Master-form-row">
                <label>GST No:</label>
                <input
                  type="text"
                  value={formData.gstnumber}
                  onChange={(e) =>
                    setFormData({ ...formData, gstnumber: e.target.value })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <label>Discount policy: </label>
                <div className="Organisition_Master-input-with-search-icon">
                  <input
                    value={formData.discountPolicy}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountPolicy: e.target.value,
                      })
                    }
                  />
                  <div className="Organisition_Master-magnifier-btn">
                    <CiSearch
                      onClick={() => setActivePopup("DiscountPolicy")}
                    />
                  </div>
                </div>
              </div>

              <div className="Organisition_Master-form-row">
                <label>Organisation Code:</label>
                <input
                  type="text"
                  value={formData.organisationCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organisationCode: e.target.value,
                    })
                  }
                />
              </div>

              <div className="Organisition_Master-form-row">
                <label>Organisation Category:</label>
                <select
                  value={formData.organisationCategory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organisationCategory: e.target.value,
                    })
                  }
                >
                  <option>Sale On MRP</option>
                  <option>Sale On Purchase Price</option>
                  <option>Sale Policy</option>
                </select>
              </div>

              <div className="Organisition_Master-form-row">
                <input
                  type="checkbox"
                  checked={formData.employeemandatory}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employeemandatory: e.target.checked,
                    })
                  }
                />
                <label>Employee Details not mandatory</label>
              </div>
            </div>
          </div>
        </div>
        <div className="Organisition_Master-otherGrid-section">
          <div className="Organisition_Master-tab-bar">
            <button
              className={`Organisition_Master-tab ${selectedTab === "location" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("location")}
            >
              Loccation
            </button>

            <button
              className={`Organisition_Master-tab ${selectedTab === "orgDoctor" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("orgDoctor")}
            >
              Org Doctor Fee
            </button>
            <button
              className={`Organisition_Master-tab ${selectedTab === "otherGrid" ? "active" : ""
                }`}
              onClick={() => setSelectedTab("otherGrid")}
            >
              Other Grid Details
            </button>
          </div>
          {renderTable()}
        </div>

        <div className="Organisition_Master-action-buttons">
          <button className="btn-blue" onClick={handleSave}>
            Save
          </button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button>
          <button className="btn-gray">Close</button>
          {/* <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          <button className="btn-green">Print</button>
          <button className="btn-blue">Export</button>
          <button className="btn-gray">Import</button>
          <button className="btn-green">Health</button>
          <button className="btn-gray">Version Comparison</button>
          <button className="btn-gray">SDC</button>
          <button className="btn-gray">Testing</button>
          <button className="btn-blue">Info</button> */}
        </div>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={(selectedData) => handlePopupSelection(selectedData)}
          onClose={() => handlePopupClose(null)}
        />
      )}
    </div>
  );
};
export default Organisition_Master;
