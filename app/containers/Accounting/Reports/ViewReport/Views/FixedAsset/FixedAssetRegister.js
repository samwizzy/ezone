import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectReports from '../../selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import reducer from '../../reducers';
import saga from '../../saga';
import Company from '../../Components/CompanyLogo';
import * as Select from '../../../../../App/selectors';
import { makeStyles } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import ControlledButtons from '../../Components/BackButton';
import EzoneUtils from '../../../../../../utils/EzoneUtils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    width: '100% !important',
    '& thead': {
      '& th': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
      },
    },
    '& tbody': {
      '& td': {
        padding: theme.spacing(1),
      },
    },
    '& tfoot': {
      '& td': {
        padding: theme.spacing(1),
      },
    },
  },
}));

const FixedAssetRegister = ({
  date,
  user,
  fixedAssetRegister,
  getFixedAssetRegister,
}) => {
  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });

  const classes = useStyles();
  const tableRef = useRef();
  const { organisation } = user;

  useEffect(() => {
    if (date.startDate && date.endDate) {
      getFixedAssetRegister(date);
    }
  }, [date]);

  useEffect(() => {
    return async () => {};
  }, []);

  const data = fixedAssetRegister.map(register => [
    register.serialNumber,
    register.assetLocation,
    register.assetDescription,
    register.assetSpecification,
    register.assetQuantity,
    register.condition,
    moment(register.acquisitionDate).format('ll'),
    register.acquisitionCost,
    register.additionalDuringTheYear,
    register.disposal,
  ]);

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    elevation: 0,
    download: false,
    print: false,
    pagination: false,
    viewColumns: false,
  };

  const columns = [
    'Asset Code',
    'Location of asset',
    'Description',
    'Specification',
    'Qty',
    'Condition',
    'Acquisition date',
    {
      name: 'Cost at Acquisition',
      label: 'Cost at Acquisition',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    'Additions during the year',
    {
      name: 'Disposals/Transfer',
      label: 'Disposals/Transfer',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
  ];

  const csvPrint = data.reduce((accumulator, ele) => {
    let obj = {
      'Asset Code': ele[0],
      'Location of asset': ele[1],
      Description: ele[2],
      Specification: ele[3],
      Qty: ele[4],
      Condition: ele[5],
      'Acquisition date': ele[6],
      'Cost at Acquisition': ele[7],
      'Additions during the year': ele[8],
      'Disposals/Transfer': ele[9],
    };
    accumulator.push(obj);
    return accumulator;
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={csvPrint}
          printCsc={[columns, data ? { ...data } : '']}
          pdflogo={organisation.logo}
          tableRef={tableRef}
          daterange={`${date.startDate} — ${date.endDate}`}
          dateValue={date.endDate}
          head={[
            [
              'Asset Code',
              'Location of asset',
              'Description',
              'Specification',
              'Qty',
              'Condition',
              'Acquisition date',
              'Cost at Acquisition',
              'Additions during the year',
              'Disposals/Transfer',
            ],
          ]}
          body={data}
        />
      </Grid>
      <Grid item xs={12}>
        <Company
          logo={organisation.logo}
          name="Fixed Asset Register"
          date={date}
        />

        <MUIDataTable
          className={classes.datatable}
          data={data}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  date: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
  fixedAssetRegister: Selectors.makeSelectFixedAssetRegister(),
});

const mapDispatchToProps = dispatch => ({
  getFixedAssetRegister: data => dispatch(Actions.getFixedAssetRegister(data)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FixedAssetRegister);
