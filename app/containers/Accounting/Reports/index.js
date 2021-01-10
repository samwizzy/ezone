import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useRouteMatch, Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './ViewReport/reducers';
import saga from './ViewReport/saga';
import makeSelectReports from './ViewReport/selectors';
import ViewMain from './ViewMain';
import ChartOfAccount from './ViewReport/Views/GeneralLedger/ChartOfAccount';
import CustomerLedger from './ViewReport/Views/Receivables/CustomerLedgers';
import GeneralLedger from './ViewReport/Views/GeneralLedger/GeneralLedger';
import GeneralJournal from './ViewReport/Views/GeneralLedger/GeneralJournal';
import TrialBalance from './ViewReport/Views/GeneralLedger/TrialBalance';
import CashAccountRegister from './ViewReport/Views/GeneralLedger/CashAccountRegister';
import CustomerMasterFile from './ViewReport/Views/Receivables/CustomerMasterFile';
import QuoteRegister from './ViewReport/Views/Receivables/QuoteRegister';
import TaxesExemptSales from './ViewReport/Views/Receivables/TaxesExemptSales';
import AssetSchedule from './ViewReport/Views/FixedAsset/FixedAssetSchedule';
import AssetRegister from './ViewReport/Views/FixedAsset/FixedAssetRegister';
import VendorLedgers from './ViewReport/Views/Payables/VendorLedgers';
import VendoMasterLife from './ViewReport/Views/Payables/VendorMasterLife';
import BankReconciliation from './ViewReport/Views/AccountReconciliation/BankReconcilliation';
import BankDepositReport from './ViewReport/Views/AccountReconciliation/BankDepositReport';
import DepositIntransit from './ViewReport/Views/AccountReconciliation/DepositInTransit';
import OtherOustandingItem from './ViewReport/Views/AccountReconciliation/OtherOutstandingItems';
import OutstandingChecks from './ViewReport/Views/AccountReconciliation/OutstandingChecks';
import CostOfGoodSold from './ViewReport/Views/Inventory/CostOfGoodsSold';
import InventoryStatusReport from './ViewReport/Views/Inventory/InventoryStatusReport';
import ItemList from './ViewReport/Views/Inventory/ItemList';
import PhysicalInventoryList from './ViewReport/Views/Inventory/PhysicalInventoryList';
import ValuationReports from './ViewReport/Views/Inventory/ValuationReports';
import EmployeeCompensationReports from './ViewReport/Views/Payroll/EmployeeCompensationReport';
import EmployeeEarningReports from './ViewReport/Views/Payroll/EmployeeEarningsReport';
import EmployeeList from './ViewReport/Views/Payroll/EmployeeList';
import PayrollCheckRegister from './ViewReport/Views/Payroll/PayrollCheckRegister';
import PayrollJournal from './ViewReport/Views/Payroll/PayrollJournals';
import PayrolltaxReport from './ViewReport/Views/Payroll/PayrollTaxReport';
import TaxLiabilityReport from './ViewReport/Views/Payroll/TaxLiabilityReport';
import AgedPayableReports from './ViewReport/Views/Payables/AgedPayables';
import BillReports from './ViewReport/Views/Payables/BillReports';
import CashJournal from './ViewReport/Views/Payables/CashJournalReport';
import PaymentsReport from './ViewReport/Views/Payables/PaymentsReports';
import PurchaseJournal from './ViewReport/Views/Payables/PurchaseJournal';
import PurchaseOrderRegister from './ViewReport/Views/Payables/PurchaseOrderRegister';
import PurchaseOrderReports from './ViewReport/Views/Payables/PurchaseOrderReport';
import QuotationReports from './ViewReport/Views/Payables/QuotationReports';
import AgedReceivables from './ViewReport/Views/Receivables/AgedReceivables';
import CashReceiptJornals from './ViewReport/Views/Receivables/CashReceiptJornals';
import InvoiceRegister from './ViewReport/Views/Receivables/InvoiceRegister';
import SalesOrderDetails from './ViewReport/Views/Receivables/SalesOrderDetails';
import SalesJournal from './ViewReport/Views/Receivables/SalesJournal';
import SalesTaxes from './ViewReport/Views/Receivables/SalesTaxes';
import TaxSummary from './ViewReport/Views/Taxes/TaxSummary';
import BudgetVsReport from './ViewReport/Views/Budget/BudgetVsReport';
import BudgeVsActual from './ViewReport/Views/Budget/BudgetVsActuals';
import CashFlow from './ViewReport/Views/FinancialStatement/CashFlow';
import ComprehensiveIncomeStatement from './ViewReport/Views/FinancialStatement/ComprehensiveIncome';
import StatementOfFinancialPosition from './ViewReport/Views/FinancialStatement/StateOfFinancialPostion';
import DirectCostReport from './ViewReport/Views/Inventory/DirectCostReport';
import ModuleLayout from './ModuleLayout';

