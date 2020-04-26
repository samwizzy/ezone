import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  Avatar,
  Card, 
  CardContent, 
  CardActions,
  List, ListItem, ListItemText, ListItemAvatar,
  TextField,
  Typography,
  makeStyles,
  Button,
  MenuItem, 
  Divider,
  Grid,
  Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TableFooter
} from '@material-ui/core';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import TaskIcon from '../../../../images/TaskIcon.svg';
import BudgetIcon from '../../../../images/budgetIcon.svg';
import BudgetIcon2 from '../../../../images/budgetIcon2.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: '100%',
    minWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2)
  },
}));

const BudgetingDetails = props => {
  const classes = useStyles();

  const { 
    loading,
    currentUser, 
    budgetDialog, 
  } = props;

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

  const handleDateChange = (date, formatted, name) => { 
    // setForm(_.set({...form}, name, reformattedDate(date)))
  }

  return (
    <div>
      <Card square className={classes.card}>
        <CardContent>
          <Typography variant="h6">
            Budgeting Details
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Grid container spacing={1} className={classes.grid}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar 
                        className={classes.avatar} 
                        src={BudgetIcon}
                        />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={<Typography variant="subtitle1">Financial year</Typography>} 
                        secondary={<Typography variant="h6">6th Jan 2020 - 6th Dec 2020</Typography>} 
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar 
                          className={classes.avatar} 
                          src={BudgetIcon2}
                        />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={<Typography variant="subtitle1">Period</Typography>} 
                        secondary={<Typography variant="h6">Monthly</Typography>} 
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <TableContainer component={Paper} elevation={0} className={classes.tableContainer}> 
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th" scope="row">Accounts</TableCell>
                      <TableCell align="left">Jan</TableCell>
                      <TableCell align="left">Feb</TableCell>
                      <TableCell align="left">March</TableCell>
                      <TableCell align="left">April</TableCell>
                      <TableCell align="left">May</TableCell>
                      <TableCell align="left">June</TableCell>
                      <TableCell align="left">July</TableCell>
                      <TableCell align="left">Aug</TableCell>
                      <TableCell align="left">Sept</TableCell>
                      <TableCell align="left">Oct</TableCell>
                      <TableCell align="left">Nov</TableCell>
                      <TableCell align="left">Dec</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" colSpan={13}>Income</TableCell>
                    </TableRow>
                    {[0,1,2,3].map((row, i) => (     
                    <TableRow key={i}>
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
                    {[0,1,2,3].map((row, i) => (     
                    <TableRow key={i}>
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

BudgetingDetails.propTypes = {
  loading: PropTypes.bool,
  budgetDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  budgetDialog: Selectors.makeSelectBudgetingDialog(),
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
)(BudgetingDetails);