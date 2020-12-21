import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectReports from '../../selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import viewReportReducer from '../../reducers';
import ReportSaga from '../../saga';
import Company from '../../Components/CompanyLogo';
import formatDate from '../../Helpers';
import * as Select from '../../../../../App/selectors';
import { makeStyles } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import {
  TableFooter,
  TablePagination,
  TableRow,
  TableCell,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import classNames from 'classnames';
import ControlledButtons from '../../Components/BackButton';
import EzoneUtils from '../../../../../../utils/EzoneUtils';

import './style.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: ' 0px 24px 24px 24px',
  },
  flex: {
    position: 'relative',
    padding: theme.spacing(8, 2),
  },
  tableFoot: {
    backgroundColor: darken(theme.palette.primary.main, 0.1),
  },
  datatable: {
    width: '100% !important',
    '& thead': {
      '& th': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: '8px !important',
      },
    },
    '& tbody': {
      '& td': {
        padding: '8px !important',
      },
    },
    '& tfoot': {
      '& td': {
        padding: '8px !important',
      },
    },
  },
}));

const FixedAssetSchedule = ({
  time,
  user,
  fixedAssetSchedule,
  fixedAssetScheduleRange,
  dispatchGetAllFixedAssetScheduleAction,
  dispatchGetGeneralJournalTimeAction,
  dispatchCleanUpAction,
  dispatchGetFixedAssetScheduleRangeAction,
}) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);
  const [period, setPeriod] = useState({ firstDate: '', lastDate: '' });
  const [show, setShow] = useState('');

  const classes = useStyles();
  const { organisation } = user;
  const { startDate, endDate } = time;
  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    return async () => await dispatchCleanUpAction();
  }, []);
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
      name: 'Depriciation Bfwd',
      label: 'Depriciation Bfwd',
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
    formatDate(schedule.date),
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
  const setDate =
    startDate !== ''
      ? `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
          'MMM Do YYYY',
        )}`
      : '';

  useEffect(() => {
    const { selectedRange } = fixedAssetScheduleRange;
    setShow(selectedRange);
  }, [display, time]);

  const handleData = () => {
    dispatchGetAllFixedAssetScheduleAction();
    dispatchGetFixedAssetScheduleRangeAction({ selectedRange: setDate });
    setDisplay(true);
  };
  const dateValue = ({ target }) => {
    if (target.name === 'Start Date') {
      setPeriod({ ...period, firstDate: target.value.split('-').join('/') });
    }
    if (target.name === 'End Date') {
      setPeriod({ ...period, lastDate: target.value.split('-').join('/') });
    }
  };

  useEffect(() => {
    if (period.lastDate && period.firstDate) {
      dispatchGetGeneralJournalTimeAction({
        startDate: period.firstDate,
        endDate: period.lastDate,
      });

      handleData();
    }
  }, [period]);

  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  return (
    <React.Fragment>
      <ControlledButtons
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={csvPrint}
        printCsc={[columns, data ? { ...data } : '']}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={setDate || show}
        dateValue={dateValue}
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
        fromDay="Start Date"
        toDay="End Date"
      />
      <div style={{ width: '100%', height: '100%' }} ref={componentRef}>
        <Company
          ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={setDate || show}
        />

        <MUIDataTable
          className={classes.datatable}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  time: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
  fixedAssetSchedule: Selectors.makeSelectFixedAssetSchedule(),
  fixedAssetScheduleRange: Selectors.makeSelectFixedAssetScheduleTimeRange(),
  report: Selectors.makeSelectFixedAssetScheduleTimeRange(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalTimeAction: data =>
    dispatch(Actions.getGeneralJournalTimeAction(data)),
  dispatchGetFixedAssetScheduleRangeAction: data =>
    dispatch(Actions.getFixedAssetScheduleRangeAction(data)),
  dispatchGetAllFixedAssetScheduleAction: () =>
    dispatch(Actions.getAllFixedAssetScheduleAction()),
  dispatchCleanUpAction: () => dispatch(Actions.cleanUpGeneralJournalAction()),
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
