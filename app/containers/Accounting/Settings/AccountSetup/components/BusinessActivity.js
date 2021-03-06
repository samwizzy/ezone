import React, { Fragment, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alert, AlertTitle } from '@material-ui/lab';
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
import GetAppIcon from '@material-ui/icons/GetApp';
import MUIDataTable from 'mui-datatables';
import ImportIcon from '@material-ui/icons/ArrowUpward';
import NextIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formContainer: {
    margin: theme.spacing(0, 2),
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer',
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
  const { form, handlePrev, handleSubmit, chartOfAccounts } = props;

  console.log(chartOfAccounts, 'chartOfAccounts chartOfAccounts');

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
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    filter: false,
    print: false,
    viewColumns: false,
    search: false,
    textLabels: {
      body: {
        noMatch: 'No default chart of accounts found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    elevation: 0,
  };

  const handleImageChange = file => {};

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.formContainer}>
          {form.accountChart === 'IMPORT' && (
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
          )}
        </div>

        {form.accountChart === 'DEFAULT' ? (
          <MUIDataTable
            className={classes.datatable}
            data={chartOfAccounts}
            columns={columns}
            options={options}
          />
        ) : (
          <Alert severity="info">
            <AlertTitle>Heads up</AlertTitle>
            You have selected an option to create custom chart of accounts ???{' '}
            <strong>You are almost there!</strong>
          </Alert>
        )}

        <Box mt={4}>
          <Typography variant="caption">
            <strong>NB:</strong> You can always edit your account under settings
            after setup
          </Typography>
        </Box>
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
            onClick={handleSubmit}
            endIcon={<NextIcon />}
          >
            Finish
          </Button>
        </CardActions>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  businessTypes: Selectors.makeSelectBusinessTypes(),
  chartOfAccounts: Selectors.makeSelectGetChartOfAccounts(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(BusinessActivity);
