import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
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

const FixedAssetSchedule = ({
  date,
  user,
  fixedAssetSchedule,
  getFixedAssetSchedule,
}) => {
  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });

  // const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();

  const classes = useStyles();
  const { organisation } = user;

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
    'Date',
    'Asset Code',
    'Description',
    {
      name: 'Cost Bfwd',
      label: 'Cost Bfwd',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Addition',
      label: 'Addition',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Disposal',
      label: 'Disposal',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Cost Cfwd',
      label: 'Cost Cfwd',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Depreciation Bfwd',
      label: 'Depreciation Bfwd',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'addition',
      label: 'Addition',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Disposal',
      label: 'Disposal',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Depriciation Cfwd',
      label: 'Depriciation Cfwd',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Net Book Value',
      label: 'Net Book Value',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
  ];
  const data = fixedAssetSchedule.map(schedule => [
    moment(schedule.date).format('ll'),
    schedule.assetId,
    schedule.assetDescription,
    schedule.costBroughtForward,
    schedule.costAddition,
    schedule.costDisposal,
    schedule.costCarriedForward,
    schedule.depreciationBroughtForward,
    schedule.additionAfterDepreciation,
    schedule.disposalAfterDepreciation,
    schedule.depreciationCarriedForward,
    schedule.netBookValue,
  ]);

  const csvPrint = data.reduce((accumulator, ele) => {
    let obj = {
      Date: ele[0],
      'Asset Code': ele[1],
      Description: ele[2],
      'Cost Bfwd': ele[3],
      Addition: ele[4],
      Disposal: ele[5],
      'Cost Cfwd': ele[6],
      'Depriciation Bfwd': ele[7],
      Addition: ele[8],
      Disposal: ele[9],
      'Depriciation Cfwd': ele[10],
      'Net Book Value': ele[11],
    };
    accumulator.push(obj);
    return accumulator;
  }, []);

  useEffect(() => {
    if (date.startDate && date.endDate) {
      getFixedAssetSchedule(date);
    }
  }, [date]);

  useEffect(() => {
    return async () => {};
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={csvPrint}
          printCsc={[columns, data ? { ...data } : '']}
          pdflogo={organisation.logo}
          tableRef={tableRef}
          companyRef={companyRef}
          daterange={`${date.startDate} — ${date.endDate}`}
          dateValue={date.endDate}
          head={[
            [
              'Date',
              'Asset Code',
              'Description',
              'Cost Bfwd',
              'Addition',
              'Disposal',
              'Cost Cfwd',
              'Depriciation Bfwd',
              'Addition',
              'Disposal',
              'Depriciation Cfwd',
              'Net Book Value',
            ],
          ]}
          body={data}
        />
      </Grid>
      <Grid item xs={12}>
        <Company
          logo={organisation.logo}
          name="Fixed Asset Schedule"
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
  date: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
  fixedAssetSchedule: Selectors.makeSelectFixedAssetSchedule(),
});

const mapDispatchToProps = dispatch => ({
  getFixedAssetSchedule: data => dispatch(Actions.getFixedAssetSchedule(data)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FixedAssetSchedule);
