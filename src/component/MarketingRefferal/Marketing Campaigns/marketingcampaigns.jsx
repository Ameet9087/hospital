import React, { useState, useEffect, useRef } from 'react';
import './CampaignManagement.css';
import axios from 'axios'; // Import Axios
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

function CampaignManagement() {
    const tableRef = useRef(null);
    const [columnWidths, setColumnWidths] = useState([]);
    const [campaigns, setCampaigns] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(''); // 'add' or 'edit'
    const [formData, setFormData] = useState({
        campaignId: '',
        campaignName: '',
        campaignStartDate: '',
        campaignEndDate: '',
        campaignBudget: '',
        targetAudience: '',
        campaignStatus: '',
    });

    // Fetch campaigns data from API on component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/campaigns') // Replace with your API endpoint
            .then(response => {
                setCampaigns(response.data); // Set the fetched campaigns
            })
            .catch(error => {
                console.error('Error fetching campaigns:', error);
            });
    }, []); // Empty dependency array means it runs only once, when the component mounts

    const openModal = (mode, campaign = {}) => {
        setModalMode(mode);
        if (mode === 'edit') {
            setFormData(campaign);
        } else {
            setFormData({
                campaignId: '',
                campaignName: '',
                campaignStartDate: '',
                campaignEndDate: '',
                campaignBudget: '',
                targetAudience: '',
                campaignStatus: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            campaignId: '',
            campaignName: '',
            campaignStartDate: '',
            campaignEndDate: '',
            campaignBudget: '',
            targetAudience: '',
            campaignStatus: '',
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (modalMode === 'add') {
            // POST request to add a new campaign
            const newCampaign = {
                campaignName: formData.campaignName,
                campaignStartDate: formData.campaignStartDate,
                campaignEndDate: formData.campaignEndDate,
                campaignBudget: formData.campaignBudget,
                targetAudience: formData.targetAudience,
                campaignStatus: formData.campaignStatus,
            };

            axios.post('http://localhost:5000/api/campaigns', newCampaign) // Replace with your API endpoint
                .then((response) => {
                    setCampaigns([...campaigns, response.data]); // Add new campaign to the list
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error adding campaign:', error);
                });

        } else if (modalMode === 'edit') {
            // PUT request to update the campaign
            axios.put(`http://localhost:5000/api/campaigns/${formData.campaignId}`, formData) // Replace with your API endpoint
                .then((response) => {
                    const updatedCampaigns = campaigns.map((campaign) =>
                        campaign.campaignId === formData.campaignId ? response.data : campaign
                    );
                    setCampaigns(updatedCampaigns); // Update the campaign list
                    closeModal();
                })
                .catch((error) => {
                    console.error('Error updating campaign:', error);
                });
        }
    };

    return (
        <div className="campaign-management-container">
            <h2>Campaign Management</h2>
            <button className="campaign-management-add-button" onClick={() => openModal('add')}>
                Add New Campaign
            </button>
            <table className="campaign-management-table" ref={tableRef}>
                <thead>
                    <tr>
                    {[
                        "Campaign ID",
                        "Campaign Name",
                        "Start Date",
                        "End Date",
                        "Budget",
                        "Target Audience",
                        "Status",
                        "Action"
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
                                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                ></div>
                            </div>
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign.campaignId}>
                            <td>{campaign.campaignId}</td>
                            <td>{campaign.campaignName}</td>
                            <td>{campaign.campaignStartDate}</td>
                            <td>{campaign.campaignEndDate}</td>
                            <td>{campaign.campaignBudget}</td>
                            <td>{campaign.targetAudience}</td>
                            <td>{campaign.campaignStatus}</td>
                            <td>
                                <button
                                    className="campaign-management-edit-button"
                                    onClick={() => openModal('edit', campaign)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="campaign-management-modal">
                    <div className="campaign-management-modal-content">
                        <span className="campaign-management-close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <h5>{modalMode === 'add' ? 'Add New Campaign' : 'Edit Campaign'}</h5>
                        <form>
                            <div className='marketingcampaigns-form'>
                                <label>Campaign Name:</label>
                                <input
                                    type="text"
                                    name="campaignName"
                                    value={formData.campaignName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='marketingcampaigns-form'>
                                <label>Start Date:</label>
                                <input
                                    type="date"
                                    name="campaignStartDate"
                                    value={formData.campaignStartDate}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='marketingcampaigns-form'>
                                <label>End Date:</label>
                                <input
                                    type="date"
                                    name="campaignEndDate"
                                    value={formData.campaignEndDate}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='marketingcampaigns-form'>
                                <label>Budget:</label>
                                <input
                                    type="text"
                                    name="campaignBudget"
                                    value={formData.campaignBudget}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='marketingcampaigns-form'>
                                <label>Target Audience:</label>
                                <input
                                    type="text"
                                    name="targetAudience"
                                    value={formData.targetAudience}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='marketingcampaigns-form'>
                                <label>Status:</label>
                                <input
                                    type="text"
                                    name="campaignStatus"
                                    value={formData.campaignStatus}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                        <button className="campaign-management-submit-button" onClick={handleSubmit}>
                            {modalMode === 'add' ? 'Add Campaign' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CampaignManagement;
