import React, { useEffect, useState } from 'react';
// import './collectionlist.css';
import "./collectionList.css"
import { API_BASE_URL } from '../../../api/api';
import CustomModal from '../../../CustomModel/CustomModal';
import BloodTestingPopup from './BloodTestingPage';
function Colletionlist() {
    const [patients, setPatients] = useState([]);
    const [showTest, setShowTest] = useState(false);
    const [selectedCollectionId, setSelectedCollectionId] = useState(null);


    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/basic-info`);
                if (response.ok) {
                    const data = await response.json();
                    setPatients(data);
                } else {
                    console.error('Error fetching data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPatients();
    }, []);
    const handleClosePopup = () => {
        setShowTest(false);
      };
    return (
        <div className="collection-list-container">
            <h2>Blood Collection List</h2>
            <table className="collection-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blood Group</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Collection Date</th>
                        <th>Collection Site</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.infoId}>
                            <td>{patient.fullName}</td>
                            <td>{patient.bloodTypeInfo.bloodGroup}</td>
                            <td>{patient.contactNumber}</td>
                            <td>{patient.emailAddress}</td>
                            <td>{patient.bloodCollectionDetails.collectionDateTime}</td>
                            <td>{patient.bloodCollectionDetails.collectionSite}</td>
                            <td>
                                <button
                                    className="bloodbankrequest-submit-btn"
                                    onClick={() => {
                                        setSelectedCollectionId(patient.infoId);
                                        setShowTest(true);
                                    }}
                                >
                                    Test
                                </button>
                            </td>
                        </tr>
                    ))}


                    {showTest && (
                        <CustomModal
                            onClose={() => setShowTest(false)}
                            isOpen={showTest}
                        >
        <BloodTestingPopup collectionId={selectedCollectionId} onClose={handleClosePopup} />
        </CustomModal>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Colletionlist;
