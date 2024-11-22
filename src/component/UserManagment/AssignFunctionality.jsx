import React, { useEffect, useRef, useState } from "react";
import "./AssignFunctionality.css";
import CustomAlert from "../../alerts/CustomAlert";
import useCustomAlert from "../../alerts/useCustomAlert";
import { API_BASE_URL } from "../api/api";
const AssignFunctionality = () => {
  const mainComponents = [
    {
      id: 1,
      name: "Dispensary",
      subcomponents: [
        "Prescription",
        "Sale",
        "Stock",
        "Counter",
        "Reports",
        "Patient Consumption",
      ],
    },
    {
      id: 2,
      name: "Chemotherapy",
      subcomponents: [
        "Surgery Management",
        "Chemotherapy Scheduling",
        "Radiation Therapy",
        "Cancer Diagnosis",
        "Patient Survival Tracking",
      ],
    },
    {
      id: 3,
      name: "MedicalRecord",
      subcomponents: [
        "MR Outpatient List",
        "MR Inpatient List",
        "Birth List",
        "Death List",
        "Reports",
        "Emergency Patient List",
      ],
    },
    {
      id: 4,
      name: "Transport",
      subcomponents: [
        "Patient Transport",
        "Ambulance",
        "Staff Transport",
        "Transport Request",
        "Vehicle Maintenance",
        "Emergency Transport",
      ],
    },
    {
      id: 5,
      name: "BloodBank",
      subcomponents: [
        "Blood Donation Registration",
        " Blood Collection",
        "Blood Testing and Screening",
        " Blood Storage",
        "Blood Request",
        "Blood Issues",
        "Report",
      ],
    },
    { id: 6, name: "Billing", subcomponents: ["IP Billing", "OPD Billing"] },
    {
      id: 7,
      name: "Pharmacy",
      subcomponents: [
        "Order",
        "Supplier",
        "Report",
        "Setting",
        "Store",
        "Supplier Ledger",
        "Substore Request/Dispatch",
      ],
    },
    {
      id: 8,
      name: "Procurement",
      subcomponents: [
        "Purchase Request",
        "Purchase Order",
        "Goods Arrival Notification",
        "Quotation",
        "Settings",
        "Reports",
      ],
    },
    {
      id: 9,
      name: "Verification",
      subcomponents: [
        "Inventory",
        "Pharmacy",
        " Document & Employment Verification",
        "Identity Verification",
        "Insurance Verification",
      ],
    },
    {
      id: 10,
      name: "Patient",
      subcomponents: ["Search Patient", "Register Patient"],
    },
    {
      id: 11,
      name: "Dynamic Report",
      subcomponents: [],
    },
    {
      id: 12,
      name: "Opration Theater",
      subcomponents: [
        " Booing List",
        "Setting",
        "Surgery Scheduling",
        "OT Resource Management",
        "Surgical Instrument Tracking",
        "Anesthesia Record Management",
        "Post Surgery Care",
      ],
    },
    {
      id: 13,
      name: "Doctor",
      subcomponents: ["Out Patient", "In Patient Department", "Patient Record"],
    },
    {
      id: 14,
      name: "Clinical",
      subcomponents: ["Clinical Assesments And Plan"],
    },
    {
      id: 15,
      name: "Accounting",
      subcomponents: [
        "Transactions",
        "Settings",
        "Reports",
        "Voucher Verification",
        "Medicare Registration",
        "Bank Reconciliation",
      ],
    },
    {
      id: 16,
      name: "Nursing",
      subcomponents: [
        "Out Patient",
        "In Patient",
        "Requisition List",
        "Discharge Summary",
      ],
    },
    {
      id: 17,
      name: "Appointment",
      subcomponents: [
        "Appointment Booking List",
        " Book Appointment",
        "List Visits",
        "New Visit",
        "Online Appointment",
      ],
    },
    {
      id: 18,
      name: "Settings",
      subcomponents: [
        "Departments",
        "Radiology",
        "ADT",
        "Security",
        "Billing",
        "Employee",
        "Clinical",
      ],
    },
    {
      id: 19,
      name: "Inventory",
      subcomponents: [
        "Internal",
        "Stock",
        "Reports",
        "Return To Vendor",
        "Drug Registration",
      ],
    },
    {
      id: 20,
      name: "Incentive",
      subcomponents: ["Transaction", "Reports", "Setting"],
    },
    {
      id: 21,
      name: "Laboratory",
      subcomponents: [
        " Notification",
        "OPD Billing",
        "Sample Collection",
        "Add Results",
        "Pending Reports",
        "Final Reports",
        "Settings",
      ],
    },
    {
      id: 22,
      name: "Utilites",
      subcomponents: [
        "Scheme Refund List",
        "Change Visit Scheme",
        "Change Billing Counter",
        "Organization Deposit",
      ],
    },
    {
      id: 23,
      name: "Emergency",
      subcomponents: [
        " New Patients",
        "Triaged Patients",
        "Finalized Patients",
        " Bed Information",
        "Emergency Code Response",
        "Response Log",
        " Incident Summary",
        "Emergency Drill Report",
      ],
    },
    {
      id: 24,
      name: "System Admin",
      subcomponents: [
        "Database Backup",
        "Materialized Sales View",
        "Sales Book",
        "New Sales Book",
        "AuditTrail",
      ],
    },
    {
      id: 25,
      name: "Social Service",
      subcomponents: ["SSU Patient List", "Patient Counseling"],
    },
    {
      id: 26,
      name: "QueueMngmt",
      subcomponents: [
        "OPD",
        "Patient Queue Display",
        "Queue Prioritization",
        "Real-Time Queue Monitoring",
        "Service Time Tracking",
        "Patient Notification",
      ],
    },
    {
      id: 27,
      name: "SubStore",
      subcomponents: ["Pharmacy", "Inventory"],
    },
    {
      id: 28,
      name: "Reports",
      subcomponents: [
        "Admission",
        "Billing Reports",
        "Appointment",
        "Radiology",
        "Lab",
        "Doctors",
        "Patient",
        "Police Case",
      ],
    },
    {
      id: 29,
      name: "HI",
      subcomponents: ["Patient List", "Visit List", "IPD Billing", "Report"],
    },
    {
      id: 30,
      name: "ADT",
      subcomponents: [
        "Search Patient",
        "Admitted Patients",
        "Discharged Patients",
        "Exchange Bed",
        "Cancel Bed Reservation",
      ],
    },
    {
      id: 31,
      name: "Maternity",
      subcomponents: [
        "Maternity List",
        "Payments",
        "Reports",
        "Antenatal Care",
        "Postnatal Care",
        "Labor Room Management",
        "Breastfeeding Support",
        "Family Planning Service",
      ],
    },
    {
      id: 32,
      name: "Radioloagy",
      subcomponents: [
        "List Requests",
        "List Reports",
        "Edit Doctors",
        "OPD Billing",
      ],
    },
    {
      id: 33,
      name: "MktReferral",
      subcomponents: [
        "Transaction",
        "Setting",
        "Report",
        "Refferal Tracking",
        "Patinet Refferal Reward",
        "Marketing Campaigns",
        "Patient Outreach",
      ],
    },
    {
      id: 34,
      name: "CSSD",
      subcomponents: ["Sterilization", "Reports"],
    },
    {
      id: 35,
      name: "Fix Assests",
      subcomponents: [
        "Assets Management",
        "Assets Maintainance",
        "Depreciation And Discarding",
        "Reports",
      ],
    },
    {
      id: 36,
      name: "Helpdesk",
      subcomponents: [
        "Employee Information",
        "Bed Information",
        "Ward Information",
        "Queue Information",
      ],
    },
  ];
  const [roles, setRoles] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchId,setSearchId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [roleData, setRoleData] = useState({
    roleName: "",
    modules: mainComponents.map((component) => ({
      id: component.id,
      name: component.name,
      isMainChecked: false,
      subcomponents: component.subcomponents.map((sub) => ({
        name: sub,
        isChecked: false,
      })),
    })),
  });

  useEffect (()=>{
    fetchRoles();
  },[])
  const toggleMain = (index) => {
    setRoleData((prevState) => {
      const newModules = prevState.modules.map((module, i) => {
        if (i === index) {
          const isChecked = !module.isMainChecked;
          return {
            ...module,
            isMainChecked: isChecked,
            subcomponents: module.subcomponents.map((sub) => ({
              ...sub,
              isChecked: isChecked, // Check or uncheck all based on main
            })),
          };
        }
        return module;
      });

      return { ...prevState, modules: newModules };
    });
  };

  // Handle individual subcomponent toggle
  const toggleSubComponent = (mainIndex, subIndex) => {
    setRoleData((prevState) => {
      const newModules = prevState.modules.map((module, i) => {
        if (i === mainIndex) {
          const updatedSubcomponents = module.subcomponents.map((sub, j) => {
            if (j === subIndex) {
              return { ...sub, isChecked: !sub.isChecked }; // Toggle subcomponent
            }
            return sub;
          });

          // Update main checkbox based on subcomponents' checked states
          const isMainChecked = updatedSubcomponents.some(
            (sub) => sub.isChecked
          );
          return {
            ...module,
            subcomponents: updatedSubcomponents,
            isMainChecked,
          };
        }
        return module;
      });

      return { ...prevState, modules: newModules };
    });
  };

  const handleRoleChange = (e) => {
    setRoleData((prevState) => ({
      ...prevState,
      roleName: e.target.value,
    }));
  };
  const fetchRoles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/get-all-roles`);
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleSubmit = async () => {
    // Filter modules to include only those with selected subcomponents or main checks
    const selectedModules = roleData.modules
      .filter((module) => module.isMainChecked || module.subcomponents.some((sub) => sub.isChecked))
      .map((module) => ({
        id: module.id,
        name:module.name,
        isMainChecked: module.isMainChecked,
        subcomponents: module.subcomponents.filter((sub) => sub.isChecked), // Only include checked subcomponents
      }));

      
  
      const transformedData = {
        modules: selectedModules.map((component) => ({
          name: component.name,
          submodules: component.subcomponents.map((subName) => ({
            name: subName.name.trim(),
          })),
        })),
      };
  
      console.log(transformedData);
    try {
      
      const response = await fetch(`${API_BASE_URL}/admin/update-role-functionality/${searchId}`, {
        method: 'PUT', // or 'POST', depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData), // Convert the data to JSON
      });
  
      if (response.ok) {
        success("Role functionality updated successfully:");
        setRoleData({
          roleName: "",
          modules: mainComponents.map((component) => ({
            id: component.id,
            name: component.name,
            isMainChecked: false,
            subcomponents: component.subcomponents.map((sub) => ({
              name: sub,
              isChecked: false,
            })),
          })),
        });

      } else {
        console.error("Failed to update role functionality:", response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error("Error during role functionality update:", error);
      // Handle network errors
    }
  };
  

  const dropdownRef = useRef(null);

  const filteredOptions = roles.filter(option =>
    option.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true); // Open dropdown when typing
  };

  const handleOptionClick = (option) => {
    console.log(option)
    setSearchTerm(option.name); // Set searchTerm to the selected option
    setSearchId(option.rolesId);
    setIsOpen(false); // Close dropdown after selecting an option
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  return (
    <div className="AssignFunctionality-container">
      <h1 className="AssignFunctionality-heading">
        Assign Functionalities To Role
      </h1>
      <div className="AssignFunctionality-header">
        <div className="AssignFunctionality-right">
          <label>Select Role</label>
          <div ref={dropdownRef}>
      <input
        type="text"
        className="search-search-input"
        placeholder="Select option..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsOpen(true)} // Open dropdown on focus
      />

      {isOpen && (
        <ul className="search-dropdown-list-new">
          {filteredOptions.map((option) => (
            <li
              key={option.rolesId}
              onClick={() => handleOptionClick(option)}
              className="search-dropdown-item"
            >
              {option.name}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className="search-dropdown-item">No options found</li>
          )}
        </ul>
      )}
    </div>
        </div>
        <button className="AssignFunctionality-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="AssignFunctionality-main-content">
  {/* First Column - First Half of Modules */}
  <div className="AssignFunctionality-column">
    {roleData.modules.slice(0, Math.ceil(roleData.modules.length / 2)).map((module, index) => (
      <div key={module.id} className="AssignFunctionality-Main-component">
        <label>
          <input
            type="checkbox"
            checked={module.isMainChecked}
            onChange={() => toggleMain(index)}
          />
          {module.name}
        </label>
        {module.isMainChecked && (
          <div className="subcomponent-list three-column">
            {module.subcomponents.map((sub, subIndex) => (
              <label key={sub.name} className="subcomponent-item">
                <input
                  type="checkbox"
                  checked={sub.isChecked}
                  onChange={() => toggleSubComponent(index, subIndex)}
                />
                {sub.name}
              </label>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>

  {/* Second Column - Second Half of Modules */}
  <div className="AssignFunctionality-column">
    {roleData.modules.slice(Math.ceil(roleData.modules.length / 2)).map((module, index) => (
      <div key={module.id} className="AssignFunctionality-Main-component">
        <label>
          <input
            type="checkbox"
            checked={module.isMainChecked}
            onChange={() => toggleMain(index + Math.ceil(roleData.modules.length / 2))}
          />
          {module.name}
        </label>
        {module.isMainChecked && (
          <div className="subcomponent-list three-column">
            {module.subcomponents.map((sub, subIndex) => (
              <label key={sub.name} className="subcomponent-item">
                <input
                  type="checkbox"
                  checked={sub.isChecked}
                  onChange={() => toggleSubComponent(index + Math.ceil(roleData.modules.length / 2), subIndex)}
                />
                {sub.name}
              </label>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</div>

<CustomAlert />
    </div>
  );
};

export default AssignFunctionality;
