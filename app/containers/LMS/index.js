/**
 *
 * Crm
 *
 */

import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrm from './selectors';
import reducer from './reducer';
import saga from './saga';
import Dashboard from './Dashboard';
import Activities from './Activities';
import Attendance from './Attendance';
import Contacts from './Contacts';
import Companies from './Companies';
import Category from './Category';
import Certificates from './Certificates';
import Campaigns from './Campaigns';
import Enrollments from './Enrollments';
import Reports from './Reports';
import Schedules from './Schedules';
import SocialMedia from './SocialMedia';
import ManageCourses from './ManageCourses';
import ContentManagement from './ContentManagement';
import UsersMessages from './UsersMessages';
import AccountSettings from './AccountSettings';
import FileLibrary from './FileLibrary';
import Integration from './Integration';
import VirtualClassrooms from './VirtualClassrooms';
import Quizzes from './Quizzes';
import Users from './Users';

const key = "lms"
export function LMSApp({ match }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { path, url } = match

  return (
    <div>
      <Helmet>
        <title>LMS</title>
        <meta name="description" content="Description of LMS" />
      </Helmet>
      <Fragment>
        <Route exact path={path} component={Dashboard} />
        <Route exact path={`${path}/dashboard`} component={Dashboard} />
        <Route exact path={`${path}/activities`} component={Activities} />
        <Route exact path={`${path}/attendance`} component={Attendance} />
        <Route exact path={`${path}/contacts`} component={Contacts} />
        <Route exact path={`${path}/companies`} component={Companies} />
        <Route exact path={`${path}/certificates`} component={Certificates} />
        <Route exact path={`${path}/category`} component={Category} />
        <Route exact path={`${path}/campaigns`} component={Campaigns} />
        <Route exact path={`${path}/enrollments`} component={Enrollments} />
        <Route exact path={`${path}/reports`} component={Reports} />
        <Route exact path={`${path}/schedules`} component={Schedules} />
        <Route exact path={`${path}/social-media`} component={SocialMedia} />
        <Route path={`${path}/content-mgt`} component={ContentManagement} />
        <Route path={`${path}/courses`} component={ManageCourses} />
        <Route path={`${path}/course`} component={ManageCourses} />
        <Route exact path={`${path}/messages`} component={UsersMessages} />
        <Route exact path={`${path}/account-settings`} component={AccountSettings} />
        <Route exact path={`${path}/file-library`} component={FileLibrary} />
        <Route exact path={`${path}/integration`} component={Integration} />
        <Route path={`${path}/user`} component={Users} />
        <Route path={`${path}/virtual-classrooms`} component={VirtualClassrooms} />
        <Route path={`${path}/quizzes`} component={Quizzes} />
      </Fragment>
    </div>
  );
}

LMSApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  lms: makeSelectCrm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
)(LMSApp);
