import React, { useRef, useEffect, useState } from "react";
import "./FinalSaleByAccountsPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../../FloatingInputs";
import { toast } from "react-toastify";
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
        toast.success("Final Sale added successfully");
      } else {
        console.error("Failed to add Final Sale:", await response.text());
        toast.error("Failed to add Final Sale");
      }
    } catch (error) {
      toast.error("Error adding Final Sale:", error);
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
            <FloatingSelect
  label={"Provisional Sale No"}
  value={selectedProvisionalSale}
  onChange={handleProvisionalSaleChange}
  options={[
    { value: "", label: "Select Provisional Sale No", disabled: true }, // Default option
    ...provisionalSales.map((provisionalSale) => ({
      value: provisionalSale.provisionalSaleId,
      label: provisionalSale.provisionalSaleId, // Display sale ID
    })),
  ]}
/>

            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Manual Sale No"}
              name="manualSaleNo" value={formDetails.manualSaleNo} onChange={handleFormChange} type="text"/>
              
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Actual Sale Date"}
              name="actualSaleDate" onChange={handleFormChange} type="date"/>
              
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">

            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Condemnation Date"}
              value={formDetails.condemnationDate} type="text"/>
             
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Equipment Name"}
              type="text" value={formDetails.equipmentName}/>
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Asset No"}
              type="text" value={formDetails.assetNo}/>
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Serial No"}
              type="text" value={formDetails.serialNo}/>
             
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Cost"}
              type="number" value={formDetails.cost}/>
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Quantity"}
              type="number"
              value={formDetails.quantity}/>
             
            </div>
          </div>


          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Model No"}
              type="text" value={formDetails.modelNo}/>
            
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Category"}
              type="text" value={formDetails.category}
              />
             
            </div>

            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Depreciation"}
              type="number" value={formDetails.depreciation}/>
              
            </div>

          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Responsibility Person"}
              type="text" value={formDetails.responsibilityPerson}/>
              
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Location"}
              type="text" value={formDetails.location} />
            
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Company Brand"}
              type="text" value={formDetails.companyBrand}
              />
              
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Purchase Date"}
              type="date"
              value={formDetails.purchaseDate}/>
            
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Purchase Amount"}
              type="number"
              value={formDetails.purchaseAmount}/>
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Write Down Value"}
              type="number" value={formDetails.writeDownValue}/>
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Buyer Name"}
              type="text"
              value={formDetails.buyerName}/>
              
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Sale Price"}
              name="salePrice" onChange={handleFormChange} type="number"/>
              
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"GST Amount"}
              name="gstAmount" onChange={handleFormChange} type="number" 
              value={formDetails.gstAmount}/>
             
            </div>
          </div>
          <div className="FinalSaleByAccountsPopUp-form-group-1row">
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Net Sale Price"}
               name="netSalePrice" onChange={handleFormChange} 
               type="number"
               value={formDetails.netSalePrice}/>
              
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Profit or Loss Amount"}
              name="profitOrLoss" onChange={handleFormChange} type="number"
              value={formDetails.profitOrLoss}/>
            </div>
            <div className="FinalSaleByAccountsPopUp-form-group">
              <FloatingInput
              label={"Description"}
              value={formDetails.description}/>
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

