import React, { useState, useRef, useEffect } from "react";
import "./AMCProposal.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import AMCProposalForm from "./AMCProposalForm";
import { API_BASE_URL } from '../../../api/api';
import * as XLSX from 'xlsx';

const AMCProposal = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [columnWidths, setColumnWidths] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const tableRef = useRef(null);
    const [proposals, setProposals] = useState([]);
    const [filteredProposals, setFilteredProposals] = useState([]);

    // Fetch AMC proposals
    useEffect(() => {
        fetchProposals();
    }, [showPopup]);

    const fetchProposals = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/proposalForAmcRenewal`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProposals(data);
            setFilteredProposals(data);
        } catch (error) {
            console.error("Error fetching proposals:", error);
        }
    };

    // Search functionality
    useEffect(() => {
        const filtered = proposals.filter(proposal => 
            proposal.equipmentMasterDTO?.equipmentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proposal.proposalTo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proposal.equipmentMasterDTO?.vendor?.vendorName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProposals(filtered);
    }, [searchQuery, proposals]);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    // Export to Excel
    const exportToExcel = () => {
        const exportData = filteredProposals.map(proposal => ({
            'Equipment Name': proposal.equipmentMasterDTO?.equipmentName || '',
            'Proposal To': proposal.proposalTo || '',
            'Proposal Date': proposal.proposalDate || '',
            'Supplier': proposal.equipmentMasterDTO?.vendor?.vendorName || '',
            'Cost of Equipment': proposal.equipmentMasterDTO?.cost || '',
            'Date of Purchase': proposal.equipmentMasterDTO?.installationDate || '',
            'Proposal Made by': `${proposal.praposalMadeByDTO?.firstName || ''}`
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "AMC Proposals");
        XLSX.writeFile(wb, "AMC_Proposals.xlsx");
    };

    // Print functionality
    const handlePrint = () => {
        const printContent = document.getElementById('printableTable');
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContent.outerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <div className="AMCProposal-container">
            <div className="AMCProposal-addBtn">
                <button className="AMCProposal-add-button" onClick={openPopup}>
                    + Add New AMC Renewal
                </button>
            </div>

            <div className="AMCProposal-search-N-result">
                <div className="AMCProposal-search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="AMCProposal-results-info">
                    <span>
                        Showing {filteredProposals.length} / {proposals.length} results
                    </span>
                    <button className="AMCProposal-print-button" onClick={exportToExcel}>
                        <i className="fa-solid fa-file-excel"></i> Export
                    </button>
                    <button className="AMCProposal-print-button" onClick={handlePrint}>
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table ref={tableRef} id="printableTable">
                    <thead>
                        <tr>
                            {[
                                "Equipment Name",
                                "Proposal To",
                                "Proposal Date",
                                "Supplier",
                                "Cost of Equipment",
                                "Date of Purchase",
                                "Proposal Made by",
                                "Present AMC to Date",
                                "Present AMC from Date",
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
                        {filteredProposals.map((proposal, index) => (
                            <tr key={index}>
                                <td>{proposal.equipmentMasterDTO?.equipmentName}</td>
                                <td>{proposal.proposalTo}</td>
                                <td>{proposal.proposalDate}</td>
                                <td>{proposal.equipmentMasterDTO?.vendor?.vendorName}</td>
                                <td>{proposal.equipmentMasterDTO?.cost}</td>
                                <td>{proposal.equipmentMasterDTO?.installationDate}</td>
                                <td>{proposal.praposalMadeByDTO?.firstName}</td>
                                <td>{proposal.presentAmcToDate}</td>
                                <td>{proposal.presentAmcFromDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <CustomModal isOpen={showPopup} onClose={closePopup}>
                    <AMCProposalForm onSubmitSuccess={closePopup} />
                </CustomModal>
            )}
        </div>
    );
};

export default AMCProposal;