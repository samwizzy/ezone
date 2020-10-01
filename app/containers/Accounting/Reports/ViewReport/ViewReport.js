import React from 'react';
import CustomerLedger from './Views/Receivables/CustomerLedgers';
import GeneralLedger from './Views/GeneralLedger/GeneralLedger';
import GeneralJournal from './Views/GeneralLedger/GeneralJournal';
import ChatsOfAccount from './Views/GeneralLedger/ChatsOfAccount';
import TrialBalance from './Views/GeneralLedger/TrialBalance';
import CashAccountRegister from './Views/GeneralLedger/CashAccountRegister';
import CustomerMasterFile from './Views/Receivables/CustomerMasterFile';
import QuoteRegister from './Views/Receivables/QuoteRegister';
import TaxesExemptSales from './Views/Receivables/TaxesExemptSales';
import AssetSchedule from './Views/FixedAsset/FixedAssetSchedule';
import AssetRegister from './Views/FixedAsset/FixedAssetRegister';
import VendorLedgers from './Views/Payables/VendorLedgers';
import VendoMasterLife from './Views/Payables/VendorMasterlife';
import BankReconciliation from './Views/AccountReconciliation/BankReconcilliation';
import BankDepositReport from './Views/AccountReconciliation/BankDepositReport';
import DepositIntransit from './Views/AccountReconciliation/DepositInTransit';
import OtherOustandingItem from './Views/AccountReconciliation/OtherOutstandingItems';
import OutstandingChecks from './Views/AccountReconciliation/OutstandingChecks';
import CostOfGoodSold from './Views/Inventory/CostOfGoodsSold';
import InventoryStatusReport from './Views/Inventory/InventoryStatusReport';
import ItemList from './Views/Inventory/ItemList';
import PhysicalInventoryList from './Views/Inventory/PhysicalInventoryList';
import ValuationReports from './Views/Inventory/ValuationReports';
import EmployeeCompensationReports from './Views/Payroll/EmployeeCompensationReport';
import EmployeeEarningReports from './Views/Payroll/EmployeeEarningsReport';
import EmployeeList from './Views/Payroll/EmployeeList';
import PayrollCheckRegister from './Views/Payroll/PayrollCheckRegister';
import PayrollJournal from './Views/Payroll/PayrollJournals';
import PayrolltaxReport from './Views/Payroll/PayrollTaxReport';
import TaxLiabilityReport from './Views/Payroll/TaxLiabilityReport';
import AgedPayableReports from './Views/Payables/AgedPayables';
import BillReports from './Views/Payables/BillReports';
import CashJournal from './Views/Payables/CashJournalReport';
import PaymentsReport from './Views/Payables/PaymentsReports';
import PurchaseJournal from './Views/Payables/PurchaseJournal';
import PurchaseOrderRegister from './Views/Payables/PurchaseOrderRegister';
import PurchaseOrderReports from './Views/Payables/PurchaseOrderReport';
import QuotationReports from './Views/Payables/QuotationReports';
import AgedReceivables from './Views/Receivables/AgedReceivables';
import CashReceiptJornals from './Views/Receivables/CashReceiptJornals';
import InvoiceRegister from './Views/Receivables/InvoiceRegister';
import SalesOrderDetails from './Views/Receivables/SalesOrderDetails';
import SalesJournal from './Views/Receivables/SalesJournal';
import TaxSummary from './Views/Taxes/TaxSummary';
import BudgetVsReport from './Views/Budget/BudgetVsReport';
import BudgeVsActual from './Views/Budget/BudgetVsActuals';
import CashFlow from './Views/FinancialStatement/CashFlow';
import ComprehensiveIncomeStatement from './Views/FinancialStatement/ComprehensiveIncome';
import IncomeStatement from './Views/FinancialStatement/IncomeStatement';
import StatementOfFinancialPosition from './Views/FinancialStatement/StateOfFinancialPostion';

import './style.css';
const componentObject = {
  'income Statement': IncomeStatement,
  'Comprehensive Income Statement': ComprehensiveIncomeStatement,
  'Statement of financial position': StatementOfFinancialPosition,
  Cashflow: CashFlow,
  'Tax Summary': TaxSummary,
  'Budget report': BudgetVsReport,
  'Budget Vs Actuals': BudgeVsActual,
  'Aged Receivables': AgedReceivables,
  'Customer master file': CustomerMasterFile,
  'Cash Receipt Jornals': CashReceiptJornals,
  'Invoice Register': InvoiceRegister,
  'Sales Order Details': SalesOrderDetails,
  'Sales Journal': SalesJournal,
  'Sales taxes': SalesJournal,
  'Taxes Exempt Sales': TaxesExemptSales,
  'Aged Payables': AgedPayableReports,
  'Cash Journal report': CashJournal,
  'Purchase order register': PurchaseOrderRegister,
  'Bill reports': BillReports,
  'Payments reports': PaymentsReport,
  'Quotation reports': QuotationReports,
  'Purchase journal': PurchaseJournal,
  'Quote register': QuoteRegister,
  'General Journal': GeneralJournal,
  'Charts of Accounts': ChatsOfAccount,
  'General ledger': GeneralLedger,
  'Trial Balance': TrialBalance,
  'Cost of goods sold': CostOfGoodSold,
  'Inventory status report': InventoryStatusReport,
  'Inv.valuation report': ValuationReports,
  'Item list': ItemList,
  'Physical Inventory list': PhysicalInventoryList,
  'Payroll Journals': PayrollJournal,
  'Payroll Check Register': PayrollCheckRegister,
  'Payroll Tax report': PayrolltaxReport,
  'Tax liability Report': TaxLiabilityReport,
  'Employee Earnings Report': EmployeeEarningReports,
  'Employee Compensation Report': EmployeeCompensationReports,
  'Employee List': EmployeeList,
  'Bank Reconcilation': BankReconciliation,
  'Bank deposit report': BankDepositReport,
  'Deposit in Transit': DepositIntransit,
  'Other outstanding items': OtherOustandingItem,
  'Outstanding checks': OutstandingChecks,
  'Vendor Ledgers': VendorLedgers,
  'vendor master life': VendoMasterLife,
  'Purchase order report': PurchaseOrderReports,
  'Customer Ledgers': CustomerLedger,
  'Cash account register': CashAccountRegister,
  'Fixed Asset Register': AssetRegister,
  'Fixed Asset Schedule': AssetSchedule,
};

const ViewReport = ({ reportId }) => {
  const Comp = componentObject[reportId];
  return <Comp />;
};

export default ViewReport;
