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
import reducer from '../../reducers';
import saga from '../../saga';
import Company from '../../Components/CompanyLogo';
import * as Select from '../../../../../App/selectors';
import { makeStyles } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import ControlledButtons from '../../Components/BackButton';

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
  error,
  loading,
  dispatchGetGeneralJournalTimeAction,
  dispatchCleanUpAction,
  time,
  user,
}) => {
  const { startDate, endDate } = time;

  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);
  const [period, setPeriod] = useState({ firstDate: '', lastDate: '' });

  const classes = useStyles();

  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });

  useEffect(() => {
    return async () => {};
  }, []);

  const { organisation } = user;

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
    'Payment Amt',
    'Receipt Amt',
    'Balance',
  ];

  const handleData = () => {
    // dispatchGetAllGeneralJournalTypeAction();
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
      // dispatchGetGeneralJournalTimeAction({
      //   startDate: period.firstDate,
      //   endDate: period.lastDate,
      // });

      handleData();
    }
  }, [period]);

  const setDate =
    display &&
    `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
      'MMM Do YYYY',
    )}`;

  return (
    <React.Fragment>
      <ControlledButtons
        print={print}
        setPrint={setPrint}
        // tableData={data}
        // printCsc={[columns, data ? { ...data } : '']}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        daterange={setDate}
        dateValue={dateValue}
        head={[columns]}
        // body={data}
        fromDay="Start Date"
        toDay="End Date"
      />

      <div style={{ width: '100%', height: '100%' }}>
        <Company
          ComLogo={organisation.logo}
          name="Cash Account Register"
          date={setDate}
        />

        <MUIDataTable
          className={classes.datatable}
          // data={data && data.concat([TableFooterData])}
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
});

const mapDispatchToProps = dispatch => ({
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
