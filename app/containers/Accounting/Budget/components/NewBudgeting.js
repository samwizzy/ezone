import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';

import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  makeStyles,
  Button,
  MenuItem,
  Divider,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter
} from '@material-ui/core';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import moment from 'moment';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    "& .MuiCardActions-root": {
      padding: theme.spacing(2),
      justifyContent: "flex-end",
    }
  },
  tableContainer: {
    marginTop: theme.spacing(5)
  },
  table: {
    whiteSpace: "nowrap",
    "& .MuiTableHead-root:first-child": {
      "& .MuiTableRow-root:first-child": {
        "& th.MuiTableCell-root:first-child": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          fontWeight: theme.typography.fontWeightBold,
        },
      },
      "& .MuiTableRow-root:nth-child(n+2)": {
        backgroundColor: theme.palette.grey[200],
        "& th.MuiTableCell-root:first-child": {
          fontWeight: theme.typography.fontWeightBold,
          fontSize: theme.typography.fontSize + 2,
        },
      }
    },
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root": {
        "& th.MuiTableCell-root:first-child": {
          backgroundColor: theme.palette.grey[200],
          fontWeight: theme.typography.fontWeightBold,
          fontSize: theme.typography.fontSize,
        },
      }
    },
    "& .MuiTableFooter-root": {
      "& .MuiTableRow-root": {
        "& th.MuiTableCell-root:first-child": {
          backgroundColor: theme.palette.grey[200],
          fontWeight: theme.typography.fontWeightBold,
          fontSize: theme.typography.fontSize + 2,
        },
      }
    },
    "& th.MuiTableCell-root": {
      fontWeight: theme.typography.fontWeightMedium
    },
    "& .MuiTableCell-root": {
      borderBottom: "none !important"
    },
    '& .MuiTableCell-body': {
      color: theme.palette.text.primary,
    },
  },
  textField: {
    width: theme.spacing(40)
  },
  dateWrapper: {
    display: 'flex',
    justifyContent: "flex-end",
    alignItems: "center",
    "& .MuiFormControl-root": {
      marginLeft: theme.spacing(2)
    }
  }
}));

const NewBudgeting = props => {
  const classes = useStyles();

  const {
    loading,
    currentUser,
    budgetDialog,
  } = props;

  const budgetPeriodMonthList = [
    {
      value: "MONTHLY",
      label: "MONTHLY",
    },
    {
      value: "QUATERLY",
      label: "QUATERLY",
    },
    {
      value: "YEARLY",
      label: "YEARLY",
    }
  ];

  const budgetMonth = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
    {
      value: '3',
      label: '3',
    },
    {
      value: '4',
      label: '4',
    },
    {
      value: '5',
      label: '5',
    },
    {
      value: '6',
      label: '6',
    },
    {
      value: '7',
      label: '7',
    },
    {
      value: '8',
      label: '8',
    },
    {
      value: '9',
      label: '9',
    },
    {
      value: '10',
      label: '10',
    },
    {
      value: '11',
      label: '11',
    },
    {
      value: '12',
      label: '12',
    }
  ];

  var monthArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let chartOfAccount = ["Sales"];

  const [values, setValues] = React.useState({
    account: chartOfAccount.map(num => ({
      accountName: "",
      value: monthArray.map(month => ({ amount: "", period: "" }))
    })),
    budgetName: "",
    budgetPeriod: "MONTHLY",
    financialYear: "",
    orgId: currentUser.organisation.orgId,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectFinancialYearChange = (name, value) => {
    setValues({ ...values, financialYear: value.label });
  };

  const handleSelectBudgetPeriodChange = (name, value) => {
    setValues({ ...values, budgetPeriod: value.label });
  };

  const handleRowChange = (event, chart, month, ci, mi) => {
    const { name, value } = event.target
    console.log(chart, "charts")
    console.log(month, "month")
    console.log(ci, "chart index")
    console.log(mi, "month index")
    const accountClone = [...values.account]
    accountClone[ci].accountName = chart
    accountClone[ci].value[mi].amount = value
    accountClone[ci].value[mi].period = month
    setValues({
      ...values,
      account: accountClone
    })
  }


  function chunkArray(myArray, chunk_size) {
    var results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  }

  var newCopyArray = monthArray.slice(monthArray.indexOf(values["financialYear"])).concat(monthArray.slice(0, monthArray.indexOf(values["financialYear"])));

  if (values["budgetPeriod"] == "MONTHLY") {
    console.log("selected MONTHLY");
  }
  else if (values["budgetPeriod"] == "QUATERLY") {
    newCopyArray = chunkArray(newCopyArray, 3);
  }
  else {
    newCopyArray = chunkArray(newCopyArray, 12);
  }

  console.log("newCopyArray state -> ", newCopyArray);
  console.log("values --> ", values);

  return (
    <div>
      <Card square className={classes.card}>
        <CardContent>
          <Typography variant="h6">
            {budgetDialog.type === 'new' ? 'Add Budgeting' : 'Edit Budgeting'}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Grid container spacing={1} className={classes.grid}>
            <Grid item xs={6}>
              <TextField
                id="standard-budgetName"
                label="Budget name"
                type="name"
                variant="outlined"
                size="small"
                value={values.budgetName}
                onChange={handleChange('budgetName')}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Autocomplete
                id="combo-box-demo"
                size="small"
                options={budgetMonth}
                getOptionLabel={option => option.label}
                onChange={(evt, value) => handleSelectFinancialYearChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Financial year"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                size="small"
                options={budgetPeriodMonthList}
                getOptionLabel={option => option.label}
                onChange={(evt, value) => handleSelectBudgetPeriodChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Period"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Button variant="contained" color="primary" startIcon={<CloudDownloadIcon />}>Generate from previous year</Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} elevation={0} className={classes.tableContainer}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th" scope="row">Accounts</TableCell>
                      {newCopyArray.map((item, i) => <TableCell key={i} align="center">{item}</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={13}>Income</TableCell>
                    </TableRow>
                    {chartOfAccount.map((chart, ci) => (
                      <TableRow key={ci}>
                        <TableCell>{chart}</TableCell>
                        {newCopyArray.map((m, mi) =>
                          <TableCell>
                            <TextField
                              id="outlined-basic"
                              size="small"
                              label="Outlined"
                              variant="outlined"
                              className={classes.textField}
                              name="amount"
                              value={values.account[ci].value[mi].amount}
                              onChange={(event) => handleRowChange(event, chart, m, ci, mi)}
                              margin="normal"
                              fullWidth
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={13}>Total Income</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={13}>Expense</TableCell>
                    </TableRow>
                    {[0, 1, 2, 3].map(row => (
                      <TableRow>
                        <TableCell>Expense</TableCell>
                        {newCopyArray.map((item, i) =>
                          <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>)}
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={13}>Total Expense</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={13}>Closing Balance</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
              <Button
                onClick={() => { }}
                color="primary"
                variant="contained"
              // disabled={!canSubmitValues()}
              >
                Save
              </Button>
            )}
          <Button
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

NewBudgeting.propTypes = {
  loading: PropTypes.bool,
  budgetDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  budgetDialog: Selectors.makeSelectBudgetingDialog(),
  accountingPeriodData: Selectors.makeSelectGetAllAccountingPeriodData(),
});


function mapDispatchToProps(dispatch) {
  return {
    createNewBudgeting: evt => dispatch(Actions.createNewBudgeting(evt)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewBudgeting);