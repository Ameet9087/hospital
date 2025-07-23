import React, { useState, useRef, useEffect } from "react";
import "./SecuritygatePassOut.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { FaSearch } from "react-icons/fa";
import PopupTable from "../../../Admission/PopupTable";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../../FloatingInputs";
const SecurityGatePassOut = ({ bookingId }) => {
  const [id, setId] = useState(bookingId || "");
  const [gateno, setGateno] = useState([]);
  const [selectedgateno, setSelectedgateno] = useState({});
  const [columnWidths, setColumnWidths] = useState({});
  const [activePopup, setActivePopup] = useState("");
  const [partsData, setPartsData] = useState([]);
  const tableRef = useRef(null);
  const gateHeading = ["gatePassOutId", "reason", "timePeriod", "authorisedBy"];
  const [gateEntryNo, setGateEntryNo] = useState("");
  const [store, setStore] = useState("");

  const fetchGateNo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/gatePassOut`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setGateno(data);
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };

  const fetchGatePassDetails = async (gatePassId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/gatePassOut/${gatePassId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch gate pass details");
      }
      const data = await response.json();
      setSelectedgateno({
        gatePassOutId: data.gatePassOutId,
        assetNo: data.assetNo || "",
        recommendedBy: data.recommendedBy || "",
        reason: data.reason || "",
        modeOfTransport: data.modeOfTransport || "",
        type: data.type || "",
        gatePassOutDate: data.gatePassOutDate || "",
        gatePassOutTime: data.gatePassOutTime || "",
        timePeriod: data.timePeriod || "",
        preparedBy: data.preparedBy || "",
        receivedBy: data.receivedBy || "",
        authorisedBy: data.authorisedBy || "",
        remark: data.remark || "",
      });

      // Set the parts data
      setPartsData(data.partsDTO || []);
    } catch (error) {
      console.error("Error fetching gate pass details:", error);
    }
  };

  useEffect(() => {
    fetchGateNo();
  }, []);

  const getPopupData = () => {
    if (activePopup === "gateno") {
      return { columns: gateHeading, data: gateno };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();

  const handleSelect = (selectedData) => {
    if (activePopup === "gateno") {
      fetchGatePassDetails(selectedData.gatePassOutId);
    }
    setActivePopup(null);
  };

  const handleAddRow = () => {
    const newRow = {
      partId: "",
      partName: "",
      serialNo: "",
      modelNo: "",
    };
    setPartsData([...partsData, newRow]);
  };

  const handleDeleteRow = (indexToRemove) => {
    const updatedRows = partsData.filter((_, index) => index !== indexToRemove);
    setPartsData(updatedRows);
  };

  const handleSave = async () => {
    const payload = {
      store,
      remarks: selectedgateno.remark,
      gateEntryNo,
      equipmentGatePassOutDTO: {
        gatePassOutId: selectedgateno.gatePassOutId,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/security-gatepass-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      console.log("Data saved successfully:", result);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="SecurityGatePassOut-surgery-Events">
      <div className="SecurityGatePassOut-surgeryEvents-title-bar">
        <div className="SecurityGatePassOut-surgeryEvents-header">
          <span>Security GatePass Out</span>
        </div>
      </div>
      <div className="SecurityGatePassOut-surgeryEvents-content-wrapper">
        <div className="SecurityGatePassOut-surgeryEvents-main-section">
          <div className="SecurityGatePassOut-surgeryEvents-panel dis-templates">
            <div className="SecurityGatePassOut-surgeryEvents-panel-content">
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Gatepass Out No"}
                  type="text"
                  value={selectedgateno.gatePassOutId || ""}
                  onIconClick={() => setActivePopup("gateno")}
                  readOnly
                />
              </div>
            </div>

            <div className="SecurityGatePassOut-surgeryEvents-panel-header">
              EQUIPMENT OUT DETAILS
            </div>

            <div className="SecurityGatePassOut-surgeryEvents-panel-content">
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Store"}
                 type="text"
                 value={store}
                 onChange={(e) => setStore(e.target.value)}
                
                />
              </div>
              <div>
                <FloatingInput
                label={"Gate Entry No"}
                type="text"
                value={gateEntryNo}
                onChange={(e) => setGateEntryNo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="SecurityGatePassOut-surgeryEvents-panel operation-details">
            <div className="SecurityGatePassOut-surgeryEvents-panel-content">
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Recommended By"}
                  type="text"
                  value={selectedgateno.recommendedBy || ""}
                  readOnly
                />
              </div>
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Reason"}
                 type="text"
                 value={selectedgateno.reason || ""}
                 readOnly
                />
              </div>
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Mode Of Transport"}
                  type="text"
                  value={selectedgateno.modeOfTransport || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="SecurityGatePassOut-surgeryEvents-panel operation-details">
            <div className="SecurityGatePassOut-surgeryEvents-panel-content">
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Type"}
                type="text" value={selectedgateno.type || ""} readOnly
                />
              </div>
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Gate Pass Out Date"}
                 type="date"
                 value={selectedgateno.gatePassOutDate || ""}
                 readOnly
                />
              </div>
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Gate Pass Out Time"}
                  type="time"
                  value={selectedgateno.gatePassOutTime || ""}
                  readOnly
                />
              </div>
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Time Period"}
                type="text"
                value={selectedgateno.timePeriod || ""}
                readOnly
                />
              </div>
            </div>
          </div>
          <div className="SecurityGatePassOut-surgeryEvents-panel operation-details">
            <div className="SecurityGatePassOut-surgeryEvents-panel-content">
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Prepared By"}
                  type="text"
                  value={selectedgateno.preparedBy || ""}
                  readOnly
                />
              </div>
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Received By"}
                  type="text"
                  value={selectedgateno.receivedBy || ""}
                  readOnly
                
                />
              </div>
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Authorised"}
                 type="text"
                 value={selectedgateno.authorisedBy || ""}
                 readOnly
                
                />
              </div>
              <div className="SecurityGatePassOut-surgeryEvents-form-row">
                <FloatingInput
                label={"Remarks"}
                  type="text"
                  value={selectedgateno.remark || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="SecurityGatePassOut-surgeryEvents-services-section">
          <div className="SecurityGatePassOut-services-table">
            <div className="SecurityGatePassOut-surgeryEvents-title-bar">
              <div className="SecurityGatePassOut-surgeryEvents-header">
                <span>Item Details</span>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Actions",
                    "Part ID",
                    "Part Name",
                    "Serial No",
                    "Model No.",
                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="resizable-th"
                    >
                      <div className="header-content">
                        <span>{header}</span>
                        <div
                          className="resizer"
                          onMouseDown={startResizing(
                            tableRef,
                            setColumnWidths
                          )(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {partsData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="SecurityGatePassOut-table-actions">
                        <button
                          className="SecurityGatePassOut-surgeryEvents-add-btn"
                          onClick={handleAddRow}
                        >
                          Add
                        </button>
                        <button
                          className="SecurityGatePassOut-surgeryEvents-del-btn"
                          onClick={() => handleDeleteRow(index)}
                          disabled={partsData.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.partId || ""}</td>
                    <td>{row.partName || ""}</td>
                    <td>{row.serialNo || ""}</td>
                    <td>{row.modelNo || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="SecurityGatePassOut-surgeryEvents-action-buttons">
          <button className="SecurityGatePassOut-btn-blue" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
};

export default SecurityGatePassOut;
