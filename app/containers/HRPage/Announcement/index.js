/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './../actions';
import makeSelectHRPage from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import ModuleLayout from './ModuleLayout'
import AnnouncementList from './AnnouncementList';

const key = 'hrPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));
/*
const announcements = [
  {id: 1, title: "Stand Up starts by 5:00", sentTo: "Yinka", msgType: "Email", date: "May 3rd 2020"}
]
*/
const Announcement = props => {
  const classes = useStyles();
  const { loading, openNewAnnouncementDialog, announcements, getAnnouncements, openAnnouncementViewDialog, getEmployees, roles, getEmployee, employees, employee } = props;

  React.useEffect(() => {
  }, [employee]);

  console.log(announcements, "announcement inside view");
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
    /*
    {
      name: 'sentTo',
      label: 'Sent to',
      options: {
      filter: true,
      sort: true,
      },
    },
    */
    {
      name: 'type',
      label: 'Message type',
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
      rowsPerPageOptions: [10,25,50,100],
      onRowClick: (rowData, rowState) => {
        console.log(rowData)
        openAnnouncementViewDialog(rowData[0])
      },
      elevation: 0
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Announcement Page</title>
        <meta name="description" content="ezone application announcement page" />
      </Helmet>

      <AddAnnouncementDialog />
      {/*
      <AnnouncementViewDialog />
      */}
    </React.Fragment>
  );
}

AnnouncementPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee : Selectors.makeSelectEmployee(),
  announcements : Selectors.makeSelectAnnouncements(),
  user: AppSelectors.makeSelectCurrentUser(),
  roles : Selectors.makeSelectRoles(),
});

export function mapDispatchToProps(dispatch) {
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
  withConnect,
  memo,
)(AnnouncementPage);
