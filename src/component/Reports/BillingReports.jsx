import React from "react";
import { useNavigate } from 'react-router-dom';
import './BillingReports.css';

const BillingReportsCom = () => {
  const navigate = useNavigate();

  const ReportCard = ({ icon, title, subtitle, onClick }) => {
    return (
      <div className="billing-card-report-card" onClick={onClick}>
        <div className="billing-card-icon"> {icon}</div>
        <div className="billing-card-content">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  };

  const reports = [
    {
      icon: '👤',
      title: 'User Collection',
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/user-collection-report'), 
    },
    { 
      icon: '📄', 
      title: 'Total Item Bill', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/total-item-bill'), 
    },
    { 
      icon: '📄', 
      title: 'Deposit Balance', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/deposit-balance'), // Navigate to Deposit Balance
    },

    { 
      icon: '💰', 
      title: 'Patient Credit Summary', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/patient-credit-summary'), // Navigate to Deposit Balance
    },
    {
      icon: '🧾',
      title: 'Income Segregation',
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/income-segregation'), // Navigate to User Collection Report
    },


    { 
      icon: '🚫', 
      title: 'Cancel Bill', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/cancel-bill'), // Navigate to Deposit Balance
    },
    {
      icon: '🧾',
      title: 'Return Bill',
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/return-bill'), // Navigate to User Collection Report
    },


    { 
      icon: '💸', 
      title: 'Discount Report', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/discount-report'), // Navigate to Deposit Balance
    },

   { 
      icon: '👥', 
      title: 'Patient Census', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/patient-census'), 
    },


    { 
      icon: '🪙', 
      title: 'Doctorwise Income Summary (OP + IP)', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/doctorwise-income-summary'), 
    },

    { icon: '📝', title: 'Daily  MIS', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/daily-mis'), 

    },

    
    { 
      icon: '🩺', 
      title: 'Doctor Summary', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/doctor-summary'), // Navigate to Deposit Balance
    },


    { icon: '🗂', title: 'Department Summary', subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/department-summary'), // Navigate to Deposit Balance

     },



    { icon: '🩺', title: 'Dialysis Patient Details', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/dialysis-patient-details'), // Navigate to Deposit Balance

    },



    { icon: '📑', title: 'Referral Summary', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/referral-summary'), // Navigate to Deposit Balance


    },

    { icon: '📑', title: 'Items Summary', subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/item-summary'), // Navigate to Deposit Balance

     },


    { icon: '💰', title: 'Deposit Transaction', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/deposit-transaction'), // Navigate to Deposit Balance

    },




    { icon: '💵', title: 'Discount Scheme', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/discount-scheme'), // Navigate to Deposit Balance


    },



    { icon: '📊', title: 'Department Wise Discount Scheme', subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/department-wise-discount-scheme'), // Navigate to Deposit Balance

     },




    { icon: '👥', title: 'User Wise Cash Collection', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/user-wise-cash-collection'), // Navigate to Deposit Balance

    },




    { icon: '📃', title: 'EHS Bill', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/ehs-bill'), // Navigate to Deposit Balance


    },




    { icon: '📝', title: 'Bill Detail', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/bill-detail'), // Navigate to Deposit Balance

    },




    { icon: '💳', title: 'Credit Settlement Report', subtitle: 'Report' ,
      onClick: () => navigate('/report/billingreports/credit-settlement-report'), // Navigate to Deposit Balance

    },




    { icon: '💲', title: 'Payment Mode Wise Report', subtitle: 'Report' ,

      onClick: () => navigate('/report/billingreports/payment-mode-wise-report'), // Navigate to Deposit Balance
    },

    { 
      icon: '📄', 
      title: 'Scheme Detail(Invoice)', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/scheme-details'), // Navigate to Deposit Balance

    },


    { 
      icon: '📄', 
      title: 'Package Sales', 
      subtitle: 'Report',
      onClick: () => navigate('/report/billingreports/package-sales'), // Navigate to Deposit Balance

    },
    


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
};

export default BillingReportsCom;
