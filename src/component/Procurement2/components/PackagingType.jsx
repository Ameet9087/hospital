import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useReactToPrint } from 'react-to-print';
import AddPackagingType from './AddPackagingType';
import UpdatePackagingType from '../components/UpdatePackagingType';
import './PackagingType.css';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';

Modal.setAppElement('#root');

const PackagingType = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPackagingType, setSelectedPackagingType] = useState(null);
  const [packagingTypes, setPackagingTypes] = useState([]);

  const tableRef = useRef();  

  useEffect(() => {
    const fetchPackagingTypes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/packageType/getAllPackageType`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPackagingTypes(data);
        console.log('Fetched Packaging Types:', data);
      } catch (error) {
        console.error('Error fetching packaging types:', error.message);
      }
    };

    fetchPackagingTypes();
  }, [showAddModal,showEditModal]);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (packagingType) => {
    setSelectedPackagingType(packagingType);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: 'Packaging Types',
  });

  const handleAddPackagingType = (newPackagingType) => {
    setPackagingTypes([...packagingTypes, newPackagingType]);
    closeAddModal();
  };

  const handleUpdatePackagingType = (updatedPackagingType) => {
    setPackagingTypes(packagingTypes.map(type =>
      type.id === updatedPackagingType.id ? updatedPackagingType : type
    ));
    closeEditModal();
  };

  return (
    <div className="PackagingType-container">
      <div className="PackagingType-header">
        <div className="PackagingType-header-actions">
          <button className="PackagingType-add-button" onClick={openAddModal}>Add Packaging Type</button>
        </div>
      </div>
      <div className="PackagingType-results-info">
      <div className="PackagingType-search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div>
        <span>Showing {packagingTypes.length} / {packagingTypes.length} results</span>
        <button className="PackagingType-print-button" onClick={handlePrint} aria-label="Print">Print</button>
        </div>
      </div>

      <div ref={tableRef} className='table-container'>
        <table className="PackagingType-table">
          <thead>
            <tr>
              <th>Packaging Type Name</th>
              <th>Description</th>
              <th>Is Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packagingTypes.map((type) => (
              <tr key={type.id}>
                <td>{type.packagingTypeName}</td>
                <td>{type.description}</td>
                <td>{type.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="PackagingType-edit-button"
                    onClick={() => openEditModal(type)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        contentLabel="Add Packaging Type Modal"
      >
        <AddPackagingType onAdd={handleAddPackagingType} onClose={closeAddModal} />
      </CustomModal>

      <CustomModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        contentLabel="Edit Packaging Type Modal"
      >
        <UpdatePackagingType packagingType={selectedPackagingType} onUpdate={handleUpdatePackagingType} onClose={closeEditModal}/>
      </CustomModal>
    </div>
  );
};

export default PackagingType;
