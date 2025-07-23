import React from 'react';
import './NewPatientsMyFavourite.css';

const TableComponent = () => {
    return (
        <div className="New-Patient-fav-table-container">
            <input type="text" className="New-Patient-fav-search-input" placeholder="Search" />
            <button className="New-Patient-fav-print-button">Print</button>

            <table className="New-Patient-fav-custom-table">
                <thead>
                    <tr>
                        <th>Hospital </th>
                        <th>Name</th>
                        <th>Age/Sex</th>
                        <th>VisitType</th>
                        <th>Visit Date</th>
                        <th>Performer Na...</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="7" className="New-Patient-fav-no-rows">
                            No Rows To Show
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <div className="pagination-container">
                <span>0 to 0 of 0</span>
                <div className="pagination-buttons">
                    <button disabled>First</button>
                    <button disabled>Previous</button>
                    <span>Page 0 of 0</span>
                    <button disabled>Next</button>
                    <button disabled>Last</button>
                </div>
            </div> */}
        </div>
    );
};

export default TableComponent;
