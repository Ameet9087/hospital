import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, NavLink } from 'react-router-dom';
import './UserManagement.css';
import Role from './Role';
import AssignFunctionality from './AssignFunctionality';
import User from './User';
const UserManagement = () => {
  return (
      <div className="UserManagement">
        <nav className="UserManagement-nav">
          <NavLink
            to="/superuser/usermanagement/role"
            className={({ isActive }) => isActive ? "UserManagement-link active" : "UserManagement-link"}
          >
            Role
          </NavLink>
          <NavLink
            to="/superuser/usermanagement/assign-functionality"
            className={({ isActive }) => isActive ? "UserManagement-link active" : "UserManagement-link"}
          >
            Assign Functionality
          </NavLink>
          <NavLink
            to="/superuser/usermanagement/user"
            className={({ isActive }) => isActive ? "UserManagement-link active" : "UserManagement-link"}
          >
            User
          </NavLink>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<Role />} />
            <Route path="/role" element={<Role />} />
            <Route path="/assign-functionality" element={<AssignFunctionality />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </div>
  );
};

export default UserManagement;
