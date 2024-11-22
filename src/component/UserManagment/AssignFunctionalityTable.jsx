import React, { useEffect, useState } from 'react';
import './AssignFunctionalityTable.css';
import { API_BASE_URL } from '../api/api';



const AssignFunctionalityTable = ({id}) => {
  console.log(id);
  
  const [expanded, setExpanded] = useState({});
  const [role,setRole] =useState({});
  const fetchRoles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/role-details/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRole(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };
  useEffect(()=>{
    fetchRoles();
  },[])

  const toggleExpansion = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id]
    }));
  };

  const renderTree = (node) => {
    return (
      <div className="AssignFunctionalityTable-family-node" key={node.id}>
        <span>{node?.roleName}</span>
        <div className="AssignFunctionalityTable-family-person">
          <span>{node?.moduleName}</span>
          {(node.modules || node.submodules) && (
            <button
              onClick={() => toggleExpansion(node.id)}
              className="AssignFunctionalityTable-expand-btn"
            >
              {expanded[node.id] ? 'Collapse' : 'Expand'}
            </button>
          )}
        </div>
        {node.modules && (
          <div className="AssignFunctionalityTable-children">
            {node.modules.map((module) => renderTree(module))}
          </div>
        )}
        {expanded[node.id] && node.submodules && (
          <div className="AssignFunctionalityTable-children">
            {node.submodules.map((submodule) => (
              <div key={submodule.id} className="AssignFunctionalityTable-child">
                {submodule.submoduleName}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="AssignFunctionalityTable-family-tree-container">
      {renderTree(role)}
    </div>
  );
};

export default AssignFunctionalityTable;
