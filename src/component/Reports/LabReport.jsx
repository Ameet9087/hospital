import React from "react";
import { useNavigate } from 'react-router-dom';
import './BillingReports.css';

const LabReportCom = () => {
    const navigate = useNavigate();

    // ReportCard component with proper onClick handler
    const ReportCard = ({ icon, title, subtitle, onClick }) => {
        return (
            <div className="billing-card-report-card" onClick={onClick}>
                <div className="billing-card-icon">{icon}</div>
                <div className="billing-card-content">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </div>
            </div>
        );
    };

    const reports = [
        { icon: '📄', title: 'Category Wise Report', subtitle: 'Report',
          onClick: () => navigate('/category-wise-report')
        },
        { icon: '📄', title: 'Total Revenue', subtitle: 'Report',
          onClick: () => navigate('/total-revenue')
        },
        { icon: '📄', title: 'Item Wise Lab', subtitle: 'Report',
          onClick: () => navigate('/item-wise-lab')
        },
        { icon: '📄', title: 'Test Status Detail Report', subtitle: 'Report',
          onClick: () => navigate('/test-status-detail-report')
        },
        { icon: '📄', title: 'Covid Cases Detail Report', subtitle: 'Report',
          onClick: () => navigate('/covid-cases-detail-report')
        },
        { icon: '📄', title: 'Covid-Country Wise', subtitle: 'Report',
          onClick: () => navigate('/covid-country-wise')
        },
        { icon: '📄', title: 'HIV Test Details Report', subtitle: 'Report',
          onClick: () => navigate('/hiv-test-details-report')
        },
        { icon: '📄', title: 'Lab Culture Details Report', subtitle: 'Report',
          onClick: () => navigate('/lab-culture-details-report')
        },
        { icon: '📄', title: 'LabType Wise Test Count Report', subtitle: 'Report',
          onClick: () => navigate('/labtype-wise-test-count-report')
        },
        { icon: '📄', title: 'Category And Test Count', subtitle: 'Report',
          onClick: () => navigate('/category-and-test-count')
        },
        { icon: '📄', title: 'Doctor Wise Patient Count Lab', subtitle: 'Report',
          onClick: () => navigate('/doctor-wise-patient-count-lab')
        }
    ];

    return (
        <div className="billing-card-dashboard">
            {reports.length > 0 ? (
                reports.map((report, index) => (
                    <ReportCard
                        key={index}
                        icon={report.icon}
                        title={report.title}
                        subtitle={report.subtitle}
                        onClick={report.onClick}
                    />
                ))
            ) : (
                <p>No reports available</p>
            )}
        </div>
    );
}

export default LabReportCom;
