// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../SubStoreMainPage/substoreMain.css";


// function SubStoreMain() {
//   const navigate = useNavigate();
//   const substores = [
//     "Accounts",
//     "Brain Operations Store",
//     "Female Ward Substore",
//     "ICU Sub store",
//     "Male ward SubStore",
//     "Maternity Substore",
//     "Operations Store",
//     "Private Sub Store",
//     "SubStore1",
//     "SubStore3"
//   ];

//   const handleClick = (store) => {
//     if (store === "Accounts") {
//       navigate('/accounts');
//     }
//   };

//   return (
//     <div className="subStoreMain-div">
//       <h6 className="subStoreMain-title"><i class="fa-solid fa-star-of-life"></i> Select your Substore</h6>
//       <div className="subStoreMain-grid">
//         {substores.map((store, index) => (
//           <div
//             key={index}
//             className="subStoreMain-card"
//             onClick={() => handleClick(store)}
//           >
//             <div className="subStoreMain-icon"><i class="fa-solid fa-cart-shopping"></i></div>
//             <div className="subStoreMain-info">
//               <div className="subStoreMain-name">{store}</div>
//               <div className="subStoreMain-type">Substore</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SubStoreMain;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../SubStoreMainPage/subStoreMain.css";

function SubStoreMain() {
  const navigate = useNavigate();
  const substores = [
    "Accounts",
    "Brain Operations Store",
    "Female Ward Substore",
    "ICU Sub store",
    "Male ward SubStore",
    "Maternity Substore",
    "Operations Store",
    "Private Sub Store",
    "SubStore1",
    "SubStore3"
  ];

  const handleClick = (store) => {
    if (store) {
      navigate(`/substore/pharmacy/${store}`);  // Navigating with the store name
    } else {
      navigate(`/substore/inventory/${store}`);  // Navigate to a different page based on store
    }
  };
  return (
    <div className="subStoreMain-div">
      <h6 className="subStoreMain-title"><i className="fa-solid fa-star-of-life"></i> Select your Substore</h6>
      <div className="subStoreMain-grid">
        {substores.map((store, index) => (
          <div
            key={index}
            className="subStoreMain-card"
            onClick={() => handleClick(store)}
          >
            <div className="subStoreMain-icon"><i className="fa-solid fa-cart-shopping"></i></div>
            <div className="subStoreMain-info">
              <div className="subStoreMain-name">{store}</div>
              <div className="subStoreMain-type">Substore</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubStoreMain;
