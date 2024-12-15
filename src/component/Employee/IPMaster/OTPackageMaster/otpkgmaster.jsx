import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OTPackageMaster.css";

const OTPackageMaster = () => {
  const [packageTableRows, setPackageTableRows] = useState([
    { sn: 1, issuedItemName: "", qty: "" },
  ]);
  const [surgeries, setSurgeries] = useState([]);
  const [additionalItems, setAdditionalItems] = useState([]);
  const [selectedSurgery, setSelectedSurgery] = useState(null);
  const [otPackages, setOtPackages] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [showPackages, setShowPackages] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);

  const API_BASE_URL = "http://192.168.0.106:8080/api";

  // Fetch surgeries, additional items, and OT packages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [surgeriesResponse, additionalItemsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/surgeries`),
          axios.get(`${API_BASE_URL}/add-items`),
        ]);
        setSurgeries(surgeriesResponse.data);
        setAdditionalItems(additionalItemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddRow = () => {
    setPackageTableRows((prevRows) => [
      ...prevRows,
      { sn: prevRows.length + 1, issuedItemName: "", qty: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    if (packageTableRows.length === 1) {
      alert("Only one row remaining. Cannot delete.");
      return;
    }
    setPackageTableRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleSurgeryChange = (surgeryId) => {
    const selected = surgeries.find((surgery) => surgery.surgeryId === parseInt(surgeryId));
    setSelectedSurgery(selected);

    if (selected?.items?.length > 0) {
      setPackageTableRows(
        selected.items.map((item, index) => ({
          sn: index + 1,
          issuedItemName: item.itemName || "Unknown Item",
          qty: "",
        }))
      );
    } else {
      setPackageTableRows([{ sn: 1, issuedItemName: "", qty: "" }]);
    }
  };

  const handleSave = async () => {
    const packageData = {
      templateName,
      surgeries: [
        {
          surgeryId: selectedSurgery?.surgeryId,
        },
      ],
      items: packageTableRows.map((row) => ({
        addItemId: additionalItems.find((item) => item.itemName === row.issuedItemName)?.addItemId,
        qty: row.qty,
      })),
    };

    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/ot-packages/${editingPackageId}`, packageData);
        alert("OT Package updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/ot-packages`, packageData);
        alert("OT Package saved successfully!");
      }

      setIsEditing(false);
      setEditingPackageId(null);
      setTemplateName("");
      setSelectedSurgery(null);
      setPackageTableRows([{ sn: 1, issuedItemName: "", qty: "" }]);
      handleLoadPackages();
    } catch (error) {
      console.error("Error saving OT package:", error);
      alert("Failed to save OT package.");
    }
  };

  const handleLoadPackages = async () => {
    if (showPackages) {
      setShowPackages(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/ot-packages`);
      setOtPackages(response.data);
      setShowPackages(true);
    } catch (error) {
      console.error("Error fetching OT packages:", error);
      alert("Failed to load OT packages.");
    }
  };

  const handleEditPackage = (pkg) => {
    setIsEditing(true);
    setEditingPackageId(pkg.packageId);
    setTemplateName(pkg.templateName);
    const surgery = surgeries.find((s) =>
      pkg.surgeries.some((ps) => ps.surgeryId === s.surgeryId)
    );
    setSelectedSurgery(surgery);
    setPackageTableRows(
      pkg.items.map((item, index) => ({
        sn: index + 1,
        issuedItemName: item.itemName,
        qty: item.qty || "",
      }))
    );
  };

  const handleClear = () => {
    setTemplateName("");
    setSelectedSurgery(null);
    setPackageTableRows([{ sn: 1, issuedItemName: "", qty: "" }]);
    setIsEditing(false);
    setEditingPackageId(null);
  };

  return (
    <div className="otpkgmster-container">
      <div className="otpkgmster-header">
        <h3>OT Package Master</h3>
      </div>

      <div className="otpkgmster-form">
        <label>
          Template Name:
          <input
            type="text"
            className="otpkgmster-input"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </label>
        <label>
          Surgery/Procedure:
          <select
            className="otpkgmster-input"
            value={selectedSurgery?.surgeryId || ""}
            onChange={(e) => handleSurgeryChange(e.target.value)}
          >
            <option value="">Select Surgery</option>
            {surgeries.map((surgery) => (
              <option key={surgery.surgeryId} value={surgery.surgeryId}>
                {surgery.surgeryName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="otpkgmster-table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>SN</th>
            <th>Item Name</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {packageTableRows.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="otpkgmster-buttons">
                  <button className="final-bill-add-btn" onClick={handleAddRow}>
                    Add
                  </button>
                  <button
                    className="final-bill-del-btn"
                    onClick={() => handleDeleteRow(index)}
                  >
                    Del
                  </button>
                </div>
              </td>
              <td>{index + 1}</td>
              <td>
                <select
                  className="otpkgmster-item-input"
                  value={row.issuedItemName}
                  onChange={(e) =>
                    setPackageTableRows((prevRows) =>
                      prevRows.map((r, i) =>
                        i === index
                          ? { ...r, issuedItemName: e.target.value }
                          : r
                      )
                    )
                  }
                >
                  <option value="">Select Item</option>
                  {[...(selectedSurgery?.items || []), ...additionalItems].map((item) => (
                    <option key={item.addItemId || item.itemId} value={item.itemName}>
                      {item.itemName || "Unnamed Item"}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) =>
                    setPackageTableRows((prevRows) =>
                      prevRows.map((r, i) =>
                        i === index ? { ...r, qty: e.target.value } : r
                      )
                    )
                  }
                  placeholder="Enter Qty"
                  className="otpkgmster-qty-input"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="otpkgmster-buttons">
        <button onClick={handleSave}>{isEditing ? "Update" : "Save"}</button>
        <button onClick={handleLoadPackages}>
          {showPackages ? "Unload" : "Load"} Packages
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {showPackages && (
  <div className="otpkgmster-package-table">
    <br />
    <h4>
      <center>Saved OT Packages</center>
    </h4>
    <table className="otpkgmster-table">
      <thead>
        <tr>
          <th>Template Name</th>
          <th>Surgery Name</th>
          <th>Items</th>
          <th>Qty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {otPackages.map((pkg) => (
          <tr key={pkg.packageId}>
            <td>{pkg.templateName}</td>
            <td>{pkg.surgeries.map((s) => s.surgeryName).join(", ")}</td>
            <td>
              {pkg.items.map((item, idx) => (
                <div key={idx}>{item.itemName}</div>
              ))}
            </td>
            <td>
              {pkg.items.map((item, idx) => (
                <div key={idx}>{item.reOrderQuantity}</div>
              ))}
            </td>
            <td>
              <button onClick={() => handleEditPackage(pkg)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};

export default OTPackageMaster;
