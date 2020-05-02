import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  Menu,
  MenuItem,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableFooter,
} from '@material-ui/core';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddIcon from '@material-ui/icons/Add';
import { Autocomplete } from '@material-ui/lab';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
// import LoadingIndicator from '../../../../components/LoadingIndicator';
import ModuleLayout from '../../components/ModuleLayout';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[100],
  },
  grid: {
    justifyContent: "space-between",
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(2, 0),
    }
  },
  gridMargin: { marginBottom: theme.spacing(2) },
  label: { marginLeft: theme.spacing(1) },
  table: {
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.5),
      },
    },
    '& .MuiTableFooter-root': {},
    '& .MuiTableCell-root': {
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
  },
}));

const AddNewJournal = props => {
  const classes = useStyles();

  const {
    currentUser,
    dispatchGetAccountPeriodAction,
    dispatchGetAllChartOfAccountTypeAction,
    chartOfAccountData,
    accountPeriodData,
    createNewAccountJournalAction
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAccountPeriodAction();
    dispatchGetAllChartOfAccountTypeAction();
  }, []);

  const [values, setValues] = React.useState({
    entries: [ ],
    note: "",
    orgId: currentUser.organisation.orgId,
    periodId: "",
    transactionDate: "",
  });

  const addRow = () => {
    const item = {
      accountId: "",
      credit: "",
      debit: "",
      description: "",
    };
    setValues({ ...values, "entries": [ ...values.entries, item ] });
  };

  // Filter all periods with status -> true
  const filteredAccountPeriodData = accountPeriodData.filter((item) => item.status);

  // Select current financial year
  const currentAccountPeriod = accountPeriodData.filter((item) => item.status && item.activeYear)[0];

  const removeRow = index => {
    values.entries.splice(index, 1);
    setValues({ ...values });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, periodId: value.id, transactionDate: value.startDate });
  };

  const handleRowChange = (event, index) => {
    const entries = [...values.entries];
    entries[index][event.target.name] = event.target.value;
    setValues({...values, entries});
  }

  const handleSelectChangeRows = (event, value, index) => {
    const { entries } = values;
    entries[index]["accountId"] = value.id;
    setValues({ ...values, entries });
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleImageChange = (ev) => { 
    let fileNode = []
    Object.keys(ev.target.files).map(index => {
      const { name } = ev.target.files[index]
      const result = toBase64(ev.target.files[index]);
      result.then(rs => {
        const file = Object.assign({}, { fileName: name, file: rs })
        fileNode.push(file)
      })   
    })
    setValues(_.set({ ...values }, event.target.name, fileNode))
  }

  console.log('values -> ', values);
  console.log('currentAccountPeriod -> ', currentAccountPeriod);

  
  return (
    <ModuleLayout>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classNames(classes.gridMargin)}>
            <Typography variant="h6">New Posting</Typography>
            <Typography variant="h6">
              {/* FY: {moment(currentAccountPeriod.startDate).format('dddd do-MMM-YYYY')} - {moment(currentAccountPeriod.endDate).format('dddd do-MMM-YYYY')} */}
            </Typography>
            <Grid container className={classes.grid}>
              <Grid item xs={5}>
                <Autocomplete
                  id="combo-box-demo"
                  options={filteredAccountPeriodData}
                  getOptionLabel={option => option.year}
                  onChange={(evt, value) => handleSelectChange(evt, value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Financial Year"
                      size="small"
                      className={classes.textField}
                      variant="outlined"
                      placeholder="Date"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-note"
                label="Notes"
                size="small"
                variant="outlined"
                className={classes.textField}
                value={values.note}
                onChange={handleChange('note')}
                margin="normal"
                fullWidth
                rows={4}
                multiline
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th">Account</TableCell>
                  <TableCell component="th">Description</TableCell>
                  <TableCell component="th">Debit</TableCell>
                  <TableCell component="th">Credit</TableCell>
                  <TableCell component="th" />
                </TableRow>
              </TableHead>
              <TableBody>
              {values.entries.map((row, id) => (
                <TableRow key={id}>
                  <TableCell align="center">
                    <Autocomplete
                      id={id}
                      options={chartOfAccountData}
                      getOptionLabel={option => option.accountCode}
                      onChange={(evt, value) => handleSelectChangeRows(evt, value, id)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Account"
                          size="small"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-description"
                      label="Description"
                      size="small"
                      type="name"
                      variant="outlined"
                      className={classes.textField}
                      name="description"
                      value={row.description}
                      onChange={(event) => handleRowChange(event, id)}
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-accountName"
                      label="Debit"
                      size="small"
                      type="number"
                      variant="outlined"
                      className={classes.textField}
                      name="debit"
                      value={row.debit}
                      disabled={row.credit}
                      onChange={(event) => handleRowChange(event, id)}
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-accountName"
                      label="Credit"
                      size="small"
                      type="number"
                      variant="outlined"
                      className={classes.textField}
                      name="credit"
                      value={row.credit}
                      disabled={row.debit}
                      onChange={(event) => handleRowChange(event, id)}
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="delete" onClick={() => removeRow(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Paper elevation={0} square className={classes.paper}>
                      <Typography variant="h6">
                        { values.entries.reduce((a, b) => a + Number(b.debit), 0) }
                      </Typography>
                    </Paper>
                  </TableCell>
                  <TableCell>
                    <Paper elevation={0} square className={classes.paper}>
                      <Typography variant="h6">
                        { values.entries.reduce((a, b) => a + Number(b.credit), 0) }
                      </Typography>
                    </Paper>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
            <Table className={classes.table}>
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addRow()}
                      startIcon={<AddIcon />}
                    >
                      Add Another Line
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="label"
                      startIcon={<AttachFileIcon />}
                      className={classes.label}
                    >
                      Attach a file
                      <input
                        name="attachments"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        multiple
                      />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Button
                      variant="contained"
                      color="inherit"
                      className={classes.button}
                    >
                      Cancel
                    </Button>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Save Draft
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        createNewAccountJournalAction(values);
                      }}
                    >
                      Save and Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Grid>
        </Grid>
      </div>
    </ModuleLayout>
  );
};

AddNewJournal.propTypes = {
  //   loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  //   loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
  accountPeriodData: Selectors.makeSelectGetAccountPeriodData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllChartOfAccountTypeAction: () => dispatch(Actions.getAllChartOfAccountTypeAction()),
    dispatchGetAccountPeriodAction: () => dispatch(Actions.getAccountPeriodAction()),
    createNewAccountJournalAction: evt => dispatch(Actions.createNewAccountJournalAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddNewJournal);
