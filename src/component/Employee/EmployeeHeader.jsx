import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './EmployeeTable.css';

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
                className={location.pathname === '/settings/departments' ? 'active' : ''}
              >
                Departments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/radiology"
                className={location.pathname === '/settings/radiology' ? 'active' : ''}
              >
                Radiology
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/adt"
                className={location.pathname === '/settings/adt' ? 'active' : ''}
              >
                ADT
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/security"
                className={location.pathname === '/settings/security' ? 'active' : ''}
              >
                Security
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/billing"
                className={location.pathname === '/settings/billing' ? 'active' : ''}
              >
                Billing
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/employee"
                className={location.pathname === '/settings/employee' ? 'active' : ''}
              >
                Employee
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/clinical"
                className={location.pathname === '/settings/clinical' ? 'active' : ''}
              >
                Clinical
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {location.pathname.includes('/settings/departments') && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/departments/manage-department"
                className={location.pathname === '/settings/departments/manage-department' ? 'active' : ''}
              >
                Manage Department
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/departments/manage-substore"
                className={location.pathname === '/settings/departments/manage-substore' ? 'active' : ''}
              >
                Manage SubStore
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      
      {location.pathname.includes('/settings/radiology') && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/radiology/manage-imaging-type"
                className={location.pathname === '/settings/radiology/manage-imaging-type' ? 'active' : ''}
              >
                Imaging Type
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/radiology/manage-imaging-item"
                className={location.pathname === '/settings/radiology/manage-imaging-item' ? 'active' : ''}
              >
                Imaging Item
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {location.pathname.includes('/settings/adt') && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/adt/manage-ward"
                className={location.pathname === '/settings/adt/manage-ward' ? 'active' : ''}
              >
                Manage Ward
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/adt/manage-bed-feature"
                className={location.pathname === '/settings/adt/manage-bed-feature' ? 'active' : ''}
              >
                Manage Bed Feature
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/adt/manage-bed"
                className={location.pathname === '/settings/adt/manage-bed' ? 'active' : ''}
              >
                Manage Bed Feature
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {location.pathname.includes('/settings/employee') && (
        <div className="sub-nav-container">
          <ul>
            <li>
              <NavLink
                to="/settings/employee/manage-employee"
                className={location.pathname === '/settings/employee/manage-employee' ? 'active' : ''}
              >
                Manage Employee
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/employee/manage-employee-role"
                className={location.pathname === '/settings/employee/manage-employee-role' ? 'active' : ''}
              >
                Manage Employee Role
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings/employee/manage-employee-type"
                className={location.pathname === '/settings/employee/manage-employee-type' ? 'active' : ''}
              >
                Manage Employee Type
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default EmployeeHeader;
