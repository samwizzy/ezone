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
import EzoneUtils from '../../../../../../utils/EzoneUtils';
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

const CashAccountRegister = ({
  time,
  user,
  cashAccountRegister,
  cashAccountRegisterRange,
  dispatchGetAllCashAccountRegisterAction,
  dispatchGetGeneralJournalTimeAction,
  dispatchCleanUpAction,
  dispatchGetCashAccountRegisterRangeAction,
}) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [show, setShow] = useState('');

  const classes = useStyles();

  const { organisation } = user;
  const { startDate, endDate } = time;
  const [period, setPeriod] = useState({ firstDate: '', lastDate: '' });

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  const handleData = () => {
    dispatchGetAllCashAccountRegisterAction();
    dispatchGetCashAccountRegisterRangeAction({ selectedRange: setDate });
    setDisplay(true);
  };
  const data = cashAccountRegister.map(account => [
    formatDate(account.date),
    account.reference,
    account.type ? account.type : '',
    account.payee ? account.payee : '',
    account.memo ? account.memo : '',
    account.paymentAmount ? account.paymentAmount : '',
    account.receiptAmount ? account.receiptAmount : '',
    account.balance ? account.balance : '',
  ]);

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    elevation: 0,
    download: false,
    print: false,
    pagination: true,
    viewColumns: false,
  };

  const columns = [
    'Date',
    'Reference',
    'Type',
    'Payee/Paid By',
    'Memo',
    {
      name: 'Payment Amt',
      label: 'Payment Amt',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Receipt Amt',
      label: 'Receipt Amt',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Balance',
      label: 'Balance',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
  ];

  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  const setDate =
    startDate !== ''
      ? `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
          'MMM Do YYYY',
        )}`
      : '';

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
    return async () => await dispatchCleanUpAction();
  }, [period]);

  useEffect(() => {
    const { selectedRange } = cashAccountRegisterRange;
    setShow(selectedRange);
  }, [display, time]);

  const csvPrint =
    data &&
    data.reduce((accumulator, ele) => {
      let obj = {
        Date: ele[0],
        Reference: ele[1],
        Type: ele[2],
        'Payee/Paid By': ele[3],
        Memo: ele[4],
        'Payment Amt': ele[5],
        'Receipt Amt': ele[6],
        Balance: ele[7],
      };
      accumulator.push(obj);
      return accumulator;
    }, []);

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
        daterange={setDate}
        dateValue={dateValue}
        head={[
          [
            'Date',
            'Reference',
            'Type',
            'Payee/Paid By',
            'Memo',
            'Payment Amt',
            'Receipt Amt',
            'Balance',
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
          date={setDate}
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
  time: Selectors.makeSelectTime(),
  user: Select.makeSelectCurrentUser(),
  cashAccountRegister: Selectors.makeSelectCashAccountRegister(),
  cashAccountRegisterRange: Selectors.makeSelectCashAccountRegisterTimeRange(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalTimeAction: data =>
    dispatch(Actions.getGeneralJournalTimeAction(data)),
  dispatchGetCashAccountRegisterRangeAction: data =>
    dispatch(Actions.getCashAccountRegisterRangeAction(data)),
  dispatchGetAllCashAccountRegisterAction: () =>
    dispatch(Actions.getAllCashAccountRegisterAction()),
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
)(CashAccountRegister);
