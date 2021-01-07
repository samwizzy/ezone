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

const ItemList = ({ date, user, getItemReport }) => {
  const classes = useStyles();
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();

  const { organisation } = user;

  useEffect(() => {}, []);

  const columns = [
    'Item ID',
    'Item Description',
    'Item Class',
    'Active?',
    'Item Type',
    'Qty on Hand',
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
          <Company logo={organisation.logo} name="Item List" date={date} />

          <MUIDataTable
            className={classes.datatable}
            title="Item List Reports"
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
  getItemReport: () => dispatch(() => {}),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ItemList);
