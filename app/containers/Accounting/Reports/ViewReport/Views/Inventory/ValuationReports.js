import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import MUIDataTable from 'mui-datatables';
import { makeStyles, Grid } from '@material-ui/core';
import ControlledButtons from '../../Components/BackButton';
import Company from '../../Components/CompanyLogo';
import * as Select from '../../../../../App/selectors';

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

const ValuationReports = ({ date, user, getValuations }) => {
  const classes = useStyles();
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();

  const { organisation } = user;

  const columns = [
    'Item ID',
    'Item Class',
    'Item Description',
    'Cost Center ID',
    'Stocking U/M',
    'Cost Method',
    'Qty on Hand',
    'Item Value',
    'Avg Cost',
    '% of Inv Value',
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    download: false,
    filter: false,
    print: false,
    pagination: false,
    viewColumns: false,
    elevation: 0,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={[]}
          printCsc={[columns, [] ? { ...[] } : '']}
          date={date}
          pdflogo={organisation.logo}
          daterange={`${date.startDate} — ${date.endDate}`}
          tableRef={tableRef}
          head={[columns]}
          body={[]}
        />
      </Grid>
      <Grid item xs={12}>
        <div ref={componentRef}>
          <Company
            logo={organisation.logo}
            name="Valuation Reports"
            date={date}
          />

          <MUIDataTable
            className={classes.datatable}
            title="Valuation Reports"
            data={[]}
            columns={columns}
            options={options}
          />
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  date: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  getValuations: () => dispatch(() => {}),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ValuationReports);
