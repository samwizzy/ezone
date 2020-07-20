/**
 *
 * Crm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, Grid } from '@material-ui/core';
import * as Selectors from './selectors';
import * as AppSelectors from './../../App/selectors';
import { Widget1, Widget2, Widget3, Widget4, Widget4_1, Widget5 } from './widgets'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

export function DashBoard({ currentUser, employees, contacts, companies, schedules, tasks }) {
  const classes = useStyles()

  console.log(contacts, "contacts")
  console.log(companies, "companies")
  console.log(tasks, "tasks")

  return (
    <div className={classes.root}>
      <Helmet>
        <title>CRM - Dashboard</title>
        <meta name="description" content="Description of Crm" />
      </Helmet>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={4}>
              <Widget1 contacts={contacts} />
            </Grid>
            <Grid item xs={4}>
              <Widget2 companies={companies} />
            </Grid>
            <Grid item xs={4}>
              <Widget3 schedules={schedules} user={currentUser} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={7}>
              {/* <Widget4 schedules={schedules} /> */}
              <Widget4_1 schedules={schedules} employees={employees} />
            </Grid>
            <Grid item xs={5}>
              <Widget5 tasks={tasks} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

DashBoard.propTypes = {
  employees: PropTypes.array,
  contacts: PropTypes.array,
  companies: PropTypes.array,
  schedules: PropTypes.array,
  tasks: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  currentUser: AppSelectors.makeSelectCurrentUser(),
  employees: Selectors.makeSelectEmployees(),
  contacts: Selectors.makeSelectContacts(),
  companies: Selectors.makeSelectCompanies(),
  schedules: Selectors.makeSelectSchedules(),
  tasks: Selectors.makeSelectTasks(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashBoard);
