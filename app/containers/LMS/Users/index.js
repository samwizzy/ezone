/**
 *
 * Companies
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLMSStudents from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import StudentsList from './students/StudentsList';
import AddStudent from './students/components/AddStudent';
import LecturersList from './lectures/LecturersList';
import AddLecture from './lectures/components/AddLecture';
import ModuleLayout from './ModuleLayout';

const key = "lmsStudents"

export function StudentsApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getStudents, match } = props;
  const { path } = match
  console.log(match, "match")

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Students</title>
        <meta name="description" content="Description of Students" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={StudentsList} />
        <Route exact path={`${path}/students`} component={StudentsList} />
        <Route exact path={`${path}/student/new`} component={AddStudent} />
        <Route exact path={`${path}/lecturers`} component={LecturersList} />
        <Route exact path={`${path}/lecturer/new`} component={AddLecture} />
      </ModuleLayout>
    </div>
  );
}

StudentsApp.propTypes = {
  getStudents: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  lmsStudents: makeSelectLMSStudents(),
});

function mapDispatchToProps(dispatch) {
  return {
    getStudents: () => dispatch(Actions.getStudents()),
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
)(StudentsApp);
