import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./cssdkitreturn.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const KitReturnsDetails = () => {
  const { receivingId } = useParams(); // Get the 'receivingId' from the URL

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const [kits, setKits] = useState([]);
  const [search, setSearch] = useState("");
  const [newKit, setNewKit] = useState({
    kitName: "",
    quantity: "",
    returnQty: "",
    remarks: "",
  });

  // Fetch the kit details from the API
  useEffect(() => {
    const fetchKits = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/kit-receiving/${receivingId}`);
        const data = await response.json();
        const kitItems = data?.kitReceivingItems || [];
        setKits(kitItems);
      } catch (error) {
        console.error("Error fetching kit details:", error);
      }
    };

    fetchKits();
  }, [receivingId]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewKit({ ...newKit, [name]: value });
  };

  const handleDeleteRow = (id) => {
    setKits(kits.filter((kit) => kit.id !== id));
  };

  const handleAddRow = () => {
    setKits([
      ...kits,
      {
        id: kits.length + 1,
        kitName: "New Kit",
        batchNo: "",
        returnQty: 1,
        remarks: "",
      },
    ]);
  };

  const filteredKits = kits.filter((kit) =>
    kit.kitName.toLowerCase().includes(search.toLowerCase())
  );

  // Save the kit return details
  const handleSave = async () => {
    // Prepare the data for the POST request
    const requestBody = {
      receivingId: receivingId, // Use the receivingId from the URL
      kitReturnsItems: kits.map((kit) => ({
        kitId: kit.kitMasterId, // Assuming kitMasterId is the kitId
        quantity: kit.receivingQuantity, // Correct field for total quantity
        returnQuantity: kit.returnQty, // Correct field: returnQty (ensure this matches)
        remarks: kit.remarks, // Remarks
      })),
    };

    try {
      // Send POST request to API
      const response = await fetch("http://localhost:8080/api/kit-returns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Handle success
        const data = await response.json();
        console.log("Kit returns saved successfully", data);
        // Display success alert
        alert("Data saved successfully!");
        // You can redirect or show success message here
      } else {
        // Handle failure
        console.error("Error saving kit returns:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <div className="kitreturnrecord-container">
      <div className="kitreturnrecord-header">
        <h2>Kit Return Record</h2>
      </div>
      <div className="kitreturnrecord-search-div">
        <label>Kit Received Id: </label>
        <input
          type="number"
          value={receivingId || "Receiving Id Not Found"}
          onChange={handleSearch}
          className="kitreturnrecord-search"
        />
      </div>

      <table className="kitreturnrecord-table" ref={tableRef}>
        <thead>
          <tr>
            {["SN", "Kit Id", "Kit Name", "Quantity", "Return Quantity", "Remarks", "Actions"].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredKits.length > 0 ? (
            filteredKits.map((kit, index) => (
              <tr key={kit.kitMasterId}>
                <td>{index + 1}</td>
                <td>
                  <input
                    className="tableinput-cssdretirn"
                    type="number"
                    value={kit.kitMasterId}
                  />
                </td>
                <td>
                  <input
                    className="tableinput-cssdretirn"
                    type="text"
                    value={kit.kitName}
                    onChange={(e) =>
                      setKits(
                        kits.map((r) =>
                          r.kitMasterId === kit.kitMasterId
                            ? { ...r, kitName: e.target.value }
                            : r
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="tableinput-cssdretirn"
                    type="text"
                    value={kit.receivingQuantity}
                  />
                </td>
                <td>
                  <input
                    className="tableinput-cssdretirn"
                    type="number"
                    value={kit.returnQty}
                    onChange={(e) => {
                      const newReturnQty = e.target.value;
                      // Ensure returnQty is always a valid number
                      if (!isNaN(newReturnQty) && newReturnQty >= 0) {
                        setKits((prevKits) =>
                          prevKits.map((item) =>
                            item.kitMasterId === kit.kitMasterId
                              ? { ...item, returnQty: Number(newReturnQty) } // Update returnQty
                              : item
                          )
                        );
                      }
                    }}
                  />
                </td>
                <td>
                  <input
                    className="tableinput-cssdretirn"
                    type="text"
                    value={kit.remarks}
                    onChange={(e) =>
                      setKits(
                        kits.map((item) =>
                          item.kitMasterId === kit.kitMasterId
                            ? { ...item, remarks: e.target.value }
                            : item
                        )
                      )
                    }
                    placeholder="Enter Remarks"
                  />
                </td>
                <td>
                  <button className="kitreturnaddbtn" onClick={handleAddRow}>Add</button>
                  <button className="kitreturndelbtn" onClick={() => handleDeleteRow(kit.kitMasterId)}>Del</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="kitreturnrecord-add-row">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default KitReturnsDetails;
