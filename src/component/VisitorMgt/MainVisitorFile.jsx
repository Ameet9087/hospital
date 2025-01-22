// import React from "react";
// import { Link, Route, Routes, useLocation } from "react-router-dom";
// import Visitor from "./Visitors/Visitor";
// import Visitinghours from "./visitinghoursmgt/Visitinghours";
// import './MainVisitorFile.css';
// import Visitorbadges from "./Visitorbadges/Visitorbadges";
// function MainVisitorFile() {

//   return (
//     <div className="visitmanagement-container">
//       <nav className="visitmanagement-navbar">
//         <ul className="visitmanagement-nav-links">
//           <li>
//             <Link
//               to="/visitors"
//               className={`visitmanagement-button ${location.pathname === '/visitors' ? 'active' : ''}`}
//             >
//               Visitors
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/visiting-hours-management"
//               className={`visitmanagement-button ${location.pathname === '/visiting-hours-management' ? 'active' : ''}`}
//             >
//               Visiting Hours Management
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/visitor-badges"
//               className={`visitmanagement-button ${location.pathname === '/visitor-badges' ? 'active' : ''}`}
//             >
//               Visitor Badges
//             </Link>
//           </li>

//         </ul>
//       </nav>
//       <div className="visitmanagement-content">
//         <Routes>
//           <Route path="visitors" element={<Visitor />} />
//           <Route path="visiting-hours-management" element={<Visitinghours />} />
//           <Route path="visitor-badges" element={<Visitorbadges />} />

//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default MainVisitorFile;




import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import Visitor from "./Visitors/Visitor";
import Visitinghours from "./visitinghoursmgt/Visitinghours";
import './MainVisitorFile.css';
import Visitorbadges from "./Visitorbadges/Visitorbadges";

const MainVisitorFile = () => {
    return (
        <div className="visitormgt-container">
            <nav className="visitormgt-nav">
                <NavLink
                    to="/visit/visitors"
                    className={({ isActive }) =>
                        isActive ? "visitormgt-navigation-link active" : "visitormgt-navigation-link"
                    }
                >
                    Visitors
                </NavLink>
                <NavLink
                    to="/visitormanagement/visitinghoursmanagement"
                    className={({ isActive }) =>
                        isActive ? "visitormgt-navigation-link active" : "visitormgt-navigation-link"
                    }
                >
                    Visiting Hours Management
                </NavLink>
                <NavLink
                    to="/visit/visitor-badges"
                    className={({ isActive }) =>
                        isActive ? "visitormgt-navigation-link active" : "visitormgt-navigation-link"
                    }
                >
                    Visitor Badges
                </NavLink>
                





            </nav>

            <div className="visitormgt-content">
                <Routes>
                    <Route path="/visit/visitors" element={<Visitor />} />
                    <Route path="/visitormanagement/visitinghoursmanagement" element={<Visitinghours />} />
                    <Route path="/visit/visitor-badges" element={<Visitorbadges />} />
                  
                </Routes>
            </div>
        </div>
    );
};

export default MainVisitorFile;

