import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./ServiceMasterNav.css";
function ServiceMasterNav() {
  const location = useLocation();
  return (
    <div className="serviceMasterNav-con">
      <ul className="serviceMasterNav-list-con">
        <li className="serviceMasterNav-list">
          <NavLink
            to={"/settings/servicemaster/service"}
            className={`${
              location.pathname === "/settings/servicemaster/service"
                ? "serviceMasterNav-active"
                : ""
            }`}
          >
            service master
          </NavLink>
        </li>
        <li className="serviceMasterNav-list">
          <NavLink
            to={"/settings/servicemaster/servicetype"}
            className={`${
              location.pathname === "/settings/servicemaster/servicetype"
                ? "serviceMasterNav-active"
                : ""
            }`}
          >
            service Type
          </NavLink>
        </li>
        <li className="serviceMasterNav-list">
          <NavLink
            to={"/settings/servicemaster/groupservicetype"}
            className={`${
              location.pathname === "/settings/servicemaster/groupservicetype"
                ? "serviceMasterNav-active"
                : ""
            }`}
          >
            Group service Type
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default ServiceMasterNav;
