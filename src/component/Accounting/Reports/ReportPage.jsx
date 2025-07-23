import React from "react";
import { useParams, Link } from "react-router-dom";

const ReportPage = () => {
  const { reportName } = useParams();

  return (
    <div>
      <h1>{reportName.replace(/-/g, " ")} Report</h1>
      <p>This is the {reportName.replace(/-/g, " ")} report page.</p>
      <Link to="/">Back to Reports</Link>
    </div>
  );
};

export default ReportPage;
