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

const FixedAssetRegister = ({
  time,
  user,
  fixedAssetRegister,
  fixedAssetRegisterRange,
  dispatchGetAllFixedAssetRegisterAction,
  dispatchGetGeneralJournalTimeAction,
  dispatchCleanUpAction,
  dispatchGetFixedAssetRegisterRangeAction,
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

  const data = fixedAssetRegister.map(register => [
    register.serialNumber,
    register.assetLocation,
    register.assetDescription,
    register.assetSpecification,
    register.assetQuantity,
    register.condition,
    formatDate(register.acquisitionDate),
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
  const setDate =
    startDate !== ''
      ? `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
          'MMM Do YYYY',
        )}`
      : '';

  const handleData = () => {
    dispatchGetAllFixedAssetRegisterAction();
    dispatchGetFixedAssetRegisterRangeAction({ selectedRange: setDate });
    setDisplay(true);
  };
  useEffect(() => {
    const { selectedRange } = fixedAssetRegisterRange;
    setShow(selectedRange);
  }, [display, time]);

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

// export default FixedAssetRegister;

const mapStateToProps = createStructuredSelector({
  time: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
  fixedAssetRegister: Selectors.makeSelectFixedAssetRegister(),
  fixedAssetRegisterRange: Selectors.makeSelectFixedAssetRegisterTimeRange(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalTimeAction: data =>
    dispatch(Actions.getGeneralJournalTimeAction(data)),
  dispatchGetFixedAssetRegisterRangeAction: data =>
    dispatch(Actions.getFixedAssetRegisterRangeAction(data)),
  dispatchGetAllFixedAssetRegisterAction: () =>
    dispatch(Actions.getAllFixedAssetRegisterAction()),
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
)(FixedAssetRegister);
