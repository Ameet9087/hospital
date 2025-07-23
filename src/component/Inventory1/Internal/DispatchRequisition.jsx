import React, { useState } from "react";
import "./DispatchRequisition.css";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import FloatingInput from "../../../FloatingInputs/FloatingInput";
import FloatingSelect from "../../../FloatingInputs/FloatingSelect";
import { toast } from "react-toastify";
const DispatchRequisition = ({ request,onClose }) => {
  const [items, setItems] = useState(
    request?.requisitionItems?.map((item) => ({
      id: item.id,
      dispatchQuantity: item.dispatchQuantity || 0,
      remark: item.remark || "",
    }))
  );

  const handleInputChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
const handleDispatch = () => {
  // Construct the payload
  const dataToSubmit = {
    status: "Received", // Set your desired status
    remarks: "All items dispatched successfully.", // Set your remarks
    requisitionItems: items.map(({ id, dispatchQuantity, remark }) => ({
      id,
      dispatchQuantity,
      remark,
    })),
  };

  console.log("Data to submit:", dataToSubmit);

  // Send the API request using Axios
  axios
    .put(`${API_BASE_URL}/inventory-requisitions/${request.id}/dispatch-update`, dataToSubmit, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      toast.success("Success:", response.data);
      onClose();
    })
    .catch((error) => {
      toast.error("Error:", error);
    });
};

  

  return (
    <div className="dispatch-container">
      
      <h2 className="dispatch-title">DISPATCH REQUISITION</h2>
      <div className="dispatch-header">
        <div>
        <FloatingInput
      label={"Requisition No"}
      type="text" value={request?.id} readOnly/>
          
        </div>
        <div>
          <FloatingInput
          label={"Store Name"}
          value={request?.subStore?.subStoreName}
          />
         
        </div>
        <div>
          <FloatingInput
          label={"Requested On"}
          type="text" value={request?.requisitionDate} readOnly/>
         
        </div>
      </div>
      <table className="dispatch-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Require Quantity</th>
            <th>Dispatch Quantity</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {request?.requisitionItems?.map((item) => (
            <tr key={item.id}>
              <td>{item?.item?.itemName}</td>
              <td>{item?.requiredQuantity}</td>
              <td>
                <FloatingInput
                min={"0"}
                label={"Quantity"}
                type="number"
                  value={
                    items.find((i) => i.id === item?.id)?.dispatchQuantity || 0
                  }
                  onChange={(e) =>
                    handleInputChange(item?.id, "dispatchQuantity", e.target.value)
                  }/>
                
              </td>
              <td>
                <textarea
                  rows="1"
                  value={items.find((i) => i.id === item?.id)?.remark || ""}
                  onChange={(e) =>
                    handleInputChange(item?.id, "remark", e.target.value)
                  }
                ></textarea>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dispatch-actions">
        <button
          className="dispatch-button green"
          onClick={handleDispatch}
        >
          Dispatch
        </button>
        <button className="dispatch-button red">Discard</button>
      </div>
    </div>
  );
};

export default DispatchRequisition;
