import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";

const InventoryGrid = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/inventory`);
        setInventoryData(response.data); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle item click
  const handleItemClick = (itemName) => {
    navigate("/CSSDItemMaster", { state: { itemName } });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
        Hello
      {inventoryData.map((item) => (
        <div
          key={item.inventoryId}
          onClick={() => handleItemClick(item.itemName)}
          style={{ padding: "10px", border: "1px solid #ddd", cursor: "pointer" }}
        >
          {item.itemName}
        </div>
      ))}
    </div>
  );
};

export default InventoryGrid;
