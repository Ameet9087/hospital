import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './MaanageReaction.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const usersData = [
    { code: 'AN', name: 'ANNAPHYLAXIS' },
    { code: 'ANX', name: 'ANXIETY' },
    { code: 'AP', name: 'ABDOMINAL PAIN' },
    // ... other user data
];

const ManageReaction = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReaction, setNewReaction] = useState({ name: '', code: '', isActive: true });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewReaction(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Reaction:', newReaction);
        closeModal();
    };

    return (
        <div className="ManageReaction-container">
            <div className="ManageReaction-header">
                <button className="ManageReaction-addButton" onClick={openModal}>+ Add Reaction</button>
            </div>
            <input type="text" placeholder="Search" className="ManageReaction-searchInput" />
            <div className="ManageReaction-resultCount">
                <span>Showing 34/34 results</span>
            </div>
            <div className="ManageReaction-tableContainer">
                <table ref={tableRef} className="ManageReaction-table">
                    <thead>
                        <tr>
                            {['Reaction Code', 'Reaction Name', 'Action'].map((header, index) => (
                                <th
                                    key={index}
                                    style={{ width: columnWidths[index] }}
                                    className="ManageReaction-resizableTh"
                                >
                                    <div className="ManageReaction-headerContent">
                                        <span>{header}</span>
                                        <div
                                            className="ManageReaction-resizer"
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
                        {usersData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.code}</td>
                                <td>{user.name}</td>
                                <td className="ManageReaction-actionButtons">
                                    <button className="ManageReaction-editButton">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="ManageReaction-modalOverlay">
                    <div className="ManageReaction-modal">
                        <button className="ManageReaction-closeButton" onClick={closeModal}>
                            <X size={24} />
                        </button>
                        <h2>Add Reaction</h2>
                        <form onSubmit={handleSubmit} className="ManageReaction-form">
                            <div className="ManageReaction-formGroup">
                                <label htmlFor="name">Reaction Name*</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newReaction.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="ManageReaction-formGroup">
                                <label htmlFor="code">Reaction Code</label>
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    value={newReaction.code}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="ManageReaction-formGroup">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={newReaction.isActive}
                                        onChange={handleInputChange}
                                    />
                                    Is Active
                                </label>
                            </div>
                            <button type="submit" className="ManageReaction-submitButton">Add Reaction</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageReaction;
