import React, { memo, useEffect, useState, useRef } from 'react';
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
import { makeStyles, Grid } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import ControlledButtons from '../../Components/BackButton';
import EzoneUtils from '../../../../../../utils/EzoneUtils';

const useStyles = makeStyles(theme => ({
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

const GeneralJournal = ({
  loading,
  generalJournals,
  getGeneralJournals,
  date,
  user,
}) => {
  const classes = useStyles();
  const tableRef = useRef();

  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });

  useEffect(() => {
    if (date.startDate && date.endDate) {
      getGeneralJournals(date);
    }
  }, [date]);

  useEffect(() => {
    return () => {};
  }, []);

  console.log(generalJournals, 'generalJournals');

  const { journalEntries, debitTotal, creditTotal } = generalJournals;
  const { organisation } = user;

  const data =
    journalEntries &&
    journalEntries.map(journal => [
      `${moment(journal.dateCreated).format('ll')}`,
      `${journal.accountCode}`,
      `${journal.reference}`,
      `${journal.description}`,
      `${
        journal.currency
          ? journal.currency &&
            journal.exchangeRate &&
            journal.currency.symbol.concat(
              Math.ceil(
                Math.max(journal.debit, journal.credit) / journal.exchangeRate,
              ),
            )
          : ''
      }`,
      `${journal.exchangeRate ? journal.exchangeRate : ''}`,
      `${journal.debit === 0 ? '' : journal.debit}`,
      `${journal.credit === 0 ? '' : journal.credit}`,
    ]);

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    elevation: 0,
    download: false,
    filter: false,
    print: false,
    pagination: false,
    viewColumns: false,
  };

  const CustomFooter = {
    date: null,
    accountCode: null,
    reference: null,
    description: null,
    currency: null,
    exchangeRate: null,
    debit: null,
    credit: 56579,
  };

  const columns = [
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => (value ? moment(value).format('ll') : ''),
      },
    },
    {
      name: 'accountCode',
      label: 'Account Code',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'reference',
      label: 'Reference',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'description',
      label: 'Trans. Description',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'currency',
      label: 'Currency',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'exchangeRate',
      label: 'exchangeRate',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'debit',
      label: 'Debit Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'credit',
      label: 'Credit Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
  ];

  const csvPrint =
    data &&
    data.concat(TableFooterData).reduce((accumulator, ele) => {
      let obj = {
        Date: ele[0],
        'Account Code': ele[1],
        Reference: ele[2],
        'Trans Description': ele[3],
        Currency: ele[4],
        'Exchange Rate': ele[5],
        'Debit Amt': ele[6],
        'Credit Amt': ele[7],
      };
      accumulator.push(obj);
      return accumulator;
    }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={data}
          printCsc={[columns, data ? { ...data } : '']}
          date={date}
          pdflogo={organisation.logo}
          daterange={`${date.startDate} — ${date.endDate}`}
          tableRef={tableRef}
          head={[columns]}
          body={data}
        />
      </Grid>

      <Grid item xs={12}>
        <Company logo={organisation.logo} name="General Journal" date={date} />

        <MUIDataTable
          className={classes.datatable}
          title="General Journal Report"
          data={journalEntries}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  loading: Selectors.makeSelectLoading(),
  error: Selectors.makeSelectError(),
  date: Selectors.makeSelectDate(),
  generalJournals: Selectors.makeSelectGeneralJournals(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  getGeneralJournals: date => dispatch(Actions.getGeneralJournals(date)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GeneralJournal);
