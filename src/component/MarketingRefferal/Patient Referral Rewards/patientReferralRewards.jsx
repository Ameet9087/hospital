import React, { useState, useEffect, useRef } from 'react';
import './ReferralReward.css';
import axios from 'axios'; // Import Axios
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

function ReferralReward() {
    const tableRef = useRef(null);
    const [columnWidths, setColumnWidths] = useState([]);
    const [rewards, setRewards] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(''); // 'add' or 'edit'
    const [formData, setFormData] = useState({
        rewardId: '',
        referralId: '',
        rewardType: '',
        rewardAmount: '',
        rewardStatus: '',
        issuedDate: '',
        claimedDate: '',
    });

    // Step 2: Fetch rewards data from the API on component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/rewards') // Replace with your API endpoint
            .then(response => {
                setRewards(response.data); // Set the rewards data
                console.log('Fetched rewards:', response.data);
            })
            .catch(error => {
                console.error('Error fetching rewards:', error);
            });
    }, []);

    const openModal = (mode, reward = {}) => {
        setModalMode(mode);
        if (mode === 'edit') {
            setFormData(reward);
        } else {
            setFormData({
                rewardId: '',
                referralId: '',
                rewardType: '',
                rewardAmount: '',
                rewardStatus: '',
                issuedDate: '',
                claimedDate: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            rewardId: '',
            referralId: '',
            rewardType: '',
            rewardAmount: '',
            rewardStatus: '',
            issuedDate: '',
            claimedDate: '',
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Step 3: Handle the Submit for Add and Edit
    const handleSubmit = () => {
        if (modalMode === 'add') {
            // Step 4: Axios POST Request (Add New Reward)
            axios.post('http://localhost:5000/api/rewards', formData) // Replace with your POST API endpoint
                .then(response => {
                    console.log('Added new reward:', response.data);
                    setRewards([...rewards, response.data]); // Add new reward to the list
                    closeModal();
                })
                .catch(error => {
                    console.error('Error adding reward:', error);
                });
        } else if (modalMode === 'edit') {
            // Step 5: Axios PUT Request (Edit Existing Reward)
            axios.put(`http://localhost:5000/api/rewards/${formData.rewardId}`, formData) // Replace with your PUT API endpoint
                .then(response => {
                    console.log('Updated reward:', response.data);
                    const updatedRewards = rewards.map((reward) =>
                        reward.rewardId === formData.rewardId ? response.data : reward
                    );
                    setRewards(updatedRewards); // Update reward in the list
                    closeModal();
                })
                .catch(error => {
                    console.error('Error updating reward:', error);
                });
        }
    };

    return (
        <div className="patient-referralreward-container">
            <h2>Referral Rewards</h2>
            <button className="patient-referralreward-add-button" onClick={() => openModal('add')}>
                Add New Reward
            </button>
            <table className="patient-referralreward-table" ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Reward ID",
                            "Referral ID",
                            "Reward Type",
                            "Reward Amount",
                            "Reward Status",
                            "Issued Date",
                            "Claimed Date",
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
                    {rewards.map((reward) => (
                        <tr key={reward.rewardId}>
                            <td>{reward.rewardId}</td>
                            <td>{reward.referralId}</td>
                            <td>{reward.rewardType}</td>
                            <td>{reward.rewardAmount}</td>
                            <td>{reward.rewardStatus}</td>
                            <td>{reward.issuedDate}</td>
                            <td>{reward.claimedDate}</td>
                            <td>
                                <button
                                    className="patient-referralreward-edit-button"
                                    onClick={() => openModal('edit', reward)}
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
                <div className="patient-referralreward-modal">
                    <div className="patient-referralreward-modal-content">
                        <span className="patient-referralreward-close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <h5>{modalMode === 'add' ? 'Add New Reward' : 'Edit Reward'}</h5>
                        <form>
                            <div className='patientreferralreward-form'>
                                <label>Referral ID:</label>
                                <input
                                    type="text"
                                    name="referralId"
                                    value={formData.referralId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='patientreferralreward-form'>
                                <label>Reward Type:</label>
                                <input
                                    type="text"
                                    name="rewardType"
                                    value={formData.rewardType}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='patientreferralreward-form'>
                                <label>Reward Amount:</label>
                                <input
                                    type="text"
                                    name="rewardAmount"
                                    value={formData.rewardAmount}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='patientreferralreward-form'>
                                <label>Reward Status:</label>
                                <input
                                    type="text"
                                    name="rewardStatus"
                                    value={formData.rewardStatus}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='patientreferralreward-form'>
                                <label>Issued Date:</label>
                                <input
                                    type="date"
                                    name="issuedDate"
                                    value={formData.issuedDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='patientreferralreward-form'>
                                <label>Claimed Date:</label>
                                <input
                                    type="date"
                                    name="claimedDate"
                                    value={formData.claimedDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                        <button className="patient-referralreward-submit-button" onClick={handleSubmit}>
                            {modalMode === 'add' ? 'Add Reward' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReferralReward;
