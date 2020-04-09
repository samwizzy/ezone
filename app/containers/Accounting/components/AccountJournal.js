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
import * as AppSelectors from '../../App/selectors';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../components/LoadingIndicator';
import ModuleLayout from './ModuleLayout';

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
    textField: {
      margin: theme.spacing(1.5, 0),
    },
  },
}));

const AccountJournal = props => {
  const classes = useStyles();

  const {
    currentUser,
    dispatchGetAllChartOfAccountTypeAction,
    chartOfAccountData,
  } = props;

  const [values, setValues] = React.useState({
    entries: [],
    note: '',
    orgId: currentUser.organisation.orgId,
    periodId: '',
    reference: '',
    transactionDate: '',
  });

  const [rows, setRows] = React.useState([{}]);

  const addRow = () => {
    const item = {
      accountId: 0,
      credit: 0,
      debit: 0,
      description: '',
      id: 0,
    };
    setRows([...rows, item]);
  };

  const removeRow = idx => {
    setRows(rows.filter((item, id) => id !== idx));
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeW = idx => event => {
    // console.log(idx, 'idx');
    const { name, value } = event.target;
    // console.log(value, 'target.value');
    // console.log(name, 'target.name');
    const newRow = rows;
    newRow[idx][name] = value;
    setRows(newRow);
    // setValues({ ...values, [name]: event.target.value });
  };

  console.log(rows, 'rows come here');
  // const handleChangeRows = name => (event, id) => {
  //   console.log('name -> ', name);
  //   console.log('event -> ', event);
  //   console.log('id -> ', id);

  //   setRows({ ...rows, [name]: event.target.value });
  // };

  const handleChangeRows = idx => e => {
    const { value } = e.target;
    const newRow = rows;
    newRow[idx].transferQuantity = value;
    setRows(newRow);
  };

  const handleChangeTransaction = idx => e => {
    const { value } = e.target;
    const newRow = rows;
    newRow[idx].debit = value;
    setRows(newRow);
  };

  // const handleChangeRows = (event, id) => {
  //   console.log('event.target ', event.target);
  //   const { value } = event.target;

  //   console.log('name -> ', name);
  //   console.log('value -> ', value);
  //   // console.log('id -> ', id);

  //   setRows({ ...rows, [name]: event.target.value });
  // };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, currency: taxType.id });
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllChartOfAccountTypeAction();
  }, []);

  console.log('values-> ', values);
  console.log('rows-> ', rows);

  return (
    <ModuleLayout>
      <div className={classes.root}>
        <Grid
          container
        >
          <Grid item xs={12} className={classNames(classes.gridMargin)}>
            <Typography variant="h6">New Journal</Typography>
            <Grid container className={classes.grid}>
              <Grid item xs={5}>
                <Autocomplete
                  id="combo-box-demo"
                  options={chartOfAccountData}
                  getOptionLabel={option => option.accountNumber}
                  onChange={(evt, value) => handleSelectChange(evt, value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Transaction Date"
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
              <Grid item xs={5}>
                <TextField
                  id="standard-reference"
                  label="Reference Number"
                  size="small"
                  type="name"
                  variant="outlined"
                  className={classes.textField}
                  value={values.reference}
                  onChange={handleChange('reference')}
                  margin="normal"
                  fullWidth
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
                {rows.map((row, id) => (
                  <TableRow key={id}>
                    <TableCell align="center">
                      <Autocomplete
                        id="combo-box-demo"
                        options={chartOfAccountData}
                        getOptionLabel={option => option.accountNumber}
                        onChange={(evt, value) =>
                          handleSelectChange(evt, value)
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Method"
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            placeholder="Search"
                            fullWidth
                            margin="normal"
                          />
                        )}
                      />
                      <Autocomplete
                        id="combo-box-demo"
                        options={chartOfAccountData}
                        getOptionLabel={option => option.accountNumber}
                        onChange={(evt, value) =>
                          handleSelectChange(evt, value)
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Method"
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            placeholder="Search"
                            fullWidth
                            margin="normal"
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
                        value={rows.description}
                        name="description"
                        onChange={handleChangeW(id)}
                        margin="normal"
                        fullWidth
                      />
                      <TextField
                        id="standard-debit"
                        label="Debit"
                        size="small"
                        type="name"
                        variant="outlined"
                        className={classes.textField}
                        value={rows.debit}
                        name="debit"
                        onChange={handleChangeW(id)}
                        margin="normal"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        id="standard-accountName"
                        label="Transaction"
                        size="small"
                        type="name"
                        variant="outlined"
                        className={classes.textField}
                        // value={values.accountName}
                        // onChange={handleChange('accountName')}
                        margin="normal"
                        fullWidth
                      />
                      <TextField
                        id="standard-accountName"
                        label="Transaction"
                        size="small"
                        type="name"
                        variant="outlined"
                        className={classes.textField}
                        // value={values.accountName}
                        // onChange={handleChange('accountName')}
                        margin="normal"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        id="standard-accountName"
                        label="Transaction"
                        size="small"
                        type="name"
                        variant="outlined"
                        className={classes.textField}
                        // value={values.accountName}
                        // onChange={handleChange('accountName')}
                        margin="normal"
                        fullWidth
                      />
                      <TextField
                        id="standard-accountName"
                        label="Transaction"
                        size="small"
                        type="name"
                        variant="outlined"
                        className={classes.textField}
                        // value={values.accountName}
                        // onChange={handleChange('accountName')}
                        margin="normal"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeRow(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Paper elevation={0} square className={classes.paper}>
                      <Typography variant="h6">NGN 10500</Typography>
                    </Paper>
                  </TableCell>
                  <TableCell>
                    <Paper elevation={0} square className={classes.paper}>
                      <Typography variant="h6">NGN 10500</Typography>
                    </Paper>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="label"
                      startIcon={<AttachFileIcon />}
                    >
                      Attach a file
                      <input
                        name="attachments"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={() => {}}
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
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Save Draft
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
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

AccountJournal.propTypes = {
  //   loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  //   loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllChartOfAccountTypeAction: () =>
      dispatch(Actions.getAllChartOfAccountTypeAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountJournal);
