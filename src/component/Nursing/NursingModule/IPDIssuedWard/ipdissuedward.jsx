import React, { useState, useEffect } from "react";
import "./IpdIssuedWard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PopupTable from "../Services/PopupTable";
import { API_BASE_URL } from "../../../api/api";
import { useSelector } from "react-redux";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { toast } from "react-toastify";
const calculateTotalAmount = (rows) => {
  return rows.reduce((total, row) => {
    const amount = parseFloat(row.totalAmount) || 0;
    return total + amount;
  }, 0);
};

const IPDIssuesWard = ({ ipAdmission }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [selectedIPNo, setSelectedIPNo] = useState(null);
  const patientData = useSelector((state) => state.patient?.patientData);

  const [subStores, setSubStores] = useState([]);
  const [selectedSubStore, setSelectedSubStore] = useState("");
  const [selectedItemData, setSelectedItemData] = useState({});

  useEffect(() => {
    const fetchSubStores = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/substores/get-all-substores`
        );
        setSubStores(response.data); // Assuming the API returns an array of objects with 'subStoreName'
      } catch (error) {
        console.error("Error fetching sub-stores:", error);
      }
    };

    fetchSubStores();
  }, []);

  const postIssueData = async () => {
    const items = rows.map((row) => ({
      consumedQty: row.issueQty,
      inventoryRequisitionItemId: row.id,
    }));

    console.log("Items Dataaaaaaaaaaaa:", items);

    const issueData = {
      issueQuantity: rows.reduce((sum, row) => sum + Number(row.issueQty), 0),
      subStoreId: selectedSubStore,
      patientId: patientData.ipAdmmissionId,
      totalAmount: rows.reduce(
        (sum, row) => sum + Number(row.totalAmount || 0),
        0
      ),
      items,
    };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/ip-issue-ward`,
        issueData
      );

      console.log("Data posted successfully:", response.data);
      toast.success("Data posted successfully");
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Error posting data. Please check the console for more details.");
    }
  };

  const handleSelectionChange = async (subStoreId) => {
    alert("Selected SubStore ID: " + subStoreId);
    setSelectedSubStore(subStoreId);

    if (subStoreId) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/inventory-requisitions/received?subStoreId=${subStoreId}`
        );
        const transformedData = response.data.map((item) => {
          const packagingType = item.item.packagingType || {};
          const unitOfMeasurement = item.item.unitOfMeasurement || {};
          const subCategory = item.item.subCategory || {};
          const invCompany = item.item.invCompany || {};

          return {
            id: item.id,
            invItemId: item.item.invItemId,
            itemName: item.item.itemName,
            itemCode: item.item.itemCode,
            availableQty: item.item.availableQty,
            standardRate: item.item.standardRate,
            minStockQuantity: item.item.minStockQuantity,
            description: item.item.description,
            inventory: item.item.inventory,
            requiredQuantity: item.requiredQuantity,
            dispatchQuantity: item.dispatchQuantity,
            remark: item.remark,
            packagingTypeName: packagingType.packagingTypeName || "",
            unitOfMeasurementName: unitOfMeasurement.name || "",
            subCategoryName: subCategory.subCategoryName || "",
            companyName: invCompany.companyName || "",
            companyCode: invCompany.code || "",
          };
        });

        setItemCodedata(transformedData);
        alert(JSON.stringify(transformedData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setRows([]);
    }
  };

  const [rows, setRows] = useState([
    {
      id: 1,
      scanCode: "",
      itemName: "",
      pack: "",
      tStock: "",
      bStock: "",
      issueQty: "",
      batchNo: "",
      expiry: "",
    },
  ]);

  const ipnoHeading = [
    "uhid",
    "inPatientId",
    "firstName",
    "lastName",
    "phoneNumber",
    "address",
  ];
  const itemcodeHeading = [
    "invItemId",
    "itemName",
    "standardRate",
    "availableQty",
    "description",
  ];
  const [itemCodedata, setItemCodedata] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState([]);

  const activePatient = useSelector(
    (state) => state?.patient?.patientData?.patient
  );

  const fetchItemCode = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ipd-issue-ward`);
      console.log("Response Data:", response.data);
      const itemCode = response.data.map((code) => {
        const itemDetail = code.itemDetailsDTOs[0].itemDetailIssueWardDTO;
        const taxAmount =
          (parseFloat(itemDetail.tax || 0) *
            parseFloat(itemDetail.taxPercent || 0)) /
          100;
        const totalAmount = parseFloat(itemDetail.mrp || 0) + taxAmount;

        return {
          itemDetailIssueWardId: itemDetail.itemDetailIssueWardId,
          scanCode: itemDetail.scanCode,
          itemName: itemDetail.itemName,
          pack: itemDetail.pack,
          batchNumber: itemDetail.batchNumber,
          expiryDate: itemDetail.expiryDate,
          mrp: itemDetail.mrp,
          tax: itemDetail.tax,
          colTax: itemDetail.collTax,
          taxPercent: itemDetail.taxPercent,
          tstock: itemDetail.tstock,
          bstock: itemDetail.bstock,
          issueQty: code.itemDetailsDTOs[0].issueQty,
          taxAmount: taxAmount.toFixed(2),
          totalAmount: totalAmount.toFixed(2),
        };
      });
      console.log("Mapped Item Code:", itemCode);
    } catch (error) {
      console.error("Error Fetching item codes:", error);
    }
  };

  const updateIssueQty = (itemId, value) => {
    const updatedRows = rows.map((row) => {
      if (row.itemDetailIssueWardId === itemId) {
        const issueQty = parseFloat(value) || 0;
        const mrp = parseFloat(selectedItemCode.standardRate || 0);
        const discount = parseFloat(selectedItemCode.discount || 0);
        const taxPercent = parseFloat(selectedItemCode.taxPercent || 0);
        const subtotal = (mrp - discount) * issueQty;
        const taxAmount = (subtotal * taxPercent) / 100;
        const totalAmount = subtotal + taxAmount;

        return {
          ...row,
          issueQty,
          totalAmount: totalAmount.toFixed(2),
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const updateTax = (itemId, taxAmtInput) => {
    const updatedRows = rows.map((row) => {
      if (row.itemDetailIssueWardId === itemId) {
        const taxPercent = parseFloat(taxAmtInput) || 0;
        const issueQty = parseFloat(row.issueQty) || 0;
        const mrp = parseFloat(selectedItemCode.standardRate) || 0;
        const discount = parseFloat(selectedItemCode.discount) || 0;
        const taxAmount = (issueQty * mrp * taxPercent) / 100;
        const totalAmount = issueQty * mrp - discount + taxAmount;

        return {
          ...row,
          tax: taxPercent,
          colTax: taxAmount.toFixed(2),
          totalAmount: totalAmount.toFixed(2),
        };
      }
      return row;
    });

    setRows(updatedRows); // Update state with modified rows
  };

  // const updateFinancial=(itemId,totalAmount){}

  // useEffect(() => {
  //   fetchItemCode();
  // }, []);

  // useEffect(() => {
  //   console.log("Updated itemCodedata:", itemCodedata);
  // }, [itemCodedata]);

  // Handle popup data
  const handleSelect = (data) => {
    if (activePopup === "IpNo") {
      setSelectedIPNo(data);
    } else if (activePopup === "ItemCode") {
      setSelectedItemCode({
        invItemId: data.invItemId,
        itemName: data.itemName,
        itemCode: data.itemCode,
        availableQty: data.availableQty,
        standardRate: data.standardRate,
        minStockQuantity: data.minStockQuantity,
        description: data.description,
        inventory: data.inventory,
        requiredQuantity: data.requiredQuantity,
        dispatchQuantity: data.dispatchQuantity,
        remark: data.remark,
        packagingTypeName: data.packagingTypeName,
        unitOfMeasurementName: data.unitOfMeasurementName,
        subCategoryName: data.subCategoryName,
        companyName: data.companyName,
        companyCode: data.companyCode,
      });
    }
    setActivePopup(null);
  };

  const [formData, setFormData] = useState({
    totalAmount: 0,
    lessDiscount: 0,
    netAmount: 0,
    taxAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
    currentDue: 0,
    remarks: "",
    amountInWords: "",
  });

  useEffect(() => {
    const totalAmount = calculateTotalAmount(rows);
    setFormData((prevData) => ({
      ...prevData,
      totalAmount,
    }));
  }, [rows]);

  const getPopupData = () => {
    if (activePopup === "IpNo") {
      return { columns: ipnoHeading, data: activePatient };
    } else if (activePopup === "ItemCode") {
      console.log("Returning ItemCode data:", itemCodedata); // Add logging here
      return { columns: itemcodeHeading, data: itemCodedata };
    } else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        scanCode: "",
        itemName: "",
        pack: "",
        tStock: "",
        bStock: "",
        issueQty: "",
        batchNo: "",
        expiry: "",
      },
    ]);
  };

  // Delete a row
  const deleteRow = (id) => {
    if (rows.length === 1) {
      alert("Cannot delete the last row!");
      return;
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="ipd-issues-ward-container">
      <h6>
        <center>
          <b>IPD Issues Ward</b>
        </center>
      </h6>

      <h6>
        <b>Patient Details</b>
      </h6>
      <div className="patient-details">
        <div className="detail">
          <FloatingInput label={"Issue No"} type="text" />
        </div>
        <div className="detail">
          <FloatingSelect
            label={"Issue Type"}
            options={[{ label: "Direct", value: "Direct" }]}
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"IP No"}
            type="text"
            value={patientData?.ipAdmmissionId || ipAdmission?.ipAdmmissionId}
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label="Patient Name"
            type="text"
            value={`${
              patientData?.patient?.firstName ||
              ipAdmission?.patient?.patient?.firstName
            } ${
              patientData?.patient?.lastName ||
              ipAdmission?.patient?.patient?.lastName
            }`}
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Age "}
            type="text"
            value={
              patientData?.patient?.age || ipAdmission?.patient?.patient?.age
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Sex"}
            type="text"
            value={
              patientData?.patient?.gender ||
              ipAdmission?.patient?.patient?.gender
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Relative Name"}
            type="text"
            value={
              patientData?.patient?.guarantorDTO?.relationWithPatient ||
              ipAdmission?.patient?.patient?.relationName
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Doctor Name"}
            type="text"
            value={
              patientData?.admissionUnderDoctorDetail?.consultantDoctor
                ?.doctorName ||
              ipAdmission?.admissionUnderDoctorDetail?.consultantDoctor
                ?.doctorName
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Unit Name"}
            type="text"
            value={
              patientData?.admissionUnderDoctorDetail?.unitMaster ||
              ipAdmission?.admissionUnderDoctorDetail?.unitMaster ||
              ""
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Mobile Number"}
            type="text"
            value={
              patientData?.patient?.phoneNumber ||
              ipAdmission?.patient?.patient?.mobileNumber
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingSelect
            label={"Type"}
            options={[{ label: "General", value: "General" }]}
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Bed No"}
            type="text"
            value={
              patientData?.roomDetails?.bedDTO?.bedNo ||
              ipAdmission?.roomDetails?.bedDTO?.bedNo
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Room No"}
            type="text"
            value={
              patientData?.roomDetails?.roomDTO?.roomNumber ||
              ipAdmission?.roomDetails?.roomDTO?.roomNumber
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Floor No"}
            type="text"
            value={
              patientData?.roomDetails?.floorDTO?.floorNumber ||
              ipAdmission?.roomDetails?.floorDTO?.floorNumber
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Room Type"}
            type="text"
            value={
              patientData?.roomDetails?.roomTypeDTO?.type ||
              ipAdmission?.roomDetails?.roomTypeDTO?.type
            }
            disabled
          />
        </div>

        <div className="detail">
          <FloatingInput
            label={"Pay Type"}
            type="text"
            value={
              patientData?.roomDetails?.payTypeDTO?.payTypeName ||
              ipAdmission?.roomDetails?.payTypeDTO?.payTypeName
            }
            disabled
          />
        </div>
        <div className="detail">
          <FloatingSelect
            label="Select Sub-Store"
            name="subStore"
            value={selectedSubStore}
            onChange={(e) => handleSelectionChange(e.target.value)}
            options={[
              { value: "", label: "-- Select Sub-Store --" },
              ...subStores.map((store) => ({
                value: store.subStoreId,
                label: store.subStoreName,
              })),
            ]}
          />
        </div>
      </div>

      <div className="subStoreDropdown-div"></div>
      <div className="item-details">
        <h6>
          <b>Item Details</b>
        </h6>

        <table className="item-table">
          <thead>
            <tr>
              <th>Add</th>
              <th>Del</th>
              <th>invItemId</th>
              <th>Item Name</th>
              <th>description</th>
              <th>availableQty</th>
              {/* <th>BStock</th> */}
              <th>Issue Qty</th>
              <th>itemCode</th>
              {/* <th>Expiry</th> */}
              <th>standardRate</th>
              {/* <th>Discount</th> */}
              <th>Tax %</th>
              <th>Tax Amount</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>
                  {index === rows.length - 1 && (
                    <button onClick={addRow} className="add-button">
                      Add
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deleteRow(row.id)}
                    className="delete-button"
                  >
                    Del
                  </button>
                </td>
                <td>
                  <FloatingInput
                    label={"invItemId"}
                    type="text"
                    value={selectedItemCode.invItemId || ""}
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"itemName"}
                    type="search"
                    value={selectedItemCode.itemName || ""}
                    onIconClick={() => setActivePopup("ItemCode")}
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"description"}
                    type="text"
                    value={selectedItemCode?.description || ""}
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"Available Quantity"}
                    type="text"
                    value={selectedItemCode.dispatchQuantity || "0"}
                  />
                </td>
                {/* <td>
                  <input type="text" value={selectedItemCode.bStock || "0"} />
                </td> */}
                <td>
                  {/* <input type="text" value={row.issueQty || ''} onChange={(e) => updateIssueQty(row.itemDetailIssueWardId, e.target.value)} /> */}

                  <FloatingInput
                    label={"Issue Qty"}
                    type="number"
                    min="0"
                    value={row.issueQty || ""}
                    onChange={(e) =>
                      updateIssueQty(row.itemDetailIssueWardId, e.target.value)
                    }
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"Item Code"}
                    type="text"
                    value={selectedItemCode.itemCode || ""}
                  />
                </td>
                {/* <td>
                  <input type="text" value={selectedItemCode.expiry || ""} />
                </td> */}

                <td>
                  <FloatingInput
                    label={"Standard Rate"}
                    type="text"
                    value={selectedItemCode.standardRate || ""}
                  />
                </td>
                {/* <td><input type='text' value={row.tax || ''} onChange={(e)=>updateTax(row.itemDetailIssueWardId,e.target.value)} /></td> */}
                {/* <td><input type="text" value={row.discount || ''} /></td> */}
                <td>
                  <FloatingInput
                    label={"Tax"}
                    type="text"
                    value={row.tax || ""}
                    onChange={(e) =>
                      updateTax(row.itemDetailIssueWardId, e.target.value)
                    }
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"Tax Amount"}
                    type="text"
                    value={row.colTax || ""}
                    readOnly
                  />
                </td>

                {/* <td><input type="text" value={selectedItemCode.taxPercent || ''} /></td> */}
                <td>
                  <FloatingInput
                    label={"Total Amount"}
                    type="text"
                    value={row.totalAmount || ""}
                    onChange={(e) =>
                      updateFinancial(row.itemDetailIssueWardId, e.target.value)
                    }
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />

      {/* Financial Details */}
      <h6>
        <b>Financial Details</b>
      </h6>
      <div className="ipdissuedward-form">
        {[
          { label: "Total Amount", name: "totalAmount" },
          { label: "Less Discount", name: "lessDiscount" },
          { label: "Net Amount", name: "netAmount" },
          { label: "Tax Amount", name: "taxAmount" },
          { label: "Paid Amount", name: "paidAmount" },
          { label: "Due Amount", name: "dueAmount" },
          { label: "Current Due", name: "currentDue" },
          { label: "Remarks", name: "remarks" },
          { label: "Amount in Words", name: "amountInWords", readOnly: true },
        ].map((field, index) => (
          <div key={index} className="ipdissuedward-section">
            <FloatingInput
              label={field.label}
              type="text"
              name={field.name}
              value={
                field.name === "totalAmount"
                  ? formData.totalAmount
                  : formData[field.name]
              }
              readOnly={field.readOnly || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: e.target.value,
                }))
              }
            />
          </div>
        ))}
      </div>

      <div className="ipdissuedward-buttons">
        <button className="postIssue-buttons" onClick={postIssueData}>
          Post Data
        </button>
      </div>
      <br />

      {/* Popup for IP Number selection */}
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(null)}
        />
      )}
    </div>
  );
};

export default IPDIssuesWard;
