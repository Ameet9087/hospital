import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import "../SSPharmacy/sSPharmacyReqCreateReq.css";
import { API_BASE_URL } from "../../../api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
const SSPharmacyReqCreateReq = ({ onClose }) => {
  const { store } = useParams();

  // General Form States
  const [requisitionDate, setRequisitionDate] = useState("");
  const [issueNo, setIssueNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [needVerification, setNeedVerification] = useState(true);
  const [checkedBy, setCheckedBy] = useState("Mr. admin admin");
  const [chooseItem, setChooseItem] = useState([]);

  // Inventory Item State
  const [item, setItem] = useState({
    itemId: "",
    itemName: "",
    unit: "",
    availableQtyInStore: "",
    requiredQuantity: "",
    remark: "",
    genericName: "",
    batchNo: "",
    expiryDate: "",
    salePrice: "",
  });

  // Array for storing multiple items
  const [itemsList, setItemsList] = useState([]);

  // Fetch items on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/add-item`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChooseItem(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle item selection from dropdown
  const handleItemSelection = (e) => {
    const selectedItemId = e.target.value;
    console.log(selectedItemId);

    // Find the selected item from the chooseItem array
    const selectedItem = chooseItem.find(
      (item) => item.addItemId == selectedItemId
    );

    if (selectedItem) {
      console.log(selectedItem);
      setItem({
        itemId: selectedItem.addItemId || "", // Default to empty string
        itemName: selectedItem?.itemMaster?.itemName || "", // Default to empty string
        unit: selectedItem.itemMaster?.unitsOfMeasurement?.name || "", // Default to empty string
        availableQtyInStore: selectedItem.itemQty || 0, // Default to 0
        requiredQuantity: "", // Keep it empty for user input
        remark: "", // Default to empty string
        genericName: selectedItem.itemMaster?.genericNames?.genericName || "", // Default to empty string
        batchNo: selectedItem.batchNo || "", // Default to empty string
        expiryDate: selectedItem.expiryDate || "", // Default to empty string
        salePrice: selectedItem.salePrice || 0, // Default to 0
      });
    }
  };
  const handleAddItem = () => {
    if (!item.itemId || !item.requiredQuantity) {
      alert("Please select an item and enter required quantity.");
      return;
    }

    setItemsList((prevItems) => [...prevItems, item]);

    // Reset item fields
    setItem({
      itemId: "",
      itemName: "",
      unit: "",
      availableQtyInStore: "",
      requiredQuantity: "",
      remark: "",
      genericName: "",
      batchNo: "",
      expiryDate: "",
      salePrice: "",
    });
  };
  console.log(itemsList);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!issueNo) {
      alert("Issue No is required.");
      return;
    }

    const payload = {
      issueNo: issueNo,
      requestedDate: requisitionDate,
      status: "Pending",
      verifyBy: checkedBy,
      remarks: remarks,
      subStore: {
        subStoreId: store, // Assuming `store` from useParams is equivalent to `subStoreId`
      },
      subPharmRequisitionItems: itemsList.map((item) => ({
        items: {
          addItemId: item.itemId,
        },
        requiredQuantity: Number(item.requiredQuantity),
        dispatchQuantity: 0,
        remark: item.remark,
      })),
    };

    try {
      console.log(payload);

      const response = await fetch(`${API_BASE_URL}/subpharm-requisitions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Requisition submitted successfully:", result);
        toast.success("Requisition submitted successfully!");
        onClose(false); // Close the form/modal
      } else {
        const errorData = await response.json();
        console.error("Failed to submit requisition:", errorData);
        toast.error("Failed to submit requisition. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting requisition:", error);
      alert("An error occurred while submitting the requisition.");
    }
  };
  const handleDiscardChanges = () => {
    setRequisitionDate("");
    setIssueNo("");
    setRemarks("");
    setNeedVerification(true);
    setCheckedBy("Mr. admin admin");
    setItem({
      itemId: "",
      itemName: "",
      unit: "",
      availableQtyInStore: "",
      requiredQuantity: "",
      remark: "",
      genericName: "",
      batchNo: "",
      expiryDate: "",
      salePrice: "",
    });
    setItemsList([]); // Clear added items list
  };

  return (
    <div className="sSPharmacyReqCreateReq-form">
      <h2 className="sSPharmacyReqCreateReq-form-title">Add Requisition</h2>
      <form onSubmit={handleSubmit}>
        {/* General Information */}
        <div className="sSPharmacyReqCreateReq-form-row">
          <div className="sSPharmacyReqCreateReq-form-group">
            <FloatingInput
              label={"Issue No"}
              type="number"
              id="issueNo"
              value={issueNo}
              onChange={(e) => setIssueNo(e.target.value)}
              required
              min="1"
            />
          </div>
          <div className="sSPharmacyReqCreateReq-form-group">
            <FloatingInput
              label={"Requisition Date"}
              type="date"
              id="requisitionDate"
              value={requisitionDate}
              onChange={(e) => setRequisitionDate(e.target.value)}
            />
          </div>
        </div>

        {/* Inventory Item Fields */}
        <table className="sSPharmacyReqCreateReq-inventory-table">
          <thead>
            <tr>
              <th>Item Name *</th>
              <th>Unit *</th>
              <th>Available Qty in Store</th>
              <th>Required Quantity *</th>
              <th>Generic Name</th>
              <th>Batch No</th>
              <th>Expiry Date</th>
              <th>Sale Price</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FloatingSelect
                  label={"Item Name"}
                  name="itemId"
                  value={item.itemId}
                  onChange={handleItemSelection}
                  options={[
                    { value: "", label: "Select Item" },
                    ...chooseItem.map((item) => ({
                      value: item.addItemId,
                      label: item?.itemMaster?.itemName,
                    })),
                  ]}
                />
              </td>

              <td>
                
                <FloatingInput
                  label={"Unit"}
                  type="text"
                  className="SSPharmacy-input"
                  value={item.unit}
                  readOnly
                />
              </td>
              <td>
                
                <FloatingInput
                  label={"Available Qty in Store"}
                  type="number"
                  className="SSPharmacy-input"
                  value={item.availableQtyInStore}
                  readOnly
                />
              </td>
              <td>
                
                <FloatingInput
                  label={"Required Quantity"}
                  type="number"
                  className="SSPharmacy-input"
                  value={item.requiredQuantity}
                  onChange={(e) =>
                    setItem({ ...item, requiredQuantity: e.target.value })
                  }
                  min="1"
                />
              </td>
              <td>
                
                <FloatingInput
                  label={"Generic Name"}
                  type="text"
                  className="SSPharmacy-input"
                  value={item.genericName}
                  readOnly
                />
              </td>
              <td>
                
                 <FloatingInput
                  label={"Batch No"}
                  type="text"
                  className="SSPharmacy-input"
                  value={item.batchNo}
                  readOnly
                />
              </td>
              <td>
                
                <FloatingInput
                  label={"Expiry Date"}
                  type="date"
                  className="SSPharmacy-input"
                  value={item.expiryDate}
                  readOnly
                />
              </td>
              <td>
                
                <FloatingInput
                  label={"Sales Price"}
                  type="number"
                  className="SSPharmacy-input"
                  value={item.salePrice}
                  readOnly
                />
              </td>
              <td>
                
                <FloatingInput
                  label={"Remark"}
                  type="text"
                  className="SSPharmacy-input"
                  value={item.remark}
                  onChange={(e) => setItem({ ...item, remark: e.target.value })}
                />
              </td>
              <td>
                <button type="button" onClick={handleAddItem}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Added Items List */}
        <h3>Added Items</h3>
        <table className="sSPharmacyReqCreateReq-inventory-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Required Quantity</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {itemsList.map((addedItem, index) => (
              <tr key={index}>
                <td>{addedItem.itemName}</td>
                <td>{addedItem.requiredQuantity}</td>
                <td>{addedItem.remark}</td>
                <td>
                  <button
                    onClick={() =>
                      setItemsList(itemsList.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form Actions */}
        <div className="sSPharmacyReqCreateReq-form-actions">
          <button
            type="submit"
            className="sSPharmacyReqCreateReq-submit-button"
          >
            Request
          </button>
          <button
            type="button"
            className="sSPharmacyReqCreateReq-cancel-button"
            onClick={handleDiscardChanges}
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SSPharmacyReqCreateReq;
