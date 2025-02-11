import React, { useEffect, useRef, useState } from "react";
import "./AssignFunctionality.css";
import CustomAlert from "../../../alerts/CustomAlert";
import useCustomAlert from "../../../alerts/useCustomAlert";
import { API_BASE_URL } from "../../api/api";
import { usePopup } from "../../../FidgetSpinner/PopupContext";
const AssignFunctionality = () => {
  const { showPopup } = usePopup();
  const mainComponents = [
    {
      id: 1,
      name: "Dispensary",
      logo: "fa-solid fa-notes-medical",
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
      logo: "fa-solid fa-user-doctor",
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
      logo: "fa-solid fa-book",
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
      logo: "fa-solid fa-truck-medical",
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
      logo: "fa-solid fa-droplet",
      subcomponents: [
        "Blood Donation Registration",
        "Blood Collection",
        "Blood Testing and Screening",
        "Blood Storage",
        "Blood Request",
        "Blood Issues",
        "Report",
      ],
    },
    {
      id: 6,
      name: "Billing",
      logo: "fa-solid fa-money-bill",
      subcomponents: [
        "IP Billing",
        "OPD Billing",
        "Opd Post Discount",
        "Ipd Money Reciept",
        "Opd Billing Cancel",
        "Final Bill",
      ],
    },
    {
      id: 7,
      name: "Pharmacy",
      logo: "fa-solid fa-prescription-bottle-medical",
      subcomponents: [
        "Order",
        "Supplier",
        "Setting",
        "Store",
        "Substore Request/Dispatch",
      ],
    },
    {
      id: 8,
      name: "Procurement",
      logo: "fa-solid fa-table-list",
      subcomponents: [
        "Purchase Request",
        "Purchase Order",
        "Goods Arrival Notification",
        "Quotation",
        "Settings",
      ],
    },
    {
      id: 9,
      name: "Verification",
      logo: "fa-solid fa-check-double",
      subcomponents: ["Inventory", "Pharmacy"],
    },
    {
      id: 10,
      name: "Patient",
      logo: "fa-solid fa-address-card",
      subcomponents: ["Search Patient", "Register Patient"],
    },
    {
      id: 11,
      name: "Dynamic Report",
      logo: "fa-solid fa-clipboard-question",
      subcomponents: ["Write SQL Query Here"],
    },
    {
      id: 12,
      name: "Opration Theater",
      logo: "fa-solid fa-bandage",
      subcomponents: [
        "Booking List",
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
      logo: "fa-solid fa-stethoscope",
      subcomponents: ["Out Patient", "In Patient Department"],
    },
    {
      id: 14,
      name: "Clinical",
      logo: "fa-solid fa-circle-h",
      subcomponents: ["Clinical Assesments And Plan"],
    },
    {
      id: 15,
      name: "Accounting",
      logo: "fa-solid fa-file-invoice",
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
      logo: "fa-solid fa-user-nurse",
      subcomponents: ["Nursing Dashboard", "Out Patient"],
    },
    {
      id: 17,
      name: "Appointment",
      logo: "fa-solid fa-bell",
      subcomponents: [
        "Appointment Booking List",
        "Doctor Appointment",
        "Doctor Schedule Std",
        "Break Time",
        "Online Doctor Appointments",
        "Doctor Blocking",
      ],
    },
    {
      id: 18,
      name: "Settings",
      logo: "fa-solid fa-gear",
      subcomponents: [
        "Radiology",
        "Employee",
        "Ip Master",
        "Geolocation",
        "Doctor Master",
        "Service Master",
        "Location Master",
        "Soc Master",
        "Dg Master",
        "Specialisations",
        "Speciality Group",
      ],
    },
    {
      id: 19,
      name: "Inventory",
      logo: "fa-solid fa-warehouse",
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
      logo: "fa-solid fa-money-check-dollar",
      subcomponents: ["Transaction", "Reports", "Setting"],
    },
    {
      id: 21,
      name: "Laboratory",
      logo: "fa-solid fa-flask",
      subcomponents: [
        "Sample Collection",
        "Uncollect Sample",
        "Reject Sample",
        "Sample Recieving",
        "Add Results",
        "Pending Reports",
        "Final Reports",
        "Rejected Reports",
        "Settings",
      ],
    },
    {
      id: 22,
      name: "Utilites",
      logo: "fa-solid fa-screwdriver-wrench",
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
      logo: "fa-solid fa-hospital",
      subcomponents: ["Er Initial", "Er Clinical Entries"],
    },
    {
      id: 24,
      name: "System Admin",
      logo: "fa-solid fa-window-restore",
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
      logo: "fa-solid fa-hand-holding-medical",
      subcomponents: ["SSU Patient List", "Patient Counseling"],
    },
    {
      id: 26,
      name: "Queuemanagement",
      logo: "fa-solid fa-list-check",
      subcomponents: ["OPD"],
    },
    {
      id: 27,
      name: "SubStore",
      logo: "fa-solid fa-pills",
      subcomponents: ["stores"],
    },
    {
      id: 28,
      name: "Reports",
      logo: "fa-solid fa-layer-group",
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
      name: "Visitor Management",
      logo: "fa-solid fa-file-medical",
      subcomponents: ["Visitors", "Visiting Hour", "Visitor Badges"],
    },
    {
      id: 30,
      name: "ADT",
      logo: "fa-solid fa-hospital-user",
      subcomponents: [
        "Home",
        "Ip Admission",
        "Admitted Patients",
        "Discharged Patients",
        "Ip Information",
      ],
    },
    {
      id: 31,
      name: "Maternity",
      logo: "fa-solid fa-hands-holding-child",
      subcomponents: ["Maternity List"],
    },
    {
      id: 32,
      name: "Radioloagy",
      logo: "fa-solid fa-x-ray",
      subcomponents: [
        "List Requests",
        "List Reports",
        "Approval",
        "Edit Doctors",
      ],
    },
    {
      id: 33,
      name: "MktReferral",
      logo: "fa-solid fa-people-line",
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
      logo: "fa-solid fa-microscope",
      subcomponents: ["Cssd Master", "Cssd Master"],
    },
    {
      id: 35,
      name: "Fixed Assests",
      logo: "fa-solid fa-building",
      subcomponents: ["Asset Master", "Asset Transaction"],
    },
    {
      id: 36,
      name: "Helpdesk",
      logo: "fa-solid fa-circle-info",
      subcomponents: ["Employee Information", "Queue Information"],
    },
    {
      id: 37,
      name: "SuperUser",
      logo: "fa-solid fa-user-tie",
      subcomponents: ["User Management"],
    },
    {
      id: 38,
      name: "HomeHealthcare",
      logo: "fa-solid fa-house-medical",
      subcomponents: ["Patient Registration"],
    },
    {
      id: 39,
      name: "Pediatric",
      logo: "fa-solid fa-baby",
      subcomponents: ["Out Patient", "In Patient"],
    },
    {
      id: 39,
      name: "Physiotherapy",
      logo: "fa-solid fa-circle-h",
      subcomponents: ["Session Form", "Session List"],
    },
    {
      id: 40,
      name: "Vaccination",
      logo: "fa-solid fa-syringe",
      subcomponents: ["Patient List", "Reports"],
    },
    {
      id: 41,
      name: "HR",
      logo: "fa-solid fa-user-large",
      subcomponents: [
        "Employee List",
        "Attendance",
        "Employee Schedule",
        "Employee Leave",
        "Performance Evaluation",
        "Payroll",
        "Recruitment Management",
      ],
    },
    {
      id: 42,
      name: "RadiationTherapy",
      logo: "fa-solid fa-circle-h",
      subcomponents: [
        "Patient Therapy Plan",
        "Dosage Tracking",
        "Equipment Usage Logs",
        "Radiation Safety Compliance",
        "Appointment And Scheduling",
      ],
    },
    {
      id: 43,
      name: "Pulmonology",
      logo: "fa-solid fa-circle-h",
      subcomponents: [
        "Respiratory Function Tests",
        "Pulmonary Rehabilitation",
        "Imaging and Lab Reports",
        "Medication Management",
        "Follow-Up Scheduling",
      ],
    },
    {
      id: 44,
      name: "Laundry",
      logo: "fa-solid fa-notes-medical",
      subcomponents: [
        "Transaction",
        "Master",
        "Report"
      ],
    },
    {
      id: 45,
      name: "Autopsy",
      logo: "fa-solid fa-notes-medical",
      subcomponents: [
        "Autopsy Request Form",
        "Autopsy Scheduling Form",
        "Autopsy Execution Form",
        "Autopsy Report Form",
        "Autopsy Report Distribution Form",
      ],
    },
  ];
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState();
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

  useEffect(() => {
    fetchRoles();
  }, []);
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
      .filter(
        (module) =>
          module.isMainChecked ||
          module.subcomponents.some((sub) => sub.isChecked)
      )
      .map((module) => ({
        id: module.id,
        name: module.name,
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
      const response = await fetch(
        `${API_BASE_URL}/admin/update-role-permissions/${searchId}`,
        {
          method: "PUT", // or 'POST', depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData), // Convert the data to JSON
        }
      );

      if (response.ok) {
        showPopup([
          { url: "/superuser/usermanagement/user", text: "Add Role To User" },
        ]);
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
        console.error(
          "Failed to update role functionality:",
          response.statusText
        );
        // Handle error response
      }
    } catch (error) {
      console.error("Error during role functionality update:", error);
      // Handle network errors
    }
  };

  const dropdownRef = useRef(null);

  const filteredOptions = roles.filter((option) =>
    option.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true); // Open dropdown when typing
  };

  const handleOptionClick = (option) => {
    console.log(option);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
          {roleData.modules
            .slice(0, Math.ceil(roleData.modules.length / 2))
            .map((module, index) => (
              <div
                key={module.id}
                className="AssignFunctionality-Main-component"
              >
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
          {roleData.modules
            .slice(Math.ceil(roleData.modules.length / 2))
            .map((module, index) => (
              <div
                key={module.id}
                className="AssignFunctionality-Main-component"
              >
                <label>
                  <input
                    type="checkbox"
                    checked={module.isMainChecked}
                    onChange={() =>
                      toggleMain(index + Math.ceil(roleData.modules.length / 2))
                    }
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
                          onChange={() =>
                            toggleSubComponent(
                              index + Math.ceil(roleData.modules.length / 2),
                              subIndex
                            )
                          }
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