const Reports = () => {
  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });
  const { path } = useRouteMatch();

  console.log(path, 'path');

  return (
    <div>
      <Helmet>
        <title>Reports</title>
        <meta name="description" content="Description of Accounting reports" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={ViewMain} />
        <Route path={`${path}/chart-of-accounts`} component={ChartOfAccount} />
        <Route
          path={`${path}/cash-account-register`}
          component={CashAccountRegister}
        />
        <Route path={`${path}/general-journal`} component={GeneralJournal} />
        <Route path={`${path}/general-ledger`} component={GeneralLedger} />
        <Route path={`${path}/customer-ledgers`} component={CustomerLedger} />
        <Route path={`${path}/trial-balance`} component={TrialBalance} />
        <Route path={`${path}/aged-receivables`} component={AgedReceivables} />
        <Route
          path={`${path}/customer-master-file`}
          component={CustomerMasterFile}
        />
        <Route
          path={`${path}/cash-receipt-jornals`}
          component={CashReceiptJornals}
        />
        <Route path={`${path}/invoice-register`} component={InvoiceRegister} />
        <Route
          path={`${path}/sales-order-details`}
          component={SalesOrderDetails}
        />
        <Route path={`${path}/sales-journal`} component={SalesJournal} />
        <Route path={`${path}/sales-taxes`} component={SalesTaxes} />
        <Route
          path={`${path}/taxes-exempt-sales`}
          component={TaxesExemptSales}
        />
        <Route path={`${path}/quote-register`} component={QuoteRegister} />
        <Route
          path={`${path}/fixed-asset-register`}
          component={AssetRegister}
        />
        <Route path={`${path}/cash-journal-report`} component={CashJournal} />
        <Route
          path={`${path}/fixed-asset-schedule`}
          component={AssetSchedule}
        />
        <Route path={`${path}/vendor-ledgers`} component={VendorLedgers} />
        <Route path={`${path}/aged-payables`} component={AgedPayableReports} />
        <Route
          path={`${path}/purchase-order-register`}
          component={PurchaseOrderRegister}
        />
        <Route path={`${path}/bill-reports`} component={BillReports} />
        <Route
          path={`${path}/vendor-master-life`}
          component={VendoMasterLife}
        />
        <Route
          path={`${path}/purchase-order-report`}
          component={PurchaseOrderReports}
        />
        <Route path={`${path}/payments-reports`} component={PaymentsReport} />
        <Route
          path={`${path}/quotation-reports`}
          component={QuotationReports}
        />
        <Route path={`${path}/purchase-journal`} component={PurchaseJournal} />
        <Route
          path={`${path}/bank-reconciliation`}
          component={BankReconciliation}
        />
        <Route
          path={`${path}/bank-deposit-report`}
          component={BankDepositReport}
        />
        <Route
          path={`${path}/deposit-in-transit`}
          component={DepositIntransit}
        />
        <Route
          path={`${path}/other-outstanding-items`}
          component={OtherOustandingItem}
        />
        <Route
          path={`${path}/outstanding-checks`}
          component={OutstandingChecks}
        />
        <Route path={`${path}/cost-of-goods-sold`} component={CostOfGoodSold} />
        <Route
          path={`${path}/inventory-status-report`}
          component={InventoryStatusReport}
        />
        <Route
          path={`${path}/inv-valuation-report`}
          component={ValuationReports}
        />
        <Route path={`${path}/item-list`} component={ItemList} />
        <Route
          path={`${path}/physical-inventory-list`}
          component={PhysicalInventoryList}
        />
        <Route path={`${path}/payroll-journals`} component={PayrollJournal} />
        <Route
          path={`${path}/payroll-check-register`}
          component={PayrollCheckRegister}
        />
        <Route
          path={`${path}/payroll-tax-report`}
          component={PayrolltaxReport}
        />
        <Route
          path={`${path}/tax-liability-report`}
          component={TaxLiabilityReport}
        />
        <Route
          path={`${path}/employee-earnings-report`}
          component={EmployeeEarningReports}
        />
        <Route
          path={`${path}/employee-compensation-report`}
          component={EmployeeCompensationReports}
        />{' '}
        <Route path={`${path}/employee-list`} component={EmployeeList} />
        <Route
          path={`${path}/comprehensive-income-statement`}
          component={ComprehensiveIncomeStatement}
        />
        <Route
          path={`${path}/statement-of-financial-position`}
          component={StatementOfFinancialPosition}
        />
        <Route path={`${path}/cashflow`} component={CashFlow} />
        <Route path={`${path}/tax-summary`} component={TaxSummary} />
        <Route
          path={`${path}/direct-cost-report`}
          component={DirectCostReport}
        />
      </ModuleLayout>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Reports);
