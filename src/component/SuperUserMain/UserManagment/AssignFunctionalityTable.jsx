import React, { useEffect, useState } from "react";
import "./AssignFunctionalityTable.css";
import { API_BASE_URL } from "../../api/api";

const AssignFunctionalityTable = ({ id }) => {
  const [expanded, setExpanded] = useState({}); // Track expanded nodes
  const [role, setRole] = useState({}); // Store the tree structure

  // Fetch roles and tree data from API
  const fetchRoles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/role-details/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      console.log(data);

      setRole(data); // Set tree root node
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [id]);

  // Toggle expansion for a node
  const toggleExpansion = (nodeId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [nodeId]: !prevExpanded[nodeId], // Toggle the current node's state
    }));
  };

  const renderTree = (node, parentId = "") => {
    if (!node) return null;

    // Create a unique ID for this node using parentId
    const nodeId = `${parentId}-${node.moduleId || node.submoduleId || "root"}`;

    // Determine if this node has children
    const hasChildren = !!(node.modules || node.submodules);

    return (
      <div className="tree-node" key={nodeId}>
        <div className="tree-node-header">
          {/* Expand/Collapse Button - Only ONE button for all children */}
          {hasChildren && (
            <span
              className={`tree-node-toggle ${
                expanded[nodeId] ? "expanded" : "collapsed"
              }`}
              onClick={() => toggleExpansion(nodeId)}
            >
              {expanded[nodeId] ? "▼" : "▶"}
            </span>
          )}

          {/* Node Name */}
          <span className="tree-node-name">
            {node.roleName || node.moduleName || "No Name"}
          </span>
        </div>

        {/* Render Children (Modules and Submodules) */}
        {expanded[nodeId] && (
          <div className="tree-children">
            {/* Render Modules */}
            {node.modules &&
              node.modules.map((module) => renderTree(module, nodeId))}

            {/* Render Submodules */}
            {node.submodules &&
              node.submodules.map((submodule) => (
                <div
                  key={`${nodeId}-${submodule.submoduleId}`}
                  className="tree-leaf"
                >
                  {submodule.submoduleName}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  return <div className="tree-container">{renderTree(role)}</div>;
};

export default AssignFunctionalityTable;
