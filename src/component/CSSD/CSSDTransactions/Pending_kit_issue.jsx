import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import './Pending_kit_issue.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from "../../api/api";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import FloatingTextarea from "../../../FloatingInputs/FloatingTextarea";
import { toast } from "react-toastify";

const KitDetailsPage = () => {
  const { id } = useParams(); // Get the bubble ID from the URL
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const requestNumber = queryParams.get("requestNumber");

  const [rows, setRows] = useState([]);
  const [kitDetails, setKitDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [issueTo, setIssueTo] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleClose = () => {
    navigate(-1);
  };

  const handleAddRow = () => {
    const maxId = rows.length > 0 ? Math.max(...rows.map(row => row.id)) : 0;
    const newRow = {
      id: maxId + 1,
      kitId: '',
      batchNo: '',
      reqQty: 0,
      issuedQty: '',
      remarks: '',
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleSave = async () => {
    const formattedData = {
      type: "Medical Kit",
      issueTo,
      remarks,
      kitRequestIndentId: parseInt(id, 10),
      kitDetails: rows.map((row) => ({
        kitdetailsId: row.id,
        kitMasterId: row.kitId,
        batchNumber: row.batchNo,
        reqQuantity: row.quantity,
        issuedQuantity: row.issuedQty,
        // batchQuantity: 100, // Placeholder, replace with actual data if available
        // expiry: "2025-12-31", // Placeholder, replace with actual data if available
        remarks: row.remarks,
      })),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/kit-issues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save data: ${response.statusText}`);
      }

      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please try again.");
    }
  };

  useEffect(() => {
    const fetchKitDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/kit-request-indent/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setKitDetails(data);
        setRows(
          (data.kitRequestItems || []).map((item, index) => ({
            id: index + 1,
            ...item,
          }))
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchKitDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="kit-details-page">
      <div className="CSSDItemMaster-header">
        <div className="CSSDItemMaster-heading">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="back-icon"
            onClick={handleClose}
          />
          <h2 style={{marginLeft: '45%'}}>Kit Issues</h2>
        </div>
      </div>

      <div className="kit-details-header">
        <div>
          <FloatingInput
          label={"Request No"}
          type="text"
            value={requestNumber || "Request Number Not Found"}
            readOnly/>
          
        </div>
        <div>
          <FloatingInput
          label={"Issue To"}
          type="text"
            placeholder="Enter Issue To"
            value={issueTo}
            onChange={(e) => setIssueTo(e.target.value)}/>
         
        </div>
        <div>
          <FloatingInput
          label={"Remarks"}
          type="text"
            placeholder="Enter Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}/>
         
        </div>
      </div>

      <table className="kit-details-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Kit Id</th>
            <th>Kit Name</th>
            <th>Req Qty</th>
            <th>Issued Qty</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <FloatingInput
                label={"Kit ID"}
                type="number"
                  placeholder="Enter Kit Id"
                  value={row.kitId}
                  onChange={(e) =>
                    setRows(
                      rows.map((r) =>
                        r.id === row.id ? { ...r, kitId: e.target.value } : r
                      )
                    )
                  }/>
                
              </td>
              <td>
                <FloatingInput
                label={"Kit Name"}
                type="text"
                  value={row.kitName}
                  onChange={(e) =>
                    setRows(
                      rows.map((r) =>
                        r.id === row.id ? { ...r, kitName: e.target.value } : r
                      )
                    )
                  }
                  readOnly/>
                
              </td>
              <td>
                <FloatingInput
                label={"Req quantity"}
                type="number"
                  placeholder="Enter Req Qty"
                  value={row.quantity}
                  onChange={(e) =>
                    setRows(
                      rows.map((r) =>
                        r.id === row.id ? { ...r, quantity: e.target.value } : r
                      )
                    )
                  }/>
               
              </td>
              <td>
                <FloatingInput
                label={"Issued Quantity"}
                type="number"
                  placeholder="Enter Issued Qty"
                  value={row.issuedQty}
                  onChange={(e) =>
                    setRows(
                      rows.map((r) =>
                        r.id === row.id ? { ...r, issuedQty: e.target.value } : r
                      )
                    )
                  }/>
               
              </td>
              <td>
                <FloatingInput
                label={"Remark"}
                type="text"
                placeholder="Enter Remarks"
                value={row.remarks}
                onChange={(e) =>
                  setRows(
                    rows.map((r) =>
                      r.id === row.id ? { ...r, remarks: e.target.value } : r
                    )
                  )
                }/>
              </td>
              <td>
                <button onClick={handleAddRow}>Add</button>
                <button onClick={() => handleDeleteRow(row.id)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="kit-details-buttons">
        <button onClick={handleSave}>Save</button>
        {/* <button>Delete</button>
        <button>Clear</button> */}
        <button onClick={handleClose}>Close</button>
        {/* <button>Search</button>
        <button>Tracking</button>
        <button>Print</button>
        <button>Version Comparison</button>
        <button>SDC</button>
        <button>Testing</button>
        <button>Info</button> */}
      </div>
    </div>
  );
};

export default KitDetailsPage;
