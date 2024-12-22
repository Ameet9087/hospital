import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeHeader = () => {
  const location = useLocation();

  return (
    <>
      <header className="employee-header">
        <nav>
          <ul className="employee-header-form">
            <li>
              <NavLink
                to="/settings/departments"
                className={
                  location.pathname === "/settings/departments" ? "active" : ""
                }
              >
                Departments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/radiology"
                className={
                  location.pathname === "/settings/radiology" ? "active" : ""
                }
              >
                Radiology
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/settings/adt"
                className={
                  location.pathname === "/settings/adt" ? "active" : ""
                }
              >
                ADT
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/security"
                className={
                  location.pathname === "/settings/security" ? "active" : ""
                }
              >
                Security
              </NavLink>
            </li> */}

            {/* <li>
              <NavLink
                to="/settings/billing"
                className={
                  location.pathname === "/settings/billing" ? "active" : ""
                }
              >
                Billing
              </NavLink>
            </li> */}

            <li>
              <NavLink
                to="/settings/employee"
                className={
                  location.pathname === "/settings/employee" ? "active" : ""
                }
              >
                Employee
              </NavLink>
            </li>

            {/* <li>
              <NavLink
                to="/settings/clinical"
                className={
                  location.pathname === "/settings/clinical" ? "active" : ""
                }
              >
                Clinical
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/settings/ipmaster"
                className={
                  location.pathname === "/settings/ipmaster" ? "active" : ""
                }
              >
                Ip Master
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/geolocation"
                className={
                  location.pathname === "/settings/geolocation" ? "active" : ""
                }
              >
                Geolocation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/doctor/add-doctor"
                className={
                  location.pathname === "/settings/doctor/add-doctor" ? "active" : ""
                }
              >
                Doctor Master
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/serviceMaster/serviceMaster"
                className={
                  location.pathname === "/settings/serviceMaster/serviceMaster" ? "active" : ""
                }
              >
                Service Master
              </NavLink>
            </li>

          </ul>
        </nav>
      </header>

      {location.pathname.includes("/settings/departments") && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/departments/manage-department"
                className={
                  location.pathname ===
                  "/settings/departments/manage-department"
                    ? "active"
                    : ""
                }
              >
                Manage Department
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/departments/manage-substore"
                className={
                  location.pathname === "/settings/departments/manage-substore"
                    ? "active"
                    : ""
                }
              >
                Manage SubStore
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {location.pathname.includes("/settings/radiology") && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/radiology/manage-imaging-type"
                className={
                  location.pathname ===
                  "/settings/radiology/manage-imaging-type"
                    ? "active"
                    : ""
                }
              >
                Imaging Type
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/radiology/manage-imaging-item"
                className={
                  location.pathname ===
                  "/settings/radiology/manage-imaging-item"
                    ? "active"
                    : ""
                }
              >
                Imaging Item
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* {location.pathname.includes("/settings/adt") && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/adt/manage-ward"
                className={
                  location.pathname === "/settings/adt/manage-ward"
                    ? "active"
                    : ""
                }
              >
                Manage Ward
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/adt/manage-bed-feature"
                className={
                  location.pathname === "/settings/adt/manage-bed-feature"
                    ? "active"
                    : ""
                }
              >
                Manage Bed Feature
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/adt/manage-bed"
                className={
                  location.pathname === "/settings/adt/manage-bed"
                    ? "active"
                    : ""
                }
              >
                Manage Bed Feature
              </NavLink>
            </li>
          </ul>
        </div>
      )} */}

      {location.pathname.includes("/settings/clinical") && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/clinical/icd-group"
                className={
                  location.pathname === "/settings/clinical/icd-group"
                    ? "active"
                    : ""
                }
              >
                ICD Group
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/clinical/manage-reaction"
                className={
                  location.pathname === "/settings/clinical/manage-reaction"
                    ? "active"
                    : ""
                }
              >
                Manage Reaction
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {location.pathname.includes("/settings/employee") && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/employee/manage-employee"
                className={
                  location.pathname === "/settings/employee/manage-employee"
                    ? "active"
                    : ""
                }
              >
                Manage Employee
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/employee/manage-employee-role"
                className={
                  location.pathname ===
                  "/settings/employee/manage-employee-role"
                    ? "active"
                    : ""
                }
              >
                Manage Employee Role
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/employee/manage-employee-type"
                className={
                  location.pathname ===
                  "/settings/employee/manage-employee-type"
                    ? "active"
                    : ""
                }
              >
                Manage Employee Type
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {location.pathname.includes("/settings/ipmaster") && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-Floor"
                className={
                  location.pathname === "/settings/ipmaster/IP-master-Floor"
                    ? "active"
                    : ""
                }
              >
                Create Floor
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-Pay-type-master"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-master-Pay-type-master"
                    ? "active"
                    : ""
                }
              >
                PayType Master
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-room"
                className={
                  location.pathname === "/settings/ipmaster/IP-master-room"
                    ? "active"
                    : ""
                }
              >
                Create Room Type
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-room-info"
                className={
                  location.pathname === "/settings/ipmaster/IP-master-room-info"
                    ? "active"
                    : ""
                }
              >
                Create Room
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-Beds"
                className={
                  location.pathname === "/settings/ipmaster/IP-master-Beds"
                    ? "active"
                    : ""
                }
              >
                Create Beds
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/settings/ipmaster/IP-master-OTPackageMaster"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-master-OTPackageMaster"
                    ? "active"
                    : ""
                }
              >
                OT Package Master
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-masterDischargeWordole"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-masterDischargeWordole"
                    ? "active"
                    : ""
                }
              >
                Discharge Wardole
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-OTMaster"
                className={
                  location.pathname === "/settings/ipmaster/IP-master-OTMaster"
                    ? "active"
                    : ""
                }
              >
                OT Master
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-Medical-leo-cases"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-master-Medical-leo-cases"
                    ? "active"
                    : ""
                }
              >
                Medical Leave Cases
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-ReligionMaster"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-master-ReligionMaster"
                    ? "active"
                    : ""
                }
              >
                Religion Master
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-Discharge-template"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-master-Discharge-template"
                    ? "active"
                    : ""
                }
              >
                Discharge Template
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/in-admissible-master"
                className={
                  location.pathname ===
                  "/settings/ipmaster/in-admissible-master"
                    ? "active"
                    : ""
                }
              >
                In Admissible Master
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-Group-operation-type"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-master-Group-operation-type"
                    ? "active"
                    : ""
                }
              >
                Group Operation Type
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-operation-type"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-master-operation-type"
                    ? "active"
                    : ""
                }
              >
                Operation Type
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/ipmaster/IP-master-IPD-PackageMaster"
                className={
                  location.pathname ===
                  "/settings/ipmaster/IP-master-IPD-PackageMaster"
                    ? "active"
                    : ""
                }
              >
                IPD Package Master
              </NavLink>
            </li> */}
          </ul>
        </div>
      )}

      {/* {location.pathname.includes("/settings/serviceMaster") && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/serviceMaster/serviceMaster"
                className={
                  location.pathname === "/settings/serviceMaster/serviceMaster"
                    ? "active"
                    : ""
                }
              >
              Service Master
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/serviceMaster/serviceRate"
                className={
                  location.pathname ===
                  "/settings/serviceMaster/serviceRate"
                    ? "active"
                    : ""
                }
              >
                ServiceRate
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/serviceMaster/operationOrProcedureRate"
                className={
                  location.pathname ===
                  "/settings/serviceMaster/operationOrProcedureRate"
                    ? "active"
                    : ""
                }
              >
                Manage Employee Type
              </NavLink>
            </li>
          </ul>
        </div>
      )} */}

      {location.pathname.includes("/settings/geolocation") && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/geolocation/manage-country"
                className={
                  location.pathname === "/settings/employee/manage-country"
                    ? "active"
                    : ""
                }
              >
                Manage Country
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/geolocation/manage-state"
                className={
                  location.pathname === "/settings/geolocation/manage-state"
                    ? "active"
                    : ""
                }
              >
                State
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/geolocation/manage-city"
                className={
                  location.pathname === "/settings/geolocation/manage-city"
                    ? "active"
                    : ""
                }
              >
                City
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default EmployeeHeader;
