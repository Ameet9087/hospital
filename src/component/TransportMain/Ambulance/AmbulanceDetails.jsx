// import React from 'react';
// import { useParams } from 'react-router-dom';
// import './AmbulanceDetails.css';

// const AmbulanceDetails = () => {
//   const { id } = useParams();

//   const ambulanceData = {
//     1: {
//       id: 1,
//       licensePlate: 'ABC123',
//       driver: 'John Doe',
//       status: 'Available',
//       lastChecked: '2023-09-23',
//     },
//     2: {
//       id: 2,
//       licensePlate: 'XYZ456',
//       driver: 'Jane Smith',
//       status: 'On Duty',
//       lastChecked: '2023-09-24',
//     },
//     3: {
//       id: 3,
//       licensePlate: 'DEF789',
//       driver: 'Mark Johnson',
//       status: 'Available',
//       lastChecked: '2023-09-22',
//     },
//     4: {
//       id: 4,
//       licensePlate: 'LMN123',
//       driver: 'Emily Davis',
//       status: 'On Duty',
//       lastChecked: '2023-09-21',
//     },
//   };

//   // Get the current ambulance details based on the id
//   const ambulance = ambulanceData[id];

//   return (
//     <div className="ambulance-details-com-module">
//       <h1 className="ambulance-details-com-module__heading">
//         Ambulance Details for ID: {ambulance.id}
//       </h1>
//       <p className="ambulance-details-com-module__text">
//         License Plate: {ambulance.licensePlate}
//       </p>
//       <p className="ambulance-details-com-module__text">
//         Driver: {ambulance.driver}
//       </p>
//       <p className="ambulance-details-com-module__text">
//         Status: {ambulance.status}
//       </p>
//       <p className="ambulance-details-com-module__text">
//         Last Checked: {ambulance.lastChecked}
//       </p>
//     </div>
//   );
// };

// export default AmbulanceDetails;
