import { Routes, Route } from "react-router-dom";
import WardNurseDashboard from "./WardNurseDashboard/wardNurseDashboard";

function NurseRoute() {
  return (
    <div className="dispensary-content">
      <Routes>
        <Route path="/" element={<WardNurseDashboard />} />
      </Routes>
    </div>
  );
}

export default NurseRoute;
