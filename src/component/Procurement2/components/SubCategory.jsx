import React, { useEffect, useState } from 'react';
import './SubCategory.css';
import AddItemSubCategory from '../components/AddItemSubCategory';
import UpdateSubCategory from '../components/UpdateSubCategory';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';

const SubCategoryList = () => {
  const [isAddingSubCategory, setIsAddingSubCategory] = useState(false);
  const [isUpdatingSubCategory, setIsUpdatingSubCategory] = useState(false);
  const [subCategories, setSubCategories] = useState([]);


const [selectedItem,setSelectedItem]=useState({});
  useEffect(() => {
    fetch(`${API_BASE_URL}/subcategories/fetchAll`)
      .then((response) => response.json())
      .then((data) => setSubCategories(data))
      .catch((error) => console.error('Error fetching subcategories:', error));
  }, []);

  const handleAddButtonClick = () => {
    setIsAddingSubCategory(true);
  };

  const handleEditButtonClick = (item) => {
    setSelectedItem(item)
    setIsUpdatingSubCategory(true);
  };

  const handleCloseAddSubCategory = () => {
    setIsAddingSubCategory(false);
  };

  const handleCloseUpdateSubCategory = () => {
    setIsUpdatingSubCategory(false);
  };

  return (
    <div className="SubCategoryList-container">
      <div className="SubCategoryList-content">
        <button className="SubCategoryList-add-button" onClick={handleAddButtonClick}>
          Add Sub Category
        </button>

        

        <div className="SubCategoryList-results-info">
        <div className="SubCategoryList-search-bar">
          <input type="text" placeholder="Search" />
          
        </div>
          <button className="SubCategoryList-print-button">Print</button>
        </div>

<div className='table-container'>
        <table className="SubCategoryList-table">
          <thead>
            <tr>
              <th>Sub Category Name</th>
              <th>Code</th>
              <th>Category</th>
              <th>Description</th>
              <th>Ledger Name</th>
              <th>Is Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory) => (
              <tr key={subCategory.id}>
                <td>{subCategory.subCategoryName}</td>
                <td>{subCategory.subCategoryCode}</td>
                <td>{subCategory.category}</td>
                <td>{subCategory.description}</td>
                <td>{subCategory.accountingLedger}</td>
                <td>{subCategory.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    className="SubCategoryList-edit-button"
                    onClick={() => handleEditButtonClick(subCategory)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Popup for AddItemSubCategory */}
      <CustomModal isOpen={isAddingSubCategory} onClose={handleCloseAddSubCategory}>
        <AddItemSubCategory />
      </CustomModal>

      {/* Popup for UpdateSubCategory */}
      <CustomModal isOpen={isUpdatingSubCategory} onClose={handleCloseUpdateSubCategory}>
        <UpdateSubCategory subCategory={selectedItem} onClose={handleCloseUpdateSubCategory} />
      </CustomModal>
    </div>
  );
};

export default SubCategoryList;
