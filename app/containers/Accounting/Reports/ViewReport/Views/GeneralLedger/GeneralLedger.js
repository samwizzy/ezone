import React, { Fragment, memo, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
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
import EzoneUtils from '../../../../../../utils/EzoneUtils';
import MUIDataTable from 'mui-datatables';
import ControlledButtons from '../../Components/BackButton';
import Modal from './Modal';

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
    '& td': {
      cursor: 'pointer',
      padding: theme.spacing(1),
    },
  },
}));

const GeneralLedger = ({ date, generalLedger, getGeneralLedgers, user }) => {
  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });
  const tableRef = useRef();

  const [print, setPrint] = useState(false);
  const [open, setOpen] = useState(false);
  const [infodata, setInfodata] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    return () => {};
  }, []);

  const { organisation } = user;

  const gl_values = _.values(generalLedger);

  const columns = [
    'Account Code',
    'Account Name',
    {
      name: 'Credit Amount',
      label: 'Credit Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Debit Amount',
      label: 'Debit Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
  ];

  const data = gl_values.map((ledger, index) => {
    return [
      `${ledger[0].accountCode}`,
      `${Object.keys(generalLedger)[index]}`,
      `${ledger.reduce((a, b) => a + b.creditAmount, 0)}`,
      `${ledger.reduce((a, b) => a + b.debitAmount, 0)}`,
    ];
  });

  console.log(generalLedger, 'generalLedger');
  console.log(gl_values, 'GL_values');
  console.log(data, 'data');

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    download: false,
    print: false,
    filter: false,
    pagination: false,
    rowsPerPage: 20,
    count: 15,
    page: 0,
    viewColumns: false,
    onRowClick: rowData => handleRowClick(rowData),
    elevation: 0,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (date.startDate && date.endDate) {
      getGeneralLedgers(date);
    }
    console.log('date has been updated');
  }, [date]);

  const handleRowClick = rowInfo => {
    handleOpen();
    setInfodata(rowInfo);
    console.log('who touched me');
  };

  return (
    <Fragment>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <ControlledButtons
            print={print}
            setPrint={setPrint}
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
          <Company logo={organisation.logo} name="General Ledger" date={date} />

          <MUIDataTable
            className={classes.datatable}
            title="General Ledger Report"
            data={data}
            columns={columns}
            options={options}
            ref={tableRef}
          />
        </Grid>
      </Grid>

      <Modal
        open={open}
        handleClose={handleClose}
        rowInfo={infodata}
        generalLedgers={generalLedger}
        date={date}
      />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  loading: Selectors.makeSelectLoading(),
  error: Selectors.makeSelectError(),
  date: Selectors.makeSelectDate(),
  generalLedger: Selectors.makeSelectGeneralLedgers(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  getGeneralLedgers: data => dispatch(Actions.getGeneralLedgers(data)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GeneralLedger);
