/**
 *
 * Lms Quizzes
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLmsQuizzes from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import QuizzesList from './QuizzesList';
import AddQuiz from './components/AddQuiz';
import ModuleLayout from '../components/ModuleLayout';

const key = "lmsQuizzes"
export function QuizzesApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { match } = props;
  const { path } = match

  console.log(match, "match quizzes")

  useEffect(() => {
  }, []);

  return (
    <div>
      <Helmet>
        <title>Quizzes</title>
        <meta name="description" content="Description of Quizzes" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={QuizzesList} />
        <Route path={`${path}/new`} component={AddQuiz} />
      </ModuleLayout>
    </div>
  );
}

QuizzesApp.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  lmsQuizzes: makeSelectLmsQuizzes(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(QuizzesApp);
