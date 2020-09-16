import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ModuleLayout from '../ModuleLayout';
import CustomerLedger from './Views/CustomerLedgers';
import GeneralLedger from './Views/GeneralLedger';
import Inventory from './Views/Inventory';
import AccountReconcilliation from './Views/AccountReconciliation';
import AssetSchedule from './Views/AssetSchedule';
import FixedAsset from './Views/FixedAsset';
// import PayRoll from './Views/PayRoll';
// import ReportsPayable from './Views/ReportsPayable';
import StatementFinPos from './Views/StatementFinPos';
import Reports from '../index';
import './style.css';

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
        path="/account/reports/Fixed Asset Register"
        component={AssetSchedule}
      />

      <Route
        exact
        path="/account/reports/Cash account register"
        component={AccountReconcilliation}
      />

      <Route
        exact
        path="/account/reports/General ledger"
        component={GeneralLedger}
      />
      <Route
        exact
        path="/account/reports/Fixed Asset Schedule"
        component={FixedAsset}
      />
      <Route
        exact
        path="/account/reports/Statement of financial position"
        component={StatementFinPos}
      />
      <Route
        exact
        path="/account/reports/Cost of goods sold"
        component={Inventory}
      />
      <Route component={Reports} />
    </Switch>
  </ModuleLayout>
);
export default ViewReport;
