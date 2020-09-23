import React, { Fragment, memo, useState } from 'react';
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as Selectors from './../selectors';
import {
  makeStyles,
  Box,
  Button,
  CardActions,
  TextField,
  Grid,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import ImportIcon from '@material-ui/icons/ArrowUpward';
import NextIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { createStructuredSelector } from 'reselect';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formContainer: {
    margin: theme.spacing(0, 2),
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
}));

const BusinessActivity = props => {
  const classes = useStyles(props);
  const { form, handlePrev, handleSubmit, chartOfAccounts } = props

  const [chartOfAccountData, setChartOfAccountData] = useState([
    { accountCode: '10000', accountName: 'Pretty Cash', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' },
    { accountCode: '10100', accountName: 'Cash on Hand', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' },
    { accountCode: '10200', accountName: 'Bank Account - Payroll', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' },
    { accountCode: '10300', accountName: 'Savings Account', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' },
    { accountCode: '10400', accountName: 'Special Account', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' }
  ])

  console.log(chartOfAccounts, "chartOfAccounts chartOfAccounts")

  const columns = [
    {
      name: 'accountCode',
      label: 'Account Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountName',
      label: 'Account Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountType',
      label: 'Account Type',
      options: {
        filter: true,
        sort: false,
      },
    },
  ]

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    elevation: 0
  }

  const handleImageChange = (file) => { }

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.formContainer}>
          {form.accountChart === 'IMPORT' &&
            <Fragment>
              <Button
                variant="contained"
                color="primary"
                component="label"
                startIcon={<ImportIcon />}
                className={classes.label}
              >
                Upload a Chart of Account
                <input
                  name="attachments"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  multiple
                />
              </Button>

              <TextField
                id="url"
                disabled
                label="Chart of account URL"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                type="button"
                disabled
                component="label"
              >
                Upload from URL
              </Button>
            </Fragment>
          }
        </div>

        <MUIDataTable
          className={classes.datatable}
          data={chartOfAccountData}
          columns={columns}
          options={options}
        />

        <Box m={4}><FormHelperText>NB: You can edit account after setup</FormHelperText></Box>
      </Grid>

      <Grid item xs={12}>
        <CardActions>
          <Button
            variant="contained"
            onClick={handlePrev}
            startIcon={<BackIcon />}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => { }}
            endIcon={<NextIcon />}
          >
            Finish
          </Button>
        </CardActions>
      </Grid>
    </Grid>
  );
}


const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  businessTypes: Selectors.makeSelectBusinessTypes(),
  chartOfAccounts: Selectors.makeSelectGetChartOfAccounts(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
  memo,
)(BusinessActivity);
