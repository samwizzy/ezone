import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import MUIDataTable from 'mui-datatables'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import { AddAnnouncement } from '../components/AddButton'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
}));

const Announcement = props => {
  const classes = useStyles();
  const { loading, openNewAnnouncementDialog, openAnnouncementViewDialog, getEmployees, announcements, getEmployee, employees, employee } = props;

  React.useEffect(() => {
  }, []);

  console.log(announcements, "announcements")

  if (!announcements) {
    return ''
  }

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'announcementType',
      label: 'Message type',
      options: {
        filter: true,
        sort: true
      },
    },
    {
      name: 'severity',
      label: 'Severity',
      options: {
        filter: true,
        sort: true
      },
    },
    {
      name: 'dateCreated',
      label: 'Published date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return moment(value).format('lll')
        }
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddAnnouncement openDialog={openNewAnnouncementDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      openAnnouncementViewDialog(rowData)
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <Grid
        container
      >
        <Grid item md={12}>
          <MUIDataTable
            className={classes.datatable}
            title="Announcement List"
            data={announcements}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Announcement.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
  openNewAnnouncementDialog: PropTypes.func,
  openAnnouncementViewDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
  announcements: Selectors.makeSelectAnnouncements(),
  user: AppSelectors.makeSelectCurrentUser(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
    openNewAnnouncementDialog: () => dispatch(Actions.openNewAnnouncementDialog()),
    openAnnouncementViewDialog: (data) => dispatch(Actions.openAnnouncementViewDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Announcement);
