import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Divider,
  Icon,
  Button,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TextField,
  Typography
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
import ModuleLayout from './ModuleLayout'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    justifyContent: "space-between",
    '& .MuiGrid-item': {
      flex: 1,
    }
  },
  divider: { marginTop: theme.spacing(4) },
  table: {
    "& .MuiTableFooter-root": {
        borderTop: `1px solid ${theme.palette.grey[400]} !important`
    },
    "& .MuiTableCell-root": {
        "& button:last-child": {
          marginLeft: theme.spacing(1)
        }
    },
    '& .MuiTableCell-body': {
        color: theme.palette.text.secondary,
    },
  }
}));

const AccountJournal = props => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([{}]);

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [values, setValues] = React.useState({});

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
    <ModuleLayout>
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">New Journal</Typography>
          <Grid container className={classes.grid}>
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
            <Grid item xs={5}>
              <TextField
                id="standard-accountName"
                label="Reference Number"
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
          </Grid>
        </Grid>
        <Grid item xs={12}>
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

      <Divider className={classes.divider} />

      <Grid container>
      <Grid item xs={12}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th">Account</TableCell>
              <TableCell component="th">Description</TableCell>
              <TableCell component="th">Debit</TableCell>
              <TableCell component="th">Credit</TableCell>
              <TableCell component="th"></TableCell>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              <Button variant="contained" color="primary" onClick={() => addRow()} className={classes.button}>
                Add row
              </Button>
              <Button variant="contained" color="primary" className={classes.button}>
                Save
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
