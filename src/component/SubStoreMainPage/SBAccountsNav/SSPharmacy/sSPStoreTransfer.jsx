/* Ajhar tamboli sSPStoreTransfer.jsx 19-09-24 */


import React, { useEffect, useState } from 'react'
import "../SSPharmacy/sSPStoreTransfer.css"
import { API_BASE_URL } from '../../../api/api';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PopupTable from '../../../Admission/PopupTable';
import axios from 'axios';
import CustomModal from '../../../../CustomModel/CustomModal';
function SSPStoreTransfer() {
  const { store } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [packageTableRows, setPackageTableRows] = useState([{
    sn: 1,
    itemName: "",
    genericName: "",
    batchNo: "",
    costprice: "",
    availableQuantity: "",
    returnQuantity: "",
    quantity: "",
    expiryDate: "",
    isSelected: false,
  }]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows for transfer
  const [receivedBy, setReceivedBy] = useState(""); // Received By field value

  const handleAddRow = () => {
    setPackageTableRows((prev) => [
      ...prev,
      {
        sn: prev.length + 1,
        itemName: "",
        genericName: "",
        batchNo: "",
        costprice: "",
        availableQuantity: "",
        returnQuantity: "",
        quantity: "",
        expiryDate: "",
        isSelected: false,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setPackageTableRows((prev) =>
      prev.filter((_, i) => i !== index).map((row, i) => ({ ...row, sn: i + 1 }))
    );
  };

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    const updatedRows = packageTableRows.map(row => ({
      ...row,
      isSelected: !selectAll,
    }));
    setPackageTableRows(updatedRows);
  };

  const handleRowCheckboxChange = (index, checked) => {
    const updatedRows = [...packageTableRows];
    updatedRows[index].isSelected = checked;
    setPackageTableRows(updatedRows);

    if (checked) {
      setSelectedRows(prev => [...prev, updatedRows[index]]);
    } else {
      setSelectedRows(prev => prev.filter(row => row.sn !== updatedRows[index].sn));
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedRows = [...packageTableRows];
    updatedRows[index].quantity = value;
    setPackageTableRows(updatedRows);
  };

  const handleReturnQuantityChange = (index, value) => {
    const updatedRows = [...packageTableRows];
    updatedRows[index].returnQuantity = value;
    const availableQuantity = updatedRows[index].availableQuantity || 0;
    updatedRows[index].quantity = availableQuantity - value;
    setPackageTableRows(updatedRows);
  };

  const handleTransfer = () => {
    if (selectedRows.length > 0) {
      setShowModal(true);
    } else {
      alert('Please select at least one row');
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleReceivedByChange = (event) => {
    setReceivedBy(event.target.value); // Update receivedBy when the input changes
  };

  const handleConfirmTransfer = async () => {
    if (!receivedBy.trim()) {
      alert("Please enter the 'Received By' information.");
      return;
    }

    const transferDate = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const transferType = "Internal"; // Set this according to your transfer type
    const transferItemDTOs = selectedRows.map(row => ({
      returnQty: row.returnQuantity,
      subPharmRequisitionItemDTO: {
        subPharmRequisitionItemId: row.sn, // Using row.sn as ID
      }
    }));

    const payload = {
      transferDate,
      transferType,
      recievedBy: receivedBy,
      status: "Received",
      transferItemDTOs,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/store-transfers`,
        payload
      );
      console.log('Transfer successful:', response.data);
      alert('Transfer successful!');
      setShowModal(false); // Close the modal after successful transfer
    } catch (error) {
      console.error('Error posting transfer data:', error);
      alert('Transfer failed, please try again.');
    }
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/subpharm-requisitions/requisition-items?subStoreId=${store}`
        );
        console.log(response.data);
        setItemData(response.data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  const handleSelect = (data) => {
    if (activePopup === "ItemName" && activeRowIndex !== null) {
      const updatedRows = [...packageTableRows];
      updatedRows[activeRowIndex].itemName = data?.itemName || "";
      updatedRows[activeRowIndex].genericName = data?.genericName || "";
      updatedRows[activeRowIndex].batchNo = data?.batchNo || "";
      updatedRows[activeRowIndex].expiryDate = data?.expiryDate || "";
      updatedRows[activeRowIndex].availableQuantity = data?.availableQuantity || "";
      updatedRows[activeRowIndex].costprice = data?.costprice || "";
      setPackageTableRows(updatedRows);
    }
    setActivePopup(null);
    setActiveRowIndex(null);
  };

  const getPopupData = () => {
    if (activePopup === "ItemName") {
      return {
        columns: ["itemName", "genericName", "batchNo"],
        data: Array.isArray(itemData)
          ? itemData.map((item) => ({
            itemName: item?.items?.itemMaster?.itemName || "N/A",
            genericName: item?.items?.itemMaster?.genericNames?.genericName || "N/A",
            batchNo: item?.items?.batchNo || "N/A",
            expiryDate: item?.items?.expiryDate || "N/A",
            availableQuantity: item?.items?.itemQty || "N/A",
            costprice: item?.items?.salePrice || "N/A",
          }))
          : [],
      };
    }
    return { columns: [], data: [] };
  };

  const { columns, data } = getPopupData();

  return (
    <div className='NormalTransfer-container'>
      <div className="NormalTransfer-header">
        <div className="NormalTransfer-data">
          <label>Transfer Type</label>
          <select name="transferType" id="transferType">
            <option value="">Select Transfer Type</option>
            <option value="NormalTransfer">Normal Transfer</option>
            <option value="tt">TT</option>
          </select>
        </div>
        <div className="NormalTransfer-data">
          <label>Transfer Date</label>
          <input type="date" />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Action</th>
            <th>SN</th>
            <th>Item Name</th>
            <th>Generic Name</th>
            <th>Batch No</th>
            <th>Cost Price</th>
            <th>Available Quantity</th>
            <th>Return Quantity</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {packageTableRows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={row.isSelected || false}
                  onChange={(e) => handleRowCheckboxChange(index, e.target.checked)}
                />
              </td>
              <td className='NormalTransfer-actions'>
                <button className="NormalTransfer-add-btn" onClick={handleAddRow}>Add</button>
                <button
                  onClick={() => handleDeleteRow(index)}
                  disabled={packageTableRows.length <= 1}
                  className="NormalTransfer-del-btn"
                >
                  Delete
                </button>
              </td>
              <td>{row.sn}</td>
              <td>
                {row.itemName}
                <FontAwesomeIcon
                  className="NormalTransfer-search-icon"
                  icon={faSearch}
                  onClick={() => {
                    setActivePopup("ItemName");
                    setActiveRowIndex(index);
                  }}
                />
              </td>
              <td>{row.genericName}</td>
              <td>{row.batchNo}</td>
              <td>{row.costprice}</td>
              <td>{row.availableQuantity}</td>
              <td>
                <input
                  type="number"
                  value={row.returnQuantity}
                  onChange={(e) => handleReturnQuantityChange(index, e.target.value)}
                />
              </td>
              <td>{row.quantity}</td>
              <td>{row.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='NormalTransfer-footer'>
        <button className='NormalTransfer-button' onClick={handleTransfer}>Transfer</button>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => {
            setActivePopup(null);
            setActiveRowIndex(null);
          }}
        />
      )}

      {showModal && (
        <CustomModal isOpen={showModal} onClose={handleClose} >
          <div className='NormalTransfer-Custom'>
            <table>
              <thead>
                <tr>
                  <th>Expiry Date</th>
                  <th>Item Name</th>
                  <th>Batch No</th>
                  <th>Return Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.expiryDate}</td>
                    <td>{row.itemName}</td>
                    <td>{row.batchNo}</td>
                    <td>{row.returnQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='NormalTransfer-receivedBy'>
              <label>Received By</label>
              <input
                type="text"
                required
                value={receivedBy}
                onChange={handleReceivedByChange}
              />
            </div>
            <div className='NormalTransfer-footer'>
              <button className='NormalTransfer-button' onClick={handleConfirmTransfer}>Confirm Transfer</button>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default SSPStoreTransfer