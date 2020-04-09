import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  FormControlLabel,
  Icon,
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
  TextField
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Autocomplete } from '@material-ui/lab';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
// import LoadingIndicator from '../../../components/LoadingIndicator';
// import { AddButton } from './AddButton';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5, 5, 20),
    marginBottom: theme.spacing(4),
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    left: '150px',
    top: '180px',
    border: '1px solid #C4C4C4',
    borderRadius: '155px',
    padding: '25px',
  },
  edit: {
    position: 'absolute',
    height: '100px',
    left: '1280px',
    top: '180px',
    color: '#1A88E1',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '13px',
    lineHeight: '16px',
    // border: '2px solid #1A88E1',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      height: '100px',
      left: '265px',
      top: '150px',
      color: '#1A88E1',
    },
    textField: {
        margin: theme.spacing(1.5, 0),
    },
  },
  orgContainer: {
    padding: theme.spacing(0, 5, 0, 5),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  editButton: {
    width: '117px',
    height: '40px',
    background: '#1A88E1',
    borderRadius: '10px',
    align: 'right',
  },
  listFormat: {
    marginBottom: '10px',
    marginTop: '10px',
  },
  table: {
    minWidth: 650,
  },
}));

const AccountJournal = props => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([{}]);

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [values, setValues] = React.useState({
    "entries": [
    {
      "accountId": 0,
      "credit": 0,
      "debit": 0,
      "description": "string",
      "id": 0
    }
  ],
  "note": "string",
  "orgId": "string",
  "periodId": 0,
  "reference": "string",
  "transactionDate": "2020-04-08T12:13:17.505Z"
  });

  const addRow = () => {
    const item = {
      itemId: '',
      itemSku: '',
      transferQuantity: '',
    };
    setRows([...rows, item]);
  };

  const removeRow = idx => {
    setRows(rows.filter((item, id) => id !== idx));
  };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, currency: taxType.id });
  };

  const { 
    dispatchGetAllChartOfAccountTypeAction,
    chartOfAccountData
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllChartOfAccountTypeAction();
  }, []);

  console.log('chartOfAccountData journal -> ', chartOfAccountData);


  return (
    <React.Fragment>
      <div className={classes.root}>
      <h2>New Journal</h2>
      <Grid container spacing={2}>
        <Grid item xs={5}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Transaction Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={5}>
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
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="standard-description"
            label="Notes"
            size="small"
            variant="outlined"
            className={classes.textField}
            // value={values.description}
            // onChange={handleChange('description')}
            margin="normal"
            fullWidth
            rows={4}
            multiline
            />
        </Grid>
      </Grid>
    </div>

    <Grid container spacing={3}>
      <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell align="center">Account</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Debit</TableCell>
              <TableCell align="center">Credit</TableCell>
              <TableCell align="center"></TableCell>
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
                onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Method"
                    size="small"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Search"
                    fullWidth
                  />
                )}
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
              </TableCell>
              <TableCell align="center">
                <IconButton aria-label="delete" onClick={() => removeRow(id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={() => addRow()}>
        Add row
      </Button>
      <Button variant="contained" color="primary">
        Save
      </Button>
      </Grid>
    </Grid>
    </React.Fragment>
  );
};

AccountJournal.propTypes = {
//   loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
//   loading: Selectors.makeSelectLoading(),
  chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllChartOfAccountTypeAction: () => dispatch(Actions.getAllChartOfAccountTypeAction()),
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
