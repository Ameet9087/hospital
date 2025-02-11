import React, { useRef, useEffect, useState } from "react";
import "./FinalSaleByAccountsPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../../api/api";
const FinalSaleByAccountsPopUp = ({ onClose }) => {




  const [selectedTab, setSelectedTab] = useState("itemDetails");
  const [columnWidths, setColumnWidths] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const tableRef = useRef(null);

  const [equipmentDetails, setEquipmentDetails] = useState({
    equipmentName: "",
    assetNo: "",
    serialNo: "",
    condemnationDate: ""
  });

  const [formDetails, setFormDetails] = useState({
    manualSaleNo: "",
    provisionalSaleNo: "",
    saleDate: "",
    condemnationDate: "",
    equipmentName: "",
    assetNo: "",
    serialNo: "",
    cost: "",
    quantity: "",
    modelNo: "",
    category: "",
    depreciation: "",
    responsibilityPerson: "",
    location: "",
    companyBrand: "",
    purchaseDate: "",
    purchaseAmount: "",
    writeDownValue: "",
    buyerName: "",
    salePrice: "",
    gstAmount: "",
    netSalePrice: "",
    profitOrLoss: "",
    description: "",
  });

  const [provisionalSales, setProvisionalSales] = useState([]);
  const [selectedProvisionalSale, setSelectedProvisionalSale] = useState("");

  useEffect(() => {
    const fetchProvisionalSales = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/provisional-sales`); // Replace with your API URL
        const data = await response.json();
        setProvisionalSales(data); // Assuming the API returns an array of category objects



      } catch (error) {
        console.error("Error fetching Approvers:", error);
      }
    };

    fetchProvisionalSales();
  }, []);


  const handleProvisionalSaleChange = (event) => {
    setSelectedProvisionalSale(event.target.value);
  };

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      if (selectedProvisionalSale) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/provisional-sales/${selectedProvisionalSale}`
          );
          const data = await response.json();
          const { condemnationDisposalDTO, saleDate, writeDownValue, manualSaleBillNo } = data;



          const { equipmentMasterDTO } = condemnationDisposalDTO.condemnationDisposalRequestDTO;

          // Populate form details with the fetched data
          setFormDetails({
            manualSaleNo: data.manualSaleBillNo,
            provisionalSaleNo: selectedProvisionalSale,
            saleDate: saleDate,
            condemnationDate: condemnationDisposalDTO.condemDate, // Verify this
            equipmentName: equipmentMasterDTO.equipmentName,
            assetNo: equipmentMasterDTO.assetNo,
            serialNo: equipmentMasterDTO.serialNo,
            modelNo: equipmentMasterDTO.modelNo, // Not provided in the response, modify if required
            cost: equipmentMasterDTO.netValue,
            quantity: "", // Assuming quantity as 1 by default, you can change this logic
            category: equipmentMasterDTO.assetCateMasterDTO.assetCategory, // Not provided in the response, modify if required
            depreciation: equipmentMasterDTO.assetCateMasterDTO.depreciation, // Not provided in the response, modify if required
            responsibilityPerson: equipmentMasterDTO.employee.firstName, // Not provided in the response, modify if required
            location: equipmentMasterDTO.assetLocationMaster.subLocation, // Not provided in the response, modify if required
            companyBrand: equipmentMasterDTO.companyBrand, // Not provided in the response, modify if required
            writeDownValue: data.writeDownValue
          });


        } catch (error) {
          console.error("Error fetching equipment details:", error);
        }
      }
    };

    fetchEquipmentDetails();
  }, [selectedProvisionalSale]);

  const handleFormChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };


  const handleAddClick = async () => {
    const finalSaleData = {
      manualSaleNo: formDetails.manualSaleNo,
      actualSaleDate: formDetails.actualSaleDate,
      salePrice: Number(formDetails.salePrice),
      gstAmount: Number(formDetails.gstAmount),
      netSalePrice: Number(formDetails.netSalePrice),
      profitOrLossAmount: Number(formDetails.profitOrLoss),
      provisionalSaleDTO: {
        provisionalSaleId: Number(selectedProvisionalSale),
      },
    };



    try {
      const response = await fetch(`${API_BASE_URL}/final-sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalSaleData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Final Sale added successfully");
      } else {
        console.error("Failed to add Final Sale:", await response.text());
        alert("Failed to add Final Sale");
      }
    } catch (error) {
      console.error("Error adding Final Sale:", error);
    }
  };


  // ===================================================================
  return (
    <div
      className="FinalSaleByAccountsPopUp-container"
    >
      <div className="FinalSaleByAccountsPopUp-header">
        <h4>Final Sale By Accounts</h4>
        {/* <button className="FinalSaleByAccountsPopUp-close-btn" onClick={onClose}>
          X
        </button> */}
      </div>
      <div className="FinalSaleByAccountsPopUp-form">
        <div className="FinalSaleByAccountsPopUp-form-row">
          <div className="FinalSaleByAccountsPopUp-form-group-1row">


            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="provisional-sale-no">Provisional Sale No:</label>
              <select
                value={selectedProvisionalSale}
                onChange={handleProvisionalSaleChange}
              >
                <option value="" disabled>Select Provisional Sale No</option>
                {provisionalSales.map((provisionalSale) => (
                  <option key={provisionalSale.provisionalSaleId} value={provisionalSale.provisionalSaleId}>
                    {provisionalSale.provisionalSaleId}
                  </option>
                ))}
              </select>
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="manual-sale-no">Manual Sale No:</label>
              <input id="manual-sale-no" name="manualSaleNo" value={formDetails.manualSaleNo} onChange={handleFormChange} type="text" placeholder="Enter Manual Sale No" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="actual-sale-date">Actual Sale Date:</label>
              <input id="actual-sale-date" name="actualSaleDate" onChange={handleFormChange} type="date" />
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">

            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="condemnation-date">Condemnation Date:</label>
              <input id="condemnation-date" value={formDetails.condemnationDate} type="text" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="equipment-name">Equipment Name:</label>
              <input id="equipment-name" type="text" value={formDetails.equipmentName} placeholder="Enter Equipment Name" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="asset-no">Asset No:</label>
              <input id="asset-no" type="text" value={formDetails.assetNo} placeholder="Enter Asset No" />
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="serial-no">Serial No.:</label>
              <input id="serial-no" type="text" value={formDetails.serialNo} placeholder="Enter Serial No" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="cost">Cost:</label>
              <input id="cost" type="number" value={formDetails.cost} placeholder="Enter Cost" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input id="quantity" type="number" placeholder="Enter Quantity" />
            </div>
          </div>


          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="model-no">Model No.:</label>
              <input id="model-no" type="text" value={formDetails.modelNo} placeholder="Enter Model No" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="category">Category:</label>
              <input id="category" type="text" value={formDetails.category} placeholder="Enter Category" />
            </div>

            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="depreciation">Depreciation:</label>
              <input id="depreciation" type="number" value={formDetails.depreciation} placeholder="Enter Depreciation" />
            </div>

          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="responsibility-person">Responsibility Person:</label>
              <input id="responsibility-person" type="text" value={formDetails.responsibilityPerson} placeholder="Enter Responsibility Person" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="location">Location:</label>
              <input id="location" type="text" value={formDetails.location} placeholder="Enter Location" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="company-brand">Company Brand:</label>
              <input id="company-brand" type="text" value={formDetails.companyBrand} placeholder="Enter Company Brand" />
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="purchase-date">Purchase Date:</label>
              <input id="purchase-date" type="date" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="purchase-amount">Purchase Amount:</label>
              <input id="purchase-amount" type="number" placeholder="Enter Purchase Amount" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="write-down-value">Write Down Value:</label>
              <input id="write-down-value" type="number" value={formDetails.writeDownValue} placeholder="Enter Write Down Value" />
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="buyer-name">Buyer Name:</label>
              <input id="buyer-name" type="text" placeholder="Enter Buyer Name" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="sale-price">Sale Price:</label>
              <input id="sale-price" name="salePrice" onChange={handleFormChange} type="number" placeholder="Enter Sale Price" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="gst-amount">GST Amount:</label>
              <input id="gst-amount" name="gstAmount" onChange={handleFormChange} type="number" placeholder="Enter GST Amount" />
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="net-sale-price">Net Sale Price:</label>
              <input id="net-sale-price" name="netSalePrice" onChange={handleFormChange} type="number" placeholder="Enter Net Sale Price" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="profit-or-loss">Profit or Loss Amount:</label>
              <input id="profit-or-loss" name="profitOrLoss" onChange={handleFormChange} type="number" placeholder="Enter Profit or Loss Amount" />
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <label htmlFor="description">Description:</label>
              <input id="description" placeholder="Enter Description" />
            </div>
          </div>

        </div>
      </div>




      <div className="FinalSaleByAccountsPopUp-form-actions">
        <button
          className="FinalSaleByAccountsPopUp-add-btn"
          onClick={handleAddClick}
        >
          Add
        </button>
        <button className="FinalSaleByAccountsPopUp-close-btn" onClick={onClose}>Close</button>
      </div>

    </div>
  );
};

export default FinalSaleByAccountsPopUp;

