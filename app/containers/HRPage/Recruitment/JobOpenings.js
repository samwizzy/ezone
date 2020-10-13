import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import MUIDataTable from 'mui-datatables'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import EditSharp from '@material-ui/icons/EditSharp';
import Assignment from '@material-ui/icons/Assignment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
    '& tr:hover': {
      cursor: 'pointer'
    },
    '& thead': {
      '& th': {
        color: theme.palette.common.white,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  table: {
    border: 0,
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    width: 14,
    height: 14,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
  }
}));

const JobOpening = props => {
  const classes = useStyles();
  const { loading, match, jobOpenings, history } = props;

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'jobTitle',
      label: 'Job Title',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'department.name',
      label: 'Department',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'enrollmentType.name',
      label: 'Enrollment type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dateCreated',
      label: 'Published on',
      options: {
        filter: true,
        sort: false,
        customBodyRender: day => day ? moment(day).format('lll') : ''
      },
    },
    {
      name: 'submissionDeadline',
      label: 'Deadline',
      options: {
        filter: true,
        sort: false,
        customBodyRender: day => day ? moment(day).format('lll') : ''
      },
    },
    {
      name: 'dateCreated',
      label: 'Date Published',
      options: {
        filter: true,
        sort: false,
        customBodyRender: day => day ? moment(day).format('lll') : ''
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => (
      <Button component={Link} to="/hr/recruitment/new" variant="contained" color="primary" startIcon={<Icon>add</Icon>}>New</Button>
    ),
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      history.push(`${match.url}/view/${rowData[0]}`);
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Recruitment"
        data={jobOpenings}
        columns={columns}
        options={options}
      />
    </div>
  );
};

JobOpening.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  jobOpenings: Selectors.makeSelectJobOpenings(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(JobOpening);
