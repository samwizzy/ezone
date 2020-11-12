import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import ListBoard from './ListBoard';
// import ViewReports from './ViewReport/ViewReport';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paperBase: {
    padding: '15px',
  },
  base: {
    paddingTop: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
    marginBottom: '20px',
  },
  pap: {
    padding: '8px',
    marginBottom: '15px',
  },
}));

const Report = () => {
  const classes = useStyles();
  const receivables = [
    { name: 'Customer Ledgers', link: 'customer-ledgers' },
    { name: 'Aged Receivables', link: 'aged-receivables' },
    { name: 'Customer master file', link: 'customer-master-file' },
    { name: 'Cash Receipt Jornals', link: 'cash-receipt-jornals' },
    { name: 'Invoice Register', link: 'invoice-register' },
    { name: 'Sales Order Details', link: 'sales-order-details' },
    { name: 'Sales Journal', link: 'sales-journal' },
    { name: 'Sales taxes', link: 'sales-taxes' },
    { name: 'Taxes Exempt Sales', link: 'taxes-exempt-sales' },
    { name: 'Quote register', link: 'quote-register' },
  ];
  const fixedAsset = [
    { name: 'Fixed Asset Register', link: 'fixed-asset-register' },
    { name: 'Fixed Asset Schedule', link: 'fixed-asset-schedule' },
  ];
  const payables = [
    { name: 'Vendor Ledgers', link: 'vendor-ledgers' },

    { name: 'Aged Payables', link: 'aged-payables' },

    { name: 'Cash Journal report', link: 'cash-journal-report' },

    { name: 'Purchase order register', link: 'purchase-order-register' },

    { name: 'Bill reports', link: 'bill-reports' },

    { name: 'Payments reports', link: 'payments-reports' },

    { name: 'Quotation reports', link: 'quotation-reports' },

    { name: 'Purchase journal', link: 'purchase-journal' },

    { name: 'Vendor master life', link: 'vendor-master-life' },

    { name: 'Purchase order report', link: 'purchase-order-report' },
  ];
  const ledger = [
    { name: 'Cash account register', link: 'cash-account-register' },

    { name: 'Charts of Accounts', link: 'charts-of-accounts' },

    { name: 'General Journal', link: 'general-journal' },

    { name: 'General ledger', link: 'general-ledger' },

    { name: 'Trial Balance', link: 'trial-balance' },
  ];
  const financialStatement = [
    {
      name: 'Comprehensive Income Statement',
      link: 'comprehensive-income-statement',
    },

    {
      name: 'Statement of financial position',
      link: 'statement-of-financial-position',
    },

    { name: 'Cashflow', link: 'cashflow' },
  ];
  // { name: 'Cost of goods sold', link: 'cost-of-goods-sold' },
  const inventory = [
    { name: 'Direct Cost Report', link: 'direct-cost-report' },
    { name: 'Inventory status report', link: 'inventory-status-report' },
    { name: 'Inv.valuation report', link: 'inv-valuation-report' },
    { name: 'Item list', link: 'Item-list' },
    { name: 'Physical Inventory list', link: 'physical-Inventory-list' },
  ];
  const payroll = [
    { name: 'Payroll Journals', link: 'payroll-journals' },
    { name: 'Payroll Check Register', link: 'payroll-check-register' },
    { name: 'Payroll Tax report', link: 'payroll-tax-report' },
    { name: 'Tax liability Report', link: 'tax-liability-report' },
    { name: 'Employee Earnings Report', link: 'employee-earnings-report' },
    {
      name: 'Employee Compensation Report',
      link: 'employee-compensation-report',
    },
    { link: 'employee-list', name: 'Employee List' },
  ];
  const accountReconcilation = [
    { name: 'Bank Reconcilation', link: 'bank-reconcillation' },

    { name: 'Bank deposit report', link: 'bank-deposit-report' },

    { name: 'Deposit in Transit', link: 'deposit-in-transit' },

    { name: 'Other outstanding items', link: 'other-outstanding-items' },

    { name: 'Outstanding checks', link: 'outstanding-checks' },
  ];

  return (
    <div className={classes.base}>
      <Paper className={classes.paperBase} elevation={1}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.pap} elevation={3}>
              <Typography gutterBottom variant="h6" component="h1">
                Reports
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'blue'}
                          title={'Receivables'}
                          contents={receivables}
                        />
                      </Paper>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'orchild'}
                          title={'Fixed Asset'}
                          contents={fixedAsset}
                        />
                      </Paper>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'green'}
                          title={'Payables'}
                          contents={payables}
                        />
                      </Paper>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'322F7C'}
                          title={'Account Reconcilation'}
                          contents={accountReconcilation}
                        />
                      </Paper>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'yellow'}
                          title={'General Ledger'}
                          contents={ledger}
                        />
                      </Paper>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'green'}
                          title={'Inventory'}
                          contents={inventory}
                        />
                      </Paper>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'pink'}
                          title={'Financial Statement'}
                          contents={financialStatement}
                        />
                      </Paper>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'purple'}
                          title={'Payroll'}
                          contents={payroll}
                        />
                      </Paper>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper elevation={3}>
                      <Paper elevation={1}>
                        <ListBoard
                          bar={'orchild'}
                          title={'Taxes'}
                          contents={[
                            { name: 'Tax Summary', link: 'tax-summary' },
                          ]}
                        />
                      </Paper>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Report;
