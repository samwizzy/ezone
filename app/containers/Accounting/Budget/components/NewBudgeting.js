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
          fontSize: theme.typography.fontSize + 2,
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
    width: theme.spacing(20)
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
<<<<<<< HEAD
=======
    closeNewBudgetingDialog,
    accountingPeriodData
>>>>>>> account
  } = props;

  const budgetPeriod = [
    {
      value: 'Monthly',
      label: 'Monthly',
    },
    {
      value: 'Quaterly',
      label: 'Quaterly',
    },
    {
      value: 'Yearly',
      label: 'Yearly',
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

  const [month, setMonth] = React.useState({
    financialMonth: "",
  });

  const [values, setValues] = React.useState({
    accountCode: "",
    accountName: "",
    accountNumber: "",
    bankBalance: "",
    bankName: "",
    description: "",
    orgId: currentUser.organisation.orgId,
  });

  const canSubmitValues = () => {
    const { accountCode, accountName, accountNumber, bankBalance, bankName, description } = values;
    return accountCode.length > 0 && accountName.length > 0 && accountNumber.length > 0 && bankBalance.length > 0 && bankName.length > 0 && description.length > 0;
  }
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    setMonth({ 
      ...month, 
      financialMonth: value.label,
    });
  };

  console.log("new array -> ", monthArray.slice(monthArray.indexOf(month["financialMonth"])).concat(monthArray.slice(0, monthArray.indexOf(month["financialMonth"]))));
  var newCopyArray = monthArray.slice(monthArray.indexOf(month["financialMonth"])).concat(monthArray.slice(0, monthArray.indexOf(month["financialMonth"])));


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
                id="standard-accountCode"
                label="Account Code"
                type="number"
                variant="outlined"
                size="small"
                value={values.accountCode}
                onChange={handleChange('accountCode')}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                size="small"
                options={budgetMonth}
                getOptionLabel={option => option.label}
                onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Financial year"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Search"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                size="small"
                margin="normal"
                options={budgetPeriod}
                getOptionLabel={option => option.label}
                onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Period"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Search"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} style={{textAlign: "right"}}>
              <Button variant="contained" color="primary" startIcon={<CloudDownloadIcon />}>Generate from previous year</Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} elevation={0} className={classes.tableContainer}> 
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th" scope="row">Accounts</TableCell>
                      {newCopyArray.map((item) => {
                        console.log("item -->", item);
                        <TableCell align="left">{ item }</TableCell>
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={13}>Income</TableCell>
                    </TableRow>
                    {[0,1,2,3].map(row => (     
                      <TableRow>
                        <TableCell>Income</TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" className={classes.textField} /></TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={13}>Total Income</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={13}>Expense</TableCell>
                    </TableRow>
                    {[0,1,2,3].map(row => (     
                      <TableRow>
                        <TableCell>Expense</TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
                        <TableCell><TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" /></TableCell>
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
              onClick={() => {}}
              color="primary"
              variant="contained"
              disabled={!canSubmitValues()}
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