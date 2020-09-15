import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ModuleLayout from '../ModuleLayout';
import './style.css';
import CustomerLedger from './Views/CustomerLedgers';
import GeneralLedger from './Views/GeneralLedger';
import Inventory from './Views/Inventory';
import AccountReconcilliation from './Views/AccountReconciliation';
import AssetSchedule from './Views/AssetSchedule';
import FixedAsset from './Views/FixedAsset';
// import PayRoll from './Views/PayRoll';
// import ReportsPayable from './Views/ReportsPayable';
import StatementFinPos from './Views/StatementFinPos';

const ViewReport = () => (
  <ModuleLayout>
    <Switch>
      <Route
        exact
        path="/account/reports/Customer Ledgers"
        component={CustomerLedger}
      />
      <Route
        exact
        path="/account/reports/Fixed Asset Schedule"
        component={AssetSchedule}
      />

      <Route
        exact
        path="/account/reports/account"
        component={AccountReconcilliation}
      />

      <Route
        exact
        path="/account/reports/General ledger"
        component={GeneralLedger}
      />
      <Route
        exact
        path="/account/reports/Charts of Accounts"
        component={FixedAsset}
      />
      <Route
        exact
        path="/account/reports/Statement of financial position"
        component={StatementFinPos}
      />
    </Switch>
  </ModuleLayout>
);
export default ViewReport;
