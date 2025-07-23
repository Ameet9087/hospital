import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Admission from './Report Module/src/Reports/Admission';
import BillingReportsCom from '../Reports/BillingReports';
// import AppointmentReportCom from './Report Module/src/Reports/AppointmentReport';
import RadiologyReports from '../Reports/RevenueEneratedReport';
import LabReportCom from '../Reports/LabReport';
import DoctorsReport from '../Reports/DoctorsReport';
import PatientReport from '../Reports/RegistrationReport';
import PoliceCase from '../Reports/PoliceCase';
import LayoutCom from '../Reports/Layout';
import UserCollectionReport from '../Reports/UserCollectionReport';
import TotalItemBill from '../Reports/TotalItemBill';
import DepositBalance from '../Reports/DepositBalance';
import PatientCreditSummary from '../Reports/PatientCreditSummary';
import IncomeSegragation from '../Reports/IncomeSegragation';
import CancelBill from '../Reports/CancelBill';
import ReturnBill from '../Reports/ReturnBill';
import DiscountReport from '../Reports/DiscountReport';
import PatientCensus from '../Reports/PatientCensus';
import PackageSales from '../Reports/PackageSales';
import Schemedetails from '../Reports/Schemedetails';
import PaymentModewiseReport from '../Reports/PaymentModewiseReport';
import CreditSettlementReport from '../Reports/CreditSettlementReport';
import BillDetailsReport from '../Reports/BillDetailsReport';
import EHSBillingReport from '../Reports/EHSBillingReport';
import UserWiseCashCollection from '../Reports/UserWiseCashCollection';
import DepartmentWiseDiscountScheme from '../Reports/DepartmentWiseDiscountScheme';
import DiscountSchemeReport from '../Reports/DiscountSchemeReport';
import DepositeTransaction from '../Reports/DepositeTransaction';
import DoctorWiseIncomeSummary from '../Reports/DoctorWiseIncomeSummary';
import MISReport from '../Reports/MISReport';
import ItemSummaryReport from '../Reports/ItemSummaryReport';
import DepartmentSummary from '../Reports/DepartmentSummary';
import DialysisPatientDetails from '../Reports/DialysisPatientDetails';
import ReferralSummary from '../Reports/ReferralSummary';
import RegistrationReport from '../Reports/RegistrationReport';
import EditedPatientDetailReport from '../Reports/EditedPatientDetailReport';
import RevenueEneratedReport from '../Reports/RevenueEneratedReport';
import CategoryWiseReport from '../Reports/CategoryWiseReport';
import FilmTypeCount from '../Reports/FilmTypeCount';
import CategoryWiseLapReport from '../Reports/CategoryWiseLapReport';
import TotalRevenueCom from '../Reports/TotalRevenue';
import ItemWiseLab from '../Reports/ItemWiseLab';
import TestStatusDetailsReport from '../Reports/TestStatusDetailsReport';
import HIVTesstDetailsReport from '../Reports/HIVTesstDetailsReport';
import CovidCountryReport from '../Reports/CovidCountryReport';
import LabCultureDetails from '../Reports/LabCultureDetails';
import LabTypeWiseTestCountReport from '../Reports/LabTypeWiseTestCountReport';
import CovidCaseReportDetails from '../Reports/CovidCaseReportDetails';
import CategortAndTestCount from '../Reports/CategortAndTestCount';
import DoctorWisePatientcount from '../Reports/DoctorWisePatientcount';
import AdmittedPatient from '../Reports/AdmittedPatient';
import DischargedPatient from '../Reports/DischargedPatient';
import TransferredPatient from '../Reports/TransferredPatient';
import DiagnosisWiseReport from '../Reports/DiagnosisWiseReport';
import AdmissionAndDischargedList from '../Reports/AdmissionAndDischargedList';
import RankMembershipWiseAdmittedReport from '../Reports/RankMembershipWiseAdmittedReport';
import InPatientOutstandingReport from '../Reports/InPatientOutstandingReport';
import RankMembershipWiseDischargedPatient from '../Reports/RankMembershipWiseDischargedPatient';
import InpatientCensus from '../Reports/InPatientReport';
import DetailsCom from '../Reports/Details';
import CountyWise from '../Reports/CountyWise';
import AppoinmentDepartmentWise from '../Reports/AppoinmentDepartmentWise';
import AppDoctorWiseOutPatient from '../Reports/AppDoctorWiseOutPatient';
import PhoneBookAppointmentReport from '../Reports/PhoneBookAppointmentReport';
import DepartmentWiseRankCountCom from '../Reports/DepartmentWiseRankCount';
import DepartmentWiseStatReport from '../Reports/DepartmentWiseStatReport';
import GeoGraphicalStatReport from '../Reports/GeoGraphicalStatReport';
import RankWiseDailyAppointmentReport from '../Reports/RankWiseDailyAppointmentReport';
import DoctorWiseStatisticsReport from '../Reports/DoctorWiseStatisticsReport';
import DayAndMonthWiseVisitReport from '../Reports/DayAndMonthWiseVisitReport';
function ReportRoute() {
  return (
    <>

      <LayoutCom>
        <Routes>
          {/* <Route path='/admission' element={<Admission/>}></Route> */}                  {/* <Route path='/AppointmentReport' element={<AppointmentReportCom/>}></Route> */}
          <Route path='/billingreports/*' element={<BillingReportsCom />} />
          <Route path='/billingreports/user-collection-report' element={<UserCollectionReport />} />
          <Route path='/billingreports/total-item-bill' element={<TotalItemBill />} />
          <Route path='/billingreports/deposit-balance' element={<DepositBalance />} />
          <Route path='/billingreports/patient-credit-summary' element={<PatientCreditSummary />} />
          <Route path='/billingreports/income-segregation' element={<IncomeSegragation />} />
          <Route path='/billingreports/cancel-bill' element={<CancelBill />} />
          <Route path='/billingreports/return-bill' element={<ReturnBill />} />
          <Route path='/billingreports/discount-report' element={<DiscountReport />} />
          <Route path='/billingreports/patient-census' element={<PatientCensus />} />
          <Route path='/billingreports/doctorwise-income-summary' element={<DoctorWiseIncomeSummary />} />
          <Route path='/billingreports/doctor-summary' element={<DoctorsReport />} />
          <Route path='/billingreports/package-sales' element={<PackageSales />} />
          <Route path='/billingreports/scheme-details' element={<Schemedetails />} />
          <Route path='/billingreports/payment-mode-wise-report' element={<PaymentModewiseReport />} />
          <Route path='/billingreports/credit-settlement-report' element={<CreditSettlementReport />} />
          <Route path='/billingreports/bill-detail' element={<BillDetailsReport />} />
          <Route path='/billingreports/ehs-bill' element={<EHSBillingReport />} />
          <Route path='/billingreports/user-wise-cash-collection' element={<UserWiseCashCollection />} />
          <Route path='/billingreports/department-wise-discount-scheme' element={<DepartmentWiseDiscountScheme />} />
          <Route path='/billingreports/discount-scheme' element={<DiscountSchemeReport />} />
          <Route path='/billingreports/deposit-transaction' element={<DepositeTransaction />} />
          <Route path='/billingreports/daily-mis' element={<MISReport />} />
          <Route path='/billingreports/item-summary' element={<ItemSummaryReport />} />
          <Route path='/billingreports/department-summary' element={<DepartmentSummary />} />
          <Route path='/billingreports/dialysis-patient-details' element={<DialysisPatientDetails />} />
          <Route path='/billingreports/referral-summary' element={<ReferralSummary />} />
          <Route path='/policecase' element={<PoliceCase />} />
          <Route path='/patient/Registration' element={<RegistrationReport />} />
          <Route path='/patient/EditedDetails' element={<EditedPatientDetailReport />} />
          <Route path='/radiology/TotalRevenue' element={<RevenueEneratedReport />} />
          <Route path='/radiology/CategoryWise' element={<CategoryWiseReport />} />
          <Route path='/radiology/FilmTypeCount' element={<FilmTypeCount />} />
          <Route path='/lab/category-wise-report' element={<CategoryWiseLapReport />} />
          <Route path='/lab/total-revenue' element={<TotalRevenueCom />} />
          <Route path='/lab/item-wise-lab' element={<ItemWiseLab />} />
          <Route path='/lab/test-status-detail-report' element={<TestStatusDetailsReport />} />
          <Route path='/lab/covid-country-wise' element={<CovidCountryReport />} />
          <Route path='/lab/hiv-test-details-report' element={<HIVTesstDetailsReport />} />
          <Route path='/lab/lab-culture-details-report' element={<LabCultureDetails />} />
          <Route path='/lab/labtype-wise-test-count-report' element={<LabTypeWiseTestCountReport />} />
          <Route path='/lab/covid-cases-detail-report' element={<CovidCaseReportDetails />} />
          <Route path='/lab/category-and-test-count' element={<CategortAndTestCount />} />
          <Route path='/lab/doctor-wise-patient-count-lab' element={<DoctorWisePatientcount />} />
          <Route path='/admission/AdmittedPatient' element={<AdmittedPatient />} />
          <Route path='/admission/DischargedPatient' element={<DischargedPatient />} />
          <Route path='/admission/TransferredPatient' element={<TransferredPatient />} />
          <Route path='/admission/DiagnosisWisePatient' element={<DiagnosisWiseReport />} />
          <Route path='/admission/AdmissionDischargeList' element={<AdmissionAndDischargedList />} />
          <Route path='/admission/RankMembershipWiseAdmittedPatient' element={<RankMembershipWiseAdmittedReport />} />
          <Route path='/admission/InPatientOutstanding' element={<InPatientOutstandingReport />} />
          <Route path='/admission/RankMembershipWiseDischargedPatient' element={<RankMembershipWiseDischargedPatient />} />
          <Route path='/admission/InPatientCensusReport' element={<InpatientCensus />} />
          <Route path='/appointment/Details' element={<DetailsCom />} />
          <Route path='/appointment/CountyWise' element={<CountyWise />} />
          <Route path='/appointment/DepartmentWise' element={<AppoinmentDepartmentWise />} />
          <Route path='/appointment/DoctorWiseOutPatient' element={<AppDoctorWiseOutPatient />} />
          <Route path='/appointment/PhoneBookAppointmentReport' element={<PhoneBookAppointmentReport />} />
          <Route path='/appointment/DepartmentWiseRankCount' element={<DepartmentWiseRankCountCom />} />
          <Route path='/appointment/DepartmentWiseStatReport' element={<DepartmentWiseStatReport />} />
          <Route path='/appointment/GeographicalStatReport' element={<GeoGraphicalStatReport />} />
          <Route path='/appointment/RankwiseDailyAppointmentReport' element={<RankWiseDailyAppointmentReport />} />
          <Route path='/appointment/DoctorWiseStatisticsReport' element={<DoctorWiseStatisticsReport />} />
          <Route path='/appointment/DayAndMonthwiseVisitReport' element={<DayAndMonthWiseVisitReport />} />
          {/* <Route path="/doctors/" */}

        </Routes>
      </LayoutCom>

    </>
  )
}
export default ReportRoute


