import React, { useState, useEffect, useRef } from 'react';
import './MaanageReaction.css'; // Ensure this is the correct filename
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const usersData = [
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 1,
    "Disease Group ICD10 Code": "B05.9",
    "Disease Group Name": "Measles"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 2,
    "Disease Group ICD10 Code": "A36.9",
    "Disease Group Name": "Diphtheria"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 3,
    "Disease Group ICD10 Code": "A37.9",
    "Disease Group Name": "Whooping Cough"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 4,
    "Disease Group ICD10 Code": "A33",
    "Disease Group Name": "Neonatal Tetanus"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 5,
    "Disease Group ICD10 Code": "A35",
    "Disease Group Name": "Tetanus"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 6,
    "Disease Group ICD10 Code": "A16.9",
    "Disease Group Name": "Tuberculosis"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 7,
    "Disease Group ICD10 Code": "G83",
    "Disease Group Name": "Acute Flaccid Paralysis (AFP)"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 8,
    "Disease Group ICD10 Code": "B06.9",
    "Disease Group Name": "Rubella"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 9,
    "Disease Group ICD10 Code": "B26.9",
    "Disease Group Name": "Mumps"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 10,
    "Disease Group ICD10 Code": "B01.9",
    "Disease Group Name": "Chicken Pox"
  },
  {
    "Reporting Group SN": 1,
    "Reporting Group Name": "Communicable, Immunizable",
    "Disease Group SN": 11,
    "Disease Group ICD10 Code": "B16.9",
    "Disease Group Name": "Hepatitis B"
  },
  {
    "Reporting Group SN": 2,
    "Reporting Group Name": "Communicable, Vector Borne",
    "Disease Group SN": 12,
    "Disease Group ICD10 Code": "A86",
    "Disease Group Name": "Acute Encephalitis like Syndrome (AES)"
  },
  {
    "Reporting Group SN": 2,
    "Reporting Group Name": "Communicable, Vector Borne",
    "Disease Group SN": 13,
    "Disease Group ICD10 Code": "B74.9",
    "Disease Group Name": "Filariasis"
  },
  {
    "Reporting Group SN": 2,
    "Reporting Group Name": "Communicable, Vector Borne",
    "Disease Group SN": 14,
    "Disease Group ICD10 Code": "B54",
    "Disease Group Name": "Clinical Malaria"
  },
  {
    "Reporting Group SN": 2,
    "Reporting Group Name": "Communicable, Vector Borne",
    "Disease Group SN": 15,
    "Disease Group ICD10 Code": "B50.9",
    "Disease Group Name": "Malaria (Plasmodium Falciparum)"
  },
  {
    "Reporting Group SN": 2,
    "Reporting Group Name": "Communicable, Vector Borne",
    "Disease Group SN": 16,
    "Disease Group ICD10 Code": "B51.9",
    "Disease Group Name": "Malaria (Plasmodium Vivax)"
  },
  {
    "Reporting Group SN": 2,
    "Reporting Group Name": "Communicable, Vector Borne",
    "Disease Group SN": 17,
    "Disease Group ICD10 Code": "A90",
    "Disease Group Name": "Dengue Fever"
  },
  {
    "Reporting Group SN": 2,
    "Reporting Group Name": "Communicable, Vector Borne",
    "Disease Group SN": 18,
    "Disease Group ICD10 Code": "B55.9",
    "Disease Group Name": "Kala-azar/Leshmaniasis"
  },
  {
    "Reporting Group SN": 3,
    "Reporting Group Name": "Communicable, Water/Food Borne",
    "Disease Group SN": 19,
    "Disease Group ICD10 Code": "A01.0",
    "Disease Group Name": "Typhoid (Enteric Fever)"
  },
  {
    "Reporting Group SN": 3,
    "Reporting Group Name": "Communicable, Water/Food Borne",
    "Disease Group SN": 20,
    "Disease Group ICD10 Code": "A09",
    "Disease Group Name": "Acute Gastro-enteritis (AGE)"
  }
]

const ICDGroup = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  return (


    <div className="manage-reaction-container">
      <input type="text" placeholder="Search" className="manage-reaction-search-input" />
      <div className="manage-reaction-span">
        <span>Showing 525/525 results</span>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                'Reporting Group SN',
                'Reporting Group Name',
                'Disease Group SN',
                'Disease Group ICD10 Code',
                'Disease Group Name',
                'ICOIO Code',
                'ICDIO Name'
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
            {usersData.map((user, index) => (
              <tr key={index}>
                <td>{user["Reporting Group SN"]}</td>
                <td>{user["Reporting Group Name"]}</td>
                <td>{user["Disease Group SN"]}</td>
                <td>{user["Disease Group ICD10 Code"]}</td>
                <td>{user["Disease Group Name"]}</td>
                <td>{user["ICOIO Code"] || "N/A"}</td> {/* Adjust this field as necessary */}
                <td>{user["ICDIO Name"] || "N/A"}</td> {/* Adjust this field as necessary */}
                {/* <td className="manage-reaction-action-buttons">
                                        <button className="manage-reaction-action-button">Edit</button>
                                    </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="manage-reaction-pagination">
                        <div className="manage-reaction-pagination-controls">
                            <button>First</button>
                            <button>Previous</button>
                            <button>1</button>
                            <button>Next</button>
                            <button>Last</button>
                        </div>
                    </div> */}
      </div>
    </div>
  );
};
export default ICDGroup;
