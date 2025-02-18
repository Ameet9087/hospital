import React, { useState, useRef, useEffect } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import "./OrganisitionMasterPopup.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../api/api";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";
import { PopupTable } from "../../../FloatingInputs";

const OrganisitionMasterPopup = () => {
  const [selectedTab, setSelectedTab] = useState("location");
  const [columnWidths, setColumnWidths] = useState({});
  const [activePopup, setActivePopup] = useState(null);
  const [cities, setcities] = useState([]);
  const [states, setState] = useState([]);
  const [districts, setDistrict] = useState([]);
  const [payModes, setPayModes] = useState([]);
  const [discountPolicies, setDiscountPolicies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedlocation, setselectedlocation] = useState([]);
  const cityHeading = ["cityId", "city"];
  const stateHeading = ["stateId", "stateName"];
  const districtHeading = ["DistrictName", "DistrictCode"];
  const payModeHeading = ["PayModeName", "PayModeCode"];
  const discountPolicyHeading = ["PolicyName", "DiscountPercentage"];
  const locationHeading = ["locationName", "locationAddress", "id"];
  const [payMode, setPayMode] = useState("");

  const tableRef = useRef(null);
  const [locationTableRows, setlocationTableRows] = useState([
    {
      sn: 1,
      locationName: "",
      locationId: null,
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    classification: "",
    city: "",
    address: "",
    state: "",
    phoneNumber1: "",
    phoneNumber2: "",
    mobileNumber: "",
    email: "",
    faxNumber: "",
    pancardnumber: "",
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
    grantAdPayMode: "",
    creditcardnumber: "",
    cssnumber: "",
    expirydate: "",
    discountPolicy: "",
    organisationCode: "",
    organisationCategory: "",
    branches: "",
    employeemandatory: "",
    gstnumber: "",
    organisationClassificationDTO: {
      classificationName: "",
      description: "",
      tpa: "",
      status: "",
    },
    locationMasterDTOs: locationTableRows
      .filter((row) => row.locationId)
      .map((row) => ({ id: row.locationId })),
  });
  const handleAddRow = (tableType) => {
    if (tableType === "location") {
      const newRow = {
        sn: locationTableRows.length + 1,
        locationName: "",
        locationId: null,
      };
      setlocationTableRows([...locationTableRows, newRow]);
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
      setFormData((prevData) => ({
        ...prevData,
        locationMasterDTOs: renumberedRows
          .filter((row) => row.locationId)
          .map((row) => ({ id: row.locationId })),
      }));
    }
  };

  const handlePopupClose = () => {
    setActivePopup(null);
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cities`);
      const data = await response.json();
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
      // Prepare the final formData in the required format
      const payload = {
        name: formData.name,
        classification: formData.classification,
        city: formData.city,
        address: formData.address,
        state: formData.state,
        phoneNumber1: formData.phoneNumber1,
        phoneNumber2: formData.phoneNumber2,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        faxNumber: formData.faxNumber,
        pancardnumber: formData.pancardnumber,
        pinCode: formData.pinCode,
        mouStartDate: formData.mouStartDate,
        mouEndDate: formData.mouEndDate,
        validityForPatient: formData.validityForPatient ? "Yes" : "No",
        opdConsDocFees: formData.opdConsDocFees,
        regiCharNotApplicable: formData.regiCharNotApplicable
          ? "true"
          : "false",
        creditType: formData.creditType,
        orgSaleType: formData.orgSaleType,
        accEntry: formData.accEntry ? "Enabled" : "Disabled",
        insurance: formData.insurance ? "Yes" : "No",
        contactPerson: formData.contactPerson,
        grantAdPayMode: formData.grantAdPayMode,
        creditcardnumber: formData.creditcardnumber,
     
        gstnumber: formData.gstnumber,
        discountPolicy: formData.discountPolicy,
        organisationCode: formData.organisationCode,
        organisationCategory: formData.organisationCategory,
        branches: formData.branches,
        employeemandatory: formData.employeemandatory ? "Yes" : "No",
   // Assuming creditcardnumber is part of formData
        
        organisationClassificationDTO: {
          classificationName:
            formData.organisationClassificationDTO.classificationName,
          description: formData.organisationClassificationDTO.description,
          tpa: formData.organisationClassificationDTO.tpa,
          status: formData.organisationClassificationDTO.status,
        },
        locationMasterDTOs: formData.locationMasterDTOs,
      };

      console.log(JSON.stringify(payload, null, 2));

      // Post the formData to the API
      const response = await axios.post(
        `${API_BASE_URL}/organisation-masters`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check the response status
      if (response.status === 200 || response.status === 201) {
        // Handle success
        toast.success("Data saved successfully!");
      } else {
        // Handle unexpected status codes
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to save data. Please try again.");
      }
    } catch (error) {
      // Handle error from API call
      console.error("Error posting data:", error);
      toast.error("Error posting data. Please check the console for details.");
    }
  };

  useEffect(() => {
    fetchCities();
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
      // Update the current row with the selected location
      const updatedRows = locationTableRows.map((row, index) => {
        if (index === locationTableRows.length - 1) {
          return {
            ...row,
            locationName: selectedData.locationName,
            locationId: selectedData.id,
          };
        }
        return row;
      });

      setlocationTableRows(updatedRows);

      // Update formData with all location IDs
      setFormData((prevData) => ({
        ...prevData,
        locationMasterDTOs: updatedRows
          .filter((row) => row.locationId)
          .map((row) => ({ id: row.locationId })),
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

  // Add this constant for the classification options
  const classificationOptions = [
    { value: "select", label: "Select" },
    { value: "TPA", label: "TPA" },
    { value: "Panel", label: "Panel" },
    { value: "Insurance", label: "Insurance" },
  ];
  const handleReset = () => {
    setFormData({
      name: "",
      classification: "",
      city: "",
      address: "",
      state: "",
      phoneNumber1: "",
      phoneNumber2: "",
      mobileNumber: "",
      email: "",
      faxNumber: "",
      pancardnumber: "",
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
      grantAdPayMode: "",
      creditcardnumber: "",
      cssnumber: "",
      expirydate: "",
      discountPolicy: "",
      organisationCode: "",
      organisationCategory: "",
      branches: "",
      employeemandatory: "",
      gstnumber: "",
      organisationClassificationDTO: {
        classificationName: "",
        description: "",
        tpa: "",
        status: "",
      },
      locationMasterDTOs: [],
    });
  
    setlocationTableRows([
      {
        sn: 1,
        locationName: "",
        locationId: null,
      },
    ]);
  
    
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
                          className="Organization_Master-add-btn"
                          onClick={() => handleAddRow("location")}
                        >
                          Add
                        </button>
                        <button
                          className="Organization_Master-del-btn"
                          onClick={() => handleDeleteRow("location", index)}
                          disabled={locationTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>
                      <div className="dg-package-input-with-icon">
                        <FloatingInput
                        type="search"
                        value={row.locationName}
                        onChange={(e) =>
                          updateRowValue(
                            row.id,
                            "locationName",
                            e.target.value
                          )
                        }
                        onIconClick={() => {
                          setActivePopup("Location");
                        }}/>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <div className="Organization_Master-container">
      <div className="Organization_Master-section">
        <div className="Organization_Master-header">Organization Master</div>
        <div className="Organization_Master-grid">
          <FloatingSelect
            label="Classification"
            value={formData.classification}
            options={[
              { value: "TPA", label: "TPA" },
              { value: "Panel", label: "Panel" },
              { value: "Insurance", label: "Insurance" },
            ]}
            onChange={(e) =>
              setFormData({ ...formData, classification: e.target.value })
            }
          />
        </div>

        <div className="Organization_Master-header">Contact details</div>
        <div className="Organization_Master-grid">
          <FloatingInput
            label="Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FloatingInput
            label="Address *"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />

          <div className="Organization_Master-input-with-icon">
            <FloatingInput
              label="City *"
              type="search"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
              onIconClick={() => setActivePopup("City")} 
            />
            
          </div>
          <FloatingInput
            label="Pin Code"
            value={formData.pinCode}
            onChange={(e) =>
              setFormData({ ...formData, pinCode: e.target.value })
            }
          />
          <FloatingInput
            label="State *"
            value={formData.state}
            readOnly
            onSearchClick={() => setActivePopup("State")}
          />
          <FloatingInput
            label="Phone1 *"
            type="tel"
            value={formData.phoneNumber1}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber1: e.target.value })
            }
          />
          <FloatingInput
            label="Phone2"
            type="tel"
            value={formData.phoneNumber2}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber2: e.target.value })
            }
          />
          <FloatingInput
            label="Mobile No"
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
          />
          <FloatingInput
            label="Email ID"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <FloatingInput
            label="Fax Number"
            value={formData.faxNumber}
            onChange={(e) =>
              setFormData({ ...formData, faxNumber: e.target.value })
            }
          />

          <FloatingInput
            label="PAN Number"
            value={formData.pancardnumber}
            onChange={(e) =>
              setFormData({ ...formData, pancardnumber: e.target.value })
            }
          />

          <FloatingInput
            label="MOU Start Date"
            type="date"
            value={formData.mouStartDate}
            onChange={(e) =>
              setFormData({ ...formData, mouStartDate: e.target.value })
            }
          />
          <FloatingInput
            label="MOU End Date"
            type="date"
            value={formData.mouEndDate}
            onChange={(e) =>
              setFormData({ ...formData, mouEndDate: e.target.value })
            }
          />

          <FloatingInput
            label="OPD Cons Doc Fees from Org"
            value={formData.opdConsDocFees}
            onChange={(e) =>
              setFormData({ ...formData, opdConsDocFees: e.target.value })
            }
          />

          <FloatingSelect
            label="Credit Type"
            value={formData.creditType}
            options={[
              { value: "Cash", label: "Cash" },
              { value: "Both", label: "Both" },
              { value: "IPD Only", label: "IPD Only" },
              { value: "OPD Only", label: "OPD Only" },
            ]}
            onChange={(e) =>
              setFormData({ ...formData, creditType: e.target.value })
            }
          />

          <FloatingSelect
            label="Org Sale Type"
            value={formData.orgSaleType}
            options={[
              { value: "Sale On MRP", label: "Sale On MRP" },
              {
                value: "Sale On Purchase Price",
                label: "Sale On Purchase Price",
              },
              { value: "Sale Policy", label: "Sale Policy" },
            ]}
            onChange={(e) =>
              setFormData({ ...formData, orgSaleType: e.target.value })
            }
          />

          <FloatingInput
            label="Contact Person"
            value={formData.contactPerson}
            onChange={(e) =>
              setFormData({ ...formData, contactPerson: e.target.value })
            }
          />

          <FloatingSelect
            label="Grant Adjustment PayMode"
            value={formData.grantAdPayMode}
            options={[
              { value: "Cash", label: "Cash" },
              {
                value: "Credit Card",
                label: "Credit Card",
              },
              { value: "Cheque", label: "Cheque" },
              { value: "Debit Card", label: "Debit Card" },
            ]}
            onChange={(e) =>
              setFormData({ ...formData, grantAdPayMode: e.target.value })
            }
          />

          {formData.grantAdPayMode === "Credit Card" && (
            <>
              <FloatingInput
                label="Credit Card No"
                value={formData.creditcardnumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    creditcardnumber: e.target.value,
                  })
                }
              />
              <FloatingInput
                label="CSS No"
                value={formData.cssnumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cssnumber: e.target.value,
                  })
                }
              />

              <FloatingInput
                label="Expiry Date"
                type="date"
                value={formData.expirydate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expirydate: e.target.value,
                  })
                }
              />
            </>
          )}
          <FloatingInput
            label="GST No"
            value={formData.gstnumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                gstnumber: e.target.value,
              })
            }
          />
          <div className="Organization_Master-input-with-icon">
            <FloatingInput
            type="search"
              label="Discount Policy"
              value={formData.discountPolicy}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discountPolicy: e.target.value,
                })
              }
              onIconClick={() => setActivePopup("DiscountPolicy")}
              
            />
            
          </div>

          <FloatingInput
            label="Organisation Code"
            value={formData.organisationCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                organisationCode: e.target.value,
              })
            }
          />

          <FloatingSelect
            label="Organisation Category"
            value={formData.organisationCategory}
            options={[
              { value: "Sale On MRP", label: "Sale On MRP" },
              {
                value: "Sale On Purchase Price",
                label: "Sale On Purchase Price",
              },
              { value: "Sale Policy", label: "Sale Policy" },
            ]}
            onChange={(e) =>
              setFormData({ ...formData, organisationCategory: e.target.value })
            }
          />
          <FloatingInput
            label="Branches"
            value={formData.branches}
            onChange={(e) =>
              setFormData({
                ...formData,
                branches: e.target.value,
              })
            }
          />
          <div className="organization-master-form-row-chechbox">
            <input
              type="checkbox"
              id="accEntry"
              checked={formData.accEntry}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  accEntry: e.target.checked,
                })
              }
            />
            <label
              htmlFor="accEntry"
              className="organization-master-checkbox-label"
            >
              Account Entry
            </label>
          </div>

          <div className="organization-master-form-row-chechbox">
            <input
              type="checkbox"
              id="insurance"
              checked={formData.insurance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  insurance: e.target.checked,
                })
              }
            />
            <label
              htmlFor="insurance"
              className="organization-master-checkbox-label"
            >
              Insurance
            </label>
          </div>
          <div className="organization-master-form-row-chechbox">
            <input
              type="checkbox"
              id="validityForPatient"
              checked={formData.validityForPatient}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  validityForPatient: e.target.checked,
                })
              }
            />
            <label
              htmlFor="validityForPatient"
              className="organization-master-checkbox-label"
            >
              Apply Validity for Patient
            </label>
          </div>
          <div className="organization-master-form-row-chechbox">
            <input
              type="checkbox"
              id="regiCharNotApplicable"
              checked={formData.regiCharNotApplicable}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  regiCharNotApplicable: e.target.checked,
                })
              }
            />
            <label
              htmlFor="regiCharNotApplicable"
              className="organization-master-checkbox-label"
            >
              Registration Charges Not Applicable
            </label>
          </div>
          <div className="organization-master-form-row-chechbox">
            <input
              type="checkbox"
              id="employeemandatory"
              checked={formData.employeemandatory}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employeemandatory: e.target.checked,
                })
              }
            />
            <label
              htmlFor="employeemandatory"
              className="organization-master-checkbox-label"
            >
              Employee Details not mandatory
            </label>
          </div>
        </div>

        <div className="Organization_Master-header">
          Organisation Classification
        </div>
        <div className="Organization_Master-grid">
          <FloatingInput
            label="Classification Name"
            value={formData.organisationClassificationDTO.classificationName}
            onChange={(e) =>
              setFormData({
                ...formData,
                organisationClassificationDTO: {
                  ...formData.organisationClassificationDTO,
                  classificationName: e.target.value,
                },
              })
            }
          />
          <FloatingInput
            label="Description"
            value={formData.organisationClassificationDTO.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                organisationClassificationDTO: {
                  ...formData.organisationClassificationDTO,
                  description: e.target.value,
                },
              })
            }
          />
          <FloatingInput
            label="TPA"
            value={formData.organisationClassificationDTO.tpa}
            onChange={(e) =>
              setFormData({
                ...formData,
                organisationClassificationDTO: {
                  ...formData.organisationClassificationDTO,
                  tpa: e.target.value,
                },
              })
            }
          />
          <FloatingInput
            label="Status"
            value={formData.organisationClassificationDTO.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                organisationClassificationDTO: {
                  ...formData.organisationClassificationDTO,
                  status: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="Organization_Master-header">Location</div>
        {renderTable()}
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={(selectedData) => handlePopupSelection(selectedData)}
          onClose={() => handlePopupClose(null)}
        />
      )}

      <div className="Organization_Master-action-buttons">
        <button className="Organization_Master-btn-blue" onClick={handleSave}>
          Save
        </button>
        <button className="Organization_Master-btn-blue" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default OrganisitionMasterPopup;
