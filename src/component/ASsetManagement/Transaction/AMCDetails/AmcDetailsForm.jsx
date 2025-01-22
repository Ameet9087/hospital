import React, { useState, useEffect, useRef } from 'react';
import './AmcDetailsForm.css';
import { API_BASE_URL } from '../../../api/api';
import PopupTable from '../../../Admission/PopupTable';
import { startResizing } from '../../../../TableHeadingResizing/resizableColumns';

const AmcDetailsForm = () => {

    const [insuranceData, setInsuranceData] = useState({
        insurance: "Yes"
    })

    const [formData, setFormData] = useState({
        contractType: 'AMC',
        manualContractNo: '',
        contractFrom: '',
        contractTo: '',
        costOfContract: '',
        contractOfAmc: '',
        insuranceAndWarrantyDetails: ''
    });



    const [selectedTab, setSelectedTab] = useState('accessories');

    const [equipments, setEquipments] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]);

    const [accessoriesItems, setAccessoriesItems] = useState([]);
    const [selectedAccessoriesItem, setSelectedAccessoriesItem] = useState([]);

    const [coverdItems, setCoverdItems] = useState([]);
    const [selectedCoveredItem, setSelectedCoveredItem] = useState([]);

    const [unCoverdItems, setUnCoverdItems] = useState([]);
    const [selectedUnCoveredItem, setSelectedUnCoveredItem] = useState([]);

    const [insurances, setInsurances] = useState([]);
    const [selectedInsurances, setSelectedInsurances] = useState([]);



    const [proposalAMCRenewals, setProposalAMCRenewals] = useState([]);
    const [selectedProposalAMCRenewal, setSelectedProposalAMCRenewal] = useState([]);

    const [activePopup, setActivePopup] = useState("")

    const [accessoriesRows, setAccessoriesRows] = useState([
        {
            sn: 1,
            item: '',
            no: '',
            selectedItem: null // Add this to store the selected item data

        }
    ]);

    const [coveredItemsRows, setCoveredItemsRows] = useState([
        {
            sn: 1,
            coveredItem: '',
            no: '',
            selectedItem: null // Add this to store the selected item data

        }
    ]);

    const [uncoveredItemsRows, setUncoveredItemsRows] = useState([
        {
            sn: 1,
            uncoveredItem: '',
            no: '',
            selectedItem: null // Add this to store the selected item data

        }
    ]);


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInsuranceChange = (e) => {
        const { name, value } = e.target;
        setInsuranceData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const payload = {
                ...formData,
                proposalForAmcRenewalDTO: selectedProposalAMCRenewal ? {
                    renewalId: selectedProposalAMCRenewal.renewalId
                } : null,
                equipmentMasterDTO: selectedEquipment ? {
                    equipmentMasterId: selectedEquipment.equipmentMasterId
                } : null,
                vendorDTO: selectedEquipment?.vendor ? {
                    id: selectedEquipment.vendor.id
                } : null,
                organisationMasterDTO: selectedInsurances ? {
                    masterId: selectedInsurances.masterId
                } : null,

                accessoryItemsDTO: accessoriesRows
                    .filter(row => row.selectedItem)
                    .map(row => ({ addItemId: row.selectedItem.addItemId })),
                coveredItemsDTO: coveredItemsRows
                    .filter(row => row.selectedItem)
                    .map(row => ({ addItemId: row.selectedItem.addItemId })),
                uncoveredItemsDTO: uncoveredItemsRows
                    .filter(row => row.selectedItem)
                    .map(row => ({ addItemId: row.selectedItem.addItemId }))
            };

            const response = await fetch(`${API_BASE_URL}/amc-details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to save AMC details');
            }

            const result = await response.json();
            console.log('Successfully saved:', result);
            alert("Successfully saved")
            // Add success notification here
        } catch (error) {
            console.error('Error saving AMC details:', error);
            // Add error notification here
        }
    };

    const fetchEquipments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/equipment-masters`);
            if (!response.ok) {
                throw new Error("Failed to fetch equipments");
            }
            const data = await response.json();
            setEquipments(data);
        } catch (error) {
            console.error("Error fetching equipments:", error);
        }
    };

    const fetchAmcRenewal = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/proposalForAmcRenewal`);
            if (!response.ok) {
                throw new Error("Failed to Proposal for AMC Renewal");
            }
            const data = await response.json();
            setProposalAMCRenewals(data);
        } catch (error) {
            console.error("Error fetching equipments:", error);
        }
    };

    const fetchAccessoriesItems = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/add-items`);
            if (!response.ok) {
                throw new Error("Failed to Add Items");
            }
            const data = await response.json();
            setAccessoriesItems(data);


        } catch (error) {
            console.error("Error fetching equipments:", error);
        }
    };

    const fetchCoveredItems = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/add-items`);
            if (!response.ok) {
                throw new Error("Failed to Add Items");
            }
            const data = await response.json();
            setCoverdItems(data);


        } catch (error) {
            console.error("Error fetching equipments:", error);
        }
    };

    const fetchUnCoveredItems = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/add-items`);
            if (!response.ok) {
                throw new Error("Failed to Add Items");
            }
            const data = await response.json();
            setUnCoverdItems(data);


        } catch (error) {
            console.error("Error fetching equipments:", error);
        }
    };



    const fetchInsuranceName = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/organisation-masters`);
            if (!response.ok) {
                throw new Error("Failed to Add Insurance Name");
            }
            const data = await response.json();
            setInsurances(data);

            console.log(data);



        } catch (error) {
            console.error("Error fetching equipments:", error);
        }
    };


    // Fetch data for equipment
    useEffect(() => {
        fetchEquipments();
        fetchAmcRenewal();
        fetchAccessoriesItems();
        fetchCoveredItems();
        fetchUnCoveredItems();
        fetchInsuranceName();
    }, []);





    const getPopupData = () => {
        if (activePopup === "proposalAMCRenewal") {
            return {
                columns: ["renewalId", "proposalTo"], data: proposalAMCRenewals
            };
        }
        else if (activePopup === "equipment") {
            return {
                columns: ["equipmentMasterId", "equipmentName"], data: equipments
            };
        }
        else if (activePopup === "accessoriesItem") {
            return {
                columns: ["addItemId", "itemName"], data: accessoriesItems
            };
        }
        else if (activePopup === "coveredItem") {
            return {
                columns: ["addItemId", "itemName"], data: coverdItems
            };
        }
        else if (activePopup === "uncoveredItem") {
            return {
                columns: ["addItemId", "itemName"], data: unCoverdItems
            };
        }

        else if (activePopup === "insurance") {
            return {
                columns: ["masterId", "name", "orgSaleType", "organisationCode"], data: insurances
            };
        }


        else {
            return { columns: [], data: [] };
        }
    };

    const { columns, data } = getPopupData();

    const handleSelect = async (data) => {
        if (activePopup === "proposalAMCRenewal") {
            setSelectedProposalAMCRenewal(data);
        }
        else if (activePopup === "equipment") {
            setSelectedEquipment(data);
        }
        else if (activePopup === "accessoriesItem") {
            const rowIndex = accessoriesRows.length - 1;
            const updatedRows = [...accessoriesRows];
            updatedRows[rowIndex] = {
                ...updatedRows[rowIndex],
                selectedItem: data,
                addItemId: data.addItemId
            };
            setAccessoriesRows(updatedRows);
        }
        else if (activePopup === "coveredItem") {
            const rowIndex = coveredItemsRows.length - 1;
            const updatedRows = [...coveredItemsRows];
            updatedRows[rowIndex] = {
                ...updatedRows[rowIndex],
                selectedItem: data,
                addItemId: data.addItemId
            };
            setCoveredItemsRows(updatedRows);
        }
        else if (activePopup === "uncoveredItem") {
            const rowIndex = uncoveredItemsRows.length - 1;
            const updatedRows = [...uncoveredItemsRows];
            updatedRows[rowIndex] = {
                ...updatedRows[rowIndex],
                selectedItem: data,
                addItemId: data.addItemId
            };
            setUncoveredItemsRows(updatedRows);
        }


        else if (activePopup === "insurance") {
            setSelectedInsurances(data);
        }

        setActivePopup(null);
    };

    const getTableState = (tableType) => {
        switch (tableType) {
            case 'accessories':
                return { rows: accessoriesRows, setRows: setAccessoriesRows };
            case 'covered':
                return { rows: coveredItemsRows, setRows: setCoveredItemsRows };
            case 'uncovered':
                return { rows: uncoveredItemsRows, setRows: setUncoveredItemsRows };
            default:
                return { rows: [], setRows: () => { } };
        }
    };
    const handleAddRow = (type) => {
        if (type === 'accessories') {
            setAccessoriesRows([
                ...accessoriesRows,
                {
                    sn: accessoriesRows.length + 1,
                    item: '',
                    no: '',
                }
            ]);

        } else if (type === 'covered') {
            setCoveredItemsRows([
                ...coveredItemsRows,
                {
                    sn: coveredItemsRows.length + 1,
                    coveredItem: '',
                    no: ''
                }
            ]);

        }
        else if (type === 'uncovered') {
            setUncoveredItemsRows([
                ...uncoveredItemsRows,
                {
                    sn: uncoveredItemsRows.length + 1,
                    uncoveredItem: '',
                    no: ''
                }
            ]);

        }
    };


    const handleDeleteRow = (type, index) => {
        if (type === 'accessories') {
            const updatedAccessoriesRows = accessoriesRows.filter((_, i) => i !== index);

            // Ensure at least one row is constant
            if (updatedAccessoriesRows.length === 0) {
                setAccessoriesRows([
                    {
                        sn: 1,
                        item: '',
                        no: ''

                    }
                ]);
            } else {
                // Update serial numbers after deletion
                setAccessoriesRows(
                    updatedAccessoriesRows.map((row, i) => ({
                        ...row,
                        sn: i + 1
                    }))
                );
            }
        }
        else if (type === 'coverdItems') {
            const updatedCoveredItemsRows = coveredItemsRows.filter((_, i) => i !== index);

            // Ensure at least one row is constant
            if (updatedCoveredItemsRows.length === 0) {
                setCoveredItemsRows([
                    {
                        sn: 1,
                        coveredItem: '',
                        no: ''
                    }
                ]);
            } else {
                // Update serial numbers after deletion
                setCoveredItemsRows(
                    updatedCoveredItemsRows.map((row, i) => ({
                        ...row,
                        sn: i + 1
                    }))
                );
            }
        }
        else {
            const updatedUnCoveredItemsRows = uncoveredItemsRows.filter((_, i) => i !== index);

            // Ensure at least one row is constant
            if (updatedUnCoveredItemsRows.length === 0) {
                setUncoveredItemsRows([
                    {
                        sn: 1,
                        uncoveredItem: '',
                        no: ''
                    }
                ]);
            } else {
                // Update serial numbers after deletion
                setUncoveredItemsRows(
                    updatedUnCoveredItemsRows.map((row, i) => ({
                        ...row,
                        sn: i + 1
                    }))
                );
            }
        }
    };


    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


    const renderTable = () => {
        switch (selectedTab) {
            case 'accessories':
                return (
                    <div className="AMCDetailsservices-table">
                        <table ref={tableRef}>
                            <thead>
                                <tr>
                                    {[
                                        "Actions",
                                        "SN",
                                        "Item",
                                        "No"
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
                                {accessoriesRows.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="AMCDetails-add-btn"
                                                    onClick={() => handleAddRow('accessories')}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    className="AMCDetails-del-btn"
                                                    onClick={() => handleDeleteRow('accessories', index)}
                                                    disabled={accessoriesRows.length <= 1}
                                                >
                                                    Del
                                                </button>
                                            </div>
                                        </td>
                                        <td>{row.sn}</td>
                                        <td>
                                            <div className="AMCDetails-input-with-search">
                                                <input type="text" value={row.selectedItem?.itemName || ''}
                                                    placeholder="Search..." />
                                                <button onClick={() => setActivePopup("accessoriesItem")} className="AMCDetails-magnifier-btn">🔍</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="AMCDetails-input-with-search">
                                                <input type="text" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'covered':
                return (
                    <div className="AMCDetailsservices-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Actions</th>
                                    <th>SN</th>
                                    <th>Covered Item</th>
                                    <th>No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coveredItemsRows.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="AMCDetails-add-btn"
                                                    onClick={() => handleAddRow('covered')}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    className="AMCDetails-del-btn"
                                                    onClick={() => handleDeleteRow('covered', index)}
                                                    disabled={coveredItemsRows.length <= 1}
                                                >
                                                    Del
                                                </button>
                                            </div>
                                        </td>
                                        <td>{row.sn}</td>
                                        <td>
                                            <div className="AMCDetails-input-with-search">
                                                <input type="text" value={row.selectedItem?.itemName || ''}
                                                    placeholder="Search..." />
                                                <button onClick={() => setActivePopup("coveredItem")} className="AMCDetails-magnifier-btn">🔍</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="AMCDetails-input-with-search">
                                                <input type="text" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'uncovered':
                return (
                    <div className="AMCDetailsservices-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Actions</th>
                                    <th>SN</th>
                                    <th>Uncovered Item</th>
                                    <th>No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uncoveredItemsRows.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="AMCDetails-add-btn"
                                                    onClick={() => handleAddRow('uncovered')}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    className="AMCDetails-del-btn"
                                                    onClick={() => handleDeleteRow('uncovered', index)}
                                                    disabled={uncoveredItemsRows.length <= 1}
                                                >
                                                    Del
                                                </button>
                                            </div>
                                        </td>
                                        <td>{row.sn}</td>
                                        <td>
                                            <div className="AMCDetails-input-with-search">
                                                <input type="text" value={row.selectedItem?.itemName || ''}
                                                    placeholder="Search..." />
                                                <button onClick={() => setActivePopup("uncoveredItem")} className="AMCDetails-magnifier-btn">🔍</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="AMCDetails-input-with-search">
                                                <input type="text" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            default:
                return null;
        }
    };


    return (
        <div className="amc_Details">
            <div className="AMCDetails-title-bar">
                <div className="AMCDetails-header">
                    <span>AMC Details</span>
                </div>
            </div>

            <div className="AMCDetails-content-wrapper">
                <div className="AMCDetails-main-section">
                    <div className="AMCDetails-panel dis-templates">
                        {/* <div className="AMCDetails-panel-content">
              <div className="AMCDetails-form-row">
                <label>AMC NO:</label>
                <input type="text" value="" />
              </div>     </div> */}
                        <div className="AMCDetails-panel-header">AMC Proposal Dtl</div>
                        <div className="AMCDetails-panel-content">
                            <div className="AMCDetails-form-row">
                                <label>Entry Type:</label>
                                <select>
                                    <option>From Proposal</option>
                                    <option>Existing</option>
                                </select>
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Proposal No:</label>
                                <div className="AMCDetails-input-with-search">
                                    <input type="text" value={selectedProposalAMCRenewal?.renewalId} readOnly />
                                    <button onClick={() => setActivePopup("proposalAMCRenewal")} className="AMCDetails-magnifier-btn">🔍</button>
                                </div>
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Proposal To:</label>
                                <input type="text" value={selectedProposalAMCRenewal?.proposalTo} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Proposal Date:</label>
                                <input type="text" value={selectedProposalAMCRenewal?.proposalDate} />
                            </div>
                        </div>
                        <div className="AMCDetails-panel-header">Equipment Info</div>
                        <div className="AMCDetails-panel-content">
                            <div className="AMCDetails-form-row">
                                <label>Date:</label>
                                <input type="date" />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Equipment Name: *</label>
                                <div className="AMCDetails-input-with-search">
                                    <input type="text" value={selectedEquipment?.equipmentName} readOnly />
                                    <button onClick={() => setActivePopup("equipment")} className="AMCDetails-magnifier-btn">🔍</button>
                                </div>
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Asset No:</label>
                                <input type="text" value={selectedEquipment?.assetNo} />
                            </div>
                        </div>

                        <div className="AMCDetails-panel operation-details">
                            <div className="AMCDetails-panel-header">Document</div>
                            <div className="AMCDetails-panel-content">
                                <div className="AMCDetailsPanels">
                                    <input type="text" placeholder="Enter text" className="text-input" />
                                    <input type="file" className="file-input" />
                                    <button className="upload-button">Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="AMCDetails-panel dis-templates">
                        <div className="AMCDetails-panel-content">
                            <div className="AMCDetails-form-row">
                                <label>Manual No:</label>
                                <input type="text" />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Location:</label>
                                <input type="text" value={selectedEquipment?.assetLocationMaster?.subLocation} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Location Path:</label>
                                <input type="text" value={selectedEquipment?.locationPath} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Category:</label>
                                <input type="text" value={selectedEquipment?.assetCateMasterDTO?.underCategory} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Depreciation:</label>
                                <input type="text" value={selectedEquipment?.assetCateMasterDTO?.depreciation} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Serial No:</label>
                                <input type="text" value={selectedEquipment?.serialNo} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Equipment No:</label>
                                <input type="text" value={selectedEquipment?.equipmentNo} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Description:</label>
                                <input type="text" value={selectedEquipment?.remarks} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Model No:</label>
                                <input type="text" value={selectedEquipment?.modelNo} />
                            </div>
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
                    <div className="AMCDetails-panel operation-details">
                        <div className="AMCDetails-panel-content">
                            <div className="AMCDetails-form-row">
                                <label>Software Version No:</label>
                                {/* <div className="AMCDetails-input-with-search"> */}
                                <input type="text" value={selectedEquipment?.softwareVersion} />
                                {/* <button className="AMCDetails-magnifier-btn">🔍</button> */}
                                {/* </div> */}
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Company Brand: *</label>
                                {/* <div className="AMCDetails-input-with-search"> */}
                                <input type="text" value={selectedEquipment?.companyBrand} />
                                {/* <button className="AMCDetails-magnifier-btn">🔍</button> */}
                                {/* </div> */}
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Responsibility Person:</label>
                                <input type="text" value={selectedEquipment?.employee?.firstName} />
                            </div>
                        </div>
                        <div className="AMCDetails-panel-header">Contract Details</div>
                        <div className="AMCDetails-panel-content">
                            <div className="AMCDetails-form-row">
                                <label>Contract Type:</label>
                                <select name='contractType' onChange={handleFormChange}>
                                    <option value="Warranty">Warranty</option>
                                    <option value="AMC">AMC</option>
                                    <option value="CMC">CMC</option>
                                    <option value="On-Call">On-Call</option></select>
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Manual Contract No:</label>
                                <input type="text" name='manualContractNo' onChange={handleFormChange} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Contract From: *</label>
                                <input type="text" name='contractFrom' onChange={handleFormChange} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Contract To: *</label>
                                <input type="text" name='contractTo' onChange={handleFormChange} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Installation Date:</label>
                                <input type="text" value={selectedEquipment?.installationDate} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Cost Of Contract: *</label>
                                <input type="text" name='costOfContract' onChange={handleFormChange} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Contract Of AMC:</label>
                                <input type="text" name='contractOfAmc' onChange={handleFormChange} />
                            </div>
                        </div>
                    </div>

                    <div className="AMCDetails-panel operation-details">
                        <div className="AMCDetails-panel-header">Company Details</div>
                        <div className="AMCDetails-panel-content">
                            <div className="AMCDetails-form-row">
                                <label>Contract Company: *</label>
                                {/* <div className="AMCDetails-input-with-search"> */}
                                <input value={selectedEquipment?.vendor?.vendorName} />
                                {/* <button className="AMCDetails-magnifier-btn">🔍</button> */}
                                {/* </div> */}
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Address:</label>
                                <input type="text" value={selectedEquipment?.vendor?.contactAddress} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Mobile No:</label>
                                <input type="text" value={selectedEquipment?.vendor?.contactNumber} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Email:</label>
                                <input type="text" value={selectedEquipment?.vendor?.email} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Contact Person:</label>
                                <input type="text" value={selectedEquipment?.vendor?.contactPerson} />
                            </div>
                            <div className="AMCDetails-form-row">
                                <label>Other Details:</label>
                                <input type="text" />
                            </div>
                        </div>


                        <div className="AMCDetails-panel-header">Company Details</div>
                        <div className="AMCDetails-panel-content">
                            <div className="AMCDetails-form-row">
                                <label>Insurance:</label>
                                <select
                                    name="insurance"
                                    value={formData.insurance}
                                    onChange={handleInsuranceChange}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            {insuranceData.insurance === 'Yes' && (
                                <div className="AMCDetails-form-row">
                                    <label>Insurance Name:</label>

                                    <input type="text" value={selectedInsurances?.name} readOnly />
                                    <button onClick={() => setActivePopup("insurance")} className="AMCDetails-magnifier-btn">🔍</button>




                                </div>
                            )}


                            <div className="AMCDetails-form-row">
                                <label>Warranty Details:</label>
                                <input type="text" name='insuranceAndWarrantyDetails' onChange={handleFormChange} />
                            </div>
                        </div>


                    </div>

                </div>
                <div className="AMCDetails-services-section">
                    <div className="AMCDetails-tab-bar">
                        <button
                            className={`AMCDetails-tab ${selectedTab === 'accessories' ? 'active' : ''}`}
                            onClick={() => setSelectedTab('accessories')}>
                            Accessories
                        </button>
                        <button
                            className={`AMCDetails-tab ${selectedTab === 'covered' ? 'active' : ''}`}
                            onClick={() => setSelectedTab('covered')}>
                            Covered Items      </button>
                        <button
                            className={`AMCDetails-tab ${selectedTab === 'uncovered' ? 'active' : ''}`}
                            onClick={() => setSelectedTab('uncovered')}>
                            Uncovered Items      </button>
                    </div>
                    {renderTable()}
                </div>
                <div className="AMCDetails-action-buttons">
                    <button onClick={handleSave} className="AMCDetails-action-buttons-add">Save</button>
                </div>
            </div>
        </div>
    );
};
export default AmcDetailsForm;


