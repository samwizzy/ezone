/**
 *
 * Companies
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLmsCourseMgt from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import CoursesList from './CoursesList';
import AddCourse from './components/AddCourse';
import CourseDetails from './CourseDetails';
import LearningPath from './LearningPath';
import AddDocument from './CourseDetails/tabs/structure/components/AddDocument';
import ModuleLayout from './ModuleLayout';

const key = "lmsCourses";
export function CourseManagement(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getCourses, match } = props;
  const { path, url } = match

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Course Management</title>
        <meta name="description" content="Description of Course Management" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={CoursesList} />
        <Route exact path={`${path}/new`} component={AddCourse} />
        <Route exact path={`/lms/course/:id`} component={CourseDetails} />
        <Route exact path={`/lms/course/section/:id`} component={AddDocument} />
        <Route exact path={`${path}/learning-path`} component={LearningPath} />
      </ModuleLayout>
    </div>
  );
}

CourseManagement.propTypes = {
  getCourses: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  lmsCourses: makeSelectLmsCourseMgt(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCourses: () => dispatch(Actions.getCourses()),
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
)(CourseManagement);
