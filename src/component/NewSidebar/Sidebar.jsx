import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Sidebar.css";
import hospitallogo from "./Images/hospitallogo.png";

const Sidebar = ({ modules, isOpen }) => {
  const [activeModule, setActiveModule] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const initialModuleOrder = Cookies.get("moduleOrder")
    ? JSON.parse(Cookies.get("moduleOrder"))
    : modules.map((module) => module.moduleName); // Using moduleName for initial order

  const [moduleOrder, setModuleOrder] = useState(initialModuleOrder);

  useEffect(() => {
    const savedActiveModule = localStorage.getItem("activeModule");
    if (savedActiveModule) setActiveModule(savedActiveModule);
  }, []);

  useEffect(() => {
    Cookies.set("moduleOrder", JSON.stringify(moduleOrder), { expires: 7 });
  }, [moduleOrder]);

  useEffect(() => {
    if (activeModule) {
      localStorage.setItem("activeModule", activeModule);
    } else {
      localStorage.removeItem("activeModule");
    }
  }, [activeModule]);

  const handleToggle = (moduleName) => {
    setActiveModule((prev) => (prev === moduleName ? null : moduleName));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredModules = moduleOrder.filter((moduleName) =>
    moduleName.toLowerCase().includes(searchQuery)
  );

  const moveModule = (dragIndex, hoverIndex) => {
    const reorderedModules = [...moduleOrder];
    const [draggedModule] = reorderedModules.splice(dragIndex, 1);
    reorderedModules.splice(hoverIndex, 0, draggedModule);
    setModuleOrder(reorderedModules);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="">
        <div className="custom-logo-container">
          {isOpen ? (
            <span>
              <img
                style={{ width: "35px", marginRight: "10px" }}
                src={hospitallogo}
                alt="Hospital Logo"
              />
              <span>HIMS</span>
            </span>
          ) : (
            <img
              style={{ width: "35px" }}
              src={hospitallogo}
              alt="Hospital Logo"
            />
          )}
        </div>

        <div
          className={`Sidebar-Container ${isOpen ? "expanded" : "collapsed"}`}
        >
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={handleSearch}
            className="Sidebar-search"
          />
          {filteredModules.map((moduleName, index) => {
            const module = modules.find((m) => m.moduleName === moduleName) || {
              submodules: [],
              logo: "fa-solid fa-circle-question",
            }; // Get module data based on name
            return (
              <DraggableModule
                key={module.moduleId}
                module={module} // Pass the full module object
                index={index}
                moveModule={moveModule}
                activeModule={activeModule}
                handleToggle={handleToggle}
                currentPath={location.pathname}
              />
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
};

const DraggableModule = ({
  module,
  index,
  moveModule,
  activeModule,
  handleToggle,
  currentPath,
}) => {
  const [, dragRef] = useDrag({
    type: "MODULE",
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: "MODULE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveModule(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => dragRef(dropRef(node))}>
      <div
        onClick={() => handleToggle(module.moduleName)}
        className="Sidebar-Mainmodule"
        style={{
          borderRadius:
            activeModule === module.moduleName ? "5px 5px 0 0" : "5px",
        }}
      >
        <p>
          <span>
            <i className={module.logo}></i>
          </span>{" "}
          {/* Render the logo dynamically */}
          <span>{module.moduleName}</span>
          <span>
            <i
              className={`fa-solid ${activeModule === module.moduleName
                ? "fa-chevron-up"
                : "fa-chevron-down"
                }`}
            ></i>
          </span>
        </p>
      </div>
      {activeModule === module.moduleName && (
        <div className="Sidebar-submodule">
          {module.submodules.map((submodule) => (
            <NavLink
              key={submodule.submoduleId}
              to={`/${module.moduleName
                ?.replace(/\s+/g, "")
                .toLowerCase()}/${submodule.submoduleName
                  .replace(/\s+/g, "")
                  .toLowerCase()}`}
              className={`submodule-link ${currentPath?.replace(/^\/|\/$/g, "").toLowerCase() ===
                submodule.submodulePath?.replace(/^\/|\/$/g, "").toLowerCase()
                ? "active"
                : ""
                }`}
            >
              {submodule.submoduleName}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
